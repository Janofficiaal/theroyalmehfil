"use client";

import dynamic from "next/dynamic";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { useCustomCursor } from "@/hooks/useCustomCursor";
import { useScrollProgress } from "@/hooks/useScrollProgress";

const LoadingScreen = dynamic(() => import("@/components/ui/LoadingScreen"), { ssr: false });
const RoyalNavigation = dynamic(() => import("@/components/ui/RoyalNavigation"), { ssr: false });
const RoyalScrollExperience = dynamic(() => import("@/components/sections/RoyalScrollExperience"), { ssr: false });
const ExperienceSection = dynamic(() => import("@/components/sections/ExperienceSection"), { ssr: false });
const TransformationSection = dynamic(() => import("@/components/sections/TransformationSection"), { ssr: false });
const MehfilAssemblySection = dynamic(() => import("@/components/sections/MehfilAssemblySection"), { ssr: false });
const EventsSection = dynamic(() => import("@/components/sections/EventsSection"), { ssr: false });
const ServicesSection = dynamic(() => import("@/components/sections/ServicesSection"), { ssr: false });
const GallerySection = dynamic(() => import("@/components/sections/GallerySection"), { ssr: false });
const WhyChooseSection = dynamic(() => import("@/components/sections/WhyChooseSection"), { ssr: false });
const CTASection = dynamic(() => import("@/components/sections/CTASection"), { ssr: false });
const ContactFooter = dynamic(() => import("@/components/sections/ContactFooter"), { ssr: false });

export default function HomePage() {
  useSmoothScroll();
  useCustomCursor();
  const scrollProgressRef = useScrollProgress();

  return (
    <>
      <LoadingScreen />
      <div ref={scrollProgressRef} className="scroll-progress" />
      <RoyalNavigation />

      <main>
        {/* 01 — Cinematic 4-Scene Royal Scroll Experience */}
        <RoyalScrollExperience />

        {/* 02 — The Royal Experience */}
        <ExperienceSection />

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
