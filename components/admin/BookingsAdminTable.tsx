"use client";

import { useState } from "react";
import BookingModal from "##/components/admin/BookingModal";

type BookingRow = {
  id: string;
  name?: string;
  email?: string;
  when?: string | Date;
  link?: string;
  message?: string;
};

type Props = { bookings: BookingRow[] };

export default function BookingsAdminTable({ bookings }: Props) {
  const [openBooking, setOpenBooking] = useState<string | null>(null);
  const booking = bookings.find((b) => b.id === openBooking) ?? null;

  return (
    <div className="card table-card">
      <div className="mb-6">
        <h3 className="text-3xl font-bold text-[#B48B7F]">Bookings</h3>
        <p className="text-sm text-gray-500 mt-1">
          Manage user session bookings and appointments
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-16 h-16 mx-auto text-gray-300 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <title>No bookings</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="text-gray-500">No bookings yet</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Scheduled Time</th>
                <th>Meeting Link</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((bk) => (
                <tr key={bk.id} className="hover:bg-gray-50 transition-colors">
                  <td className="font-medium">{bk.name || "-"}</td>
                  <td className="text-gray-600">{bk.email || "-"}</td>
                  <td className="text-gray-600">
                    {typeof bk.when === "string"
                      ? bk.when
                      : bk.when
                        ? new Date(bk.when).toLocaleString()
                        : "-"}
                  </td>
                  <td>
                    {bk.link ? (
                      <a
                        href={bk.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#B48B7F] hover:underline inline-flex items-center gap-1"
                      >
                        Join
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <title>External link</title>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="text-right">
                    <button
                      type="button"
                      className="px-3 py-1.5 text-sm rounded-md bg-[#2C3531] text-white hover:bg-[#B48B7F] transition-colors inline-flex items-center gap-2"
                      onClick={() => setOpenBooking(bk.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <title>View</title>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <BookingModal booking={booking} onClose={() => setOpenBooking(null)} />
    </div>
  );
}
