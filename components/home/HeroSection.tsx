"use client";
import Image from "next/image";
import type React from "react";
import { useCallback, useEffect, useState } from "react";
import ModalManager from "##/utils/ModalManager";
import BookingModal from "../BookingModal";

const HeroSection: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  const onBookingClick = useCallback(() => {
    ModalManager.open(<BookingModal />);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const getAnimationClasses = (_delay: string) =>
    `transition-all duration-700 ease-out ${
      isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
    }`;

  return (
    <section id="home" className="relative overflow-hidden py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-5 gap-12 items-center">
        <div className="md:col-span-3 space-y-8">
          <p
            className={`text-lg text-[#B48B7F] font-semibold uppercase tracking-widest ${getAnimationClasses(
              "delay-100"
            )}`}
          >
            Grounded, Gentle, Growth
          </p>
          <h2
            className={`text-5xl md:text-7xl font-extrabold text-[#2C3531] leading-tight ${getAnimationClasses(
              "delay-200"
            )}`}
            style={{ transitionDelay: "200ms" }}
          >
            Find Clarity and <span className="text-[#B48B7F]">Deep Rest</span>{" "}
            in a Busy World.
          </h2>
          <p
            className={`text-xl text-gray-700 max-w-lg ${getAnimationClasses(
              "delay-300"
            )}`}
            style={{ transitionDelay: "350ms" }}
          >
            We provide personalized, private 1:1 sessions focusing on mindful
            resilience and emotional regulation. Start with a foundation built
            on trust and expertise.
          </p>
          <div
            className={getAnimationClasses("delay-500")}
            style={{ transitionDelay: "500ms" }}
          >
            <button
              onClick={onBookingClick}
              type="button"
              className="inline-block bg-[#2C3531] text-white text-xl font-semibold py-4 px-10 rounded-lg shadow-2xl transition duration-300 transform hover:scale-[1.02] hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B48B7F]"
            >
              Book Your Discovery Call
            </button>
          </div>
        </div>
        <div className="md:col-span-2 hidden md:block">
          <div
            className={`w-full h-[450px] bg-[#2C3531] rounded-3xl shadow-2xl overflow-hidden transition-opacity duration-1000 ${
              isMounted ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: "600ms" }}
          >
            <Image
              src="https://picsum.photos/seed/calm/600/900"
              alt="Calming natural scene"
              height={100}
              width={100}
              className="w-full h-full object-cover opacity-80"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
