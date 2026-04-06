"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

const navItems = [
  { href: "/", label: "Discover", icon: "explore" },
  { href: "/upload", label: "Upload", icon: "cloud_upload" },
  { href: "/library", label: "Library", icon: "library_music" },
  { href: "/stations", label: "Stations", icon: "radio" },
  { href: "/profile", label: "Profile", icon: "account_circle" },
];

export default function Sidebar({ user }: { user?: User | null }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentView = searchParams.get("view");
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-full w-72 flex-col bg-surface/40 backdrop-blur-3xl border-r border-white/5 my-0 ml-0 h-screen transition-all duration-500 ease-in-out">
      {/* Decorative Glow */}
      <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-primary/10 blur-[100px]" />
      <div className="absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-secondary/10 blur-[100px]" />

      {/* Logo */}
      <div className="px-10 py-12 relative">
        <div className="flex items-center gap-4">
          {/* Branding N Logo */}
          <div className="h-10 w-10 flex-shrink-0 rounded-full bg-surface-container-highest border border-white/10 flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)] group/logo">
            <span className="font-headline text-xl font-black text-white/90 group-hover/logo:text-primary transition-colors">N</span>
          </div>
          
          <h1 className="font-headline text-3xl font-bold tracking-tighter text-primary drop-shadow-[0_0_12px_rgba(0,255,255,0.4)]">
            SONIC
          </h1>
        </div>
        
        <div className="flex items-center gap-2 mt-1 ml-14">
          <div className="h-[1px] w-4 bg-secondary-dim/50" />
          <p className="font-label text-[9px] uppercase font-bold tracking-[0.4em] text-secondary-dim/80">
            Celestial Conductor
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-3 px-6 relative mt-4">
        {navItems.map(({ href, label, icon }) => {
          const isBaseRoute = href.split("?")[0];
          const targetView = href.includes("view=") ? href.split("view=")[1] : null;
          
          const isActive = targetView 
            ? (pathname === isBaseRoute && currentView === targetView)
            : (pathname === isBaseRoute && !currentView);

          return (
            <Link
              key={label}
              href={href}
              className={`group flex items-center gap-4 rounded-2xl px-5 py-4 font-headline text-sm tracking-tight transition-all duration-500 ${
                isActive
                  ? "bg-white/5 text-primary ghost-border shadow-[0_0_20px_rgba(188,135,254,0.05)]"
                  : "text-on-surface-variant hover:bg-white/5 hover:text-on-surface"
              }`}
            >
              <div className={`relative flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-500 ${
                isActive ? "bg-primary/10" : "group-hover:bg-white/5"
              }`}>
                <span
                  className="material-symbols-outlined text-xl"
                  style={
                    isActive
                      ? { fontVariationSettings: "'FILL' 1" }
                      : undefined
                  }
                >
                  {icon}
                </span>
                {isActive && (
                  <div className="absolute -left-5 h-6 w-1 rounded-full bg-primary shadow-[0_0_10px_#00ffff]" />
                )}
              </div>
              <span className={isActive ? "font-bold" : "font-medium"}>{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User profile */}
      <div className="p-8 relative mt-auto">
        <div className="group flex items-center gap-4 rounded-2xl bg-surface-container-low/40 p-4 ghost-border transition-all duration-500 hover:bg-surface-container-low/60 hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
          <div className="relative h-11 w-11 flex-shrink-0">
            <div className={`absolute inset-0 rounded-full bg-gradient-to-tr from-primary to-secondary p-[1.5px] transition-transform duration-500 group-hover:rotate-180`}>
              <div className="h-full w-full rounded-full bg-surface-container-low overflow-hidden">
                {user?.user_metadata?.avatar_url ? (
                  <Image
                    src={user.user_metadata.avatar_url}
                    alt={user.email ?? "User"}
                    width={44}
                    height={44}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary/70 text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                      account_circle
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-surface bg-primary shadow-[0_0_8px_#00ffff]" />
          </div>
          <div className="overflow-hidden flex-1">
            <p className="truncate text-sm font-bold text-on-surface">{user?.email?.split('@')[0] ?? "Guest"}</p>
            <p className="text-[9px] font-bold uppercase tracking-widest text-primary/60">Aether Artist</p>
          </div>
        </div>
        
        <button
          onClick={handleSignOut}
          className="mt-6 w-full flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-on-surface-variant/40 hover:text-error/80 hover:bg-error/5 transition-all duration-300 text-xs font-bold uppercase tracking-widest"
        >
          <span className="material-symbols-outlined text-sm">logout</span>
          Terminate Session
        </button>
      </div>
    </aside>
  );
}
