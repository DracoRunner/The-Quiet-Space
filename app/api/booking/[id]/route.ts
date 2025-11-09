import { revalidatePath } from "next/cache";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import BookingDB from "##/DataBase/BookingDB";
import {
  generateJitsiUrl,
  generateMeetingId,
  sendBookingConfirmationEmail,
} from "##/utils/email";

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

    // Check if this is a confirmation request
    if (body.status === "confirmed") {
      // Get the booking first to access email and other details
      const existingBooking = await BookingDB.getBookingById(id);

      if (!existingBooking) {
        return NextResponse.json(
          { error: "Booking not found" },
          { status: 404 },
        );
      }

      // Generate meeting ID if not already present
      const meetingId =
        existingBooking.meetingId || generateMeetingId(existingBooking.email);

      // Update booking with meeting ID and confirmed status
      const updatedBooking = await BookingDB.updateBooking({
        id,
        status: "confirmed",
        meetingId,
      });

      // Send confirmation email
      try {
        await sendBookingConfirmationEmail({
          to: existingBooking.email,
          name: existingBooking.name,
          scheduledTime: new Date(existingBooking.when),
          meetingId,
        });
      } catch (emailError) {
        console.error("Failed to send email:", emailError);
        // Continue even if email fails - booking is still confirmed
      }
      revalidatePath("/bookings");
      revalidatePath("/admin/bookings");
      return NextResponse.json(
        {
          ...updatedBooking,
          meetingUrl: generateJitsiUrl(meetingId),
        },
        { status: 200 },
      );
    }

    // For other updates (not confirmation)
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
    revalidatePath("/bookings");
    revalidatePath("/admin/bookings");
    return NextResponse.json({ message: "Booking deleted" }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
