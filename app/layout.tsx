import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { Navigation } from "@/components/navigation/Navigation";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Md. Jahidul Islam — FULL STACK SOFTWARE ENGINEER(AI)",
    template: "%s — Md. Jahidul Islam",
  },
  description: site.description,
  keywords: [
    "FULL STACK SOFTWARE ENGINEER(AI)",
    "Md. Jahidul Islam",
    "Machine Learning",
    "Product Engineer",
    "Full-Stack",
    "LLM",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    title: "Md. Jahidul Islam — FULL STACK SOFTWARE ENGINEER(AI)",
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Md. Jahidul Islam — FULL STACK SOFTWARE ENGINEER(AI)",
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#060608",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable}`}>
      <body>
        <Navigation />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
