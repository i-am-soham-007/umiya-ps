import React from 'react';
import { YouTubeVideo } from '../types';
import { extractYouTubeId } from '../utils/youtube';
import { X, Play, ExternalLink, Calendar, MapPin, User, Share2, Check } from 'lucide-react';

interface VideoModalProps {
  videoIdOrUrl: string | null;
  videoData?: YouTubeVideo;
  onClose: () => void;
  onOpenBooking: (initialData?: { category?: string }) => void;
  primaryColor?: string;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  videoIdOrUrl,
  videoData,
  onClose,
  onOpenBooking,
  primaryColor = '#1E3A8A',
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!videoIdOrUrl) return null;

  const ytId = extractYouTubeId(videoIdOrUrl);
  const youtubeWatchUrl = `https://www.youtube.com/watch?v=${ytId}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(youtubeWatchUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-neutral-950 rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl flex flex-col">
        
        {/* Modal Header */}
        <div className="p-4 sm:px-6 bg-[#2D3021] border-b border-[#3A402D] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#DC2626] animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#D4E2BA]">
              YouTube 4K Video Player
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={youtubeWatchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-[#3A402D] hover:bg-[#4A523A] text-[#EAE6D8] hover:text-white transition text-xs font-semibold flex items-center gap-1"
              title="Open directly on YouTube"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Open in YouTube</span>
            </a>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-[#3A402D] hover:bg-[#4A523A] text-[#EAE6D8] hover:text-white transition"
              aria-label="Close video"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* YouTube Embed Player Container */}
        <div className="relative w-full aspect-video bg-black">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1`}
            title={videoData?.title || 'YouTube Video'}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        {/* Video Info Footer */}
        <div className="p-5 sm:p-6 bg-[#1F2218] border-t border-[#3A402D] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1 max-w-xl">
            <h3 className="text-base sm:text-lg font-bold text-[#FDFBF7] leading-snug">
              {videoData?.title || 'Cinematic Session Highlight'}
            </h3>
            {videoData && (
              <div className="flex flex-wrap items-center gap-3 text-xs text-[#D4CEB8]">
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-[#DC2626]" />
                  {videoData.photographerName}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#DC2626]" />
                  {videoData.location}
                </span>
                <span className="px-2 py-0.5 rounded bg-[#2D3021] text-[#D4E2BA] border border-[#3A402D] font-semibold text-[10px]">
                  {videoData.category}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleCopy}
              className="p-2.5 rounded-xl bg-[#2D3021] hover:bg-[#3A402D] text-[#EAE6D8] border border-[#3A402D] transition shrink-0"
              title="Copy YouTube Link"
            >
              {copied ? (
                <Check className="w-4 h-4 text-[#DC2626]" />
              ) : (
                <Share2 className="w-4 h-4" />
              )}
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenBooking({ category: videoData?.category });
              }}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-white font-bold text-xs sm:text-sm shadow-xs hover:opacity-95 transition flex items-center justify-center gap-2 whitespace-nowrap bg-[#1E3A8A] hover:bg-[#3D4D1D]"
            >
              <Calendar className="w-4 h-4" />
              <span>Book This Style Shoot</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
