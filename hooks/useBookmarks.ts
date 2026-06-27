"use client";

import { useState, useEffect, useCallback } from "react";

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  // Load bookmarks from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("nuansa_bookmarks");
    if (saved) {
      try {
        setBookmarks(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse bookmarks", e);
      }
    }
    setMounted(true);
  }, []);

  const toggleBookmark = useCallback((slug: string) => {
    setBookmarks((prev) => {
      let next;
      if (prev.includes(slug)) {
        next = prev.filter((s) => s !== slug);
      } else {
        next = [...prev, slug];
      }
      localStorage.setItem("nuansa_bookmarks", JSON.stringify(next));
      return next;
    });
  }, []);

  const isBookmarked = useCallback((slug: string) => {
    return bookmarks.includes(slug);
  }, [bookmarks]);

  return {
    bookmarks,
    toggleBookmark,
    isBookmarked,
    mounted
  };
}
