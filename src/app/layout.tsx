import "./globals.css";

import type { Viewport } from "next";
import type { ReactNode } from "react";

import { getRootMetadata } from "@/queries/site";
import { themeBootScript } from "@/lib/theme-script";

import { SiteFrame } from "@/components/site-frame";
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

interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Readonly<Props>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body className="antialiased">
        <SiteJsonLd />
        <RootProviders>
          <SiteFrame>{children}</SiteFrame>
        </RootProviders>
      </body>
    </html>
  );
}
