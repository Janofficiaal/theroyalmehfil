"use client";

import { useRef, useMemo, useEffect, useState, MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";

interface HeroSceneProps {
  scrollProgressRef: MutableRefObject<number>;
}

function seededUnit(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

/* ── Floating Gold Dust & Warm Candle Embers ───────────────── */

function GoldParticles({
  count = 200,
  scrollProgressRef,
  reducedMotion,
}: {
  count?: number;
  scrollProgressRef: MutableRefObject<number>;
  reducedMotion: boolean;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const r1 = seededUnit(i * 7 + 1);
      const r2 = seededUnit(i * 7 + 2);
      const r3 = seededUnit(i * 7 + 3);
      const r4 = seededUnit(i * 7 + 4);
      const r5 = seededUnit(i * 7 + 5);
      const r6 = seededUnit(i * 7 + 6);
      const r7 = seededUnit(i * 7 + 7);

      const angle = (i / count) * Math.PI * 16;
      const radius = 1.2 + r1 * 8.5;
      temp.push({
        x: Math.cos(angle) * radius * (0.75 + r2 * 0.5),
        y: (r3 - 0.5) * 11,
        z: -6 + r4 * 12,
        speed: 0.14 + r5 * 0.34,
        offset: r6 * Math.PI * 2,
        scale: 0.011 + r7 * 0.024,
        depthFactor: 5 + r1 * 9,
      });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = reducedMotion ? 0 : state.clock.elapsedTime;
    const progress = scrollProgressRef.current;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      const rawZ = p.z + progress * p.depthFactor;
      const wrappedZ = ((rawZ + 6) % 12) - 6;

      dummy.position.set(
        p.x + Math.sin(t * p.speed + p.offset) * 0.22,
        p.y + Math.cos(t * p.speed * 0.75 + p.offset) * 0.28 + t * 0.03 % 2,
        wrappedZ
      );
      const pulse = 0.75 + Math.sin(t * 1.8 + p.offset) * 0.25;
      dummy.scale.setScalar(p.scale * pulse * (1 + progress * 0.45));
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshStandardMaterial
        color="#E8D6A3"
        emissive="#D4AF5F"
        emissiveIntensity={0.9}
        roughness={0.2}
        metalness={0.95}
        transparent
        opacity={0.78}
      />
    </instancedMesh>
  );
}

/* ── 3D Royal Tiered Chandelier ────────────────────────────── */

function RoyalChandelier({
  scrollProgressRef,
  reducedMotion,
}: {
  scrollProgressRef: MutableRefObject<number>;
  reducedMotion: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);

  const tierDrops = useMemo(() => {
    const items: { x: number; y: number; z: number; scale: number; len: number }[] = [];
    const tiers = [
      { count: 14, radius: 2.0, y: -0.3, scale: 0.085, len: 0.55 },
      { count: 10, radius: 1.32, y: -0.85, scale: 0.075, len: 0.5 },
      { count: 6, radius: 0.68, y: -1.35, scale: 0.065, len: 0.45 },
    ];
    tiers.forEach((tier) => {
      for (let i = 0; i < tier.count; i++) {
        const a = (i / tier.count) * Math.PI * 2;
        items.push({
          x: Math.cos(a) * tier.radius,
          y: tier.y,
          z: Math.sin(a) * tier.radius,
          scale: tier.scale,
          len: tier.len,
        });
      }
    });
    return items;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = reducedMotion ? 0 : state.clock.elapsedTime;
    const p = scrollProgressRef.current;

    groupRef.current.rotation.y = t * 0.08 + p * Math.PI * 0.75;
    groupRef.current.position.y = 2.65 - p * 1.15 + Math.sin(t * 0.6) * 0.04;
    groupRef.current.position.z = -0.6 + p * 2.4;
    const s = 1 + p * 0.35;
    groupRef.current.scale.setScalar(s);
  });

  return (
    <group ref={groupRef} position={[0, 2.65, -0.6]}>
      {/* Central Royal Suspension Rod */}
      <mesh position={[0, 1.4, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 2.8, 12]} />
        <meshStandardMaterial color="#D4AF5F" metalness={1} roughness={0.2} />
      </mesh>

      {/* Tier 1 Upper Crown Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.0, 0.028, 18, 96]} />
        <meshStandardMaterial
          color="#D4AF5F"
          emissive="#5A400D"
          emissiveIntensity={0.25}
          metalness={1}
          roughness={0.18}
        />
      </mesh>

      {/* Tier 2 Middle Halo */}
      <mesh position={[0, -0.58, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.32, 0.024, 18, 84]} />
        <meshStandardMaterial
          color="#E8D6A3"
          emissive="#6E5111"
          emissiveIntensity={0.28}
          metalness={1}
          roughness={0.16}
        />
      </mesh>

      {/* Tier 3 Inner Finial Ring */}
      <mesh position={[0, -1.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.68, 0.02, 16, 64]} />
        <meshStandardMaterial
          color="#D4AF5F"
          emissive="#6E5111"
          emissiveIntensity={0.3}
          metalness={1}
          roughness={0.16}
        />
      </mesh>

      {/* Hanging Crystal-Gold Droplets */}
      {tierDrops.map((d, idx) => (
        <group key={idx} position={[d.x, d.y, d.z]}>
          <mesh position={[0, d.len * 0.5, 0]}>
            <cylinderGeometry args={[0.005, 0.005, d.len, 6]} />
            <meshStandardMaterial color="#D4AF5F" metalness={1} roughness={0.25} />
          </mesh>
          <mesh scale={[d.scale, d.scale * 1.9, d.scale]}>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
              color="#F6E6BC"
              emissive="#C89B3C"
              emissiveIntensity={0.45}
              metalness={0.88}
              roughness={0.12}
            />
          </mesh>
        </group>
      ))}

      {/* Bottom Central Crystal Finial */}
      <mesh position={[0, -1.75, 0]} scale={[0.14, 0.34, 0.14]}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#E8D6A3"
          emissive="#B88B2E"
          emissiveIntensity={0.4}
          metalness={0.95}
          roughness={0.14}
        />
      </mesh>
    </group>
  );
}

/* ── 3D Gilded Royal Mehfil Archway & Pillars ──────────────── */

function RoyalArchway({
  scrollProgressRef,
  isMobile,
}: {
  scrollProgressRef: MutableRefObject<number>;
  isMobile: boolean;
}) {
  const archRef = useRef<THREE.Group>(null);
  const smoothed = useRef(0);

  useFrame((state, delta) => {
    const target = scrollProgressRef.current;
    const damp = 1 - Math.exp(-6 * Math.min(delta, 0.05));
    smoothed.current += (target - smoothed.current) * damp;
    const p = smoothed.current;

    const cam = state.camera;
    const baseZ = isMobile ? 9.6 : 8.4;
    const targetCamZ = baseZ - p * 6.0;
    const pointerX = isMobile ? 0 : state.pointer.x * 0.4;
    const pointerY = isMobile ? 0 : state.pointer.y * 0.22;

    cam.position.set(
      cam.position.x + (pointerX - cam.position.x) * 0.06,
      cam.position.y +
        (pointerY + Math.sin(p * Math.PI) * 0.3 - cam.position.y) * 0.06,
      targetCamZ
    );

    if (cam instanceof THREE.PerspectiveCamera) {
      const targetFov = 44 + p * 15;
      if (Math.abs(cam.fov - targetFov) > 0.01) {
        cam.fov = targetFov;
        cam.updateProjectionMatrix();
      }
    }

    if (archRef.current) {
      const baseScale = isMobile ? 0.72 : 1;
      archRef.current.scale.setScalar(baseScale * (1 + p * 0.65));
      archRef.current.position.z = -0.8 + p * 3.8;
      archRef.current.rotation.y = Math.sin(p * Math.PI) * 0.08;
    }
  });

  const pillarX = 3.7;

  return (
    <group ref={archRef} position={[0, -0.4, -0.8]}>
      {/* Main Gilded Arch Curve */}
      <mesh position={[0, 1.35, 0]}>
        <torusGeometry args={[pillarX, 0.032, 20, 100, Math.PI]} />
        <meshStandardMaterial
          color="#D4AF5F"
          emissive="#5A400D"
          emissiveIntensity={0.22}
          metalness={1}
          roughness={0.18}
        />
      </mesh>
      {/* Inner Filigree Arch */}
      <mesh position={[0, 1.35, 0]}>
        <torusGeometry args={[pillarX - 0.28, 0.014, 16, 100, Math.PI]} />
        <meshStandardMaterial
          color="#E8D6A3"
          emissive="#6E5111"
          emissiveIntensity={0.25}
          metalness={1}
          roughness={0.2}
        />
      </mesh>

      {/* Left & Right Royal Pillars */}
      {[-pillarX, pillarX].map((xPos, idx) => (
        <group key={idx} position={[xPos, -1.2, 0]}>
          <mesh>
            <cylinderGeometry args={[0.045, 0.055, 5.1, 16]} />
            <meshStandardMaterial
              color="#C89F46"
              metalness={1}
              roughness={0.22}
            />
          </mesh>
          {/* Pillar Capital Accent Ring */}
          <mesh position={[0, 2.52, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.11, 0.02, 12, 32]} />
            <meshStandardMaterial color="#E8D6A3" metalness={1} roughness={0.18} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ── Main 3D Canvas ────────────────────────────────────────── */

export default function HeroScene({ scrollProgressRef }: HeroSceneProps) {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  const [reducedMotion, setReducedMotion] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  );

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMqChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onMqChange);

    return () => {
      window.removeEventListener("resize", onResize);
      mq.removeEventListener("change", onMqChange);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-[1] pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8.4], fov: 44 }}
        dpr={isMobile ? [1, 1.25] : [1, 1.75]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.25} />
        <pointLight position={[0, 4.5, 3.5]} intensity={1.4} color="#E8D6A3" />
        <pointLight position={[-5, 2, 3]} intensity={0.75} color="#D4AF5F" />
        <pointLight position={[5, -2, 3]} intensity={0.65} color="#D4AF5F" />

        <RoyalArchway
          scrollProgressRef={scrollProgressRef}
          isMobile={isMobile}
        />

        <RoyalChandelier
          scrollProgressRef={scrollProgressRef}
          reducedMotion={reducedMotion}
        />

        <GoldParticles
          count={isMobile ? 95 : 220}
          scrollProgressRef={scrollProgressRef}
          reducedMotion={reducedMotion}
        />

        <Environment resolution={256}>
          <group rotation={[-Math.PI / 3, 0, 1]}>
            <Lightformer
              form="circle"
              intensity={3}
              color="#E8D6A3"
              scale={6}
              position={[0, 5, -4]}
            />
            <Lightformer
              form="rect"
              intensity={2}
              color="#D4AF5F"
              scale={[8, 2, 1]}
              position={[-6, 2, 2]}
              target={[0, 0, 0]}
            />
            <Lightformer
              form="rect"
              intensity={1.8}
              color="#F6F0E4"
              scale={[6, 2, 1]}
              position={[6, -2, 3]}
              target={[0, 0, 0]}
            />
          </group>
        </Environment>
      </Canvas>
    </div>
  );
}
