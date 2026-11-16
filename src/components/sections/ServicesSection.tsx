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
        <div className="text-center mb-14 md:mb-20">
          <p className="font-sans text-[10px] tracking-[0.45em] uppercase text-[#D4AF62] mb-3">
            05 — BESPOKE SERVICES
          </p>
          <h2 className="services-heading font-kudus text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-[#FFF8E9] tracking-[0.12em] leading-tight">
            EVERY DETAIL
          </h2>
          <h2 className="services-heading font-kudus text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-[#F2B8C6] tracking-[0.12em] leading-tight mb-4">
            MASTERED TO PERFECTION
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#F7DCE3]/75 max-w-xl mx-auto tracking-wide">
            End-to-end luxury event design, production, and direction under one distinguished roof.
          </p>
        </div>

        <div className="services-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="service-item group relative p-6 md:p-8 border border-[#D4AF62]/20 hover:border-[#D4AF62]/60 bg-[#16040A]/60 hover:bg-[#D4AF62]/[0.05] transition-all duration-500 cursor-default"
                data-cursor-hover
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="w-10 h-10 flex items-center justify-center border border-[#D4AF62]/35 group-hover:border-[#D4AF62] transition-colors duration-300">
                    <Icon
                      className="w-4 h-4 text-[#D4AF62] group-hover:text-[#F2B8C6] transition-colors duration-300"
                      strokeWidth={1.5}
                    />
                  </div>
                  <span className="font-kudus text-[10px] tracking-[0.25em] text-[#D4AF62]/50 group-hover:text-[#D4AF62] transition-colors">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="font-kudus text-sm md:text-base text-[#FFF8E9] font-normal tracking-[0.08em] leading-snug group-hover:text-[#F2B8C6] transition-colors duration-300 mb-2">
                  {service.title}
                </h3>
                <p className="font-sans text-xs text-[#FFF8E9]/60 leading-relaxed">
                  {service.detail}
                </p>

                <div className="absolute top-0 left-0 w-0 group-hover:w-full h-[1px] bg-gradient-to-r from-[#D4AF62] via-[#F2B8C6]/50 to-transparent transition-all duration-700" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
