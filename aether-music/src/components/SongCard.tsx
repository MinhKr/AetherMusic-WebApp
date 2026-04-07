"use client";

import { usePlayer } from "@/context/PlayerContext";
import { useLikedSongs } from "@/context/LikedSongsContext";
import { usePlaylists } from "@/context/PlaylistContext";
import { useToast } from "@/context/ToastContext";
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
  const { showToast } = useToast();
  
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowPlaylistMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggleLike = () => {
    const willLike = !isLiked;
    toggleLike(song.id);
    if (willLike) {
      showToast(`"${song.title}" added to Liked Songs`, "success", "favorite");
    } else {
      showToast(`"${song.title}" removed from Liked Songs`, "info", "heart_minus");
    }
  };

  const handleAddToPlaylist = async (playlistId: string) => {
    const playlist = playlists.find((p) => p.id === playlistId);
    const success = await addToPlaylist(playlistId, song.id);
    if (success) {
      setShowPlaylistMenu(false);
      showToast(`Added to "${playlist?.title ?? "Collection"}" ✓`, "success", "playlist_add_check");
    } else {
      showToast("Failed to add to collection.", "error");
    }
  };

  return (
    <div
      className="group relative flex flex-col items-center gap-4 rounded-3xl bg-surface-container-low/20 p-6 backdrop-blur-2xl ghost-border transition-all duration-700 hover:bg-surface-container-low/40 hover:scale-[1.03] hover:shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_20px_rgba(188,135,254,0.1)]"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-surface-variant/40">
        <img
          src={song.image_url || "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&q=80"}
          alt={song.title}
          className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />

        {/* Play Overlay (Floating on hover) */}
        <div className={`absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] transition-all duration-500 ${isCurrent && isPlaying ? "opacity-100" : "opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0"}`}>
            <button
                onClick={handlePlay}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-on-primary-fixed shadow-[0_0_25px_#00ffff] transition-transform active:scale-95"
            >
                <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                {isCurrent && isPlaying ? "pause" : "play_arrow"}
                </span>
            </button>
        </div>
      </div>

      {/* Top actions (Like / Playlist) — outside overflow-hidden to prevent clipping */}
      <div className={`absolute top-10 left-6 right-6 flex justify-between px-4 transition-all duration-500 z-20 ${isLiked ? "opacity-100" : "opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0"}`}>
           <button
              onClick={(e) => { e.stopPropagation(); handleToggleLike(); }}
              className={`flex h-10 w-10 items-center justify-center rounded-full bg-surface-container-low/60 backdrop-blur-md outline outline-1 group/like transition-all ${isLiked ? "outline-primary/50 text-error shadow-[0_0_15px_rgba(255,110,132,0.3)]" : "outline-white/10 text-on-surface-variant hover:text-primary hover:outline-primary/30"}`}
          >
              <span className={`material-symbols-outlined text-xl ${isLiked ? "scale-110" : "scale-100"}`} style={{ fontVariationSettings: isLiked ? "'FILL' 1" : "'FILL' 0" }}>
                favorite
              </span>
          </button>
          <div className="relative" ref={menuRef}>
              <button
              onClick={(e) => { e.stopPropagation(); setShowPlaylistMenu(!showPlaylistMenu); }}
              className={`flex h-10 w-10 items-center justify-center rounded-full bg-surface-container-low/60 backdrop-blur-md outline outline-1 outline-white/10 text-on-surface-variant hover:text-secondary hover:outline-secondary/30 transition-all ${showPlaylistMenu ? "bg-white/10 text-secondary" : ""}`}
              >
              <span className="material-symbols-outlined text-xl">playlist_add</span>
              </button>

              {showPlaylistMenu && (
                  <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-2xl bg-surface-container-highest/95 backdrop-blur-3xl border border-white/10 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-300">
                      <div className="p-4 border-b border-white/5">
                      <span className="font-label text-[10px] uppercase font-bold tracking-[0.3em] text-on-surface-variant/60">Add to Collection</span>
                      </div>
                      <div className="max-h-52 overflow-y-auto no-scrollbar py-2">
                      {playlists.length > 0 ? (
                          playlists.map((playlist) => (
                          <button
                              key={playlist.id}
                              onClick={(e) => { e.stopPropagation(); handleAddToPlaylist(playlist.id); }}
                              className="w-full text-left px-5 py-3 text-xs font-bold font-headline text-on-surface/70 hover:bg-white/5 hover:text-secondary transition-all"
                          >
                              {playlist.title}
                          </button>
                          ))
                      ) : (
                          <div className="px-5 py-4 text-[11px] text-on-surface-variant/40 italic">No habitats found. Orbit to Library!</div>
                      )}
                      </div>
                  </div>
              )}
          </div>
      </div>

      <div className="w-full text-center">
        <h4 className="font-headline text-lg font-bold text-on-surface truncate group-hover:text-primary transition-colors duration-500">
          {song.title}
        </h4>
        <div className="mt-1 flex items-center justify-center gap-2">
            <div className="h-[1px] w-4 bg-white/10 group-hover:w-6 transition-all duration-700" />
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-on-surface-variant/60 truncate max-w-[120px]">
                {song.artist}
            </p>
            <div className="h-[1px] w-4 bg-white/10 group-hover:w-6 transition-all duration-700" />
        </div>
        <p className="font-label text-[9px] uppercase font-bold tracking-[0.2em] text-primary/40 mt-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
          {song.genre}
        </p>
      </div>
    </div>
  );
}
