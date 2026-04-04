"use client";

import React, { createContext, useContext, useState, useRef, useEffect } from "react";

interface Song {
  id: string;
  title: string;
  artist: string;
  song_url: string;
  image_url: string;
  genre: string;
}

interface PlayerContextType {
  activeSong: Song | null;
  isPlaying: boolean;
  playSong: (song: Song) => void;
  pauseSong: () => void;
  resumeSong: () => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [activeSong, setActiveSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playSong = (song: Song) => {
    setActiveSong(song);
    setIsPlaying(true);
  };

  const pauseSong = () => {
    setIsPlaying(false);
    audioRef.current?.pause();
  };

  const resumeSong = () => {
    setIsPlaying(true);
    audioRef.current?.play();
  };

  useEffect(() => {
    if (activeSong && isPlaying) {
      audioRef.current?.play().catch((err) => console.log("Playback error:", err));
    } else {
      audioRef.current?.pause();
    }
  }, [activeSong, isPlaying]);

  return (
    <PlayerContext.Provider value={{ activeSong, isPlaying, playSong, pauseSong, resumeSong, audioRef }}>
      {children}
      <audio ref={audioRef} src={activeSong?.song_url} onEnded={() => setIsPlaying(false)} />
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
}
