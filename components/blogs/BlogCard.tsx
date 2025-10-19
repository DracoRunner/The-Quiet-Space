import React from 'react';
import { NavLink } from 'react-router-dom';
import Card from '../common/Card';

interface BlogCardProps {
    title: string;
    category: string;
    readTime: number;
    excerpt: string;
    imageSeed: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ title, category, readTime, excerpt, imageSeed }) => (
    <Card className="overflow-hidden hover:shadow-2xl transition duration-300 border border-gray-100">
        <img src={`httpshttps://picsum.photos/seed/${imageSeed}/600/400`} alt="Abstract image for blog post" className="w-full h-56 object-cover" />
        <div className="p-6">
            <p className="text-sm text-[#B48B7F] font-semibold mb-1">{category} &bull; {readTime} min read</p>
            <h4 className="text-xl font-bold mb-2 text-[#2C3531] hover:text-[#B48B7F] transition duration-300">{title}</h4>
            <p className="text-gray-600 text-sm line-clamp-3">{excerpt}</p>
            <NavLink to="#" className="inline-block mt-3 text-[#B48B7F] font-medium hover:text-[#2C3531] transition duration-300">Read Article →</NavLink>
        </div>
    </Card>
);

export default BlogCard;