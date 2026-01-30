"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, Sphere } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type Hub = {
  code: string;
  lat: number;
  lon: number;
};

const HUBS: Hub[] = [
  { code: "JFK", lat: 40.6413, lon: -73.7781 },
  { code: "LHR", lat: 51.47, lon: -0.4543 },
  { code: "HND", lat: 35.5494, lon: 139.7798 },
  { code: "DXB", lat: 25.2532, lon: 55.3657 },
  { code: "SYD", lat: -33.9399, lon: 151.1753 },
  { code: "SFO", lat: 37.6213, lon: -122.379 },
  { code: "LAX", lat: 33.9416, lon: -118.4085 },
  { code: "ORD", lat: 41.9742, lon: -87.9073 },
  { code: "CDG", lat: 49.0097, lon: 2.5479 },
  { code: "AMS", lat: 52.3105, lon: 4.7683 },
  { code: "FRA", lat: 50.0379, lon: 8.5622 },
  { code: "MAD", lat: 40.4893, lon: -3.5676 },
  { code: "BCN", lat: 41.2974, lon: 2.0833 },
  { code: "SIN", lat: 1.3644, lon: 103.9915 },
  { code: "ICN", lat: 37.4602, lon: 126.4407 },
  { code: "NRT", lat: 35.772, lon: 140.3929 },
  { code: "DEL", lat: 28.5562, lon: 77.1 },
  { code: "BOM", lat: 19.0896, lon: 72.8656 },
  { code: "GRU", lat: -23.4356, lon: -46.4731 },
  { code: "MEX", lat: 19.4361, lon: -99.0719 },
  { code: "EZE", lat: -34.8222, lon: -58.5358 },
  { code: "JNB", lat: -26.1337, lon: 28.242 },
  { code: "CPT", lat: -33.97, lon: 18.597 },
  { code: "NBO", lat: -1.3192, lon: 36.9278 },
  { code: "YYZ", lat: 43.6777, lon: -79.6248 },
  { code: "YVR", lat: 49.1951, lon: -123.1779 },
  { code: "SEA", lat: 47.4502, lon: -122.3088 },
  { code: "ATL", lat: 33.6407, lon: -84.4277 },
  { code: "MIA", lat: 25.7959, lon: -80.287 },
  { code: "BOS", lat: 42.3656, lon: -71.0096 },
];

const GLOBE_RADIUS = 2.4;

function latLonToVec3(lat: number, lon: number, radius = GLOBE_RADIUS) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

function createArc(start: THREE.Vector3, end: THREE.Vector3) {
  const mid = start.clone().add(end).multiplyScalar(0.5);
  const elevate = mid.clone().normalize().multiplyScalar(0.8);
  const curveMid = mid.add(elevate);
  return new THREE.CatmullRomCurve3([start, curveMid, end]);
}

function FlightPath({
  curve,
  seed,
}: {
  curve: THREE.CatmullRomCurve3;
  seed: number;
}) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const geometry = useMemo(() => {
    const points = curve.getPoints(120);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const distances = new Float32Array(points.length);
    let total = 0;
    for (let i = 1; i < points.length; i += 1) {
      total += points[i].distanceTo(points[i - 1]);
      distances[i] = total;
    }
    geometry.setAttribute("lineDistance", new THREE.BufferAttribute(distances, 1));
    return geometry;
  }, [curve]);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.elapsedTime;
    }
  });

  return (
    <line geometry={geometry}>
      <shaderMaterial
        ref={materialRef}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        uniforms={{
          uTime: { value: 0 },
          uSpeed: { value: 0.6 + seed * 0.2 },
          uColor: { value: new THREE.Color("#66e3ff") },
        }}
        vertexShader={`
          attribute float lineDistance;
          varying float vDist;
          void main() {
            vDist = lineDistance;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          varying float vDist;
          uniform float uTime;
          uniform float uSpeed;
          uniform vec3 uColor;
          void main() {
            float dash = fract(vDist * 0.15 - uTime * uSpeed);
            float intensity = smoothstep(0.0, 0.25, dash) * (1.0 - smoothstep(0.55, 1.0, dash));
            gl_FragColor = vec4(uColor, intensity);
          }
        `}
      />
    </line>
  );
}

function Globe() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0006;
    }
  });

  const routes = useMemo(() => {
    const lines: THREE.CatmullRomCurve3[] = [];
    for (let i = 0; i < 240; i += 1) {
      const a = HUBS[Math.floor(Math.random() * HUBS.length)];
      let b = HUBS[Math.floor(Math.random() * HUBS.length)];
      while (b.code === a.code) {
        b = HUBS[Math.floor(Math.random() * HUBS.length)];
      }
      const start = latLonToVec3(a.lat, a.lon);
      const end = latLonToVec3(b.lat, b.lon);
      lines.push(createArc(start, end));
    }
    return lines;
  }, []);

  return (
    <group ref={groupRef}>
      <Sphere args={[GLOBE_RADIUS, 64, 64]}>
        <meshStandardMaterial
          color="#0d1117"
          roughness={0.8}
          metalness={0.2}
          emissive="#05080d"
          emissiveIntensity={0.4}
        />
      </Sphere>
      {routes.map((curve, index) => (
        <FlightPath key={index} curve={curve} seed={(index % 7) / 10} />
      ))}
    </group>
  );
}

export default function FlightGlobeBackground() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 8], fov: 45 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0, zIndex: -1 }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[-4, 3, 2]} intensity={0.8} />
      <Globe />
      <OrbitControls enableZoom={false} enablePan={false} enableRotate />
      <EffectComposer>
        <Bloom intensity={1.2} luminanceThreshold={0.1} luminanceSmoothing={0.8} />
      </EffectComposer>
      <Preload all />
    </Canvas>
  );
}
