"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";

export default function TransformationSection() {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPos(percent);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) {
      handleMove(e.clientX);
    }
  };

  return (
    <section className="relative py-28 md:py-40 bg-deep-black overflow-hidden select-none">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/25 to-transparent" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header - Bold Chunky Font, Short & Concise Copy */}
        <div className="text-center mb-12 md:mb-18">
          <p className="font-sans text-[10px] tracking-[0.45em] uppercase text-[#D4AF62] mb-3">
            03 — VENUE TRANSFORMATION
          </p>
          <h2 className="font-kudus text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-[0.12em] text-[#FFF8E9] leading-tight">
            FROM BARE ARCHITECTURE
          </h2>
          <h2 className="font-kudus text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-[0.12em] text-[#F2B8C6] leading-tight mb-4">
            TO ROYAL MAJESTY
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#F7DCE3]/75 max-w-lg mx-auto tracking-wide">
            Drag the slider to witness how our design team transforms historic UK
            ballrooms into bespoke royal celebrations.
          </p>
        </div>

        {/* Interactive Before / After Frame */}
        <div
          ref={containerRef}
          onMouseDown={() => (isDragging.current = true)}
          onMouseUp={() => (isDragging.current = false)}
          onMouseLeave={() => (isDragging.current = false)}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          className="relative w-full max-w-5xl mx-auto aspect-[16/9] rounded-2xl overflow-hidden border border-[#D4AF62]/40 shadow-[0_20px_60px_rgba(0,0,0,0.85)] cursor-ew-resize"
        >
          {/* After Image: Transformed Royal Mehfil (Full Background) */}
          <div className="absolute inset-0">
            <Image
              src="/images/golden-ballroom.jpg"
              alt="Transformed Royal Mehfil Ballroom"
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1200px"
              priority
            />
            {/* After Tag */}
            <div className="absolute top-5 right-5 px-3.5 py-1.5 rounded-full border border-[#D4AF62] bg-black/60 backdrop-blur-md">
              <span className="font-kudus text-[10px] tracking-[0.18em] uppercase text-[#FFF8E9]">
                THE ROYAL MEHFIL
              </span>
            </div>
          </div>

          {/* Before Image: Empty Palace Ballroom (Clipped with CSS clipPath) */}
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
          >
            <Image
              src="/images/ballroom-empty-before.jpg"
              alt="Empty Palace Venue Before Setup"
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1200px"
              priority
            />
            {/* Before Tag */}
            <div className="absolute top-5 left-5 px-3.5 py-1.5 rounded-full border border-[#FFF8E9]/30 bg-black/60 backdrop-blur-md">
              <span className="font-kudus text-[10px] tracking-[0.18em] uppercase text-[#FFF8E9]/80">
                RAW VENUE
              </span>
            </div>
          </div>

          {/* Golden Divider Line & Drag Handle */}
          <div
            className="absolute top-0 bottom-0 z-20 w-[2px] bg-gradient-to-b from-[#D4AF62] via-[#FFF8E9] to-[#D4AF62] shadow-[0_0_12px_rgba(212,175,98,0.8)]"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full border border-[#D4AF62] bg-[#1E050D] flex items-center justify-center shadow-[0_0_16px_rgba(212,175,98,0.6)]">
              <span className="text-[10px] text-[#FFF8E9] tracking-tighter font-sans select-none">
                ◀ ▶
              </span>
            </div>
          </div>
        </div>

        {/* Caption */}
        <div className="flex items-center justify-between max-w-5xl mx-auto mt-4 px-2 text-[11px] font-sans text-[#FFF8E9]/60">
          <span>RAW ARCHITECTURAL SPACE</span>
          <span className="text-[#D4AF62]">DRAG TO REVEAL TRANSFORMATION</span>
          <span>ROYAL EVENT PRODUCTION</span>
        </div>
      </div>
    </section>
  );
}
