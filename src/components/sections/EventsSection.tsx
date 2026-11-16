"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const eventCategories = [
  {
    title: "Weddings & Receptions",
    image: "/images/royal-stage.jpg",
  },
  {
    title: "Nikkah Ceremonies",
    image: "/images/royal-nikkah.jpg",
  },
  {
    title: "Mehndi & Sangeet Nights",
    image: "/images/mehndi-night.jpg",
  },
  {
    title: "Engagement Celebrations",
    image:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=700&q=80",
  },
  {
    title: "Birthday Parties & Anniversaries",
    image: "/images/royal-banquet.jpg",
  },
  {
    title: "Baby Showers & Gender Reveals",
    image:
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=700&q=80",
  },
  {
    title: "Private Luxury Celebrations",
    image: "/images/hero-ballroom.jpg",
  },
  {
    title: "Corporate Events & Conferences",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=700&q=80",
  },
  {
    title: "Award Ceremonies & Gala Dinners",
    image: "/images/royal-gala.jpg",
  },
  {
    title: "Product Launches & Brand Activations",
    image:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=700&q=80",
  },
  {
    title: "Cultural & Community Events",
    image:
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=700&q=80",
  },
  {
    title: "Exhibitions & Trade Shows",
    image:
      "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=700&q=80",
  },
  {
    title: "Charity & Fundraising Events",
    image:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=700&q=80",
  },
  {
    title: "VIP & Bespoke High-End Events",
    image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=700&q=80",
  },
];

export default function EventsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".events-heading",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".events-heading",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".event-card",
        { y: 80, rotateX: 16, scale: 0.92, opacity: 0 },
        {
          y: 0,
          rotateX: 0,
          scale: 1,
          opacity: 1,
          duration: 0.85,
          ease: "power3.out",
          stagger: { amount: 0.65, from: "start" },
          scrollTrigger: {
            trigger: ".events-grid",
            start: "top 85%",
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
      id="events"
      className="relative py-28 md:py-40 overflow-hidden bg-deep-black"
    >
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/25 to-transparent" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="text-center mb-14 md:mb-20">
          <p className="font-sans text-[10px] tracking-[0.45em] uppercase text-[#D4AF62] mb-3">
            04 — OUR SIGNATURE EVENTS
          </p>
          <h2 className="events-heading font-kudus text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-[#FFF8E9] tracking-[0.12em] leading-tight">
            CELEBRATIONS WE
          </h2>
          <h2 className="events-heading font-kudus text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-[#F2B8C6] tracking-[0.12em] leading-tight">
            CRAFT & DIRECT
          </h2>
        </div>

        <div
          className="events-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5"
          style={{ perspective: "1200px" }}
        >
          {eventCategories.map((event, index) => (
            <article
              key={event.title}
              className="event-card group relative overflow-hidden cursor-pointer bg-royal-black will-change-transform"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              data-cursor-hover
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                />

                <div
                  className={`absolute inset-0 transition-all duration-500 ${
                    hoveredIndex === index
                      ? "bg-gradient-to-t from-deep-black/90 via-deep-black/30 to-deep-black/15"
                      : "bg-gradient-to-t from-deep-black/90 via-deep-black/45 to-deep-black/30"
                  }`}
                />

                <div className="absolute inset-0 border border-gold/10 group-hover:border-gold/45 transition-colors duration-500 pointer-events-none" />

                <span className="absolute top-4 right-5 font-body text-[10px] tracking-[0.3em] text-gold/65 group-hover:text-gold transition-colors duration-300">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                  <div className="w-8 h-[1px] bg-gold/50 mb-3 transition-all duration-500 group-hover:w-14 group-hover:bg-gold" />
                  <h3 className="font-kudus text-base md:text-lg text-[#FFF8E9] font-normal tracking-[0.1em] leading-snug group-hover:text-[#F2B8C6] transition-colors duration-300">
                    {event.title}
                  </h3>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
