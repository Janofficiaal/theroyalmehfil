"use client";

import { useRef, useMemo, MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface PalaceDoors3DProps {
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

/* ── Ornate Gold Door Panel ──────────────────────── */
function OrnateGoldDoorPanel({
  side,
  scrollProgressRef,
}: {
  side: "left" | "right";
  scrollProgressRef: MutableRefObject<number>;
}) {
  const pivotRef = useRef<THREE.Group>(null);
  const dir = side === "left" ? 1 : -1;

  const doorWidth = 2.8;
  const doorHeight = 6.2;
  const doorDepth = 0.18;

  // Create ornate gold door texture procedurally
  const doorTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 1024;
    const ctx = canvas.getContext("2d")!;

    // Deep rich dark golden brown base
    const baseGrad = ctx.createLinearGradient(0, 0, 0, 1024);
    baseGrad.addColorStop(0, "#3D2A0F");
    baseGrad.addColorStop(0.3, "#5C3D14");
    baseGrad.addColorStop(0.5, "#4A3010");
    baseGrad.addColorStop(0.7, "#5C3D14");
    baseGrad.addColorStop(1, "#3D2A0F");
    ctx.fillStyle = baseGrad;
    ctx.fillRect(0, 0, 512, 1024);

    // Gold border frame
    ctx.strokeStyle = "#B88A38";
    ctx.lineWidth = 8;
    ctx.strokeRect(20, 20, 472, 984);

    // Inner border
    ctx.strokeStyle = "#D4AF5F";
    ctx.lineWidth = 3;
    ctx.strokeRect(40, 40, 432, 944);

    // Ornate panels (3 panels vertically)
    const panels = [
      { y: 60, h: 280 },
      { y: 370, h: 280 },
      { y: 680, h: 280 },
    ];

    panels.forEach((panel) => {
      // Panel recessed area
      const panelGrad = ctx.createLinearGradient(60, panel.y, 452, panel.y + panel.h);
      panelGrad.addColorStop(0, "#4A3010");
      panelGrad.addColorStop(0.5, "#6B4E20");
      panelGrad.addColorStop(1, "#4A3010");
      ctx.fillStyle = panelGrad;
      ctx.fillRect(70, panel.y, 372, panel.h);

      // Panel gold border
      ctx.strokeStyle = "#C9A84C";
      ctx.lineWidth = 2.5;
      ctx.strokeRect(70, panel.y, 372, panel.h);

      // Ornamental floral pattern inside panel
      const cx = 256;
      const cy = panel.y + panel.h / 2;

      // Central medallion
      ctx.beginPath();
      ctx.ellipse(cx, cy, 60, 80, 0, 0, Math.PI * 2);
      ctx.strokeStyle = "#D4AF5F";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Inner ellipse
      ctx.beginPath();
      ctx.ellipse(cx, cy, 40, 55, 0, 0, Math.PI * 2);
      ctx.strokeStyle = "#B88A38";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Floral rays
      for (let a = 0; a < 8; a++) {
        const angle = (a / 8) * Math.PI * 2;
        const r1 = 65;
        const r2 = 110;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(angle) * r1, cy + Math.sin(angle) * r1 * 1.2);
        ctx.lineTo(cx + Math.cos(angle) * r2, cy + Math.sin(angle) * r2 * 1.2);
        ctx.strokeStyle = "#C9A84C";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Small diamond at ray end
        const dx = cx + Math.cos(angle) * r2;
        const dy = cy + Math.sin(angle) * r2 * 1.2;
        ctx.save();
        ctx.translate(dx, dy);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.moveTo(0, -5);
        ctx.lineTo(4, 0);
        ctx.lineTo(0, 5);
        ctx.lineTo(-4, 0);
        ctx.closePath();
        ctx.fillStyle = "#D4AF5F";
        ctx.fill();
        ctx.restore();
      }

      // Corner flourishes
      const corners = [
        [75, panel.y + 5],
        [437, panel.y + 5],
        [75, panel.y + panel.h - 5],
        [437, panel.y + panel.h - 5],
      ];
      corners.forEach(([fcx, fcy]) => {
        ctx.beginPath();
        ctx.arc(fcx, fcy, 15, 0, Math.PI * 2);
        ctx.strokeStyle = "#B88A38";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(fcx, fcy, 5, 0, Math.PI * 2);
        ctx.fillStyle = "#D4AF5F";
        ctx.fill();
      });
    });

    // Top decorative arch pattern
    ctx.beginPath();
    ctx.moveTo(60, 50);
    ctx.quadraticCurveTo(256, -20, 452, 50);
    ctx.strokeStyle = "#D4AF5F";
    ctx.lineWidth = 3;
    ctx.stroke();

    // Bottom decorative element
    ctx.beginPath();
    ctx.moveTo(150, 980);
    ctx.lineTo(362, 980);
    ctx.strokeStyle = "#C9A84C";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Scattered gold dots for sparkle
    for (let i = 0; i < 80; i++) {
      const sx = seededUnit(i * 7 + 1) * 440 + 36;
      const sy = seededUnit(i * 7 + 2) * 950 + 37;
      const sr = 1 + seededUnit(i * 7 + 3) * 2;
      ctx.beginPath();
      ctx.arc(sx, sy, sr, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(212, 175, 95, ${0.2 + seededUnit(i * 7 + 4) * 0.4})`;
      ctx.fill();
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  useFrame(() => {
    if (!pivotRef.current) return;
    const progress = scrollProgressRef.current;
    // Doors open between 15% and 40% scroll
    const openAmount = smoothstep(0.15, 0.40, progress);
    const maxAngle = Math.PI * 0.42; // ~76 degrees
    pivotRef.current.rotation.y = dir * openAmount * maxAngle;
  });

  return (
    <group position={[dir * (doorWidth / 2), 0, 0]}>
      {/* Pivot point at the hinge edge */}
      <group ref={pivotRef}>
        <group position={[-dir * (doorWidth / 2), 0, 0]}>
          {/* Main Door Body */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[doorWidth, doorHeight, doorDepth]} />
            <meshStandardMaterial
              color="#6B4E20"
              metalness={0.55}
              roughness={0.35}
            />
          </mesh>

          {/* Front Face Ornate Texture */}
          <mesh position={[0, 0, doorDepth / 2 + 0.002]}>
            <planeGeometry args={[doorWidth - 0.05, doorHeight - 0.05]} />
            <meshStandardMaterial
              map={doorTexture}
              metalness={0.6}
              roughness={0.3}
              side={side === "right" ? THREE.BackSide : THREE.FrontSide}
            />
          </mesh>

          {/* Back Face (dark interior) */}
          <mesh position={[0, 0, -doorDepth / 2 - 0.002]}>
            <planeGeometry args={[doorWidth - 0.05, doorHeight - 0.05]} />
            <meshStandardMaterial
              color="#1A1008"
              metalness={0.3}
              roughness={0.7}
              side={THREE.BackSide}
            />
          </mesh>

          {/* Gold Edge Trim (hinge side) */}
          <mesh position={[dir * doorWidth / 2 - dir * 0.06, 0, 0]}>
            <boxGeometry args={[0.1, doorHeight + 0.05, doorDepth + 0.04]} />
            <meshStandardMaterial color="#B88A38" metalness={0.9} roughness={0.15} />
          </mesh>

          {/* Gold Edge Trim (center seam side) */}
          <mesh position={[-dir * doorWidth / 2 + dir * 0.06, 0, 0]}>
            <boxGeometry args={[0.1, doorHeight + 0.05, doorDepth + 0.04]} />
            <meshStandardMaterial color="#D4AF5F" metalness={0.95} roughness={0.12} />
          </mesh>

          {/* Top Gold Rail */}
          <mesh position={[0, doorHeight / 2 + 0.02, 0]}>
            <boxGeometry args={[doorWidth + 0.05, 0.1, doorDepth + 0.04]} />
            <meshStandardMaterial color="#B88A38" metalness={0.9} roughness={0.15} />
          </mesh>

          {/* Bottom Gold Rail */}
          <mesh position={[0, -doorHeight / 2 - 0.02, 0]}>
            <boxGeometry args={[doorWidth + 0.05, 0.1, doorDepth + 0.04]} />
            <meshStandardMaterial color="#B88A38" metalness={0.9} roughness={0.15} />
          </mesh>

          {/* Door Handle / Knocker */}
          <group position={[-dir * (doorWidth / 2 - 0.7), -0.2, doorDepth / 2 + 0.06]}>
            {/* Knocker mount plate */}
            <mesh>
              <cylinderGeometry args={[0.12, 0.14, 0.04, 20]} />
              <meshStandardMaterial color="#D4AF5F" metalness={1} roughness={0.12} />
            </mesh>
            {/* Hanging ring */}
            <mesh position={[0, -0.18, 0.04]} rotation={[0.15, 0, 0]}>
              <torusGeometry args={[0.16, 0.028, 14, 28]} />
              <meshStandardMaterial color="#E8D6A3" metalness={1} roughness={0.1} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
}

/* ── Ornate Arch Frame ──────────────────────────── */
function GoldenArchFrame() {
  const doorWidth = 2.8;
  const doorHeight = 6.2;
  const frameWidth = 0.5;
  const totalWidth = doorWidth * 2 + frameWidth * 2;

  return (
    <group>
      {/* Left Pillar */}
      <mesh position={[-(doorWidth + frameWidth / 2), 0, 0]}>
        <boxGeometry args={[frameWidth, doorHeight + 0.6, 0.5]} />
        <meshStandardMaterial color="#3D2A0F" metalness={0.7} roughness={0.25} />
      </mesh>
      {/* Left Pillar Gold Trim */}
      <mesh position={[-(doorWidth + frameWidth / 2), 0, 0.26]}>
        <boxGeometry args={[frameWidth - 0.1, doorHeight + 0.5, 0.02]} />
        <meshStandardMaterial color="#B88A38" metalness={0.85} roughness={0.2} />
      </mesh>

      {/* Right Pillar */}
      <mesh position={[(doorWidth + frameWidth / 2), 0, 0]}>
        <boxGeometry args={[frameWidth, doorHeight + 0.6, 0.5]} />
        <meshStandardMaterial color="#3D2A0F" metalness={0.7} roughness={0.25} />
      </mesh>
      {/* Right Pillar Gold Trim */}
      <mesh position={[(doorWidth + frameWidth / 2), 0, 0.26]}>
        <boxGeometry args={[frameWidth - 0.1, doorHeight + 0.5, 0.02]} />
        <meshStandardMaterial color="#B88A38" metalness={0.85} roughness={0.2} />
      </mesh>

      {/* Top Lintel */}
      <mesh position={[0, doorHeight / 2 + 0.35, 0]}>
        <boxGeometry args={[totalWidth + 0.4, 0.6, 0.55]} />
        <meshStandardMaterial color="#3D2A0F" metalness={0.7} roughness={0.25} />
      </mesh>
      {/* Top Lintel Gold Face */}
      <mesh position={[0, doorHeight / 2 + 0.35, 0.285]}>
        <boxGeometry args={[totalWidth + 0.3, 0.5, 0.02]} />
        <meshStandardMaterial color="#C9A84C" metalness={0.9} roughness={0.15} />
      </mesh>

      {/* Arch Crown Decoration */}
      <mesh position={[0, doorHeight / 2 + 0.75, 0.1]}>
        <boxGeometry args={[1.5, 0.3, 0.3]} />
        <meshStandardMaterial color="#D4AF5F" metalness={0.95} roughness={0.1} />
      </mesh>

      {/* Floor Threshold */}
      <mesh position={[0, -doorHeight / 2 - 0.15, 0]}>
        <boxGeometry args={[totalWidth + 1.5, 0.2, 1.2]} />
        <meshStandardMaterial color="#1A1510" metalness={0.4} roughness={0.5} />
      </mesh>

      {/* Outer Walls (dark stone) */}
      <mesh position={[-(doorWidth + frameWidth + 2.5), 0, -0.1]}>
        <boxGeometry args={[5, doorHeight + 2, 0.3]} />
        <meshStandardMaterial color="#0E0D0A" metalness={0.2} roughness={0.8} />
      </mesh>
      <mesh position={[(doorWidth + frameWidth + 2.5), 0, -0.1]}>
        <boxGeometry args={[5, doorHeight + 2, 0.3]} />
        <meshStandardMaterial color="#0E0D0A" metalness={0.2} roughness={0.8} />
      </mesh>
    </group>
  );
}

/* ── Rose Arrangement on Pedestals ──────────────── */
function RoseArrangement({ side }: { side: "left" | "right" }) {
  const x = side === "left" ? -4.5 : 4.5;

  const roses = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 18; i++) {
      arr.push({
        pos: [
          (seededUnit(i * 3 + 100) - 0.5) * 0.7,
          seededUnit(i * 3 + 101) * 0.8 + 0.3,
          (seededUnit(i * 3 + 102) - 0.5) * 0.6,
        ] as [number, number, number],
        scale: 0.06 + seededUnit(i * 3 + 103) * 0.06,
        color: ["#650F19", "#8A1020", "#4A0A12", "#7A0E1C"][i % 4],
      });
    }
    return arr;
  }, []);

  return (
    <group position={[x, -6.2 / 2 + 0.2, 0.3]}>
      {/* Gold Pedestal */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.5, 1.5, 0.5]} />
        <meshStandardMaterial color="#8B6914" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Pedestal top plate */}
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[0.65, 0.08, 0.65]} />
        <meshStandardMaterial color="#D4AF5F" metalness={0.9} roughness={0.15} />
      </mesh>
      {/* Rose cluster */}
      <group position={[0, 1.0, 0]}>
        {roses.map((r, i) => (
          <mesh key={i} position={r.pos}>
            <sphereGeometry args={[r.scale, 8, 8]} />
            <meshStandardMaterial color={r.color} roughness={0.6} metalness={0.05} />
          </mesh>
        ))}
        {/* Green foliage base */}
        <mesh position={[0, 0.15, 0]}>
          <sphereGeometry args={[0.35, 8, 6]} />
          <meshStandardMaterial color="#1A3A12" roughness={0.8} />
        </mesh>
      </group>
    </group>
  );
}

/* ── Golden Floating Particles ──────────────────── */
function GoldenParticles({
  count,
}: {
  count: number;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        x: (seededUnit(i * 5 + 200) - 0.5) * 16,
        y: (seededUnit(i * 5 + 201) - 0.5) * 10,
        z: seededUnit(i * 5 + 202) * 8 - 2,
        speed: 0.1 + seededUnit(i * 5 + 203) * 0.25,
        size: 0.015 + seededUnit(i * 5 + 204) * 0.025,
        offset: seededUnit(i * 5 + 205) * Math.PI * 2,
      });
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      dummy.position.set(
        p.x + Math.sin(t * 0.3 + p.offset) * 0.5,
        p.y + Math.sin(t * p.speed + p.offset) * 0.8,
        p.z + Math.cos(t * 0.2 + p.offset) * 0.3
      );
      dummy.scale.setScalar(p.size * (0.8 + Math.sin(t * 1.5 + p.offset) * 0.3));
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshStandardMaterial
        color="#D4AF5F"
        emissive="#B88A38"
        emissiveIntensity={0.6}
        metalness={0.9}
        roughness={0.2}
      />
    </instancedMesh>
  );
}

/* ── Warm Light Behind Doors ────────────────────── */
function WarmBackLight({
  scrollProgressRef,
}: {
  scrollProgressRef: MutableRefObject<number>;
}) {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame(() => {
    if (!lightRef.current) return;
    const progress = scrollProgressRef.current;
    const intensity = smoothstep(0.1, 0.35, progress) * 8;
    lightRef.current.intensity = intensity;
  });

  return (
    <>
      <pointLight
        ref={lightRef}
        position={[0, 1, -3]}
        color="#FFD584"
        intensity={0}
        distance={20}
        decay={1.5}
      />
      <pointLight
        position={[0, -1.5, -2]}
        color="#E8C87A"
        intensity={1.5}
        distance={12}
        decay={2}
      />
    </>
  );
}

/* ── Main Exported Scene ────────────────────────── */
export default function PalaceDoors3D({
  scrollProgressRef,
}: PalaceDoors3DProps) {
  return (
    <group position={[0, 0, 0]}>
      {/* Lighting */}
      <ambientLight intensity={0.18} color="#FFF0C9" />
      <directionalLight position={[0, 6, 10]} intensity={1.5} color="#E8D6A3" />
      <pointLight position={[-5, 3, 7]} intensity={1.4} distance={18} color="#D4AF5F" />
      <pointLight position={[5, 3, 7]} intensity={1.4} distance={18} color="#D4AF5F" />

      {/* Golden Arch Frame */}
      <GoldenArchFrame />

      {/* 3D Palace Doors */}
      <OrnateGoldDoorPanel side="left" scrollProgressRef={scrollProgressRef} />
      <OrnateGoldDoorPanel side="right" scrollProgressRef={scrollProgressRef} />

      {/* Rose Arrangements */}
      <RoseArrangement side="left" />
      <RoseArrangement side="right" />

      {/* Warm Light Emerging from Behind */}
      <WarmBackLight scrollProgressRef={scrollProgressRef} />

      {/* Golden Dust Particles */}
      <GoldenParticles count={150} />
    </group>
  );
}
