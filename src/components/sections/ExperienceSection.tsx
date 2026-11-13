"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.to(".experience-bg-glow", {
        y: -100,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.fromTo(
        ".exp-word",
        { y: 70, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.95,
          ease: "power4.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".exp-heading",
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".exp-body",
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".exp-body",
            start: "top 86%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".exp-ornament",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.1,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: ".exp-ornament",
            start: "top 86%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".exp-image",
        { y: 45, scale: 1.12 },
        {
          y: -45,
          scale: 1,
          scrollTrigger: {
            trigger: ".exp-image-wrap",
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-28 md:py-44 overflow-hidden bg-deep-black"
    >
      <div className="experience-bg-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[620px] h-[620px] rounded-full blur-[200px] bg-gold/[0.04] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Editorial Copy */}
          <div className="order-2 lg:order-1 lg:col-span-7">
            <p className="font-body text-[10px] tracking-[0.5em] uppercase text-gold/70 mb-7">
              02 — The Royal Experience
            </p>

            <div className="exp-heading overflow-hidden">
              <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-champagne leading-[1.08] tracking-wide">
                <span className="exp-word inline-block">An&nbsp;</span>
                <span className="exp-word inline-block italic text-gold">
                  Art&nbsp;
                </span>
                <span className="exp-word inline-block">of</span>
                <br />
                <span className="exp-word inline-block">Creating&nbsp;</span>
                <span className="exp-word inline-block italic text-gold">
                  Extraordinary
                </span>
                <br />
                <span className="exp-word inline-block">Moments.</span>
              </h2>
            </div>

            <div className="exp-ornament flex items-center gap-4 my-9 origin-left">
              <div className="w-20 h-[1px] bg-gradient-to-r from-gold/70 to-transparent" />
              <div className="w-1.5 h-1.5 rotate-45 bg-gold/60" />
            </div>

            <div className="exp-body max-w-xl space-y-5">
              <p className="font-body text-sm md:text-base text-ivory/75 leading-relaxed tracking-wide">
                Welcome to The Royal Mehfil — where elegance meets perfection
                and every celebration is crafted with a royal touch. Based in
                the United Kingdom, we specialise in luxury event planning and
                complete event solutions under one roof.
              </p>
              <p className="font-body text-sm md:text-base text-ivory/60 leading-relaxed tracking-wide">
                From intimate gatherings to grand occasions, our dedicated team
                brings together artistry, precision, and an unwavering
                commitment to excellence, ensuring every detail is thoughtfully
                curated to perfection.
              </p>
            </div>
          </div>

          {/* Right: Parallax Editorial Photography */}
          <div className="order-1 lg:order-2 lg:col-span-5">
            <div className="exp-image-wrap relative overflow-hidden aspect-[3/4] max-h-[620px] w-full">
              <div className="exp-image relative w-full h-[115%] -top-[7.5%]">
                <Image
                  src="/images/royal-banquet.jpg"
                  alt="Luxurious candlelit royal banquet staged by The Royal Mehfil"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover object-center"
                />
              </div>
              <div className="absolute inset-0 border border-gold/20 pointer-events-none" />
              <div className="absolute inset-3 border border-gold/10 pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-deep-black/85 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
