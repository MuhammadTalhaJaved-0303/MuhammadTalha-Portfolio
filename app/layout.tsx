import type { Metadata, Viewport } from "next";
import { Geist, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Muhammad Talha Javed — AI Engineer",
  description:
    "Research-driven Computer Engineer building intelligent systems and AI applications. Focused on machine learning, data quality, and scalable solutions.",
  metadataBase: new URL("https://mtj-portfolio.vercel.app"),
  openGraph: {
    title: "Muhammad Talha Javed — AI Engineer",
    description:
      "Research-driven Computer Engineer building intelligent systems and AI applications.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#08080c",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${jetbrains.variable} ${instrumentSerif.variable} h-full`}
    >
      <body className="min-h-full antialiased selection:bg-[var(--color-neon-cyan)] selection:text-black">
        {children}
      </body>
    </html>
  );
}
