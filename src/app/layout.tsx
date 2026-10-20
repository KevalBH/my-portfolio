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
