"use client";

import { useEffect, useState, Suspense, MutableRefObject } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import GoldenPalaceDoors from "./GoldenPalaceDoors";
import RoyalBallroom from "./RoyalBallroom";
import GoldenRing from "./GoldenRing";
import GoldenParticles from "./GoldenParticles";
import CinematicCamera from "./CinematicCamera";

interface RoyalEntranceSceneProps {
  scrollProgressRef: MutableRefObject<number>;
}

function checkWebGLSupport(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

export default function RoyalEntranceScene({
  scrollProgressRef,
}: RoyalEntranceSceneProps) {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  const [reducedMotion, setReducedMotion] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  );
  const [webglAvailable] = useState(() => checkWebGLSupport());

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

  if (!webglAvailable) {
    return (
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 35%, rgba(212,175,95,0.16) 0%, #080806 72%)",
        }}
      />
    );
  }

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{
          position: [0, 0.2, isMobile ? 11.8 : 9.8],
          fov: isMobile ? 54 : 44,
          near: 0.1,
          far: 60,
        }}
        dpr={isMobile ? [1, 1.2] : [1, 1.75]}
        gl={{
          antialias: !isMobile,
          alpha: false,
          powerPreference: "high-performance",
        }}
      >
        <color attach="background" args={["#000000"]} />
        <fog attach="fog" args={["#000000", 18, 48]} />

        {/* Ambient + Warm Entrance Key Lighting */}
        <ambientLight intensity={0.22} color="#FFF0C9" />
        <directionalLight
          position={[0, 6, 9]}
          intensity={1.35}
          color="#E8D6A3"
        />
        <pointLight
          position={[-4, 2, 6]}
          intensity={1.2}
          distance={16}
          color="#D4AF5F"
        />
        <pointLight
          position={[4, 2, 6]}
          intensity={1.2}
          distance={16}
          color="#D4AF5F"
        />

        <CinematicCamera
          scrollProgressRef={scrollProgressRef}
          isMobile={isMobile}
          reducedMotion={reducedMotion}
        />

        <GoldenPalaceDoors scrollProgressRef={scrollProgressRef} />

        <Suspense fallback={null}>
          <RoyalBallroom
            isMobile={isMobile}
            scrollProgressRef={scrollProgressRef}
          />
        </Suspense>

        <GoldenRing
          scrollProgressRef={scrollProgressRef}
          reducedMotion={reducedMotion}
          isMobile={isMobile}
        />

        <GoldenParticles
          count={isMobile ? 75 : 240}
          scrollProgressRef={scrollProgressRef}
          reducedMotion={reducedMotion}
        />

        {/* Procedural Studio Environment for Realistic Gold Reflections */}
        <Environment resolution={256}>
          <group rotation={[-Math.PI / 3, 0, 1]}>
            <Lightformer
              form="circle"
              intensity={3.4}
              color="#FFF0C9"
              scale={6}
              position={[0, 5, -4]}
            />
            <Lightformer
              form="rect"
              intensity={2.2}
              color="#D4AF5F"
              scale={[8, 2, 1]}
              position={[-6, 2, 2]}
              target={[0, 0, 0]}
            />
            <Lightformer
              form="rect"
              intensity={2.0}
              color="#E8D6A3"
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
