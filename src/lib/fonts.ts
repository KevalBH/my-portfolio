import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
  preload: false,
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
  preload: false,
});

const display = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  style: "normal",
  variable: "--font-display",
  display: "swap",
  preload: false,
});

export const fontVariableClassName = `${geist.variable} ${geistMono.variable} ${display.variable}`;
