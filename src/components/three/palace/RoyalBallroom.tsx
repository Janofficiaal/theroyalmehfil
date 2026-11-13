"use client";

import { useMemo, useRef, useEffect, MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

interface RoyalBallroomProps {
  isMobile: boolean;
  scrollProgressRef: MutableRefObject<number>;
}

function seededUnit(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

function clamp01(v: number): number {
  return Math.max(0, Math.min(1, v));
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

const CRIMSON_ROSE_PALETTE = [
  "#8A0C24",
  "#A81230",
  "#6E071B",
  "#C41E3D",
  "#96102B",
];

/* ── 3D Floating & Falling Crimson Rose Petals in Aisle Air ─── */

function FloatingRosePetals({
  count,
  scrollProgressRef,
}: {
  count: number;
  scrollProgressRef: MutableRefObject<number>;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const petals = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      const r1 = seededUnit(i * 9 + 1);
      const r2 = seededUnit(i * 9 + 2);
      const r3 = seededUnit(i * 9 + 3);
      const r4 = seededUnit(i * 9 + 4);
      const r5 = seededUnit(i * 9 + 5);
      arr.push({
        x: (r1 - 0.5) * 8.6,
        y: -2.2 + r2 * 6.5,
        z: 0.6 - r3 * 13.0,
        fallSpeed: 0.22 + r4 * 0.32,
        swayFreq: 0.8 + r5 * 1.1,
        offset: r1 * Math.PI * 2,
        scale: 0.055 + r2 * 0.045,
        color: CRIMSON_ROSE_PALETTE[i % CRIMSON_ROSE_PALETTE.length],
      });
    }
    return arr;
  }, [count]);

  useEffect(() => {
    if (!meshRef.current) return;
    const color = new THREE.Color();
    petals.forEach((p, i) => {
      color.set(p.color);
      meshRef.current!.setColorAt(i, color);
    });
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  }, [petals]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    const showerScale =
      0.8 + smoothstep(0.45, 0.72, scrollProgressRef.current) * 0.4;

    for (let i = 0; i < petals.length; i++) {
      const p = petals[i];
      const ySpan = 6.8;
      const rawY = p.y - t * p.fallSpeed;
      const wrappedY = ((((rawY + 2.6) % ySpan) + ySpan) % ySpan) - 2.6;

      dummy.position.set(
        p.x + Math.sin(t * p.swayFreq + p.offset) * 0.38,
        wrappedY,
        p.z + Math.cos(t * p.swayFreq * 0.7 + p.offset) * 0.2
      );
      dummy.rotation.set(
        t * 0.9 + p.offset,
        t * 0.6 + p.offset,
        Math.sin(t + p.offset) * 0.7
      );
      dummy.scale.set(
        p.scale * showerScale,
        p.scale * 1.3 * showerScale,
        p.scale * showerScale
      );
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <circleGeometry args={[1, 6]} />
      <meshStandardMaterial
        roughness={0.5}
        metalness={0.08}
        side={THREE.DoubleSide}
      />
    </instancedMesh>
  );
}

/* ── Deep Photorealistic Backdrop Vista of the Crimson Palace Stage ─ */

function PhotorealisticStageVista() {
  const texture = useTexture("/images/crimson-hall.jpg");

  return (
    <group position={[0, -0.65, -11.8]}>
      <mesh>
        <planeGeometry args={[27, 15.2]} />
        <meshBasicMaterial map={texture} toneMapped={false} fog={false} />
      </mesh>

      <pointLight
        position={[0, -1.0, 1.4]}
        intensity={3.2}
        distance={14}
        decay={1.8}
        color="#FFD584"
      />
    </group>
  );
}

/* ── Complete Crimson-and-Gold Royal Ballroom Experience ───── */

export default function RoyalBallroom({
  isMobile,
  scrollProgressRef,
}: RoyalBallroomProps) {
  return (
    <group>
      {/* Photorealistic Vista: The Exact Crimson Hall & Stage Seamlessly Anchored */}
      <PhotorealisticStageVista />

      {/* Floating 3D Rose Petals */}
      <FloatingRosePetals
        count={isMobile ? 45 : 120}
        scrollProgressRef={scrollProgressRef}
      />
    </group>
  );
}
