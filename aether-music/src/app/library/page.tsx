import TopNav from "@/components/TopNav";

export default async function LibraryPage() {
  // Tạm thời để trống dữ liệu Spotify cũ, giữ lại khung UI làm placeholder
  const playlists: any[] = [];
  const savedTracks: any[] = [];
  const totalSaved = 0;
  const totalPlaylists = 0;

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
            {totalSaved.toLocaleString()} saved tracks · {totalPlaylists} playlists
          </p>
        </section>

        {/* Empty State Placeholder */}
        <section className="flex flex-col items-center justify-center py-20 rounded-3xl glass-panel ghost-border border-dashed border-2 border-white/5">
          <span className="material-symbols-outlined text-6xl text-primary/20 mb-4">
            library_music
          </span>
          <h3 className="font-headline text-2xl font-bold text-on-surface">The Nebula is Quiet</h3>
          <p className="mt-2 text-on-surface-variant text-center max-w-md">
            We've transitioned to a standalone platform. Your Spotify library is no longer synced. 
            Stay tuned for our internal library system!
          </p>
          <button className="mt-8 rounded-full bg-surface-container-high px-8 py-3 font-headline text-sm font-bold text-primary hover:bg-surface-container-highest transition-colors">
            Coming Soon
          </button>
        </section>

        {/* Playlists grid (Placeholder) */}
        <section className="mt-16 opacity-30 pointer-events-none grayscale">
          <div className="mb-8 flex items-end justify-between">
            <h3 className="font-headline text-2xl font-bold text-white/50">Your Playlists</h3>
          </div>
          <div className="grid grid-cols-3 gap-6">
            <div className="h-40 rounded-xl glass-panel ghost-border flex items-center justify-center">
              <span className="text-xs uppercase tracking-widest text-white/20">Empty Orbit</span>
            </div>
            <div className="h-40 rounded-xl glass-panel ghost-border flex items-center justify-center">
              <span className="text-xs uppercase tracking-widest text-white/20">Empty Orbit</span>
            </div>
            <div className="h-40 rounded-xl glass-panel ghost-border flex items-center justify-center">
              <span className="text-xs uppercase tracking-widest text-white/20">Empty Orbit</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
