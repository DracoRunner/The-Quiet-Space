import { NextResponse } from "next/server";
import ConfessionDB from "##/DataBase/ConfessionDB";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { content?: unknown };
    const content = typeof body.content === "string" ? body.content : undefined;
    if (!content) {
      return NextResponse.json({ error: "Invalid content" }, { status: 400 });
    }
    const confession = await ConfessionDB.createConfession(content);
    return NextResponse.json(confession, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
