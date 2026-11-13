"use client";

import { useRef, useMemo, MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface GoldenParticlesProps {
  count: number;
  scrollProgressRef: MutableRefObject<number>;
  reducedMotion: boolean;
}

function seededUnit(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

export default function GoldenParticles({
  count,
  scrollProgressRef,
  reducedMotion,
}: GoldenParticlesProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      const r1 = seededUnit(i * 6 + 1);
      const r2 = seededUnit(i * 6 + 2);
      const r3 = seededUnit(i * 6 + 3);
      const r4 = seededUnit(i * 6 + 4);
      const r5 = seededUnit(i * 6 + 5);
      const r6 = seededUnit(i * 6 + 6);

      // Distribute along the entire palace corridor from z = +7 to z = -23
      // Extra density around the Golden Ring (-17.2)
      const nearRing = i % 3 === 0;
      const z = nearRing
        ? -17.2 + (r1 - 0.5) * 6.5
        : 7 - r1 * 29;
      const spreadX = nearRing ? (r2 - 0.5) * 7.5 : (r2 - 0.5) * 10;
      const spreadY = nearRing ? (r3 - 0.5) * 6.2 : -2.6 + r3 * 6.8;

      arr.push({
        x: spreadX,
        y: spreadY,
        z,
        speed: 0.25 + r4 * 0.45,
        offset: r5 * Math.PI * 2,
        scale: 0.012 + r6 * 0.025,
      });
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = reducedMotion ? 0 : state.clock.elapsedTime;
    const p = scrollProgressRef.current;

    // Particles become slightly brighter and stream toward camera near ring pass-through
    const streamBoost = Math.max(0, (p - 0.68) / 0.25);

    for (let i = 0; i < particles.length; i++) {
      const pt = particles[i];
      const zOffset = streamBoost * 4.5;
      dummy.position.set(
        pt.x + Math.sin(t * pt.speed + pt.offset) * 0.18,
        pt.y + Math.cos(t * pt.speed * 0.8 + pt.offset) * 0.22,
        pt.z + zOffset
      );
      const pulse = 0.7 + Math.sin(t * 1.8 + pt.offset) * 0.3;
      dummy.scale.setScalar(pt.scale * pulse * (1 + p * 0.35));
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshStandardMaterial
        color="#FFF0C9"
        emissive="#D4AF5F"
        emissiveIntensity={1.1}
        roughness={0.2}
        metalness={0.9}
        transparent
        opacity={0.82}
      />
    </instancedMesh>
  );
}
