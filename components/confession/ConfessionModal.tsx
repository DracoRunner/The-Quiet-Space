import React from 'react';
import { Confession } from '../../types';

interface ConfessionModalProps {
    isOpen: boolean;
    onClose: () => void;
    confession: Confession | null;
}

const ConfessionModal: React.FC<ConfessionModalProps> = ({ isOpen, onClose, confession }) => {
    if (!isOpen || !confession) return null;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"
            onClick={onClose}
        >
            <div 
                className="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-8 relative transform transition-all"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
                
                <div className="space-y-6">
                    <p className="text-xl text-gray-800 leading-relaxed italic">
                        "{confession.text}"
                    </p>
                    <p className="text-right text-sm text-gray-500">
                        Shared on {new Date(confession.timestamp).toLocaleString()}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ConfessionModal;
