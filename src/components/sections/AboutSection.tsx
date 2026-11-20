"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useBookingModal } from "@/context/BookingModalContext";
import { ShieldCheck, Sparkles, Compass } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { openBooking } = useBookingModal();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-heading",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-heading",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".about-text",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".about-text",
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".about-pillar",
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: ".about-pillars-grid",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".about-image-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-image-card",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-28 md:py-40 overflow-hidden bg-gradient-to-b from-deep-black via-[#140308] to-deep-black"
    >
      {/* Top Gold Gradient Divider */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF62]/30 to-transparent" />

      {/* Subtle Ambient Radial Glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full blur-[180px] bg-[#B84360]/[0.08] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Brand Story & Philosophy */}
          <div className="order-2 lg:order-1 lg:col-span-7">
            <p className="font-sans text-[10px] tracking-[0.45em] uppercase text-[#D4AF62] mb-3">
              02 — ABOUT THE ROYAL MEHFIL
            </p>

            <div className="about-heading">
              <h2 className="font-kudus text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-[#FFF8E9] leading-tight tracking-[0.1em]">
                WHERE ROYAL HERITAGE
              </h2>
              <h2 className="font-kudus text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-[#F2B8C6] leading-tight tracking-[0.1em]">
                MEETS MODERN SPLENDOUR
              </h2>
            </div>

            {/* Delicate Ornament Line */}
            <div className="flex items-center gap-3 my-6">
              <div className="w-16 h-[1px] bg-gradient-to-r from-[#D4AF62] to-transparent" />
              <div className="w-1.5 h-1.5 rotate-45 bg-[#D4AF62]" />
            </div>

            {/* Concise Regal Copy */}
            <div className="space-y-4 max-w-xl mb-9">
              <p className="about-text font-sans text-sm md:text-base text-[#FFF8E9]/80 leading-relaxed tracking-wide">
                Based in the United Kingdom, The Royal Mehfil is a premier luxury event management maison dedicated to turning milestones into unforgettable royal gatherings.
              </p>
              <p className="about-text font-sans text-xs md:text-sm text-[#F7DCE3]/65 leading-relaxed tracking-wide">
                From majestic Walimas and sacred Nikkah ceremonies to grand international galas, our team orchestrates every celebration with architectural staging, floral couture, and white-glove hospitality.
              </p>
            </div>

            {/* 3 Core Pillars */}
            <div className="about-pillars-grid grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              <div className="about-pillar p-4 rounded-xl border border-[#D4AF62]/25 bg-[#1B050C]/60 backdrop-blur-sm">
                <div className="w-8 h-8 rounded-full border border-[#D4AF62]/40 bg-[#3B0C18]/50 flex items-center justify-center text-[#D4AF62] mb-3">
                  <Sparkles className="w-4 h-4" strokeWidth={1.5} />
                </div>
                <h4 className="font-kudus text-xs tracking-[0.16em] uppercase text-[#FFF8E9] mb-1">
                  IMPERIAL STAGING
                </h4>
                <p className="font-sans text-[11px] text-[#F7DCE3]/70 leading-relaxed">
                  Bespoke palace architecture and gold couture backdrops.
                </p>
              </div>

              <div className="about-pillar p-4 rounded-xl border border-[#D4AF62]/25 bg-[#1B050C]/60 backdrop-blur-sm">
                <div className="w-8 h-8 rounded-full border border-[#D4AF62]/40 bg-[#3B0C18]/50 flex items-center justify-center text-[#D4AF62] mb-3">
                  <Compass className="w-4 h-4" strokeWidth={1.5} />
                </div>
                <h4 className="font-kudus text-xs tracking-[0.16em] uppercase text-[#FFF8E9] mb-1">
                  UK & GLOBAL VENUES
                </h4>
                <p className="font-sans text-[11px] text-[#F7DCE3]/70 leading-relaxed">
                  Curating elite castles, heritage estates, and palace halls.
                </p>
              </div>

              <div className="about-pillar p-4 rounded-xl border border-[#D4AF62]/25 bg-[#1B050C]/60 backdrop-blur-sm">
                <div className="w-8 h-8 rounded-full border border-[#D4AF62]/40 bg-[#3B0C18]/50 flex items-center justify-center text-[#D4AF62] mb-3">
                  <ShieldCheck className="w-4 h-4" strokeWidth={1.5} />
                </div>
                <h4 className="font-kudus text-xs tracking-[0.16em] uppercase text-[#FFF8E9] mb-1">
                  VIP CONCIERGE
                </h4>
                <p className="font-sans text-[11px] text-[#F7DCE3]/70 leading-relaxed">
                  Discreet end-to-end planning with perfection in every detail.
                </p>
              </div>
            </div>

            {/* Key Royal Metrics & Action Button */}
            <div className="flex flex-wrap items-center gap-6 sm:gap-10 pt-2 border-t border-[#D4AF62]/20">
              <div>
                <span className="block font-kudus text-2xl sm:text-3xl font-normal text-[#D4AF62] tracking-wider">
                  500+
                </span>
                <span className="block font-sans text-[10px] tracking-[0.2em] uppercase text-[#FFF8E9]/65">
                  Grand Mehfils
                </span>
              </div>
              <div className="w-[1px] h-8 bg-[#D4AF62]/25" />
              <div>
                <span className="block font-kudus text-2xl sm:text-3xl font-normal text-[#F2B8C6] tracking-wider">
                  100%
                </span>
                <span className="block font-sans text-[10px] tracking-[0.2em] uppercase text-[#FFF8E9]/65">
                  Bespoke Design
                </span>
              </div>
              <div className="w-[1px] h-8 bg-[#D4AF62]/25" />
              <button
                type="button"
                onClick={openBooking}
                className="ml-auto px-6 py-3 rounded-full border border-[#D4AF62] bg-[#3B0C18]/70 hover:bg-[#D4AF62] hover:text-[#080605] font-kudus text-xs tracking-[0.2em] uppercase text-[#FFF8E9] transition-all shadow-md group cursor-pointer"
              >
                <span>REQUEST CONSULTATION</span>
                <span className="ml-2 text-[#D4AF62] group-hover:text-[#080605] transition-colors">→</span>
              </button>
            </div>
          </div>

          {/* Right Column: Editorial Framed Media */}
          <div className="order-1 lg:order-2 lg:col-span-5">
            <div className="about-image-card relative">
              {/* Main Luxury Frame */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-[#D4AF62]/40 shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
                <Image
                  src="/images/royal-banquet.webp"
                  alt="The Royal Mehfil Imperial Dining and Stage"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                <div className="absolute inset-2.5 rounded-xl border border-[#D4AF62]/20 pointer-events-none" />

                {/* Bottom Card Caption */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/70 backdrop-blur-md border border-[#D4AF62]/35">
                  <span className="block font-sans text-[9px] tracking-[0.3em] uppercase text-[#D4AF62]">
                    THE MAISON
                  </span>
                  <span className="block font-kudus text-sm tracking-[0.14em] uppercase text-[#FFF8E9] mt-0.5">
                    UNCOMPROMISED GRANDEUR
                  </span>
                </div>
              </div>

              {/* Floating Floating Est. Badge */}
              <div className="absolute -top-4 -right-4 px-4 py-2 rounded-full border border-[#D4AF62] bg-[#1B050C]/95 backdrop-blur-md shadow-lg">
                <span className="font-kudus text-[10px] tracking-[0.2em] uppercase text-[#D4AF62]">
                  EST. LONDON, UK
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
