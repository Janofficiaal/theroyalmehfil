"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import * as THREE from "three";

/* ── Gold Particles ──────────────────────── */

function GoldParticles({ count = 200 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        x: (Math.random() - 0.5) * 20,
        y: (Math.random() - 0.5) * 15,
        z: (Math.random() - 0.5) * 10,
        speed: 0.002 + Math.random() * 0.005,
        offset: Math.random() * Math.PI * 2,
        scale: 0.01 + Math.random() * 0.03,
      });
    }
    return temp;
  }, [count]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    particles.forEach((p, i) => {
      dummy.position.set(
        p.x + Math.sin(t * p.speed * 100 + p.offset) * 0.3,
        p.y + Math.sin(t * p.speed * 80 + p.offset) * 0.5,
        p.z + Math.cos(t * p.speed * 60 + p.offset) * 0.2
      );
      dummy.scale.setScalar(p.scale * (0.8 + Math.sin(t * 2 + p.offset) * 0.2));
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshStandardMaterial
        color="#D4AF5F"
        emissive="#D4AF5F"
        emissiveIntensity={0.5}
        roughness={0.3}
        metalness={0.9}
        transparent
        opacity={0.7}
      />
    </instancedMesh>
  );
}

/* ── Gold Ornamental Ring ────────────────── */

function OrnamentalRing({
  radius = 2.5,
  tube = 0.04,
  position = [0, 0, 0] as [number, number, number],
  rotationSpeed = 0.3,
}: {
  radius?: number;
  tube?: number;
  position?: [number, number, number];
  rotationSpeed?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.x = t * rotationSpeed * 0.5;
    meshRef.current.rotation.y = t * rotationSpeed;
    meshRef.current.rotation.z = Math.sin(t * 0.3) * 0.1;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <torusGeometry args={[radius, tube, 32, 100]} />
      <meshStandardMaterial
        color="#D4AF5F"
        emissive="#8B6914"
        emissiveIntensity={0.3}
        roughness={0.15}
        metalness={1}
      />
    </mesh>
  );
}

/* ── Gold Ornamental Diamond ─────────────── */

function OrnamentalDiamond({
  position = [0, 0, 0] as [number, number, number],
  scale = 1,
}: {
  position?: [number, number, number];
  scale?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.4;
    meshRef.current.position.y = position[1] + Math.sin(t * 0.8) * 0.15;
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.2}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <octahedronGeometry args={[0.6, 0]} />
        <meshStandardMaterial
          color="#D4AF5F"
          emissive="#8B6914"
          emissiveIntensity={0.4}
          roughness={0.1}
          metalness={1}
        />
      </mesh>
    </Float>
  );
}

/* ── Ornamental Arch Structure ───────────── */

function OrnamentalArch() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(t * 0.15) * 0.1;
  });

  return (
    <group ref={groupRef}>
      {/* Outer ring */}
      <OrnamentalRing radius={3.5} tube={0.025} rotationSpeed={0.15} />
      {/* Middle ring */}
      <OrnamentalRing radius={2.8} tube={0.03} rotationSpeed={-0.25} />
      {/* Inner ring */}
      <OrnamentalRing radius={2} tube={0.035} rotationSpeed={0.35} />
      {/* Central diamond */}
      <OrnamentalDiamond position={[0, 0, 0]} scale={0.8} />
      {/* Accent diamonds */}
      <OrnamentalDiamond position={[2.5, 1, 0]} scale={0.3} />
      <OrnamentalDiamond position={[-2.2, -0.8, 0.5]} scale={0.25} />
      <OrnamentalDiamond position={[1.5, -1.5, -0.5]} scale={0.2} />
    </group>
  );
}

/* ── Main 3D Scene ───────────────────────── */

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.15} />
        <pointLight position={[5, 5, 5]} intensity={0.8} color="#D4AF5F" />
        <pointLight position={[-5, 3, 3]} intensity={0.4} color="#E8D6A3" />
        <pointLight position={[0, -3, 5]} intensity={0.3} color="#D4AF5F" />
        <spotLight
          position={[0, 8, 4]}
          angle={0.3}
          penumbra={0.8}
          intensity={0.5}
          color="#D4AF5F"
        />

        {/* Main ornamental structure */}
        <OrnamentalArch />

        {/* Floating gold particles */}
        <GoldParticles count={150} />

        {/* Environment for realistic reflections */}
        <Environment preset="night" />
      </Canvas>
    </div>
  );
}
