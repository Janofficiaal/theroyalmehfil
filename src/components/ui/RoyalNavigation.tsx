"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Volume2, VolumeX } from "lucide-react";
import { useRoyalAudio } from "@/context/RoyalAudioContext";
import { useBookingModal } from "@/context/BookingModalContext";

const navLinks = [
  { label: "HOME", href: "#", active: true },
  { label: "ABOUT", href: "#about" },
  { label: "SERVICES", href: "#services" },
  { label: "GALLERIES", href: "#gallery" },
  { label: "VENUES", href: "#venues" },
  { label: "CONTACT", href: "#contact" },
];

/* ── Golden Crown SVG Matching Approved Reference ─── */
function CrownIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="28"
      height="20"
      viewBox="0 0 28 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M2 16L5.5 5L10.5 10.5L14 2L17.5 10.5L22.5 5L26 16H2Z"
        stroke="#D4AF62"
        strokeWidth="1.2"
        strokeLinejoin="round"
        fill="#D4AF62"
        fillOpacity="0.22"
      />
      <path d="M3 18.5H25" stroke="#D4AF62" strokeWidth="0.9" strokeLinecap="round" />
      <circle cx="14" cy="1.5" r="1.1" fill="#D4AF62" />
      <circle cx="5.5" cy="5" r="0.7" fill="#D4AF62" />
      <circle cx="22.5" cy="5" r="0.7" fill="#D4AF62" />
    </svg>
  );
}

interface RoyalNavigationProps {
  soundOn?: boolean;
  onToggleSound?: () => void;
}

export default function RoyalNavigation({ soundOn, onToggleSound }: RoyalNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const audioContext = useRoyalAudio();
  const { openBooking } = useBookingModal();

  const isAudioActive = soundOn !== undefined ? soundOn : (audioContext.isPlaying && !audioContext.isMuted);

  const handleSoundToggle = () => {
    if (onToggleSound) {
      onToggleSound();
    } else {
      if (!audioContext.isPlaying) {
        audioContext.enableMusic();
      } else {
        audioContext.toggleMute();
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuRef.current) return;
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const tl = gsap.timeline();
      tl.to(mobileMenuRef.current, {
        clipPath: "circle(150% at calc(100% - 2rem) 2rem)",
        duration: 0.75,
        ease: "power4.inOut",
      });
      tl.fromTo(
        ".mobile-nav-link",
        { y: 36, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.07, duration: 0.45, ease: "power3.out" },
        "-=0.3"
      );
    } else {
      document.body.style.overflow = "";
      gsap.to(mobileMenuRef.current, {
        clipPath: "circle(0% at calc(100% - 2rem) 2rem)",
        duration: 0.55,
        ease: "power4.inOut",
      });
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        ref={navRef}
        aria-label="Primary navigation"
        className="fixed top-0 left-0 right-0 z-[100] transition-all duration-500"
        style={{
          background: isScrolled
            ? "linear-gradient(180deg, rgba(45, 8, 18, 0.94) 0%, rgba(28, 5, 12, 0.90) 100%)"
            : "linear-gradient(180deg, rgba(48, 9, 20, 0.82) 0%, rgba(32, 6, 14, 0.74) 100%)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(212, 175, 98, 0.32)",
          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.55)",
        }}
      >
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16 md:h-[70px]">
            {/* Left: Royal Mehfil Crown Logo */}
            <a
              href="#"
              className="flex items-center gap-2.5 group cursor-pointer"
              onClick={(e) => { e.preventDefault(); handleNavClick("#"); }}
            >
              <CrownIcon className="text-[#D4AF62] group-hover:text-[#F2B8C6] transition-colors duration-300 drop-shadow" />
              <div className="flex flex-col -space-y-0.5">
                <span className="font-kudus text-[15px] md:text-[17px] font-normal tracking-[0.16em] text-[#FFF8E9] group-hover:text-[#F2B8C6] transition-colors duration-300 drop-shadow">
                  ROYAL MEHFIL
                </span>
              </div>
            </a>

            {/* Center: Desktop Nav Links - Bold Chunky Font, Warm Ivory & Dusty Pink Active/Hover */}
            <div className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => handleNavClick(link.href)}
                  className={`font-kudus text-[12px] md:text-[13px] font-normal tracking-[0.18em] uppercase transition-all duration-300 cursor-pointer ${
                    link.active
                      ? "bg-[#B84360]/40 border border-[#F2B8C6]/50 text-[#FFF8E9] px-3.5 py-1 rounded-full shadow-[0_0_12px_rgba(242,184,198,0.35)]"
                      : "text-[#FFF8E9] hover:text-[#F2B8C6]"
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Right Side: Sound Toggle & BOOK YOUR EVENT CTA */}
            <div className="flex items-center gap-3 md:gap-4">
              {/* Sound Toggle with Gold Border & Animated Sound Waves */}
              <button
                type="button"
                onClick={handleSoundToggle}
                aria-label={isAudioActive ? "Mute Royal Mehfil anthem" : "Play Royal Mehfil anthem"}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-[#D4AF62]/50 bg-black/25 text-[#FFF8E9] hover:text-[#F2B8C6] hover:border-[#D4AF62] hover:bg-[#B84360]/20 transition-all duration-300 cursor-pointer shadow-sm group"
                title={isAudioActive ? "Royal Anthem Playing (Click to mute)" : "Click to play Royal Anthem"}
              >
                <div className="flex items-center gap-[2px] h-3 px-0.5">
                  <span className={`w-[1.5px] rounded-full bg-[#D4AF62] transition-all duration-300 ${isAudioActive ? "animate-sound-wave-1" : "h-1 opacity-40"}`} />
                  <span className={`w-[1.5px] rounded-full bg-[#E8D6A3] transition-all duration-300 ${isAudioActive ? "animate-sound-wave-2" : "h-2 opacity-40"}`} />
                  <span className={`w-[1.5px] rounded-full bg-[#D4AF62] transition-all duration-300 ${isAudioActive ? "animate-sound-wave-3" : "h-2.5 opacity-40"}`} />
                </div>
                {isAudioActive ? (
                  <Volume2 className="w-3.5 h-3.5 text-[#D4AF62] group-hover:text-[#F2B8C6]" strokeWidth={1.5} />
                ) : (
                  <VolumeX className="w-3.5 h-3.5 text-[#FFF8E9]/70 group-hover:text-[#F2B8C6]" strokeWidth={1.5} />
                )}
              </button>

              {/* BOOK YOUR EVENT Button - Rounded Pill with Champagne-Gold Border & Bold Ivory Text */}
              <button
                type="button"
                onClick={openBooking}
                className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#D4AF62] font-kudus text-[11px] tracking-[0.2em] uppercase font-normal text-[#FFF8E9] bg-[#3B0C18]/60 hover:bg-[#D4AF62] hover:text-[#080605] transition-all duration-300 cursor-pointer shadow-md group"
              >
                <span>BOOK YOUR EVENT</span>
                <span className="text-[11px] text-[#D4AF62] group-hover:text-[#080605] transition-colors">→</span>
              </button>

              {/* Mobile Hamburger */}
              <button
                type="button"
                className="lg:hidden flex flex-col gap-1.5 p-2"
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
              >
                <span className={`block w-5 h-[1px] bg-[#FFF8E9] transition-all duration-300 ${isOpen ? "rotate-45 translate-y-[3.5px]" : ""}`} />
                <span className={`block w-5 h-[1px] bg-[#FFF8E9] transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Fullscreen Navigation */}
      <div
        ref={mobileMenuRef}
        aria-hidden={!isOpen}
        className="fixed inset-0 z-[99] bg-[#22050E]/98 backdrop-blur-lg flex flex-col items-center justify-center"
        style={{ clipPath: "circle(0% at calc(100% - 2rem) 2rem)" }}
      >
        <div className="flex flex-col items-center gap-7">
          {navLinks.map((link) => (
            <button
              key={link.label}
              type="button"
              onClick={() => handleNavClick(link.href)}
              className="mobile-nav-link font-kudus text-2xl tracking-[0.16em] uppercase hover:text-[#F2B8C6] transition-colors"
              style={{ color: "#FFF8E9" }}
            >
              {link.label}
            </button>
          ))}
          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF62] to-transparent mt-3" />
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              openBooking();
            }}
            className="mobile-nav-link mt-2 px-8 py-3 rounded-full border border-[#D4AF62] font-kudus text-sm tracking-[0.22em] uppercase text-[#FFF8E9] bg-[#B84360]/40 hover:bg-[#D4AF62] hover:text-[#080605] transition-colors"
          >
            BOOK YOUR EVENT →
          </button>
          <a
            href="https://wa.me/447399739114?text=Hello%20The%20Royal%20Mehfil%2C%20I%20would%20like%20to%20enquire%20about%20your%20luxury%20event%20management%20services."
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="mobile-nav-link px-7 py-2.5 rounded-full border border-[#25D366]/40 text-[#25D366] font-kudus text-xs tracking-[0.2em] uppercase hover:bg-[#25D366] hover:text-black transition-colors"
          >
            WHATSAPP CONCIERGE →
          </a>
        </div>
      </div>
    </>
  );
}
