"use client";

import { useEffect, useState } from "react";

let cachedSupport: boolean | null = null;

function detectWebGLSupport(): boolean {
  if (cachedSupport !== null) return cachedSupport;

  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    cachedSupport = !!gl;
  } catch {
    cachedSupport = false;
  }

  return cachedSupport;
}

// Defaults to false to match SSR output, then corrects after mount so we
// never diverge from the server-rendered HTML during hydration.
export function useWebGLSupport(): boolean {
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    setSupported(detectWebGLSupport());
  }, []);

  return supported;
}
