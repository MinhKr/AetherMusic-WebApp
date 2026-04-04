import TopNav from "@/components/TopNav";

const stats = [
  { label: "Tracks Played", value: "12,847", icon: "music_note" },
  { label: "Hours Listened", value: "1,204", icon: "schedule" },
  { label: "Playlists", value: "34", icon: "queue_music" },
  { title: "Following", value: "289", icon: "people" },
];

const recentActivity = [
  { action: "Liked", item: "Shattered Glass", by: "Neon Ether", time: "2m ago" },
  { action: "Added to library", item: "Parallax", by: "Orion Arc", time: "1h ago" },
  { action: "Followed", item: "Echo Grid", by: null, time: "3h ago" },
  { action: "Created playlist", item: "Midnight Session", by: null, time: "1d ago" },
];

const topArtists = [
  { name: "Neon Ether", plays: "342 plays" },
  { name: "Echo Grid", plays: "218 plays" },
  { name: "Orion Arc", plays: "197 plays" },
  { name: "Lumina X", plays: "156 plays" },
  { name: "Cipher Wave", plays: "134 plays" },
];

export default function ProfilePage() {
  return (
    <main className="mr-8 pb-36 pt-6">
      <TopNav placeholder="Search the nebula..." />

      <div className="px-8">
        {/* Profile hero */}
        <section className="relative mb-12 h-80 w-full overflow-hidden rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-surface-container" />
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <span className="material-symbols-outlined text-[300px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
              blur_circular
            </span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-surface-dim via-surface-dim/40 to-transparent" />
          <div className="absolute bottom-0 left-0 flex w-full items-end justify-between p-10">
            <div className="flex items-end gap-6">
              <div className="h-24 w-24 overflow-hidden rounded-2xl border-2 border-primary/40 bg-gradient-to-br from-primary/30 to-secondary/40 flex items-center justify-center shadow-[0_0_20px_rgba(0,255,255,0.3)] flex-shrink-0">
                <span className="material-symbols-outlined text-5xl text-primary/70" style={{ fontVariationSettings: "'FILL' 1" }}>
                  account_circle
                </span>
              </div>
              <div>
                <span className="font-label text-[10px] uppercase tracking-[0.3em] text-primary">Premium Member</span>
                <h2 className="font-headline text-5xl font-extrabold tracking-tighter text-white">Lyra Chen</h2>
                <p className="font-body text-on-surface-variant">Listening since 2022 · 289 followers</p>
              </div>
            </div>
            <button className="flex items-center gap-2 rounded-full bg-surface-container-high/80 px-6 py-3 font-headline text-sm font-bold text-on-surface backdrop-blur-md outline outline-1 outline-white/10 transition-all hover:outline-primary/40">
              <span className="material-symbols-outlined text-sm">edit</span>
              Edit Profile
            </button>
          </div>
        </section>

        {/* Stats grid */}
        <section className="mb-12">
          <div className="grid grid-cols-4 gap-5">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="group rounded-2xl glass-panel ghost-border p-6 transition-all hover:outline-primary/30"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <span className="material-symbols-outlined text-primary">{stat.icon}</span>
                </div>
                <p className="font-headline text-3xl font-bold text-on-surface">{stat.value}</p>
                <p className="mt-1 font-label text-sm text-on-surface-variant">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-3 gap-8">
          {/* Sonic DNA / Top Artists */}
          <div className="col-span-2">
            <h3 className="mb-6 font-headline text-2xl font-bold">Sonic DNA</h3>
            <div className="rounded-2xl glass-panel ghost-border p-6">
              {/* Genre bars */}
              <div className="mb-8 space-y-4">
                {[
                  { genre: "Synthwave", pct: 38 },
                  { genre: "Ambient", pct: 24 },
                  { genre: "Techno", pct: 18 },
                  { genre: "Jazz Fusion", pct: 12 },
                  { genre: "Other", pct: 8 },
                ].map((g) => (
                  <div key={g.genre} className="flex items-center gap-4">
                    <span className="w-28 font-label text-xs text-on-surface-variant flex-shrink-0">{g.genre}</span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/5">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                        style={{ width: `${g.pct}%` }}
                      />
                    </div>
                    <span className="w-8 font-label text-xs text-on-surface-variant text-right">{g.pct}%</span>
                  </div>
                ))}
              </div>

              {/* Top artists */}
              <h4 className="mb-4 font-headline font-bold text-on-surface-variant text-sm uppercase tracking-widest">Top Artists</h4>
              <div className="space-y-3">
                {topArtists.map((artist, i) => (
                  <div key={i} className="flex items-center justify-between group rounded-xl px-3 py-2 transition-colors hover:bg-white/5">
                    <div className="flex items-center gap-3">
                      <span className="font-label text-sm text-on-surface-variant w-4">{i + 1}</span>
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary/20 to-secondary/30 flex items-center justify-center">
                        <span className="font-headline text-xs font-bold text-primary">{artist.name[0]}</span>
                      </div>
                      <span className="font-body text-sm text-on-surface">{artist.name}</span>
                    </div>
                    <span className="font-label text-xs text-on-surface-variant">{artist.plays}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent activity */}
          <div>
            <h3 className="mb-6 font-headline text-2xl font-bold">Recent Activity</h3>
            <div className="space-y-3">
              {recentActivity.map((item, i) => (
                <div key={i} className="rounded-xl glass-panel ghost-border p-4">
                  <p className="font-label text-[10px] uppercase tracking-widest text-primary/70">{item.action}</p>
                  <p className="font-headline font-bold text-on-surface text-sm">{item.item}</p>
                  {item.by && <p className="text-xs text-on-surface-variant">{item.by}</p>}
                  <p className="mt-1 font-label text-[10px] text-on-surface-variant/50">{item.time}</p>
                </div>
              ))}
            </div>

            {/* Settings quick links */}
            <div className="mt-6 rounded-2xl glass-panel ghost-border p-5">
              <h4 className="mb-4 font-headline font-bold text-on-surface">Resonance Settings</h4>
              <div className="space-y-3">
                {["Audio Quality", "Equalizer", "Notifications", "Privacy"].map((setting) => (
                  <button
                    key={setting}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2 transition-colors hover:bg-white/5"
                  >
                    <span className="font-body text-sm text-on-surface-variant">{setting}</span>
                    <span className="material-symbols-outlined text-sm text-on-surface-variant">chevron_right</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
