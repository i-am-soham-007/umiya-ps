import React, { useState } from 'react';
import { PORTFOLIO_GALLERY } from '../../data/mockData';
import { PortfolioItem } from '../../types';
import { Maximize2, MapPin, Camera, X, Sparkles, Send, Filter } from 'lucide-react';

interface PortfolioShowcaseProps {
  onOpenBooking: (serviceTitle?: string) => void;
}

export const PortfolioShowcase: React.FC<PortfolioShowcaseProps> = ({ onOpenBooking }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxItem, setLightboxItem] = useState<PortfolioItem | null>(null);

  const categories = [
    'All',
    'Wedding',
    'Pre Wedding',
    'Engagement',
    'Baby Shower',
    'Birthday',
    'Drone',
    'Cinematic'
  ];

  const filteredItems =
    activeCategory === 'All'
      ? PORTFOLIO_GALLERY
      : PORTFOLIO_GALLERY.filter((item) => item.category === activeCategory);

  return (
    <section id="portfolio" className="py-24 bg-[#FAF8F5] text-[#1E293B] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest bg-amber-100 text-amber-900 uppercase border border-amber-300">
            FINE ART GALLERY
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900">
            Portfolio Showcase
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            A curated gallery of real celebrations, emotional candid moments, and cinematic drone vistas across USA and India.
          </p>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#1E3A8A] text-white shadow-lg scale-105'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Pinterest / Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setLightboxItem(item)}
              className="break-inside-avoid relative rounded-3xl overflow-hidden group cursor-pointer bg-slate-900 border border-slate-200/80 shadow-md hover:shadow-2xl transition-all duration-500"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />

              {/* Glass Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end text-white">
                <div className="space-y-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-widest bg-[#D62828] text-white px-2.5 py-0.5 rounded-full">
                      {item.category}
                    </span>
                    <span className="text-xs text-amber-300 font-mono flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {item.location}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold leading-snug">{item.title}</h3>
                  <p className="text-xs text-slate-300 line-clamp-2 font-light">{item.description}</p>

                  {item.cameraInfo && (
                    <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1 pt-1">
                      <Camera className="w-3 h-3 text-amber-400" />
                      <span>{item.cameraInfo}</span>
                    </div>
                  )}

                  <div className="pt-2 flex items-center justify-between text-xs text-amber-400 font-semibold">
                    <span>Click to view lightbox</span>
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-lg flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200">
          <div className="relative max-w-5xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl text-white flex flex-col md:flex-row max-h-[90vh]">
            {/* Lightbox Image View */}
            <div className="md:w-2/3 bg-black flex items-center justify-center p-4 relative overflow-hidden">
              <img
                src={lightboxItem.image}
                alt={lightboxItem.title}
                className="max-h-[75vh] w-auto object-contain rounded-xl"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={() => setLightboxItem(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Lightbox Sidebar Info */}
            <div className="md:w-1/3 p-6 sm:p-8 flex flex-col justify-between space-y-6 overflow-y-auto">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="bg-[#1E3A8A] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                    {lightboxItem.category}
                  </span>
                  <span className="bg-amber-500/20 text-amber-300 text-[10px] font-bold px-3 py-1 rounded-full">
                    {lightboxItem.country}
                  </span>
                </div>

                <h3 className="font-serif text-2xl font-bold">{lightboxItem.title}</h3>

                <div className="space-y-2 text-xs text-slate-300">
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#D62828]" />
                    <span className="font-semibold text-white">{lightboxItem.location}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Client: {lightboxItem.coupleOrClient}</span>
                  </p>
                  {lightboxItem.cameraInfo && (
                    <p className="flex items-center gap-2 font-mono text-[11px] text-slate-400">
                      <Camera className="w-4 h-4 text-emerald-400" />
                      <span>{lightboxItem.cameraInfo}</span>
                    </p>
                  )}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed pt-2 border-t border-slate-800">
                  {lightboxItem.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {lightboxItem.tags.map((tag, i) => (
                    <span key={i} className="text-[10px] bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 border-t border-slate-800">
                <button
                  onClick={() => {
                    onOpenBooking(lightboxItem.category);
                    setLightboxItem(null);
                  }}
                  className="w-full bg-[#1E3A8A] hover:bg-[#D62828] text-white py-3 rounded-2xl font-bold text-xs shadow-xl transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Inquire For Similar Photoshoot</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
