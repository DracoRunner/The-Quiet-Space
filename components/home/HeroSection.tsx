import React from 'react';
import { ToggleModalFunction } from '../../types';

interface HeroSectionProps {
    toggleModal: ToggleModalFunction;
}

const HeroSection: React.FC<HeroSectionProps> = ({ toggleModal }) => {
    return (
        <section id="home" className="relative overflow-hidden py-24 md:py-36">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-5 gap-12 items-center">
                <div className="md:col-span-3 space-y-8">
                    <p className="text-lg text-[#B48B7F] font-semibold uppercase tracking-widest">Grounded, Gentle, Growth</p>
                    <h2 className="text-5xl md:text-7xl font-extrabold text-[#2C3531] leading-tight">
                        Find Clarity and <span className="text-[#B48B7F]">Deep Rest</span> in a Busy World.
                    </h2>
                    <p className="text-xl text-gray-700 max-w-lg">
                        We provide personalized, private 1:1 sessions focusing on mindful resilience and emotional regulation. Start with a foundation built on trust and expertise.
                    </p>
                    <button onClick={() => toggleModal(true)} className="inline-block bg-[#2C3531] text-white text-xl font-semibold py-4 px-10 rounded-lg shadow-2xl transition duration-300 transform hover:scale-[1.02] hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B48B7F]">
                        Book Your Discovery Call
                    </button>
                </div>
                <div className="md:col-span-2 hidden md:block">
                    <div className="w-full h-[450px] bg-[#2C3531] rounded-3xl shadow-2xl overflow-hidden">
                        <img src="https://picsum.photos/seed/calm/600/900" alt="Calming natural scene" className="w-full h-full object-cover opacity-80" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;