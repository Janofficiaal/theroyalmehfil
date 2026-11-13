"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "@/components/ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);

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
          <div className="flex items-center justify-center gap-3 mb-10">
            <div className="w-10 h-[1px] bg-gradient-to-r from-transparent to-gold/50" />
            <div className="w-1.5 h-1.5 rotate-45 border border-gold/60" />
            <div className="w-10 h-[1px] bg-gradient-to-l from-transparent to-gold/50" />
          </div>

          <h2 className="cta-heading font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-champagne tracking-wide leading-[1.08]">
            Your Vision.
            <br />
            <span className="italic text-gold">Our Royal Touch.</span>
          </h2>

          <p className="cta-sub font-body text-base md:text-lg text-ivory/60 max-w-xl mx-auto mt-8 tracking-wide">
            Let&apos;s create something unforgettable together.
          </p>

          <div className="cta-button mt-12">
            <MagneticButton
              href="#contact"
              className="px-10 md:px-14 py-4 md:py-5 bg-gold/15 border border-gold/50 text-xs md:text-sm tracking-[0.25em] uppercase text-champagne hover:text-deep-black transition-colors duration-300"
            >
              <span>Start Planning Your Event</span>
            </MagneticButton>
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
