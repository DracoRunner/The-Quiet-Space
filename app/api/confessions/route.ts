import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import ConfessionDB from "##/DataBase/ConfessionDB";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      content?: unknown;
      submitterDetails?: { name?: unknown; email?: unknown; phone?: unknown };
    };
    const content = typeof body.content === "string" ? body.content : undefined;
    const submitterDetails = body.submitterDetails
      ? {
          name:
            typeof body.submitterDetails.name === "string"
              ? body.submitterDetails.name.trim()
              : undefined,
          email:
            typeof body.submitterDetails.email === "string"
              ? body.submitterDetails.email.trim()
              : undefined,
          phone:
            typeof body.submitterDetails.phone === "string"
              ? body.submitterDetails.phone.trim()
              : undefined,
        }
      : undefined;
    if (!content) {
      return NextResponse.json({ error: "Invalid content" }, { status: 400 });
    }

    // If submitterDetails are provided, require name and email (phone optional)
    if (submitterDetails) {
      if (!submitterDetails.name || !submitterDetails.email) {
        return NextResponse.json(
          { error: "Name and email are required when sharing details" },
          { status: 400 },
        );
      }
    }
    const validSubmitterDetails = submitterDetails
      ? submitterDetails.name && submitterDetails.email
        ? {
            name: submitterDetails.name,
            email: submitterDetails.email,
            phone: submitterDetails.phone,
          }
        : undefined
      : undefined;

    const confession = await ConfessionDB.createConfession(
      content,
      validSubmitterDetails,
    );
    revalidatePath("/admin/confessions");
    revalidatePath("/confessions");
    return NextResponse.json(confession, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
