"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Modal from "##/components/Modal";
import BookingList from "./BookingList";

interface Booking {
  id: string;
  date: string;
  time: string;
  service: string;
  status: "confirmed" | "pending" | "cancelled";
  email?: string;
}

interface BackendBooking {
  id: string;
  name: string;
  email: string;
  when: string;
  reason?: string;
  status: "pending" | "confirmed" | "cancelled";
  meetingId?: string | null;
  createdAt: string;
}

function BookingPageContent() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const newBooking = searchParams.get("newBooking") === "true";

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("/api/booking");
        const data: BackendBooking[] = await res.json();

        const formatted: Booking[] = data.map((b) => {
          const dateObj = new Date(b.when);
          return {
            id: b.id,
            date: dateObj.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }),
            time: dateObj.toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
            }),
            service: b.reason || "General Session",
            status: b.status,
            email: b.email,
          };
        });

        setBookings(formatted);
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh] text-gray-600">
        <svg
          aria-hidden="true"
          role="presentation"
          className="animate-spin h-6 w-6 mr-2 text-gray-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
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
            d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 100 16v4l3.5-3.5L12 20v4a8 8 0 01-8-8z"
          />
        </svg>
        Loading your bookings...
      </div>
    );
  }

  if (newBooking && bookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-center">
        <div className="text-4xl mb-4">🎉</div>
        <h1 className="text-2xl font-semibold mb-2">Booking Confirmed!</h1>
        <p className="text-gray-600 mb-6">
          Your session has been successfully booked. We’ll send you a reminder
          before it starts.
        </p>
        <button
          type="button"
          onClick={() => window.location.replace("/bookings")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Go to Manage Bookings
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Manage Bookings</h1>
      <BookingList bookings={bookings} />
      <Modal />
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-[80vh] text-gray-600">
          Loading...
        </div>
      }
    >
      <BookingPageContent />
    </Suspense>
  );
}
