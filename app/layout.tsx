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
  title: "Muhammad Talha Javed — Freelance AI Engineer",
  description:
    "Freelance AI engineer helping startups and teams ship production AI products across EdTech, healthcare, and SaaS. Shipped aivico and skill2success. Stack: FastAPI, LangChain, AWS.",
  metadataBase: new URL("https://muhammad-talha-portfolio-pi.vercel.app"),
  keywords: [
    "Freelance AI engineer",
    "AI engineer for hire",
    "Python developer",
    "LangChain",
    "FastAPI",
    "RAG",
    "EdTech AI",
    "Healthcare AI",
    "SaaS AI",
    "Muhammad Talha Javed",
  ],
  openGraph: {
    title: "Muhammad Talha Javed — Freelance AI Engineer",
    description:
      "Shipping production AI products across EdTech (aivico, skill2success), healthcare, and SaaS. Available for freelance projects.",
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
