import type { Blog } from "##/types/BlogType";

/**
 * Get the base URL for API calls
 * Works on Vercel, local dev, and production
 */
function getBaseUrl(): string {
  // Browser - use relative URL
  if (typeof window !== "undefined") return "";

  // Vercel - use VERCEL_URL
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // Custom deployment URL
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }

  // Local development
  return `http://localhost:${process.env.PORT || 3000}`;
}

/**
 * Fetch blogs from the Next.js API backend
 * Works in both server and client components
 */
export async function getBlogs(): Promise<Blog[]> {
  const startTime = Date.now();
  const isServer = typeof window === "undefined";

  try {
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}/api/blogs`;

    console.log(
      `🔍 [Service/${isServer ? "Server" : "Client"}] Fetching blogs from: ${url}`,
    );

    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        // Add x-forwarded-host for Vercel internal routing
        ...(isServer && process.env.VERCEL_URL
          ? { "x-forwarded-host": process.env.VERCEL_URL }
          : {}),
      },
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
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}/api/blogs/${id}`;

    console.log(
      `🔍 [Service/${isServer ? "Server" : "Client"}] Fetching blog ${id} from: ${url}`,
    );

    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        // Add x-forwarded-host for Vercel internal routing
        ...(isServer && process.env.VERCEL_URL
          ? { "x-forwarded-host": process.env.VERCEL_URL }
          : {}),
      },
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
