import React, { useEffect, useRef } from 'react';
import { ToggleModalFunction } from '../types';

interface BookingModalProps {
    isOpen: boolean;
    toggleModal: ToggleModalFunction;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, toggleModal }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const modal = modalRef.current;
        const content = contentRef.current;
        if (modal && content) {
            if (isOpen) {
                modal.classList.remove('hidden');
                modal.classList.add('flex');
                setTimeout(() => {
                    content.classList.remove('scale-95', 'opacity-0');
                    content.classList.add('scale-100', 'opacity-100');
                }, 10);
            } else {
                content.classList.remove('scale-100', 'opacity-100');
                content.classList.add('scale-95', 'opacity-0');
                setTimeout(() => {
                    modal.classList.remove('flex');
                    modal.classList.add('hidden');
                }, 300);
            }
        }
    }, [isOpen]);

    const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === modalRef.current) {
            toggleModal(false);
        }
    };

    if (!isOpen && modalRef.current?.classList.contains('hidden')) return null;

    return (
        <div 
            id="bookingModal" 
            ref={modalRef}
            onClick={handleOutsideClick}
            className="fixed inset-0 bg-[#2C3531] bg-opacity-70 z-[100] hidden items-center justify-center p-4"
        >
            <div 
                id="modalContent" 
                ref={contentRef}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 transform transition-all duration-300 scale-95 opacity-0"
            >
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-3xl font-bold text-[#B48B7F]">Book Your Session</h3>
                    <button onClick={() => toggleModal(false)} className="text-[#2C3531] hover:text-red-500 transition">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
                <p className="text-gray-700 mb-6">Secure your private 1:1 session now. You will be redirected to our secure scheduling platform (e.g., Calendly).</p>
                <div className="space-y-4">
                    <a href="#link-to-30-min-discovery" target="_blank" rel="noopener noreferrer" className="block text-center bg-[#2C3531] text-white font-semibold py-3 rounded-lg hover:bg-[#B48B7F] transition duration-300">
                        30-Minute Discovery Call (Free)
                    </a>
                    <a href="#link-to-60-min-session" target="_blank" rel="noopener noreferrer" className="block text-center bg-[#B48B7F] text-white font-semibold py-3 rounded-lg hover:bg-[#9C776D] transition duration-300">
                        60-Minute Deep Dive Session
                    </a>
                </div>
                <p className="text-center text-sm text-gray-500 mt-6">No login required. All communication is confidential.</p>
            </div>
        </div>
    );
};

export default BookingModal;