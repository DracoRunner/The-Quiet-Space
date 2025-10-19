import React from 'react';
import { Confession as ConfessionType } from '../../types';

interface ConfessionCardProps {
    confession: ConfessionType;
    onClick: () => void;
}

const TRUNCATE_LENGTH = 200;

const ConfessionCard: React.FC<ConfessionCardProps> = ({ confession, onClick }) => {
    const timeString = confession.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) + ', ' + confession.timestamp.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    const truncatedText = confession.text.length > TRUNCATE_LENGTH
        ? confession.text.substring(0, TRUNCATE_LENGTH) + '...'
        : confession.text;

    return (
        <button 
            onClick={onClick}
            className="flex flex-col h-full bg-stone-50/80 rounded-lg p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 text-left w-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B48B7F]"
            aria-label="Read full confession"
        >
            <p className="font-lora text-gray-800 italic text-lg whitespace-pre-wrap flex-grow">
                {truncatedText}
            </p>
            <div className="flex justify-between items-center mt-6 pt-3 border-t border-stone-200">
                <p className="text-xs text-gray-400">{timeString}</p>
                <p className="text-sm font-medium text-gray-500">— Anonymous</p>
            </div>
        </button>
    );
};

export default ConfessionCard;