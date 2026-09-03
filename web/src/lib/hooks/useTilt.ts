"use client";

import { useMemo, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { useReducedMotion } from "./useReducedMotion";

const MAX_TILT_DEG = 10;

export function useTilt<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [transform, setTransform] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();

  const handlers = useMemo(() => {
    if (reducedMotion) return {};

    return {
      onPointerMove: (e: PointerEvent<T>) => {
        if (e.pointerType !== "mouse") return;
        const el = ref.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;

        const rotateY = (px - 0.5) * 2 * MAX_TILT_DEG;
        const rotateX = -(py - 0.5) * 2 * MAX_TILT_DEG;

        setTransform(
          `perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`
        );
      },
      onPointerLeave: () => {
        setTransform(null);
      },
    };
  }, [reducedMotion]);

  const style: CSSProperties = {
    transform: transform ?? undefined,
    transition: transform ? "transform 60ms linear" : "transform 400ms ease-out",
    transformStyle: "preserve-3d",
    willChange: "transform",
  };

  return { ref, style, handlers };
}
