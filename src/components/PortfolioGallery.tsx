import React, { useState } from 'react';
import { PortfolioItem } from '../types';
import {
  Sparkles,
  SlidersHorizontal,
  Maximize2,
  Heart,
  Calendar,
  X,
  MapPin,
  User,
  Check,
} from 'lucide-react';

interface PortfolioGalleryProps {
  portfolio: PortfolioItem[];
  onOpenBooking: (initialData?: { category?: string }) => void;
  primaryColor?: string;
}

export const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({
  portfolio,
  onOpenBooking,
  primaryColor = '#1E3A8A',
}) => {
  const [activeTab, setActiveTab] = useState<string>('All');
  const [selectedPhoto, setSelectedPhoto] = useState<PortfolioItem | null>(null);
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [likedPhotos, setLikedPhotos] = useState<Record<string, boolean>>({});

  const categories = [
    'All',
    'Family',
    'Couples & Maternity',
    'Portraits & Headshots',
    'Events & Parties',
    'Graduation & Pets',
  ];

  const filteredItems =
    activeTab === 'All'
      ? portfolio
      : portfolio.filter((item) => item.category === activeTab);

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedPhotos((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="portfolio" className="py-20 bg-white border-b border-[#E6E2D3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFF6FF] text-[#1E3A8A] border border-[#93C5FD] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#DC2626]" />
            Real 30-Minute Shoots Gallery
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2D3021] tracking-tight">
            Captured by Umiya Studio Creators
          </h2>
          <p className="text-sm sm:text-base text-[#5C594D] leading-relaxed font-normal">
            Every photo shown below was captured during a 30-minute mini photoshoot by our vetted pro network.
          </p>
        </div>

        {/* Before / After Retouching Interactive Comparison Section */}
        <div className="mb-16 bg-[#2D3021] text-[#FDFBF7] rounded-3xl p-6 sm:p-8 border border-[#3E432E] shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Info */}
            <div className="lg:col-span-5 space-y-4 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DC2626]/20 text-[#D4E2BA] text-xs font-bold uppercase tracking-wider border border-[#DC2626]/40">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                Hand-Retouched Perfection
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                See The Retouching Transformation
              </h3>
              <p className="text-xs sm:text-sm text-[#D4CEB8] leading-relaxed font-normal">
                Drag the interactive slider to compare straight-out-of-camera RAW shots with our color grading, skin tone softening, and lighting enhancement.
              </p>
              
              <div className="space-y-2 text-xs text-[#EAE6D8] pt-2">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#DC2626]" />
                  <span>Natural skin glow & blemish reduction</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#DC2626]" />
                  <span>Golden hour warm color balance</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#DC2626]" />
                  <span>High-resolution crisp details for printing</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onOpenBooking()}
                  className="px-5 py-2.5 rounded-xl bg-white text-[#2D3021] font-bold text-xs sm:text-sm hover:bg-[#F2F0E6] transition shadow-md"
                >
                  Book Retouched Session
                </button>
              </div>
            </div>

            {/* Interactive Before/After Split Slider */}
            <div className="lg:col-span-7">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl select-none border-2 border-[#3E432E] bg-[#1F2218]">
                
                {/* AFTER Image (Full background) */}
                <img
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80"
                  alt="After Umiya Retouching"
                  className="absolute inset-0 w-full h-full object-cover filter saturate-110 contrast-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-4 right-4 z-10 px-3 py-1 rounded-md bg-[#1F2218]/80 backdrop-blur-md text-[#D4E2BA] text-xs font-bold tracking-wider uppercase border border-[#DC2626]/30">
                  Umiya Hand-Retouched
                </div>

                {/* BEFORE Image (Clipped overlay) */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80"
                    alt="Before RAW"
                    className="absolute inset-0 w-full h-full object-cover max-w-none filter grayscale-20 brightness-90"
                    style={{ width: '100%', height: '100%' }}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-4 left-4 z-10 px-3 py-1 rounded-md bg-[#1F2218]/80 backdrop-blur-md text-[#D4CEB8] text-xs font-bold tracking-wider uppercase border border-[#E6E2D3]/20">
                    Raw Camera Original
                  </div>
                </div>

                {/* Divider Line & Handle */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 shadow-lg"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-[#2D3021] flex items-center justify-center shadow-xl border-2 border-[#2D3021] font-bold text-xs">
                    ↔
                  </div>
                </div>

                {/* Invisible input range for accessible sliding */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPosition}
                  onChange={(e) => setSliderPosition(Number(e.target.value))}
                  className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-30"
                  aria-label="Comparison slider"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === cat
                  ? 'bg-[#2D3021] text-white shadow-sm'
                  : 'bg-[#F2F0E6] text-[#5C594D] hover:bg-[#E6E2D3] hover:text-[#2D3021]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Photo Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => {
            const isLiked = likedPhotos[item.id];
            return (
              <div
                key={item.id}
                onClick={() => setSelectedPhoto(item)}
                className="group relative rounded-2xl overflow-hidden bg-[#FAF8F2] border border-[#E6E2D3] shadow-2xs hover:shadow-xl transition-all duration-300 cursor-pointer aspect-[3/4]"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />

                {/* Dark Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F2218]/90 via-transparent to-black/20 opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Top Floating Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                  <span className="px-2.5 py-0.5 rounded-md bg-white/95 backdrop-blur-md text-[#2D3021] text-[10px] font-bold uppercase shadow-xs border border-[#E6E2D3]">
                    {item.category}
                  </span>
                  <button
                    onClick={(e) => toggleLike(item.id, e)}
                    className="w-8 h-8 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center text-[#2D3021] hover:text-[#A25035] shadow-xs transition"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isLiked ? 'fill-[#A25035] text-[#A25035]' : ''
                      }`}
                    />
                  </button>
                </div>

                {/* Bottom Metadata */}
                <div className="absolute bottom-3 left-3 right-3 z-10 text-white transform sm:translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h4 className="text-sm font-bold leading-tight mb-1 text-white drop-shadow-sm">
                    {item.title}
                  </h4>
                  <div className="flex items-center justify-between text-[11px] text-[#EAE6D8]">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#DC2626] shrink-0" />
                      <span className="truncate">{item.location}</span>
                    </span>
                    <span className="text-white/90 font-medium">
                      By {item.photographer}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="relative max-w-4xl w-full bg-[#1F2218] rounded-3xl overflow-hidden border border-[#3A402D] shadow-2xl flex flex-col md:flex-row">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Photo View */}
            <div className="md:w-3/5 bg-black flex items-center justify-center aspect-[4/5] md:aspect-auto">
              <img
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.title}
                className="max-h-[75vh] w-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Photo Info Sidebar */}
            <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between text-[#FDFBF7] space-y-6">
              <div className="space-y-4">
                <span 
                  className="inline-block px-2.5 py-1 rounded text-white text-[11px] font-extrabold uppercase tracking-wider shadow-xs"
                  style={{ backgroundColor: primaryColor }}
                >
                  {selectedPhoto.category}
                </span>
                <h3 className="text-2xl font-bold text-white leading-tight">
                  {selectedPhoto.title}
                </h3>
                
                <div className="space-y-2 text-xs text-[#D4CEB8] pt-2 border-t border-[#3A402D]">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#DC2626] shrink-0" />
                    <span>{selectedPhoto.location}, {selectedPhoto.city}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[#D4E2BA] shrink-0" />
                    <span>Captured by {selectedPhoto.photographer}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#C49A45] shrink-0" />
                    <span>Available in 4K resolution with print release</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-[#3A402D]">
                <button
                  onClick={() => {
                    const cat = selectedPhoto.category;
                    setSelectedPhoto(null);
                    onOpenBooking({ category: cat });
                  }}
                  className="w-full py-3 px-4 rounded-xl text-white font-bold text-sm shadow-md hover:opacity-95 transition flex items-center justify-center gap-2"
                  style={{ backgroundColor: primaryColor }}
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book This Shoot</span>
                </button>
                <p className="text-[11px] text-center text-[#8C887B]">
                  30 minutes • 40+ photos captured • $15/photo
                </p>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
