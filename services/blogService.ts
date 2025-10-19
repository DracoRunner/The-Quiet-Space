import type { Blog } from "##/types/BlogType";

/**
 * Fetch blogs from the Next.js API backend
 * Works in both server and client components
 */
export async function getBlogs(): Promise<Blog[]> {
  const startTime = Date.now();
  const isServer = typeof window === "undefined";

  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const url = `${baseUrl}/api/blogs`;

    console.log(
      `🔍 [Service/${isServer ? "Server" : "Client"}] Fetching blogs from: ${url}`,
    );

    const res = await fetch(url, {
      cache: "no-store",
    });

    if (!res.ok) {
      const duration = Date.now() - startTime;
      console.error(
        `❌ [Service/${isServer ? "Server" : "Client"}] Failed to fetch blogs: ${res.status} (${duration}ms)`,
      );
      return [];
    }

    const data = (await res.json()) as Blog[];
    const duration = Date.now() - startTime;

    console.log(
      `✅ [Service/${isServer ? "Server" : "Client"}] Fetched ${data.length} blogs (${duration}ms)`,
    );

    return data;
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(
      `❌ [Service/${isServer ? "Server" : "Client"}] Error fetching blogs (${duration}ms):`,
      error,
    );
    return [];
  }
}

/**
 * Fetch a single blog by ID from the Next.js API backend
 * Works in both server and client components
 */
export async function getBlogById(id: string): Promise<Blog | null> {
  const startTime = Date.now();
  const isServer = typeof window === "undefined";

  try {
    const baseUrl =
      typeof window === "undefined"
        ? process.env.NEXT_PUBLIC_SITE_URL ||
          `http://localhost:${process.env.PORT || 3000}`
        : "";

    const url = `${baseUrl}/api/blogs/${id}`;

    console.log(
      `🔍 [Service/${isServer ? "Server" : "Client"}] Fetching blog ${id} from: ${url}`,
    );

    const res = await fetch(url, {
      cache: "no-store",
    });

    if (!res.ok) {
      const duration = Date.now() - startTime;
      if (res.status === 404) {
        console.log(
          `⚠️  [Service/${isServer ? "Server" : "Client"}] Blog ${id} not found (${duration}ms)`,
        );
        return null;
      }
      console.error(
        `❌ [Service/${isServer ? "Server" : "Client"}] Failed to fetch blog ${id}: ${res.status} (${duration}ms)`,
      );
      return null;
    }

    const data = (await res.json()) as Blog;
    const duration = Date.now() - startTime;

    console.log(
      `✅ [Service/${isServer ? "Server" : "Client"}] Fetched blog "${data.title}" (${duration}ms)`,
    );

    return data;
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(
      `❌ [Service/${isServer ? "Server" : "Client"}] Error fetching blog ${id} (${duration}ms):`,
      error,
    );
    return null;
  }
}

export default { getBlogs, getBlogById };
