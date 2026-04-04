import { redirect } from "next/navigation";
import { auth } from "@/auth";
import TopNav from "@/components/TopNav";
import {
  getUserPlaylists,
  getSavedTracks,
  getBestImage,
  formatDuration,
  type SpotifyPlaylist,
  type SpotifyTrack,
} from "@/lib/spotify";

export default async function LibraryPage() {
  const session = await auth();
  if (!session?.accessToken) redirect("/login");

  const token = session.accessToken;

  const [playlistsData, savedData] = await Promise.all([
    getUserPlaylists(token, 20).catch(() => null),
    getSavedTracks(token, 20).catch(() => null),
  ]);

  const playlists: SpotifyPlaylist[] = playlistsData?.items ?? [];
  const savedTracks: SpotifyTrack[] = savedData?.items?.map((i) => i.track) ?? [];
  const totalSaved = savedData?.total ?? 0;
  const totalPlaylists = playlistsData?.total ?? playlists.length;

  const featuredPlaylist = playlists[0];

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

        {/* Playlists grid */}
        <section className="mb-16">
          <div className="mb-8 flex items-end justify-between">
            <h3 className="font-headline text-2xl font-bold">Your Playlists</h3>
            <button className="font-label text-xs font-bold uppercase tracking-widest text-primary hover:underline">
              View All
            </button>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {/* Featured large card */}
            {featuredPlaylist && (
              <a
                href={featuredPlaylist.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="col-span-2 group relative flex h-80 flex-col justify-end overflow-hidden rounded-xl glass-panel ghost-border"
              >
                {featuredPlaylist.images[0] && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={featuredPlaylist.images[0].url}
                    alt={featuredPlaylist.name}
                    className="absolute inset-0 h-full w-full object-cover opacity-40 transition-transform duration-700 group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-surface-dim via-surface-dim/40 to-transparent" />
                <div className="relative z-10 p-8">
                  <span className="mb-2 inline-block rounded-full bg-primary/20 px-3 py-1 font-label text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                    Playlist
                  </span>
                  <h4 className="font-headline text-3xl font-bold text-white">{featuredPlaylist.name}</h4>
                  <p className="mt-1 text-sm text-on-surface-variant">
                    {featuredPlaylist.tracks.total} tracks · by {featuredPlaylist.owner.display_name}
                  </p>
                  <div className="mt-4 flex items-center gap-2 rounded-full bg-primary-container px-6 py-2.5 font-headline text-sm font-bold text-on-primary-fixed w-fit transition-all hover:shadow-[0_0_20px_rgba(0,255,255,0.4)]">
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>open_in_new</span>
                    Open in Spotify
                  </div>
                </div>
              </a>
            )}

            {/* Small playlist cards */}
            <div className="flex flex-col gap-6">
              {playlists.slice(1, 3).map((pl) => (
                <a
                  key={pl.id}
                  href={pl.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex flex-col justify-between overflow-hidden rounded-xl p-6 glass-panel ghost-border transition-all hover:outline-primary/30 flex-1"
                >
                  {pl.images[0] && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={pl.images[0].url}
                      alt={pl.name}
                      className="absolute inset-0 h-full w-full object-cover opacity-20 group-hover:opacity-30 transition-opacity"
                    />
                  )}
                  <div className="relative z-10">
                    <h4 className="font-headline text-lg font-bold text-white truncate">{pl.name}</h4>
                    <p className="text-xs text-on-surface-variant">{pl.tracks.total} tracks</p>
                  </div>
                  <span className="relative z-10 flex items-center gap-1 text-xs font-bold text-primary hover:underline mt-4">
                    OPEN <span className="material-symbols-outlined text-xs">open_in_new</span>
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* More playlists */}
          {playlists.length > 3 && (
            <div className="mt-4 grid grid-cols-4 gap-4">
              {playlists.slice(3, 7).map((pl) => (
                <a
                  key={pl.id}
                  href={pl.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-xl p-3 glass-panel ghost-border transition-all hover:outline-primary/30"
                >
                  <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg">
                    {pl.images[0] ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={pl.images[0].url} alt={pl.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-primary/10">
                        <span className="material-symbols-outlined text-sm text-primary">queue_music</span>
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-headline text-sm font-bold text-on-surface">{pl.name}</p>
                    <p className="text-[10px] text-on-surface-variant">{pl.tracks.total} tracks</p>
                  </div>
                </a>
              ))}
            </div>
          )}
        </section>

        {/* Saved tracks */}
        <section className="mb-16">
          <div className="mb-6 flex items-end justify-between">
            <h3 className="font-headline text-2xl font-bold">
              Liked Songs
              <span className="ml-3 font-label text-sm font-normal text-on-surface-variant">
                {totalSaved.toLocaleString()} total
              </span>
            </h3>
          </div>
          <div className="rounded-2xl glass-panel ghost-border overflow-hidden">
            <div className="grid grid-cols-[auto_1fr_1fr_auto_auto] gap-4 px-6 py-3 font-label text-[10px] uppercase tracking-widest text-on-surface-variant border-b border-white/5">
              <span>#</span>
              <span>Title</span>
              <span>Album</span>
              <span>Popularity</span>
              <span className="material-symbols-outlined text-sm">schedule</span>
            </div>
            {savedTracks.map((track, i) => (
              <a
                key={track.id}
                href={track.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid grid-cols-[auto_1fr_1fr_auto_auto] items-center gap-4 px-6 py-4 transition-colors hover:bg-white/5"
              >
                <span className="w-6 text-center font-label text-sm text-on-surface-variant group-hover:hidden">
                  {i + 1}
                </span>
                <span className="hidden w-6 items-center justify-center group-hover:flex">
                  <span className="material-symbols-outlined text-lg text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                </span>
                <div className="flex items-center gap-3 min-w-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={getBestImage(track.album.images, 40)}
                    alt={track.name}
                    className="h-10 w-10 flex-shrink-0 rounded-lg object-cover"
                  />
                  <div className="min-w-0">
                    <p className="truncate font-headline font-bold text-on-surface text-sm">{track.name}</p>
                    <p className="truncate text-xs text-on-surface-variant">
                      {track.artists.map((a) => a.name).join(", ")}
                    </p>
                  </div>
                </div>
                <span className="text-sm text-on-surface-variant truncate">{track.album.name}</span>
                <div className="w-16 h-1 rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                    style={{ width: `${track.popularity}%` }}
                  />
                </div>
                <span className="font-label text-xs text-on-surface-variant">{formatDuration(track.duration_ms)}</span>
              </a>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
