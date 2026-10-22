"use client";

import dynamic from "next/dynamic";

const Scene = dynamic(() => import("@/screens/protfolio-3D/App"), {
  ssr: false,
});

export function Portfolio3DView() {
  return (
    <div className="fixed inset-0 bg-[#fafafa]">
      <Scene />
    </div>
  );
}
