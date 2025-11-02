import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import BookingDB from "##/DataBase/BookingDB";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const params = await context.params;
    const id = params?.id;
    if (id) {
      const bookingById = await BookingDB.getBookingById(id);
      return NextResponse.json(bookingById, { status: 200 });
    }

    return NextResponse.json(
      { error: "Missing booking id or email" },
      { status: 400 },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const params = await context.params;
    const id = params?.id;

    if (!id) {
      return NextResponse.json(
        { error: "Missing booking id in path" },
        { status: 400 },
      );
    }

    const body = (await request.json()) as Record<string, unknown>;
    const updatedBooking = await BookingDB.updateBooking({ id, ...body });
    return NextResponse.json(updatedBooking, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const params = await context.params;
    const id = params?.id;

    if (!id) {
      return NextResponse.json(
        { error: "Missing booking id in path" },
        { status: 400 },
      );
    }

    await BookingDB.deleteBooking(id);
    return NextResponse.json({ message: "Booking deleted" }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
