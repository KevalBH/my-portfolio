import { getSiteJsonLd } from "@/queries/site";

export function SiteJsonLd() {
  const jsonLd = getSiteJsonLd();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
