import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import PageLoader from "@/components/PageLoader";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Products | Essae Digitronics – Precision Weighing & Measurement Solutions",
  description:
    "Explore Essae Digitronics' complete range of precision weighing scales, industrial weighbridges, retail POS systems, milk analysers, GPS clocks, and crane scales for every industry.",
  keywords: [
    "weighing scales",
    "industrial scales",
    "weighbridge",
    "POS system",
    "milk analyser",
    "GPS clock",
    "Essae Digitronics",
  ],
  openGraph: {
    title: "Products | Essae Digitronics",
    description: "Precision weighing and measurement solutions for every industry.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`} data-scroll-behavior="smooth">
      <body className="min-h-screen antialiased">
        <PageLoader />
        {children}
      </body>
    </html>
  );
}
