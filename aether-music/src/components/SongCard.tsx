"use client";

import { usePlayer } from "@/context/PlayerContext";
import { useLikedSongs } from "@/context/LikedSongsContext";
import { usePlaylists } from "@/context/PlaylistContext";
import { useState, useRef, useEffect } from "react";

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
  const { likedSongs, toggleLike } = useLikedSongs();
  const { playlists, addToPlaylist } = usePlaylists();
  
  const [showPlaylistMenu, setShowPlaylistMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const isLiked = likedSongs.has(song.id);
  
  const isCurrent = activeSong?.id === song.id;

  const handlePlay = () => {
    if (isCurrent) {
      if (isPlaying) pauseSong();
      else resumeSong();
    } else {
      playSong(song);
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowPlaylistMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAddToPlaylist = async (playlistId: string) => {
    const success = await addToPlaylist(playlistId, song.id);
    if (success) {
      setShowPlaylistMenu(false);
      // Optional: Show a toast/feedback
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

      {/* Like Button Wrapper Overlay */}
      <button 
        onClick={(e) => { e.stopPropagation(); toggleLike(song.id); }}
        className={`absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 backdrop-blur-md text-on-surface hover:text-primary transition-all z-10 ${isLiked ? "opacity-100 text-primary scale-110 shadow-[0_0_15px_rgba(188,135,254,0.3)]" : "opacity-0 group-hover:opacity-100 group-hover:translate-y-1 translate-y-2"}`}
      >
        <span className={`material-symbols-outlined text-lg ${isLiked ? "text-primary" : ""}`} style={{ fontVariationSettings: isLiked ? "'FILL' 1" : "'FILL' 0" }}>
          favorite
        </span>
      </button>

      {/* Playlist Menu Button */}
      <div className="absolute left-14 top-4 z-10" ref={menuRef}>
        <button 
          onClick={(e) => { e.stopPropagation(); setShowPlaylistMenu(!showPlaylistMenu); }}
          className={`flex h-8 w-8 items-center justify-center rounded-full bg-black/40 backdrop-blur-md text-on-surface hover:text-secondary transition-all ${showPlaylistMenu ? "opacity-100 text-secondary scale-110" : "opacity-0 group-hover:opacity-100 group-hover:translate-y-1 translate-y-2"}`}
        >
          <span className="material-symbols-outlined text-lg">playlist_add</span>
        </button>

        {showPlaylistMenu && (
          <div className="absolute left-0 mt-2 w-48 overflow-hidden rounded-2xl bg-[#1a1631]/95 backdrop-blur-xl border border-white/10 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="p-2 border-b border-white/5 bg-white/5">
              <span className="px-3 py-1 font-label text-[9px] uppercase tracking-widest text-white/40 block">Add to Playlist</span>
            </div>
            <div className="max-h-40 overflow-y-auto scrollbar-hide py-1">
              {playlists.length > 0 ? (
                playlists.map((playlist) => (
                  <button
                    key={playlist.id}
                    onClick={(e) => { e.stopPropagation(); handleAddToPlaylist(playlist.id); }}
                    className="w-full text-left px-4 py-2 text-xs text-white/70 hover:bg-white/10 hover:text-secondary transition-colors"
                  >
                    {playlist.title}
                  </button>
                ))
              ) : (
                <div className="px-4 py-3 text-[10px] text-white/30 italic">No playlists found. Create one in Library!</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
