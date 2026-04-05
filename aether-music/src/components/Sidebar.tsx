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
    <aside className="fixed left-0 top-0 z-50 flex h-full w-64 flex-col rounded-r-2xl bg-[#0e0c1f]/40 backdrop-blur-3xl outline outline-1 outline-white/15 shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_20px_rgba(188,135,254,0.1)] my-4 ml-4 h-[calc(100vh-32px)]">
      {/* Logo */}
      <div className="px-8 py-10">
        <h1 className="font-headline text-2xl font-bold tracking-tighter text-[#c1fffe] drop-shadow-[0_0_8px_rgba(0,255,255,0.5)]">
          SONIC
        </h1>
        <p className="mt-1 font-label text-[10px] uppercase tracking-[0.3em] text-secondary-dim opacity-80">
          Celestial Conductor
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 px-4">
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
              className={`flex items-center gap-4 rounded-xl px-4 py-3 font-headline text-sm tracking-tight transition-all duration-300 ${
                isActive
                  ? "scale-105 border-r-2 border-[#00ffff] font-bold text-[#00ffff]"
                  : "text-white/60 hover:bg-white/5 hover:text-white/90"
              }`}
            >
              <span
                className="material-symbols-outlined"
                style={
                  isActive
                    ? { fontVariationSettings: "'FILL' 1" }
                    : undefined
                }
              >
                {icon}
              </span>
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User profile */}
      <div className="p-6 mt-auto space-y-2">
        <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3 outline outline-1 outline-white/10">
          <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-tr from-primary to-secondary p-[2px] overflow-hidden">
            {user?.user_metadata?.avatar_url ? (
              <Image
                src={user.user_metadata.avatar_url}
                alt={user.email ?? "User"}
                width={40}
                height={40}
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <div className="h-full w-full rounded-full bg-surface-container-high flex items-center justify-center">
                <span className="material-symbols-outlined text-primary/70 text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  account_circle
                </span>
              </div>
            )}
          </div>
          <div className="overflow-hidden flex-1">
            <p className="truncate text-sm font-bold text-on-surface">{user?.email ?? "Guest"}</p>
            <p className="text-[10px] uppercase tracking-widest text-primary/70">AetherMusic</p>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 rounded-xl px-3 py-2 text-white/40 hover:text-white/70 hover:bg-white/5 transition-colors text-xs font-label"
        >
          <span className="material-symbols-outlined text-sm">logout</span>
          Sign out
        </button>
      </div>
    </aside>
  );
}
