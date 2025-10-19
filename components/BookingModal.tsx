'use client';

import React from 'react';
import { ToggleModalFunction } from '../types';

interface BookingModalProps {
    isOpen: boolean;
    toggleModal: ToggleModalFunction;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, toggleModal }) => {
    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would handle form submission
        alert('Booking request submitted!');
        toggleModal(false);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4" onClick={() => toggleModal(false)}>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-8 relative transform transition-all"
                 onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={() => toggleModal(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>

                <h2 className="text-3xl font-bold text-[#2C3531] mb-6 text-center">Book Your Discovery Call</h2>
                <p className="text-center text-gray-600 mb-8">
                    Take the first step. Fill out the form below, and we'll be in touch to schedule your confidential 1:1 session.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input type="text" id="name" required className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#B48B7F] focus:border-[#B48B7F]" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input type="email" id="email" required className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#B48B7F] focus:border-[#B48B7F]" />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700">What are you hoping to explore?</label>
                        <textarea id="message" rows={4} className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#B48B7F] focus:border-[#B48B7F] resize-none"></textarea>
                    </div>
                    <div>
                        <button type="submit" className="w-full bg-[#2C3531] text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B48B7F]">
                            Submit Request
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookingModal;
