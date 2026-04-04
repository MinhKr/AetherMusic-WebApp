"use client";

import { usePlayer } from "@/context/PlayerContext";

export default function HeroPlayButton({ song }: { song: any }) {
  const { playSong, activeSong, isPlaying, pauseSong, resumeSong } = usePlayer();
  
  const isCurrent = activeSong?.id === song.id;

  const handlePlay = () => {
    if (isCurrent) {
      if (isPlaying) pauseSong();
      else resumeSong();
    } else {
      playSong(song);
    }
  };

  return (
    <button
      onClick={handlePlay}
      className="flex items-center gap-2 rounded-full bg-primary-container px-8 py-4 font-headline font-bold text-on-primary-fixed transition-all hover:shadow-[0_0_20px_rgba(0,255,255,0.5)] active:scale-95"
    >
      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
        {isCurrent && isPlaying ? "pause" : "play_arrow"}
      </span>
      {isCurrent && isPlaying ? "PAUSE NOW" : "LISTEN NOW"}
    </button>
  );
}
