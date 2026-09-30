import { ImageResponse } from "next/og";

import { loadShareFonts } from "@/lib/og-font";

import { BrandMark } from "@/components/brand-mark";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const fonts = await loadShareFonts();

  return new ImageResponse(<BrandMark rounded size={size.width} />, {
    ...size,
    ...(fonts ? { fonts } : {}),
  });
}
