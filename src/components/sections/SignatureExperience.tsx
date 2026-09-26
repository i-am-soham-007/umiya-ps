import React from 'react';
import { Calendar, Compass, Camera, Sparkles, Package, CheckCircle2, ShieldCheck, Zap, Award } from 'lucide-react';

interface SignatureExperienceProps {
  onOpenBooking: () => void;
}

export const SignatureExperience: React.FC<SignatureExperienceProps> = ({ onOpenBooking }) => {
  const steps = [
    {
      num: '01',
      title: 'Consultation & Booking',
      icon: <Calendar className="w-6 h-6 text-[#1E3A8A]" />,
      desc: 'We review your multi-day itinerary, event locations, and personal vision across USA or India.'
    },
    {
      num: '02',
      title: 'Creative Planning & Styling',
      icon: <Compass className="w-6 h-6 text-[#D62828]" />,
      desc: 'Shot list curation, outfit color coordination, lighting site inspection, and drone permits.'
    },
    {
      num: '03',
      title: 'The Shoot Day Experience',
      icon: <Camera className="w-6 h-6 text-amber-500" />,
      desc: 'Seamless execution with dual lead senior photographers, 4K cinema crew, and drone pilots.'
    },
    {
      num: '04',
      title: 'High-End Master Color Editing',
      icon: <Sparkles className="w-6 h-6 text-emerald-500" />,
      desc: 'Skin retouching, skin tone calibration, DaVinci Resolve film color grading, and vow audio sync.'
    },
    {
      num: '05',
      title: 'Album & Digital Delivery',
      icon: <Package className="w-6 h-6 text-indigo-500" />,
      desc: 'Online password gallery, 4K highlight video, and handcrafted Italian leather heirloom album.'
    }
  ];

  return (
    <section id="experience" className="py-24 bg-[#F3EFE9] text-[#1E293B] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest bg-emerald-100 text-emerald-900 uppercase border border-emerald-300">
            SIGNATURE PROCESS
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900">
            The UMIYA Studio Experience
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            From first conversation to receiving your handcrafted leather album, every detail is engineered for effortless luxury.
          </p>
        </div>

        {/* Process Timeline Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between relative group hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 group-hover:bg-[#1E3A8A] group-hover:text-white transition-colors flex items-center justify-center">
                    {step.icon}
                  </div>
                  <span className="font-serif font-bold text-2xl text-slate-300 group-hover:text-[#D62828] transition-colors">
                    {step.num}
                  </span>
                </div>

                <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-[#1E3A8A] transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-2">{step.desc}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-[10px] font-bold text-[#1E3A8A] uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Step {step.num} Included</span>
              </div>
            </div>
          ))}
        </div>

        {/* Why Choose Us Banner */}
        <div className="bg-gradient-to-r from-[#0F172A] via-[#1E3A8A] to-[#0F172A] rounded-3xl p-8 sm:p-12 text-white shadow-2xl grid grid-cols-1 md:grid-cols-3 gap-8 items-center border border-slate-800">
          <div className="space-y-3 md:col-span-2">
            <span className="text-amber-400 font-bold text-xs uppercase tracking-widest flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              WHY BRIDES & FAMILIES CHOOSE US
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl font-bold">Uncompromising Quality & Dual Continent Support</h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              We eliminate stress with 48-hour sneak peek photos, redundant dual camera backups, transparent pricing, and direct communication with our senior creative director.
            </p>
          </div>

          <div className="flex justify-start md:justify-end">
            <button
              onClick={onOpenBooking}
              className="bg-[#D62828] hover:bg-amber-500 text-white font-bold text-sm px-8 py-4 rounded-2xl shadow-xl transition-colors cursor-pointer"
            >
              Reserve Your Date Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
