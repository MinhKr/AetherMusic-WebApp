import TopNav from "@/components/TopNav";

const trendingCards = [
  {
    id: 1,
    title: "Global Top 50",
    subtitle: "Updated 2h ago",
    color: "from-primary/20 to-transparent",
    icon: "trending_up",
  },
  {
    id: 2,
    title: "AI Curated",
    subtitle: "Based on your recent aura",
    color: "from-secondary/20 to-transparent",
    icon: "auto_awesome",
  },
];

const newReleases = [
  { title: "Digital Void", artist: "Neon Ether", genre: "Synthwave" },
  { title: "Phantom Signal", artist: "Echo Grid", genre: "Ambient" },
  { title: "Stellar Drift", artist: "Orion Arc", genre: "Electronic" },
  { title: "Neon Cascade", artist: "Lumina X", genre: "Future Bass" },
];

const featuredPlaylists = [
  { title: "Midnight Frequencies", tracks: 42, mood: "Focus" },
  { title: "Stellar Journey", tracks: 28, mood: "Chill" },
  { title: "Neon Pulse", tracks: 65, mood: "Energy" },
];

export default function DiscoverPage() {
  return (
    <main className="mr-8 pb-36 pt-6">
      <TopNav placeholder="Search the nebula..." />

      {/* Hero: Trending */}
      <section className="mb-12 px-8">
        <h2 className="mb-6 flex items-center gap-3 font-headline text-4xl font-bold tracking-tighter text-on-surface">
          Trending
          <span className="h-[2px] w-12 bg-gradient-to-r from-primary to-transparent" />
        </h2>

        <div className="grid grid-cols-12 gap-6">
          {/* Hero card */}
          <div className="col-span-8 group relative overflow-hidden rounded-3xl outline outline-1 outline-white/10 shadow-2xl" style={{ aspectRatio: "21/9" }}>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="h-40 w-40 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 blur-3xl" />
                <span className="material-symbols-outlined absolute inset-0 flex items-center justify-center text-8xl text-primary/20" style={{ fontVariationSettings: "'FILL' 1" }}>
                  graphic_eq
                </span>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-surface-dim via-surface-dim/40 to-transparent" />
            <div className="absolute bottom-0 left-0 flex w-full items-end justify-between p-10">
              <div>
                <span className="mb-4 inline-block rounded-full bg-primary/20 px-3 py-1 font-label text-[10px] font-bold uppercase tracking-[0.2em] text-primary backdrop-blur-md">
                  Artist Spotlight
                </span>
                <h3 className="font-headline text-5xl font-extrabold leading-tight text-white">
                  NEON
                  <br />
                  ETHER
                </h3>
                <p className="mt-2 max-w-md font-body text-white/70">
                  Experience the pulse of the digital void with the latest album 'Shattered Glass'.
                </p>
              </div>
              <button className="flex items-center gap-2 rounded-full bg-primary-container px-8 py-4 font-headline font-bold text-on-primary-fixed transition-all hover:shadow-[0_0_20px_rgba(0,255,255,0.5)]">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                  play_arrow
                </span>
                LISTEN NOW
              </button>
            </div>
          </div>

          {/* Side cards */}
          <div className="col-span-4 grid grid-rows-2 gap-6">
            {trendingCards.map((card) => (
              <div
                key={card.id}
                className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${card.color} p-6 backdrop-blur-2xl outline outline-1 outline-white/15 flex flex-col justify-between`}
              >
                <div className="relative z-10">
                  <h4 className="mb-1 font-headline text-xl font-bold text-white">{card.title}</h4>
                  <p className="mb-4 text-sm text-secondary">{card.subtitle}</p>
                </div>
                <button className="flex items-center gap-2 text-sm font-bold text-primary group-hover:underline">
                  VIEW MIX
                  <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">
                    arrow_forward
                  </span>
                </button>
                <div className="absolute -bottom-4 -right-4 opacity-20 transition-transform duration-500 group-hover:scale-110">
                  <span className="material-symbols-outlined text-[120px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                    {card.icon}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Releases */}
      <section className="mb-12 px-8">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-headline text-2xl font-bold tracking-tighter text-on-surface">
            New Releases
          </h2>
          <button className="font-label text-xs font-bold uppercase tracking-widest text-primary hover:underline">
            View All
          </button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {newReleases.map((release, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-xl bg-surface-container-low/40 p-5 backdrop-blur-xl outline outline-1 outline-white/10 transition-all duration-300 hover:scale-[1.02] hover:outline-primary/30 hover:shadow-[0_0_20px_rgba(188,135,254,0.1)]"
            >
              {/* Album art placeholder */}
              <div className="mb-4 aspect-square w-full overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 to-secondary/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-4xl text-primary/40" style={{ fontVariationSettings: "'FILL' 1" }}>
                  album
                </span>
              </div>
              <h4 className="font-headline font-bold text-on-surface">{release.title}</h4>
              <p className="text-sm text-on-surface-variant">{release.artist}</p>
              <span className="mt-2 inline-block rounded-full bg-secondary-container/50 px-2 py-0.5 font-label text-[10px] text-secondary">
                {release.genre}
              </span>
              <button className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-primary-container text-on-primary-fixed opacity-0 shadow-[0_0_15px_rgba(0,255,255,0.4)] transition-all group-hover:opacity-100">
                <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                  play_arrow
                </span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Playlists */}
      <section className="px-8">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-headline text-2xl font-bold tracking-tighter text-on-surface">
            Featured Playlists
          </h2>
          <button className="font-label text-xs font-bold uppercase tracking-widest text-primary hover:underline">
            View All
          </button>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {featuredPlaylists.map((playlist, i) => (
            <div
              key={i}
              className="group relative h-48 overflow-hidden rounded-2xl bg-surface-container-low/40 p-6 backdrop-blur-xl outline outline-1 outline-white/10 transition-all duration-300 hover:outline-primary/30"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/10 opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div>
                  <span className="font-label text-[10px] uppercase tracking-widest text-primary/70">{playlist.mood}</span>
                  <h4 className="mt-1 font-headline text-xl font-bold text-white">{playlist.title}</h4>
                  <p className="text-sm text-on-surface-variant">{playlist.tracks} tracks</p>
                </div>
                <button className="flex items-center gap-2 text-sm font-bold text-primary transition-all hover:gap-3">
                  PLAY NOW
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                    play_circle
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
