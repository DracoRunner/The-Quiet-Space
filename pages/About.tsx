import React from 'react';
import { ToggleModalFunction } from '../types';
import MissionSection from '../components/about/MissionSection';
import FounderSection from '../components/about/FounderSection';
import PhilosophySection from '../components/about/PhilosophySection';

interface AboutProps {
    toggleModal: ToggleModalFunction;
}

const About: React.FC<AboutProps> = ({ toggleModal }) => {
    return (
        <main className="max-w-5xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
           <MissionSection />
           <FounderSection toggleModal={toggleModal} />
           <PhilosophySection />
        </main>
    );
};

export default About;