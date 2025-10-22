import type React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="py-12 bg-charcoal/90 text-gray-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <p>&copy; 2024 The Quiet Space.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a
            href="#privacy"
            className="hover:text-white transition duration-300 text-sm"
          >
            Privacy
          </a>

          <a
            href="#terms"
            className="hover:text-white transition duration-300 text-sm"
          >
            Terms
          </a>
          <a
            href="https://www.prajanova.com"
            className="hover:text-white transition duration-300 text-sm"
          >
            Developed by @prajanova
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
