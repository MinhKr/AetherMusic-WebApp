import { redirect } from "next/navigation";
import Link from "next/link";
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

  // Lấy dữ liệu bài hát đã thích (để đếm và hiển thị tab Liked)
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
      <main className="mr-8 pb-36 pt-6 flex-1 text-on-surface">
        <TopNav placeholder="Search your favorites..." />
        
        <section className="px-8 mt-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Link href="/library" className="group mb-8 flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-xl transition-transform group-hover:-translate-x-1">arrow_back</span>
            <span className="font-label text-xs font-bold uppercase tracking-widest">Back to Library</span>
          </Link>

          <div className="mb-10 flex flex-col md:flex-row md:items-end gap-6">
            <div className="h-40 w-40 flex-shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center shadow-2xl outline outline-1 outline-white/10">
              <span className="material-symbols-outlined text-7xl text-white drop-shadow-[0_0_15px_rgba(188,135,254,0.6)]" style={{ fontVariationSettings: "'FILL' 1" }}>
                favorite
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-label text-xs font-bold uppercase tracking-[0.2em] text-primary">Playlist</span>
              <h2 className="font-headline text-5xl font-extrabold tracking-tighter text-on-surface">
                Liked Songs
              </h2>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm font-bold text-on-surface/80">{user.email}</span>
                <span className="h-1 w-1 rounded-full bg-on-surface/30"></span>
                <span className="text-sm text-on-surface-variant uppercase tracking-widest text-[10px]">{likedSongsCount || 0} TRACKS</span>
              </div>
            </div>
          </div>
          <div className="h-[1px] w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent mb-10"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {likedSongs.map((song: any) => <SongCard key={song.id} song={song} />)}
          </div>
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
      <main className="mr-8 pb-36 pt-6 flex-1 text-on-surface">
        <TopNav placeholder={`Search in ${playlist.title}...`} />
        <section className="px-8 mt-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Link href="/library" className="group mb-8 flex items-center gap-2 text-on-surface-variant hover:text-secondary transition-colors">
            <span className="material-symbols-outlined text-xl transition-transform group-hover:-translate-x-1">arrow_back</span>
            <span className="font-label text-xs font-bold uppercase tracking-widest">Back to Library</span>
          </Link>

          <div className="mb-10 flex flex-col md:flex-row md:items-end gap-6">
            <div className="h-40 w-40 flex-shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-secondary/30 to-primary/30 flex items-center justify-center shadow-2xl outline outline-1 outline-white/10">
              <span className="material-symbols-outlined text-7xl text-white drop-shadow-[0_0_15px_rgba(0,255,255,0.4)]" style={{ fontVariationSettings: "'FILL' 1" }}>
                library_music
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-label text-xs font-bold uppercase tracking-[0.2em] text-secondary">Playlist</span>
              <h2 className="font-headline text-5xl font-extrabold tracking-tighter text-on-surface truncate max-w-2xl text-white">
                {playlist.title}
              </h2>
              <p className="text-sm text-on-surface-variant max-w-xl">{playlist.description || "Celestial collection"}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] text-on-surface-variant uppercase tracking-widest">{songs.length} TRACKS</span>
              </div>
            </div>
          </div>
          <div className="h-[1px] w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent mb-10"></div>
          {songs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {songs.map((song: any) => <SongCard key={song.id} song={song} />)}
            </div>
          ) : (
            <div className="py-20 text-center flex flex-col items-center opacity-40">
              <span className="material-symbols-outlined text-6xl mb-4">music_note_off</span>
              <p className="text-on-surface-variant italic">Album này chưa có nhạc. Hãy thêm bài hát vào đây nhé!</p>
            </div>
          )}
        </section>
      </main>
    );
  }

  // CHẾ ĐỘ 3: DASHBOARD CHÍNH
  return (
    <main className="mr-8 pb-36 pt-6 flex-1">
      <TopNav placeholder="Search your library..." />
      <LibraryDashboard 
        likedSongsCount={likedSongsCount || 0} 
        playlists={playlists || []} 
      />
    </main>
  );
}
