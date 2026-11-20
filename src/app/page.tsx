"use client";

import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { useCustomCursor } from "@/hooks/useCustomCursor";
import { useScrollProgress } from "@/hooks/useScrollProgress";

import RoyalNavigation from "@/components/ui/RoyalNavigation";
import RoyalScrollExperience from "@/components/sections/RoyalScrollExperience";
import AboutSection from "@/components/sections/AboutSection";
import TransformationSection from "@/components/sections/TransformationSection";
import MehfilAssemblySection from "@/components/sections/MehfilAssemblySection";
import EventsSection from "@/components/sections/EventsSection";
import ServicesSection from "@/components/sections/ServicesSection";
import GallerySection from "@/components/sections/GallerySection";
import WhyChooseSection from "@/components/sections/WhyChooseSection";
import CTASection from "@/components/sections/CTASection";
import ContactFooter from "@/components/sections/ContactFooter";

export default function HomePage() {
  useSmoothScroll();
  useCustomCursor();
  const scrollProgressRef = useScrollProgress();

  return (
    <>
      <div ref={scrollProgressRef} className="scroll-progress" />
      <RoyalNavigation />

      <main>
        {/* 01 — Cinematic 4-Scene Royal Scroll Experience */}
        <RoyalScrollExperience />

        {/* 02 — About The Royal Mehfil */}
        <AboutSection />

        {/* 03 — Venue Transformation (Before & After) */}
        <TransformationSection />

        {/* 04 — Mehfil Assembly */}
        <MehfilAssemblySection />

        {/* 04 — Events */}
        <EventsSection />

        {/* 05 — Services */}
        <ServicesSection />

        {/* 06 — Gallery */}
        <GallerySection />

        {/* 07 — Why Choose */}
        <WhyChooseSection />

        {/* 08 — CTA */}
        <CTASection />

        {/* 09 — Contact & Footer */}
        <ContactFooter />
      </main>
    </>
  );
}
