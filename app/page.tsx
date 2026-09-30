import type { Metadata } from "next";

import { getDocumentTitle, getDocumentDescription } from "@/queries/site";

import { HomePage } from "@/_pages/home";

const title = getDocumentTitle();
const description = getDocumentDescription();

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description,
  openGraph: {
    title,
    description,
    type: "website",
  },
};

export default function Page() {
  return <HomePage />;
}
