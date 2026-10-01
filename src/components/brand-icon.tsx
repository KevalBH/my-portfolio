import { ImageResponse } from "next/og";

import { loadShareFonts } from "@/lib/og-font";

import { BrandMark } from "@/components/brand-mark";

export const iconSize = { width: 32, height: 32 };
export const appleIconSize = { width: 180, height: 180 };
export const iconContentType = "image/png";

export async function Icon() {
  const fonts = await loadShareFonts();

  return new ImageResponse(<BrandMark size={iconSize.width} />, {
    ...iconSize,
    ...(fonts ? { fonts } : {}),
  });
}

export async function AppleIcon() {
  const fonts = await loadShareFonts();

  return new ImageResponse(<BrandMark rounded size={appleIconSize.width} />, {
    ...appleIconSize,
    ...(fonts ? { fonts } : {}),
  });
}
