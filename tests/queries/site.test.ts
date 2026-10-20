import { profile } from "@/lib/resume";
import {
  getDocumentDescription,
  getDocumentTitle,
  getManifest,
  getPageMetadata,
  getRobots,
  getRootMetadata,
  getShareImageAlt,
  getShareSkills,
  getSiteContent,
  getSiteJsonLd,
  getSiteName,
  getSiteUrl,
  getSitemap,
} from "@/queries/site";

const ENV_KEYS = [
  "NEXT_PUBLIC_SITE_URL",
  "VERCEL_PROJECT_PRODUCTION_URL",
  "VERCEL_URL",
] as const;

function withSiteEnv(
  values: Partial<Record<(typeof ENV_KEYS)[number], string>>,
  read: () => string,
) {
  const previous = Object.fromEntries(ENV_KEYS.map((key) => [key, process.env[key]]));

  for (const key of ENV_KEYS) {
    delete process.env[key];
  }

  for (const [key, value] of Object.entries(values)) {
    process.env[key] = value;
  }

  try {
    return read();
  } finally {
    for (const key of ENV_KEYS) {
      const prior = previous[key];
      if (prior === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = prior;
      }
    }
  }
}

describe("site copy", () => {
  it("builds the document title and description from the profile", () => {
    expect(getSiteName()).toBe(profile.name);
    expect(getDocumentTitle()).toBe(`${profile.name} — ${profile.title}`);
    expect(getDocumentDescription()).toContain(profile.location);
    expect(getDocumentDescription()).toContain(profile.title);
    expect(getShareImageAlt()).toContain(getDocumentTitle());
    expect(getShareSkills()).toEqual(["React", "Next.js", "TypeScript"]);
  });

  it("returns the resume collections used by the page", () => {
    const content = getSiteContent();
    expect(content.profile.name).toBe(profile.name);
    expect(content.nav.map((item) => item.href)).toEqual([
      "#overview",
      "#experience",
      "#work",
      "#stack",
      "#education",
      "#contact",
    ]);
    expect(content.work.length).toBeGreaterThan(0);
    expect(content.experience.length).toBeGreaterThan(0);
  });
});

describe("getSiteUrl", () => {
  it("prefers the configured site URL and strips a trailing slash", () => {
    expect(withSiteEnv({ NEXT_PUBLIC_SITE_URL: "https://keval.dev/" }, getSiteUrl)).toBe(
      "https://keval.dev",
    );
  });

  it("uses the production host when no site URL is configured", () => {
    expect(
      withSiteEnv(
        { VERCEL_PROJECT_PRODUCTION_URL: "https://keval.vercel.app" },
        getSiteUrl,
      ),
    ).toBe("https://keval.vercel.app");
  });

  it("uses the preview host before the local fallback", () => {
    expect(
      withSiteEnv({ VERCEL_URL: "portfolio-git-preview.vercel.app" }, getSiteUrl),
    ).toBe("https://portfolio-git-preview.vercel.app");
  });

  it("falls back to localhost", () => {
    expect(withSiteEnv({}, getSiteUrl)).toBe("http://localhost:3000");
  });
});

describe("site metadata", () => {
  beforeEach(() => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    delete process.env.VERCEL_PROJECT_PRODUCTION_URL;
    delete process.env.VERCEL_URL;
  });

  it("describes a person for search engines", () => {
    expect(getSiteJsonLd()).toMatchObject({
      "@type": "Person",
      name: profile.name,
      jobTitle: profile.title,
      email: profile.email,
      telephone: "+919776691766",
      url: "http://localhost:3000",
      image: "http://localhost:3000/opengraph-image",
      sameAs: [profile.linkedin, profile.github],
    });
  });

  it("sets the canonical origin, robots, sitemap, and manifest", () => {
    const root = getRootMetadata();
    const page = getPageMetadata();

    expect(root.metadataBase?.href).toBe("http://localhost:3000/");
    expect(root.title).toMatchObject({ default: getDocumentTitle() });
    expect(page.title).toEqual({ absolute: getDocumentTitle() });
    expect(page.alternates).toEqual({ canonical: "/" });
    expect(getRobots()).toEqual({
      rules: { userAgent: "*", allow: "/" },
      sitemap: "http://localhost:3000/sitemap.xml",
    });
    expect(getSitemap()).toEqual([
      expect.objectContaining({
        url: "http://localhost:3000",
        changeFrequency: "monthly",
        priority: 1,
      }),
    ]);
    expect(getManifest()).toMatchObject({
      name: getDocumentTitle(),
      short_name: profile.name,
      start_url: "/",
      display: "standalone",
    });
  });
});
