"use client";

import React from "react";

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.529 1.83.81 2.79.81 3.182 0 5.768-2.587 5.768-5.767.001-3.181-2.585-5.765-5.767-5.765zm3.374 8.214c-.144.405-.837.774-1.17.824-.312.046-.708.073-2.146-.523-1.602-.665-2.617-2.28-2.697-2.386-.079-.106-.648-.863-.648-1.645 0-.782.408-1.168.553-1.328.144-.16.314-.2.419-.2.106 0 .211.002.304.006.098.005.23-.037.36.275.134.321.458 1.118.498 1.2.04.082.066.179.013.285-.053.106-.08.172-.158.265-.08.093-.167.207-.238.278-.08.08-.163.167-.07.327.093.16.413.682.886 1.103.608.542 1.121.71 1.28.79.16.08.253.07.346-.038.093-.106.399-.465.505-.624.106-.16.213-.133.36-.08.146.053.931.439 1.091.519.16.08.266.12.306.186.04.067.04.387-.104.792zM12 2C6.477 2 2 6.477 2 12c0 1.89.526 3.66 1.442 5.176L2 22l4.981-1.306A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.286c-1.636 0-3.155-.497-4.42-1.353l-.317-.215-2.964.777.791-2.89-.236-.375A8.256 8.256 0 013.714 12c0-4.57 3.716-8.286 8.286-8.286 4.57 0 8.286 3.716 8.286 8.286 0 4.57-3.716 8.286-8.286 8.286z" />
    </svg>
  );
}

export default function WhatsAppButton() {
  const whatsappUrl =
    "https://wa.me/447399739114?text=Hello%20The%20Royal%20Mehfil%2C%20I%20would%20like%20to%20enquire%20about%20your%20luxury%20event%20management%20services.";

  return (
    <aside
      aria-label="Direct WhatsApp Concierge"
      className="fixed bottom-6 left-4 sm:left-6 z-[85] pointer-events-auto"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with The Royal Mehfil VIP Concierge on WhatsApp"
        className="group flex items-center gap-2 px-3.5 py-2.5 rounded-full border border-[#D4AF62]/50 bg-[#1A050B]/90 backdrop-blur-md text-[#FFF8E9] shadow-[0_6px_24px_rgba(0,0,0,0.6)] hover:border-[#D4AF62] hover:bg-[#2E0713] hover:shadow-[0_8px_30px_rgba(212,175,98,0.35)] transition-all duration-300 cursor-pointer active:scale-95"
      >
        {/* Gold Bordered Circular WhatsApp Badge */}
        <div className="w-6 h-6 rounded-full bg-[#25D366]/20 border border-[#25D366]/60 flex items-center justify-center text-[#25D366] group-hover:text-[#FFF8E9] group-hover:bg-[#25D366] transition-all duration-300">
          <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
        </div>

        {/* Text Label - Bold Chunky font-kudus, Short & Concise */}
        <div className="flex flex-col text-left pr-1">
          <span className="font-kudus text-[10px] tracking-[0.16em] uppercase text-[#FFF8E9] group-hover:text-[#F2B8C6] transition-colors">
            WHATSAPP
          </span>
          <span className="hidden sm:inline-block text-[8px] text-[#D4AF62] tracking-widest font-sans uppercase -mt-0.5">
            VIP CONCIERGE
          </span>
        </div>
      </a>
    </aside>
  );
}
