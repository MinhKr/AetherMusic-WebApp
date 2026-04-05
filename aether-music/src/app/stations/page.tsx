const GENRE_STATIONS = [
  { genre: "synth-pop", label: "Synth Pop", icon: "radio", mood: "Focus" },
  { genre: "ambient", label: "Ambient", icon: "waves", mood: "Chill" },
  { genre: "electronic", label: "Electronic", icon: "electric_bolt", mood: "Energy" },
  { genre: "jazz", label: "Jazz", icon: "piano", mood: "Chill" },
  { genre: "pop", label: "Pop", icon: "star", mood: "Energy" },
  { genre: "deep-house", label: "Deep House", icon: "speaker", mood: "Focus" },
];

const moodColors: Record<string, string> = {
  Focus: "bg-primary/20 text-primary",
  Chill: "bg-secondary/20 text-secondary",
  Energy: "bg-tertiary/20 text-tertiary",
};

export default async function StationsPage() {
  // Tạm thời để dữ liệu trống, giữ lại khung UI làm placeholder
  const personalTracks: any[] = [];
  const elecTracks: any[] = [];
  const ambTracks: any[] = [];

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
                Aether Frequencies · Standalone Mode
              </span>
            </div>
          </div>
        </header>

        {/* Genre stations grid */}
        <section className="mb-12">
          <h3 className="mb-6 font-headline text-2xl font-bold">Genre Stations</h3>
          <div className="grid grid-cols-3 gap-5">
            {GENRE_STATIONS.map((station) => (
              <div
                key={station.genre}
                className="group relative overflow-hidden rounded-2xl glass-panel ghost-border p-6 transition-all duration-300 hover:outline-primary/30 hover:shadow-[0_0_20px_rgba(188,135,254,0.1)] cursor-pointer"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-secondary/20">
                    <span className="material-symbols-outlined text-xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                      {station.icon}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary shadow-[0_0_6px_#00ffff]" />
                    <span className="font-label text-[10px] text-primary">LIVE</span>
                  </div>
                </div>
                <h4 className="font-headline font-bold text-on-surface">{station.label}</h4>
                <p className="mt-1 text-sm text-on-surface-variant">Independent Stream</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className={`rounded-full px-2.5 py-0.5 font-label text-[10px] font-bold ${moodColors[station.mood]}`}>
                    {station.mood}
                  </span>
                  <button className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-container text-on-primary-fixed opacity-0 transition-all group-hover:opacity-100 hover:shadow-[0_0_12px_rgba(0,255,255,0.4)]">
                    <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Placeholder for personalized frequency */}
        <section className="rounded-3xl glass-panel ghost-border p-12 flex flex-col items-center justify-center text-center">
            <span className="material-symbols-outlined text-5xl text-primary/30 mb-4 animate-bounce">
                leak_add
            </span>
            <h3 className="font-headline text-2xl font-bold">Frequency Unreachable</h3>
            <p className="mt-2 text-on-surface-variant max-w-sm">
                Personalized stations require a standalone profile. 
                We are currently recalibrating the cosmic radio for independent broadcast.
            </p>
            <div className="mt-6 flex gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
            </div>
        </section>
      </div>
    </main>
  );
}
