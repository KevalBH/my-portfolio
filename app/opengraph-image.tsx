import { ImageResponse } from "next/og";

import { profile } from "@/lib/resume";
import { loadShareFonts } from "@/lib/og-font";
import { getShareImageAlt } from "@/queries/site";

import { ShareCard } from "@/components/share-card";

export const alt = getShareImageAlt();
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const fonts = await loadShareFonts();

  return new ImageResponse(
    <ShareCard name={profile.name} title={profile.title} location={profile.location} />,
    {
      ...size,
      ...(fonts ? { fonts } : {}),
    },
  );
}
