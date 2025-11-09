"use client";

import ModalManager from "##/utils/ModalManager";
import ManageBookingModal from "./ManageBookingModal";

interface Booking {
  id: string;
  date: string;
  time: string;
  service: string;
  status: "confirmed" | "pending" | "cancelled";
  email?: string;
}

interface Props {
  bookings: Booking[];
}

const BookingList: React.FC<Props> = ({ bookings }) => {
  const handleManageClick = (booking: Booking) => {
    ModalManager.open(<ManageBookingModal booking={booking} />);
  };

  if (bookings.length === 0) {
    return <div className="text-center text-gray-500">No bookings yet.</div>;
  }

  return (
    <div className="grid gap-4">
      {bookings.map((booking) => (
        <div
          key={booking.id}
          className="border border-gray-200 rounded-xl shadow-sm p-5 hover:shadow-md transition"
        >
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">{booking.service}</h2>
            <span
              className={`text-sm px-3 py-1 rounded-sm ${
                booking.status === "confirmed"
                  ? "bg-green-100 text-green-700"
                  : booking.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
              }`}
            >
              {booking.status}
            </span>
          </div>
          <p className="text-gray-700 mb-3">
            {booking.date} at {booking.time}
          </p>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => handleManageClick(booking)}
              className="border border-gray-300 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition cursor-pointer"
            >
              Manage
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookingList;
