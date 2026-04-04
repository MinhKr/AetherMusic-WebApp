import { redirect } from "next/navigation";
import { auth } from "@/auth";
import {
  getRecommendationsByGenre,
  getUserTopArtists,
  getBestImage,
  formatDuration,
  type SpotifyTrack,
} from "@/lib/spotify";

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
  const session = await auth();
  if (!session?.accessToken) redirect("/login");

  const token = session.accessToken;

  // Lấy top genres của user từ top artists
  const topArtistsData = await getUserTopArtists(token, 5).catch(() => null);
  const userGenres = topArtistsData?.items?.flatMap((a) => a.genres ?? []).slice(0, 5) ?? [];
  const seedGenres = userGenres.length > 0 ? userGenres : ["pop", "electronic"];

  // Recommendations dựa trên user's taste
  const [featuredTracks, electronicTracks, ambientTracks] = await Promise.all([
    getRecommendationsByGenre(token, seedGenres.slice(0, 3), 10).catch(() => null),
    getRecommendationsByGenre(token, ["electronic", "synth-pop"], 8).catch(() => null),
    getRecommendationsByGenre(token, ["ambient", "chill"], 8).catch(() => null),
  ]);

  const personalTracks: SpotifyTrack[] = featuredTracks?.tracks ?? [];
  const elecTracks: SpotifyTrack[] = electronicTracks?.tracks ?? [];
  const ambTracks: SpotifyTrack[] = ambientTracks?.tracks ?? [];

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
                Spotify Radio · Personalized for You
              </span>
            </div>
          </div>
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/40 transition-colors group-focus-within:text-primary">
              search
            </span>
            <input
              className="w-64 rounded-full border-0 bg-surface-container-lowest/20 py-2.5 pl-12 pr-6 text-sm backdrop-blur-md outline outline-1 outline-white/15 focus:outline-primary/40 focus:ring-0"
              placeholder="Search frequencies..."
              type="text"
            />
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
                <p className="mt-1 text-sm text-on-surface-variant">Curated via Spotify</p>
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

        {/* Personalized recommendations */}
        {personalTracks.length > 0 && (
          <section className="mb-12">
            <div className="mb-6 flex items-end justify-between">
              <div>
                <h3 className="font-headline text-2xl font-bold">Your Frequency</h3>
                <p className="text-sm text-on-surface-variant mt-1">Based on your listening taste</p>
              </div>
            </div>
            <div className="rounded-2xl glass-panel ghost-border overflow-hidden">
              {personalTracks.slice(0, 8).map((track, i) => (
                <a
                  key={track.id}
                  href={track.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 px-6 py-4 transition-colors hover:bg-white/5"
                >
                  <span className="w-6 text-center font-label text-sm text-on-surface-variant">{i + 1}</span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={getBestImage(track.album.images, 40)}
                    alt={track.name}
                    className="h-10 w-10 flex-shrink-0 rounded-lg object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-headline font-bold text-on-surface text-sm">{track.name}</p>
                    <p className="truncate text-xs text-on-surface-variant">
                      {track.artists.map((a) => a.name).join(", ")}
                    </p>
                  </div>
                  <span className="text-sm text-on-surface-variant hidden group-hover:block">{track.album.name}</span>
                  <div className="w-12 h-1 rounded-full bg-white/10 mx-4">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${track.popularity}%` }} />
                  </div>
                  <span className="font-label text-xs text-on-surface-variant">{formatDuration(track.duration_ms)}</span>
                  <span className="material-symbols-outlined text-sm text-primary opacity-0 group-hover:opacity-100">open_in_new</span>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Electronic & Ambient rows */}
        <div className="grid grid-cols-2 gap-8">
          {[
            { label: "Electronic", tracks: elecTracks },
            { label: "Ambient & Chill", tracks: ambTracks },
          ].map(({ label, tracks }) => (
            <section key={label}>
              <h3 className="mb-4 font-headline text-xl font-bold">{label}</h3>
              <div className="space-y-2">
                {tracks.slice(0, 6).map((track) => (
                  <a
                    key={track.id}
                    href={track.external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-xl p-3 glass-panel ghost-border transition-colors hover:bg-white/5"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={getBestImage(track.album.images, 40)}
                      alt={track.name}
                      className="h-10 w-10 rounded-lg object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-headline text-sm font-bold text-on-surface">{track.name}</p>
                      <p className="truncate text-xs text-on-surface-variant">
                        {track.artists.map((a) => a.name).join(", ")}
                      </p>
                    </div>
                    <span className="font-label text-xs text-on-surface-variant opacity-0 group-hover:opacity-100">
                      {formatDuration(track.duration_ms)}
                    </span>
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
