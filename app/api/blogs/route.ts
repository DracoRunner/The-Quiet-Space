import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

import { readDb } from "##/lib/blogDb";

export async function GET() {
  try {
    const items = await readDb();
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch blogs", error: String(error) },
      { status: 500 },
    );
  }
}
