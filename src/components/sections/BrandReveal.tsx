"use client";

import MagneticButton from "@/components/ui/MagneticButton";

export default function BrandReveal() {
  return (
    <div className="brand-reveal-layer absolute inset-0 z-[6] flex flex-col items-center justify-center text-center px-6 pointer-events-none opacity-0">
      {/* Subtle Crown Crest */}
      <svg
        width="44"
        height="28"
        viewBox="0 0 44 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="brand-reveal-item text-gold mb-4 opacity-90"
      >
        <path
          d="M4 22L8.5 8L16 15L22 4L28 15L35.5 8L40 22H4Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path
          d="M6 25.5H38"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <circle cx="22" cy="2.5" r="1.2" fill="currentColor" />
      </svg>

      <p className="brand-reveal-item font-heading text-xl sm:text-2xl md:text-3xl tracking-[0.34em] gold-shimmer font-light mb-5">
        THE ROYAL MEHFIL
      </p>

      <h1 className="brand-reveal-item font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-ivory tracking-[0.06em] leading-[1.08] max-w-4xl mx-auto">
        ENTER A WORLD OF{" "}
        <span className="italic text-champagne block sm:inline">
          ROYAL CELEBRATIONS.
        </span>
      </h1>

      {/* Ornamental Divider */}
      <div className="brand-reveal-item flex items-center justify-center gap-4 my-6 md:my-7">
        <div className="w-14 md:w-24 h-[1px] bg-gradient-to-r from-transparent to-gold/75" />
        <div className="w-1.5 h-1.5 rotate-45 border border-gold/80" />
        <div className="w-14 md:w-24 h-[1px] bg-gradient-to-l from-transparent to-gold/75" />
      </div>

      <p className="brand-reveal-item font-heading text-lg sm:text-xl md:text-2xl italic text-champagne/85 max-w-xl mx-auto tracking-wide">
        Where Every Event Becomes a Grand Mehfil.
      </p>

      <div className="brand-reveal-item mt-9 md:mt-11 pointer-events-auto flex flex-col sm:flex-row items-center gap-4">
        <MagneticButton
          href="#events"
          className="px-9 py-4 bg-gold/15 border border-gold/60 text-xs tracking-[0.25em] uppercase text-champagne hover:text-deep-black transition-colors duration-300"
        >
          <span>Explore Our Events</span>
        </MagneticButton>
        <MagneticButton
          href="#contact"
          className="px-9 py-4 border border-ivory/25 text-xs tracking-[0.25em] uppercase text-ivory/85 hover:border-gold/70 hover:text-deep-black transition-colors duration-300"
        >
          <span>Plan Your Event</span>
        </MagneticButton>
      </div>
    </div>
  );
}
