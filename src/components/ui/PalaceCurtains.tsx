"use client";

import { RefObject } from "react";

interface PalaceCurtainsProps {
  leftRef?: RefObject<HTMLDivElement | null>;
  rightRef?: RefObject<HTMLDivElement | null>;
}

/* ── Golden Tassel SVG ───────────────────────────────── */
function GoldenTassel({ side = "left" }: { side: "left" | "right" }) {
  const isLeft = side === "left";
  return (
    <div
      className={`absolute top-[48%] ${
        isLeft ? "-right-5 sm:-right-7" : "-left-5 sm:-left-7"
      } z-30 pointer-events-none drop-shadow-[0_8px_16px_rgba(0,0,0,0.85)]`}
    >
      <svg
        width="64"
        height="140"
        viewBox="0 0 64 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 sm:w-14 h-auto"
      >
        <defs>
          <linearGradient id={`goldRope-${side}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFF0C9" />
            <stop offset="35%" stopColor="#D4AF62" />
            <stop offset="70%" stopColor="#9E7628" />
            <stop offset="100%" stopColor="#D4AF62" />
          </linearGradient>
          <linearGradient id={`goldTassel-${side}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFF0C9" />
            <stop offset="20%" stopColor="#D4AF62" />
            <stop offset="60%" stopColor="#B88A38" />
            <stop offset="100%" stopColor="#6E4F18" />
          </linearGradient>
          <radialGradient id={`goldKnob-${side}`} cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFF8E9" />
            <stop offset="45%" stopColor="#D4AF62" />
            <stop offset="85%" stopColor="#7A5618" />
            <stop offset="100%" stopColor="#4A340E" />
          </radialGradient>
        </defs>

        {/* Braided Tieback Rope Loop */}
        <path
          d={
            isLeft
              ? "M-20 10 Q 20 22 36 32 Q 44 38 40 46 Q 34 52 14 48 Q -10 44 -20 40"
              : "M84 10 Q 44 22 28 32 Q 20 38 24 46 Q 30 52 50 48 Q 74 44 84 40"
          }
          stroke={`url(#goldRope-${side})`}
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />

        {/* Rope Texture Highlights */}
        <path
          d={
            isLeft
              ? "M-18 12 Q 18 24 34 34"
              : "M82 12 Q 46 24 30 34"
          }
          stroke="#FFF8E9"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="2 4"
          fill="none"
        />

        {/* Hanging Cord */}
        <path
          d="M32 46 L32 62"
          stroke={`url(#goldRope-${side})`}
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Ornamental Top Cap / Bell */}
        <ellipse cx="32" cy="62" rx="10" ry="4" fill={`url(#goldKnob-${side})`} />
        <path
          d="M22 62 C22 68 25 74 32 75 C39 74 42 68 42 62 Z"
          fill={`url(#goldKnob-${side})`}
        />

        {/* Main Sculpted Knob */}
        <circle cx="32" cy="74" r="8" fill={`url(#goldKnob-${side})`} />
        <ellipse cx="32" cy="80" rx="9" ry="3" fill="#D4AF62" />

        {/* Tassel Skirt / Silk Fringe */}
        <path
          d="M24 81 Q 20 110 16 135 L 48 135 Q 44 110 40 81 Z"
          fill={`url(#goldTassel-${side})`}
        />

        {/* Individual Fringe Strands */}
        {[20, 24, 28, 32, 36, 40, 44].map((x, idx) => (
          <line
            key={idx}
            x1={x}
            y1="82"
            x2={x + (idx - 3) * 1.5}
            y2="135"
            stroke="#FFF8E9"
            strokeWidth="0.8"
            opacity="0.65"
          />
        ))}

        {/* Gold Band Wrapping */}
        <rect x="23" y="80" width="18" height="3" rx="1" fill="#FFF0C9" />
      </svg>
    </div>
  );
}

/* ── Single Velvet Curtain Leaf with Gold Embroidery ─── */
function VelvetCurtainLeaf({ side }: { side: "left" | "right" }) {
  const isLeft = side === "left";

  return (
    <div className="relative w-full h-full overflow-visible">
      {/* Heavy Dusty-Pink Velvet Body with Pleats & Depth */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{
          background: isLeft
            ? `linear-gradient(
                to right,
                #451522 0%,
                #6B2536 8%,
                #A34F64 16%,
                #5A1E2B 24%,
                #9E4A5F 34%,
                #C7768C 42%,
                #85374A 52%,
                #B66378 62%,
                #632030 72%,
                #944356 82%,
                #C27187 90%,
                #611F2E 96%,
                #3B101B 100%
              )`
            : `linear-gradient(
                to left,
                #451522 0%,
                #6B2536 8%,
                #A34F64 16%,
                #5A1E2B 24%,
                #9E4A5F 34%,
                #C7768C 42%,
                #85374A 52%,
                #B66378 62%,
                #632030 72%,
                #944356 82%,
                #C27187 90%,
                #611F2E 96%,
                #3B101B 100%
              )`,
          boxShadow: isLeft
            ? "inset -8px 0 24px rgba(0,0,0,0.7), 16px 0 35px rgba(0,0,0,0.65)"
            : "inset 8px 0 24px rgba(0,0,0,0.7), -16px 0 35px rgba(0,0,0,0.65)",
        }}
      >
        {/* Subtle Velvet Sheen & Soft Texture */}
        <div
          className="absolute inset-0 opacity-40 mix-blend-soft-light pointer-events-none"
          style={{
            background:
              "repeating-linear-gradient(90deg, transparent 0px, rgba(255,240,245,0.2) 18px, transparent 36px)",
          }}
        />

        {/* Ambient Warm Golden Rim Glow */}
        <div
          className={`absolute top-0 bottom-0 ${
            isLeft ? "right-0" : "left-0"
          } w-16 pointer-events-none opacity-60`}
          style={{
            background: isLeft
              ? "linear-gradient(to left, rgba(212,175,98,0.35) 0%, transparent 100%)"
              : "linear-gradient(to right, rgba(212,175,98,0.35) 0%, transparent 100%)",
          }}
        />
      </div>

      {/* Champagne-Gold Embroidered Inner Border Trim */}
      <div
        className={`absolute top-0 bottom-0 ${
          isLeft ? "right-0" : "left-0"
        } w-6 sm:w-8 md:w-10 z-20 pointer-events-none flex flex-col items-center justify-between py-4 shadow-lg`}
        style={{
          background:
            "linear-gradient(to bottom, #E8D6A3 0%, #D4AF62 30%, #9E7628 50%, #D4AF62 70%, #E8D6A3 100%)",
          boxShadow: isLeft
            ? "-2px 0 8px rgba(0,0,0,0.5), inset -1px 0 2px #FFF8E9"
            : "2px 0 8px rgba(0,0,0,0.5), inset 1px 0 2px #FFF8E9",
        }}
      >
        {/* Intricate Filigree / Embroidery Motifs Pattern Along Border */}
        <svg
          className="w-full h-full opacity-90"
          preserveAspectRatio="none"
          viewBox="0 0 20 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Repeating Golden Diamond & Scroll Embroidery Pattern */}
          <pattern
            id={`goldPattern-${side}`}
            width="20"
            height="25"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M10 2 L18 12.5 L10 23 L2 12.5 Z"
              stroke="#FFF8E9"
              strokeWidth="0.8"
              fill="rgba(247,220,227,0.2)"
            />
            <circle cx="10" cy="12.5" r="2.2" fill="#FFF8E9" />
            <path
              d="M10 0 L10 4 M10 21 L10 25 M0 12.5 L3 12.5 M17 12.5 L20 12.5"
              stroke="#6E4F18"
              strokeWidth="0.7"
            />
            <circle cx="10" cy="2" r="0.8" fill="#6E4F18" />
            <circle cx="10" cy="23" r="0.8" fill="#6E4F18" />
          </pattern>
          <rect width="20" height="100" fill={`url(#goldPattern-${side})`} />
        </svg>

        {/* Gold Braided Piping on Outer Edge */}
        <div
          className={`absolute top-0 bottom-0 ${
            isLeft ? "-left-[3px]" : "-right-[3px]"
          } w-[3px] bg-gradient-to-b from-[#FFF8E9] via-[#D4AF62] to-[#FFF8E9] shadow-sm`}
        />
        <div
          className={`absolute top-0 bottom-0 ${
            isLeft ? "right-0" : "left-0"
          } w-[1.5px] bg-[#FFF8E9]/75`}
        />
      </div>

      {/* Hanging Golden Tassel Accent */}
      <GoldenTassel side={side} />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   PALACE CURTAINS CONTAINER
   ══════════════════════════════════════════════════════════ */
export default function PalaceCurtains({ leftRef, rightRef }: PalaceCurtainsProps) {
  return (
    <div
      className="palace-curtains-wrapper absolute inset-0 z-[18] pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Top Pelmet / Swag Valance */}
      <div className="curtain-top-valance absolute top-0 left-0 right-0 h-12 sm:h-16 md:h-20 z-30 pointer-events-none">
        {/* Scalloped Velvet Pelmet */}
        <div
          className="w-full h-full shadow-[0_8px_20px_rgba(0,0,0,0.7)]"
          style={{
            background:
              "linear-gradient(180deg, #3B101B 0%, #6B2536 30%, #A34F64 65%, #5A1E2B 100%)",
            clipPath:
              "polygon(0 0, 100% 0, 100% 70%, 90% 100%, 80% 70%, 70% 100%, 60% 70%, 50% 100%, 40% 70%, 30% 100%, 20% 70%, 10% 100%, 0 70%)",
          }}
        >
          {/* Valance Gold Fringe Bottom Trim */}
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#D4AF62] via-[#FFF8E9] to-[#D4AF62] shadow-sm" />
        </div>
      </div>

      {/* Left Dusty-Pink Velvet Curtain Panel */}
      <div
        ref={leftRef}
        className="velvet-curtain-left absolute top-0 bottom-0 left-0 w-[30%] sm:w-[28%] md:w-[25%] lg:w-[23%] z-20 will-change-transform"
        style={{
          transformOrigin: "left center",
        }}
      >
        <VelvetCurtainLeaf side="left" />
      </div>

      {/* Right Dusty-Pink Velvet Curtain Panel */}
      <div
        ref={rightRef}
        className="velvet-curtain-right absolute top-0 bottom-0 right-0 w-[30%] sm:w-[28%] md:w-[25%] lg:w-[23%] z-20 will-change-transform"
        style={{
          transformOrigin: "right center",
        }}
      >
        <VelvetCurtainLeaf side="right" />
      </div>
    </div>
  );
}
