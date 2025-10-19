import React from 'react';
import { Confession as ConfessionType } from '../../types';

interface ConfessionCardProps {
    confession: ConfessionType;
}

const ConfessionCard: React.FC<ConfessionCardProps> = ({ confession }) => {
    const timeString = confession.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) + ', ' + confession.timestamp.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    return (
        <div className="p-6 bg-white rounded-xl border-l-4 border-[#B48B7F] transition duration-300 shadow-sm hover:shadow-md">
            <p className="text-3xl text-[#2C3531]/30 mb-2 font-serif">“</p>
            <p className="text-gray-700 italic text-lg whitespace-pre-wrap">{confession.text}</p>
            <div className="flex justify-between items-center mt-4 pt-2 border-t border-gray-100">
                <p className="text-xs text-gray-500">{timeString}</p>
                <p className="text-sm font-medium text-gray-400">— Anonymous</p>
            </div>
        </div>
    );
};

export default ConfessionCard;