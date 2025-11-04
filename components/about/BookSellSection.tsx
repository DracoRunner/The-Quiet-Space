import Image from "next/image";
import type React from "react";

const BookSellSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-[#D0D6C9] to-[#B48B7F]/20 p-10 rounded-2xl shadow-xl mb-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-4xl font-bold text-[#2C3531] mb-4">
            Transform Your Mental Health Journey
          </h3>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Discover practical insights and personalized strategies in Satwikk's
            comprehensive guide to mental wellness
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Book Image */}
          <div className="flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#006442] to-[#8C2D3A] rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
              <div className="relative bg-white p-4 rounded-lg shadow-2xl">
                <Image
                  src="/images/book_cover.png"
                  alt="Mental Health Guide by Satwikk Arora"
                  width={300}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>

          {/* Book Details */}
          <div className="space-y-6">
            <div>
              <h4 className="text-2xl font-bold text-[#2C3531] mb-2">
                "Finding Your Ground: A Personal Journey to Mental Wellness"
              </h4>
              <p className="text-lg text-[#006442] font-semibold">
                by Satwikk Arora
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <span className="text-[#8C2D3A] font-bold text-lg">✓</span>
                <p className="text-gray-700">
                  Practical frameworks for understanding your mental health
                  patterns
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-[#8C2D3A] font-bold text-lg">✓</span>
                <p className="text-gray-700">
                  Step-by-step exercises for building emotional resilience
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-[#8C2D3A] font-bold text-lg">✓</span>
                <p className="text-gray-700">
                  Real client stories and breakthrough moments
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-[#8C2D3A] font-bold text-lg">✓</span>
                <p className="text-gray-700">
                  Tools for creating your personalized mental wellness plan
                </p>
              </div>
            </div>

            <div className="bg-white/50 p-6 rounded-lg border-l-4 border-[#006442]">
              <p className="text-gray-700 italic">
                "This book isn't about quick fixes or one-size-fits-all
                solutions. It's about helping you discover the unique path to
                your own mental wellness, at your own pace, with compassion and
                understanding."
              </p>
              <p className="text-sm text-[#006442] font-semibold mt-2">
                - Satwikk Arora
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                className="flex-1 bg-[#006442] text-white font-bold py-4 px-8 rounded-full shadow-lg transition duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:bg-[#004d32] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#006442]"
              >
                Pre-Order Now - $24.99
              </button>
              <button
                type="button"
                className="flex-1 border-2 border-[#006442] text-[#006442] font-bold py-4 px-8 rounded-full shadow-lg transition duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:bg-[#006442] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#006442]"
              >
                Read Sample Chapter
              </button>
            </div>

            <div className="text-center text-sm text-gray-600">
              <p>Expected release: Spring 2026</p>
              <p>Available in paperback, hardcover, and digital formats</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookSellSection;
