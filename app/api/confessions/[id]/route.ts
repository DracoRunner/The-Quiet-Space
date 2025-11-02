import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import ConfessionDB from "##/DataBase/ConfessionDB";

export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const params = await context.params;
    const id = params?.id;
    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    await ConfessionDB.deleteConfession(id);
    return NextResponse.json(
      { message: "Confession deleted" },
      { status: 200 },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
