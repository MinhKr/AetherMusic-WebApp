"use client";

import { useState, Suspense } from "react";
import { login, signup } from "./actions";
import { useSearchParams } from "next/navigation";

function LoginContent() {
  const searchParams = useSearchParams();
  const [isLogin, setIsLogin] = useState(searchParams.get("type") !== "signup");
  const message = searchParams.get("message");

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-secondary/5 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md px-8">
        {/* Logo */}
        <div className="mb-12 text-center">
          <h1 className="font-headline text-5xl font-bold tracking-tighter text-[#c1fffe] drop-shadow-[0_0_16px_rgba(0,255,255,0.5)]">
            SONIC
          </h1>
          <p className="mt-2 font-label text-sm uppercase tracking-[0.3em] text-secondary-dim opacity-80">
            Celestial Conductor
          </p>
        </div>

        {/* Card */}
        <div className="rounded-3xl glass-panel ghost-border p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <h2 className="mb-2 font-headline text-2xl font-bold text-on-surface">
            {isLogin ? "Welcome Back" : "Join the Nebula"}
          </h2>
          <p className="mb-8 font-body text-sm text-on-surface-variant">
            {isLogin
              ? "Sign in to access your cosmic experience."
              : "Create an account to start your journey."}
          </p>

          {message && (
            <div className="mb-6 rounded-xl bg-red-500/10 p-3 text-center text-sm text-red-400 outline outline-1 outline-red-500/20">
              {message}
            </div>
          )}

          <form action={isLogin ? login : signup} className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-[#00ffff] focus:outline-none focus:ring-1 focus:ring-[#00ffff] transition-colors"
                placeholder="astronaut@nebula.com"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                minLength={6}
                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-[#00ffff] focus:outline-none focus:ring-1 focus:ring-[#00ffff] transition-colors"
                placeholder="••••••••"
              />
            </div>
            
            {!isLogin && (
              <div>
                <label className="mb-1 block text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  minLength={6}
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-[#00ffff] focus:outline-none focus:ring-1 focus:ring-[#00ffff] transition-colors"
                  placeholder="••••••••"
                />
              </div>
            )}

            <button
              type="submit"
              className="mt-6 flex w-full items-center justify-center gap-3 rounded-full bg-[#00ffff] px-8 py-4 font-headline font-bold text-black transition-all hover:bg-[#c1fffe] hover:shadow-[0_0_20px_rgba(0,255,255,0.4)] cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                {isLogin ? "login" : "person_add"}
              </span>
              {isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

          <p className="mt-8 text-center font-body text-xs text-on-surface-variant/60">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                window.history.replaceState({}, '', '/login');
              }}
              className="text-[#00ffff] hover:underline focus:outline-none font-bold"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface flex items-center justify-center text-white">Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}
