import React from 'react';
import { Sparkles, ArrowRight, X } from 'lucide-react';

interface AnnouncementBarProps {
  text: string;
  linkText: string;
  onLinkClick: () => void;
  onClose?: () => void;
  accentColor?: string;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
  text,
  linkText,
  onLinkClick,
  onClose,
  accentColor = '#DC2626',
}) => {
  return (
    <div 
      id="announcement-bar"
      className="bg-[#2D3021] text-[#FDFBF7] px-4 py-2.5 text-xs sm:text-sm font-medium relative z-50 border-b border-[#3E432E]"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 sm:gap-3 text-center pr-8 sm:pr-0">
        <span 
          className="inline-flex items-center justify-center p-1 rounded-full text-white shrink-0 shadow-xs"
          style={{ backgroundColor: accentColor }}
        >
          <Sparkles className="w-3.5 h-3.5" />
        </span>
        <span className="truncate">{text}</span>
        <button
          onClick={onLinkClick}
          className="inline-flex items-center gap-1 font-bold underline underline-offset-2 hover:text-[#93C5FD] transition-colors whitespace-nowrap"
        >
          {linkText}
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {onClose && (
        <button
          onClick={onClose}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#A4A194] hover:text-[#FDFBF7] rounded-full hover:bg-[#3E432E] transition"
          aria-label="Close banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};
