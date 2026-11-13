"use client";

import { useRef, useMemo, useEffect, MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  createOrnateDoorTexture,
  createMandalaCarpetTexture,
} from "./palaceTextures";

interface GoldenPalaceDoorsProps {
  scrollProgressRef: MutableRefObject<number>;
}

function clamp01(v: number): number {
  return Math.max(0, Math.min(1, v));
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

function seededUnit(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

/* ── Single Hinged Ornate Magenta-Pink & Gold Door Leaf ────── */

function DoorLeaf({
  side,
  doorWidth,
  doorHeight,
  doorTexture,
}: {
  side: "left" | "right";
  doorWidth: number;
  doorHeight: number;
  doorTexture: THREE.CanvasTexture;
}) {
  const dir = side === "left" ? 1 : -1;
  const centerX = dir * (doorWidth / 2);
  const seamX = dir * doorWidth;

  return (
    <group>
      {/* Solid 3D Door Slab */}
      <mesh position={[centerX, 0, 0]}>
        <boxGeometry args={[doorWidth - 0.02, doorHeight, 0.16]} />
        <meshStandardMaterial color="#8A1038" metalness={0.22} roughness={0.45} />
      </mesh>

      {/* Ornate Filigree Front Face */}
      <mesh
        position={[centerX, 0, 0.085]}
        scale={[side === "right" ? -1 : 1, 1, 1]}
      >
        <planeGeometry args={[doorWidth - 0.06, doorHeight - 0.06]} />
        <meshStandardMaterial
          map={doorTexture}
          metalness={0.32}
          roughness={0.35}
        />
      </mesh>

      {/* Raised 3D Gold Edge Stiles & Rails */}
      <mesh position={[seamX - dir * 0.08, 0, 0.1]}>
        <boxGeometry args={[0.14, doorHeight, 0.07]} />
        <meshStandardMaterial color="#E8D6A3" metalness={0.98} roughness={0.16} />
      </mesh>
      <mesh position={[dir * 0.08, 0, 0.1]}>
        <boxGeometry args={[0.14, doorHeight, 0.07]} />
        <meshStandardMaterial color="#D4AF5F" metalness={0.96} roughness={0.2} />
      </mesh>

      {/* Central Sculpted Gold Door Knocker Ring */}
      <group position={[seamX - dir * 0.42, -0.1, 0.14]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.16, 0.18, 0.06, 20]} />
          <meshStandardMaterial color="#D4AF5F" metalness={1} roughness={0.18} />
        </mesh>
        <mesh position={[0, -0.22, 0.05]} rotation={[0.14, 0, 0]}>
          <torusGeometry args={[0.24, 0.042, 16, 36]} />
          <meshStandardMaterial color="#E8D6A3" metalness={1} roughness={0.14} />
        </mesh>
      </group>
    </group>
  );
}

/* ── Flowing 3D Pink Silk Curtain / Drape (Left & Right) ───── */

function SilkCurtain({
  side,
  xPos,
  height,
}: {
  side: "left" | "right";
  xPos: number;
  height: number;
}) {
  const dir = side === "left" ? 1 : -1;
  // Upper swept fold + lower cascading fold gathered at gold tieback ring
  return (
    <group position={[xPos, 0, 0.44]}>
      {/* Upper Pleated Silk Drape */}
      {[0, 0.14, -0.14].map((xOff, i) => (
        <mesh
          key={`top-${i}`}
          position={[xOff + dir * 0.08, 1.05, i * 0.03]}
          rotation={[0, 0, dir * 0.16]}
        >
          <cylinderGeometry args={[0.26, 0.12, height * 0.48, 14]} />
          <meshStandardMaterial
            color={i === 1 ? "#DF5C84" : "#C93B68"}
            roughness={0.62}
            metalness={0.08}
          />
        </mesh>
      ))}

      {/* Gold Tieback Ring */}
      <mesh
        position={[dir * 0.24, -0.15, 0.06]}
        rotation={[Math.PI / 2, 0, dir * 0.2]}
      >
        <torusGeometry args={[0.19, 0.032, 12, 28]} />
        <meshStandardMaterial color="#E8D6A3" metalness={1} roughness={0.18} />
      </mesh>

      {/* Lower Flowing Silk Skirt */}
      {[0, 0.12, -0.12].map((xOff, i) => (
        <mesh
          key={`bot-${i}`}
          position={[dir * 0.24 + xOff * 0.7, -1.65, i * 0.025]}
          rotation={[0, 0, -dir * 0.06]}
        >
          <cylinderGeometry args={[0.13, 0.3, height * 0.56, 14]} />
          <meshStandardMaterial
            color={i === 1 ? "#DF5C84" : "#B82956"}
            roughness={0.64}
            metalness={0.08}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ── Lush 3D Pink, Blush & White Rose Floral Arch & Bushes ──── */

function RoseArchwayCanopy({
  doorWidth,
  doorHeight,
}: {
  doorWidth: number;
  doorHeight: number;
}) {
  const roseMeshRef = useRef<THREE.InstancedMesh>(null);
  const leafMeshRef = useRef<THREE.InstancedMesh>(null);

  const { roses, leaves } = useMemo(() => {
    const rPalette = ["#F7B8CA", "#E86A8D", "#C21E56", "#FFF7F4", "#D94370"];
    const rList: {
      x: number;
      y: number;
      z: number;
      s: number;
      color: string;
    }[] = [];
    const lList: {
      x: number;
      y: number;
      z: number;
      rx: number;
      ry: number;
      s: number;
    }[] = [];

    // Overarching top & side floral arch (115 blossoms)
    for (let i = 0; i < 115; i++) {
      const t = i / 114;
      const angle = t * Math.PI;
      const r1 = seededUnit(i * 5 + 1);
      const r2 = seededUnit(i * 5 + 2);
      const r3 = seededUnit(i * 5 + 3);

      const archRx = doorWidth + 0.85 + (r1 - 0.5) * 0.85;
      const archRy = 1.65 + (r2 - 0.5) * 0.65;
      const x = Math.cos(angle) * archRx;
      const y = doorHeight / 2 - 0.25 + Math.sin(angle) * archRy;
      const z = 0.52 + r3 * 0.42;

      rList.push({
        x,
        y,
        z,
        s: 0.14 + r1 * 0.13,
        color: rPalette[i % rPalette.length],
      });

      if (i % 2 === 0) {
        lList.push({
          x: x + (r2 - 0.5) * 0.25,
          y: y + (r1 - 0.5) * 0.25,
          z: z - 0.12,
          rx: r1 * Math.PI,
          ry: r2 * Math.PI,
          s: 0.2 + r3 * 0.12,
        });
      }
    }

    // Side cascading vines down left & right curtains (36 blossoms)
    for (let i = 0; i < 36; i++) {
      const side = i % 2 === 0 ? -1 : 1;
      const idx = Math.floor(i / 2);
      const r1 = seededUnit(i * 7 + 11);
      const r2 = seededUnit(i * 7 + 12);
      const x = side * (doorWidth + 0.85 + (r1 - 0.5) * 0.55);
      const y = doorHeight / 2 - 0.5 - idx * 0.24;
      const z = 0.52 + r2 * 0.35;
      rList.push({
        x,
        y,
        z,
        s: 0.13 + r1 * 0.12,
        color: rPalette[(i + 2) % rPalette.length],
      });
    }

    // Foreground bottom-left & bottom-right white & blush rose bushes (32 blossoms)
    for (let i = 0; i < 32; i++) {
      const side = i % 2 === 0 ? -1 : 1;
      const r1 = seededUnit(i * 6 + 31);
      const r2 = seededUnit(i * 6 + 32);
      const r3 = seededUnit(i * 6 + 33);
      const x = side * (2.6 + r1 * 2.2);
      const y = -doorHeight / 2 + 0.1 + r2 * 1.1;
      const z = 0.9 + r3 * 1.6;
      rList.push({
        x,
        y,
        z,
        s: 0.15 + r1 * 0.12,
        color: i % 3 === 0 ? "#FFF8F5" : i % 3 === 1 ? "#F7B8CA" : "#E86A8D",
      });
      lList.push({
        x: x + (r2 - 0.5) * 0.2,
        y: y - 0.08,
        z: z - 0.1,
        rx: r1 * 2,
        ry: r2 * 2,
        s: 0.22,
      });
    }

    return { roses: rList, leaves: lList };
  }, [doorWidth, doorHeight]);

  useEffect(() => {
    const dummy = new THREE.Object3D();
    const color = new THREE.Color();

    if (roseMeshRef.current) {
      roses.forEach((r, i) => {
        dummy.position.set(r.x, r.y, r.z);
        dummy.rotation.set(i * 0.4, i * 0.7, 0);
        dummy.scale.setScalar(r.s);
        dummy.updateMatrix();
        roseMeshRef.current!.setMatrixAt(i, dummy.matrix);
        color.set(r.color);
        roseMeshRef.current!.setColorAt(i, color);
      });
      roseMeshRef.current.instanceMatrix.needsUpdate = true;
      if (roseMeshRef.current.instanceColor) {
        roseMeshRef.current.instanceColor.needsUpdate = true;
      }
    }

    if (leafMeshRef.current) {
      leaves.forEach((l, i) => {
        dummy.position.set(l.x, l.y, l.z);
        dummy.rotation.set(l.rx, l.ry, 0);
        dummy.scale.setScalar(l.s);
        dummy.updateMatrix();
        leafMeshRef.current!.setMatrixAt(i, dummy.matrix);
      });
      leafMeshRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [roses, leaves]);

  return (
    <group>
      <instancedMesh ref={roseMeshRef} args={[undefined, undefined, roses.length]}>
        <icosahedronGeometry args={[1, 2]} />
        <meshStandardMaterial roughness={0.58} metalness={0.04} />
      </instancedMesh>
      <instancedMesh
        ref={leafMeshRef}
        args={[undefined, undefined, leaves.length]}
      >
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color="#1B3D22" roughness={0.78} metalness={0.04} />
      </instancedMesh>
    </group>
  );
}

/* ── Complete Ornate Pink & Gold Mughal Palace Doors ─────────── */

export default function GoldenPalaceDoors({
  scrollProgressRef,
}: GoldenPalaceDoorsProps) {
  const leftHingeRef = useRef<THREE.Group>(null);
  const rightHingeRef = useRef<THREE.Group>(null);
  const seamLightRef = useRef<THREE.PointLight>(null);
  const interiorGlowRef = useRef<THREE.Mesh>(null);
  const smoothedOpen = useRef(0);

  const doorWidth = 2.75;
  const doorHeight = 5.65;
  const doorZ = 2.0;

  const doorTexture = useMemo(() => createOrnateDoorTexture(), []);
  const carpetTexture = useMemo(() => createMandalaCarpetTexture(), []);

  useEffect(() => {
    return () => {
      doorTexture.dispose();
      carpetTexture.dispose();
    };
  }, [doorTexture, carpetTexture]);

  useFrame((_, delta) => {
    const p = scrollProgressRef.current;
    const targetOpen = smoothstep(0.08, 0.28, p);
    const damp = 1 - Math.exp(-7 * Math.min(delta, 0.05));
    smoothedOpen.current += (targetOpen - smoothedOpen.current) * damp;
    const open = smoothedOpen.current;

    const maxAngle = Math.PI * 0.58;

    if (leftHingeRef.current) {
      leftHingeRef.current.rotation.y = -open * maxAngle;
    }
    if (rightHingeRef.current) {
      rightHingeRef.current.rotation.y = open * maxAngle;
    }

    if (seamLightRef.current) {
      seamLightRef.current.intensity =
        1.2 + open * 7.5 * (1 - smoothstep(0.35, 0.58, p));
    }

    if (interiorGlowRef.current) {
      const mat = interiorGlowRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.08 + open * 0.26 * (1 - smoothstep(0.28, 0.42, p));
    }
  });

  return (
    <group position={[0, 0.05, doorZ]}>
      <pointLight
        ref={seamLightRef}
        position={[0, 0.3, -1.2]}
        intensity={1.2}
        distance={16}
        decay={1.9}
        color="#FFF0C9"
      />

      <mesh ref={interiorGlowRef} position={[0, 0, -0.35]}>
        <planeGeometry args={[5.4, 5.5]} />
        <meshBasicMaterial
          color="#FFF0C9"
          transparent
          opacity={0.08}
          depthWrite={false}
        />
      </mesh>

      {/* Ornate Pink & Gold Mandala Welcome Carpet in Front of Doors */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -doorHeight / 2 - 0.44, 2.35]}
      >
        <planeGeometry args={[6.8, 5.2]} />
        <meshStandardMaterial
          map={carpetTexture}
          transparent
          roughness={0.72}
          metalness={0.12}
        />
      </mesh>

      {/* Architectural Stone & Gold Doorway Frame */}
      <group>
        {[-doorWidth - 0.48, doorWidth + 0.48].map((x, i) => (
          <group key={i} position={[x, 0, 0.05]}>
            <mesh>
              <boxGeometry args={[0.92, doorHeight + 1.5, 0.85]} />
              <meshStandardMaterial color="#382C28" metalness={0.18} roughness={0.72} />
            </mesh>
            {/* Gold Jewel-Studded Pilaster Strip */}
            <mesh position={[i === 0 ? 0.35 : -0.35, 0, 0.42]}>
              <boxGeometry args={[0.24, doorHeight + 0.6, 0.08]} />
              <meshStandardMaterial color="#E8D6A3" metalness={0.96} roughness={0.18} />
            </mesh>
          </group>
        ))}

        {/* Top Stone Lintel & Pointed Mughal Gold Arch */}
        <mesh position={[0, doorHeight / 2 + 0.65, 0.05]}>
          <boxGeometry args={[doorWidth * 2 + 6.5, 1.3, 0.9]} />
          <meshStandardMaterial color="#241C1A" metalness={0.22} roughness={0.7} />
        </mesh>
        <mesh position={[0, doorHeight / 2 + 0.04, 0.46]}>
          <boxGeometry args={[doorWidth * 2 + 0.4, 0.14, 0.12]} />
          <meshStandardMaterial color="#E8D6A3" metalness={0.98} roughness={0.16} />
        </mesh>
        {/* Pointed Mughal Arch Crown */}
        <mesh position={[0, doorHeight / 2 + 0.1, 0.42]} scale={[1.18, 0.56, 1]}>
          <torusGeometry args={[doorWidth, 0.12, 16, 64, Math.PI]} />
          <meshStandardMaterial color="#E8D6A3" metalness={1} roughness={0.16} />
        </mesh>

        {/* Outer Blocking Walls */}
        {[-12.5, 12.5].map((x, i) => (
          <mesh key={i} position={[x, 0.5, 0.1]}>
            <boxGeometry args={[12, 11, 0.6]} />
            <meshStandardMaterial color="#080806" roughness={0.88} metalness={0.08} />
          </mesh>
        ))}
        <mesh position={[0, doorHeight / 2 + 3.8, 0.1]}>
          <boxGeometry args={[34, 5, 0.6]} />
          <meshStandardMaterial color="#080806" roughness={0.88} metalness={0.08} />
        </mesh>
      </group>

      {/* Flowing Pink Silk Curtains Flanking the Doors */}
      <SilkCurtain side="left" xPos={-doorWidth - 0.25} height={doorHeight} />
      <SilkCurtain side="right" xPos={doorWidth + 0.25} height={doorHeight} />

      {/* Lush 3D Pink, Blush & White Rose Canopy + Foreground Bushes */}
      <RoseArchwayCanopy doorWidth={doorWidth} doorHeight={doorHeight} />

      {/* Hinged Ornate Magenta-Pink & Gold Double Doors */}
      <group ref={leftHingeRef} position={[-doorWidth, 0, 0]}>
        <DoorLeaf
          side="left"
          doorWidth={doorWidth}
          doorHeight={doorHeight}
          doorTexture={doorTexture}
        />
      </group>
      <group ref={rightHingeRef} position={[doorWidth, 0, 0]}>
        <DoorLeaf
          side="right"
          doorWidth={doorWidth}
          doorHeight={doorHeight}
          doorTexture={doorTexture}
        />
      </group>
    </group>
  );
}
