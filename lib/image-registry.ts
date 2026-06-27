/**
 * ImageRegistry Utility
 * Manages all application image assets in one central location.
 * This makes it easier to replace placeholders with real assets later.
 */

export const IMAGE_REGISTRY = {
  // Brand Assets
  logos: {
    primary: "/assets/images/logo-nuansa/logo-nuansa.webp",
    favicon: "/favicon.ico",
  },

  // Article Categories Default Images
  categories: {
    "Pola Asuh": "https://picsum.photos/seed/parenting/800/600",
    "Self-Care": "https://picsum.photos/seed/meditation/800/600",
    "Relasi & Keluarga": "https://picsum.photos/seed/family/800/600",
    "Pengembangan Diri": "https://picsum.photos/seed/growth/800/600",
    "Manajemen Emosi": "https://picsum.photos/seed/emotions/800/600",
  },

  // Specific Article Images (mapped by slug)
  articles: {
    "mengelola-burnout-tekanan-kerja": "https://picsum.photos/seed/burnout/800/600",
    "komunikasi-asertif-keluarga": "https://picsum.photos/seed/family-talk/800/600",
    "menghargai-emosi-negatif": "https://picsum.photos/seed/emotions-calm/800/600",
    "membangun-boundaries-sehat": "https://picsum.photos/seed/boundaries-safety/800/600",
    "psikologi-pola-asuh-positif": "https://picsum.photos/seed/parenting-joy/800/600",
    "memutus-rantai-overthinking": "https://picsum.photos/seed/mind-clear/800/600",
    "meditasi-lima-menit": "https://picsum.photos/seed/zen-meditation/800/600",
    "menjaga-keintiman-pernikahan": "https://picsum.photos/seed/marriage-heart/800/600",
    "seni-bangkit-dari-kegagalan": "https://picsum.photos/seed/resilience-mountain/800/600",
    "tidur-dan-stabilitas-emosi": "https://picsum.photos/seed/sleep-moon/800/600",
  },

  // UI Placeholders
  placeholders: {
    userAvatar: "https://picsum.photos/seed/user/200/200",
    serviceHero: "https://picsum.photos/seed/consultation/1200/800",
    aboutHero: "https://picsum.photos/seed/team-nuansa/1200/800",
  },

  // Visual Accents
  accents: {
    waves: "https://picsum.photos/seed/waves-bg/1920/1080",
    forest: "https://picsum.photos/seed/forest-zen/1920/1080",
  }
};

/**
 * Helper to get article image with fallback
 */
export function getArticleImage(slug: string, category?: string): string {
  const articleImage = (IMAGE_REGISTRY.articles as any)[slug];
  if (articleImage) return articleImage;
  
  if (category) {
    const categoryImage = (IMAGE_REGISTRY.categories as any)[category];
    if (categoryImage) return categoryImage;
  }

  return `https://picsum.photos/seed/${slug}/800/600`;
}
