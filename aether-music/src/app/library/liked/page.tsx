import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import SongCard from "@/components/SongCard";
import TopNav from "@/components/TopNav";

export default async function LikedSongsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Lấy danh sách các bài hát mà người dùng đã thả tim
  const { data: likedData, error } = await supabase
    .from("liked_songs")
    .select(`
      songs (
        id,
        title,
        artist,
        song_url,
        image_url,
        genre
      )
    `)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching liked songs:", error);
  }

  // Trích xuất mảng bài hát từ kết quả join
  const likedSongs = likedData
    ?.map((item: any) => item.songs)
    .filter((song: any) => song !== null) || [];

  return (
    <main className="mr-8 pb-36 pt-6 flex-1">
      <TopNav placeholder="Search in your favorites..." />

      <section className="px-8 mt-10">
        <div className="mb-8 flex flex-col md:flex-row md:items-end gap-6">
          <div className="h-48 w-48 flex-shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center shadow-2xl outline outline-1 outline-white/10">
            <span className="material-symbols-outlined text-8xl text-white drop-shadow-[0_0_15px_rgba(188,135,254,0.6)]" style={{ fontVariationSettings: "'FILL' 1" }}>
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
              <span className="text-sm text-on-surface-variant">{likedSongs.length} bài hát</span>
            </div>
          </div>
        </div>

        <div className="h-[1px] w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent mb-10"></div>

        {likedSongs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {likedSongs.map((song: any) => (
              <SongCard key={song.id} song={song} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center flex flex-col items-center">
            <span className="material-symbols-outlined text-6xl text-white/10 mb-4">heart_broken</span>
            <p className="text-on-surface-variant italic">Bạn chưa thả tim bài hát nào. Hãy quay lại khám phá thế giới âm nhạc Nebula nhé!</p>
          </div>
        )}
      </section>
    </main>
  );
}
