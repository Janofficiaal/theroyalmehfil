"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useBookingModal } from "@/context/BookingModalContext";

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { openBooking } = useBookingModal();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.to(".cta-bg-glow", {
        y: -80,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.fromTo(
        ".cta-heading",
        { y: 70, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".cta-heading",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".cta-sub",
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".cta-sub",
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".cta-button",
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".cta-button",
            start: "top 92%",
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
      className="relative py-36 md:py-52 overflow-hidden bg-deep-black"
    >
      <div
        className="cta-bg-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full blur-[240px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(212, 175, 95, 0.08) 0%, transparent 70%)",
        }}
      />

      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/25 to-transparent" />

      <div className="relative text-center px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-10 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF62]" />
            <div className="w-1.5 h-1.5 rotate-45 bg-[#D4AF62]" />
            <div className="w-10 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF62]" />
          </div>

          <h2 className="cta-heading font-kudus text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-[#FFF8E9] tracking-[0.12em] leading-tight">
            YOUR VISION
          </h2>
          <h2 className="cta-heading font-kudus text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-[#F2B8C6] tracking-[0.12em] leading-tight mb-4">
            OUR ROYAL TOUCH
          </h2>

          <p className="cta-sub font-sans text-xs sm:text-sm text-[#F7DCE3]/75 max-w-lg mx-auto mt-4 tracking-wide">
            Begin the journey towards an unforgettable celebration across the United Kingdom.
          </p>

          <div className="cta-button mt-10">
            <button
              type="button"
              onClick={openBooking}
              className="px-9 md:px-12 py-3.5 md:py-4 rounded-full border border-[#D4AF62] bg-gradient-to-r from-[#B84360] to-[#8A2038] font-kudus text-xs md:text-sm tracking-[0.2em] uppercase text-[#FFF8E9] hover:brightness-110 shadow-[0_4px_24px_rgba(184,67,96,0.45)] transition-all cursor-pointer"
            >
              <span>START PLANNING YOUR EVENT →</span>
            </button>
          </div>

          <div className="flex items-center justify-center gap-3 mt-16">
            <div className="w-10 h-[1px] bg-gradient-to-r from-transparent to-gold/30" />
            <div className="w-1 h-1 rotate-45 bg-gold/30" />
            <div className="w-10 h-[1px] bg-gradient-to-l from-transparent to-gold/30" />
          </div>
        </div>
      </div>
    </section>
  );
}
