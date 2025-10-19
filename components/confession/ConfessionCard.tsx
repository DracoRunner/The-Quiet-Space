import React from 'react';
import { Confession } from '../../types';
import Card from '../common/Card';

interface ConfessionCardProps {
    confession: Confession;
    onClick: () => void;
}

const formatTimeAgo = (date: Date): string => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 60) return `a few seconds ago`;
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
}

const ConfessionCard: React.FC<ConfessionCardProps> = ({ confession, onClick }) => {
    return (
        <Card 
            className="p-6 h-full flex flex-col cursor-pointer border-l-4 border-transparent hover:border-[#B48B7F] hover:shadow-2xl transition-all duration-300"
            onClick={onClick}
        >
            <p className="text-gray-700 italic flex-grow line-clamp-4">
                "{confession.text}"
            </p>
            <p className="text-right text-sm text-gray-400 mt-4">
                {formatTimeAgo(new Date(confession.timestamp))}
            </p>
        </Card>
    );
};

export default ConfessionCard;
