"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import { Volume2, VolumeX } from "lucide-react";
import BrandReveal from "./BrandReveal";

const RoyalEntranceScene = dynamic(
  () => import("@/components/three/palace/RoyalEntranceScene"),
  { ssr: false }
);

gsap.registerPlugin(ScrollTrigger);

export default function ScrollExperience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef<number>(0);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const [soundOn, setSoundOn] = useState(false);

  const toggleAmbientAudio = () => {
    if (typeof window === "undefined") return;
    if (!soundOn) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!audioCtxRef.current && AudioCtx) {
        const ctx = new AudioCtx();
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
        masterGain.connect(ctx.destination);

        // Soft warm royal harmonic chord (A2 + E3 + C#4)
        [110, 164.81, 277.18].forEach((freq) => {
          const osc = ctx.createOscillator();
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          osc.connect(masterGain);
          osc.start();
        });

        audioCtxRef.current = ctx;
        gainNodeRef.current = masterGain;
      }
      if (audioCtxRef.current && gainNodeRef.current) {
        audioCtxRef.current.resume();
        gainNodeRef.current.gain.exponentialRampToValueAtTime(
          0.035,
          audioCtxRef.current.currentTime + 0.8
        );
      }
      setSoundOn(true);
    } else {
      if (audioCtxRef.current && gainNodeRef.current) {
        gainNodeRef.current.gain.exponentialRampToValueAtTime(
          0.0001,
          audioCtxRef.current.currentTime + 0.5
        );
      }
      setSoundOn(false);
    }
  };

  useEffect(() => {
    return () => {
      audioCtxRef.current?.close().catch(() => {});
    };
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      scrollProgressRef.current = 1;
      gsap.set(".entrance-overlay", { opacity: 0 });
      gsap.set(".brand-reveal-layer", { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      // Initial entrance text reveal
      gsap.fromTo(
        ".entrance-fade",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          stagger: 0.14,
          ease: "power3.out",
          delay: 0.9,
        }
      );

      // Single coordinated ScrollTrigger timeline (Scenes 01 -> 06, extended cinematic pacing)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=820%",
          pin: true,
          scrub: 1.25,
          anticipatePin: 1,
          onUpdate: (self) => {
            scrollProgressRef.current = self.progress;
          },
        },
      });

      // Scene 01 -> 02 (8% - 16%): Entrance title & scroll prompt fade away as wide doors open
      tl.to(
        ".entrance-overlay",
        { y: -40, opacity: 0, duration: 0.09, ease: "power2.in" },
        0.07
      );

      // Scene 03-04 subtle chapter whispers while entering & watching stage decorate
      tl.fromTo(
        ".chapter-ballroom",
        { y: 18, opacity: 0 },
        { y: 0, opacity: 0.9, duration: 0.06, ease: "power2.out" },
        0.32
      ).to(
        ".chapter-ballroom",
        { y: -18, opacity: 0, duration: 0.06, ease: "power2.in" },
        0.45
      );

      tl.fromTo(
        ".chapter-staging",
        { y: 18, opacity: 0 },
        { y: 0, opacity: 0.95, duration: 0.06, ease: "power2.out" },
        0.48
      ).to(
        ".chapter-staging",
        { y: -18, opacity: 0, duration: 0.06, ease: "power2.in" },
        0.68
      );

      tl.fromTo(
        ".chapter-ring",
        { y: 18, opacity: 0 },
        { y: 0, opacity: 0.9, duration: 0.06, ease: "power2.out" },
        0.7
      ).to(
        ".chapter-ring",
        { y: -18, opacity: 0, duration: 0.06, ease: "power2.in" },
        0.8
      );

      // Scene 05 (80% - 92%): Golden light bloom fills viewport while passing through ring
      tl.fromTo(
        ".golden-portal-flash",
        { opacity: 0 },
        { opacity: 0.84, duration: 0.07, ease: "power2.in" },
        0.81
      ).to(
        ".golden-portal-flash",
        { opacity: 0, duration: 0.09, ease: "power2.out" },
        0.88
      );

      // Dark obsidian transition backdrop for crisp Scene 06 Brand Reveal
      tl.fromTo(
        ".sanctuary-backdrop",
        { opacity: 0 },
        { opacity: 0.95, duration: 0.09, ease: "power2.out" },
        0.85
      );

      // Scene 06 (89% - 100%): Grand Brand Reveal
      tl.fromTo(
        ".brand-reveal-layer",
        { opacity: 0 },
        { opacity: 1, duration: 0.04 },
        0.89
      ).fromTo(
        ".brand-reveal-item",
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.09,
          stagger: 0.015,
          ease: "power3.out",
        },
        0.9
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="The Royal Mehfil 3D Palace Entrance"
      className="relative h-screen min-h-[660px] w-full overflow-hidden bg-[#080806]"
    >
      {/* Full-Viewport 3D Three.js Palace, Doors, Ballroom, Ring & Particles */}
      <RoyalEntranceScene scrollProgressRef={scrollProgressRef} />

      {/* Scene 01: Mysterious Royal Entrance Overlay (Above/In Front of Closed Doors) */}
      <div className="entrance-overlay absolute inset-0 z-[3] flex flex-col items-center justify-between py-24 md:py-28 px-6 text-center pointer-events-none">
        <div className="mt-2">
          <p className="entrance-fade font-heading text-2xl sm:text-3xl md:text-4xl tracking-[0.28em] text-champagne font-light">
            THE ROYAL MEHFIL
          </p>
          <p className="entrance-fade font-heading text-sm sm:text-base md:text-lg italic text-gold/90 tracking-wide mt-2">
            Where Every Event Becomes a Grand Mehfil.
          </p>
        </div>

        <div className="entrance-fade flex flex-col items-center gap-2.5">
          <span className="font-body text-[10px] tracking-[0.42em] uppercase text-champagne/80">
            Scroll To Enter
          </span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-gold to-transparent" />
        </div>
      </div>

      {/* Scene 03-04 Subtle Chapter Whispers */}
      <div className="chapter-ballroom absolute bottom-12 left-1/2 -translate-x-1/2 z-[3] text-center pointer-events-none opacity-0 px-6">
        <p className="font-body text-[10px] tracking-[0.45em] uppercase text-gold/80">
          Entering The Rose-Petal Palace
        </p>
      </div>
      <div className="chapter-staging absolute bottom-12 left-1/2 -translate-x-1/2 z-[3] text-center pointer-events-none opacity-0 px-6">
        <p className="font-body text-[10px] tracking-[0.45em] uppercase text-champagne/90">
          Adorning The Royal Stage With Roses
        </p>
      </div>
      <div className="chapter-ring absolute bottom-12 left-1/2 -translate-x-1/2 z-[3] text-center pointer-events-none opacity-0 px-6">
        <p className="font-body text-[10px] tracking-[0.45em] uppercase text-gold/85">
          Approaching The Golden Portal
        </p>
      </div>

      {/* Scene 05: Golden Light Portal Transition */}
      <div
        className="golden-portal-flash absolute inset-0 z-[4] pointer-events-none opacity-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, #FFF0C9 0%, #D4AF5F 45%, rgba(8,8,6,0.9) 100%)",
        }}
      />

      {/* Scene 06: Dark Sanctuary Backdrop + Grand Brand Reveal */}
      <div className="sanctuary-backdrop absolute inset-0 z-[5] bg-[#080806] pointer-events-none opacity-0" />
      <BrandReveal />

      {/* Optional Ambient Sound Toggle (Never Autoplays) */}
      <button
        type="button"
        onClick={toggleAmbientAudio}
        aria-label={soundOn ? "Mute ambient sound" : "Play ambient sound"}
        className="fixed bottom-5 right-6 z-[90] w-10 h-10 flex items-center justify-center border border-gold/30 bg-deep-black/75 backdrop-blur-sm text-gold/75 hover:text-gold hover:border-gold/60 transition-colors cursor-pointer"
        data-cursor-hover
      >
        {soundOn ? (
          <Volume2 className="w-4 h-4" strokeWidth={1.5} />
        ) : (
          <VolumeX className="w-4 h-4" strokeWidth={1.5} />
        )}
      </button>
    </section>
  );
}
