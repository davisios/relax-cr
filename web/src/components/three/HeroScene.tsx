"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { useWebGLSupport } from "@/lib/hooks/useWebGLSupport";

const MOBILE_BREAKPOINT = 640;

const SHAPES = [
  { geometry: "icosahedron", color: "#85C1E9", position: [-2.4, 1.1, -1] as const, scale: 0.9 },
  { geometry: "torus", color: "#82E0AA", position: [2.6, 0.7, -2] as const, scale: 0.7 },
  { geometry: "octahedron", color: "#F9E79F", position: [-1.9, -1.3, -1.5] as const, scale: 0.8 },
  { geometry: "icosahedron", color: "#D6EAF8", position: [1.7, -1.5, -0.5] as const, scale: 0.55 },
  { geometry: "octahedron", color: "#D5F5E3", position: [3.1, -0.5, -1.8] as const, scale: 0.6 },
] as const;

function useIsSmallViewport(breakpoint = MOBILE_BREAKPOINT) {
  const [isSmall, setIsSmall] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    setIsSmall(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setIsSmall(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [breakpoint]);

  return isSmall;
}

function Shape({
  geometry,
  color,
  position,
  scale,
  reducedMotion,
}: (typeof SHAPES)[number] & { reducedMotion: boolean }) {
  return (
    <Float
      speed={reducedMotion ? 0 : 1.4}
      rotationIntensity={reducedMotion ? 0 : 0.8}
      floatIntensity={reducedMotion ? 0 : 1.2}
    >
      <mesh position={position} scale={scale}>
        {geometry === "icosahedron" && <icosahedronGeometry args={[1, 0]} />}
        {geometry === "torus" && <torusGeometry args={[0.7, 0.25, 8, 16]} />}
        {geometry === "octahedron" && <octahedronGeometry args={[1, 0]} />}
        <meshStandardMaterial color={color} transparent opacity={0.45} roughness={0.4} />
      </mesh>
    </Float>
  );
}

function ParallaxGroup({ reducedMotion, children }: { reducedMotion: boolean; children: ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (reducedMotion) return;
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [reducedMotion]);

  useFrame(() => {
    if (reducedMotion || !group.current) return;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, pointer.current.x * 0.15, 0.04);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -pointer.current.y * 0.1, 0.04);
  });

  return <group ref={group}>{children}</group>;
}

export default function HeroScene() {
  const reducedMotion = useReducedMotion();
  const webglSupported = useWebGLSupport();
  const isSmallViewport = useIsSmallViewport();

  if (!webglSupported || isSmallViewport) return null;

  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 6], fov: 45 }}
      performance={{ min: 0.5 }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <ParallaxGroup reducedMotion={reducedMotion}>
        {SHAPES.map((shape, i) => (
          <Shape key={i} {...shape} reducedMotion={reducedMotion} />
        ))}
      </ParallaxGroup>
    </Canvas>
  );
}
