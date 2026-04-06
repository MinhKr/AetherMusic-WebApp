"use client";

import { useState, Suspense } from "react";
import { login, signup } from "./actions";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

function LoginContent() {
  const searchParams = useSearchParams();
  const [isLogin, setIsLogin] = useState(searchParams.get("type") !== "signup");
  const message = searchParams.get("message");

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0e0c1f] overflow-hidden relative">
      {/* Immersive Cosmic Background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 h-[600px] w-[600px] rounded-full bg-secondary/10 blur-[180px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-white/[0.02] blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-5xl px-12 flex flex-col lg:flex-row items-center gap-20">
        {/* Left Side: Stunning Branding */}
        <div className="flex-1 text-center lg:text-left">
           <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
           >
                <span className="mb-8 inline-flex items-center gap-3 rounded-full bg-white/5 pr-6 pl-2 py-2 font-label text-[10px] font-bold uppercase tracking-[0.4em] text-primary backdrop-blur-md outline outline-1 outline-white/10">
                    <span className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-[#0e0c1f]">
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    </span>
                    Celestial Network
                </span>
                
                <h1 className="text-editorial-lg text-gradient leading-[0.8] mb-8">
                    AETHER<br />
                    <span className="ml-12 lg:ml-24">MUSIC</span>
                </h1>
                
                <p className="font-body text-xl text-on-surface-variant/80 max-w-lg leading-relaxed mb-12 hidden lg:block">
                    Synchronize your consciousness with the infinite resonance. Experience audio beyond the terrestrial horizon.
                </p>

                <div className="hidden lg:flex items-center gap-8 mt-12 opacity-40">
                    <div className="flex flex-col">
                        <span className="font-label text-[10px] font-bold uppercase tracking-widest mb-1">Frequency</span>
                        <span className="font-headline text-lg font-bold">44.1 KHZ</span>
                    </div>
                    <div className="h-8 w-[1px] bg-white/10" />
                    <div className="flex flex-col">
                        <span className="font-label text-[10px] font-bold uppercase tracking-widest mb-1">Status</span>
                        <span className="font-headline text-lg font-bold text-primary">ENCRYPTED</span>
                    </div>
                </div>
           </motion.div>
        </div>

        {/* Right Side: Advanced Glass Form */}
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="w-full max-w-md"
        >
            <div className="relative group perspective-1000">
                {/* Offset glow layers */}
                <div className="absolute -inset-1 rounded-[40px] bg-gradient-to-tr from-primary/20 to-secondary/20 blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-700" />
                
                <div className="relative rounded-[40px] glass-panel-elevated ghost-border p-12 shadow-2xl backdrop-blur-3xl overflow-hidden transition-all duration-700 hover:scale-[1.01]">
                    {/* Decorative form icons */}
                    <div className="absolute -right-10 -top-10 opacity-[0.03] pointer-events-none">
                        <span className="material-symbols-outlined text-[200px]">fingerprint</span>
                    </div>

                    <h2 className="text-4xl font-headline font-black tracking-tighter text-white mb-2">
                        {isLogin ? "Synchronize" : "Evolve"}
                    </h2>
                    <p className="mb-10 font-label text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-[0.2em]">
                        {isLogin
                        ? "Enter your cosmic credentials"
                        : "Initialize a new identity core"}
                    </p>

                    <AnimatePresence mode="wait">
                        {message && (
                            <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mb-8 rounded-2xl bg-red-500/10 p-4 text-center text-xs font-bold font-label uppercase tracking-widest text-red-400 outline outline-1 outline-red-500/20"
                            >
                                {message}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form action={isLogin ? login : signup} className="space-y-6">
                        <div className="space-y-2">
                        <label className="font-label text-[10px] font-bold text-primary/70 uppercase tracking-[0.4em] ml-2">
                            Signal ID (Email)
                        </label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-white/20 text-lg">alternate_email</span>
                            <input
                                type="email"
                                name="email"
                                required
                                className="w-full rounded-2xl bg-white/5 border border-white/10 pl-14 pr-6 py-4 text-sm font-headline font-bold text-white placeholder-white/20 focus:border-primary/50 focus:bg-white/10 focus:outline-none transition-all shadow-inner"
                                placeholder="astronaut@nebula.io"
                            />
                        </div>
                        </div>
                        
                        <div className="space-y-2">
                        <label className="font-label text-[10px] font-bold text-secondary/70 uppercase tracking-[0.4em] ml-2">
                            Access Matrix (Password)
                        </label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-white/20 text-lg">key</span>
                            <input
                                type="password"
                                name="password"
                                required
                                minLength={6}
                                className="w-full rounded-2xl bg-white/5 border border-white/10 pl-14 pr-6 py-4 text-sm font-headline font-bold text-white placeholder-white/20 focus:border-secondary/50 focus:bg-white/10 focus:outline-none transition-all shadow-inner"
                                placeholder="••••••••"
                            />
                        </div>
                        </div>
                        
                        <AnimatePresence>
                            {!isLogin && (
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="space-y-2"
                            >
                                <label className="font-label text-[10px] font-bold text-tertiary/70 uppercase tracking-[0.4em] ml-2">
                                    Re-Validate Key
                                </label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-white/20 text-lg">lock_reset</span>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        required
                                        minLength={6}
                                        className="w-full rounded-2xl bg-white/5 border border-white/10 pl-14 pr-6 py-4 text-sm font-headline font-bold text-white placeholder-white/20 focus:border-tertiary/50 focus:bg-white/10 focus:outline-none transition-all shadow-inner"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </motion.div>
                            )}
                        </AnimatePresence>

                        <button
                            type="submit"
                            className="group relative mt-10 w-full overflow-hidden rounded-full transition-all duration-500 hover:scale-[1.05] active:scale-95 py-6"
                        >
                            <div className={`absolute inset-0 transition-all duration-500 ${isLogin ? "bg-primary shadow-[0_0_30px_#00ffff]" : "bg-secondary shadow-[0_0_30px_#bc87fe]"}`} />
                            <div className="relative z-10 flex items-center justify-center gap-4 font-headline text-lg font-black tracking-[0.3em] text-[#0e0c1f] uppercase">
                                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                                    {isLogin ? "sensors" : "star_rate"}
                                </span>
                                {isLogin ? "Initiate" : "Authorize"}
                            </div>
                        </button>
                    </form>

                    <p className="mt-10 text-center font-label text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant/40">
                        {isLogin ? "No identity core yet? " : "Identity core confirmed? "}
                        <button
                        type="button"
                        onClick={() => {
                            setIsLogin(!isLogin);
                            window.history.replaceState({}, '', '/login');
                        }}
                        className={`font-black tracking-[0.3em] hover:opacity-100 transition-opacity ml-2 ${isLogin ? "text-primary" : "text-secondary"}`}
                        >
                        {isLogin ? "INITIALIZE" : "SYNCHRONIZE"}
                        </button>
                    </p>
                </div>
            </div>
        </motion.div>
      </div>

      {/* Decorative footer label */}
      <div className="absolute bottom-10 left-12 font-label text-[9px] font-bold text-white/5 uppercase tracking-[0.5em] vertical-rl rotate-180 hidden lg:block">
        SECURE_CONNECTION_STABLE // NO_LEAK_DETECTED
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0e0c1f] flex items-center justify-center text-primary font-headline text-2xl font-bold tracking-[0.5em] animate-pulse">TRANSMITTING...</div>}>
      <LoginContent />
    </Suspense>
  );
}
