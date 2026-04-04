import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";
import {
  getCurrentUser,
  getUserTopTracks,
  getUserTopArtists,
  getRecentlyPlayed,
  getBestImage,
  formatDuration,
} from "@/lib/spotify";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.accessToken) redirect("/login");

  const token = session.accessToken;

  const [user, topTracks, topArtists, recentlyPlayed] = await Promise.all([
    getCurrentUser(token).catch(() => null),
    getUserTopTracks(token, 5, "short_term").catch(() => null),
    getUserTopArtists(token, 5, "medium_term").catch(() => null),
    getRecentlyPlayed(token, 10).catch(() => null),
  ]);

  const topTracksList = topTracks?.items ?? [];
  const topArtistsList = topArtists?.items ?? [];
  const recentList = recentlyPlayed?.items ?? [];

  // Tổng hợp genres từ top artists
  const allGenres = topArtistsList.flatMap((a) => a.genres ?? []);
  const genreCounts = allGenres.reduce<Record<string, number>>((acc, g) => {
    acc[g] = (acc[g] ?? 0) + 1;
    return acc;
  }, {});
  const topGenres = Object.entries(genreCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  const totalGenreCount = topGenres.reduce((sum, [, n]) => sum + n, 0);

  return (
    <main className="mr-8 pb-36 pt-6">
      <div className="px-8">
        {/* Profile hero */}
        <section className="relative mb-12 h-72 w-full overflow-hidden rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
          {user?.images?.[0] ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={getBestImage(user.images, 640)}
              alt={user.display_name}
              className="absolute inset-0 h-full w-full object-cover opacity-30"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-surface-container" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-surface-dim via-surface-dim/40 to-transparent" />
          <div className="absolute bottom-0 left-0 flex w-full items-end justify-between p-10">
            <div className="flex items-end gap-6">
              {user?.images?.[0] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={getBestImage(user.images, 100)}
                  alt={user.display_name}
                  className="h-24 w-24 rounded-2xl object-cover border-2 border-primary/40 shadow-[0_0_20px_rgba(0,255,255,0.3)] flex-shrink-0"
                />
              ) : (
                <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-primary/30 to-secondary/40 flex items-center justify-center border-2 border-primary/40 shadow-[0_0_20px_rgba(0,255,255,0.3)] flex-shrink-0">
                  <span className="material-symbols-outlined text-5xl text-primary/70" style={{ fontVariationSettings: "'FILL' 1" }}>account_circle</span>
                </div>
              )}
              <div>
                <span className="font-label text-[10px] uppercase tracking-[0.3em] text-primary">
                  {user?.product === "premium" ? "Premium Member" : "Free Member"}
                </span>
                <h2 className="font-headline text-5xl font-extrabold tracking-tighter text-white">
                  {user?.display_name ?? session.user?.name ?? "Listener"}
                </h2>
                <p className="font-body text-on-surface-variant">
                  {user?.followers?.total?.toLocaleString()} followers · {user?.country}
                </p>
              </div>
            </div>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/login" });
              }}
            >
              <button
                type="submit"
                className="flex items-center gap-2 rounded-full bg-surface-container-high/80 px-6 py-3 font-headline text-sm font-bold text-on-surface backdrop-blur-md outline outline-1 outline-white/10 transition-all hover:outline-primary/40"
              >
                <span className="material-symbols-outlined text-sm">logout</span>
                Sign Out
              </button>
            </form>
          </div>
        </section>

        <div className="grid grid-cols-3 gap-8">
          {/* Left: Sonic DNA + Top Tracks */}
          <div className="col-span-2 space-y-8">
            {/* Sonic DNA */}
            <div>
              <h3 className="mb-6 font-headline text-2xl font-bold">Sonic DNA</h3>
              <div className="rounded-2xl glass-panel ghost-border p-6">
                {topGenres.length > 0 ? (
                  <div className="space-y-4">
                    {topGenres.map(([genre, count]) => {
                      const pct = Math.round((count / totalGenreCount) * 100);
                      return (
                        <div key={genre} className="flex items-center gap-4">
                          <span className="w-36 font-label text-xs text-on-surface-variant capitalize flex-shrink-0 truncate">
                            {genre}
                          </span>
                          <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/5">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className="w-8 font-label text-xs text-on-surface-variant text-right flex-shrink-0">
                            {pct}%
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-center text-sm text-on-surface-variant/60 py-4">
                    Listen to more music to see your Sonic DNA
                  </p>
                )}

                {/* Top artists */}
                <h4 className="mt-6 mb-4 font-headline font-bold text-on-surface-variant text-sm uppercase tracking-widest">
                  Top Artists
                </h4>
                <div className="space-y-2">
                  {topArtistsList.map((artist, i) => (
                    <a
                      key={artist.id}
                      href={artist.external_urls.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-xl px-3 py-2 transition-colors hover:bg-white/5 group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-label text-sm text-on-surface-variant w-4">{i + 1}</span>
                        {artist.images?.[0] ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={getBestImage(artist.images, 40)}
                            alt={artist.name}
                            className="h-8 w-8 rounded-full object-cover"
                          />
                        ) : (
                          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary/20 to-secondary/30 flex items-center justify-center">
                            <span className="font-headline text-xs font-bold text-primary">{artist.name[0]}</span>
                          </div>
                        )}
                        <span className="font-body text-sm text-on-surface">{artist.name}</span>
                      </div>
                      <span className="font-label text-xs text-on-surface-variant opacity-0 group-hover:opacity-100">
                        {artist.followers?.total?.toLocaleString()} followers
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Top Tracks */}
            {topTracksList.length > 0 && (
              <div>
                <h3 className="mb-4 font-headline text-2xl font-bold">Top Tracks (Last 4 Weeks)</h3>
                <div className="rounded-2xl glass-panel ghost-border overflow-hidden">
                  {topTracksList.map((track, i) => (
                    <a
                      key={track.id}
                      href={track.external_urls.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 px-6 py-4 transition-colors hover:bg-white/5"
                    >
                      <span className="w-5 text-center font-label text-sm text-on-surface-variant">{i + 1}</span>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={getBestImage(track.album.images, 40)}
                        alt={track.name}
                        className="h-10 w-10 rounded-lg object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-headline font-bold text-on-surface text-sm">{track.name}</p>
                        <p className="truncate text-xs text-on-surface-variant">
                          {track.artists.map((a) => a.name).join(", ")}
                        </p>
                      </div>
                      <span className="font-label text-xs text-on-surface-variant">{formatDuration(track.duration_ms)}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Recently Played */}
          <div>
            <h3 className="mb-6 font-headline text-2xl font-bold">Recently Played</h3>
            <div className="space-y-2">
              {recentList.map((item, i) => (
                <a
                  key={`${item.track.id}-${i}`}
                  href={item.track.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl glass-panel ghost-border p-3 transition-colors hover:bg-white/5 group"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={getBestImage(item.track.album.images, 40)}
                    alt={item.track.name}
                    className="h-10 w-10 flex-shrink-0 rounded-lg object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-headline text-sm font-bold text-on-surface">{item.track.name}</p>
                    <p className="truncate text-xs text-on-surface-variant">
                      {item.track.artists.map((a) => a.name).join(", ")}
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-sm text-primary opacity-0 group-hover:opacity-100">
                    open_in_new
                  </span>
                </a>
              ))}
              {recentList.length === 0 && (
                <p className="text-center text-sm text-on-surface-variant/60 py-8">
                  No recent activity yet
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
