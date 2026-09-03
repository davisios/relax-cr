"use client";

import type { LucideIcon } from "lucide-react";
import { useWebGLSupport } from "@/lib/hooks/useWebGLSupport";
import { CanvasErrorBoundary } from "./CanvasErrorBoundary";
import AwardBadge from "./AwardBadge";

export default function AwardIcon({ icon: Icon }: { icon: LucideIcon }) {
  const webglSupported = useWebGLSupport();
  const fallback = <Icon size={22} className="text-sand-700" />;

  if (!webglSupported) return fallback;

  return (
    <CanvasErrorBoundary fallback={fallback}>
      <AwardBadge />
    </CanvasErrorBoundary>
  );
}
