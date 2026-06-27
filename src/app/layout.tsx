import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cristina López Alcázar — AI for Healthcare",
  description:
    "Computer Engineering & Business Administration. Building AI systems that bridge research and clinical impact.",
  openGraph: {
    title: "Cristina López Alcázar — AI for Healthcare",
    description:
      "Computer Engineering & Business Administration. Building AI systems that bridge research and clinical impact.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
