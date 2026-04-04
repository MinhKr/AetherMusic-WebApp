"use client";

import { useState } from "react";

const SPECTRUM_DELAYS = [0.1, 0.3, 0.2, 0.5, 0.4, 0.6, 0.15, 0.35];

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  return (
    <footer className="futuristic-player">
      {/* Left: Track info */}
      <div className="flex items-center gap-5">
        <div className="relative group">
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary to-secondary blur opacity-25 transition duration-1000 group-hover:opacity-50" />
          <div className="relative h-16 w-16 overflow-hidden rounded-2xl border border-white/10 bg-surface-container">
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
              <span className="material-symbols-outlined text-primary/50 text-3xl">music_note</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <h4 className="font-headline text-base font-bold tracking-tight text-white">
            Shattered Glass
          </h4>
          <p className="font-label text-xs font-medium uppercase tracking-widest text-primary-dim/70">
            Neon Ether
          </p>
        </div>
        <button
          onClick={() => setIsFavorited(!isFavorited)}
          className="ml-2 rounded-full p-2 text-white/40 transition-all hover:bg-white/5 hover:text-red-400"
        >
          <span
            className="material-symbols-outlined text-xl"
            style={isFavorited ? { fontVariationSettings: "'FILL' 1" } : undefined}
          >
            favorite
          </span>
        </button>
      </div>

      {/* Center: Controls */}
      <div className="relative flex max-w-md flex-1 flex-col items-center gap-3">
        {/* Spectrum visualizer */}
        <div className="absolute -top-4 flex items-end gap-1 opacity-20">
          {SPECTRUM_DELAYS.map((delay, i) => (
            <div
              key={i}
              className="spectrum-bar"
              style={{ animationDelay: `${delay}s` }}
            />
          ))}
        </div>

        {/* Playback buttons */}
        <div className="z-10 flex items-center gap-8">
          <button className="text-white/40 transition-colors hover:text-white">
            <span className="material-symbols-outlined">shuffle</span>
          </button>
          <button className="text-white/80 transition-colors hover:text-primary">
            <span className="material-symbols-outlined text-3xl">skip_previous</span>
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="glowing-orb"
          >
            <span
              className="material-symbols-outlined text-4xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              {isPlaying ? "pause" : "play_arrow"}
            </span>
          </button>
          <button className="text-white/80 transition-colors hover:text-primary">
            <span className="material-symbols-outlined text-3xl">skip_next</span>
          </button>
          <button className="text-white/40 transition-colors hover:text-white">
            <span className="material-symbols-outlined">repeat</span>
          </button>
        </div>

        {/* Progress bar */}
        <div className="flex w-full items-center gap-4 px-4">
          <span className="font-label text-[10px] font-bold text-white/30">01:24</span>
          <div className="group relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/5">
            <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-[100%]" />
            <div className="absolute left-0 top-0 h-full w-1/3 rounded-full bg-gradient-to-r from-primary to-secondary shadow-[0_0_10px_rgba(0,255,255,0.5)]" />
          </div>
          <span className="font-label text-[10px] font-bold text-white/30">03:45</span>
        </div>
      </div>

      {/* Right: Volume & extras */}
      <div className="flex items-center gap-6">
        <div className="group flex items-center gap-3 rounded-full border border-white/5 bg-white/5 px-4 py-2">
          <span className="material-symbols-outlined text-xl text-white/40 group-hover:text-primary">
            volume_up
          </span>
          <div className="relative h-1 w-20 rounded-full bg-white/10">
            <div className="absolute left-0 top-0 h-full w-3/4 rounded-full bg-primary/80" />
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex h-10 w-10 items-center justify-center rounded-full text-white/60 transition-all hover:bg-white/10 hover:text-primary">
            <span className="material-symbols-outlined">queue_music</span>
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-full text-white/60 transition-all hover:bg-white/10 hover:text-primary">
            <span className="material-symbols-outlined">devices</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
