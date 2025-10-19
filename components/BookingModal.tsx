"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import ModalHelper from "##/helpers/ModalHelper";

const BookingModal: React.FC = () => {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    when: "",
    reason: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Effect to control modal visibility animation and reset state
  useEffect(() => {
    const modal = modalRef.current;
    const content = contentRef.current;
    if (modal && content) {
      if (ModalHelper.isOpen.value) {
        // Reset form state each time the modal opens
        setIsSubmitted(false);
        setFormData({ name: "", email: "", when: "", reason: "" });

        modal.classList.remove("hidden");
        modal.classList.add("flex");
        setTimeout(() => {
          content.classList.remove("scale-95", "opacity-0");
          content.classList.add("scale-100", "opacity-100");
        }, 10);
      } else {
        content.classList.remove("scale-100", "opacity-100");
        content.classList.add("scale-95", "opacity-0");
        setTimeout(() => {
          modal.classList.remove("flex");
          modal.classList.add("hidden");
        }, 300);
      }
    }
  }, []);

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === modalRef.current) {
      ModalHelper.close();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate an API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Auto-close modal after a delay to show the success message
    setTimeout(() => {
      ModalHelper.close();
    }, 3000);
  };

  if (
    !ModalHelper.isOpen.value &&
    modalRef.current?.classList.contains("hidden")
  )
    return null;

  return (
    <div
      id="bookingModal"
      ref={modalRef}
      onClick={handleOutsideClick}
      onKeyDown={(e) => {
        if (e.key === "Escape") ModalHelper.close();
      }}
      tabIndex={-1}
      className="fixed inset-0 bg-opacity-70 z-[100] hidden items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
      aria-labelledby="bookingModalTitle"
    >
      <div
        id="modalContent"
        ref={contentRef}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 transform transition-all duration-300 scale-95 opacity-0"
      >
        <div className="flex justify-between items-start mb-6">
          <h3
            id="bookingModalTitle"
            className="text-3xl font-bold text-[#B48B7F]"
          >
            {isSubmitted ? "Request Sent!" : "Book Your Session"}
          </h3>
          <button
            type="button"
            onClick={() => ModalHelper.close()}
            className="text-[#2C3531] hover:text-red-500 transition"
            aria-label="Close modal"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
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
              ></path>
            </svg>
          </button>
        </div>

        {isSubmitted ? (
          <div className="text-center">
            <p className="text-gray-700 text-lg">
              Thank you for reaching out! We will get back to you at{" "}
              <span className="font-semibold">{formData.email}</span> shortly to
              confirm your session.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              This window will close automatically.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#B48B7F] focus:border-[#B48B7F] sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#B48B7F] focus:border-[#B48B7F] sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="when"
                className="block text-sm font-medium text-gray-700"
              >
                When would you like to connect?
              </label>
              <input
                type="datetime-local"
                name="when"
                id="when"
                value={formData.when}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#B48B7F] focus:border-[#B48B7F] sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="reason"
                className="block text-sm font-medium text-gray-700"
              >
                What would you like to discuss?
              </label>
              <textarea
                name="reason"
                id="reason"
                rows={4}
                value={formData.reason}
                onChange={handleChange}
                placeholder="Briefly describe what's on your mind."
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#B48B7F] focus:border-[#B48B7F] sm:text-sm resize-none"
              />
            </div>
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#2C3531] text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-[#B48B7F] transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B48B7F] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Booking Request"}
              </button>
            </div>
            <p className="text-center text-xs text-gray-500 pt-2">
              This is a request, not a confirmation. We will email you to
              finalize the date and time.
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
