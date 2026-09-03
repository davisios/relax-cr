"use client";

import { useRef } from "react";
import { View } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

function Medal({ reducedMotion }: { reducedMotion: boolean }) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (reducedMotion || !mesh.current) return;
    mesh.current.rotation.y += delta * 0.6;
    mesh.current.rotation.x += delta * 0.25;
  });

  return (
    <mesh ref={mesh}>
      <torusGeometry args={[0.55, 0.22, 16, 32]} />
      <meshStandardMaterial
        color="#D4AC0D"
        metalness={0.7}
        roughness={0.3}
        emissive="#9A7D0A"
        emissiveIntensity={0.15}
      />
    </mesh>
  );
}

export default function AwardBadge() {
  const reducedMotion = useReducedMotion();

  return (
    <View style={{ width: "100%", height: "100%" }}>
      <ambientLight intensity={0.9} />
      <directionalLight position={[2, 2, 3]} intensity={1} />
      <Medal reducedMotion={reducedMotion} />
    </View>
  );
}
