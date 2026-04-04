const SPOTIFY_BASE = "https://api.spotify.com/v1";

async function spotifyFetch<T>(
  endpoint: string,
  accessToken: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${SPOTIFY_BASE}${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      ...options?.headers,
    },
    next: { revalidate: 60 }, // Cache 60s trên server
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error?.error?.message ?? `Spotify API error ${res.status}`);
  }

  return res.json();
}

// ─── Types ──────────────────────────────────────────────────────────────────

export interface SpotifyImage {
  url: string;
  width: number | null;
  height: number | null;
}

export interface SpotifyArtist {
  id: string;
  name: string;
  images?: SpotifyImage[];
  genres?: string[];
  followers?: { total: number };
  external_urls: { spotify: string };
}

export interface SpotifyAlbum {
  id: string;
  name: string;
  artists: Pick<SpotifyArtist, "id" | "name">[];
  images: SpotifyImage[];
  release_date: string;
  total_tracks: number;
  external_urls: { spotify: string };
}

export interface SpotifyTrack {
  id: string;
  name: string;
  artists: Pick<SpotifyArtist, "id" | "name">[];
  album: SpotifyAlbum;
  duration_ms: number;
  popularity: number;
  preview_url: string | null;
  external_urls: { spotify: string };
  uri: string;
}

export interface SpotifyPlaylist {
  id: string;
  name: string;
  description: string | null;
  images: SpotifyImage[];
  tracks: { total: number };
  owner: { display_name: string };
  external_urls: { spotify: string };
  uri: string;
}

export interface SpotifyUser {
  id: string;
  display_name: string;
  email: string;
  images: SpotifyImage[];
  followers: { total: number };
  product: string;
  country: string;
}

// ─── API Functions ───────────────────────────────────────────────────────────

/** Thông tin user hiện tại */
export function getCurrentUser(token: string) {
  return spotifyFetch<SpotifyUser>("/me", token);
}

/** New releases */
export function getNewReleases(token: string, limit = 8) {
  return spotifyFetch<{ albums: { items: SpotifyAlbum[] } }>(
    `/browse/new-releases?limit=${limit}&country=VN`,
    token
  );
}

/** Featured playlists */
export function getFeaturedPlaylists(token: string, limit = 6) {
  return spotifyFetch<{ playlists: { items: SpotifyPlaylist[] } }>(
    `/browse/featured-playlists?limit=${limit}&country=VN`,
    token
  );
}

/** Top tracks của user */
export function getUserTopTracks(token: string, limit = 10, timeRange: "short_term" | "medium_term" | "long_term" = "medium_term") {
  return spotifyFetch<{ items: SpotifyTrack[] }>(
    `/me/top/tracks?limit=${limit}&time_range=${timeRange}`,
    token
  );
}

/** Top artists của user */
export function getUserTopArtists(token: string, limit = 10, timeRange: "short_term" | "medium_term" | "long_term" = "medium_term") {
  return spotifyFetch<{ items: SpotifyArtist[] }>(
    `/me/top/artists?limit=${limit}&time_range=${timeRange}`,
    token
  );
}

/** Recently played */
export function getRecentlyPlayed(token: string, limit = 20) {
  return spotifyFetch<{ items: { track: SpotifyTrack; played_at: string }[] }>(
    `/me/player/recently-played?limit=${limit}`,
    token
  );
}

/** User's playlists */
export function getUserPlaylists(token: string, limit = 20) {
  return spotifyFetch<{ items: SpotifyPlaylist[]; total: number }>(
    `/me/playlists?limit=${limit}`,
    token
  );
}

/** Saved tracks (liked songs) */
export function getSavedTracks(token: string, limit = 20) {
  return spotifyFetch<{ items: { added_at: string; track: SpotifyTrack }[]; total: number }>(
    `/me/tracks?limit=${limit}`,
    token
  );
}

/** Tracks trong playlist */
export function getPlaylistTracks(token: string, playlistId: string, limit = 20) {
  return spotifyFetch<{ items: { track: SpotifyTrack }[]; total: number }>(
    `/playlists/${playlistId}/tracks?limit=${limit}`,
    token
  );
}

/** Recommendations dựa trên genre */
export function getRecommendationsByGenre(token: string, genres: string[], limit = 20) {
  const seedGenres = genres.slice(0, 5).join(",");
  return spotifyFetch<{ tracks: SpotifyTrack[] }>(
    `/recommendations?seed_genres=${seedGenres}&limit=${limit}`,
    token
  );
}

/** Tìm kiếm */
export function search(token: string, query: string, types = "track,artist,album", limit = 10) {
  const q = encodeURIComponent(query);
  return spotifyFetch<{
    tracks?: { items: SpotifyTrack[] };
    artists?: { items: SpotifyArtist[] };
    albums?: { items: SpotifyAlbum[] };
  }>(`/search?q=${q}&type=${types}&limit=${limit}`, token);
}

// ─── Utils ───────────────────────────────────────────────────────────────────

/** Convert milliseconds → "m:ss" */
export function formatDuration(ms: number): string {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

/** Lấy image tốt nhất từ array */
export function getBestImage(images: SpotifyImage[], preferredWidth = 300): string {
  if (!images?.length) return "";
  const sorted = [...images].sort((a, b) =>
    Math.abs((a.width ?? 0) - preferredWidth) - Math.abs((b.width ?? 0) - preferredWidth)
  );
  return sorted[0].url;
}
