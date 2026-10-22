import type { Metadata } from "next";

import { Portfolio3DView } from "@/screens/explore-3d";

const title = "Explore in 3D";
const description =
  "A hand-drawn corridor you can walk: open the doors and move through the rooms.";

export const metadata: Metadata = {
  title,
  description,
  robots: { index: false, follow: false },
};

export default function Page() {
  return <Portfolio3DView />;
}
