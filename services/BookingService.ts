import type { Booking } from "##/types/Booking";

async function createBooking(payload: Booking) {
  const res = await fetch("/api/booking", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to create booking");
  }

  return res.json();
}

async function getBookingById(id: string) {
  const res = await fetch(`/api/booking/${encodeURIComponent(id)}`);
  if (!res.ok) throw new Error("Failed to fetch booking");
  return res.json();
}

async function getBookings() {
  const res = await fetch("/api/booking");
  if (!res.ok) throw new Error("Failed to fetch bookings");
  return res.json();
}

async function getBookingsByEmail(email: string) {
  const res = await fetch(`/api/booking?email=${encodeURIComponent(email)}`);
  if (!res.ok) throw new Error("Failed to fetch bookings by email");
  return res.json();
}

async function deleteBooking(id: string) {
  const res = await fetch(`/api/booking/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete booking");
  return res.json();
}

async function updateBooking(id: string, data: Record<string, unknown>) {
  const res = await fetch(`/api/booking/${encodeURIComponent(id)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update booking");
  return res.json();
}

const BookingService = {
  createBooking,
  getBookingById,
  getBookings,
  getBookingsByEmail,
  deleteBooking,
  updateBooking,
};

export default BookingService;
