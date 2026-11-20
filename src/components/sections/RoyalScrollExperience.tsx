"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useBookingModal } from "@/context/BookingModalContext";

gsap.registerPlugin(ScrollTrigger);

/* ── Golden Crown SVG Matching Approved Reference ─── */
function CrownIcon({ size = 36, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size * 0.72}
      viewBox="0 0 44 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M4 25L8.5 7L16 15L22 3L28 15L35.5 7L40 25H4Z"
        stroke="#D4AF62"
        strokeWidth="1.3"
        strokeLinejoin="round"
        fill="#D4AF62"
        fillOpacity="0.25"
      />
      <path d="M5 28.5H39" stroke="#D4AF62" strokeWidth="1" strokeLinecap="round" />
      <circle cx="22" cy="2" r="1.3" fill="#D4AF62" />
      <circle cx="8.5" cy="6.5" r="0.9" fill="#D4AF62" />
      <circle cx="35.5" cy="6.5" r="0.9" fill="#D4AF62" />
      <circle cx="16" cy="14.5" r="0.7" fill="#D4AF62" />
      <circle cx="28" cy="14.5" r="0.7" fill="#D4AF62" />
    </svg>
  );
}

/* ── Floating Pink Rose Petals ────────────────────────── */
function FloatingPetals() {
  const petals = [
    { id: 1, left: "6%", top: "32%", size: 32, delay: "0s", duration: "9s", rot: 25 },
    { id: 2, left: "12%", top: "68%", size: 38, delay: "1.5s", duration: "11s", rot: -40 },
    { id: 3, left: "18%", top: "82%", size: 28, delay: "3.5s", duration: "8.5s", rot: 55 },
    { id: 4, left: "82%", top: "36%", size: 30, delay: "1s", duration: "10s", rot: -20 },
    { id: 5, left: "88%", top: "72%", size: 40, delay: "2.5s", duration: "12s", rot: 45 },
    { id: 6, left: "94%", top: "28%", size: 26, delay: "4s", duration: "9.5s", rot: -50 },
    { id: 7, left: "46%", top: "84%", size: 28, delay: "2s", duration: "10.5s", rot: 15 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none z-[30] overflow-hidden">
      {petals.map((p) => (
        <div
          key={p.id}
          className="absolute animate-petal-drift opacity-90"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size * 0.72,
            animationDelay: p.delay,
            animationDuration: p.duration,
            transform: `rotate(${p.rot}deg)`,
          }}
        >
          <div
            className="w-full h-full rounded-[50%_50%_40%_60%] shadow-[0_4px_16px_rgba(0,0,0,0.65)]"
            style={{
              background:
                "radial-gradient(ellipse at 35% 35%, #F2B8C6 0%, #D84D74 45%, #8A1530 100%)",
            }}
          />
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   ROYAL SCROLL EXPERIENCE — 4 CINEMATIC SCENES
   ══════════════════════════════════════════════════════════ */
export default function RoyalScrollExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftCurtainRef = useRef<HTMLDivElement>(null);
  const rightCurtainRef = useRef<HTMLDivElement>(null);
  const leftDoorRef = useRef<HTMLDivElement>(null);
  const rightDoorRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { openBooking } = useBookingModal();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Timeline pinned over 650vh
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=650%",
          pin: true,
          scrub: 1.15,
          anticipatePin: 1,
          onUpdate: (self) => {
            setScrollProgress(self.progress);
          },
        },
      });

      /* ── 0% - 16%: STEP 1: DUSTY-PINK VELVET CURTAINS GENTLY PART OPEN ── */
      tl.to(
        leftCurtainRef.current,
        {
          x: "-105%",
          opacity: 0.15,
          ease: "power2.inOut",
          duration: 0.16,
        },
        0.01
      );

      tl.to(
        rightCurtainRef.current,
        {
          x: "105%",
          opacity: 0.15,
          ease: "power2.inOut",
          duration: 0.16,
        },
        0.01
      );

      // Hero text gently fades out as curtains part and focus moves onto palace doors
      tl.to(
        ".scene1-content",
        {
          opacity: 0,
          y: -36,
          scale: 0.96,
          duration: 0.12,
          ease: "power2.in",
        },
        0.06
      );

      /* ── 14% - 32%: STEP 2: AFTER CURTAINS OPEN, PALACE DOORS OPEN ── */
      tl.to(
        leftDoorRef.current,
        {
          rotateY: -82,
          ease: "power2.inOut",
          duration: 0.18,
        },
        0.14
      );

      tl.to(
        rightDoorRef.current,
        {
          rotateY: 82,
          ease: "power2.inOut",
          duration: 0.18,
        },
        0.14
      );

      // Doorway golden glow brightens as doors swing open
      tl.fromTo(
        ".doorway-light-flare",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1.45, duration: 0.14, ease: "power2.out" },
        0.16
      ).to(
        ".doorway-light-flare",
        { opacity: 0, duration: 0.10, ease: "power2.in" },
        0.28
      );

      /* ── 24% - 48%: SCENE 2 (Camera moves forward into Grand Ballroom) ── */
      tl.to(
        ".scene1-portal-frame",
        {
          scale: 3.4,
          opacity: 0,
          duration: 0.14,
          ease: "power2.in",
        },
        0.24
      );

      tl.fromTo(
        ".scene2-ballroom",
        { scale: 0.88, opacity: 0 },
        { scale: 1.0, opacity: 1, duration: 0.12, ease: "power2.out" },
        0.25
      );

      tl.to(
        ".scene2-ballroom",
        {
          scale: 1.25,
          y: "-3%",
          duration: 0.18,
          ease: "none",
        },
        0.32
      );

      tl.to(
        ".scene2-ballroom",
        {
          opacity: 0,
          duration: 0.08,
          ease: "power2.in",
        },
        0.46
      );

      /* ── 48% - 76%: SCENE 3 (The Royal Wedding Celebration) ── */
      tl.fromTo(
        ".scene3-celebration",
        { scale: 1.15, opacity: 0 },
        { scale: 1.0, opacity: 1, duration: 0.14, ease: "power2.out" },
        0.46
      );

      tl.to(
        ".scene3-celebration",
        {
          scale: 1.12,
          duration: 0.26,
          ease: "none",
        },
        0.52
      );

      tl.fromTo(
        ".celebration-whisper",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 0.9, duration: 0.08, ease: "power2.out" },
        0.52
      ).to(
        ".celebration-whisper",
        { y: -20, opacity: 0, duration: 0.08, ease: "power2.in" },
        0.68
      );

      tl.to(
        ".scene3-celebration",
        {
          opacity: 0,
          duration: 0.10,
          ease: "power2.in",
        },
        0.72
      );

      tl.fromTo(
        ".portal-golden-bloom",
        { opacity: 0 },
        { opacity: 0.85, duration: 0.08, ease: "power2.in" },
        0.71
      ).to(
        ".portal-golden-bloom",
        { opacity: 0, duration: 0.09, ease: "power2.out" },
        0.78
      );

      /* ── 76% - 100%: SCENE 4 (Grand Brand Reveal) ── */
      tl.fromTo(
        ".scene4-brand-plate",
        { scale: 1.08, opacity: 0 },
        { scale: 1.0, opacity: 1, duration: 0.12, ease: "power2.out" },
        0.74
      );

      tl.fromTo(
        ".scene4-curtain-left",
        { x: "-25%", opacity: 0 },
        { x: "0%", opacity: 1, duration: 0.14, ease: "power3.out" },
        0.76
      );
      tl.fromTo(
        ".scene4-curtain-right",
        { x: "25%", opacity: 0 },
        { x: "0%", opacity: 1, duration: 0.14, ease: "power3.out" },
        0.76
      );

      tl.fromTo(
        ".scene4-brand-text",
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.12,
          stagger: 0.02,
          ease: "power3.out",
        },
        0.82
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      aria-label="The Royal Mehfil Cinematic 3D Scroll Journey"
      className="relative h-screen min-h-[640px] w-full overflow-hidden bg-[#080806]"
    >
      {/* ══════════════════════════════════════════════════════════
          SCENE 2 LAYER: GRAND PALACE BALLROOM INTERIOR
          ══════════════════════════════════════════════════════════ */}
      <div
        className="scene2-ballroom absolute inset-0 z-[5] opacity-0 will-change-transform"
        style={{
          backgroundImage: "url(/images/golden-ballroom.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center 38%",
          transformOrigin: "50% 50%",
          filter: "brightness(1.14) contrast(1.06) saturate(1.1)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(8,8,6,0.55) 100%)",
          }}
        />
      </div>

      {/* ══════════════════════════════════════════════════════════
          SCENE 1 LAYER: PALACE ENTRANCE & DOORS
          ══════════════════════════════════════════════════════════ */}
      <div
        className="scene1-portal-frame absolute inset-0 z-[10] will-change-transform"
        style={{
          transformOrigin: "50% 50%",
        }}
      >
        {/* Master Palace Entrance Surround Plate with Doorway Cutout */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "url(/images/scene1-surround-cutout.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center center",
            filter: "brightness(1.06) contrast(1.04)",
          }}
        />

        {/* Soft Volumetric Sunlight Ray Atmosphere */}
        <div
          className="absolute inset-0 pointer-events-none mix-blend-screen opacity-35"
          style={{
            background:
              "radial-gradient(ellipse at 50% 16%, rgba(255, 240, 200, 0.75) 0%, rgba(212, 175, 98, 0.35) 45%, transparent 75%)",
          }}
        />

        {/* 3D Hinged Golden Double Doors Container */}
        {/* Exact doorway coordinates from clean plate: left 43.82%, width 12.35%, top 36.07%, height 35.55% */}
        <div
          className="absolute z-[12]"
          style={{
            left: "43.82%",
            width: "12.35%",
            top: "36.07%",
            height: "35.55%",
            perspective: "1400px",
            perspectiveOrigin: "50% 50%",
          }}
        >
          {/* Golden Warm Glow Flare Behind Doors */}
          <div
            className="doorway-light-flare absolute inset-[-20%] z-0 pointer-events-none opacity-0"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(255,235,170,0.95) 0%, rgba(212,175,98,0.7) 40%, transparent 75%)",
              filter: "blur(20px)",
            }}
          />

          {/* Left Door Leaf (Hinge on Left) */}
          <div
            ref={leftDoorRef}
            className="absolute top-0 bottom-0 left-0 w-1/2 z-10 origin-left will-change-transform"
            style={{
              backgroundImage: "url(/images/clean-door-left.webp)",
              backgroundSize: "100% 100%",
              boxShadow: "inset -5px 0 14px rgba(0,0,0,0.55), 3px 0 16px rgba(0,0,0,0.7)",
              transformStyle: "preserve-3d",
            }}
          >
            <div
              className="absolute top-0 bottom-0 right-0 w-[3px] bg-gradient-to-r from-[#D4AF62] to-[#6A4716]"
              style={{ transform: "rotateY(90deg) translateZ(1.5px)" }}
            />
          </div>

          {/* Right Door Leaf (Hinge on Right) */}
          <div
            ref={rightDoorRef}
            className="absolute top-0 bottom-0 right-0 w-1/2 z-10 origin-right will-change-transform"
            style={{
              backgroundImage: "url(/images/clean-door-right.webp)",
              backgroundSize: "100% 100%",
              boxShadow: "inset 5px 0 14px rgba(0,0,0,0.55), -3px 0 16px rgba(0,0,0,0.7)",
              transformStyle: "preserve-3d",
            }}
          >
            <div
              className="absolute top-0 bottom-0 left-0 w-[3px] bg-gradient-to-l from-[#D4AF62] to-[#6A4716]"
              style={{ transform: "rotateY(-90deg) translateZ(1.5px)" }}
            />
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════
            LUXURIOUS DUSTY-PINK VELVET CURTAINS (MATCHING REFERENCE)
            ══════════════════════════════════════════════════════════ */}
        {/* Left Curtain */}
        <div
          ref={leftCurtainRef}
          className="absolute top-0 bottom-0 left-0 z-[18] pointer-events-none will-change-transform"
          style={{
            width: "25.43%",
            backgroundImage: "url(/images/curtain_left_ultra.webp)",
            backgroundSize: "100% 100%",
            transformOrigin: "left center",
          }}
        />

        {/* Right Curtain */}
        <div
          ref={rightCurtainRef}
          className="absolute top-0 bottom-0 right-0 z-[18] pointer-events-none will-change-transform"
          style={{
            width: "25.43%",
            backgroundImage: "url(/images/curtain_right_ultra.webp)",
            backgroundSize: "100% 100%",
            transformOrigin: "right center",
          }}
        />

        {/* Scene 1 Center Brand & Heading Text Overlay */}
        <div className="scene1-content absolute inset-0 z-[22] flex flex-col items-center justify-center text-center px-4 pointer-events-none">
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            {/* Crown Crest Above Headline */}
            <CrownIcon size={40} className="mb-2.5 drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]" />

            {/* Main Headline - Bold Chunky Font, Warm Ivory #FFF8E9 */}
            <h1
              className="font-kudus text-[24px] sm:text-[34px] md:text-[46px] lg:text-[54px] font-normal tracking-[0.12em] leading-[1.15]"
              style={{
                color: "#FFF8E9",
                textShadow: "0 2px 14px rgba(0, 0, 0, 0.9), 0 4px 28px rgba(0, 0, 0, 0.8)",
              }}
            >
              ENTER A WORLD OF
            </h1>

            {/* Highlight Headline - Bold Chunky Font, Bright Dusty Pink #F2B8C6 */}
            <h1
              className="font-kudus text-[30px] sm:text-[44px] md:text-[58px] lg:text-[70px] font-normal tracking-[0.1em] leading-[1.08] mb-3"
              style={{
                color: "#F2B8C6",
                textShadow: "0 2px 18px rgba(0, 0, 0, 0.92), 0 4px 34px rgba(0, 0, 0, 0.85)",
              }}
            >
              ROYAL CELEBRATIONS
            </h1>

            {/* Subtitle - Champagne Pink #FFF0E8 */}
            <p
              className="font-heading text-[16px] sm:text-[19px] md:text-[23px] italic tracking-wide mb-8"
              style={{
                color: "#FFF0E8",
                textShadow: "0 2px 12px rgba(0, 0, 0, 0.9)",
              }}
            >
              Where Every Event Becomes a Grand Mehfil.
            </p>

            {/* CTA Button - Rounded Pill with Dusty-Pink Background, Champagne-Gold Border & Bold Ivory Text */}
            <div className="pointer-events-auto">
              <a
                href="#events"
                className="inline-flex items-center gap-3 px-9 py-3.5 rounded-full border border-[#D4AF62] font-kudus text-[13px] sm:text-[14px] tracking-[0.18em] uppercase font-normal transition-all duration-300 shadow-[0_4px_24px_rgba(184,67,96,0.45),0_0_15px_rgba(212,175,98,0.3)] hover:shadow-[0_6px_30px_rgba(184,67,96,0.65),0_0_22px_rgba(212,175,98,0.5)] hover:scale-[1.03] group cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, #B84360 0%, #8A2038 100%)",
                  color: "#FFF8E9",
                }}
              >
                <span>EXPLORE OUR EVENTS</span>
                <span className="text-[13px] text-[#D4AF62] group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>
        </div>

        {/* Scroll To Enter Indicator (Right Edge) */}
        <div className="scene1-content absolute right-6 md:right-10 top-1/2 -translate-y-1/2 z-[22] flex flex-col items-center gap-3 pointer-events-none">
          <span
            className="font-body text-[9px] tracking-[0.45em] uppercase block select-none"
            style={{
              color: "#FFF0E8",
              textShadow: "0 2px 10px rgba(0, 0, 0, 0.9)",
              writingMode: "vertical-lr",
            }}
          >
            SCROLL TO ENTER
          </span>
          <div className="w-[1px] h-9 bg-gradient-to-b from-[#D4AF62] to-transparent animate-pulse" />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          SCENE 3 LAYER: THE ROYAL WEDDING CELEBRATION
          ══════════════════════════════════════════════════════════ */}
      <div
        className="scene3-celebration absolute inset-0 z-[20] opacity-0 will-change-transform"
        style={{
          backgroundImage: "url(/images/wedding-celebration.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center 42%",
          transformOrigin: "50% 50%",
          filter: "brightness(1.08) contrast(1.05)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(8,8,6,0.6) 100%)",
          }}
        />

        <div className="celebration-whisper absolute bottom-12 left-1/2 -translate-x-1/2 z-[22] text-center pointer-events-none px-6">
          <p className="font-heading text-lg sm:text-2xl md:text-3xl font-light text-[#E8D6A3] tracking-[0.12em] drop-shadow-lg">
            A Grand Royal Gathering
          </p>
          <p className="font-body text-[10px] sm:text-[11px] tracking-[0.35em] uppercase text-[#D4AF62] mt-1 drop-shadow">
            Unforgettable Luxury Wedding Receptions
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          GOLDEN PORTAL FLASH BETWEEN SCENE 3 & SCENE 4
          ══════════════════════════════════════════════════════════ */}
      <div
        className="portal-golden-bloom absolute inset-0 z-[28] pointer-events-none opacity-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, #FFF0C9 0%, #D4AF62 45%, rgba(8,8,6,0.95) 100%)",
        }}
      />

      {/* ══════════════════════════════════════════════════════════
          SCENE 4 LAYER: THE ROYAL MEHFIL BRAND REVEAL
          ══════════════════════════════════════════════════════════ */}
      <div
        className="scene4-brand-plate absolute inset-0 z-[30] opacity-0 will-change-transform flex items-center justify-center"
        style={{
          backgroundImage: "url(/images/scene4-brand-reveal.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          filter: "brightness(1.1) contrast(1.05)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(8,8,6,0.2) 0%, rgba(8,8,6,0.75) 85%, #080806 100%)",
          }}
        />

        <div
          className="scene4-curtain-left absolute top-0 bottom-0 left-0 w-1/3 pointer-events-none z-[31]"
          style={{
            background:
              "linear-gradient(to right, rgba(8,8,6,0.6) 0%, transparent 100%)",
          }}
        />
        <div
          className="scene4-curtain-right absolute top-0 bottom-0 right-0 w-1/3 pointer-events-none z-[31]"
          style={{
            background:
              "linear-gradient(to left, rgba(8,8,6,0.6) 0%, transparent 100%)",
          }}
        />

        {/* Center Brand Identity Content */}
        <div className="relative z-[35] flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto pointer-events-none">
          <div className="scene4-brand-text mb-3">
            <CrownIcon size={52} className="mx-auto drop-shadow-xl" />
          </div>

          <div className="scene4-brand-text flex items-center gap-3 mb-2">
            <div className="w-12 md:w-20 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF62]/70" />
            <span className="font-heading text-[13px] md:text-[15px] tracking-[0.45em] text-[#D4AF62] uppercase font-light">
              THE
            </span>
            <div className="w-12 md:w-20 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF62]/70" />
          </div>

          <h2
            className="scene4-brand-text font-kudus text-[32px] sm:text-[46px] md:text-[62px] lg:text-[76px] font-normal tracking-[0.12em] leading-[1.05] drop-shadow-2xl mb-3"
            style={{
              color: "#FFF8E9",
              textShadow: "0 2px 18px rgba(0, 0, 0, 0.9), 0 4px 34px rgba(0, 0, 0, 0.8)",
            }}
          >
            ROYAL MEHFIL
          </h2>

          <p
            className="scene4-brand-text font-body text-[10px] sm:text-[12px] md:text-[13px] tracking-[0.42em] uppercase mb-8 drop-shadow"
            style={{ color: "#FFF0E8" }}
          >
            LUXURY EVENT MANAGEMENT
          </p>

          <div className="scene4-brand-text flex items-center gap-4 mb-7">
            <div className="w-16 md:w-28 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF62]/80 to-transparent" />
            <div className="w-1.5 h-1.5 rotate-45 border border-[#D4AF62]" />
            <div className="w-16 md:w-28 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF62]/80 to-transparent" />
          </div>

          <h3
            className="scene4-brand-text font-kudus text-[18px] sm:text-[24px] md:text-[30px] font-normal tracking-[0.1em] leading-[1.3] max-w-2xl mx-auto mb-2 drop-shadow-lg"
            style={{
              color: "#FFF8E9",
              textShadow: "0 2px 14px rgba(0, 0, 0, 0.85)",
            }}
          >
            WHERE EVERY EVENT BECOMES
          </h3>
          <h3
            className="scene4-brand-text font-kudus text-[19px] sm:text-[25px] md:text-[32px] font-normal tracking-[0.1em] leading-[1.3] max-w-2xl mx-auto mb-10 drop-shadow-lg"
            style={{
              color: "#F2B8C6",
              textShadow: "0 2px 16px rgba(0, 0, 0, 0.88)",
            }}
          >
            A GRAND MEHFIL.
          </h3>

          <div className="scene4-brand-text pointer-events-auto">
            <button
              type="button"
              onClick={openBooking}
              className="inline-flex items-center gap-3 px-10 py-4 rounded-full border border-[#D4AF62] font-kudus text-[13px] tracking-[0.2em] uppercase font-normal transition-all duration-300 shadow-[0_4px_24px_rgba(184,67,96,0.45),0_0_15px_rgba(212,175,98,0.3)] hover:shadow-[0_6px_30px_rgba(184,67,96,0.65),0_0_22px_rgba(212,175,98,0.5)] hover:scale-[1.03] group cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #B84360 0%, #8A2038 100%)",
                color: "#FFF8E9",
              }}
            >
              <span>PLAN YOUR EVENT</span>
              <span className="text-[13px] text-[#D4AF62] group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          FLOATING PINK ROSE PETALS
          ══════════════════════════════════════════════════════════ */}
      <FloatingPetals />

      {/* ══════════════════════════════════════════════════════════
          SCROLL PROGRESS INDICATOR (LEFT RAIL)
          ══════════════════════════════════════════════════════════ */}
      <div className="fixed left-6 md:left-8 top-1/2 -translate-y-1/2 z-[95] hidden md:flex flex-col items-center gap-3 pointer-events-none">
        <div className="w-[1px] h-24 bg-white/10 relative overflow-hidden">
          <div
            className="w-full bg-[#D4AF62] transition-all duration-150"
            style={{ height: `${Math.round(scrollProgress * 100)}%` }}
          />
        </div>
        <span className="font-body text-[9px] tracking-[0.25em] text-[#D4AF62]/70">
          0{Math.min(4, Math.max(1, Math.floor(scrollProgress * 4) + 1))}
        </span>
      </div>
    </section>
  );
}
