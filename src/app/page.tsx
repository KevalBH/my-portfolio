import type { Metadata } from "next";

import {
  getPageMetadata,
  getDocumentTitle,
  getDocumentDescription,
} from "@/queries/site";

import { HomePage } from "@/screens/home";

const title = getDocumentTitle();
const description = getDocumentDescription();

export const metadata: Metadata = {
  ...getPageMetadata(),
  title: { absolute: title },
  description,
};

export default function Page() {
  return <HomePage />;
}
