"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { showAlert, showConfirm } from "##/utils/modalHelpers";

type Booking = {
  id?: string;
  name?: string;
  email?: string;
  time?: string | Date;
  link?: string;
  message?: string;
};

type Props = {
  booking: Booking | null;
  onClose: () => void;
};

export default function BookingModal({ booking, onClose }: Props) {
  const router = useRouter();
  const [suggestedTime, setSuggestedTime] = useState("");

  if (!booking) return null;

  async function handleCancel() {
    showConfirm(
      "Cancel this booking? This will delete the booking.",
      async () => {
        const id = booking?.id;
        if (!id) {
          showAlert("Missing booking id");
          return;
        }

        try {
          const res = await fetch(`/api/booking/${id}`, { method: "DELETE" });
          if (!res.ok) throw new Error("Failed to cancel booking");
          showAlert("Booking cancelled", () => {
            onClose();
            router.refresh();
          });
        } catch (err) {
          showAlert(String(err));
        }
      },
    );
  }

  async function handleConfirm() {
    showConfirm("Confirm this booking?", async () => {
      const id = booking?.id;
      if (!id) {
        showAlert("Missing booking id");
        return;
      }

      try {
        const res = await fetch(`/api/booking/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "confirmed" }),
        });
        if (!res.ok) throw new Error("Failed to confirm booking");
        showAlert("Booking confirmed", () => {
          onClose();
          router.refresh();
        });
      } catch (err) {
        showAlert(String(err));
      }
    });
  }

  async function handleMarkDone() {
    showConfirm("Mark this booking as done?", async () => {
      const id = booking?.id;
      if (!id) {
        showAlert("Missing booking id");
        return;
      }

      try {
        const res = await fetch(`/api/booking/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "done" }),
        });
        if (!res.ok) throw new Error("Failed to mark booking done");
        showAlert("Booking marked as done", () => {
          onClose();
          router.refresh();
        });
      } catch (err) {
        showAlert(String(err));
      }
    });
  }

  async function handleSuggest() {
    if (!suggestedTime) {
      showAlert("Please enter a suggested time before sending.");
      return;
    }

    showConfirm(`Send suggested time: ${suggestedTime}?`, async () => {
      const id = booking?.id;
      if (!id) {
        showAlert("Missing booking id");
        return;
      }

      try {
        const res = await fetch(`/api/booking/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ suggestedTime }),
        });
        if (!res.ok) throw new Error("Failed to suggest new time");
        showAlert("Suggested time sent", () => {
          onClose();
          router.refresh();
        });
      } catch (err) {
        showAlert(String(err));
      }
    });
  }

  return (
    <div
      className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl p-8 transform transition-all duration-300 max-h-[90vh] overflow-auto relative">
        {/* Header with close button */}
        <div className="flex items-start justify-between mb-6">
          <h3 className="text-3xl font-bold text-[#B48B7F]">Booking Details</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-[#2C3531] hover:text-red-500 transition p-1"
            aria-label="Close"
          >
            <svg
              className="w-8 h-8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-hidden="false"
            >
              <title>Close</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="modal-body space-y-4">
          <div>
            <p className="block text-sm font-medium text-gray-700">Name</p>
            <div className="mt-1 p-3 bg-gray-50 rounded-md text-gray-700">
              {booking.name ?? "-"}
            </div>
          </div>
          <div>
            <p className="block text-sm font-medium text-gray-700">Email</p>
            <div className="mt-1 p-3 bg-gray-50 rounded-md text-gray-700">
              {booking.email ?? "-"}
            </div>
          </div>

          <div>
            <label
              htmlFor="time-request"
              className="block text-sm font-medium text-gray-700"
            >
              Time Request
            </label>
            <input
              id="time-request"
              type="text"
              readOnly
              value={
                booking.time
                  ? typeof booking.time === "string"
                    ? booking.time
                    : new Date(booking.time).toLocaleString()
                  : "-"
              }
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700"
            />
          </div>

          {booking.message ? (
            <div>
              <p className="block text-sm font-medium text-gray-700">Message</p>
              <div className="mt-1 p-3 bg-gray-50 rounded-md text-gray-700 whitespace-pre-wrap">
                {booking.message}
              </div>
            </div>
          ) : null}

          <div>
            <label
              htmlFor="suggested-time"
              className="block text-sm font-medium text-gray-700"
            >
              Suggested Time
            </label>
            <input
              id="suggested-time"
              type="datetime-local"
              value={suggestedTime}
              onChange={(e) => setSuggestedTime(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#B48B7F] focus:border-[#B48B7F]"
            />
            <p className="text-sm text-gray-500 mt-1">
              Use the picker to choose a date and time (local).
            </p>
          </div>
        </div>

        <div className="modal-footer mt-6 flex justify-center gap-3">
          {/* Cancel / Delete - danger */}
          <button
            type="button"
            className="px-3 py-2 text-sm rounded-md bg-white border border-red-200 text-red-600 hover:bg-red-50 flex items-center gap-2"
            onClick={handleCancel}
            aria-label="Cancel booking"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <title>Delete</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 7l-1 12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 7m5 4v6m4-6v6M9 7V4h6v3"
              />
            </svg>
            Cancel
          </button>

          {/* Suggest - blue with clock icon */}
          <button
            type="button"
            className="px-3 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2"
            onClick={handleSuggest}
            aria-label="Suggest time"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <title>Suggest time</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Suggest
          </button>

          {/* Confirm - green with check icon */}
          <button
            type="button"
            className="px-3 py-2 text-sm rounded-md bg-green-600 text-white hover:bg-green-700 flex items-center gap-2"
            onClick={handleConfirm}
            aria-label="Confirm booking"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <title>Confirm</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            Confirm
          </button>

          {/* Done - keep as-is */}
          <button
            type="button"
            className="px-3 py-2 text-sm rounded-md bg-transparent border border-gray-200 text-[#2C3531] hover:bg-gray-50"
            onClick={handleMarkDone}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
