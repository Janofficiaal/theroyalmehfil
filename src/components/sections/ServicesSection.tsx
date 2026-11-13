"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Crown,
  MapPin,
  Palette,
  Flower2,
  UtensilsCrossed,
  Cake,
  Car,
  Theater,
  Music,
  Monitor,
  Volume2,
  Camera,
  Users,
  ShieldCheck,
  Gift,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Crown,
    title: "Professional Event Planning & Coordination",
    detail: "End-to-end timelines, production schedules, and on-site direction.",
  },
  {
    icon: MapPin,
    title: "Venue / Hall Hire & Location Sourcing",
    detail: "Prestigious UK estates, grand ballrooms, and private venues.",
  },
  {
    icon: Palette,
    title: "Luxury Venue Styling & Event Decoration",
    detail: "Bespoke architectural draping, tablescapes, and royal themes.",
  },
  {
    icon: Flower2,
    title: "Floral Design & Themed Décor Concepts",
    detail: "Fresh floral arches, suspended installations, and centrepieces.",
  },
  {
    icon: UtensilsCrossed,
    title: "Catering & Premium Food Services",
    detail: "Fine culinary experiences tailored to your guests and traditions.",
  },
  {
    icon: Cake,
    title: "Dessert Tables & Custom Catering Menus",
    detail: "Artisanal patisserie displays and bespoke multi-course menus.",
  },
  {
    icon: Car,
    title: "Luxury Cars & Guest Transport",
    detail: "Chauffeur-driven wedding cars, executive fleets, and logistics.",
  },
  {
    icon: Theater,
    title: "Stage Design & Production",
    detail: "Custom-built royal stages, mandaps, and couture backdrops.",
  },
  {
    icon: Music,
    title: "Entertainment Services",
    detail: "Live performers, DJs, hosts, and curated cultural acts.",
  },
  {
    icon: Monitor,
    title: "LED 4K Screens & Visual Displays",
    detail: "High-definition scenic walls and custom visual storytelling.",
  },
  {
    icon: Volume2,
    title: "Professional Sound Systems & Lighting",
    detail: "Concert-grade acoustics and intelligent atmospheric lighting.",
  },
  {
    icon: Camera,
    title: "Photography & Videography",
    detail: "Editorial photography and cinematic multi-camera event films.",
  },
  {
    icon: Users,
    title: "Guest Management & Hospitality",
    detail: "RSVP concierge, protocol seating, and VIP reception hosts.",
  },
  {
    icon: ShieldCheck,
    title: "Security & Event Staffing",
    detail: "Discreet SIA-licensed security and attentive event personnel.",
  },
  {
    icon: Gift,
    title: "Custom Packages",
    detail: "Tailored turnkey solutions crafted seamlessly around your vision.",
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".services-heading",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".services-heading",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".service-item",
        { y: 45, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.04,
          scrollTrigger: {
            trigger: ".services-list",
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
      id="services"
      className="relative py-28 md:py-40 overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-deep-black via-royal-black to-deep-black" />

      <div className="relative max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="text-center mb-16 md:mb-24">
          <p className="font-body text-[10px] tracking-[0.5em] uppercase text-gold/70 mb-5">
            04 — Complete Event Solutions
          </p>
          <h2 className="services-heading font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-champagne tracking-wide">
            Every Detail, <span className="italic text-gold">Perfected</span>
          </h2>
          <p className="font-body text-sm md:text-base text-ivory/60 max-w-2xl mx-auto mt-5 tracking-wide">
            Everything you need — all under one roof. From concept to
            celebration, we deliver a comprehensive suite of luxury event
            services tailored to your vision.
          </p>
        </div>

        <div className="services-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="service-item group relative p-6 md:p-8 border border-gold/10 hover:border-gold/35 bg-royal-black/60 hover:bg-gold/[0.04] transition-all duration-500 cursor-default"
                data-cursor-hover
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="w-10 h-10 flex items-center justify-center border border-gold/25 group-hover:border-gold/60 transition-colors duration-300">
                    <Icon
                      className="w-4 h-4 text-gold/75 group-hover:text-gold transition-colors duration-300"
                      strokeWidth={1.5}
                    />
                  </div>
                  <span className="font-body text-[10px] tracking-[0.25em] text-gold/35 group-hover:text-gold/70 transition-colors">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="font-heading text-lg md:text-xl text-champagne/95 font-light tracking-wide leading-snug group-hover:text-gold transition-colors duration-300 mb-2">
                  {service.title}
                </h3>
                <p className="font-body text-xs md:text-sm text-ivory/50 leading-relaxed">
                  {service.detail}
                </p>

                <div className="absolute top-0 left-0 w-0 group-hover:w-full h-[1px] bg-gradient-to-r from-gold/60 via-champagne/30 to-transparent transition-all duration-700" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
