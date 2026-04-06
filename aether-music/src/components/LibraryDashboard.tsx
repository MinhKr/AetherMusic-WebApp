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
      <section className="px-12 mt-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 relative">
        {/* Background Decorative Glow */}
        <div className="absolute -left-20 top-0 h-96 w-96 rounded-full bg-primary/5 blur-[150px] pointer-events-none" />
        
        <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-headline font-bold tracking-tighter flex items-center gap-4">
                Your Collection
                <span className="h-[2px] w-24 bg-gradient-to-r from-primary/60 to-transparent" />
            </h2>
            <button 
                onClick={() => setIsModalOpen(true)}
                className="group flex items-center gap-3 px-6 py-3 rounded-2xl glass-panel ghost-border text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant hover:text-primary hover:border-primary/40 transition-all duration-300"
            >
                <span className="material-symbols-outlined text-sm group-hover:rotate-90 transition-transform duration-500">add</span>
                Initialize Archive
            </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 text-on-surface">
          {/* Liked Songs Collection Card (Large/Featured) */}
          <Link href="/library?view=liked" className="col-span-1 sm:col-span-2 group relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-primary/10 to-transparent p-12 h-96 flex flex-col justify-between backdrop-blur-3xl ghost-border transition-all duration-700 hover:scale-[1.02] hover:shadow-[0_40px_80px_rgba(0,0,0,0.5),0_0_30px_rgba(0,255,255,0.1)]">
            <div className="absolute inset-0 bg-surface-container-low/40 mix-blend-overlay" />
            
            <div className="relative z-10 flex justify-between items-start">
                <div className="h-20 w-20 rounded-3xl bg-primary text-[#0e0c1f] flex items-center justify-center shadow-[0_0_30px_#00ffff] group-hover:scale-110 transition-transform duration-700">
                    <span className="material-symbols-outlined text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                </div>
                <span className="material-symbols-outlined text-white/10 text-7xl group-hover:text-primary/10 transition-colors duration-700">shutter_speed</span>
            </div>
            
            <div className="relative z-10">
                <p className="font-label text-[10px] font-bold uppercase tracking-[0.4em] text-primary mb-4">Frequency Archive</p>
                <h3 className="text-editorial-md text-white mb-2 leading-none">Liked Songs</h3>
                <p className="text-sm font-label text-on-surface-variant/60 font-bold tracking-widest uppercase italic">{likedSongsCount} CAPTURED TRACKS</p>
            </div>
          </Link>

          {/* User Created Playlists */}
          {playlists.map((playlist) => (
            <Link 
              key={playlist.id}
              href={`/library?view=playlist&id=${playlist.id}`} 
              className="group relative overflow-hidden rounded-[3rem] bg-surface-container-low/20 p-10 h-96 flex flex-col justify-between backdrop-blur-2xl ghost-border transition-all duration-700 hover:scale-[1.02] hover:bg-surface-container-low/40 hover:shadow-[0_30px_60px_rgba(0,0,0,0.4)]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative z-10 flex h-16 w-16 rounded-2xl bg-white/5 items-center justify-center text-secondary border border-white/10 shadow-lg group-hover:bg-secondary group-hover:text-white group-hover:border-secondary transition-all duration-700">
                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>library_music</span>
              </div>
              
              <div className="relative z-10">
                <p className="font-label text-[9px] font-bold uppercase tracking-[0.3em] text-secondary/60 mb-2">Habitat Module</p>
                <h3 className="text-2xl font-headline font-bold text-white mb-2 truncate group-hover:text-secondary transition-colors">{playlist.title}</h3>
                <p className="text-[11px] font-body text-on-surface-variant/60 truncate leading-relaxed">
                    {playlist.description || "Captured resonance collection."}
                </p>
              </div>
            </Link>
          ))}

          {/* Add New Album Placeholder Card (Asymmetrical variation) */}
          <div 
            onClick={() => setIsModalOpen(true)}
            className="group relative overflow-hidden rounded-[3rem] bg-white/5 border-2 border-dashed border-white/5 p-10 h-96 flex flex-col items-center justify-center text-on-surface-variant/30 hover:text-primary hover:border-primary/40 hover:bg-white/10 transition-all duration-700 cursor-pointer"
          >
            <div className="relative mb-6">
                <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative h-20 w-20 rounded-full border-2 border-dashed border-current flex items-center justify-center transition-transform group-hover:scale-110 duration-700">
                    <span className="material-symbols-outlined text-4xl">add</span>
                </div>
            </div>
            <p className="font-headline text-lg font-bold uppercase tracking-[0.3em] mb-1">New Habitat</p>
            <p className="font-label text-[9px] uppercase tracking-widest opacity-60">Expand Nebula</p>
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
