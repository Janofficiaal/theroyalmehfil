import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { RoyalAudioProvider } from "@/context/RoyalAudioContext";
import { BookingModalProvider } from "@/context/BookingModalContext";
import GlobalAudioControls from "@/components/audio/GlobalAudioControls";
import RoyalBookingModal from "@/components/ui/RoyalBookingModal";

const royalKudus = localFont({
  src: "../fonts/DreamKudos.ttf",
  variable: "--font-kudus",
  display: "swap",
  fallback: ["Cormorant Garamond", "serif"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://theroyalmehfil.co.uk"),
  title: "THE ROYAL MEHFIL — Luxury Event Management | UK",
  description:
    "Where Every Event Becomes a Grand Mehfil. THE ROYAL MEHFIL is a UK-based luxury event management company creating extraordinary celebrations, thoughtfully imagined and beautifully brought to life.",
  keywords: [
    "luxury event management",
    "UK wedding planner",
    "luxury weddings",
    "event decoration",
    "corporate events UK",
    "The Royal Mehfil",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "THE ROYAL MEHFIL — Where Every Event Becomes a Grand Mehfil",
    description:
      "Extraordinary celebrations, thoughtfully imagined and beautifully brought to life.",
    url: "https://theroyalmehfil.co.uk",
    siteName: "THE ROYAL MEHFIL",
    type: "website",
    locale: "en_GB",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${royalKudus.variable} ${cormorant.variable} ${dmSans.variable} antialiased`}
    >
      <body className="min-h-screen bg-deep-black text-ivory">
        <RoyalAudioProvider>
          <BookingModalProvider>
            {children}
            <GlobalAudioControls />
            <RoyalBookingModal />
          </BookingModalProvider>
        </RoyalAudioProvider>
      </body>
    </html>
  );
}
