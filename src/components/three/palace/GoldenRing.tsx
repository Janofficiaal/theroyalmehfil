"use client";

import { useRef, useMemo, MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface GoldenRingProps {
  scrollProgressRef: MutableRefObject<number>;
  reducedMotion: boolean;
  isMobile: boolean;
}

function clamp01(v: number): number {
  return Math.max(0, Math.min(1, v));
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

export default function GoldenRing({
  scrollProgressRef,
  reducedMotion,
  isMobile,
}: GoldenRingProps) {
  const outerGroupRef = useRef<THREE.Group>(null);
  const innerFiligreeRef = useRef<THREE.Group>(null);
  const portalGlowRef = useRef<THREE.Mesh>(null);
  const ringLightRef = useRef<THREE.PointLight>(null);

  const beadPositions = useMemo(() => {
    const count = isMobile ? 16 : 24;
    const arr: [number, number, number][] = [];
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2;
      arr.push([Math.cos(a) * 2.66, Math.sin(a) * 2.66, 0]);
    }
    return arr;
  }, [isMobile]);

  useFrame((state) => {
    const p = scrollProgressRef.current;
    const t = reducedMotion ? 0 : state.clock.elapsedTime;

    // Keep ring hidden while camera zooms down the aisle so the full stage vista shines unobstructed;
    // then materialize smoothly (58% -> 72%) and pass through (72% -> 90%)
    const reveal = smoothstep(0.58, 0.72, p);
    const passThrough = smoothstep(0.72, 0.9, p);

    if (outerGroupRef.current) {
      outerGroupRef.current.visible = reveal > 0.01;
      const baseScale = isMobile ? 0.78 : 1;
      const scale = baseScale * (0.35 + reveal * 0.65 + passThrough * 0.45);
      outerGroupRef.current.scale.setScalar(scale);

      // Gentle float + majestic vertical-axis rotation
      outerGroupRef.current.position.y =
        0.55 + Math.sin(t * 0.9) * 0.12 - (1 - reveal) * 0.45;
      outerGroupRef.current.rotation.y =
        t * 0.25 + reveal * Math.PI * 0.75 + passThrough * 0.4;
      outerGroupRef.current.rotation.x = Math.sin(t * 0.5) * 0.05;
    }

    if (innerFiligreeRef.current) {
      innerFiligreeRef.current.rotation.z = -t * 0.35 - p * Math.PI;
    }

    if (portalGlowRef.current) {
      const mat = portalGlowRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = reveal * 0.14 + passThrough * 0.48;
    }

    if (ringLightRef.current) {
      ringLightRef.current.intensity = 1.5 + reveal * 8 + passThrough * 14;
    }
  });

  return (
    <group ref={outerGroupRef} position={[0, 0.55, -13.5]}>
      {/* Warm Golden Halo Light */}
      <pointLight
        ref={ringLightRef}
        position={[0, 0, 0.8]}
        intensity={2}
        distance={18}
        decay={1.6}
        color="#FFF0C9"
      />

      {/* Outer Heavy Sculpted Metallic Ring */}
      <mesh>
        <torusGeometry args={[2.95, 0.14, 28, 96]} />
        <meshStandardMaterial
          color="#D4AF5F"
          emissive="#6E5111"
          emissiveIntensity={0.32}
          metalness={1}
          roughness={0.14}
        />
      </mesh>

      {/* Secondary Bevel Crown Ring */}
      <mesh position={[0, 0, 0.08]}>
        <torusGeometry args={[2.95, 0.055, 18, 96]} />
        <meshStandardMaterial
          color="#E8D6A3"
          emissive="#8B6914"
          emissiveIntensity={0.38}
          metalness={1}
          roughness={0.12}
        />
      </mesh>

      {/* Counter-Rotating Inner Engraved Filigree Ring + Radial Studs */}
      <group ref={innerFiligreeRef}>
        <mesh>
          <torusGeometry args={[2.66, 0.036, 16, 84]} />
          <meshStandardMaterial
            color="#E8D6A3"
            emissive="#7A5A12"
            emissiveIntensity={0.3}
            metalness={1}
            roughness={0.16}
          />
        </mesh>
        {beadPositions.map((pos, idx) => (
          <mesh key={idx} position={pos} scale={0.075}>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
              color="#FFF0C9"
              emissive="#D4AF5F"
              emissiveIntensity={0.5}
              metalness={1}
              roughness={0.12}
            />
          </mesh>
        ))}
      </group>

      {/* Inner Portal Rim */}
      <mesh>
        <torusGeometry args={[2.38, 0.065, 20, 84]} />
        <meshStandardMaterial
          color="#C89F46"
          emissive="#6E5111"
          emissiveIntensity={0.3}
          metalness={1}
          roughness={0.16}
        />
      </mesh>

      {/* Luminous Portal Center Disc */}
      <mesh ref={portalGlowRef}>
        <circleGeometry args={[2.32, 48]} />
        <meshBasicMaterial
          color="#FFF0C9"
          transparent
          opacity={0.12}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
