"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import MagneticButton from "@/components/ui/MagneticButton";

const navLinks = [
  { label: "Experience", href: "#experience" },
  { label: "Events", href: "#events" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
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

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        aria-label="Primary navigation"
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${
          isScrolled
            ? "bg-deep-black/90 backdrop-blur-md border-b border-gold/15"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex items-center justify-between h-20 md:h-24">
            <a
              href="#"
              className="flex flex-col items-start group"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <span className="font-heading text-xl md:text-2xl font-semibold tracking-[0.15em] text-champagne group-hover:text-gold transition-colors">
                THE ROYAL
              </span>
              <span className="font-heading text-xs md:text-sm tracking-[0.4em] text-gold font-light -mt-1">
                MEHFIL
              </span>
            </a>

            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => handleNavClick(link.href)}
                  className="nav-link"
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-5">
              <MagneticButton
                href="#contact"
                className="hidden md:inline-flex px-6 py-2.5 border border-gold/45 text-xs tracking-[0.2em] uppercase text-champagne hover:text-deep-black transition-colors duration-300"
              >
                <span>Enquire</span>
              </MagneticButton>

              <button
                type="button"
                className="lg:hidden flex flex-col gap-1.5 p-2"
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
              >
                <span
                  className={`block w-6 h-[1px] bg-champagne transition-all duration-300 ${
                    isOpen ? "rotate-45 translate-y-[3.5px]" : ""
                  }`}
                />
                <span
                  className={`block w-6 h-[1px] bg-champagne transition-all duration-300 ${
                    isOpen ? "-rotate-45 -translate-y-[3.5px]" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Fullscreen Navigation */}
      <div
        ref={mobileMenuRef}
        aria-hidden={!isOpen}
        className="fixed inset-0 z-[99] bg-deep-black/98 backdrop-blur-lg flex flex-col items-center justify-center"
        style={{ clipPath: "circle(0% at calc(100% - 2rem) 2rem)" }}
      >
        <div className="flex flex-col items-center gap-7">
          {navLinks.map((link) => (
            <button
              key={link.label}
              type="button"
              onClick={() => handleNavClick(link.href)}
              className="mobile-nav-link font-heading text-3xl md:text-4xl text-champagne tracking-[0.1em] hover:text-gold transition-colors"
            >
              {link.label}
            </button>
          ))}
          <div className="gold-line w-20 mt-3" />
          <button
            type="button"
            onClick={() => handleNavClick("#contact")}
            className="mobile-nav-link mt-2 px-8 py-3 border border-gold/50 text-xs tracking-[0.25em] uppercase text-champagne hover:bg-gold hover:text-deep-black transition-colors"
          >
            Plan Your Event
          </button>
        </div>
      </div>
    </>
  );
}
