import React from 'react';
import { NavLink } from 'react-router-dom';
import Card from '../common/Card';

const BlogsPreviewSection: React.FC = () => {
    return (
        <section id="blogs-section" className="py-24 bg-white/70 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h3 className="text-4xl font-bold text-center text-[#2C3531] mb-16">Insight & Guidance</h3>
                <div className="grid md:grid-cols-3 gap-8">
                    <Card className="overflow-hidden hover:shadow-2xl transition duration-300">
                        <img src="https://picsum.photos/seed/mindful/600/400" alt="Mindfulness" className="w-full h-48 object-cover"/>
                        <div className="p-6">
                            <p className="text-sm text-[#B48B7F] font-semibold mb-1">Mindfulness</p>
                            <h4 className="text-xl font-semibold mb-2 text-[#2C3531]">5 Simple Ways to Start Your Day Mindfully</h4>
                            <p className="text-gray-600 text-sm line-clamp-3">A brief guide to integrating quick, effective mindfulness practices into your morning routine for a centered day...</p>
                            <NavLink to="/blogs" className="inline-block mt-3 text-[#B48B7F] font-medium hover:text-[#2C3531] transition duration-300">Read More →</NavLink>
                        </div>
                    </Card>
                    <Card className="overflow-hidden hover:shadow-2xl transition duration-300">
                        <img src="https://picsum.photos/seed/stress/600/400" alt="Stress Relief" className="w-full h-48 object-cover"/>
                        <div className="p-6">
                            <p className="text-sm text-[#B48B7F] font-semibold mb-1">Stress Management</p>
                            <h4 className="text-xl font-semibold mb-2 text-[#2C3531]">Understanding and Halting the Stress Cycle</h4>
                            <p className="text-gray-600 text-sm line-clamp-3">We break down the physical and emotional loop of stress and offer three practical interrupt techniques...</p>
                            <NavLink to="/blogs" className="inline-block mt-3 text-[#B48B7F] font-medium hover:text-[#2C3531] transition duration-300">Read More →</NavLink>
                        </div>
                    </Card>
                    <Card className="overflow-hidden hover:shadow-2xl transition duration-300">
                        <img src="https://picsum.photos/seed/selfcare/600/400" alt="Self-Care" className="w-full h-48 object-cover"/>
                        <div className="p-6">
                            <p className="text-sm text-[#B48B7F] font-semibold mb-1">Self-Care</p>
                            <h4 className="text-xl font-semibold mb-2 text-[#2C3531]">The Power of Boundaries in Digital Age Self-Care</h4>
                            <p className="text-gray-600 text-sm line-clamp-3">Setting limits is a crucial act of self-love. Learn how to establish healthy digital and emotional boundaries...</p>
                            <NavLink to="/blogs" className="inline-block mt-3 text-[#B48B7F] font-medium hover:text-[#2C3531] transition duration-300">Read More →</NavLink>
                        </div>
                    </Card>
                </div>
                <div className="text-center mt-12">
                    <NavLink to="/blogs" className="inline-block text-lg font-semibold text-[#2C3531] border-b-2 border-[#B48B7F] pb-1 hover:border-[#2C3531] transition duration-300">
                        View All Articles
                    </NavLink>
                </div>
            </div>
        </section>
    );
};

export default BlogsPreviewSection;