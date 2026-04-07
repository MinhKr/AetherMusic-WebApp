"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import TopNav from "@/components/TopNav";

export default function UploadPage() {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [genre, setGenre] = useState("Electronic");

  const audioInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type.includes("audio")) {
        setFile(droppedFile);
        if (!title) setTitle(droppedFile.name.replace(/\.[^/.]+$/, ""));
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedImage = e.target.files[0];
      setImage(selectedImage);
      setImagePreview(URL.createObjectURL(selectedImage));
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title || !artist) {
      alert("Please fill in all fields and select a song file.");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", title);
      formData.append("artist", artist);
      formData.append("genre", genre);
      if (image) formData.append("image", image);

      const res = await fetch("/api/songs/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      router.push("/");
      router.refresh();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <main className="mr-8 pb-36 pt-4 page-transition min-h-screen">
      <TopNav placeholder="Broadcasting signals..." />

      <div className="max-w-7xl mx-auto px-12 py-12 relative">
        {/* Background Decorative Glows */}
        <div className="absolute -left-20 top-0 h-96 w-96 rounded-full bg-primary/10 blur-[150px] animate-pulse" />
        <div className="absolute right-1/4 bottom-0 h-64 w-64 rounded-full bg-secondary/10 blur-[120px] animate-pulse" style={{ animationDelay: '1.5s' }} />

        <div className="flex flex-col lg:flex-row gap-16 items-start">
            {/* Left: Editorial Header & Instruction */}
            <div className="w-full lg:w-1/3 z-10 sticky top-32">
                <span className="mb-8 inline-flex items-center gap-3 rounded-full bg-white/5 pr-6 pl-2 py-2 font-label text-[10px] font-bold uppercase tracking-[0.4em] text-primary backdrop-blur-md outline outline-1 outline-white/10">
                    <span className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-[#0e0c1f]">
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>uplink</span>
                    </span>
                    Signal Transmission
                </span>
                
                <h1 className="text-editorial-md text-gradient mb-8 leading-[0.9]">
                    UPLOAD TO<br />
                    <span className="ml-12 italic text-on-surface">NEBULA</span>
                </h1>
                
                <p className="font-body text-lg text-on-surface-variant/80 leading-relaxed mb-12">
                    Inject your sonic frequencies into the celestial collective. Our indexing machines will broadcast your resonance across the infinite expanse.
                </p>

                {/* Status Indicator */}
                <div className="p-8 rounded-[32px] glass-panel ghost-border shadow-2xl relative overflow-hidden group">
                    <div className="flex justify-between items-start mb-6">
                        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                            <span className="material-symbols-outlined text-primary">sensors</span>
                        </div>
                        <span className="text-[10px] font-black font-headline text-primary tracking-widest uppercase">Encryption Active</span>
                    </div>
                    <p className="font-headline text-lg font-bold leading-tight mb-1">Upload Integrity</p>
                    <p className="font-label text-[10px] text-on-surface-variant tracking-[0.2em] uppercase mb-4">Signal Shielded</p>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="w-[100%] h-full bg-primary shadow-[0_0_10px_#00ffff]" />
                    </div>
                </div>
            </div>

            {/* Right: Technical Form Interface */}
            <div className="flex-1 z-10 w-full">
                <form onSubmit={handleUpload} className="space-y-12">
                    {/* Primary Technical Module: Drop Zones */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Audio Drop Module */}
                        <div 
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                            onClick={() => audioInputRef.current?.click()}
                            className={`group relative flex aspect-square flex-col items-center justify-center rounded-[3rem] border-2 border-dashed transition-all duration-700 
                            ${dragActive ? "border-primary bg-primary/10 scale-[1.02]" : "border-white/10 glass-panel hover:border-primary/50 hover:bg-white/5"}
                            ${file ? "border-solid border-primary/40 bg-surface-container-low/60" : ""}`}
                        >
                            <input 
                            type="file" 
                            ref={audioInputRef} 
                            onChange={(e) => e.target.files && setFile(e.target.files[0])}
                            className="hidden" 
                            accept="audio/*" 
                            />
                            
                            <AnimatePresence mode="wait">
                            {file ? (
                                <motion.div 
                                key="selected"
                                initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                className="flex flex-col items-center text-center p-10"
                                >
                                <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-primary text-[#0e0c1f] shadow-[0_0_40px_rgba(0,255,255,0.4)]">
                                    <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>equalizer</span>
                                </div>
                                <p className="font-headline text-xl font-bold text-white mb-2 italic">
                                    SIGNAL CAPTURED
                                </p>
                                <p className="text-sm font-label text-on-surface-variant font-bold uppercase tracking-widest truncate max-w-[200px]">
                                    {file.name}
                                </p>
                                <button 
                                    type="button"
                                    onClick={(e) => { e.stopPropagation(); setFile(null); }}
                                    className="mt-8 px-6 py-2 rounded-full border border-white/10 text-[10px] font-bold uppercase tracking-widest text-primary hover:bg-primary/10 hover:border-primary/30 transition-all"
                                >
                                    Eject Segment
                                </button>
                                </motion.div>
                            ) : (
                                <motion.div 
                                key="empty"
                                className="flex flex-col items-center text-center p-10"
                                >
                                <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-white/5 border border-white/10 text-on-surface-variant/40 group-hover:text-primary group-hover:border-primary/40 transition-all duration-700">
                                    <span className="material-symbols-outlined text-5xl">settings_input_antenna</span>
                                </div>
                                <h3 className="font-headline text-2xl font-bold text-white mb-2">Initialize Flow</h3>
                                <p className="font-label text-xs font-bold text-on-surface-variant tracking-[0.2em] uppercase">Inject MP3/WAV/FLAC</p>
                                </motion.div>
                            )}
                            </AnimatePresence>
                        </div>

                        {/* Image Drop Module (Asymmetrical counterpart) */}
                        <div 
                            onClick={() => imageInputRef.current?.click()}
                            className="group relative flex aspect-square flex-col items-center justify-center rounded-[3rem] glass-panel-elevated ghost-border transition-all duration-700 hover:scale-[1.02] cursor-pointer overflow-hidden"
                        >
                            <input 
                            type="file" 
                            ref={imageInputRef} 
                            onChange={handleImageChange}
                            className="hidden" 
                            accept="image/*" 
                            />
                            
                            {imagePreview ? (
                                <>
                                    <img src={imagePreview} alt="Preview" className="h-full w-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-1000" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />
                                    <div className="absolute bottom-10 left-0 right-0 text-center">
                                         <p className="font-label text-[10px] font-bold text-primary uppercase tracking-[0.4em] mb-4">Essence Acquired</p>
                                         <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors">Replace Visage</span>
                                    </div>
                                </>
                            ) : (
                                <div className="flex h-full flex-col items-center justify-center text-on-surface-variant/40 group-hover:text-secondary transition-all duration-700">
                                    <span className="material-symbols-outlined text-6xl mb-6" style={{ fontVariationSettings: "'FILL' 1" }}>nebula</span>
                                    <h3 className="font-headline text-2xl font-bold text-white mb-2">Sonic Visage</h3>
                                    <p className="font-label text-xs font-bold tracking-[0.2em] uppercase">Add Visual Essence</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Meta Technical Module: Fields */}
                    <div className="p-12 rounded-[40px] glass-panel ghost-border grid grid-cols-1 md:grid-cols-2 gap-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                            <span className="material-symbols-outlined text-9xl">dna</span>
                        </div>
                        
                        {/* Title Input */}
                        <div className="space-y-4">
                            <label className="font-label text-[10px] font-bold uppercase tracking-[0.4em] text-primary/70 ml-2">
                                Frequency ID
                            </label>
                            <input 
                                type="text" 
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="E.g. CELESTIAL_01"
                                className="w-full rounded-2xl bg-white/5 p-6 text-xl font-headline font-bold text-white outline outline-1 outline-white/10 focus:outline-primary/50 focus:bg-white/10 transition-all placeholder:text-white/10"
                            />
                        </div>

                        {/* Artist Input */}
                        <div className="space-y-4">
                            <label className="font-label text-[10px] font-bold uppercase tracking-[0.4em] text-secondary/70 ml-2">
                                Origin Point (Architect)
                            </label>
                            <input 
                                type="text" 
                                value={artist}
                                onChange={(e) => setArtist(e.target.value)}
                                placeholder="Conductor name..."
                                className="w-full rounded-2xl bg-white/5 p-6 text-xl font-headline font-bold text-white outline outline-1 outline-white/10 focus:outline-secondary/50 focus:bg-white/10 transition-all placeholder:text-white/10"
                            />
                        </div>

                        {/* Genre Input */}
                        <div className="col-span-full space-y-4">
                            <label className="font-label text-[10px] font-bold uppercase tracking-[0.4em] text-tertiary/70 ml-2">
                                Spectrum resonance
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                                {["Electronic", "Synthwave", "Vaporwave", "Ambient", "Phonk"].map(g => (
                                    <button
                                        key={g}
                                        type="button"
                                        onClick={() => setGenre(g)}
                                        className={`px-4 py-4 rounded-2xl font-headline font-bold text-xs uppercase tracking-widest transition-all ${genre === g ? "bg-primary text-[#0e0c1f] shadow-[0_0_15px_#00ffff]" : "bg-white/5 text-on-surface-variant hover:bg-white/10 outline outline-1 outline-white/5"}`}
                                    >
                                        {g}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Launch Trigger */}
                    <div className="flex justify-center pt-8">
                        <button 
                            disabled={uploading}
                            className="group relative px-20 py-8 rounded-full overflow-hidden transition-all duration-500 hover:scale-[1.05] active:scale-95 disabled:opacity-50"
                        >
                            <div className="absolute inset-0 bg-primary shadow-[0_0_40px_rgba(0,255,255,0.4)] group-hover:shadow-[0_0_60px_rgba(0,255,255,0.6)] transition-all duration-500" />
                            <div className="relative z-10 font-headline text-2xl font-black tracking-[0.4em] text-[#0e0c1f] uppercase">
                                {uploading ? "TRANSMITTING..." : "LAUNCH TO NEBULA"}
                            </div>
                            <div className="absolute inset-x-0 bottom-0 h-1 bg-white/40 animate-pulse" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
      </div>
    </main>
  );
}
