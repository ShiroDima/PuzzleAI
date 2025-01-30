import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import GameProvider from "@/lib/GameContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Word Puzzle",
  description: "Word Puzzle to provide children a fun way to learn english",
};

export default function RootLayout({
  children,
}: {children: ReactNode}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex place-content-center`}
      >
        <GameProvider>
          {children}
        </GameProvider>
      </body>
    </html>
  );
}
