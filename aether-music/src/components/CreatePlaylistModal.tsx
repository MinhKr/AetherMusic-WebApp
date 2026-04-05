"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface CreatePlaylistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreatePlaylistModal({ isOpen, onClose }: CreatePlaylistModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/playlists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
      });

      if (!response.ok) throw new Error('Failed to create playlist');

      setTitle("");
      setDescription("");
      onClose();
      router.refresh(); // Tải lại trang để thấy dữ liệu mới
    } catch (error) {
      console.error("Create playlist error:", error);
      alert("Error: Không thể tạo playlist.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div 
        className="w-full max-w-md overflow-hidden rounded-3xl bg-[#0e0c1f]/80 backdrop-blur-2xl outline outline-1 outline-white/20 shadow-[0_0_50px_rgba(188,135,254,0.15)] animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-headline text-2xl font-bold text-white tracking-tighter">New Playlist</h3>
            <button 
              onClick={onClose}
              className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors text-white/40 hover:text-white"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="font-label text-[10px] uppercase tracking-[0.2em] text-primary/70 font-bold ml-1">Playlist Title</label>
              <input
                autoFocus
                type="text"
                placeholder="Ví dụ: Lofi & Chill, Workout Hits..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-on-surface outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-white/20"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="font-label text-[10px] uppercase tracking-[0.2em] text-primary/70 font-bold ml-1">Description (Optional)</label>
              <textarea
                placeholder="Give your collection a vibe..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-on-surface outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-white/20 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !title.trim()}
              className={`w-full py-4 rounded-2xl font-headline font-bold text-sm tracking-widest uppercase transition-all shadow-lg ${
                isLoading || !title.trim()
                  ? "bg-white/5 text-white/20 cursor-not-allowed"
                  : "bg-primary text-on-primary hover:scale-[1.02] active:scale-95 shadow-[0_5px_20px_rgba(188,135,254,0.3)] hover:shadow-[0_10px_30px_rgba(188,135,254,0.4)]"
              }`}
            >
              {isLoading ? "Creating..." : "Create Playlist"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
