import type { Blog } from "##/types/BlogType";

export async function getBlogs(): Promise<Blog[]> {
  try {
    const url = `${process.env.NEXT_PUBLIC_SITE_URL}/api/blogs`;
    const res = await fetch(url, {
      next: { revalidate: 60 },
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      console.error("No blogs found");

      return [];
    }

    const data = (await res.json()) as Blog[];
    return data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

export async function getBlogById(id: string): Promise<Blog | null> {
  try {
    const url = `${process.env.NEXT_PUBLIC_SITE_URL}/api/blogs/${id}`;
    const res = await fetch(url, {
      next: { revalidate: 60 },
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      console.error("Error getBlogById: Blog not found");
      return null;
    }

    const data = (await res.json()) as Blog;
    return data;
  } catch (error) {
    console.error("Error fetching blog :", error);
    return null;
  }
}

export default { getBlogs, getBlogById };
