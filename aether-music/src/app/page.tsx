import TopNav from "@/components/TopNav";
import { createClient } from "@/lib/supabase/server";
import SongCard from "@/components/SongCard";
import HeroPlayButton from "@/components/HeroPlayButton";

export default async function DiscoverPage() {
  const supabase = await createClient();

  const { data: songs, error } = await supabase
    .from("songs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching songs:", error);
  }

  const allSongs = songs || [];
  
  // High-End Spotlight / Featured Release
  const heroSong = allSongs[0];

  return (
    <main className="mr-8 pb-36 pt-4 page-transition">
      <TopNav placeholder="Search the nebula..." />

      {/* Hero: Editorial Spotlight */}
      <section className="mb-24 px-12 relative overflow-hidden">
        {/* Asymmetrical background decorative element */}
        <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-primary/10 blur-[150px] animate-pulse" />
        <div className="absolute left-1/4 top-1/2 h-64 w-64 rounded-full bg-secondary/10 blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="flex flex-col lg:flex-row gap-16 items-center">
            {/* Editorial Typography */}
            <div className="flex-1 z-10">
                <span className="mb-8 inline-flex items-center gap-3 rounded-full bg-white/5 pr-6 pl-2 py-2 font-label text-[10px] font-bold uppercase tracking-[0.4em] text-primary backdrop-blur-md outline outline-1 outline-white/10">
                    <span className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-[#0e0c1f]">
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>energy_savings_leaf</span>
                    </span>
                    Celestial Spotlight
                </span>
                
                {heroSong ? (
                   <div className="relative">
                        <h1 className="text-editorial-lg text-gradient drop-shadow-2xl mb-8">
                            {heroSong.title.split(' ')[0]}<br />
                            <span className="ml-12 lg:ml-24">{heroSong.title.split(' ').slice(1).join(' ') || "SONIC"}</span>
                        </h1>
                        <div className="flex items-center gap-10 mt-12">
                            <div className="flex flex-col">
                                <p className="font-label text-xs font-bold uppercase tracking-[0.4em] text-on-surface-variant/40 mb-1">Conductor</p>
                                <p className="font-headline text-2xl font-bold text-on-surface">{heroSong.artist}</p>
                            </div>
                            <div className="h-10 w-[1px] bg-white/10" />
                            <div className="flex flex-col">
                                <p className="font-label text-xs font-bold uppercase tracking-[0.4em] text-on-surface-variant/40 mb-1">Frequency</p>
                                <p className="font-headline text-2xl font-bold text-primary">{heroSong.genre}</p>
                            </div>
                        </div>
                   </div>
                ) : (
                    <h1 className="text-editorial-lg text-gradient drop-shadow-2xl">
                        AETHER<br />
                        <span className="ml-24">MUSIC</span>
                    </h1>
                )}
            </div>

            {/* Asymmetrical Hero Image Layering */}
            <div className="relative w-full lg:w-[45%] aspect-[4/5] z-10 flex">
                <div className="absolute -inset-4 rounded-[40px] bg-gradient-to-tr from-primary/20 to-secondary/20 blur-2xl opacity-40 animate-pulse" />
                
                <div className="relative group w-[85%] ml-auto aspect-[3/4] overflow-hidden rounded-[40px] glass-panel-elevated ghost-border transition-all duration-700 hover:rotate-1 hover:scale-[1.02]">
                    {heroSong?.image_url ? (
                        <img
                        src={heroSong.image_url}
                        alt={heroSong.title}
                        className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                    ) : (
                        <div className="h-full w-full bg-gradient-to-br from-surface-container to-surface flex items-center justify-center">
                            <span className="material-symbols-outlined text-8xl text-primary/10">music_note</span>
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-dim via-transparent to-transparent opacity-60" />
                    
                    {/* Play button integrated into hero image corner */}
                    {heroSong && (
                         <div className="absolute bottom-10 right-10 flex flex-col items-end gap-4">
                            <HeroPlayButton song={heroSong} />
                         </div>
                    )}
                </div>

                {/* Overlapping element for asymmetry */}
                <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-[32px] glass-panel p-6 ghost-border shadow-2xl z-20 group hover:translate-y-2 transition-transform duration-700 hidden lg:block">
                    <span className="material-symbols-outlined text-primary text-3xl mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>slow_motion_video</span>
                    <p className="font-headline text-lg font-bold leading-tight mb-2">Immersive Audio</p>
                    <p className="font-label text-[10px] text-on-surface-variant font-medium leading-relaxed">Spatial nebulae for the soul.</p>
                </div>
            </div>
        </div>
      </section>

      {/* Rhythmic Collection Grid */}
      <section className="mb-24 px-12 relative">
        <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-headline font-bold tracking-tighter flex items-center gap-4">
                Curated Collections
                <span className="h-[2px] w-24 bg-gradient-to-r from-primary/60 to-transparent" />
            </h2>
            <button className="px-6 py-2 rounded-full glass-panel ghost-border text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant hover:text-primary hover:border-primary/40 transition-all duration-300">
                Explore Full Archive
            </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {allSongs.map((song: any) => (
            <SongCard key={song.id} song={song} />
          ))}
          {allSongs.length === 0 && (
            <div className="col-span-4 py-32 rounded-[40px] bg-white/5 border border-dashed border-white/10 flex flex-col items-center justify-center">
              <span className="material-symbols-outlined text-6xl text-on-surface-variant/20 mb-4">music_off</span>
              <p className="text-on-surface-variant/40 italic font-medium">Empty orbits... The collection is currently clear.</p>
            </div>
          )}
        </div>
      </section>

      {/* Atmospheric Category Banners */}
      <section className="px-12 pb-24 relative overflow-hidden">
        <h2 className="text-4xl font-headline font-bold tracking-tighter mb-12">Nebula Frequency</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Electronic", desc: "Digital pulse frequencies", icon: "bolt", color: "from-[#00ffff]/20" },
            { name: "Synthwave", desc: "Retro-futuristic resonance", icon: "layers", color: "from-[#bc87fe]/20" },
            { name: "Ambient", desc: "Atmospheric sonic flow", icon: "cloud", color: "from-[#ff9dac]/20" }
          ].map((cat) => (
            <div
              key={cat.name}
              className="group relative h-64 overflow-hidden rounded-[32px] glass-panel-elevated ghost-border transition-all duration-700 hover:-translate-y-2 cursor-pointer"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
              <div className="relative z-10 flex h-full flex-col p-10 justify-between">
                <div className="flex justify-between items-start">
                    <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-500">
                        <span className="material-symbols-outlined text-2xl text-on-surface-variant group-hover:text-white transition-colors">{cat.icon}</span>
                    </div>
                    <span className="material-symbols-outlined text-white/10 group-hover:text-primary/20 text-5xl transition-colors duration-700">call_made</span>
                </div>
                <div>
                    <h4 className="font-headline text-2xl font-bold text-white tracking-widest uppercase mb-1">
                        {cat.name}
                    </h4>
                    <p className="font-label text-[11px] font-bold text-on-surface-variant tracking-[0.2em] group-hover:text-white/60 transition-colors">{cat.desc.toUpperCase()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
