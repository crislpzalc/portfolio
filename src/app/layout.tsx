import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Instrument_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Cristina López Alcázar | AI for Healthcare",
  description:
    "Portfolio of Cristina López Alcázar. Computer Science & Business student at UC3M, focused on applying machine learning to real-world healthcare problems.",
  openGraph: {
    title: "Cristina López Alcázar | AI for Healthcare",
    description:
      "Computer Science & Business student at UC3M. Building reproducible ML for clinical impact.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${instrumentSerif.variable} antialiased`}
    >
      <body className="font-sans">{children}</body>
    </html>
  );
}
