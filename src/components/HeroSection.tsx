import React, { useState } from 'react';
import { SiteConfig } from '../types';
import {
  Star,
  ShieldCheck,
  Camera,
  Play,
  Calendar,
  MapPin,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

interface HeroSectionProps {
  config: SiteConfig;
  selectedCity: string;
  onSelectCity: (cityId: string) => void;
  onOpenBooking: (initialData?: { city?: string; category?: string; spot?: string }) => void;
  onOpenVideoModal: (videoId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  config,
  selectedCity,
  onSelectCity,
  onOpenBooking,
  onOpenVideoModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('Family');

  const categories = [
    'Family',
    'Couples & Maternity',
    'Portraits & Headshots',
    'Events & Parties',
    'Graduation & Pets',
  ];

  const handleQuickBook = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenBooking({
      city: selectedCity,
      category: selectedCategory,
    });
  };

  const featuredVideo = config.videos.find((v) => v.featured) || config.videos[0];

  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-6 pb-16 lg:pt-10 lg:pb-24 border-b border-[#E6E2D3]"
      style={{ backgroundColor: config.theme.backgroundColor || '#FDFBF7' }}
    >
      {/* Subtle Natural Tones Ambient Glow */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#E8EED9]/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-[#F4EFE6]/70 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Headlines, Trust Proof & Quick Booking Widget */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Social Proof & Rating Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white border border-[#E6E2D3] shadow-2xs">
              <div className="flex items-center text-[#C49A45]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="text-xs font-bold text-[#2D3021]">
                {config.hero.ratingScore} / 5.0
              </span>
              <span className="text-[#8C887B] text-xs">•</span>
              <span className="text-xs font-semibold text-[#5C594D]">
                {config.hero.ratingReviewsCount} Happy Clients Across USA
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-[#2D3021] leading-[1.12]">
                {config.hero.headline}
              </h1>
              <p className="text-base sm:text-lg text-[#5C594D] leading-relaxed max-w-2xl font-normal">
                {config.hero.subheadline}
              </p>
            </div>

            {/* Value Pillars Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#3D3B36] bg-white px-3 py-1.5 rounded-lg border border-[#E6E2D3] shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-[#1E3A8A] shrink-0" />
                <span>$0 Upfront Booking Fee</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#3D3B36] bg-white px-3 py-1.5 rounded-lg border border-[#E6E2D3] shadow-2xs">
                <Camera className="w-4 h-4 text-[#1E3A8A] shrink-0" />
                <span>Top 5% Vetted Photographers</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#3D3B36] bg-white px-3 py-1.5 rounded-lg border border-[#E6E2D3] shadow-2xs">
                <Sparkles className="w-4 h-4 text-[#DC2626] shrink-0" />
                <span>4K Video Reels & Retouching</span>
              </div>
            </div>

            {/* Interactive Quick Finder / Booking Form */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-[#E6E2D3] mt-4">
              <div className="text-xs font-bold uppercase tracking-wider text-[#7D796C] mb-3 flex items-center justify-between">
                <span>Quick Photo Session Finder</span>
                <span className="text-[#1E3A8A] font-bold normal-case text-xs flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#1E3A8A] animate-pulse"></span>
                  Slots available this weekend
                </span>
              </div>

              <form onSubmit={handleQuickBook} className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                {/* Category select */}
                <div className="sm:col-span-5">
                  <label className="block text-[11px] font-bold text-[#5C594D] uppercase mb-1">
                    Session Type
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#DCD8C8] text-sm font-semibold bg-[#F2F0E6] text-[#3D3B36] focus:ring-2 focus:ring-[#DC2626] focus:outline-none"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* City select */}
                <div className="sm:col-span-4">
                  <label className="block text-[11px] font-bold text-[#5C594D] uppercase mb-1">
                    Metro City
                  </label>
                  <select
                    value={selectedCity}
                    onChange={(e) => onSelectCity(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#DCD8C8] text-sm font-semibold bg-[#F2F0E6] text-[#3D3B36] focus:ring-2 focus:ring-[#DC2626] focus:outline-none"
                  >
                    {config.cities.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.name}, {city.state}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Submit button */}
                <div className="sm:col-span-3 flex items-end">
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-xl text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5 hover:opacity-95"
                    style={{ backgroundColor: config.theme.primaryColor || '#1E3A8A' }}
                  >
                    <span>Find Slots</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>

              <div className="mt-3 pt-2.5 border-t border-[#E6E2D3] flex items-center justify-between text-xs text-[#7D796C]">
                <span>Free cancellation up to 48 hrs before</span>
                <a href="#locations" className="text-[#1E3A8A] font-bold hover:underline">
                  Browse {config.spots.length}+ scenic spots →
                </a>
              </div>
            </div>

            {/* Press / Trust Badges */}
            <div className="pt-2">
              <div className="text-[11px] font-bold tracking-wider uppercase text-[#8C887B] mb-2">
                As Featured In & Trusted By
              </div>
              <div className="flex flex-wrap items-center gap-6 text-[#7D796C] font-serif font-bold text-sm sm:text-base opacity-70 grayscale hover:grayscale-0 transition-all">
                <span>Forbes</span>
                <span>VOGUE</span>
                <span>TODAY</span>
                <span>The New York Times</span>
                <span>BuzzFeed</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Photo & YouTube Video Teaser Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Visual Image Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] bg-[#2D3021] group">
                <img
                  src={config.hero.heroImages[0]}
                  alt="Umiya Studio Photoshoot"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1D13]/85 via-[#1A1D13]/25 to-transparent pointer-events-none" />

                {/* Floating "Watch Video Reel" Pill */}
                {featuredVideo && (
                  <button
                    onClick={() => onOpenVideoModal(featuredVideo.youtubeId || featuredVideo.youtubeUrl)}
                    className="absolute top-4 right-4 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[#2D3021] text-xs font-bold shadow-lg hover:bg-white transition-transform hover:scale-105 border border-[#E6E2D3]"
                  >
                    <span className="w-6 h-6 rounded-full bg-[#1E3A8A] text-white flex items-center justify-center">
                      <Play className="w-3 h-3 fill-current ml-0.5" />
                    </span>
                    <span>Watch 4K Video</span>
                  </button>
                )}

                {/* Bottom Content Badge */}
                <div className="absolute bottom-5 left-5 right-5 z-20 text-white">
                  <div 
                    className="inline-block px-2.5 py-1 text-white text-[11px] font-extrabold rounded-md uppercase tracking-wider mb-2 shadow-xs"
                    style={{ backgroundColor: config.theme.primaryColor || '#1E3A8A' }}
                  >
                    Umiya Studio Experience
                  </div>
                  <h3 className="text-lg font-bold text-white leading-snug drop-shadow-md">
                    Professional 30-Minute Outdoor Photoshoots
                  </h3>
                  <p className="text-xs text-[#EAE6D8] mt-1 line-clamp-1">
                    Central Park, Santa Monica, Millennium Park & more.
                  </p>

                  <div className="mt-3 flex items-center justify-between pt-2 border-t border-white/20">
                    <span className="text-xs font-medium text-[#EAE6D8]">
                      From <strong className="text-white text-sm font-bold">$15</strong> / photo
                    </span>
                    <button
                      onClick={() => onOpenBooking()}
                      className="px-3.5 py-1.5 rounded-lg bg-white text-[#2D3021] text-xs font-bold hover:bg-[#F2F0E6] transition shadow-xs"
                    >
                      Book Free Slot
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating Accent Review Card */}
              <div className="absolute -bottom-6 -left-6 sm:-left-8 bg-white p-3.5 rounded-2xl shadow-xl border border-[#E6E2D3] max-w-[240px] hidden sm:block animate-in fade-in slide-in-from-bottom-3 duration-500">
                <div className="flex items-center gap-2.5">
                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80"
                    alt="Client"
                    className="w-10 h-10 rounded-full object-cover border border-[#E6E2D3]"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="flex text-[#C49A45]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs font-bold text-[#2D3021] mt-0.5">
                      "Zero stress, 100% magic!"
                    </p>
                    <p className="text-[10px] text-[#7D796C]">Sarah M., NYC</p>
                  </div>
                </div>
              </div>

              {/* Floating Video Highlight Counter */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-[#2D3021] text-[#FDFBF7] px-3.5 py-2 rounded-xl shadow-lg border border-[#3E432E] flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#DC2626] animate-ping" />
                <span className="text-xs font-bold">4K YouTube Video Reels</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
