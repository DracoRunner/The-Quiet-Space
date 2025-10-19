'use client';

import React from 'react';
import { ToggleModalFunction } from '../../types';

interface FounderSectionProps {
    toggleModal: ToggleModalFunction;
}

const FounderSection: React.FC<FounderSectionProps> = ({ toggleModal }) => {
    return (
        <section className="grid md:grid-cols-2 gap-12 items-center bg-white p-10 rounded-2xl shadow-xl border-t-4 border-[#B48B7F] mb-20">
            <div className="w-full h-96 bg-[#B48B7F]/30 rounded-xl overflow-hidden shadow-lg">
                <img src="https://picsum.photos/seed/founder/800/800" alt="Professional portrait of the founder" className="w-full h-full object-cover" />
            </div>
            <div className="space-y-6">
                <h3 className="text-4xl font-bold text-[#2C3531]">Meet Jane Doe, Founder</h3>
                <p className="text-lg text-gray-700">
                    With a background in cognitive behavioral therapy and mindfulness-based stress reduction, Jane established The Quiet Space to move beyond generic advice. She focuses on creating deeply personalized plans that respect the unique pace and context of every client.
                </p>
                <p className="text-lg text-gray-700 italic border-l-4 border-[#B48B7F] pl-4">
                    "My approach is rooted in the idea that you already possess the wisdom you need. My role is simply to help you hear it clearly."
                </p>
                <button onClick={() => toggleModal(true)} className="bg-[#2C3531] text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 transform hover:scale-[1.02] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B48B7F]">
                    Connect with Jane
                </button>
            </div>
        </section>
    );
};

export default FounderSection;
