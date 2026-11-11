import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

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
  openGraph: {
    title: "THE ROYAL MEHFIL — Where Every Event Becomes a Grand Mehfil",
    description:
      "Extraordinary celebrations, thoughtfully imagined and beautifully brought to life.",
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
      className={`${cormorant.variable} ${dmSans.variable} antialiased`}
    >
      <body className="min-h-screen bg-deep-black text-ivory">{children}</body>
    </html>
  );
}
