import React, { useState } from 'react';
import { YouTubeVideo, SiteConfig } from '../types';
import {
  Play,
  Film,
  Sparkles,
  MapPin,
  Clock,
  Eye,
  ExternalLink,
  Plus,
  Tv,
  CheckCircle,
  Share2,
} from 'lucide-react';
import { extractYouTubeId, getYouTubeThumbnail } from '../utils/youtube';

interface VideoShowcaseProps {
  videos: YouTubeVideo[];
  onOpenVideoModal: (videoIdOrUrl: string) => void;
  onOpenBooking: (initialData?: { category?: string }) => void;
  onOpenCustomizerWithTab?: (tab: string) => void;
  primaryColor?: string;
  accentColor?: string;
}

export const VideoShowcase: React.FC<VideoShowcaseProps> = ({
  videos,
  onOpenVideoModal,
  onOpenBooking,
  onOpenCustomizerWithTab,
  primaryColor = '#1E3A8A',
  accentColor = '#DC2626',
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    'All',
    'Weddings',
    'Family & Portraits',
    'Commercial & Events',
    'Cinematic Reels',
    'Behind The Scenes',
  ];

  const filteredVideos =
    activeCategory === 'All'
      ? videos
      : videos.filter((v) => v.category === activeCategory);

  const featuredVideo = videos.find((v) => v.featured) || videos[0];

  const handleCopyLink = (video: YouTubeVideo, e: React.MouseEvent) => {
    e.stopPropagation();
    const url = video.youtubeUrl || `https://www.youtube.com/watch?v=${video.youtubeId}`;
    navigator.clipboard.writeText(url);
    setCopiedId(video.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="videos" className="py-20 bg-[#1F2218] text-[#FDFBF7] relative overflow-hidden border-t border-[#2E3324]">
      {/* Subtle Background Lighting Accent */}
      <div className="absolute top-1/4 left-0 -ml-20 w-80 h-80 rounded-full bg-[#DC2626]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 -mr-20 w-96 h-96 rounded-full bg-[#1E3A8A]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title & Subtitle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DC2626]/20 text-[#D4E2BA] text-xs font-bold uppercase tracking-wider border border-[#DC2626]/30">
              <Film className="w-3.5 h-3.5" />
              YouTube Video Showcase & 4K Cinema Reels
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#FDFBF7]">
              Cinematic Video Stories
            </h2>
            <p className="text-sm sm:text-base text-[#D4CEB8] max-w-2xl font-normal">
              Beyond still photos: explore our music-synced 4K video teasers, social media reels, and behind-the-scenes highlights captured during 30-minute sessions.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            {onOpenCustomizerWithTab && (
              <button
                onClick={() => onOpenCustomizerWithTab('videos')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#282C1E] hover:bg-[#343927] text-[#FDFBF7] border border-[#3A402D] transition"
              >
                <Plus className="w-3.5 h-3.5 text-[#DC2626]" />
                <span>Add / Manage YouTube Links</span>
              </button>
            )}
            <button
              onClick={() => onOpenBooking()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
              style={{ backgroundColor: primaryColor }}
            >
              <span>Book Shoot with 4K Video</span>
            </button>
          </div>
        </div>

        {/* Featured Video Embed Spotlight Player */}
        {featuredVideo && (
          <div className="mb-14 bg-[#262A1D] rounded-3xl overflow-hidden border border-[#3A402D] shadow-2xl p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* 16:9 Video Player Container */}
            <div className="lg:col-span-8 relative aspect-video rounded-2xl overflow-hidden bg-black shadow-inner group">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${extractYouTubeId(
                  featuredVideo.youtubeId || featuredVideo.youtubeUrl
                )}?rel=0&modestbranding=1`}
                title={featuredVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            {/* Featured Video Info & Direct Booking */}
            <div className="lg:col-span-4 space-y-4 text-left">
              <div 
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-white text-[11px] font-extrabold uppercase tracking-wider shadow-xs"
                style={{ backgroundColor: primaryColor }}
              >
                Featured Spotlight
              </div>
              <h3 className="text-xl font-bold text-white leading-tight">
                {featuredVideo.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#D4CEB8] leading-relaxed">
                {featuredVideo.description}
              </p>

              <div className="space-y-2 text-xs text-[#EAE6D8] pt-2 border-t border-[#3A402D]">
                <div className="flex items-center justify-between">
                  <span className="text-[#8C887B]">Directed By:</span>
                  <span className="font-semibold text-white">{featuredVideo.photographerName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#8C887B]">Location:</span>
                  <span className="font-semibold text-white">{featuredVideo.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#8C887B]">Category:</span>
                  <span className="font-semibold text-[#D4E2BA]">{featuredVideo.category}</span>
                </div>
              </div>

              <div className="pt-3 flex items-center gap-3">
                <button
                  onClick={() => onOpenBooking({ category: featuredVideo.category })}
                  className="flex-1 py-2.5 px-4 rounded-xl text-white font-bold text-xs shadow-md transition-all hover:opacity-90 text-center"
                  style={{ backgroundColor: primaryColor }}
                >
                  Book This Style Shoot
                </button>
                <button
                  onClick={(e) => handleCopyLink(featuredVideo, e)}
                  className="p-2.5 rounded-xl bg-[#1F2218] hover:bg-[#343927] text-[#D4CEB8] border border-[#3A402D] transition"
                  title="Copy YouTube Link"
                >
                  {copiedId === featuredVideo.id ? (
                    <CheckCircle className="w-4 h-4 text-[#DC2626]" />
                  ) : (
                    <Share2 className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-[#1E3A8A] text-white shadow-md'
                  : 'bg-[#282C1E] text-[#D4CEB8] hover:bg-[#343927] hover:text-white border border-[#3A402D]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => {
            const ytId = extractYouTubeId(video.youtubeId || video.youtubeUrl);
            const thumb = video.thumbnail || getYouTubeThumbnail(ytId);

            return (
              <div
                key={video.id}
                onClick={() => onOpenVideoModal(ytId || video.youtubeUrl)}
                className="bg-[#262A1D] rounded-2xl overflow-hidden border border-[#3A402D] hover:border-[#DC2626] hover:shadow-2xl transition-all duration-300 cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  {/* Thumbnail Container with Play Overlay */}
                  <div className="relative aspect-video overflow-hidden bg-[#1F2218]">
                    <img
                      src={thumb}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1F2218]/90 via-transparent to-black/30" />

                    {/* Play Button Trigger */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-[#1E3A8A]/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-[#1E3A8A] transition-all duration-300">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </div>

                    {/* Duration Badge */}
                    <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/80 text-white text-[10px] font-bold font-mono">
                      {video.duration}
                    </div>

                    {/* Category Pill */}
                    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-[#1F2218]/90 backdrop-blur-md text-[#D4E2BA] text-[10px] font-bold uppercase tracking-wider border border-[#DC2626]/30">
                      {video.category}
                    </div>

                    {/* Vertical Badge if Reel */}
                    {video.isVertical && (
                      <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-[#1E3A8A] text-white text-[10px] font-bold uppercase">
                        Vertical Reel
                      </div>
                    )}
                  </div>

                  {/* Video Metadata */}
                  <div className="p-4 space-y-2">
                    <h3 className="text-sm font-bold text-white line-clamp-2 leading-snug group-hover:text-[#D4E2BA] transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-xs text-[#D4CEB8] line-clamp-2 leading-relaxed font-normal">
                      {video.description}
                    </p>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-4 pb-4 pt-2 border-t border-[#3A402D] flex items-center justify-between text-[11px] text-[#D4CEB8]">
                  <div className="flex items-center gap-1.5 truncate mr-2">
                    <MapPin className="w-3 h-3 text-[#DC2626] shrink-0" />
                    <span className="truncate">{video.location}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {video.views && (
                      <span className="text-[#8C887B]">{video.views}</span>
                    )}
                    <button
                      onClick={(e) => handleCopyLink(video, e)}
                      className="p-1 rounded hover:bg-[#343927] text-[#8C887B] hover:text-white transition"
                      title="Share YouTube link"
                    >
                      {copiedId === video.id ? (
                        <CheckCircle className="w-3.5 h-3.5 text-[#DC2626]" />
                      ) : (
                        <Share2 className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* YouTube Channel Promo Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-[#2B301F] via-[#232719] to-[#1F2218] border border-[#3E452E] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1E3A8A] flex items-center justify-center text-white shrink-0 shadow-md">
              <Tv className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">
                Follow Umiya Studio on YouTube
              </div>
              <div className="text-xs text-[#D4CEB8]">
                Weekly behind-the-scenes, posing guides, and client highlights.
              </div>
            </div>
          </div>
          <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1E3A8A] text-white text-xs font-bold hover:bg-[#1E40AF] transition"
          >
            <span>Visit YouTube Channel</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
};
