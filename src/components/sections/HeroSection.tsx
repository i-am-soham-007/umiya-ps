import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, ChevronRight, Play, Sparkles, Camera } from 'lucide-react';
import { HERO_SLIDES, STUDIO_STATS } from '../../data/mockData';
import { HomeService } from '../../services/homeService';
import { StudioStats } from '../../types';

interface HeroSectionProps {
  onOpenBooking: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking, onNavigateSection }) => {
  const [slides, setSlides] = useState(HERO_SLIDES);
  const [stats, setStats] = useState<StudioStats>(STUDIO_STATS);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isVideoMode, setIsVideoMode] = useState(false);

  useEffect(() => {
    HomeService.getHomeData().then((res) => {
      if (res.heroSlides?.length) setSlides(res.heroSlides);
      if (res.stats) setStats(res.stats);
    });
  }, []);

  useEffect(() => {
    if (isVideoMode || slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isVideoMode, slides]);

  const activeSlide = slides[currentSlideIndex] || slides[0] || HERO_SLIDES[0];

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 text-white pt-20">
      {/* Background Slideshow / Video */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          {isVideoMode ? (
            <motion.div
              key="video-mode"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full"
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover scale-105"
                poster={activeSlide.image}
              >
                <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
              </video>
            </motion.div>
          ) : (
            <motion.div
              key={activeSlide.id || activeSlide.title}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="w-full h-full relative"
            >
              <img
                src={activeSlide.image}
                alt={activeSlide.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Gradient Overlay for Cinematic Depth & Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-slate-950/60 to-slate-950/70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(15,23,42,0.6)_100%)]" />
      </div>

      {/* Hero Foreground Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-20 w-full flex flex-col justify-between min-h-[85vh]">
        {/* Top Tag & Video Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-xs font-semibold tracking-wider text-amber-300 uppercase shadow-lg"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D62828]" />
            <span>UMIYA STUDIO USA • {activeSlide.tag || 'AWARD WINNING CINEMATOGRAPHY'}</span>
          </motion.div>

          {/* Toggle Video Teaser Mode */}
          <button
            onClick={() => setIsVideoMode(!isVideoMode)}
            className="flex items-center gap-2 bg-slate-900/80 hover:bg-[#1E3A8A] text-white px-4 py-2 rounded-full text-xs font-semibold border border-white/20 transition-all cursor-pointer shadow-md"
          >
            <Play className={`w-3.5 h-3.5 ${isVideoMode ? 'text-emerald-400 fill-emerald-400' : 'text-amber-400'}`} />
            <span>{isVideoMode ? 'Switch to Photo Slides' : 'Preview Cinema Reel'}</span>
          </button>
        </div>

        {/* Hero Headline & Subtitle */}
        <div className="my-auto py-12 max-w-4xl space-y-6">
          <motion.div
            key={activeSlide.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <span className="text-amber-400 font-accent-serif italic text-lg sm:text-2xl block tracking-wide">
              {activeSlide.subtitle}
            </span>

            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.1] drop-shadow-md">
              {activeSlide.title}
            </h1>
          </motion.div>

          <p className="text-slate-300 text-sm sm:text-lg max-w-2xl leading-relaxed font-light">
            Documenting the majesty, emotion, and sacred grandeur of luxury Indian & Fusion weddings with Hollywood 4K cinema gear and editorial art direction across North America & Worldwide.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={onOpenBooking}
              className="bg-[#1E3A8A] hover:bg-[#D62828] text-white font-bold text-sm sm:text-base px-8 py-4 rounded-full shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 flex items-center gap-3 group cursor-pointer"
            >
              <Calendar className="w-5 h-5 text-amber-300 group-hover:scale-110 transition-transform" />
              <span>Book Shoot Session</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onNavigateSection('portfolio')}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 font-semibold text-sm sm:text-base px-8 py-4 rounded-full transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              <Camera className="w-5 h-5 text-slate-300" />
              <span>Explore Portfolio</span>
            </button>
          </div>
        </div>

        {/* Floating Statistics Badges */}
        <div className="pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center sm:text-left">
          <div className="p-3 bg-slate-900/40 backdrop-blur-md rounded-2xl border border-white/10">
            <div className="font-serif text-2xl sm:text-3xl font-bold text-amber-400">{stats.yearsExperience}+</div>
            <div className="text-[11px] text-slate-300 uppercase tracking-widest font-semibold mt-0.5">Years Experience</div>
          </div>

          <div className="p-3 bg-slate-900/40 backdrop-blur-md rounded-2xl border border-white/10">
            <div className="font-serif text-2xl sm:text-3xl font-bold text-amber-400">{stats.weddingsCaptured}+</div>
            <div className="text-[11px] text-slate-300 uppercase tracking-widest font-semibold mt-0.5">Weddings Captured</div>
          </div>

          <div className="p-3 bg-slate-900/40 backdrop-blur-md rounded-2xl border border-white/10">
            <div className="font-serif text-2xl sm:text-3xl font-bold text-amber-400">{stats.happyClients}+</div>
            <div className="text-[11px] text-slate-300 uppercase tracking-widest font-semibold mt-0.5">Happy Clients</div>
          </div>

          <div className="p-3 bg-slate-900/40 backdrop-blur-md rounded-2xl border border-white/10 flex flex-col justify-center">
            <div className="font-serif text-2xl sm:text-3xl font-bold text-emerald-400 flex items-center justify-center sm:justify-start gap-1">
              <span>USA + India</span>
            </div>
            <div className="text-[11px] text-slate-300 uppercase tracking-widest font-semibold mt-0.5">Global Presence</div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col gap-3">
        {slides.map((slide, idx) => (
          <button
            key={slide.id || idx}
            onClick={() => setCurrentSlideIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
              currentSlideIndex === idx ? 'bg-amber-400 scale-125 ring-4 ring-amber-400/30' : 'bg-white/30 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </section>
  );
};
