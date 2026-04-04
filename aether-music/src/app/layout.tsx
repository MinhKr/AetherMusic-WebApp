import type { Metadata } from "next";
import { Space_Grotesk, Manrope } from "next/font/google";
import "./globals.css";
import { auth } from "@/auth";
import Sidebar from "@/components/Sidebar";
import MusicPlayer from "@/components/MusicPlayer";
import { PlayerProvider } from "@/context/PlayerContext";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SONIC — Celestial Conductor",
  description: "Aether Music — Your ethereal sonic experience",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" className="dark">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${manrope.variable} selection:bg-primary-container selection:text-on-primary-container`}
        style={{ fontFamily: "var(--font-manrope), Manrope, sans-serif" }}
      >
        <PlayerProvider>
          {/* Show shell if we're not on login page */}
          {/* For now, just show it normally since we want full independent app behavior */}
          <div className="flex bg-surface-dim min-h-screen text-on-surface">
            <Sidebar user={session?.user} />
            <div className="flex-1 ml-72">
              {children}
            </div>
            <MusicPlayer />
          </div>
        </PlayerProvider>
      </body>
    </html>
  );
}
