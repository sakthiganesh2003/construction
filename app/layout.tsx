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
  title: "Veera Blue Metals – Heavy Weighbridges & Quarry Weighing Solutions",
  description:
    "Veera Blue Metals provides precision steel & concrete weighbridges, weigh pads, weigh-in-motion systems, and industrial weighing solutions for quarries, mining, and heavy construction.",
  keywords: [
    "Veera Blue Metals",
    "weighbridge",
    "quarry weighing",
    "stone crusher scale",
    "steel weighbridge",
    "concrete weighbridge",
    "industrial weighing",
  ],
  openGraph: {
    title: "Veera Blue Metals",
    description: "Heavy Weighbridges & Industrial Quarry Weighing Solutions.",
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
