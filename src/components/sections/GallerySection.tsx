"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  {
    src: "/images/hero-ballroom.webp",
    caption: "Grand Wedding Reception",
    subtitle: "Royal Ballroom Production",
  },
  {
    src: "/images/royal-stage.webp",
    caption: "Gilded Couture Stage",
    subtitle: "Architectural Floral Design",
  },
  {
    src: "/images/mehndi-night.webp",
    caption: "Mehndi & Sangeet Evening",
    subtitle: "Candlelit Cultural Splendour",
  },
  {
    src: "/images/royal-nikkah.webp",
    caption: "Sacred Nikkah Pavilion",
    subtitle: "Filigree Jaali & Brass Lanterns",
  },
  {
    src: "/images/royal-banquet.webp",
    caption: "Signature Dining Experience",
    subtitle: "Candlelit Fine Hospitality",
  },
  {
    src: "/images/royal-gala.webp",
    caption: "Evening Gala & Awards",
    subtitle: "Stage & Spotlight Direction",
  },
];

export default function GallerySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".gallery-heading",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".gallery-heading",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      const mm = gsap.matchMedia();

      mm.add("(min-width: 640px)", () => {
        const track = scrollContainerRef.current;
        const pinContainer = containerRef.current;
        if (!track || !pinContainer) return;

        const getScrollDistance = () =>
          Math.max(0, track.scrollWidth - window.innerWidth + 80);

        const horizontalTween = gsap.to(track, {
          x: () => -getScrollDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: pinContainer,
            start: "top 12%",
            end: () => `+=${getScrollDistance()}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // 3D curved gallery perspective + inner image parallax tied to horizontal tween
        gsap.utils.toArray<HTMLElement>(".gallery-card").forEach((card) => {
          gsap.fromTo(
            card,
            { rotateY: -14, scale: 0.92 },
            {
              rotateY: 14,
              scale: 0.92,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                containerAnimation: horizontalTween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            }
          );

          const inner = card.querySelector(".gallery-image-inner");
          if (inner) {
            gsap.fromTo(
              inner,
              { scale: 1.16, x: -26 },
              {
                scale: 1,
                x: 26,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: horizontalTween,
                  start: "left right",
                  end: "right left",
                  scrub: true,
                },
              }
            );
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative py-28 md:py-40 overflow-hidden bg-deep-black"
    >
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/25 to-transparent" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 mb-14 md:mb-20">
        <p className="font-sans text-[10px] tracking-[0.45em] uppercase text-[#D4AF62] mb-3">
          07 — SIGNATURE GALLERIES
        </p>
        <h2 className="gallery-heading font-kudus text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-[#FFF8E9] tracking-[0.12em] leading-tight">
          MOMENTS OF
        </h2>
        <h2 className="gallery-heading font-kudus text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-[#F2B8C6] tracking-[0.12em] leading-tight mb-4">
          ROYAL GRANDEUR
        </h2>
        <p className="font-sans text-xs sm:text-sm text-[#F7DCE3]/75 max-w-lg tracking-wide">
          Curated wedding stages, royal floral artistry, and fine dining receptions across the United Kingdom.
        </p>
      </div>

      {/* Desktop: 3D Curved Horizontal Scroll / Mobile: Vertical Stack */}
      <div
        ref={containerRef}
        className="relative"
        style={{ perspective: "1400px" }}
      >
        <div
          ref={scrollContainerRef}
          className="flex flex-col sm:flex-row gap-10 sm:gap-10 px-6 sm:pl-12 lg:pl-20 sm:pr-24 will-change-transform"
          style={{ transformStyle: "preserve-3d" }}
        >
          {galleryImages.map((image, index) => (
            <div
              key={image.caption}
              className="gallery-card w-full sm:w-[58vw] md:w-[44vw] lg:w-[34vw] flex-shrink-0 relative group will-change-transform"
              data-cursor-hover
            >
              <div className="relative overflow-hidden aspect-[3/4] bg-royal-black shadow-[0_25px_70px_rgba(0,0,0,0.75)]">
                <div className="gallery-image-inner relative w-full h-full">
                  <Image
                    src={image.src}
                    alt={image.caption}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 35vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-deep-black/75 via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-3 border border-gold/20 group-hover:border-gold/45 transition-colors duration-500 pointer-events-none" />
              </div>

              <div className="mt-5 flex items-baseline justify-between gap-4">
                <div>
                  <div className="w-7 h-[1px] bg-gold/45 mb-3" />
                  <p className="font-heading text-xl md:text-2xl text-champagne/90 font-light tracking-wide">
                    {image.caption}
                  </p>
                  <p className="font-body text-[10px] tracking-[0.3em] uppercase text-gold/55 mt-1.5">
                    {image.subtitle}
                  </p>
                </div>
                <span className="font-heading text-sm text-gold/45">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
