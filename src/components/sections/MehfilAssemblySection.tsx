"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const assemblyLayers = [
  {
    step: "01",
    label: "The Grand Hall",
    title: "Crystal Chandeliers & Royal Architecture",
    image: "/images/hero-ballroom.jpg",
    alt: "Grand royal ballroom illuminated by cascading crystal chandeliers",
  },
  {
    step: "02",
    label: "The Couture Stage",
    title: "Gilded Arches & Cascading Florals",
    image: "/images/royal-stage.jpg",
    alt: "Opulent royal wedding stage with gilded floral archway",
  },
  {
    step: "03",
    label: "The Royal Banquet",
    title: "Candlelit Tablescapes & Gold Candelabras",
    image: "/images/royal-banquet.jpg",
    alt: "Luxury candlelit royal banquet table with gold candelabras",
  },
  {
    step: "04",
    label: "The Sacred Pavilion",
    title: "Filigree Jaali & Lantern Glow",
    image: "/images/royal-nikkah.jpg",
    alt: "Intimate Nikkah ceremony pavilion with ornate gold filigree arch",
  },
  {
    step: "05",
    label: "The Grand Finale",
    title: "Spotlight Production & VIP Hospitality",
    image: "/images/royal-gala.jpg",
    alt: "Grand black-tie VIP gala dinner with golden spotlight beams",
  },
];

export default function MehfilAssemblySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ── Desktop Pinned 3D Piece-by-Piece Mehfil Staging ──
      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stageRef.current,
            start: "top top",
            end: "+=380%",
            pin: true,
            scrub: 1.05,
            anticipatePin: 1,
            onUpdate: (self) => {
              const p = self.progress;
              if (p < 0.18) setActiveStep(0);
              else if (p < 0.36) setActiveStep(1);
              else if (p < 0.54) setActiveStep(2);
              else if (p < 0.72) setActiveStep(3);
              else if (p < 0.88) setActiveStep(4);
              else setActiveStep(5);
            },
          },
        });

        // Subtle blueprint grid fade out as stage fills
        tl.to(".blueprint-grid", { opacity: 0.12, duration: 0.8 }, 0.15);

        // 01: Center Grand Hall flies from deep Z space
        tl.fromTo(
          ".assembly-card-0",
          {
            z: -700,
            y: 90,
            rotateX: 28,
            scale: 0.45,
            opacity: 0,
            filter: "brightness(0.4)",
          },
          {
            z: 0,
            y: 0,
            rotateX: 0,
            scale: 1,
            opacity: 1,
            filter: "brightness(1)",
            duration: 0.2,
            ease: "power3.out",
          },
          0.04
        );

        // 02: Left Couture Stage swoops in from left wing
        tl.fromTo(
          ".assembly-card-1",
          {
            x: "-45vw",
            y: -40,
            z: -480,
            rotateY: 62,
            rotateZ: -8,
            scale: 0.55,
            opacity: 0,
          },
          {
            x: 0,
            y: 0,
            z: 20,
            rotateY: 11,
            rotateZ: 0,
            scale: 1,
            opacity: 1,
            duration: 0.2,
            ease: "power3.out",
          },
          0.2
        );

        // 03: Right Candlelit Banquet swoops in from right wing
        tl.fromTo(
          ".assembly-card-2",
          {
            x: "45vw",
            y: -40,
            z: -480,
            rotateY: -62,
            rotateZ: 8,
            scale: 0.55,
            opacity: 0,
          },
          {
            x: 0,
            y: 0,
            z: 20,
            rotateY: -11,
            rotateZ: 0,
            scale: 1,
            opacity: 1,
            duration: 0.2,
            ease: "power3.out",
          },
          0.37
        );

        // 04: Lower-Left Sacred Pavilion rises from foreground depth
        tl.fromTo(
          ".assembly-card-3",
          {
            x: "-22vw",
            y: "42vh",
            z: 280,
            rotateX: -36,
            rotateY: 24,
            scale: 0.65,
            opacity: 0,
          },
          {
            x: 0,
            y: 0,
            z: 35,
            rotateX: -3,
            rotateY: 7,
            scale: 1,
            opacity: 1,
            duration: 0.2,
            ease: "power3.out",
          },
          0.54
        );

        // 05: Lower-Right Grand Finale rises from foreground depth
        tl.fromTo(
          ".assembly-card-4",
          {
            x: "22vw",
            y: "42vh",
            z: 280,
            rotateX: -36,
            rotateY: -24,
            scale: 0.65,
            opacity: 0,
          },
          {
            x: 0,
            y: 0,
            z: 35,
            rotateX: -3,
            rotateY: -7,
            scale: 1,
            opacity: 1,
            duration: 0.2,
            ease: "power3.out",
          },
          0.71
        );

        // Finale: All 5 assembled plates harmonize & illuminate together
        tl.to(
          ".assembly-card-1, .assembly-card-3",
          { rotateY: 4, rotateX: 0, z: 0, duration: 0.15, ease: "power2.inOut" },
          0.88
        )
          .to(
            ".assembly-card-2, .assembly-card-4",
            {
              rotateY: -4,
              rotateX: 0,
              z: 0,
              duration: 0.15,
              ease: "power2.inOut",
            },
            0.88
          )
          .fromTo(
            ".assembly-finale-glow",
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1.08, duration: 0.16, ease: "power2.out" },
            0.86
          )
          .fromTo(
            ".assembly-finale-banner",
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.14, ease: "power3.out" },
            0.88
          );
      });

      // ── Mobile: Sequential 3D Unfold & Staging ──
      mm.add("(max-width: 767px)", () => {
        gsap.utils
          .toArray<HTMLElement>(".mobile-assembly-card")
          .forEach((card, i) => {
            gsap.fromTo(
              card,
              {
                y: 80,
                rotateX: 24,
                rotateY: i % 2 === 0 ? -12 : 12,
                scale: 0.86,
                opacity: 0,
              },
              {
                y: 0,
                rotateX: 0,
                rotateY: 0,
                scale: 1,
                opacity: 1,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 84%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="staging"
      className="relative bg-deep-black overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent z-20" />

      {/* ── Desktop Pinned 3D Spatial Stage ───────────────────── */}
      <div
        ref={stageRef}
        className="hidden md:flex relative h-screen w-full flex-col justify-between pt-28 pb-6 px-8 lg:px-16 overflow-hidden"
        style={{ perspective: "1600px" }}
      >
        {/* Architectural Blueprint Grid (Pre-Staging Canvas) */}
        <div
          className="blueprint-grid absolute inset-0 pointer-events-none opacity-35"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(212,175,95,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(212,175,95,0.08) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage:
              "radial-gradient(ellipse at 50% 50%, black 35%, transparent 80%)",
          }}
        />

        {/* Finale Golden Aura */}
        <div
          className="assembly-finale-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[540px] rounded-full blur-[160px] pointer-events-none opacity-0"
          style={{
            background:
              "radial-gradient(ellipse, rgba(212, 175, 95, 0.2) 0%, transparent 70%)",
          }}
        />

        {/* Top Header */}
        <div className="relative z-20 text-center max-w-3xl mx-auto">
          <p className="font-sans text-[10px] tracking-[0.45em] uppercase text-[#D4AF62] mb-2">
            3D SPATIAL CHOREOGRAPHY
          </p>
          <h2 className="font-kudus text-3xl sm:text-4xl lg:text-5xl font-normal text-[#FFF8E9] tracking-[0.12em] leading-tight">
            WATCH A GRAND MEHFIL
          </h2>
          <h2 className="font-kudus text-3xl sm:text-4xl lg:text-5xl font-normal text-[#F2B8C6] tracking-[0.12em] leading-tight">
            COME ALIVE
          </h2>
        </div>

        {/* 3D Assembled Stage Composition */}
        <div
          className="relative z-10 max-w-[1320px] w-full mx-auto flex-1 flex items-center justify-center my-4"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className="grid grid-cols-12 grid-rows-6 gap-4 w-full h-[53vh] min-h-[360px] max-h-[520px]"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* 02 Left Wing: Royal Stage */}
            <div className="assembly-card-1 col-span-3 row-span-4 col-start-1 row-start-1 relative overflow-hidden border border-gold/30 bg-royal-black shadow-[0_25px_70px_rgba(0,0,0,0.85)] will-change-transform">
              <Image
                src={assemblyLayers[1].image}
                alt={assemblyLayers[1].alt}
                fill
                sizes="25vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-black/90 via-deep-black/20 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4">
                <span className="font-body text-[9px] tracking-[0.35em] uppercase text-gold">
                  02 — {assemblyLayers[1].label}
                </span>
                <p className="font-heading text-base text-champagne leading-tight mt-0.5">
                  {assemblyLayers[1].title}
                </p>
              </div>
            </div>

            {/* 01 Centerpiece: Grand Chandelier Hall */}
            <div className="assembly-card-0 col-span-6 row-span-6 col-start-4 row-start-1 relative overflow-hidden border border-gold/45 bg-royal-black shadow-[0_35px_100px_rgba(0,0,0,0.95)] will-change-transform z-10">
              <Image
                src={assemblyLayers[0].image}
                alt={assemblyLayers[0].alt}
                fill
                sizes="48vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-black/90 via-transparent to-deep-black/30" />
              <div className="absolute inset-3 border border-gold/20 pointer-events-none" />
              <div className="absolute bottom-5 left-6 right-6 text-center">
                <span className="font-body text-[10px] tracking-[0.4em] uppercase text-gold">
                  01 — {assemblyLayers[0].label}
                </span>
                <p className="font-heading text-2xl text-champagne font-light mt-1">
                  {assemblyLayers[0].title}
                </p>
              </div>
            </div>

            {/* 03 Right Wing: Candlelit Banquet */}
            <div className="assembly-card-2 col-span-3 row-span-4 col-start-10 row-start-1 relative overflow-hidden border border-gold/30 bg-royal-black shadow-[0_25px_70px_rgba(0,0,0,0.85)] will-change-transform">
              <Image
                src={assemblyLayers[2].image}
                alt={assemblyLayers[2].alt}
                fill
                sizes="25vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-black/90 via-deep-black/20 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4">
                <span className="font-body text-[9px] tracking-[0.35em] uppercase text-gold">
                  03 — {assemblyLayers[2].label}
                </span>
                <p className="font-heading text-base text-champagne leading-tight mt-0.5">
                  {assemblyLayers[2].title}
                </p>
              </div>
            </div>

            {/* 04 Lower Left: Nikkah Pavilion */}
            <div className="assembly-card-3 col-span-3 row-span-2 col-start-1 row-start-5 relative overflow-hidden border border-gold/30 bg-royal-black shadow-[0_25px_70px_rgba(0,0,0,0.85)] will-change-transform">
              <Image
                src={assemblyLayers[3].image}
                alt={assemblyLayers[3].alt}
                fill
                sizes="25vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-black/90 via-deep-black/30 to-transparent" />
              <div className="absolute bottom-2.5 left-4 right-4">
                <span className="font-body text-[9px] tracking-[0.3em] uppercase text-gold">
                  04 — {assemblyLayers[3].label}
                </span>
              </div>
            </div>

            {/* 05 Lower Right: Grand Gala */}
            <div className="assembly-card-4 col-span-3 row-span-2 col-start-10 row-start-5 relative overflow-hidden border border-gold/30 bg-royal-black shadow-[0_25px_70px_rgba(0,0,0,0.85)] will-change-transform">
              <Image
                src={assemblyLayers[4].image}
                alt={assemblyLayers[4].alt}
                fill
                sizes="25vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-black/90 via-deep-black/30 to-transparent" />
              <div className="absolute bottom-2.5 left-4 right-4">
                <span className="font-body text-[9px] tracking-[0.3em] uppercase text-gold">
                  05 — {assemblyLayers[4].label}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Live Staging Progress Rail & Finale Banner */}
        <div className="relative z-20 max-w-6xl mx-auto w-full text-center">
          <div className="assembly-finale-banner mb-2 opacity-0">
            <p className="font-heading text-base lg:text-lg italic text-gold tracking-wide">
              Every Layer Thoughtfully Curated — One Complete Royal Mehfil.
            </p>
          </div>
          <div className="flex items-center justify-center gap-3 lg:gap-5 flex-wrap">
            {assemblyLayers.map((item, idx) => {
              const isLit = activeStep >= idx;
              return (
                <div
                  key={item.step}
                  className={`flex items-center gap-1.5 whitespace-nowrap transition-all duration-300 ${
                    isLit ? "text-gold opacity-100" : "text-ivory/35 opacity-55"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rotate-45 border transition-colors ${
                      isLit
                        ? "bg-gold border-gold"
                        : "bg-transparent border-ivory/30"
                    }`}
                  />
                  <span className="font-body text-[9px] lg:text-[10px] tracking-[0.18em] uppercase">
                    {item.step} {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Mobile Sequential 3D Unfold Showcase ──────────────── */}
      <div
        className="md:hidden py-24 px-6"
        style={{ perspective: "1000px" }}
      >
        <div className="text-center mb-12">
          <p className="font-body text-[10px] tracking-[0.45em] uppercase text-gold/75 mb-4">
            Choreographed In 3D — Layer By Layer
          </p>
          <h2 className="font-heading text-4xl font-light text-champagne tracking-wide">
            Watch a Grand Mehfil{" "}
            <span className="italic text-gold">Come Alive</span>
          </h2>
        </div>

        <div className="space-y-6">
          {assemblyLayers.map((layer) => (
            <div
              key={layer.step}
              className="mobile-assembly-card relative aspect-[16/10] overflow-hidden border border-gold/25 bg-royal-black"
            >
              <Image
                src={layer.image}
                alt={layer.alt}
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-black/90 via-deep-black/25 to-transparent" />
              <div className="absolute bottom-4 left-5 right-5">
                <span className="font-body text-[10px] tracking-[0.35em] uppercase text-gold">
                  {layer.step} — {layer.label}
                </span>
                <h3 className="font-heading text-xl text-champagne font-light mt-1">
                  {layer.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
