"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Gem, Users, Heart, Award, Smile, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  {
    icon: Gem,
    title: "Luxury & Elegant Event Design",
    description:
      "Every event is designed with exquisite attention to detail, blending sophistication with breathtaking aesthetics.",
  },
  {
    icon: Users,
    title: "Professional & Experienced Team",
    description:
      "Our seasoned team of event specialists brings years of expertise to ensure flawless execution.",
  },
  {
    icon: Heart,
    title: "Personalised Planning",
    description:
      "We listen to your vision and tailor every aspect to create an event that is uniquely yours.",
  },
  {
    icon: Award,
    title: "Premium Quality Services",
    description:
      "From venue décor to catering, we partner with only the finest suppliers and craftspeople.",
  },
  {
    icon: Smile,
    title: "Stress-Free Event Experience",
    description:
      "Relax and enjoy your celebration while we handle every detail with precision and care.",
  },
  {
    icon: Sparkles,
    title: "Creating Memories That Last a Lifetime",
    description:
      "We go beyond event management — we create experiences that you and your guests will cherish forever.",
  },
];

export default function WhyChooseSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".why-heading",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".why-heading",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".why-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".why-grid",
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
      className="relative py-32 md:py-44 overflow-hidden"
    >
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-black via-royal-black/50 to-deep-black" />

      <div className="relative max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="text-center mb-20 md:mb-28">
          <p className="font-body text-[10px] tracking-[0.5em] uppercase text-gold/50 mb-6">
            06 — Why Choose Us
          </p>
          <h2 className="why-heading font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-champagne tracking-wide">
            The Royal{" "}
            <span className="italic text-gold">Difference</span>
          </h2>
        </div>

        {/* Reasons Grid */}
        <div className="why-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.title}
                className="why-card group relative p-8 md:p-10 border border-gold/[0.06] hover:border-gold/15 bg-deep-black/50 transition-all duration-500"
                data-cursor-hover
              >
                {/* Icon */}
                <div className="w-12 h-12 flex items-center justify-center border border-gold/15 group-hover:border-gold/30 mb-6 transition-colors duration-500">
                  <Icon
                    className="w-5 h-5 text-gold/50 group-hover:text-gold transition-colors duration-300"
                    strokeWidth={1.5}
                  />
                </div>

                {/* Content */}
                <h3 className="font-heading text-xl md:text-2xl text-champagne font-light tracking-wide mb-4 group-hover:text-gold transition-colors duration-300">
                  {reason.title}
                </h3>
                <p className="font-body text-sm text-ivory/50 leading-relaxed tracking-wide">
                  {reason.description}
                </p>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-gold/40 to-transparent group-hover:w-full transition-all duration-700" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
