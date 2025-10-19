import React from 'react';
import { ToggleModalFunction } from '../types';
import HeroSection from '../components/home/HeroSection';
import ProcessSection from '../components/home/ProcessSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import BlogsPreviewSection from '../components/home/BlogsPreviewSection';
import ConfessionsPreviewSection from '../components/home/ConfessionsPreviewSection';
import FinalCTASection from '../components/home/FinalCTASection';

interface HomeProps {
    toggleModal: ToggleModalFunction;
}

const Home: React.FC<HomeProps> = ({ toggleModal }) => {
    return (
        <>
            <HeroSection toggleModal={toggleModal} />
            <ProcessSection />
            <TestimonialsSection />
            <BlogsPreviewSection />
            <ConfessionsPreviewSection />
            <FinalCTASection toggleModal={toggleModal} />
        </>
    );
};

export default Home;