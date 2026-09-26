import React from 'react';
import { Testimonial } from '../types';
import { Star, Quote, CheckCircle } from 'lucide-react';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials,
}) => {
  return (
    <section className="py-20 bg-[#FDFBF7] border-b border-[#E6E2D3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFF6FF] text-[#1E3A8A] border border-[#93C5FD] text-xs font-bold uppercase tracking-wider">
            <CheckCircle className="w-3.5 h-3.5 text-[#1E3A8A]" />
            14,000+ Verified 5-Star Reviews
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2D3021] tracking-tight">
            Loved by Families, Couples & Creators
          </h2>
          <p className="text-sm sm:text-base text-[#5C594D] leading-relaxed font-normal">
            Read unfiltered feedback from clients who booked our 30-minute shoots across the country.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test) => (
            <div
              key={test.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6E2D3] shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                {/* Rating & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-[#C49A45]">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#93C5FD]" />
                </div>

                {/* Session Type Pill */}
                <span className="inline-block px-2.5 py-0.5 rounded bg-[#EFF6FF] text-[#1E3A8A] border border-[#93C5FD] text-[10px] font-bold uppercase tracking-wide mb-3">
                  {test.sessionType}
                </span>

                {/* Testimonial Text */}
                <p className="text-sm text-[#3D3B36] leading-relaxed font-normal italic mb-6">
                  "{test.text}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="flex items-center gap-3 pt-4 border-t border-[#E6E2D3]">
                <img
                  src={test.avatar}
                  alt={test.author}
                  className="w-11 h-11 rounded-full object-cover border border-[#E6E2D3]"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-sm font-bold text-[#2D3021] leading-tight">
                    {test.author}
                  </h4>
                  <p className="text-xs text-[#7D796C]">
                    {test.role} • {test.city}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
