import React from 'react';
import { CalendarCheck, Camera, Sparkles, Image, ArrowRight, Video } from 'lucide-react';

interface HowItWorksProps {
  primaryColor?: string;
  onOpenBooking: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({
  primaryColor = '#1E3A8A',
  onOpenBooking,
}) => {
  const steps = [
    {
      number: '01',
      title: 'Book Your 30-Min Shoot',
      subtitle: 'Select Date & Scenic Spot',
      description:
        'Choose your favorite scenic local spot, date, and time slot. Reserve your slot seamlessly with a 5-star pro photographer.',
      icon: CalendarCheck,
      badge: 'Easy Booking',
      badgeColor: 'bg-[#EFF6FF] text-[#1E3A8A] border border-[#93C5FD]',
    },
    {
      number: '02',
      title: 'Show Up & Have Fun',
      subtitle: '30 Minutes of Guided Magic',
      description:
        'Meet your photographer at the designated pinpoint. Enjoy easy, natural posing guidance with gentle prompts for family, couples, maternity, solo portraits, and 4K video clips.',
      icon: Camera,
      badge: '40+ Photos Captured',
      badgeColor: 'bg-[#F2F0E6] text-[#3D3B36] border border-[#E6E2D3]',
    },
    {
      number: '03',
      title: 'Pay Only For What You Love',
      subtitle: 'Digital Gallery in 3-5 Days',
      description:
        'Review your curated, color-corrected digital gallery online. Download only the single photos you cherish for $15 each, or grab discounted bundles with 4K video reels.',
      icon: Image,
      badge: 'Starting at $15',
      badgeColor: 'bg-[#FBF2EE] text-[#A25035] border border-[#ECD1C7]',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white border-b border-[#E6E2D3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFF6FF] text-[#1E3A8A] border border-[#93C5FD] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#DC2626]" />
            The Shoott Model by Umiya Studio
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2D3021] tracking-tight">
            How Umiya Studio Works
          </h2>
          <p className="text-base sm:text-lg text-[#5C594D] leading-relaxed font-normal">
            Professional photography made accessible, fun, and transparent. No expensive session fees, no guesswork.
          </p>
        </div>

        {/* 3 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {/* Connector Line on Desktop */}
          <div className="hidden md:block absolute top-1/3 left-1/6 right-1/6 h-0.5 bg-[#E6E2D3] -z-0" />

          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative z-10 bg-[#FAF8F2] rounded-2xl p-6 sm:p-8 border border-[#E6E2D3] hover:border-[#DC2626] hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Step Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-extrabold text-[#D4CEB8] font-mono group-hover:text-[#1E3A8A] transition-colors">
                      {step.number}
                    </span>
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-xs transition-transform group-hover:scale-110"
                      style={{ backgroundColor: primaryColor }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Badge */}
                  <span className={`inline-block text-[11px] font-extrabold px-2.5 py-0.5 rounded-md mb-2 ${step.badgeColor}`}>
                    {step.badge}
                  </span>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-[#2D3021] mb-1">
                    {step.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#7D796C] mb-3">
                    {step.subtitle}
                  </p>
                  <p className="text-sm text-[#5C594D] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E6E2D3] flex items-center text-xs font-bold text-[#3D3B36] group-hover:text-[#1E3A8A] transition">
                  <span>Learn more</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Video Reel Highlight Callout */}
        <div className="mt-12 bg-[#24271C] text-[#FDFBF7] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-[#3A3E2D]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#1E3A8A] flex items-center justify-center shrink-0 shadow-md">
              <Video className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">
                New: 4K YouTube Video Reels & Behind-The-Scenes Highlights
              </h4>
              <p className="text-xs sm:text-sm text-[#D4CEB8]">
                Add cinematic 4K video clips, Instagram Reels & YouTube embed links to any 30-minute session.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white text-[#2D3021] font-bold text-sm hover:bg-[#F2F0E6] transition shadow-md whitespace-nowrap shrink-0"
          >
            Book Photoshoot
          </button>
        </div>

      </div>
    </section>
  );
};
