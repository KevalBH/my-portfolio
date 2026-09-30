import "./globals.css";

import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";

import { themeBootScript } from "@/lib/theme-script";
import { getSiteName, getDocumentTitle } from "@/queries/site";

import { SiteShell } from "@/components/site-shell";
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

export const metadata: Metadata = {
  title: {
    default: getDocumentTitle(),
    template: `%s — ${getSiteName()}`,
  },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body className="antialiased">
        <RootProviders>
          <SiteShell>{children}</SiteShell>
        </RootProviders>
      </body>
    </html>
  );
}
