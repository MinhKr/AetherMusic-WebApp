import { redirect } from "next/navigation";
import { auth } from "@/auth";
import TopNav from "@/components/TopNav";
import {
  getNewReleases,
  getFeaturedPlaylists,
  getUserTopTracks,
  getBestImage,
  formatDuration,
  type SpotifyAlbum,
  type SpotifyPlaylist,
  type SpotifyTrack,
} from "@/lib/spotify";

export default async function DiscoverPage() {
  const session = await auth();
  if (!session?.accessToken) redirect("/login");

  const token = session.accessToken;

  const [newReleasesData, featuredData, topTracksData] = await Promise.all([
    getNewReleases(token, 8).catch(() => null),
    getFeaturedPlaylists(token, 6).catch(() => null),
    getUserTopTracks(token, 5).catch(() => null),
  ]);

  const newReleases: SpotifyAlbum[] = newReleasesData?.albums?.items ?? [];
  const featuredPlaylists: SpotifyPlaylist[] = featuredData?.playlists?.items ?? [];
  const topTracks: SpotifyTrack[] = topTracksData?.items ?? [];

  // Hero spotlight: dùng album đầu tiên
  const heroAlbum = newReleases[0];

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
            className="col-span-8 group relative overflow-hidden rounded-3xl outline outline-1 outline-white/10 shadow-2xl"
            style={{ aspectRatio: "21/9" }}
          >
            {heroAlbum ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={getBestImage(heroAlbum.images, 640)}
                alt={heroAlbum.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-surface-dim via-surface-dim/40 to-transparent" />
            <div className="absolute bottom-0 left-0 flex w-full items-end justify-between p-10">
              <div>
                <span className="mb-4 inline-block rounded-full bg-primary/20 px-3 py-1 font-label text-[10px] font-bold uppercase tracking-[0.2em] text-primary backdrop-blur-md">
                  New Release
                </span>
                {heroAlbum ? (
                  <>
                    <h3 className="font-headline text-5xl font-extrabold leading-tight text-white">
                      {heroAlbum.name.toUpperCase()}
                    </h3>
                    <p className="mt-2 max-w-md font-body text-white/70">
                      {heroAlbum.artists.map((a) => a.name).join(", ")} · {heroAlbum.total_tracks} tracks
                    </p>
                  </>
                ) : (
                  <h3 className="font-headline text-5xl font-extrabold leading-tight text-white">
                    DISCOVER
                    <br />
                    MUSIC
                  </h3>
                )}
              </div>
              <a
                href={heroAlbum?.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-primary-container px-8 py-4 font-headline font-bold text-on-primary-fixed transition-all hover:shadow-[0_0_20px_rgba(0,255,255,0.5)]"
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                  play_arrow
                </span>
                LISTEN NOW
              </a>
            </div>
          </div>

          {/* Your Top Tracks */}
          <div className="col-span-4 flex flex-col gap-3">
            <div className="rounded-2xl bg-surface-container-low/40 backdrop-blur-2xl p-5 outline outline-1 outline-white/15 flex-1">
              <h4 className="font-headline text-base font-bold text-white mb-3">Your Top Tracks</h4>
              <div className="space-y-2">
                {topTracks.map((track, i) => (
                  <a
                    key={track.id}
                    href={track.external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-white/5 group"
                  >
                    <span className="w-4 text-center font-label text-xs text-on-surface-variant">{i + 1}</span>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={getBestImage(track.album.images, 40)}
                      alt={track.name}
                      className="h-8 w-8 rounded object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-headline text-xs font-bold text-on-surface">{track.name}</p>
                      <p className="truncate font-label text-[10px] text-on-surface-variant">
                        {track.artists.map((a) => a.name).join(", ")}
                      </p>
                    </div>
                    <span className="font-label text-[10px] text-on-surface-variant opacity-0 group-hover:opacity-100">
                      {formatDuration(track.duration_ms)}
                    </span>
                  </a>
                ))}
                {topTracks.length === 0 && (
                  <p className="text-xs text-on-surface-variant/60 text-center py-4">Play some music on Spotify first!</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Releases */}
      <section className="mb-12 px-8">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-headline text-2xl font-bold tracking-tighter text-on-surface">
            New Releases
          </h2>
          <button className="font-label text-xs font-bold uppercase tracking-widest text-primary hover:underline">
            View All
          </button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {newReleases.slice(0, 8).map((album) => (
            <a
              key={album.id}
              href={album.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-xl bg-surface-container-low/40 p-5 backdrop-blur-xl outline outline-1 outline-white/10 transition-all duration-300 hover:scale-[1.02] hover:outline-primary/30 hover:shadow-[0_0_20px_rgba(188,135,254,0.1)]"
            >
              <div className="mb-4 aspect-square w-full overflow-hidden rounded-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={getBestImage(album.images, 300)}
                  alt={album.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h4 className="font-headline font-bold text-on-surface truncate">{album.name}</h4>
              <p className="text-sm text-on-surface-variant truncate">
                {album.artists.map((a) => a.name).join(", ")}
              </p>
              <p className="font-label text-[10px] text-on-surface-variant/60 mt-1">
                {album.release_date.slice(0, 4)} · {album.total_tracks} tracks
              </p>
              <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-primary-container text-on-primary-fixed opacity-0 shadow-[0_0_15px_rgba(0,255,255,0.4)] transition-all group-hover:opacity-100">
                <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                  open_in_new
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Featured Playlists */}
      <section className="px-8">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-headline text-2xl font-bold tracking-tighter text-on-surface">
            Featured Playlists
          </h2>
          <button className="font-label text-xs font-bold uppercase tracking-widest text-primary hover:underline">
            View All
          </button>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {featuredPlaylists.map((playlist) => (
            <a
              key={playlist.id}
              href={playlist.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative h-48 overflow-hidden rounded-2xl bg-surface-container-low/40 backdrop-blur-xl outline outline-1 outline-white/10 transition-all duration-300 hover:outline-primary/30"
            >
              {playlist.images[0] && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={playlist.images[0].url}
                  alt={playlist.name}
                  className="absolute inset-0 h-full w-full object-cover opacity-30 transition-opacity group-hover:opacity-50"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-surface-dim via-surface-dim/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/10 opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative z-10 flex h-full flex-col justify-between p-6">
                <div>
                  <span className="font-label text-[10px] uppercase tracking-widest text-primary/70">
                    {playlist.owner.display_name}
                  </span>
                  <h4 className="mt-1 font-headline text-xl font-bold text-white line-clamp-2">
                    {playlist.name}
                  </h4>
                  <p className="text-sm text-on-surface-variant">{playlist.tracks.total} tracks</p>
                </div>
                <span className="flex items-center gap-2 text-sm font-bold text-primary">
                  OPEN IN SPOTIFY
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                    open_in_new
                  </span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
