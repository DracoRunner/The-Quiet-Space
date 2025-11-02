import { NextResponse } from "next/server";
import BlogDB from "##/DataBase/BlogDB";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;

    // validate required fields
    const title = String(body.title ?? "");
    const slug = String(body.slug ?? "");
    const content = String(body.content ?? "");

    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const created = await BlogDB.createBlog({
      title,
      slug,
      excerpt: typeof body.excerpt === "string" ? body.excerpt : undefined,
      content,
      readTime:
        typeof body.readTime === "number"
          ? (body.readTime as number)
          : undefined,
      imageSeed: String(body.imageSeed ?? ""),
      category: typeof body.category === "string" ? body.category : undefined,
      format:
        body.format === "markdown" ||
        body.format === "html" ||
        body.format === "text"
          ? (body.format as "markdown" | "html" | "text")
          : "markdown",
      author: typeof body.author === "string" ? body.author : undefined,
      publishedAt: body.publishedAt
        ? new Date(String(body.publishedAt))
        : undefined,
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
