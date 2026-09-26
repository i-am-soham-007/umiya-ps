import React, { useState, useEffect } from 'react';
import { TESTIMONIALS } from '../../data/mockData';
import { Star, Quote, ChevronLeft, ChevronRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const activeReview = TESTIMONIALS[activeIndex];

  return (
    <section id="testimonials" className="py-24 bg-[#FAF8F5] text-[#1E293B] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest bg-amber-100 text-amber-900 uppercase border border-amber-200">
            CLIENT PRAISE & REVIEWS
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900">
            Words From Our Couples
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Over 1,200 happy couples and families have trusted UMIYA STUDIO USA with their once-in-a-lifetime moments.
          </p>

          {/* Google 5.0 Rating Badge */}
          <div className="inline-flex items-center gap-3 bg-white px-5 py-2.5 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <span className="font-bold text-slate-900 text-sm">5.0 / 5.0 Rating</span>
            <span className="text-xs text-slate-500 font-medium">(180+ Verified Reviews)</span>
          </div>
        </div>

        {/* Testimonial Active Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200/80 p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative">
          {/* Photo Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden shadow-lg border-2 border-slate-100">
              <img
                src={activeReview.photoUrl}
                alt={activeReview.clientName}
                className="w-full h-full object-cover transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 text-white flex items-center gap-3">
                <img
                  src={activeReview.avatar}
                  alt={activeReview.clientName}
                  className="w-12 h-12 rounded-full border-2 border-white object-cover"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-serif font-bold text-base">{activeReview.clientName}</h4>
                  <p className="text-xs text-slate-300">{activeReview.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Text Content Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400" />
                ))}
              </div>

              <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full font-semibold border border-emerald-200">
                <CheckCircle2 className="w-4 h-4" />
                <span>Verified Client Booking</span>
              </div>
            </div>

            <Quote className="w-12 h-12 text-[#1E3A8A]/20" />

            <p className="font-serif text-lg sm:text-2xl font-medium text-slate-800 leading-relaxed italic">
              "{activeReview.reviewText}"
            </p>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-xs text-[#D62828] font-bold uppercase tracking-wider block">
                  {activeReview.eventType}
                </span>
                <span className="text-xs text-slate-500 font-medium">Captured in {activeReview.weddingDate}</span>
              </div>

              {/* Prev / Next Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                  className="p-2.5 rounded-full bg-slate-100 hover:bg-[#1E3A8A] hover:text-white transition-colors cursor-pointer"
                  aria-label="Previous Review"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length)}
                  className="p-2.5 rounded-full bg-slate-100 hover:bg-[#1E3A8A] hover:text-white transition-colors cursor-pointer"
                  aria-label="Next Review"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
