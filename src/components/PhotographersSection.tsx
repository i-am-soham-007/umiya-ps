import React from 'react';
import { Photographer } from '../types';
import {
  Star,
  Camera,
  Award,
  CheckCircle2,
  Calendar,
  Sparkles,
} from 'lucide-react';

interface PhotographersSectionProps {
  photographers: Photographer[];
  onOpenBooking: (initialData?: { photographerId?: string; photographerName?: string }) => void;
  primaryColor?: string;
}

export const PhotographersSection: React.FC<PhotographersSectionProps> = ({
  photographers,
  onOpenBooking,
  primaryColor = '#1E3A8A',
}) => {
  return (
    <section id="photographers" className="py-20 bg-white border-b border-[#E6E2D3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFF6FF] text-[#1E3A8A] border border-[#93C5FD] text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-[#DC2626]" />
            Vetted Top 5% Creators
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2D3021] tracking-tight">
            Meet Your Local Pro Photographers
          </h2>
          <p className="text-sm sm:text-base text-[#5C594D] leading-relaxed font-normal">
            Every Umiya Studio photographer is rigorously vetted for technical skill, posing expertise, warm interpersonal energy, and state-of-the-art gear.
          </p>
        </div>

        {/* Photographers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {photographers.map((photog) => (
            <div
              key={photog.id}
              className="bg-[#FAF8F2] rounded-2xl overflow-hidden border border-[#E6E2D3] hover:border-[#93C5FD] hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="p-6">
                {/* Avatar & Ratings */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    <img
                      src={photog.avatar}
                      alt={photog.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-xs group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute -bottom-1 -right-1 p-1 bg-[#1E3A8A] rounded-full text-white border-2 border-white">
                      <CheckCircle2 className="w-3 h-3" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#2D3021] text-base leading-tight">
                      {photog.name}
                    </h3>
                    <p className="text-xs text-[#7D796C] font-medium">
                      {photog.city}
                    </p>
                    <div className="flex items-center gap-1 mt-1 text-[#C49A45] text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="text-[#2D3021]">{photog.rating}</span>
                      <span className="text-[#7D796C] font-normal">
                        ({photog.reviewsCount} shoots)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-xs text-[#5C594D] leading-relaxed line-clamp-3 mb-4">
                  {photog.bio}
                </p>

                {/* Specialties */}
                <div className="space-y-1.5 mb-4">
                  <div className="text-[10px] font-bold text-[#7D796C] uppercase tracking-wider">
                    Specialties
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {photog.specialties.map((spec, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-white border border-[#E6E2D3] text-[#3D3B36] text-[10px] font-semibold"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Gear Tag */}
                <div className="space-y-1">
                  <div className="text-[10px] font-bold text-[#7D796C] uppercase tracking-wider flex items-center gap-1">
                    <Camera className="w-3 h-3 text-[#7D796C]" /> Gear:
                  </div>
                  <div className="text-[11px] text-[#5C594D] font-mono truncate">
                    {photog.gear.join(', ')}
                  </div>
                </div>
              </div>

              {/* Book With Creator Button */}
              <div className="p-4 pt-0">
                <button
                  onClick={() =>
                    onOpenBooking({
                      photographerId: photog.id,
                      photographerName: photog.name,
                    })
                  }
                  className="w-full py-2.5 px-3 rounded-xl bg-white hover:bg-[#2D3021] hover:text-white text-[#2D3021] font-bold text-xs border border-[#E6E2D3] transition-all flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book with {photog.name.split(' ')[0]}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
