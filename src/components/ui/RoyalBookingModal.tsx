"use client";

import React, { useState, useEffect, useCallback } from "react";
import { X, Check } from "lucide-react";
import { useBookingModal } from "@/context/BookingModalContext";

const EVENT_TYPES = [
  "Royal Wedding & Reception",
  "Grand Walima Celebration",
  "Sacred Nikkah Ceremony",
  "Mehndi & Sangeet Night",
  "Exclusive Private Gala",
  "Corporate Luxury Event",
];

const GUEST_RANGES = [
  "100 – 250 Guests",
  "250 – 500 Guests",
  "500 – 800 Guests",
  "800+ Guests",
];

export default function RoyalBookingModal() {
  const { isOpen, closeBooking } = useBookingModal();

  const [eventType, setEventType] = useState(EVENT_TYPES[0]);
  const [guestCount, setGuestCount] = useState(GUEST_RANGES[1]);
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [venue, setVenue] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleClose = useCallback(() => {
    setIsSubmitted(false);
    closeBooking();
  }, [closeBooking]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
    >
      {/* Dark Glass Backdrop */}
      <div
        className="absolute inset-0 bg-black/85 backdrop-blur-md transition-opacity duration-300"
        onClick={handleClose}
      />

      {/* Modal Dialog Card */}
      <div
        className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-2xl border border-[#D4AF62]/45 bg-[#1B050C]/95 p-6 sm:p-9 shadow-[0_20px_60px_rgba(0,0,0,0.85)] will-change-transform"
        style={{
          boxShadow:
            "0 0 50px rgba(184, 67, 96, 0.15), inset 0 1px 0 rgba(212, 175, 98, 0.4)",
        }}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close booking modal"
          className="absolute top-5 right-5 w-8 h-8 rounded-full border border-[#D4AF62]/40 flex items-center justify-center text-[#FFF8E9] hover:text-[#F2B8C6] hover:border-[#F2B8C6] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {isSubmitted ? (
          /* Success Screen */
          <div className="py-12 text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-full border border-[#D4AF62] bg-[#3B0C18]/60 flex items-center justify-center mb-6">
              <Check className="w-7 h-7 text-[#D4AF62]" />
            </div>
            <h3 className="font-kudus text-2xl sm:text-3xl font-normal tracking-[0.14em] text-[#FFF8E9] mb-3">
              CONSULTATION REQUESTED
            </h3>
            <p className="font-sans text-xs sm:text-sm text-[#F7DCE3]/80 max-w-md mx-auto mb-8 leading-relaxed">
              Thank you, {name || "esteemed guest"}. Our senior event director
              will contact you personally within 24 hours to begin your curation.
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="px-8 py-3 rounded-full border border-[#D4AF62] bg-[#3B0C18] font-kudus text-xs tracking-[0.2em] uppercase text-[#FFF8E9] hover:bg-[#D4AF62] hover:text-black transition-all"
            >
              CLOSE
            </button>
          </div>
        ) : (
          /* Booking Form */
          <div>
            {/* Header */}
            <div className="text-center mb-7">
              <p className="text-[10px] tracking-[0.4em] uppercase text-[#D4AF62] mb-2 font-sans">
                PRIVATE RESERVATION
              </p>
              <h2 className="font-kudus text-2xl sm:text-3xl font-normal tracking-[0.12em] text-[#FFF8E9] leading-tight">
                RESERVE YOUR MEHFIL
              </h2>
              <p className="font-sans text-xs text-[#F7DCE3]/75 mt-2">
                Bespoke event direction across the United Kingdom.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Event Type Selection */}
              <div>
                <label className="block font-kudus text-[11px] tracking-[0.16em] uppercase text-[#D4AF62] mb-2.5">
                  1. SELECT CELEBRATION
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {EVENT_TYPES.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setEventType(type)}
                      className={`px-3 py-2 text-left rounded-lg text-[11px] font-sans border transition-all ${
                        eventType === type
                          ? "bg-[#3B0C18] border-[#F2B8C6] text-[#FFF8E9] shadow-[0_0_12px_rgba(242,184,198,0.25)]"
                          : "bg-black/35 border-[#D4AF62]/20 text-[#FFF8E9]/70 hover:border-[#D4AF62]/50"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Guest Count */}
              <div>
                <label className="block font-kudus text-[11px] tracking-[0.16em] uppercase text-[#D4AF62] mb-2.5">
                  2. ESTIMATED GUEST COUNT
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {GUEST_RANGES.map((range) => (
                    <button
                      key={range}
                      type="button"
                      onClick={() => setGuestCount(range)}
                      className={`px-2.5 py-2 text-center rounded-lg text-[10px] font-sans border transition-all ${
                        guestCount === range
                          ? "bg-[#3B0C18] border-[#F2B8C6] text-[#FFF8E9] shadow-[0_0_12px_rgba(242,184,198,0.25)]"
                          : "bg-black/35 border-[#D4AF62]/20 text-[#FFF8E9]/70 hover:border-[#D4AF62]/50"
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date & Venue */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-kudus text-[10px] tracking-[0.16em] uppercase text-[#D4AF62] mb-1.5">
                    PREFERRED DATE / SEASON
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Autumn 2026 / 15 Oct"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-[#D4AF62]/30 text-xs text-[#FFF8E9] placeholder:text-[#FFF8E9]/30 focus:outline-none focus:border-[#F2B8C6]"
                  />
                </div>
                <div>
                  <label className="block font-kudus text-[10px] tracking-[0.16em] uppercase text-[#D4AF62] mb-1.5">
                    PREFERRED VENUE OR CITY
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Mayfair / London"
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-[#D4AF62]/30 text-xs text-[#FFF8E9] placeholder:text-[#FFF8E9]/30 focus:outline-none focus:border-[#F2B8C6]"
                  />
                </div>
              </div>

              {/* Personal Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block font-kudus text-[10px] tracking-[0.16em] uppercase text-[#D4AF62] mb-1.5">
                    FULL NAME
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-[#D4AF62]/30 text-xs text-[#FFF8E9] placeholder:text-[#FFF8E9]/30 focus:outline-none focus:border-[#F2B8C6]"
                  />
                </div>
                <div>
                  <label className="block font-kudus text-[10px] tracking-[0.16em] uppercase text-[#D4AF62] mb-1.5">
                    PHONE / WHATSAPP
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+44 7000 000000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-[#D4AF62]/30 text-xs text-[#FFF8E9] placeholder:text-[#FFF8E9]/30 focus:outline-none focus:border-[#F2B8C6]"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full border border-[#D4AF62] bg-gradient-to-r from-[#B84360] to-[#8A2038] font-kudus text-xs tracking-[0.2em] uppercase text-[#FFF8E9] hover:brightness-110 shadow-[0_4px_20px_rgba(184,67,96,0.4)] transition-all cursor-pointer"
                >
                  REQUEST PRIVATE CONSULTATION →
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
