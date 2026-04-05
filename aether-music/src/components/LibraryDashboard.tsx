"use client";

import React, { useState } from "react";
import Link from "next/link";
import CreatePlaylistModal from "./CreatePlaylistModal";

interface Playlist {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
}

interface LibraryDashboardProps {
  likedSongsCount: number;
  playlists: Playlist[];
}

export default function LibraryDashboard({ likedSongsCount, playlists }: LibraryDashboardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="px-8 mt-12 animate-in fade-in zoom-in-95 duration-500">
        <h2 className="text-3xl font-headline font-bold mb-8 text-on-surface tracking-tighter">Your Library</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 text-on-surface">
          {/* Liked Songs Collection Card */}
          <Link href="/library?view=liked" className="group relative overflow-hidden rounded-3xl bg-surface-container-low/40 p-8 h-80 flex flex-col justify-end backdrop-blur-xl outline outline-1 outline-white/10 transition-all duration-500 hover:scale-[1.02] hover:outline-primary/40 hover:shadow-[0_20px_40px_rgba(188,135,254,0.15)]">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-10 transition-opacity" />
            
            <div className="mb-4 h-16 w-16 rounded-2xl bg-surface-container flex items-center justify-center text-primary shadow-lg group-hover:bg-primary group-hover:text-white transition-all duration-500">
              <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
            </div>
            
            <h3 className="text-2xl font-headline font-bold text-white mb-1">Liked Songs</h3>
            <p className="text-sm text-white/50">{likedSongsCount} bài hát đã lưu</p>
          </Link>

          {/* User Created Playlists */}
          {playlists.map((playlist) => (
            <Link 
              key={playlist.id}
              href={`/library?view=playlist&id=${playlist.id}`} 
              className="group relative overflow-hidden rounded-3xl bg-surface-container-low/40 p-8 h-80 flex flex-col justify-end backdrop-blur-xl outline outline-1 outline-white/10 transition-all duration-500 hover:scale-[1.02] hover:outline-secondary/40 hover:shadow-[0_20px_40px_rgba(0,255,255,0.1)]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent opacity-0 group-hover:opacity-10 transition-opacity" />
              
              <div className="mb-4 h-16 w-16 rounded-2xl bg-surface-container flex items-center justify-center text-secondary shadow-lg group-hover:bg-secondary group-hover:text-white transition-all duration-500">
                <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>library_music</span>
              </div>
              
              <h3 className="text-2xl font-headline font-bold text-white mb-1 truncate">{playlist.title}</h3>
              <p className="text-sm text-white/50 truncate">{playlist.description || "Custom Playlist"}</p>
            </Link>
          ))}

          {/* Add New Album Placeholder Card */}
          <div 
            onClick={() => setIsModalOpen(true)}
            className="group relative overflow-hidden rounded-3xl border-2 border-dashed border-white/5 bg-transparent p-8 h-80 flex flex-col items-center justify-center text-on-surface-variant/40 hover:text-primary hover:border-primary/40 hover:bg-white/5 transition-all duration-500 cursor-pointer"
          >
            <div className="h-16 w-16 rounded-full border-2 border-dashed border-current flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
              <span className="material-symbols-outlined text-4xl">add_circle</span>
            </div>
            <p className="font-label text-xs font-bold uppercase tracking-[0.2em]">Add Album</p>
          </div>
        </div>
      </section>

      <CreatePlaylistModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}
