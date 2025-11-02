import BookingsAdminTable from "##/components/admin/BookingsAdminTable";
import BookingDB from "##/DataBase/BookingDB";

export default async function AdminBookingsPage() {
  const bookings = await BookingDB.getBookings();

  const bookingRows = bookings.map((bk: unknown) => {
    const row = bk as Record<string, unknown>;
    return {
      id: String(row.id ?? ""),
      name: String(row.name ?? ""),
      email: String(row.email ?? ""),
      when: row.when ? String(row.when) : undefined,
      link: String(row.meetingId ?? ""),
      message: String(row.reason ?? ""),
    };
  });

  return <BookingsAdminTable bookings={bookingRows} />;
}
