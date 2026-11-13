"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import MagneticButton from "@/components/ui/MagneticButton";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
});

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const mainStageRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef<number>(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // ── Entry Animation ──
      const entryTl = gsap.timeline({ delay: 0.9 });

      entryTl
        .fromTo(
          ".hero-crest",
          { y: 24, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.9, ease: "power3.out" }
        )
        .fromTo(
          ".hero-brand-wordmark",
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.85, ease: "power3.out" },
          "-=0.6"
        )
        .fromTo(
          ".hero-headline",
          { y: 64, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.1, ease: "power4.out" },
          "-=0.5"
        )
        .fromTo(
          ".hero-ornament-line",
          { scaleX: 0 },
          { scaleX: 1, duration: 0.8, ease: "power2.inOut" },
          "-=0.6"
        )
        .fromTo(
          ".hero-subtitle",
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
          "-=0.4"
        )
        .fromTo(
          ".hero-cta",
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            ease: "power3.out",
            stagger: 0.14,
          },
          "-=0.3"
        );

      // ── Pinned 3D Scroll Storytelling Sequence ──
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=280%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            scrollProgressRef.current = self.progress;
          },
        },
      });

      // Phase 1: Ballroom slowly zooms forward; hero content recedes into depth
      scrollTl
        .to(
          bgRef.current,
          { scale: 1.32, duration: 1, ease: "none" },
          0
        )
        .to(
          scrollIndicatorRef.current,
          { opacity: 0, y: 12, duration: 0.15, ease: "power2.in" },
          0
        )
        .to(
          mainStageRef.current,
          { y: -110, scale: 0.92, opacity: 0, duration: 0.42, ease: "power2.in" },
          0.02
        );

      // Phase 2: Atmospheric dark veil deepens; cinematic chapter headline emerges
      scrollTl
        .to(
          overlayRef.current,
          { opacity: 0.78, duration: 0.45, ease: "none" },
          0.32
        )
        .fromTo(
          ".transition-kicker",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.25, ease: "power3.out" },
          0.42
        )
        .fromTo(
          ".transition-line-1",
          { y: 70, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 0.3, ease: "power3.out" },
          0.46
        )
        .fromTo(
          ".transition-ornament",
          { scaleX: 0 },
          { scaleX: 1, duration: 0.25, ease: "power2.inOut" },
          0.54
        )
        .fromTo(
          ".transition-line-2",
          { y: 60, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 0.3, ease: "power3.out" },
          0.58
        );

      // Phase 3: Transition text glides through as 3D portal opens to Section 02
      scrollTl
        .to(
          ".transition-kicker",
          { y: -50, opacity: 0, duration: 0.2, ease: "power2.in" },
          0.8
        )
        .to(
          ".transition-line-1",
          { y: -80, opacity: 0, scale: 1.04, duration: 0.22, ease: "power2.in" },
          0.81
        )
        .to(
          ".transition-ornament",
          { scaleX: 0, opacity: 0, duration: 0.18, ease: "power2.in" },
          0.83
        )
        .to(
          ".transition-line-2",
          { y: -70, opacity: 0, scale: 1.04, duration: 0.22, ease: "power2.in" },
          0.84
        )
        .to(
          bgRef.current,
          { scale: 1.48, opacity: 0.2, duration: 0.2, ease: "none" },
          0.82
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen min-h-[680px] w-full overflow-hidden bg-deep-black"
    >
      {/* Background Ballroom Layer (slow zoom on scroll) */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 will-change-transform"
        style={{
          background:
            "radial-gradient(ellipse at 50% 25%, rgba(42, 33, 18, 0.9) 0%, rgba(8, 8, 6, 1) 75%)",
        }}
      >
        <Image
          src="/images/hero-ballroom.jpg"
          alt="Grand luxury wedding ballroom with crystal chandeliers and golden lighting"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-45"
        />

        {/* Atmospheric dark gradient vignettes for editorial legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-deep-black/75 via-deep-black/45 to-deep-black" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 45%, rgba(212, 175, 95, 0.1) 0%, rgba(8, 8, 6, 0.72) 68%)",
          }}
        />

        {/* Subtle golden chandelier light rays */}
        <div
          className="absolute top-0 left-1/4 w-[1px] h-[42vh] opacity-20"
          style={{
            background:
              "linear-gradient(to bottom, rgba(232, 214, 163, 0.6), transparent)",
          }}
        />
        <div
          className="absolute top-0 left-1/2 w-[1px] h-[36vh] opacity-25"
          style={{
            background:
              "linear-gradient(to bottom, rgba(212, 175, 95, 0.7), transparent)",
          }}
        />
        <div
          className="absolute top-0 right-1/4 w-[1px] h-[42vh] opacity-20"
          style={{
            background:
              "linear-gradient(to bottom, rgba(232, 214, 163, 0.6), transparent)",
          }}
        />
      </div>

      {/* Scroll-Driven Three.js 3D Scene */}
      <HeroScene scrollProgressRef={scrollProgressRef} />

      {/* Cinematic Overlay for Scroll Transition */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-[2] bg-deep-black pointer-events-none"
        style={{ opacity: 0 }}
      />

      {/* Stage 1: Primary Royal Entrance */}
      <div
        ref={mainStageRef}
        className="relative z-[3] flex flex-col items-center justify-center h-full text-center px-6 pb-16 pt-20 will-change-transform"
      >
        {/* Animated Royal Monogram & Brand Identity */}
        <div className="hero-crest mb-3 flex flex-col items-center">
          <svg
            width="44"
            height="28"
            viewBox="0 0 44 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="text-gold mb-3 opacity-90"
          >
            <path
              d="M4 22L8.5 8L16 15L22 4L28 15L35.5 8L40 22H4Z"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            <path
              d="M6 25.5H38"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <circle cx="22" cy="2.5" r="1.2" fill="currentColor" />
            <circle cx="8.5" cy="6" r="1" fill="currentColor" />
            <circle cx="35.5" cy="6" r="1" fill="currentColor" />
          </svg>
        </div>

        <div className="hero-brand-wordmark mb-5">
          <p className="font-body text-[10px] md:text-xs tracking-[0.45em] uppercase text-gold/85 mb-2">
            UK Luxury Event Management
          </p>
          <p className="font-heading text-2xl sm:text-3xl md:text-4xl font-light tracking-[0.28em] gold-shimmer">
            THE ROYAL MEHFIL
          </p>
        </div>

        {/* Main Hero Headline */}
        <h1 className="hero-headline font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-ivory leading-[1.06] tracking-wide max-w-4xl mx-auto">
          Where Every Event Becomes{" "}
          <span className="italic text-champagne block sm:inline">
            a Grand Mehfil.
          </span>
        </h1>

        {/* Ornamental Divider */}
        <div className="hero-ornament-line flex items-center justify-center gap-4 my-5 md:my-7 origin-center">
          <div className="w-14 md:w-24 h-[1px] bg-gradient-to-r from-transparent to-gold/70" />
          <div className="w-1.5 h-1.5 rotate-45 border border-gold/80" />
          <div className="w-14 md:w-24 h-[1px] bg-gradient-to-l from-transparent to-gold/70" />
        </div>

        {/* Supporting Text */}
        <p className="hero-subtitle font-body text-sm md:text-base text-champagne/75 max-w-xl mx-auto tracking-wide leading-relaxed">
          Extraordinary celebrations, thoughtfully imagined and beautifully
          brought to life.
        </p>

        {/* Magnetic CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-8 md:mt-10">
          <MagneticButton
            href="#contact"
            className="hero-cta px-8 py-3.5 bg-gold/15 border border-gold/60 text-xs tracking-[0.25em] uppercase text-champagne hover:text-deep-black transition-colors duration-300"
          >
            <span>Plan Your Event</span>
          </MagneticButton>
          <MagneticButton
            href="#experience"
            className="hero-cta px-8 py-3.5 border border-ivory/25 text-xs tracking-[0.25em] uppercase text-ivory/85 hover:border-gold/70 hover:text-deep-black transition-colors duration-300"
          >
            <span>Explore Our World</span>
          </MagneticButton>
        </div>
      </div>

      {/* Stage 2: Scroll-Triggered Cinematic Chapter Transition */}
      <div className="absolute inset-0 z-[4] flex flex-col items-center justify-center text-center px-6 pointer-events-none">
        <p className="transition-kicker font-body text-[10px] tracking-[0.5em] uppercase text-gold/70 mb-5 opacity-0">
          Enter The Experience
        </p>
        <p className="transition-line-1 font-heading text-3xl sm:text-5xl md:text-6xl font-light text-champagne tracking-wide opacity-0">
          An Art of Creating
        </p>
        <div className="transition-ornament flex items-center justify-center gap-4 my-5 md:my-6 origin-center scale-x-0">
          <div className="w-12 md:w-20 h-[1px] bg-gradient-to-r from-transparent to-gold/70" />
          <div className="w-1.5 h-1.5 rotate-45 bg-gold/60" />
          <div className="w-12 md:w-20 h-[1px] bg-gradient-to-l from-transparent to-gold/70" />
        </div>
        <p className="transition-line-2 font-heading text-3xl sm:text-5xl md:text-6xl font-light text-gold italic tracking-wide opacity-0">
          Extraordinary Moments.
        </p>
      </div>

      {/* Bottom Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-[3] flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="font-body text-[9px] tracking-[0.35em] uppercase text-ivory/45">
          Scroll to Explore
        </span>
        <div className="w-[1px] h-7 bg-gradient-to-b from-gold/60 to-transparent" />
      </div>
    </section>
  );
}
