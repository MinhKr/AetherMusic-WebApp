"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
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
      // 1. Upload Audio
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `tracks/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("songs")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl: songUrl } } = supabase.storage
        .from("songs")
        .getPublicUrl(filePath);

      // 2. Upload Image (if any)
      let imageUrl = "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=800&q=80";
      if (image) {
        const imgExt = image.name.split(".").pop();
        const imgName = `${Math.random()}.${imgExt}`;
        const imgPath = `artworks/${imgName}`;

        const { error: imgError } = await supabase.storage
          .from("songs")
          .upload(imgPath, image);

        if (imgError) throw imgError;

        const { data: { publicUrl: imgPublicUrl } } = supabase.storage
          .from("songs")
          .getPublicUrl(imgPath);
        
        imageUrl = imgPublicUrl;
      }

      // 3. Save to Database
      const { error: dbError } = await supabase
        .from("songs")
        .insert({
          title,
          artist,
          genre,
          song_url: songUrl,
          image_url: imageUrl,
        });

      if (dbError) throw dbError;

      router.push("/");
      router.refresh();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <main className="mr-8 pb-36 pt-6 min-h-screen">
      <TopNav placeholder="Searching for sounds..." />

      <div className="max-w-4xl mx-auto px-8 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-[2rem] bg-surface-container-low/40 p-12 backdrop-blur-3xl outline outline-1 outline-white/10 shadow-2xl"
        >
          {/* Background Decorative Glow */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-[100px]" />
          <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-secondary/10 blur-[100px]" />

          <header className="mb-12 text-center">
            <h1 className="font-headline text-5xl font-extrabold tracking-tighter text-white">
              UPLOAD TO <span className="text-primary italic">NEBULA</span>
            </h1>
            <p className="mt-2 text-on-surface-variant/70 font-body">
              Broadcast your frequencies to the celestial network.
            </p>
          </header>

          <form onSubmit={handleUpload} className="grid grid-cols-12 gap-10">
            {/* Left: File Zones */}
            <div className="col-span-12 lg:col-span-5 space-y-8">
              {/* Audio Drop Zone */}
              <div 
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => audioInputRef.current?.click()}
                className={`group relative flex aspect-square w-full cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed transition-all duration-500 
                  ${dragActive ? "border-primary bg-primary/5 scale-105" : "border-white/10 hover:border-primary/50 hover:bg-white/5"}
                  ${file ? "border-solid border-primary/30" : ""}`}
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
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center text-center p-6"
                    >
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-primary shadow-[0_0_20px_rgba(0,255,255,0.3)]">
                        <span className="material-symbols-outlined text-3xl">music_note</span>
                      </div>
                      <p className="font-headline font-bold text-white truncate max-w-full italic px-4">
                        {file.name}
                      </p>
                      <button 
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setFile(null); }}
                        className="mt-4 text-[10px] font-bold uppercase tracking-widest text-primary hover:text-white"
                      >
                        Change File
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="empty"
                      className="flex flex-col items-center text-center p-6"
                    >
                      <motion.div 
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 3 }}
                        className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/5 text-white/40 group-hover:text-primary transition-colors"
                      >
                        <span className="material-symbols-outlined text-4xl">cloud_upload</span>
                      </motion.div>
                      <p className="font-headline text-lg font-bold text-white">Drop Nebula Tracks</p>
                      <p className="text-sm text-on-surface-variant mt-1 italic">MP3, WAV, FLAC</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Artwork Zone */}
              <div 
                onClick={() => imageInputRef.current?.click()}
                className="group relative h-48 w-full cursor-pointer overflow-hidden rounded-2xl bg-surface-container-highest/30 outline outline-1 outline-white/10 hover:outline-secondary/50 transition-all"
              >
                <input 
                  type="file" 
                  ref={imageInputRef} 
                  onChange={handleImageChange}
                  className="hidden" 
                  accept="image/*" 
                />
                
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center text-white/30 group-hover:text-secondary transition-colors">
                    <span className="material-symbols-outlined text-3xl mb-2">add_photo_alternate</span>
                    <span className="font-label text-[10px] font-bold uppercase tracking-[0.2em]">Add Essence</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                   <p className="font-label text-xs font-bold text-white uppercase tracking-widest">Change Image</p>
                </div>
              </div>
            </div>

            {/* Right: Inputs */}
            <div className="col-span-12 lg:col-span-7 flex flex-col justify-between py-2">
              <div className="space-y-8">
                {/* Title */}
                <div className="space-y-2">
                  <label className="font-label text-[10px] font-bold uppercase tracking-[0.3em] text-primary/70 ml-1">
                    Frequency Title
                  </label>
                  <input 
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="E.g. Neon Dreams"
                    className="w-full rounded-2xl bg-surface-container-highest/20 p-5 text-lg font-headline font-medium text-white outline outline-1 outline-white/10 focus:outline-primary/50 focus:bg-surface-container-highest/40 transition-all"
                  />
                </div>

                {/* Artist */}
                <div className="space-y-2">
                  <label className="font-label text-[10px] font-bold uppercase tracking-[0.3em] text-primary/70 ml-1">
                    Cosmic Architect
                  </label>
                  <input 
                    type="text" 
                    value={artist}
                    onChange={(e) => setArtist(e.target.value)}
                    placeholder="Artist name..."
                    className="w-full rounded-2xl bg-surface-container-highest/20 p-5 text-lg font-headline font-medium text-white outline outline-1 outline-white/10 focus:outline-primary/50 focus:bg-surface-container-highest/40 transition-all"
                  />
                </div>

                {/* Genre */}
                <div className="space-y-2">
                  <label className="font-label text-[10px] font-bold uppercase tracking-[0.3em] text-primary/70 ml-1">
                    Sonic Spectrum
                  </label>
                  <select 
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    className="w-full rounded-2xl bg-surface-container-highest/20 p-5 text-lg font-headline font-medium text-white outline outline-1 outline-white/10 focus:outline-primary/50 transition-all appearance-none"
                  >
                    <option value="Electronic">Electronic</option>
                    <option value="Synthwave">Synthwave</option>
                    <option value="Vaporwave">Vaporwave</option>
                    <option value="Ambient">Ambient</option>
                    <option value="Phonk">Phonk</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={uploading}
                className="mt-12 group relative w-full overflow-hidden rounded-full bg-primary-container py-6 font-headline text-xl font-black tracking-[0.2em] text-on-primary-fixed shadow-[0_0_30px_rgba(0,255,255,0.2)] hover:shadow-[0_0_40px_rgba(0,255,255,0.4)] disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {uploading ? (
                  <span className="flex items-center justify-center gap-3">
                    <motion.span 
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="material-symbols-outlined"
                    >
                      progress_activity
                    </motion.span>
                    TRANSMITTING...
                  </span>
                ) : (
                  <>
                    <span className="relative z-10">LAUNCH TO NEBULA</span>
                    <motion.div 
                       animate={{ 
                         x: ["-100%", "100%"] 
                       }}
                       transition={{ 
                         repeat: Infinity, 
                         duration: 2, 
                         ease: "linear" 
                       }}
                       className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent italic"
                    />
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </main>
  );
}
