export type Blog = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  /** content format: 'markdown' | 'html' | 'text' */
  format?: "markdown" | "html" | "text";
  author?: string;
  publishedAt?: string; // ISO date
};

export type RenderBlog = Blog & {
  category?: string;
  readTime?: number;
};
