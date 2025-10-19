import React from 'react';
import Link from 'next/link';
import Card from '../common/Card';

interface BlogCardProps {
    title: string;
    category: string;
    readTime: number;
    excerpt: string;
    imageSeed: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ title, category, readTime, excerpt, imageSeed }) => {
    return (
        <Card className="overflow-hidden h-full flex flex-col group hover:shadow-2xl transition-shadow duration-300">
            <div className="overflow-hidden">
                <img 
                    src={`https://picsum.photos/seed/${imageSeed}/600/400`} 
                    alt={title} 
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                    <p className="font-semibold text-[#B48B7F] uppercase tracking-wide">{category}</p>
                    <span>{readTime} min read</span>
                </div>
                <h3 className="text-xl font-bold text-[#2C3531] mb-2">{title}</h3>
                <p className="text-gray-600 text-sm flex-grow line-clamp-3">{excerpt}</p>
                <Link href="#" className="inline-block mt-4 text-[#B48B7F] font-semibold hover:text-[#2C3531] transition-colors duration-300 self-start">
                    Read More →
                </Link>
            </div>
        </Card>
    );
};

export default BlogCard;
