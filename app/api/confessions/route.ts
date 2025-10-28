import { NextResponse } from "next/server";
import ConfessionService from "##/services/confessionService";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { content } = body;
    if (!content || typeof content !== "string") {
      return NextResponse.json({ error: "Invalid content" }, { status: 400 });
    }
    const confession = await ConfessionService.createConfession(content);
    return NextResponse.json(confession, { status: 201 });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error creating confession:", error);
    return NextResponse.json(
      { error: "Failed to create confession" },
      { status: 500 },
    );
  }
}
