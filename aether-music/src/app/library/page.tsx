import TopNav from "@/components/TopNav";

const playlists = [
  {
    title: "Cosmic Drift",
    tracks: 34,
    duration: "2h 18m",
    mood: "Focus",
    featured: true,
  },
  { title: "Neon Pulse", tracks: 21, duration: "1h 24m", mood: "Energy", featured: false },
  { title: "Void Walker", tracks: 18, duration: "58m", mood: "Chill", featured: false },
];

const recentTracks = [
  { title: "Shattered Glass", artist: "Neon Ether", album: "Digital Void", duration: "3:45", plays: "1.2M" },
  { title: "Phantom Signal", artist: "Echo Grid", album: "Resonance", duration: "4:12", plays: "867K" },
  { title: "Stellar Drift", artist: "Orion Arc", album: "Parallax", duration: "5:02", plays: "543K" },
  { title: "Neon Cascade", artist: "Lumina X", album: "Ultraviolet", duration: "3:29", plays: "2.1M" },
  { title: "Digital Rain", artist: "Cipher Wave", album: "Syntax", duration: "4:56", plays: "321K" },
  { title: "Solar Wind", artist: "Nova Pulse", album: "Helios", duration: "3:14", plays: "789K" },
];

const albums = [
  { title: "Digital Void", artist: "Neon Ether", year: 2025, tracks: 12 },
  { title: "Resonance", artist: "Echo Grid", year: 2025, tracks: 9 },
  { title: "Parallax", artist: "Orion Arc", year: 2024, tracks: 14 },
  { title: "Ultraviolet", artist: "Lumina X", year: 2024, tracks: 11 },
];

export default function LibraryPage() {
  return (
    <main className="mr-8 pb-36 pt-6">
      <TopNav placeholder="Search your collection..." />

      <div className="px-8">
        {/* Hero title */}
        <section className="mb-12">
          <h2 className="mb-2 font-headline text-6xl font-bold tracking-tighter bg-gradient-to-r from-on-surface to-primary-dim bg-clip-text text-transparent">
            Library
          </h2>
          <p className="font-body font-medium tracking-wide text-on-surface-variant">
            648 Tracks across your cosmic dimensions
          </p>
        </section>

        {/* Playlists bento grid */}
        <section className="mb-16">
          <div className="mb-8 flex items-end justify-between">
            <h3 className="font-headline text-2xl font-bold">Your Playlists</h3>
            <button className="font-label text-xs font-bold uppercase tracking-widest text-primary hover:underline">
              View All
            </button>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {/* Featured large card */}
            <div className="col-span-2 group relative flex h-80 flex-col justify-end overflow-hidden rounded-xl p-8 glass-panel ghost-border">
              <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent opacity-40 transition-opacity group-hover:opacity-70" />
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <span className="material-symbols-outlined text-[200px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                  library_music
                </span>
              </div>
              <div className="relative z-10">
                <span className="mb-2 inline-block rounded-full bg-primary/20 px-3 py-1 font-label text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                  {playlists[0].mood}
                </span>
                <h4 className="font-headline text-3xl font-bold text-white">{playlists[0].title}</h4>
                <p className="mt-1 text-sm text-on-surface-variant">
                  {playlists[0].tracks} tracks · {playlists[0].duration}
                </p>
                <button className="mt-4 flex items-center gap-2 rounded-full bg-primary-container px-6 py-2.5 font-headline text-sm font-bold text-on-primary-fixed transition-all hover:shadow-[0_0_20px_rgba(0,255,255,0.4)]">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                  Play All
                </button>
              </div>
            </div>

            {/* Small cards */}
            <div className="flex flex-col gap-6">
              {playlists.slice(1).map((pl, i) => (
                <div
                  key={i}
                  className="group relative flex h-[calc(50%-12px)] flex-col justify-between overflow-hidden rounded-xl p-6 glass-panel ghost-border transition-all hover:outline-primary/30"
                >
                  <div>
                    <span className="font-label text-[10px] uppercase tracking-widest text-secondary/70">{pl.mood}</span>
                    <h4 className="font-headline text-lg font-bold text-white">{pl.title}</h4>
                    <p className="text-xs text-on-surface-variant">{pl.tracks} tracks · {pl.duration}</p>
                  </div>
                  <button className="flex items-center gap-1 text-xs font-bold text-primary hover:underline">
                    PLAY <span className="material-symbols-outlined text-xs">arrow_forward</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recent tracks */}
        <section className="mb-16">
          <div className="mb-6 flex items-end justify-between">
            <h3 className="font-headline text-2xl font-bold">Recent Tracks</h3>
            <button className="font-label text-xs font-bold uppercase tracking-widest text-primary hover:underline">View All</button>
          </div>
          <div className="rounded-2xl glass-panel ghost-border overflow-hidden">
            <div className="grid grid-cols-[auto_1fr_1fr_auto_auto] gap-4 px-6 py-3 font-label text-[10px] uppercase tracking-widest text-on-surface-variant border-b border-white/5">
              <span>#</span>
              <span>Title</span>
              <span>Album</span>
              <span>Plays</span>
              <span className="material-symbols-outlined text-sm">schedule</span>
            </div>
            {recentTracks.map((track, i) => (
              <div
                key={i}
                className="group grid grid-cols-[auto_1fr_1fr_auto_auto] items-center gap-4 px-6 py-4 transition-colors hover:bg-white/5"
              >
                <span className="w-6 text-center font-label text-sm text-on-surface-variant group-hover:hidden">
                  {i + 1}
                </span>
                <button className="hidden w-6 items-center justify-center group-hover:flex">
                  <span className="material-symbols-outlined text-lg text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                </button>
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-10 w-10 flex-shrink-0 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm text-primary/50">music_note</span>
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-headline font-bold text-on-surface text-sm">{track.title}</p>
                    <p className="truncate text-xs text-on-surface-variant">{track.artist}</p>
                  </div>
                </div>
                <span className="text-sm text-on-surface-variant truncate">{track.album}</span>
                <span className="text-xs text-on-surface-variant">{track.plays}</span>
                <span className="font-label text-xs text-on-surface-variant">{track.duration}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Albums */}
        <section className="mb-16">
          <div className="mb-6 flex items-end justify-between">
            <h3 className="font-headline text-2xl font-bold">Saved Albums</h3>
            <button className="font-label text-xs font-bold uppercase tracking-widest text-primary hover:underline">View All</button>
          </div>
          <div className="grid grid-cols-4 gap-5">
            {albums.map((album, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-xl glass-panel ghost-border p-5 transition-all hover:scale-[1.02] hover:outline-primary/30"
              >
                <div className="mb-4 aspect-square w-full overflow-hidden rounded-lg bg-gradient-to-br from-primary/10 to-secondary/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-5xl text-primary/30" style={{ fontVariationSettings: "'FILL' 1" }}>album</span>
                </div>
                <h4 className="font-headline font-bold text-on-surface">{album.title}</h4>
                <p className="text-sm text-on-surface-variant">{album.artist}</p>
                <p className="font-label text-[10px] text-on-surface-variant/60 mt-1">{album.year} · {album.tracks} tracks</p>
                <button className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary-container text-on-primary-fixed opacity-0 shadow-[0_0_15px_rgba(0,255,255,0.4)] transition-all group-hover:opacity-100">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
