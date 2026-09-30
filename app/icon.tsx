import { ImageResponse } from "next/og";

import { loadShareFonts } from "@/lib/og-font";

import { BrandMark } from "@/components/brand-mark";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  const fonts = await loadShareFonts();

  return new ImageResponse(<BrandMark size={size.width} />, {
    ...size,
    ...(fonts ? { fonts } : {}),
  });
}
