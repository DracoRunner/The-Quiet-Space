import { NextResponse } from "next/server";
import { confessionService } from "##/services/confessionService";

export async function POST(request: Request) {
  try {
    const { content } = await request.json();

    if (!content || typeof content !== "string") {
      return NextResponse.json(
        { error: "Invalid confession content" },
        { status: 400 }
      );
    }

    const confession = await confessionService.createConfession(content);
    return NextResponse.json(confession, { status: 201 });
  } catch (error) {
    console.error("Error creating confession:", error);
    return NextResponse.json(
      { error: "Failed to create confession" },
      { status: 500 }
    );
  }
}
