"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface LikedSongsContextType {
  likedSongs: Set<string>;
  toggleLike: (songId: string) => Promise<void>;
  isLoading: boolean;
}

const LikedSongsContext = createContext<LikedSongsContextType | undefined>(undefined);

export function LikedSongsProvider({ children, userId }: { children: React.ReactNode, userId?: string }) {
  const [likedSongs, setLikedSongs] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLikedSongs(new Set());
      setIsLoading(false);
      return;
    }

    // Fetch initial liked songs
    async function fetchLikedSongs() {
      try {
        const response = await fetch('/api/songs/liked');
        if (response.ok) {
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            const data = await response.json();
            if (data.liked_songs) {
              setLikedSongs(new Set(data.liked_songs));
            }
          }
        }
      } catch (error) {
        console.error("Failed to fetch liked songs:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchLikedSongs();
  }, [userId]);

  const toggleLike = async (songId: string) => {
    const isCurrentlyLiked = likedSongs.has(songId);

    // Optimistic UI update
    setLikedSongs((prev) => {
      const newSet = new Set(prev);
      if (isCurrentlyLiked) {
        newSet.delete(songId);
      } else {
        newSet.add(songId);
      }
      return newSet;
    });

    try {
      const response = await fetch('/api/songs/like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ song_id: songId }),
      });

      if (!response.ok) {
        throw new Error('Failed to toggle like');
      }
    } catch (error) {
      console.error("Like toggle error:", error);
      // Revert optimistic update
      setLikedSongs((prev) => {
        const newSet = new Set(prev);
        if (isCurrentlyLiked) {
          newSet.add(songId);
        } else {
          newSet.delete(songId);
        }
        return newSet;
      });
    }
  };

  return (
    <LikedSongsContext.Provider value={{ likedSongs, toggleLike, isLoading }}>
      {children}
    </LikedSongsContext.Provider>
  );
}

export function useLikedSongs() {
  const context = useContext(LikedSongsContext);
  if (context === undefined) {
    throw new Error("useLikedSongs must be used within a LikedSongsProvider");
  }
  return context;
}
