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
    <footer className="futuristic-player">
      {/* Left: Track info */}
      <div className="flex w-[28%] items-center gap-5">
        <div className="relative group">
          <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-primary to-secondary blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-700 animate-pulse" />
          <div className="relative h-16 w-16 overflow-hidden rounded-full border border-white/20 bg-surface-container shadow-2xl animate-spin-slow">
             <img 
               src={activeSong.image_url} 
               alt={activeSong.title} 
               className="h-full w-full object-cover"
             />
          </div>
        </div>
        <div className="flex flex-col overflow-hidden">
          <h4 className="font-headline text-base font-bold tracking-tight text-white truncate max-w-[180px] drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
            {activeSong.title}
          </h4>
          <p className="font-label text-xs font-bold uppercase tracking-[0.2em] text-primary-dim truncate max-w-[180px]">
            {activeSong.artist}
          </p>
        </div>
      </div>

      {/* Center: Controls */}
      <div className="relative flex max-w-xl flex-1 flex-col items-center gap-1.5 h-full justify-center">
        {/* Playback buttons */}
        <div className="z-10 flex items-center gap-8">
          <button className="text-on-surface-variant/40 transition-all duration-300 hover:text-white hover:scale-110">
            <span className="material-symbols-outlined text-lg">shuffle</span>
          </button>
          <button className="text-on-surface-variant/60 transition-all duration-300 hover:text-primary hover:scale-110">
            <span className="material-symbols-outlined text-3xl">skip_previous</span>
          </button>
          
          <button
            onClick={isPlaying ? pauseSong : resumeSong}
            className="glowing-orb"
          >
            <span
              className="material-symbols-outlined text-3xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              {isPlaying ? "pause" : "play_arrow"}
            </span>
          </button>
          
          <button className="text-on-surface-variant/60 transition-all duration-300 hover:text-primary hover:scale-110">
            <span className="material-symbols-outlined text-3xl">skip_next</span>
          </button>
          <button className="text-on-surface-variant/40 transition-all duration-300 hover:text-white hover:scale-110">
            <span className="material-symbols-outlined text-lg">repeat</span>
          </button>
        </div>

        {/* Progress bar */}
        <div className="flex w-full items-center gap-4 px-2">
          <span className="font-label text-[10px] font-bold text-on-surface-variant/60 w-8 tabular-nums">{formatTime(currentTime)}</span>
          <div className="relative flex-1 group">
             <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className="h-1 w-full flex-1 cursor-pointer appearance-none rounded-full bg-white/5 accent-primary transition-all duration-300 hover:h-1.5"
                style={{
                  background: `linear-gradient(to right, #00ffff ${(currentTime / (duration || 1)) * 100}%, rgba(255,255,255,0.05) ${(currentTime / (duration || 1)) * 100}%)`,
                }}
              />
          </div>
          <span className="font-label text-[10px] font-bold text-on-surface-variant/60 w-8 tabular-nums">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Right: Volume & Audio Visualizer */}
      <div className="flex w-[28%] items-center justify-end gap-10">
        {/* Spectrum visualizer (dummy for vibe) */}
        <div className="flex items-end gap-1 h-6">
          {SPECTRUM_DELAYS.map((delay, index) => (
            <div 
              key={index} 
              className={`spectrum-bar ${isPlaying ? "opacity-100" : "opacity-20 !h-1"}`} 
              style={{ 
                animationDelay: `${delay}s`,
                height: isPlaying ? undefined : '4px'
              }} 
            />
          ))}
        </div>

        <div className="group flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined text-lg text-on-surface-variant group-hover:text-primary transition-colors">
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
