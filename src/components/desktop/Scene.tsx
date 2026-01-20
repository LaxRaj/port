"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { EffectComposer, Noise } from "@react-three/postprocessing";
import { useRef } from "react";
import * as THREE from "three";

function BackgroundPlane() {
  return (
    <mesh position={[0, 0, -10]}>
      <planeGeometry args={[30, 20]} />
      <meshBasicMaterial color="#f0e6d2" />
    </mesh>
  );
}

function FlowerPlaceholder() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.elapsedTime;
    meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.1;
    meshRef.current.rotation.y = Math.cos(t * 0.15) * 0.12;
    meshRef.current.rotation.z = Math.sin(t * 0.18) * 0.08;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[1.4, 64, 64]} />
      <meshPhysicalMaterial
        color="#ffb7c5"
        roughness={0.8}
        transmission={0.2}
        thickness={1}
      />
    </mesh>
  );
}

export default function Scene() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0 }}
    >
      <BackgroundPlane />
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[-3, 4, 2]}
        intensity={0.8}
        color="#f6e2f1"
      />
      <FlowerPlaceholder />

      <EffectComposer>
        <Noise opacity={0.05} />
      </EffectComposer>
      <Preload all />
    </Canvas>
  );
}
