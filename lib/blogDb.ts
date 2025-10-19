import fs from "node:fs";
import path from "node:path";
import type { Blog } from "##/types/BlogType";

const DB_FILE = path.join(process.cwd(), "data", "blogs.json");

export const readDb = async (): Promise<Blog[]> => {
  try {
    const raw = await fs.promises.readFile(DB_FILE, "utf-8");
    const data = JSON.parse(raw) as Blog[];
    return data;
  } catch (err) {
    const maybeErr = err as { code?: string };
    if (maybeErr?.code === "ENOENT") return [];
    throw err;
  }
};

export const writeDb = async (items: Blog[]) => {
  const dir = path.dirname(DB_FILE);
  await fs.promises.mkdir(dir, { recursive: true });
  await fs.promises.writeFile(DB_FILE, JSON.stringify(items, null, 2), "utf-8");
};

export const addBlog = async (
  blog: Omit<Blog, "id" | "publishedAt"> & Partial<Pick<Blog, "publishedAt">>,
): Promise<Blog> => {
  const items = await readDb();
  const id = (items.length + 1).toString();
  const now = blog.publishedAt ?? new Date().toISOString();
  const newBlog: Blog = {
    id,
    title: blog.title,
    slug: blog.slug,
    excerpt: blog.excerpt,
    content: blog.content,
    format: blog.format ?? undefined,
    author: blog.author ?? "Anonymous",
    publishedAt: now,
  };
  items.push(newBlog);
  await writeDb(items);
  return newBlog;
};

export const getBlogById = async (idOrSlug: string): Promise<Blog | null> => {
  const items = await readDb();
  const found = items.find((b) => b.id === idOrSlug || b.slug === idOrSlug);
  return found ?? null;
};
