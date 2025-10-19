import type { Blog } from "##/types/BlogType";

export async function getBlogs(): Promise<Blog[]> {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ??
    `http://localhost:${process.env.PORT ?? 3000}`;
  const url = new URL("/api/blogs", base).toString();
  const res = await fetch(url, { next: { revalidate: 0 }, cache: "no-store" });
  if (!res.ok) return [];
  return (await res.json()) as Blog[];
}

export default { getBlogs };
