import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PortfolioItem, SiteConfig } from '../types';
import { getYouTubeEmbedUrl, extractYouTubeId } from '../utils/youtube';
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Heart,
  Share2,
  Check,
  Camera,
  Play,
  Sparkles,
  Layers,
  Sun,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  MessageSquareQuote,
  Sliders,
  ArrowRight,
  UserCheck,
  Award,
} from 'lucide-react';

interface StoryDetailsPageProps {
  storyId: string;
  config: SiteConfig;
  onBack: () => void;
  onNavigateToStory: (storyId: string) => void;
  onNavigateToInquiry: (initialData?: {
    city?: string;
    category?: string;
    spot?: string;
    photographerId?: string;
    photographerName?: string;
    storyTitle?: string;
  }) => void;
  onOpenVideoModal?: (videoIdOrUrl: string) => void;
}

export const StoryDetailsPage: React.FC<StoryDetailsPageProps> = ({
  storyId,
  config,
  onBack,
  onNavigateToStory,
  onNavigateToInquiry,
  onOpenVideoModal,
}) => {
  // Find current story
  const story =
    config.portfolio.find((p) => p.id === storyId) || config.portfolio[0];

  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(story.likes || 142);
  const [copied, setCopied] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showStickyBottomBar, setShowStickyBottomBar] = useState<boolean>(false);

  // Scroll to top on load or story change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveImageIndex(0);
    setLikeCount(story.likes || 142);
    setIsLiked(false);
  }, [storyId, story]);

  // Track scroll progress for top indicator and sticky bottom inquiry bar
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(currentProgress);
      }
      setShowStickyBottomBar(window.scrollY > 450);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // All images available for this story
  const allImages =
    story.images && story.images.length > 0
      ? story.images
      : [story.imageUrl, story.imageUrl, story.imageUrl];

  // Matched Photographer details
  const matchedPhotographer = config.photographers.find(
    (p) =>
      p.name.toLowerCase() === story.photographer.toLowerCase() ||
      p.name.includes(story.photographer) ||
      story.photographer.includes(p.name)
  ) || {
    id: 'photo-default',
    name: story.photographer,
    title: 'Lead Storytelling Photographer',
    city: story.city,
    rating: 4.98,
    reviewsCount: 184,
    avatar:
      story.photographerAvatar ||
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    bio: 'Specialist in candid golden hour portraits, emotive framing, and authentic 30-minute mini sessions.',
    gear: ['Sony Alpha 1', 'FE 85mm f/1.4 GM', 'FE 35mm f/1.4 GM'],
    specialties: [story.category, 'Golden Hour', 'Editorial'],
    portfolio: allImages,
    experienceYears: 7,
  };

  // Video embed URL if present
  const youtubeVideoId =
    story.youtubeId ||
    (story.youtubeUrl ? extractYouTubeId(story.youtubeUrl) : null) ||
    (story.featured ? 'sRWcJrMTtMI' : null);

  const embedUrl = youtubeVideoId ? getYouTubeEmbedUrl(youtubeVideoId) : null;

  // Handle Like
  const handleToggleLike = () => {
    if (!isLiked) {
      setLikeCount((prev) => prev + 1);
      setIsLiked(true);
    } else {
      setLikeCount((prev) => prev - 1);
      setIsLiked(false);
    }
  };

  // Handle Share
  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${story.title} | Umiya Studio`,
          text: story.description,
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Handle direct inquiry redirect
  const handleBookThisShoot = () => {
    onNavigateToInquiry({
      city: story.city,
      category: story.category,
      spot: story.location,
      photographerId: matchedPhotographer.id,
      photographerName: matchedPhotographer.name,
      storyTitle: story.title,
    });
  };

  // Related Stories in same category or overall
  const relatedStories = config.portfolio
    .filter((p) => p.id !== story.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2D3021] relative pb-32">
      {/* Top Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-1.5 bg-[#E6E2D3] z-50 overflow-hidden"
        style={{ zIndex: 100 }}
      >
        <div
          className="h-full bg-gradient-to-r from-[#1E3A8A] via-[#DC2626] to-[#1E3A8A] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Top Header Navigation & Action Bar */}
      <header className="sticky top-0 z-40 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#E6E2D3] py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white hover:bg-[#EFF6FF] text-xs sm:text-sm font-bold text-[#2D3021] border border-[#93C5FD] shadow-2xs hover:scale-105 active:scale-95 transition-all group"
          >
            <ArrowLeft className="w-4 h-4 text-[#1E3A8A] group-hover:-translate-x-1 transition-transform" />
            <span>Back to Stories & Gallery</span>
          </button>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Like Counter */}
            <button
              onClick={handleToggleLike}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition ${
                isLiked
                  ? 'bg-rose-50 border-rose-200 text-rose-600'
                  : 'bg-white border-[#E6E2D3] text-[#5C594D] hover:text-rose-600 hover:border-rose-200'
              }`}
            >
              <Heart
                className={`w-3.5 h-3.5 ${
                  isLiked ? 'fill-rose-600 text-rose-600 scale-110' : ''
                } transition-transform`}
              />
              <span>{likeCount}</span>
            </button>

            {/* Share */}
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E6E2D3] hover:border-[#DC2626] text-xs font-bold text-[#5C594D] transition"
              title="Share this story"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#1E3A8A]" />
                  <span className="text-[#1E3A8A]">Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Share</span>
                </>
              )}
            </button>

            {/* Inquire Button in Header */}
            <button
              onClick={handleBookThisShoot}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1E3A8A] text-white text-xs sm:text-sm font-bold shadow-md hover:bg-[#3B4B1C] hover:scale-105 active:scale-95 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#93C5FD]" />
              <span>Book This Shoot</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Blog & Story Content Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        {/* Breadcrumbs */}
        <motion.nav
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 text-xs font-semibold text-[#8C887B] mb-6 flex-wrap"
        >
          <button onClick={onBack} className="hover:text-[#1E3A8A] transition">
            Home
          </button>
          <span>/</span>
          <button onClick={onBack} className="hover:text-[#1E3A8A] transition">
            Stories & Gallery
          </button>
          <span>/</span>
          <span className="text-[#1E3A8A] font-bold">{story.category}</span>
          <span>/</span>
          <span className="text-[#2D3021] truncate max-w-[200px] sm:max-w-none">
            {story.title}
          </span>
        </motion.nav>

        {/* Story Header & Meta */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-4 mb-8"
        >
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EFF6FF] text-[#1E3A8A] text-xs font-extrabold uppercase tracking-wider border border-[#93C5FD]">
              <Sparkles className="w-3.5 h-3.5 text-[#DC2626]" />
              {story.category}
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white text-[#5C594D] text-xs font-semibold border border-[#E6E2D3]">
              <MapPin className="w-3.5 h-3.5 text-[#1E3A8A]" />
              {story.location}, {story.city}
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white text-[#5C594D] text-xs font-semibold border border-[#E6E2D3]">
              <Clock className="w-3.5 h-3.5 text-[#DC2626]" />
              {story.readingTime || '4 min read'}
            </span>
            {story.date && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white text-[#5C594D] text-xs font-semibold border border-[#E6E2D3]">
                <Calendar className="w-3.5 h-3.5 text-[#8C887B]" />
                {story.date}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#2D3021] tracking-tight leading-tight">
            {story.title}
          </h1>

          {story.subtitle && (
            <p className="text-lg sm:text-xl text-[#5C594D] font-normal leading-relaxed">
              {story.subtitle}
            </p>
          )}

          {/* Photographer Profile Bar */}
          <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#E6E2D3] shadow-xs">
            <div className="flex items-center gap-3.5">
              <img
                src={matchedPhotographer.avatar}
                alt={matchedPhotographer.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-[#1E3A8A]/20 shadow-xs"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-extrabold text-[#2D3021]">
                    {matchedPhotographer.name}
                  </span>
                  <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[#EFF6FF] text-[10px] font-bold text-[#1E3A8A]">
                    <Award className="w-3 h-3" />
                    Verified Pro
                  </span>
                </div>
                <p className="text-xs text-[#8C887B]">
                  {matchedPhotographer.title} • {matchedPhotographer.experienceYears}+ years exp.
                </p>
              </div>
            </div>

            <button
              onClick={handleBookThisShoot}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#EFF6FF] hover:bg-[#DBEAFE] text-xs font-bold text-[#1E3A8A] transition border border-[#93C5FD]"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Book with {matchedPhotographer.name.split(' ')[0]}</span>
            </button>
          </div>
        </motion.div>

        {/* Multi-Image Hero & Interactive Carousel Gallery */}
        <motion.section
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4 mb-12"
        >
          {/* Main Large Image Viewer */}
          <div className="relative rounded-3xl overflow-hidden shadow-xl bg-neutral-900 border border-[#E6E2D3] aspect-[4/3] sm:aspect-[16/10] group">
            <img
              src={allImages[activeImageIndex]}
              alt={`${story.title} - angle ${activeImageIndex + 1}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Top Gradient & Badge */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-bold pointer-events-auto">
                <Camera className="w-3.5 h-3.5 text-[#DC2626]" />
                Shot Angle {activeImageIndex + 1} of {allImages.length}
              </span>

              <button
                onClick={() => setIsLightboxOpen(true)}
                className="p-2.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white transition pointer-events-auto"
                title="Open Fullscreen Lightbox"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Navigation Arrows */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setActiveImageIndex((prev) =>
                      prev === 0 ? allImages.length - 1 : prev - 1
                    )
                  }
                  aria-label="Previous photo angle"
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md text-white flex items-center justify-center transition shadow-lg opacity-80 group-hover:opacity-100"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() =>
                    setActiveImageIndex((prev) =>
                      prev === allImages.length - 1 ? 0 : prev + 1
                    )
                  }
                  aria-label="Next photo angle"
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md text-white flex items-center justify-center transition shadow-lg opacity-80 group-hover:opacity-100"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Bottom Caption Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white">
              <p className="text-xs sm:text-sm font-medium opacity-90">
                {story.description}
              </p>
            </div>
          </div>

          {/* Filmstrip Thumbnails Selector */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {allImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative rounded-2xl overflow-hidden aspect-[4/3] border-2 transition-all group ${
                  activeImageIndex === idx
                    ? 'border-[#1E3A8A] ring-4 ring-[#1E3A8A]/20 scale-[1.02]'
                    : 'border-[#E6E2D3] opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition"
                />
                <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/60 text-white text-[10px] font-bold backdrop-blur-xs">
                  Angle {idx + 1}
                </span>
              </button>
            ))}
          </div>
        </motion.section>

        {/* Embedded YouTube 4K Video Section (If Video Exists) */}
        {embedUrl && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14 p-6 sm:p-8 rounded-3xl bg-[#2D3021] text-white shadow-xl border border-[#3D422E] space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DC2626]/20 text-[#93C5FD] text-xs font-extrabold uppercase tracking-wider border border-[#DC2626]/30">
                  <Play className="w-3 h-3 fill-[#DC2626] text-[#DC2626]" />
                  4K Cinematic Reel & Behind The Scenes
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                  Live Session Video & Movement
                </h3>
              </div>

              {story.videoDuration && (
                <span className="text-xs font-bold bg-white/10 px-3 py-1.5 rounded-full text-[#93C5FD] border border-white/10 self-start sm:self-auto">
                  Duration: {story.videoDuration}
                </span>
              )}
            </div>

            {/* Responsive 16:9 Iframe Embed */}
            <div className="relative rounded-2xl overflow-hidden aspect-video bg-black shadow-2xl border border-white/10">
              <iframe
                src={embedUrl}
                title={`${story.title} Video Reel`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>

            <p className="text-xs sm:text-sm text-neutral-300 font-normal leading-relaxed pt-2">
              Every 30-minute Umiya Studio session can include an optional 4K Vertical & Widescreen Reel add-on for Instagram, TikTok, and family archives.
            </p>
          </motion.section>
        )}

        {/* Editorial Blog Article Layout */}
        <article className="prose prose-lg max-w-none text-[#2D3021] space-y-10 mb-14">
          
          {/* Chapter 1: The Vision */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#1E3A8A]">
              <Sparkles className="w-4 h-4 text-[#DC2626]" />
              <span>Chapter 01 • The Vision & Atmosphere</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2D3021] tracking-tight">
              Creating Timeless Romance at {story.location}
            </h2>
            <div className="text-base sm:text-lg text-[#4A473D] leading-relaxed space-y-4">
              <p className="first-letter:text-5xl first-letter:font-extrabold first-letter:text-[#1E3A8A] first-letter:float-left first-letter:mr-3 first-letter:leading-none">
                {story.storyVision ||
                  `${story.title} was designed to celebrate real human connection against the picturesque backdrop of ${story.location} in ${story.city}. Our 30-minute session focused on natural movement, unscripted glances, and genuine emotional resonance rather than artificial, rigid posing.`}
              </p>
              <p>
                When clients book a mini photoshoot with Umiya Studio, the goal is always clear: create a relaxed environment where people forget about the camera lens. Within five minutes of warming up, genuine laughter and heartfelt embraces unfold effortlessly.
              </p>
            </div>
          </motion.section>

          {/* Client Testimonial Quote Callout Box */}
          {story.clientQuote && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-6 sm:p-8 rounded-3xl bg-[#EFF6FF] border border-[#93C5FD] relative overflow-hidden"
            >
              <MessageSquareQuote className="absolute right-4 bottom-2 w-24 h-24 text-[#1E3A8A]/10 pointer-events-none" />
              <div className="relative z-10 space-y-3">
                <div className="flex items-center gap-1 text-amber-500">
                  {'★'.repeat(5)}
                  <span className="text-xs font-bold text-[#1E3A8A] ml-2">
                    5.0 Client Rating
                  </span>
                </div>
                <blockquote className="text-lg sm:text-xl font-bold text-[#2D3021] italic leading-relaxed">
                  &ldquo;{story.clientQuote}&rdquo;
                </blockquote>
                <div className="text-xs font-bold text-[#5C594D] uppercase tracking-wider">
                  — {story.clientName || 'Delighted Client'}, {story.city}
                </div>
              </div>
            </motion.div>
          )}

          {/* Chapter 2: Behind The Lens & Lighting */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#1E3A8A]">
              <Sun className="w-4 h-4 text-[#DC2626]" />
              <span>Chapter 02 • Behind The Lens & Natural Lighting</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2D3021] tracking-tight">
              Mastering the Golden Hour Window
            </h2>
            <div className="text-base sm:text-lg text-[#4A473D] leading-relaxed space-y-4">
              <p>
                {story.behindTheLens ||
                  `To maximize the warm tones across ${story.location}, we scheduled this shoot during the last 30 minutes before dusk. Natural backlighting allows hair and contours to catch an ethereal golden rim, while keeping the subject's faces softly lit.`}
              </p>
              <p>
                By positioning our subjects with open shadow in front and the setting sun behind them, we achieved crisp separation and dreamy bokeh without harsh, squint-inducing direct sunlight.
              </p>
            </div>
          </motion.section>

          {/* Technical Specs & Gear Grid Widget */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-6 rounded-3xl bg-white border border-[#E6E2D3] shadow-xs space-y-4"
          >
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#1E3A8A]">
              <Layers className="w-4 h-4 text-[#DC2626]" />
              <span>Session Production Breakdown & Tech Specs</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#E6E2D3] space-y-1">
                <span className="text-[#8C887B] font-semibold">Lighting Setup</span>
                <p className="font-bold text-[#2D3021]">
                  {story.lightingSetup || 'Natural Golden Light + 42" Gold Diffuser'}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#E6E2D3] space-y-1">
                <span className="text-[#8C887B] font-semibold">Best Time of Day</span>
                <p className="font-bold text-[#2D3021]">
                  {story.bestTimeOfDay || '04:30 PM – 05:15 PM (Sunset)'}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#E6E2D3] space-y-1">
                <span className="text-[#8C887B] font-semibold">Primary Camera & Lenses</span>
                <p className="font-bold text-[#2D3021]">
                  {story.gearUsed ? story.gearUsed.join(', ') : '85mm f/1.4 Prime • 35mm f/1.4'}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#E6E2D3] space-y-1">
                <span className="text-[#8C887B] font-semibold">Shoot Duration</span>
                <p className="font-bold text-[#2D3021]">30 Minutes Mini Session</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#E6E2D3] space-y-1">
                <span className="text-[#8C887B] font-semibold">Delivered Gallery</span>
                <p className="font-bold text-[#2D3021]">40+ High-Res Digital Photos</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#E6E2D3] space-y-1">
                <span className="text-[#8C887B] font-semibold">Turnaround Time</span>
                <p className="font-bold text-[#2D3021]">3–5 Business Days</p>
              </div>
            </div>
          </motion.div>

          {/* Chapter 3: Styling & Wardrobe Tips */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#1E3A8A]">
              <Sliders className="w-4 h-4 text-[#DC2626]" />
              <span>Chapter 03 • Styling & Outfit Advice</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2D3021] tracking-tight">
              Wardrobe Coordination for {story.category}
            </h2>
            <div className="text-base sm:text-lg text-[#4A473D] leading-relaxed space-y-3">
              <p>
                {story.outfitAdvice ||
                  'We recommend muted earth tones (terracotta, sage, cream, warm camel) that complement outdoor vegetation without clashing. Avoid busy logos or bright neon colors so the focus remains entirely on your expressions.'}
              </p>
              <p>
                Bringing a light jacket or layered accessory allows for instant outfit variety within a 30-minute mini session without requiring a complete wardrobe change.
              </p>
            </div>
          </motion.section>
        </article>

        {/* Related Stories Cross-Exploration */}
        <section className="mb-14 space-y-6 pt-6 border-t border-[#E6E2D3]">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#1E3A8A] uppercase tracking-wider">
                Explore More Stories
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#2D3021]">
                Other Sessions You Might Love
              </h3>
            </div>
            <button
              onClick={onBack}
              className="text-xs font-bold text-[#1E3A8A] hover:underline"
            >
              View All 24 Stories →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {relatedStories.map((rel) => (
              <button
                key={rel.id}
                onClick={() => onNavigateToStory(rel.id)}
                className="group text-left p-3.5 rounded-2xl bg-white border border-[#E6E2D3] hover:border-[#DC2626] shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                    <img
                      src={rel.imageUrl}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/60 text-white text-[10px] font-bold backdrop-blur-xs">
                      {rel.category}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-[#2D3021] line-clamp-1 group-hover:text-[#1E3A8A] transition">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-[#8C887B] line-clamp-2">
                    {rel.description}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-[#F2F0E6] flex items-center justify-between text-[11px] font-semibold text-[#5C594D]">
                  <span>{rel.city}</span>
                  <span className="text-[#1E3A8A] group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                    Read Story <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Prominent Bottom Display Inquiry Card Banner */}
        <motion.section
          id="story-bottom-inquiry"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#2D3021] to-[#1F2216] text-[#FDFBF7] shadow-2xl border border-[#3D422E] space-y-6 text-center relative overflow-hidden"
        >
          {/* Subtle Ambient Light Orb */}
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[#DC2626]/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-[#1E3A8A]/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DC2626]/20 text-[#93C5FD] border border-[#DC2626]/40 text-xs font-extrabold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#DC2626]" />
              Book Your 30-Minute Shoot in {story.city}
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Ready to Capture Your Own Story?
            </h2>

            <p className="text-sm sm:text-base text-neutral-300 font-normal leading-relaxed">
              Book a free 30-minute mini photoshoot in {story.location} or any of our curated spots. Zero upfront fees or deposit. Only pay $15 for the photos you fall in love with.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                id="btn-story-details-inquiry-cta"
                onClick={handleBookThisShoot}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-[#DC2626] hover:bg-[#9BB068] text-[#2D3021] text-base font-extrabold shadow-xl hover:scale-105 active:scale-95 transition-all group"
              >
                <Sparkles className="w-5 h-5 text-[#2D3021]" />
                <span>Inquire & Book This Shoot</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onBack}
                className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-sm font-bold border border-white/20 transition"
              >
                <span>Explore Other Cities</span>
              </button>
            </div>

            {/* Reassurance Badges */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-300">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#DC2626]" />
                <span>$0 Upfront Session Fee</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Camera className="w-4 h-4 text-[#DC2626]" />
                <span>$15 Per Downloaded Photo</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#DC2626]" />
                <span>3-5 Days Gallery Turnaround</span>
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      {/* Floating Sticky Bottom Inquiry Bar on Scroll */}
      <AnimatePresence>
        {showStickyBottomBar && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-4 left-4 right-4 z-40 max-w-2xl mx-auto"
          >
            <div className="bg-[#2D3021]/95 backdrop-blur-md text-white p-3.5 sm:p-4 rounded-2xl shadow-2xl border border-[#1E3A8A] flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 truncate">
                <img
                  src={story.imageUrl}
                  alt={story.title}
                  className="w-12 h-12 rounded-xl object-cover shrink-0 border border-white/20"
                />
                <div className="truncate">
                  <div className="text-xs font-bold text-white truncate">
                    {story.title}
                  </div>
                  <div className="text-[11px] text-[#93C5FD] truncate">
                    Free 30-min shoot • $15/photo • {story.city}
                  </div>
                </div>
              </div>

              <button
                id="btn-sticky-inquire"
                onClick={handleBookThisShoot}
                className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#DC2626] hover:bg-[#9BB068] text-[#2D3021] text-xs sm:text-sm font-extrabold shadow-lg hover:scale-105 active:scale-95 transition-all"
              >
                <Sparkles className="w-4 h-4 text-[#2D3021]" />
                <span>Inquire & Book</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex items-center justify-center p-4 sm:p-8"
            onClick={() => setIsLightboxOpen(false)}
          >
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition z-50"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left / Right Navigation */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImageIndex((prev) =>
                      prev === 0 ? allImages.length - 1 : prev - 1
                    );
                  }}
                  className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition z-50"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImageIndex((prev) =>
                      prev === allImages.length - 1 ? 0 : prev + 1
                    );
                  }}
                  className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition z-50"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </>
            )}

            <div
              className="max-w-5xl max-h-[85vh] flex flex-col items-center gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={allImages[activeImageIndex]}
                alt={story.title}
                className="max-h-[75vh] max-w-full rounded-2xl object-contain shadow-2xl"
              />
              <div className="text-center text-white space-y-1">
                <p className="text-sm font-bold">
                  {story.title} — Shot {activeImageIndex + 1} of {allImages.length}
                </p>
                <p className="text-xs text-neutral-400">
                  {story.location}, {story.city} • Captured by {story.photographer}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
