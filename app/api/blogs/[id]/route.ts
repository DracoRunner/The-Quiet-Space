import { NextResponse } from "next/server";
import { getBlogById } from "##/lib/blogDb";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

// GET /api/blogs/:id - get a single blog post
export async function GET(_req: Request, props: Params) {
  const startTime = Date.now();
  const params = await props.params;
  const { id } = params;

  console.log(`📥 [API] GET /api/blogs/${id} - Request received`);

  try {
    const blog = await getBlogById(id);
    const duration = Date.now() - startTime;

    if (!blog) {
      console.log(`⚠️  [API] GET /api/blogs/${id} - Not found (${duration}ms)`);
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    console.log(`✅ [API] GET /api/blogs/${id} - Success (${duration}ms)`);
    return NextResponse.json(blog);
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(
      `❌ [API] GET /api/blogs/${id} - Error (${duration}ms):`,
      error,
    );

    return NextResponse.json(
      { message: "Failed to fetch blog", error: String(error) },
      { status: 500 },
    );
  }
}
