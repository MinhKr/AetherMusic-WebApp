import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import TopNav from "@/components/TopNav";
import SongCard from "@/components/SongCard";
import LibraryDashboard from "@/components/LibraryDashboard";

export default async function LibraryPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const resolvedParams = await searchParams;
  const view = resolvedParams.view;
  const playlistId = resolvedParams.id as string;

  // Lấy dữ liệu bài hát đã thích
  const { data: likedData, count: likedSongsCount } = await supabase
    .from("liked_songs")
    .select(`
      songs (*)
    `, { count: "exact" })
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  // Lấy danh sách Playlist của người dùng
  const { data: playlists } = await supabase
    .from("playlists")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  // CHẾ ĐỘ 1: TAB LIKED SONGS
  if (view === "liked") {
    const likedSongs = likedData
      ?.map((item: any) => item.songs)
      .filter((song: any) => song !== null) || [];

    return (
      <main className="mr-8 pb-36 pt-4 page-transition flex-1 text-on-surface">
        <TopNav placeholder="Search your favorites..." />
        
        <section className="px-12 mt-8 animate-in fade-in slide-in-from-bottom-6 duration-1000">
          <Link href="/library" className="group mb-12 inline-flex items-center gap-3 text-on-surface-variant hover:text-primary transition-all duration-500">
            <div className="h-8 w-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary/40 group-hover:translate-x-[-4px] transition-all">
                <span className="material-symbols-outlined text-sm">arrow_back</span>
            </div>
            <span className="font-label text-[10px] font-bold uppercase tracking-[0.3em]">Return to Core Library</span>
          </Link>

          <div className="mb-20 flex flex-col lg:flex-row lg:items-end gap-16 relative">
             {/* Large Decorative Liked Symbol */}
             <div className="absolute -left-10 -top-10 opacity-[0.03] pointer-events-none">
                <span className="material-symbols-outlined text-[300px]">favorite</span>
             </div>

            <div className="relative group perspective-1000">
                <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-tr from-primary to-secondary blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-1000 animate-pulse" />
                <div className="relative h-56 w-56 flex-shrink-0 overflow-hidden rounded-[3rem] glass-panel-elevated ghost-border flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-700">
                    <span className="material-symbols-outlined text-[100px] text-primary drop-shadow-[0_0_30px_rgba(0,255,255,0.6)]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        favorite
                    </span>
                </div>
            </div>

            <div className="flex flex-col gap-4 z-10">
              <span className="font-label text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-2 inline-flex items-center gap-3">
                <span className="h-4 w-4 rounded-full bg-primary/20" />
                Celestial Resonance Collection
              </span>
              <h2 className="text-editorial-lg text-gradient leading-[0.8]">
                Liked<br />
                <span className="ml-12 lg:ml-24">Songs</span>
              </h2>
              <div className="flex items-center gap-6 mt-6">
                <div className="flex items-center gap-3 px-4 py-2 rounded-full glass-panel border border-white/5 shadow-xl">
                    <div className="h-6 w-6 rounded-full bg-surface-container-high border border-white/10 overflow-hidden">
                        {user.user_metadata?.avatar_url && <Image src={user.user_metadata.avatar_url} alt="User" width={24} height={24} />}
                    </div>
                    <span className="font-label text-[9px] font-bold tracking-widest text-on-surface uppercase">{user.email?.split('@')[0]}</span>
                </div>
                <span className="font-label text-[10px] font-black tracking-[0.2em] text-on-surface-variant/40 italic uppercase">{likedSongsCount || 0} ARCHIVED TRACKS</span>
              </div>
            </div>
          </div>

          <div className="h-[2px] w-full bg-gradient-to-r from-primary/20 via-white/5 to-transparent mb-16 rounded-full" />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {likedSongs.map((song: any) => <SongCard key={song.id} song={song} />)}
          </div>

          {likedSongs.length === 0 && (
            <div className="py-40 text-center flex flex-col items-center opacity-20">
                <span className="material-symbols-outlined text-8xl mb-6">heart_broken</span>
                <p className="font-headline text-2xl font-bold tracking-tighter">Negative Resonance.</p>
                <p className="font-label text-xs uppercase tracking-widest mt-2 font-bold">Initiate exploration to capture signals.</p>
            </div>
          )}
        </section>
      </main>
    );
  }

  // CHẾ ĐỘ 2: TAB PLAYLIST CÁ NHÂN
  if (view === "playlist" && playlistId) {
    const { data: playlist } = await supabase.from("playlists").select("*").eq("id", playlistId).single();
    const { data: playlistSongsData } = await supabase
      .from("playlist_songs")
      .select("songs(*)")
      .eq("playlist_id", playlistId);
    
    const songs = playlistSongsData?.map((item: any) => item.songs).filter(Boolean) || [];

    if (!playlist) return redirect("/library");

    return (
      <main className="mr-8 pb-36 pt-4 page-transition flex-1 text-on-surface">
        <TopNav placeholder={`Search in ${playlist.title}...`} />
        
        <section className="px-12 mt-8 animate-in fade-in slide-in-from-bottom-6 duration-1000">
          <Link href="/library" className="group mb-12 inline-flex items-center gap-3 text-on-surface-variant hover:text-secondary transition-all duration-500">
            <div className="h-8 w-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-secondary/40 group-hover:translate-x-[-4px] transition-all">
                <span className="material-symbols-outlined text-sm">arrow_back</span>
            </div>
            <span className="font-label text-[10px] font-bold uppercase tracking-[0.3em]">Return to Core Library</span>
          </Link>

          <div className="mb-20 flex flex-col lg:flex-row lg:items-end gap-16 relative">
             <div className="absolute -left-10 -top-10 opacity-[0.03] pointer-events-none">
                <span className="material-symbols-outlined text-[300px]">auto_stories</span>
             </div>

            <div className="relative group perspective-1000">
                <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-tr from-secondary/20 to-primary/20 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-1000 animate-pulse" />
                <div className="relative h-56 w-56 flex-shrink-0 overflow-hidden rounded-[3rem] glass-panel-elevated ghost-border flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:rotate-[-3deg] transition-all duration-700">
                    <span className="material-symbols-outlined text-[100px] text-secondary drop-shadow-[0_0_30px_rgba(188,135,254,0.6)]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        library_music
                    </span>
                </div>
            </div>

            <div className="flex flex-col gap-4 z-10 w-full overflow-hidden">
              <span className="font-label text-[10px] font-black uppercase tracking-[0.4em] text-secondary mb-2 inline-flex items-center gap-3">
                <span className="h-4 w-4 rounded-full bg-secondary/20" />
                Custom Habitat Module
              </span>
              <h2 className="text-6xl lg:text-7xl font-headline font-black tracking-tighter text-gradient leading-[0.85] truncate max-w-full pb-2">
                {playlist.title}
              </h2>
              <p className="font-body text-lg text-on-surface-variant/60 max-w-2xl mt-2 line-clamp-2 leading-relaxed italic">{playlist.description || "A curated habitat for celestial frequencies."}</p>
              
              <div className="flex items-center gap-6 mt-6">
                <div className="flex items-center gap-3 px-4 py-2 rounded-full glass-panel border border-white/5 shadow-xl">
                    <span className="font-label text-[9px] font-bold tracking-widest text-secondary uppercase">Active Habitat</span>
                </div>
                <span className="font-label text-[10px] font-black tracking-[0.2em] text-on-surface-variant/40 uppercase">{songs.length} ARCHIVED TRACKS</span>
              </div>
            </div>
          </div>

          <div className="h-[2px] w-full bg-gradient-to-r from-secondary/20 via-white/5 to-transparent mb-16 rounded-full" />
          
          {songs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
              {songs.map((song: any) => <SongCard key={song.id} song={song} />)}
            </div>
          ) : (
            <div className="py-40 text-center flex flex-col items-center opacity-20">
                <span className="material-symbols-outlined text-8xl mb-6">sensors_off</span>
                <p className="font-headline text-2xl font-bold tracking-tighter">Quiet Habitat.</p>
                <p className="font-label text-xs uppercase tracking-widest mt-2 font-bold italic">Inject signals to populate this coordinate.</p>
            </div>
          )}
        </section>
      </main>
    );
  }

  // CHẾ ĐỘ 3: DASHBOARD CHÍNH (Handled by component)
  return (
    <main className="mr-8 pb-36 pt-4 page-transition flex-1">
      <TopNav placeholder="Search your library..." />
      <LibraryDashboard 
        likedSongsCount={likedSongsCount || 0} 
        playlists={playlists || []} 
      />
    </main>
  );
}
