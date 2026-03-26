import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "MindGym — Visualize Your Success Before Experiencing It",
  description:
    "Guided visualization and meditation sessions for job interviews, presentations, athletic events, and more. Elite mental training for everyday performers.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${lora.variable} h-full`}>
      <body suppressHydrationWarning className="min-h-full flex flex-col font-[var(--font-inter)] antialiased bg-white text-[#0b1f1e]">
        {children}
      </body>
    </html>
  );
}
