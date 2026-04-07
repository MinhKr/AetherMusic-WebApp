"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/context/ToastContext";

interface CreatePlaylistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreatePlaylistModal({ isOpen, onClose }: CreatePlaylistModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { showToast } = useToast();

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

      showToast(`Habitat "${title}" established!`, "success", "hub");
      setTitle("");
      setDescription("");
      onClose();
      router.refresh();
    } catch (error) {
      console.error("Create playlist error:", error);
      showToast("Error: Could not establish habitat.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0e0c1f]/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg overflow-hidden rounded-[40px] glass-panel-elevated ghost-border shadow-2xl z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Decorative element */}
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-[100px] pointer-events-none" />
            
            <div className="relative p-12">
              <header className="flex items-start justify-between mb-12">
                <div>
                    <span className="font-label text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-2 block">Archive Module</span>
                    <h3 className="text-4xl font-headline font-black tracking-tighter text-white">Initialize Habitat</h3>
                </div>
                <button 
                  onClick={onClose}
                  className="h-12 w-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white/40 hover:text-white"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </header>

              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="space-y-4">
                  <label className="font-label text-[10px] uppercase tracking-[0.4em] text-on-surface-variant font-bold ml-2">Habitat ID (Title)</label>
                  <input
                    autoFocus
                    type="text"
                    placeholder="E.g. NEON_DREAMS_VOL_1"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-xl font-headline font-bold text-white outline-none focus:border-primary/50 focus:bg-white/10 transition-all placeholder:text-white/10"
                    required
                  />
                </div>

                <div className="space-y-4">
                  <label className="font-label text-[10px] uppercase tracking-[0.4em] text-on-surface-variant font-bold ml-2">Resonance Directive (Description)</label>
                  <textarea
                    placeholder="Define the sonic coordinates of this habitat..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-[2rem] px-6 py-5 text-lg font-body text-white/80 outline-none focus:border-primary/50 focus:bg-white/10 transition-all placeholder:text-white/10 resize-none leading-relaxed"
                  />
                </div>

                <footer className="pt-6">
                    <button
                        type="submit"
                        disabled={isLoading || !title.trim()}
                        className="group relative w-full overflow-hidden rounded-full py-6 transition-all duration-500 hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                    >
                        <div className="absolute inset-0 bg-primary shadow-[0_0_30px_rgba(0,255,255,0.4)] group-hover:shadow-[0_0_50px_rgba(0,255,255,0.6)] transition-all duration-500" />
                        <div className="relative z-10 flex items-center justify-center gap-4 font-headline text-lg font-black tracking-[0.4em] text-[#0e0c1f] uppercase">
                            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>hub</span>
                            {isLoading ? "CALIBRATING..." : "ESTABLISH HABITAT"}
                        </div>
                    </button>
                    <p className="text-center mt-6 font-label text-[9px] font-bold uppercase tracking-widest text-on-surface-variant/40">Synchronized with celestial index station.</p>
                </footer>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
