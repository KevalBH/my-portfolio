import "./globals.css";

import type { Viewport } from "next";
import type { ReactNode } from "react";

import { getRootMetadata } from "@/queries/site";
import { fontVariableClassName } from "@/lib/fonts";
import { themeBootScript } from "@/lib/theme-script";

import { SiteShell } from "@/components/site-shell";
import { SiteJsonLd } from "@/components/site-json-ld";
import { RootProviders } from "@/components/root-providers";

export const metadata = getRootMetadata();

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f1e8" },
    { media: "(prefers-color-scheme: dark)", color: "#14110e" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={fontVariableClassName} suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="/_next/static/media/e6099e249fd938cc-s.p.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/_next/static/media/22a5144ee8d83bca-s.p.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/_next/static/media/7d4881bb7e1bf84d-s.p.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body className="antialiased">
        <SiteJsonLd />
        <RootProviders>
          <SiteShell>{children}</SiteShell>
        </RootProviders>
      </body>
    </html>
  );
}
