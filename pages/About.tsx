import React from 'react';
import { ToggleModalFunction } from '../types';
import MissionSection from '../components/about/MissionSection';
import FounderSection from '../components/about/FounderSection';
import PhilosophySection from '../components/about/PhilosophySection';
import ScrollAnimation from '../components/common/ScrollAnimation';

interface AboutProps {
    toggleModal: ToggleModalFunction;
}

const About: React.FC<AboutProps> = ({ toggleModal }) => {
    return (
        <main className="max-w-5xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
            <ScrollAnimation>
                <MissionSection />
            </ScrollAnimation>
            <ScrollAnimation delay={200}>
                <FounderSection toggleModal={toggleModal} />
            </ScrollAnimation>
            <ScrollAnimation delay={200}>
                <PhilosophySection />
            </ScrollAnimation>
        </main>
    );
};

export default About;