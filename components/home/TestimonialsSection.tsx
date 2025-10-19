import React from 'react';
import Card from '../common/Card';

const TestimonialsSection: React.FC = () => {
    return (
        <section id="reviews" className="py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h3 className="text-4xl font-bold text-center text-[#2C3531] mb-16">What Clients Say</h3>
                <div className="grid md:grid-cols-3 gap-8">
                    <Card className="p-8 border-t-4 border-[#B48B7F]">
                        <p className="text-3xl text-[#B48B7F] mb-4">“</p>
                        <p className="text-gray-700 italic">"The clarity I found in just three sessions was transformative. It felt like talking to a deeply intuitive friend who is also a professional expert."</p>
                        <p className="mt-4 font-semibold text-[#2C3531]">— Anya S.</p>
                    </Card>
                    <Card className="p-8 border-t-4 border-[#B48B7F]">
                        <p className="text-3xl text-[#B48B7F] mb-4">“</p>
                        <p className="text-gray-700 italic">"This space is truly quiet and non-judgemental. It helped me process complex feelings without the pressure of having to perform."</p>
                        <p className="mt-4 font-semibold text-[#2C3531]">— David P.</p>
                    </Card>
                    <Card className="p-8 border-t-4 border-[#B48B7F]">
                        <p className="text-3xl text-[#B48B7F] mb-4">“</p>
                        <p className="text-gray-700 italic">"I highly recommend the 1:1 sessions. The practical tools given were easy to apply to my everyday stress. A real anchor."</p>
                        <p className="mt-4 font-semibold text-[#2C3531]">— Emi J.</p>
                    </Card>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;