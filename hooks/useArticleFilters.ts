"use client";

import { useState, useMemo } from "react";
import { Article } from "@/types/article";

interface UseArticleFiltersProps {
  articles: Article[];
  bookmarks: string[];
}

export function useArticleFilters({ articles, bookmarks }: UseArticleFiltersProps) {
  const [filter, setFilter] = useState<"all" | "saved">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = useMemo(() => {
    let result = filter === "all" 
      ? articles 
      : articles.filter((a) => bookmarks.includes(a.slug));

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q)
      );
    }

    return result;
  }, [articles, bookmarks, filter, searchQuery]);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(articles.map((a) => a.category)));
    return cats;
  }, [articles]);

  return {
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    filteredArticles,
    categories
  };
}
