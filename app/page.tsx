import type { Metadata } from "next";

import { getDocumentTitle, getSiteContent } from "@/queries/site";

import { HomePage } from "@/_pages/home";

const { profile } = getSiteContent();
const title = getDocumentTitle();

export const metadata: Metadata = {
  title,
  description: profile.summary,
  openGraph: {
    title,
    description: profile.summary,
    type: "website",
  },
};

export default function Page() {
  return <HomePage />;
}
