import { auth } from "@/auth";
import TopNav from "@/components/TopNav";
import { supabase } from "@/lib/supabase";

import SongCard from "@/components/SongCard";
import HeroPlayButton from "@/components/HeroPlayButton";

export default async function DiscoverPage() {
  const { data: songs, error } = await supabase
    .from("songs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching songs:", error);
  }

  const allSongs = songs || [];
  
  // Dùng bài hát đầu tiên làm Hero spotlight
  const heroSong = allSongs[0];

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
          <div
            className="col-span-12 group relative overflow-hidden rounded-3xl outline outline-1 outline-white/10 shadow-2xl"
            style={{ aspectRatio: "21/7" }}
          >
            {heroSong?.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={heroSong.image_url}
                alt={heroSong.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-surface-dim via-surface-dim/40 to-transparent" />
            <div className="absolute bottom-0 left-0 flex w-full items-end justify-between p-10">
              <div>
                <span className="mb-4 inline-block rounded-full bg-primary/20 px-3 py-1 font-label text-[10px] font-bold uppercase tracking-[0.2em] text-primary backdrop-blur-md">
                   Featured Release
                </span>
                {heroSong ? (
                  <>
                    <h3 className="font-headline text-5xl font-extrabold leading-tight text-white">
                      {heroSong.title.toUpperCase()}
                    </h3>
                    <p className="mt-2 max-w-md font-body text-white/70">
                      {heroSong.artist} · {heroSong.genre}
                    </p>
                  </>
                ) : (
                  <h3 className="font-headline text-5xl font-extrabold leading-tight text-white">
                    DISCOVER
                    <br />
                    NEBULA
                  </h3>
                )}
              </div>
              {heroSong && <HeroPlayButton song={heroSong} />}
            </div>
          </div>
        </div>
      </section>

      {/* Our Collection */}
      <section className="mb-12 px-8">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-headline text-2xl font-bold tracking-tighter text-on-surface">
            Our Collection
          </h2>
          <button className="font-label text-xs font-bold uppercase tracking-widest text-primary hover:underline">
            View All
          </button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {allSongs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
          {allSongs.length === 0 && (
            <div className="col-span-4 py-20 text-center">
              <p className="text-on-surface-variant italic">Empty orbits... Upload some music to start your journey.</p>
            </div>
          )}
        </div>
      </section>
      {/* Categories */}
      <section className="px-8">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-headline text-2xl font-bold tracking-tighter text-on-surface">
            Browse Nebula
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {["Electronic", "Synthwave", "Vaporwave"].map((category) => (
            <div
              key={category}
              className="group relative h-40 overflow-hidden rounded-2xl bg-surface-container-low/40 backdrop-blur-xl outline outline-1 outline-white/10 transition-all duration-300 hover:outline-primary/30 cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-50 transition-opacity group-hover:opacity-100" />
              <div className="relative z-10 flex h-full flex-col items-center justify-center p-6">
                <h4 className="font-headline text-2xl font-bold text-white tracking-widest">
                  {category.toUpperCase()}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
