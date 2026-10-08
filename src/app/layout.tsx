import "./globals.css";

import type { Viewport } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";

import { getRootMetadata } from "@/queries/site";
import { themeBootScript } from "@/lib/theme-script";

import { SiteShell } from "@/components/site-shell";
import { SiteJsonLd } from "@/components/site-json-ld";
import { RootProviders } from "@/components/root-providers";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const display = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

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
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} ${display.variable}`}
      suppressHydrationWarning
    >
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
