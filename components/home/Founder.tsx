import Image from "next/image";
import type React from "react";

const Founder: React.FC = () => {
  return (
    <section id="founder" className="bg-[#D0D6C9] py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Founder Section */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-2">
            {/* Placeholder for Founder's portrait */}
            <Image
              src="https://placehold.co/400x500/D0D6C9/1E3A2B?text=Satwikk+Arora"
              alt="Satwikk Arora, Founder"
              className="rounded-lg shadow-2xl w-full object-cover aspect-[4/5]"
              width={400}
              height={500}
            />
          </div>
          <div className="md:col-span-3">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#006442] mb-1">
              Meet the Founder
            </h3>
            <h4 className="text-4xl font-extrabold mb-4">SATWIKK ARORA</h4>
            <p className="mb-6 text-lg leading-relaxed">
              With a background in understanding an individual's journey and
              identifying deep routed issues, Satwikk established "Groom" to
              move beyond generic advice. He focuses on creating deeply
              personalized plans that respect the unique pace and context of
              every client.
            </p>
            <blockquote className="border-l-4 border-[#8C2D3A] pl-6 text-xl text-[#1E3A2B]">
              "My belief is that you already possess the wisdom you need. My
              role is simply to help you meet yourself."
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Founder;
