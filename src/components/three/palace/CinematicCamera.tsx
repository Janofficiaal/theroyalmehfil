"use client";

import { useRef, MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CinematicCameraProps {
  scrollProgressRef: MutableRefObject<number>;
  isMobile: boolean;
  reducedMotion: boolean;
}

function clamp01(v: number): number {
  return Math.max(0, Math.min(1, v));
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * clamp01(t);
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

export default function CinematicCamera({
  scrollProgressRef,
  isMobile,
  reducedMotion,
}: CinematicCameraProps) {
  const smoothedProgress = useRef(0);

  useFrame((state, delta) => {
    const target = scrollProgressRef.current;
    const damp = 1 - Math.exp(-6 * Math.min(delta, 0.05));
    smoothedProgress.current += (target - smoothedProgress.current) * damp;
    const p = smoothedProgress.current;

    const cam = state.camera;

    // Continuous zoom trajectory:
    // 0.00 -> 0.08: Facing closed pink-and-gold doors (z: 9.8 -> 9.0)
    // 0.08 -> 0.24: Doors swing open, smoothly revealing the grand crimson ballroom vista (z: 9.0 -> 2.0)
    // 0.24 -> 0.60: Cinematic zoom down the red carpet right toward the thrones & stage (z: 2.0 -> -7.5)
    // 0.60 -> 0.74: Holding close to the stage as Golden Ring rises (z: -7.5 -> -9.2)
    // 0.74 -> 0.90: Accelerating through the Golden Ring (z: -9.2 -> -15.2)
    // 0.90 -> 1.00: Grand Brand Reveal (z: -15.2 -> -16.0)

    const startZ = isMobile ? 11.8 : 9.8;
    let camZ = startZ;

    if (p < 0.08) {
      camZ = lerp(startZ, 9.0, smoothstep(0, 0.08, p));
    } else if (p < 0.24) {
      camZ = lerp(9.0, 2.0, smoothstep(0.08, 0.24, p));
    } else if (p < 0.6) {
      camZ = lerp(2.0, -7.5, smoothstep(0.24, 0.6, p));
    } else if (p < 0.74) {
      camZ = lerp(-7.5, -9.2, smoothstep(0.6, 0.74, p));
    } else if (p < 0.9) {
      camZ = lerp(-9.2, -15.2, smoothstep(0.74, 0.9, p));
    } else {
      camZ = lerp(-15.2, -16.0, smoothstep(0.9, 1.0, p));
    }

    const camY =
      0.15 +
      Math.sin(smoothstep(0.22, 0.6, p) * Math.PI) * 0.15 +
      smoothstep(0.64, 0.88, p) * 0.25;

    const parallaxStrength =
      reducedMotion || isMobile ? 0 : 1 - smoothstep(0.74, 0.88, p);
    const pointerX = state.pointer.x * 0.34 * parallaxStrength;
    const pointerY = state.pointer.y * 0.18 * parallaxStrength;

    cam.position.set(
      cam.position.x + (pointerX - cam.position.x) * 0.06,
      cam.position.y + (camY + pointerY - cam.position.y) * 0.06,
      camZ
    );

    const lookY =
      0.1 -
      smoothstep(0.24, 0.6, p) * 0.35 +
      smoothstep(0.64, 0.9, p) * 0.65;
    cam.lookAt(0, lookY, camZ - 10);

    if (cam instanceof THREE.PerspectiveCamera) {
      const baseFov = isMobile ? 54 : 44;
      const targetFov =
        baseFov +
        smoothstep(0.26, 0.62, p) * 4 +
        smoothstep(0.74, 0.91, p) * 16;
      if (Math.abs(cam.fov - targetFov) > 0.01) {
        cam.fov = targetFov;
        cam.updateProjectionMatrix();
      }
    }
  });

  return null;
}
