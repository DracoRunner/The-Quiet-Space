import React, { useEffect, useRef } from 'react';
import { Confession as ConfessionType } from '../../types';

interface ConfessionModalProps {
    isOpen: boolean;
    onClose: () => void;
    confession: ConfessionType | null;
}

const ConfessionModal: React.FC<ConfessionModalProps> = ({ isOpen, onClose, confession }) => {
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
            onClose();
        }
    };

    if (!confession) return null;

    const timeString = confession.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) + ', ' + confession.timestamp.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    return (
        <div
            ref={modalRef}
            onClick={handleOutsideClick}
            className="fixed inset-0 bg-[#2C3531] bg-opacity-70 z-[100] hidden items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
        >
            <div
                ref={contentRef}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 transform transition-all duration-300 scale-95 opacity-0 relative"
            >
                <button onClick={onClose} className="absolute top-4 right-4 text-[#2C3531] hover:text-red-500 transition" aria-label="Close modal">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
                
                <div className="bg-stone-50/80 rounded-lg p-6">
                     <p className="font-lora text-gray-800 italic text-xl whitespace-pre-wrap">
                        {confession.text}
                    </p>
                    <div className="flex justify-between items-center mt-6 pt-3 border-t border-stone-200">
                        <p className="text-sm text-gray-400">{timeString}</p>
                        <p className="text-base font-medium text-gray-500">— Anonymous</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfessionModal;