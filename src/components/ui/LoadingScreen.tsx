"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function LoadingScreen() {
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => setIsLoaded(true), 100);
      },
    });

    tl.fromTo(
      logoRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
    );
    tl.fromTo(
      lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.35, ease: "power2.inOut" },
      "-=0.1"
    );
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.inOut",
      delay: 0.1,
    });
  }, []);

  if (isLoaded) return null;

  return (
    <div
      ref={containerRef}
      className="loading-screen"
    >
      <div className="text-center">
        <div ref={logoRef} className="opacity-0">
          <h1 className="font-heading text-3xl md:text-4xl tracking-[0.2em] text-champagne font-light">
            THE ROYAL
          </h1>
          <p className="font-heading text-sm md:text-base tracking-[0.5em] text-gold mt-1">
            MEHFIL
          </p>
        </div>
        <div
          ref={lineRef}
          className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-6 origin-center scale-x-0"
        />
      </div>
    </div>
  );
}
