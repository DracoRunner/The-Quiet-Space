import React from 'react';
import { ToggleModalFunction } from '../../types';

interface FinalCTASectionProps {
    toggleModal: ToggleModalFunction;
}

const FinalCTASection: React.FC<FinalCTASectionProps> = ({ toggleModal }) => {
    return (
        <section id="booking-cta" className="py-20 bg-[#2C3531]">
            <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                <h3 className="text-4xl font-extrabold text-white mb-4">Ready to Start Your Work?</h3>
                <p className="text-xl text-gray-300 mb-8">
                    Schedule your confidential, non-judgmental 1:1 session today.
                </p>
                <button onClick={() => toggleModal(true)} className="inline-block bg-[#2C3531] text-white font-extrabold text-2xl py-4 px-12 rounded-lg shadow-2xl transition duration-300 transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B48B7F]">
                    Book 1:1 Session Now
                </button>
            </div>
        </section>
    );
};

export default FinalCTASection;