"use client";
import Link from "next/link";
import type React from "react";
import { useCallback } from "react";
import ModalHelper from "##/helpers/ModalHelper";
import BookingModal from "./BookingModal";

const Header: React.FC = () => {
  // styles handled via Tailwind classes

  const onBookingClick = useCallback(() => {
    ModalHelper.open(<BookingModal />);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
        <Link
          href="/"
          className="text-2xl font-bold text-[#2C3531] tracking-wider"
        >
          The Quiet Space
        </Link>
        <nav className="hidden md:flex space-x-8 text-lg font-medium">
          <Link
            href="/"
            className="hover:text-[#B48B7F] transition duration-300"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="hover:text-[#B48B7F] transition duration-300"
          >
            About Us
          </Link>
          <Link
            href="/blogs"
            className="hover:text-[#B48B7F] transition duration-300"
          >
            Blogs
          </Link>
          <Link
            href="/confessions"
            className="hover:text-[#B48B7F] transition duration-300"
          >
            Confession
          </Link>
        </nav>
        <button
          onClick={onBookingClick}
          type="button"
          className="bg-[#2C3531] text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition duration-300 transform hover:scale-[1.02] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B48B7F]"
        >
          Book Session
        </button>
        <button
          type="button"
          className="md:hidden text-[#2C3531] focus:outline-none"
          aria-label="Open menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-hidden="false"
          >
            <title>Menu</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
