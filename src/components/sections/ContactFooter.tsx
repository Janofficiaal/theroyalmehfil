"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Send,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export default function ContactFooter() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    message: "",
  });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-heading",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".contact-heading",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".contact-content",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: ".contact-content",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".footer-logo",
        { opacity: 0, y: 24, letterSpacing: "0.08em" },
        {
          opacity: 1,
          y: 0,
          letterSpacing: "0.18em",
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".footer-logo",
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const subject = encodeURIComponent(
      `Event Enquiry from ${formData.name}`
    );
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nEvent Type: ${formData.eventType}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:info@uksecuritypartners.co.uk?subject=${subject}&body=${body}`;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section ref={sectionRef} id="contact" className="relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/25 to-transparent" />

      {/* ── Contact Section ──────────────── */}
      <div className="py-28 md:py-40 bg-gradient-to-b from-deep-black to-royal-black">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="text-center mb-16 md:mb-20">
            <p className="font-body text-[10px] tracking-[0.5em] uppercase text-gold/70 mb-5">
              08 — Get in Touch
            </p>
            <h2 className="contact-heading font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-champagne tracking-wide">
              Begin Your <span className="italic text-gold">Journey</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24">
            {/* Left: Contact Info + Map */}
            <div className="contact-content">
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center border border-gold/25">
                    <MapPin className="w-4 h-4 text-gold/75" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg text-champagne font-light tracking-wide mb-1">
                      Visit Us
                    </h3>
                    <p className="font-body text-sm text-ivory/65 tracking-wide leading-relaxed">
                      7 Bernard Road, Romford,
                      <br />
                      RM7 0HX, England
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center border border-gold/25">
                    <Mail className="w-4 h-4 text-gold/75" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg text-champagne font-light tracking-wide mb-1">
                      Email Us
                    </h3>
                    <a
                      href="mailto:info@uksecuritypartners.co.uk"
                      className="font-body text-sm text-ivory/65 tracking-wide hover:text-gold transition-colors"
                    >
                      info@uksecuritypartners.co.uk
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center border border-gold/25">
                    <Phone className="w-4 h-4 text-gold/75" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg text-champagne font-light tracking-wide mb-1">
                      Call Us
                    </h3>
                    <div className="space-y-1">
                      <a
                        href="tel:+447399739114"
                        className="block font-body text-sm text-ivory/65 tracking-wide hover:text-gold transition-colors"
                      >
                        +44 7399 739 114
                      </a>
                      <a
                        href="tel:+447762308545"
                        className="block font-body text-sm text-ivory/65 tracking-wide hover:text-gold transition-colors"
                      >
                        +44 7762 308 545
                      </a>
                      <a
                        href="tel:+442036261301"
                        className="block font-body text-sm text-ivory/65 tracking-wide hover:text-gold transition-colors"
                      >
                        +44 2036 261 301
                      </a>
                    </div>
                  </div>
                </div>

                <a
                  href="https://wa.me/447399739114?text=Hello%2C%20I%27d%20like%20to%20enquire%20about%20your%20event%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3 border border-gold/30 hover:border-gold/60 hover:bg-gold/[0.05] transition-all duration-300 group"
                  data-cursor-hover
                >
                  <MessageCircle
                    className="w-4 h-4 text-gold/75 group-hover:text-gold transition-colors"
                    strokeWidth={1.5}
                  />
                  <span className="font-body text-xs tracking-[0.2em] uppercase text-champagne/85 group-hover:text-champagne transition-colors">
                    WhatsApp Enquiry
                  </span>
                  <ArrowUpRight
                    className="w-3.5 h-3.5 text-gold/60 group-hover:text-gold transition-colors"
                    strokeWidth={1.5}
                  />
                </a>
              </div>

              {/* Google Maps */}
              <div className="mt-12 aspect-[16/9] overflow-hidden border border-gold/15">
                <iframe
                  src="https://www.google.com/maps?q=7+Bernard+Road,+Romford,+RM7+0HX,+UK&output=embed"
                  width="100%"
                  height="100%"
                  style={{
                    border: 0,
                    filter: "invert(0.92) hue-rotate(180deg) saturate(0.35) contrast(0.95)",
                  }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="The Royal Mehfil — 7 Bernard Road, Romford, RM7 0HX"
                />
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="contact-content">
              {submitted ? (
                <div className="h-full min-h-[420px] flex flex-col items-center justify-center text-center p-10 border border-gold/25 bg-deep-black/60">
                  <CheckCircle2
                    className="w-10 h-10 text-gold mb-5"
                    strokeWidth={1.25}
                  />
                  <h3 className="font-heading text-3xl text-champagne font-light mb-3">
                    Enquiry Prepared
                  </h3>
                  <p className="font-body text-sm text-ivory/65 max-w-md leading-relaxed mb-8">
                    Thank you for reaching out to The Royal Mehfil. Your email
                    client has been prepared for{" "}
                    <span className="text-gold">
                      info@uksecuritypartners.co.uk
                    </span>
                    , or you may connect directly via WhatsApp or telephone.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-3 border border-gold/40 text-xs tracking-[0.2em] uppercase text-champagne hover:bg-gold hover:text-deep-black transition-colors"
                  >
                    Send Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block font-body text-[10px] tracking-[0.3em] uppercase text-gold/65 mb-2"
                    >
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      autoComplete="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b border-gold/20 focus:border-gold/60 py-3 font-body text-sm text-champagne tracking-wide outline-none transition-colors placeholder:text-ivory/25"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block font-body text-[10px] tracking-[0.3em] uppercase text-gold/65 mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b border-gold/20 focus:border-gold/60 py-3 font-body text-sm text-champagne tracking-wide outline-none transition-colors placeholder:text-ivory/25"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block font-body text-[10px] tracking-[0.3em] uppercase text-gold/65 mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-gold/20 focus:border-gold/60 py-3 font-body text-sm text-champagne tracking-wide outline-none transition-colors placeholder:text-ivory/25"
                      placeholder="+44 ..."
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-event-type"
                      className="block font-body text-[10px] tracking-[0.3em] uppercase text-gold/65 mb-2"
                    >
                      Event Type
                    </label>
                    <select
                      id="contact-event-type"
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-gold/20 focus:border-gold/60 py-3 font-body text-sm text-champagne tracking-wide outline-none transition-colors appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-deep-black">
                        Select event type
                      </option>
                      <option value="Weddings & Receptions" className="bg-deep-black">
                        Weddings &amp; Receptions
                      </option>
                      <option value="Nikkah Ceremony" className="bg-deep-black">
                        Nikkah Ceremony
                      </option>
                      <option value="Mehndi & Sangeet Night" className="bg-deep-black">
                        Mehndi &amp; Sangeet Night
                      </option>
                      <option value="Engagement Celebration" className="bg-deep-black">
                        Engagement Celebration
                      </option>
                      <option value="Birthday / Anniversary" className="bg-deep-black">
                        Birthday / Anniversary
                      </option>
                      <option value="Corporate Event / Conference" className="bg-deep-black">
                        Corporate Event / Conference
                      </option>
                      <option value="Award Ceremony / Gala Dinner" className="bg-deep-black">
                        Award Ceremony / Gala Dinner
                      </option>
                      <option value="VIP & Bespoke Event" className="bg-deep-black">
                        VIP &amp; Bespoke Event
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block font-body text-[10px] tracking-[0.3em] uppercase text-gold/65 mb-2"
                    >
                      Your Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full bg-transparent border-b border-gold/20 focus:border-gold/60 py-3 font-body text-sm text-champagne tracking-wide outline-none transition-colors resize-none placeholder:text-ivory/25"
                      placeholder="Tell us about your event date, guest count, and vision..."
                    />
                  </div>

                  <MagneticButton
                    type="submit"
                    className="w-full flex items-center justify-center gap-3 px-8 py-4 mt-4 bg-gold/15 border border-gold/45 hover:text-deep-black text-xs tracking-[0.25em] uppercase text-champagne transition-colors duration-300"
                  >
                    <span className="inline-flex items-center gap-3">
                      Send Enquiry
                      <Send className="w-3.5 h-3.5" strokeWidth={1.5} />
                    </span>
                  </MagneticButton>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer ───────────────────────── */}
      <footer className="relative py-16 md:py-20 bg-deep-black border-t border-gold/10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex flex-col items-center text-center">
            <div className="footer-logo mb-8">
              <p className="font-heading text-2xl md:text-3xl tracking-[0.18em] text-champagne/90 font-light">
                THE ROYAL
              </p>
              <p className="font-heading text-xs tracking-[0.5em] text-gold/75 mt-0.5">
                MEHFIL
              </p>
            </div>

            <div className="flex items-center gap-3 mb-7">
              <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-gold/30" />
              <div className="w-1 h-1 rotate-45 bg-gold/35" />
              <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-gold/30" />
            </div>

            <p className="font-heading text-sm md:text-base text-ivory/45 italic tracking-wide mb-6">
              Where Every Event Becomes a Grand Mehfil.
            </p>

            <p className="font-body text-[10px] tracking-[0.3em] uppercase text-ivory/35 mb-8">
              Part of UKSP &amp; Kensington Properties Group
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 mb-10">
              {["Experience", "Events", "Services", "Gallery", "Contact"].map(
                (link) => (
                  <button
                    key={link}
                    type="button"
                    onClick={() => {
                      document
                        .querySelector(`#${link.toLowerCase()}`)
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="font-body text-[10px] tracking-[0.3em] uppercase text-ivory/45 hover:text-gold transition-colors cursor-pointer"
                  >
                    {link}
                  </button>
                )
              )}
            </div>

            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gold/10 to-transparent mb-6" />

            <p className="font-body text-[10px] text-ivory/35 tracking-wider">
              &copy; {new Date().getFullYear()} The Royal Mehfil. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </section>
  );
}
