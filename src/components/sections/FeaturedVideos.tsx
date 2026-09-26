import React, { useState } from 'react';
import { FEATURED_VIDEOS } from '../../data/mockData';
import { VideoItem } from '../../types';
import { Play, Film, Clock, Eye, Sparkles, X, Volume2, Calendar } from 'lucide-react';

interface FeaturedVideosProps {
  onOpenBooking: (serviceTitle?: string) => void;
}

export const FeaturedVideos: React.FC<FeaturedVideosProps> = ({ onOpenBooking }) => {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  return (
    <section id="videos" className="py-24 bg-[#0F172A] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest bg-amber-500/20 text-amber-300 uppercase border border-amber-500/30">
            CINEMATIC FILM SHOWCASE
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
            4K Cinema & Storytelling Films
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Filmed with RED Cinema and Sony Venice cameras, custom orchestral sound design, and professional color grading in DaVinci Resolve.
          </p>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURED_VIDEOS.map((vid) => (
            <div
              key={vid.id}
              onClick={() => setActiveVideo(vid)}
              className="group bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl hover:border-amber-500/40 transition-all duration-500 cursor-pointer flex flex-col justify-between"
            >
              {/* Thumbnail Container */}
              <div className="relative h-64 overflow-hidden bg-black">
                <img
                  src={vid.thumbnail}
                  alt={vid.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-[#D62828] text-white flex items-center justify-center shadow-2xl group-hover:scale-125 transition-transform duration-300 group-hover:bg-[#1E3A8A]">
                    <Play className="w-7 h-7 fill-white ml-1" />
                  </div>
                </div>

                {/* Badges */}
                <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-amber-300 border border-amber-500/30">
                  {vid.category}
                </div>

                <div className="absolute bottom-4 right-4 bg-slate-950/90 text-slate-300 text-[10px] font-mono px-2.5 py-1 rounded-md flex items-center gap-1 border border-slate-800">
                  <Clock className="w-3 h-3 text-amber-400" />
                  <span>{vid.duration}</span>
                </div>
              </div>

              {/* Info Body */}
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>{vid.location}</span>
                  <span className="flex items-center gap-1 text-emerald-400">
                    <Eye className="w-3.5 h-3.5" /> {vid.views}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold group-hover:text-amber-300 transition-colors">
                  {vid.title}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {vid.description}
                </p>

                <div className="pt-2 flex items-center justify-between text-xs font-bold text-amber-400">
                  <span>Watch Trailer</span>
                  <Film className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal Player */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200">
          <div className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
            <div className="flex items-center justify-between p-4 bg-slate-950 border-b border-slate-800">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                <Film className="w-4 h-4" />
                <span>{activeVideo.title}</span>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-video bg-black flex items-center justify-center">
              <video
                controls
                autoPlay
                className="w-full h-full object-contain"
                poster={activeVideo.thumbnail}
              >
                <source src={activeVideo.videoUrl} type="video/mp4" />
                Your browser does not support video play.
              </video>
            </div>

            <div className="p-6 bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-serif font-bold text-lg text-white">{activeVideo.coupleName}</h4>
                <p className="text-xs text-slate-400">{activeVideo.location} • {activeVideo.category}</p>
              </div>

              <button
                onClick={() => {
                  onOpenBooking('Cinematic Wedding Film');
                  setActiveVideo(null);
                }}
                className="bg-[#1E3A8A] hover:bg-[#D62828] text-white text-xs font-bold px-6 py-3 rounded-xl transition-colors cursor-pointer"
              >
                Book Cinematic Film Coverage
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
