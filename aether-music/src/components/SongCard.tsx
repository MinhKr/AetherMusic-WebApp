"use client";

import { usePlayer } from "@/context/PlayerContext";

interface Song {
  id: string;
  title: string;
  artist: string;
  song_url: string;
  image_url: string;
  genre: string;
}

export default function SongCard({ song }: { song: Song }) {
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
    <div
      className="group relative overflow-hidden rounded-xl bg-surface-container-low/40 p-5 backdrop-blur-xl outline outline-1 outline-white/10 transition-all duration-300 hover:scale-[1.02] hover:outline-primary/30 hover:shadow-[0_0_20px_rgba(188,135,254,0.1)]"
    >
      <div className="mb-4 aspect-square w-full overflow-hidden rounded-xl bg-surface-container">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={song.image_url || "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&q=80"}
          alt={song.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <h4 className="font-headline font-bold text-on-surface truncate">{song.title}</h4>
      <p className="text-sm text-on-surface-variant truncate">
        {song.artist}
      </p>
      <p className="font-label text-[10px] text-on-surface-variant/60 mt-1 uppercase tracking-widest text-primary/70">
        {song.genre}
      </p>
      
      {/* Play Button Overlay */}
      <button 
        onClick={handlePlay}
        className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-on-primary shadow-[0_0_15px_rgba(0,255,255,0.4)] transition-all ${isCurrent && isPlaying ? "opacity-100 scale-110" : "opacity-0 group-hover:opacity-100 group-hover:translate-y-2 translate-y-4"}`}
      >
        <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
          {isCurrent && isPlaying ? "pause" : "play_arrow"}
        </span>
      </button>
    </div>
  );
}
