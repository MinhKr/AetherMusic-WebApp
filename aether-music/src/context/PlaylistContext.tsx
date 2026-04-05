"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface Playlist {
  id: string;
  title: string;
}

interface PlaylistContextType {
  playlists: Playlist[];
  refreshPlaylists: () => Promise<void>;
  addToPlaylist: (playlistId: string, songId: string) => Promise<boolean>;
}

const PlaylistContext = createContext<PlaylistContextType | undefined>(undefined);

export function PlaylistProvider({ children }: { children: React.ReactNode }) {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  const fetchPlaylists = async () => {
    try {
      const response = await fetch('/api/playlists');
      if (response.ok) {
        const data = await response.json();
        setPlaylists(data);
      }
    } catch (error) {
      console.error("Failed to fetch playlists:", error);
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const addToPlaylist = async (playlistId: string, songId: string) => {
    try {
      const response = await fetch('/api/playlists/songs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playlist_id: playlistId, song_id: songId }),
      });
      return response.ok;
    } catch (error) {
      console.error("Failed to add to playlist:", error);
      return false;
    }
  };

  return (
    <PlaylistContext.Provider value={{ playlists, refreshPlaylists: fetchPlaylists, addToPlaylist }}>
      {children}
    </PlaylistContext.Provider>
  );
}

export function usePlaylists() {
  const context = useContext(PlaylistContext);
  if (context === undefined) {
    throw new Error("usePlaylists must be used within a PlaylistProvider");
  }
  return context;
}
