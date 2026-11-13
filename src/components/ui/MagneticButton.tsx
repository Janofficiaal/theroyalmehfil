"use client";

import { useRef, useEffect, ReactNode } from "react";
import { gsap } from "gsap";

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  strength?: number;
  ariaLabel?: string;
}

export default function MagneticButton({
  children,
  href,
  onClick,
  type = "button",
  className = "",
  strength = 0.28,
  ariaLabel,
}: MagneticButtonProps) {
  const elRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const isTouch =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (isTouch || reducedMotion) return;

    const xTo = gsap.quickTo(el, "x", {
      duration: 0.45,
      ease: "power3.out",
    });
    const yTo = gsap.quickTo(el, "y", {
      duration: 0.45,
      ease: "power3.out",
    });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      xTo(relX * strength);
      yTo(relY * strength);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength]);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href && href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      target?.scrollIntoView({ behavior: "smooth" });
    }
    onClick?.();
  };

  if (href) {
    return (
      <a
        ref={elRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        onClick={handleAnchorClick}
        aria-label={ariaLabel}
        data-cursor-hover
        className={`magnetic-btn ${className}`}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={elRef as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      data-cursor-hover
      className={`magnetic-btn ${className}`}
    >
      {children}
    </button>
  );
}
