import BlogsPreviewSection from "../components/home/BlogsPreviewSection";
import ConfessionsPreviewSection from "../components/home/ConfessionsPreviewSection";
import FinalCTASection from "../components/home/FinalCTASection";
import HeroSection from "../components/home/HeroSection";
import ProcessSection from "../components/home/ProcessSection";
import TestimonialsSection from "../components/home/TestimonialsSection";

const Home: React.FC = () => {
  return (
    <>
      <HeroSection />
      <ProcessSection />
      <TestimonialsSection />
      <BlogsPreviewSection />
      <ConfessionsPreviewSection />
      <FinalCTASection />
    </>
  );
};

export default Home;
