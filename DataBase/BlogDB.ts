import type { Blog } from "@prisma/client";
import { prisma, safeDbTransaction } from "./BaseDb";

const mapRowToBlog = (row: unknown): Blog => {
  const r = row as Record<string, unknown>;
  return {
    id: String(r.id ?? ""),
    title: String(r.title ?? ""),
    slug: String(r.slug ?? ""),
    excerpt: typeof r.excerpt === "string" ? r.excerpt : undefined,
    content: String(r.content ?? ""),
    readTime:
      typeof r.readTime === "number" ? (r.readTime as number) : undefined,
    imageSeed: String(r.imageSeed ?? ""),
    category: typeof r.category === "string" ? r.category : undefined,
    format: (r.format as Blog["format"]) ?? "markdown",
    author: typeof r.author === "string" ? r.author : undefined,
    publishedAt: r.publishedAt ? new Date(String(r.publishedAt)) : undefined,
  } as Blog;
};

const getBlogs = async (): Promise<Blog[]> => {
  return safeDbTransaction(async () => {
    const rows = await prisma.blog.findMany({
      orderBy: { publishedAt: "desc" },
    });
    return rows.map(mapRowToBlog);
  });
};

const getBlogBySlug = async (slug: string): Promise<Blog | null> => {
  return safeDbTransaction(async () => {
    const row = await prisma.blog.findFirst({ where: { slug } });
    return row ? mapRowToBlog(row) : null;
  });
};

const createBlog = async (data: Partial<Blog>): Promise<Blog> => {
  return safeDbTransaction(async () => {
    const created = await prisma.blog.create({
      data: {
        title: data.title ?? "Untitled",
        slug: data.slug ?? String(Date.now()),
        excerpt: data.excerpt ?? null,
        content: data.content ?? "",
        readTime: data.readTime ?? null,
        imageSeed: data.imageSeed ?? "",
        category: data.category ?? null,
        format: data.format ?? "markdown",
        author: data.author ?? null,
        publishedAt: data.publishedAt ?? null,
      },
    });
    return mapRowToBlog(created as unknown);
  });
};

const deleteBlog = async (id: string): Promise<void> => {
  return safeDbTransaction(async () => {
    await prisma.blog.delete({ where: { id } });
  });
};

const demoBlog = () => {
  createBlog({
    id: "a1b2c3d4-...-...",
    title: "My Raw Markdown Title",
    slug: "my-raw-markdown-title",
    excerpt: "This is a test post created from curl.",
    content:
      "# My Raw Markdown Title\n\nThis is a test post created from raw markdown.",
    readTime: 3,
    imageSeed: "seed-123",
    category: "personal",
    format: "markdown",
    author: "Anonymous",
    publishedAt: new Date(),
  }).then((blog) => {
    console.log("Demo blog created:", blog);
  });
};

const BlogDB = {
  getBlogs,
  getBlogBySlug,
  createBlog,
  deleteBlog,
  demoBlog,
};

export default BlogDB;
