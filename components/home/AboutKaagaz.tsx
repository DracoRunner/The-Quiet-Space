import type React from "react";

const AboutKaagaz: React.FC = () => {
  return (
    <section className="bg-[#F0F2EF] py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-3">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#006442] mb-1">
              About Kaagaz
            </h3>
            <h4 className="text-4xl font-extrabold mb-4">
              WRITTEN BY SATWIKK ARORA
            </h4>
            <p className="text-lg leading-relaxed mb-8">
              This book offers a profound exploration of the complexities of
              heartbreak, delving deep into the emotional and psychological
              stages one experiences during such a turbulent time. It serves as
              a gentle guide for readers to rediscover their strength, rebuild
              their identity, and embrace the possibility of growth and renewal
              after heartbreak.
            </p>
            <button type="button" className="btn-pill">
              Buy Kaagaz Now
            </button>
          </div>
          <div className="md:col-span-2">
            {/* <Image
              src="https://placehold.co/400x500/1E3A2B/F0F2EF?text=KAAGAZ"
              alt="Book cover of Kaagaz"
              className="rounded-lg shadow-2xl w-full object-cover aspect-[4/5]"
              width={400}
              height={500}
            /> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutKaagaz;
