import Image from "next/image";
import Link from "next/link";
import type React from "react";
import BookingButton from "##/components/BookingButton";

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
        <Link href="/" className=" justify-center  tracking-wider">
          <div className="flex items-center text-2xl font-bold text-[#2C3531]">
            <Image
              alt="groom logo"
              src="/images/logo.png"
              height={50}
              width={50}
            />
            Groom
          </div>
          <span className="text-[10px] uppercase  font-semibold  text-gray-500">
            Transform today, lead tomorrow
          </span>
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
          <Link
            href="/bookings"
            className="hover:text-[#B48B7F] transition duration-300"
          >
            Bookings
          </Link>
        </nav>
        <BookingButton className="btn-sm" />
      </div>
    </header>
  );
};

export default Header;
