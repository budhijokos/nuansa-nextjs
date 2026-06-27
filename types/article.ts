export type ArticleContentType = 
  | "p" 
  | "h2" 
  | "h3" 
  | "ul" 
  | "ol" 
  | "blockquote" 
  | "img" 
  | "quiz" 
  | "breath" 
  | "takeaway" 
  | "faq" 
  | "cta";

export interface Article {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  readTime: string;
  date: string;
  imageSeed: string;
}

export interface ArticleContentBlock {
  type: ArticleContentType;
  text?: string;
  items?: string[];
  src?: string;
  alt?: string;
  caption?: string;
  id?: string;
}

export interface ArticleData {
  content: ArticleContentBlock[];
  customMetadata?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
}

export type ArticleDetailsMap = Record<string, ArticleData>;
