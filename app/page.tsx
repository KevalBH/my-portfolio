import { getPageMetadata } from "@/queries/site";

import { HomePage } from "@/_pages/home";

export const metadata = getPageMetadata();

export default function Page() {
  return <HomePage />;
}
