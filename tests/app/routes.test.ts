import manifest from "@/app/manifest";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import page, { metadata } from "@/app/page";

describe("app routes", () => {
  it("exposes page metadata and the home page component", () => {
    expect(metadata.title).toEqual({ absolute: expect.any(String) });
    expect(metadata.description).toEqual(expect.any(String));
    expect(page).toEqual(expect.any(Function));
  });

  it("builds robots, the sitemap, and the manifest", () => {
    expect(robots().sitemap).toMatch(/sitemap\.xml$/);
    expect(sitemap()[0]?.priority).toBe(1);
    expect(manifest().display).toBe("standalone");
  });
});
