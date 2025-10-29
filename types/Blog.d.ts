export type Blog = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  readTime?: number;
  imageSeed: string;
  category?: string;
  format?: "markdown" | "html" | "text";
  author?: string;
  publishedAt?: Date;
};

export type RenderBlog = Blog & {
  category?: string;
  readTime?: number;
};
