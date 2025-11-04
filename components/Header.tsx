import Link from "next/link";
import type React from "react";
import BookingButton from "##/components/BookingButton";

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
        <Link
          href="/"
          className="text-2xl font-bold text-[#2C3531] tracking-wider"
        >
          Groom
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
        <BookingButton className="btn-sm" />
      </div>
    </header>
  );
};

export default Header;
