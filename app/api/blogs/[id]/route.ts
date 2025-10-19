import { NextResponse } from "next/server";
import { getBlogById } from "##/lib/blogDb";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: Request, props: Params) {
  const params = await props.params;
  const { id } = params;
  try {
    const blog = await getBlogById(id);
    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }
    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch blog", error: String(error) },
      { status: 500 },
    );
  }
}
