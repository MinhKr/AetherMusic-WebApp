import TopNav from "@/components/TopNav";

const liveStations = [
  {
    name: "Neon Frequencies",
    genre: "Synthwave",
    listeners: "12.4K",
    description: "Pure analog dreams and digital echoes",
    mood: "Focus",
    active: true,
  },
  {
    name: "Void Transmissions",
    genre: "Ambient",
    listeners: "8.7K",
    description: "Infinite reverb from the edge of known space",
    mood: "Chill",
    active: false,
  },
  {
    name: "Pulse Reactor",
    genre: "Techno",
    listeners: "21.2K",
    description: "Industrial rhythms forged in the digital furnace",
    mood: "Energy",
    active: false,
  },
  {
    name: "Stellar Jazz",
    genre: "Jazz Fusion",
    listeners: "5.3K",
    description: "Cosmic harmonics improvised beyond the stars",
    mood: "Chill",
    active: false,
  },
  {
    name: "Quantum Pop",
    genre: "Hyperpop",
    listeners: "34.1K",
    description: "Supercharged anthems from the multiverse",
    mood: "Energy",
    active: false,
  },
  {
    name: "Deep Current",
    genre: "Deep House",
    listeners: "9.6K",
    description: "Subterranean grooves from the ocean floor",
    mood: "Focus",
    active: false,
  },
];

const genres = ["All", "Synthwave", "Ambient", "Techno", "Jazz Fusion", "Hyperpop", "Deep House"];

const moodColors: Record<string, string> = {
  Focus: "bg-primary/20 text-primary",
  Chill: "bg-secondary/20 text-secondary",
  Energy: "bg-tertiary/20 text-tertiary",
};

export default function StationsPage() {
  return (
    <main className="mr-8 pb-36 pt-6">
      <div className="px-8">
        {/* Header */}
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="font-headline text-4xl font-bold tracking-tight text-white">Stations</h2>
            <div className="mt-1 flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-primary shadow-[0_0_8px_#00ffff]" />
              <span className="font-label text-xs uppercase tracking-widest text-primary">
                Live Now: 12,482 Tuned In
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/40 transition-colors group-focus-within:text-primary">
                search
              </span>
              <input
                className="w-64 rounded-full border-0 bg-surface-container-lowest/20 py-2.5 pl-12 pr-6 text-sm backdrop-blur-md outline outline-1 outline-white/15 focus:outline-primary/40 focus:ring-0 transition-all"
                placeholder="Search frequencies..."
                type="text"
              />
            </div>
            <button className="flex h-10 w-10 items-center justify-center rounded-full text-white/70 transition-all hover:bg-white/10 hover:text-secondary">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-full text-white/70 transition-all hover:bg-white/10 hover:text-secondary">
              <span className="material-symbols-outlined">settings</span>
            </button>
          </div>
        </header>

        {/* Genre filter */}
        <div className="mb-10 flex gap-3 overflow-x-auto no-scrollbar">
          {genres.map((genre, i) => (
            <button
              key={genre}
              className={`flex-shrink-0 rounded-full px-5 py-2 font-label text-sm font-bold transition-all ${
                i === 0
                  ? "bg-primary-container text-on-primary-fixed shadow-[0_0_15px_rgba(0,255,255,0.3)]"
                  : "bg-surface-container text-on-surface-variant outline outline-1 outline-white/10 hover:bg-surface-container-high hover:text-on-surface"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Featured live station */}
        <section className="mb-12">
          <div className="relative overflow-hidden rounded-3xl p-8 glass-panel ghost-border">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10" />
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/30">
                  <span className="material-symbols-outlined text-4xl text-primary animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>
                    radio
                  </span>
                  <div className="absolute -inset-1 rounded-2xl border border-primary/30 animate-ping opacity-20" />
                </div>
                <div>
                  <span className="font-label text-[10px] uppercase tracking-widest text-primary">Now Featured</span>
                  <h3 className="font-headline text-3xl font-bold text-white">{liveStations[0].name}</h3>
                  <p className="text-on-surface-variant">{liveStations[0].description}</p>
                  <div className="mt-2 flex items-center gap-3">
                    <span className="font-label text-xs text-secondary">{liveStations[0].genre}</span>
                    <span className="h-1 w-1 rounded-full bg-on-surface-variant" />
                    <span className="font-label text-xs text-on-surface-variant">{liveStations[0].listeners} listening</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-container text-on-primary-fixed shadow-[0_0_20px_rgba(0,255,255,0.4)] transition-all hover:scale-105">
                  <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                </button>
                <button className="flex h-10 w-10 items-center justify-center rounded-full text-white/60 transition-all hover:bg-white/10 hover:text-secondary">
                  <span className="material-symbols-outlined">bookmark_add</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* All stations grid */}
        <section>
          <div className="mb-6 flex items-end justify-between">
            <h3 className="font-headline text-2xl font-bold">All Stations</h3>
            <span className="font-label text-xs text-on-surface-variant">{liveStations.length} broadcasting</span>
          </div>
          <div className="grid grid-cols-3 gap-5">
            {liveStations.map((station, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl glass-panel ghost-border p-6 transition-all duration-300 hover:outline-primary/30 hover:shadow-[0_0_20px_rgba(188,135,254,0.1)]"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-secondary/20">
                    <span className="material-symbols-outlined text-xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>radio</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary shadow-[0_0_6px_#00ffff]" />
                    <span className="font-label text-[10px] text-primary">{station.listeners}</span>
                  </div>
                </div>

                <h4 className="font-headline font-bold text-on-surface">{station.name}</h4>
                <p className="mt-1 text-sm text-on-surface-variant line-clamp-2">{station.description}</p>

                <div className="mt-3 flex items-center justify-between">
                  <span className={`rounded-full px-2.5 py-0.5 font-label text-[10px] font-bold ${moodColors[station.mood]}`}>
                    {station.genre}
                  </span>
                  <button className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-container text-on-primary-fixed opacity-0 transition-all group-hover:opacity-100 hover:shadow-[0_0_12px_rgba(0,255,255,0.4)]">
                    <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
