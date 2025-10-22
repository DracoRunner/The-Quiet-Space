import { Heart, Users } from "lucide-react";

function WhatIsMentalHealthSection() {
  return (
    <section className="py-20 px-6 from-sage-50 to-blue-50 bg-white/70">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 w-full flex flex-col">
          <h2 className="text-5xl lg:text-6xl font-bold text-slate-800 text-center">
            What is Mental Health?
          </h2>
          <i className="font-script text-xs md:text-base text-center text-[#8C2D3A]">
            It's not just about feeling good—it's about feeling whole.
          </i>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-md border">
              <p className="text-slate-700 text-lg leading-relaxed">
                Mental health is about how we think, feel, and handle life's ups
                and downs.
              </p>
            </div>
            <div className=" p-6 rounded-2xl shadow-md border">
              <div className="flex items-start gap-3">
                <Heart
                  className="text-rose-500 fill-rose-500 flex-shrink-0 mt-1"
                  size={24}
                />
                <p className="text-slate-700 text-lg">
                  It affects our relationships, work, and overall well-being.
                </p>
              </div>
            </div>
            <div className=" bg-white p-6 rounded-2xl shadow-md border">
              <p className="text-slate-700 text-lg">
                It's just as important as physical health—let's normalize taking
                care of it.
              </p>
            </div>
            <div className="bg-sage-100 p-6 rounded-2xl shadow-md border ">
              <p className="text-slate-700 text-lg">
                Good mental health helps us enjoy life, handle challenges, and
                connect with others.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="bg-white/70 backdrop-blur-sm p-8 rounded-3xl shadow-xl">
              <div className="w-full h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center relative">
                <Users size={100} className="text-slate-600" />
                <div className="absolute top-4 right-4 bg-white p-3 rounded-xl shadow-md">
                  <p className="text-xs text-sage-700 italic">
                    Mental health isn't just about what we feel—it defines who
                    we are
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default WhatIsMentalHealthSection;
