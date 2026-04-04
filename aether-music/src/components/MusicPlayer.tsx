"use client";

import { usePlayer } from "@/context/PlayerContext";
import { useEffect, useState } from "react";

const SPECTRUM_DELAYS = [0.1, 0.3, 0.2, 0.5, 0.4, 0.6, 0.15, 0.35];

export default function MusicPlayer() {
  const { activeSong, isPlaying, pauseSong, resumeSong, audioRef } = usePlayer();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);

  // Cập nhật thanh tiến trình theo thời gian thực
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [audioRef]);

  // Xử lý thay đổi âm lượng
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume, audioRef]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  if (!activeSong) return null;

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between bg-surface-container-low/80 p-4 backdrop-blur-2xl border-t border-white/5 px-8">
      {/* Left: Track info */}
      <div className="flex w-[30%] items-center gap-5">
        <div className="relative group">
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary to-secondary blur opacity-25" />
          <div className="relative h-14 w-14 overflow-hidden rounded-2xl border border-white/10 bg-surface-container shadow-xl">
             <img 
               src={activeSong.image_url} 
               alt={activeSong.title} 
               className="h-full w-full object-cover"
             />
          </div>
        </div>
        <div className="flex flex-col">
          <h4 className="font-headline text-sm font-bold tracking-tight text-white truncate max-w-[200px]">
            {activeSong.title}
          </h4>
          <p className="font-label text-[10px] font-medium uppercase tracking-widest text-primary-dim/70 truncate max-w-[200px]">
            {activeSong.artist}
          </p>
        </div>
      </div>

      {/* Center: Controls */}
      <div className="relative flex max-w-xl flex-1 flex-col items-center gap-2">
        {/* Playback buttons */}
        <div className="z-10 flex items-center gap-8">
          <button className="text-white/40 transition-colors hover:text-white">
            <span className="material-symbols-outlined text-xl">shuffle</span>
          </button>
          <button className="text-white/80 transition-colors hover:text-primary">
            <span className="material-symbols-outlined text-3xl">skip_previous</span>
          </button>
          <button
            onClick={isPlaying ? pauseSong : resumeSong}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-transform active:scale-90"
          >
            <span
              className="material-symbols-outlined text-3xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              {isPlaying ? "pause" : "play_arrow"}
            </span>
          </button>
          <button className="text-white/80 transition-colors hover:text-primary">
            <span className="material-symbols-outlined text-3xl">skip_next</span>
          </button>
          <button className="text-white/40 transition-colors hover:text-white">
            <span className="material-symbols-outlined text-xl">repeat</span>
          </button>
        </div>

        {/* Progress bar */}
        <div className="flex w-full items-center gap-4 px-4">
          <span className="font-label text-[10px] font-bold text-white/30 w-8">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="h-1 flex-1 cursor-pointer appearance-none rounded-full bg-white/10 accent-primary"
          />
          <span className="font-label text-[10px] font-bold text-white/30 w-8">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Right: Volume & extras */}
      <div className="flex w-[30%] items-center justify-end gap-6">
        <div className="group flex items-center gap-3 rounded-full border border-white/5 bg-white/5 px-4 py-2">
          <span className="material-symbols-outlined text-xl text-white/40 group-hover:text-primary">
            {volume === 0 ? "volume_off" : volume < 0.5 ? "volume_down" : "volume_up"}
          </span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="h-1 w-20 cursor-pointer appearance-none rounded-full bg-white/10 accent-primary"
          />
        </div>
      </div>
    </footer>
  );
}
