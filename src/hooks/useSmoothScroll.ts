"use client";

import { useEffect, useRef } from "react";
import type Lenis from "lenis";

export function useSmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const isTouchDevice =
      window.matchMedia("(pointer: coarse)").matches ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0;

    if (prefersReducedMotion || isTouchDevice) return;

    let lenis: Lenis | null = null;
    let tickerCallback: ((time: number) => void) | null = null;
    let isMounted = true;

    const init = async () => {
      const [{ default: LenisClass }, { gsap }, { ScrollTrigger }] =
        await Promise.all([
          import("lenis"),
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);

      if (!isMounted) return;

      gsap.registerPlugin(ScrollTrigger);

      lenis = new LenisClass({
        duration: 1.25,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        touchMultiplier: 1.8,
      });

      lenisRef.current = lenis;

      lenis.on("scroll", ScrollTrigger.update);

      tickerCallback = (time: number) => {
        lenis?.raf(time * 1000);
      };

      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(0);
    };

    init();

    return () => {
      isMounted = false;
      if (tickerCallback) {
        import("gsap").then(({ gsap }) => {
          if (tickerCallback) gsap.ticker.remove(tickerCallback);
        });
      }
      lenis?.destroy();
    };
  }, []);

  return lenisRef;
}
