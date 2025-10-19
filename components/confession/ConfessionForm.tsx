'use client';

import React, { useState } from 'react';
import { confessionService } from '../../services/confessionService';

const MAX_CHARS = 500;

interface ConfessionFormProps {
    showMessage: (text: string, color: string, callback: (msg: {text: string, color: string} | null) => void) => void;
}

const ConfessionForm: React.FC<ConfessionFormProps> = ({ showMessage }) => {
    const [newConfession, setNewConfession] = useState('');
    const [message, setMessage] = useState<{ text: string; color: string } | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const text = newConfession.trim();
        if (text.length === 0) {
            showMessage("Please enter your thought before submitting.", 'text-red-500', setMessage);
            return;
        }

        setIsSubmitting(true);
        showMessage("Submitting your thought...", 'text-[#B48B7F]', setMessage);
        
        try {
            await confessionService.addConfession(text);
            setNewConfession('');
            showMessage("Thought released! Thank you for sharing.", 'text-[#2C3531]', setMessage);
        } catch (error) {
            showMessage("Error: Could not release thought. Please try again.", 'text-red-500', setMessage);
        } finally {
            setIsSubmitting(false);
        }
    };
    
    const remainingChars = MAX_CHARS - newConfession.length;

    return (
        <section className="bg-white p-8 rounded-xl shadow-2xl mb-20 border-t-4 border-[#B48B7F]">
            <h3 className="text-3xl font-bold text-[#2C3531] mb-6 text-center">Share Your Thought</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
                <textarea 
                    value={newConfession}
                    onChange={(e) => setNewConfession(e.target.value)}
                    rows={5} 
                    placeholder="Type your anonymous thought here. Let it go." 
                    maxLength={MAX_CHARS}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-[#B48B7F] focus:border-[#B48B7F] transition duration-200 text-[#2C3531] placeholder-gray-500 bg-gray-50/70 resize-none"
                    required
                />
                <div className="flex justify-between items-center">
                    <span className={`text-sm ${remainingChars < 0 ? 'text-red-500' : 'text-gray-500'}`}>
                        {remainingChars} characters remaining
                    </span>
                    <button 
                        type="submit" 
                        disabled={isSubmitting || newConfession.trim().length === 0}
                        className="bg-[#2C3531] text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B48B7F] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Anonymously'}
                    </button>
                </div>
                 {message && <p className={`text-center text-sm font-medium ${message.color}`}>{message.text}</p>}
            </form>
        </section>
    );
};

export default ConfessionForm;
