"use client";

import { useState } from "react";
import ModalManager from "##/utils/ModalManager";
import { showAlert } from "##/utils/modalHelpers";

interface Booking {
  id: string;
  date: string;
  time: string;
  service: string;
}

interface Props {
  booking: Booking;
}

const RescheduleBookingModal: React.FC<Props> = ({ booking }) => {
  const [newDate, setNewDate] = useState(booking.date);
  const [newTime, setNewTime] = useState(booking.time);
  const [loading, setLoading] = useState(false);

  const handleReschedule = async () => {
    if (!newDate || !newTime) {
      showAlert("Please select both date and time.");
      return;
    }

    setLoading(true);
    try {
      const when = new Date(`${newDate}T${newTime}`).toISOString();
      const res = await fetch(`/api/booking/${booking.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ when }),
      });

      if (!res.ok) throw new Error("Failed to reschedule booking");

      showAlert("Booking rescheduled successfully!", () => {
        window.location.reload();
      });
      ModalManager.close();
    } catch (err) {
      console.error(err);
      showAlert("Something went wrong while rescheduling.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-2">
      <h2 className="text-2xl font-bold text-[#2C3531] mb-4">
        Reschedule Booking
      </h2>
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-semibold text-[#B48B7F] mb-2">
          {booking.service}
        </h3>
        <p className="text-gray-600 mb-4">
          Select a new date and time for your session
        </p>

        <div className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-gray-700 mb-1 block">
              New Date
            </span>
            <div className="relative">
              <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#B48B7F] focus:border-transparent transition-all duration-200"
              />
              <svg
                className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <title>Calendar icon</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          </label>

          <label className="block">
            <span className="text-sm font-medium text-gray-700 mb-1 block">
              New Time
            </span>
            <div className="relative">
              <input
                type="time"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#B48B7F] focus:border-transparent transition-all duration-200"
              />
              <svg
                className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <title>Clock icon</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </label>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => ModalManager.close()}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="button"
          disabled={loading}
          onClick={handleReschedule}
          className="flex items-center px-4 py-2 bg-[#2C3531] text-white rounded-lg hover:bg-opacity-90 transition-all duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading && (
            <svg
              className="animate-spin -ml-1 mr-2 h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
            >
              <title>Loading</title>
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          )}
          {loading ? "Updating..." : "Confirm Changes"}
        </button>
      </div>
    </div>
  );
};

export default RescheduleBookingModal;
