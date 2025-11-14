"use client";

import dynamic from "next/dynamic";
import { memo } from "react";

const GridScan = dynamic(() => import("@/components/visuals/GridScan"), {
  ssr: false,
});

export const GridScanBackground = memo(function GridScanBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <GridScan
        sensitivity={0.55}
        lineThickness={1}
        linesColor="#392e4e"
        gridScale={0.1}
        scanColor="#FF9FFC"
        scanOpacity={0.4}
        enablePost
        bloomIntensity={0.6}
        chromaticAberration={0.002}
        noiseIntensity={0.01}
        className="pointer-events-none"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
});
