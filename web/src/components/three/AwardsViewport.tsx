"use client";

import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { useWebGLSupport } from "@/lib/hooks/useWebGLSupport";

/**
 * A single fixed, full-viewport, pointer-events-none Canvas that every
 * <AwardBadge> View portals its scene into (drei's shared-canvas pattern
 * for many small 3D thumbnails). Mount this once per page.
 */
export default function AwardsViewport() {
  const webglSupported = useWebGLSupport();
  if (!webglSupported) return null;

  return (
    <Canvas
      eventSource={typeof document !== "undefined" ? document.body : undefined}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 0,
      }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <View.Port />
    </Canvas>
  );
}
