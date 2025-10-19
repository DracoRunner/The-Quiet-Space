'use client';

import React from 'react';
import HeroSection from '../components/home/HeroSection';
import ProcessSection from '../components/home/ProcessSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import BlogsPreviewSection from '../components/home/BlogsPreviewSection';
import ConfessionsPreviewSection from '../components/home/ConfessionsPreviewSection';
import FinalCTASection from '../components/home/FinalCTASection';
import { useModal } from './ClientLayout';

export default function HomePage() {
  const { toggleModal } = useModal();

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
}
