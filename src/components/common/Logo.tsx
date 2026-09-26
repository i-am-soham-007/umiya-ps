import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark' | 'gold';
  showSubtext?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  variant = 'dark',
  showSubtext = true
}) => {
  const sizeMap = {
    sm: { icon: 'w-7 h-7', title: 'text-base', sub: 'text-[9px]' },
    md: { icon: 'w-9 h-9', title: 'text-xl', sub: 'text-[10px]' },
    lg: { icon: 'w-12 h-12', title: 'text-2xl', sub: 'text-[11px]' },
    xl: { icon: 'w-16 h-16', title: 'text-3xl', sub: 'text-[13px]' }
  };

  const currentSize = sizeMap[size];

  const textColor =
    variant === 'light'
      ? 'text-white'
      : variant === 'gold'
      ? 'text-amber-400'
      : 'text-slate-900';

  const subTextColor =
    variant === 'light' ? 'text-slate-300' : 'text-slate-500';

  return (
    <div className={`flex items-center gap-3 cursor-pointer select-none group ${className}`}>
      {/* Aperture Lens Icon */}
      <div className={`relative ${currentSize.icon} flex items-center justify-center`}>
        {/* Outer Ring with USA Gradient Glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#1E3A8A] via-[#D62828] to-amber-500 p-[1.5px] shadow-sm group-hover:rotate-45 transition-transform duration-700">
          <div className="w-full h-full bg-[#0F172A] rounded-full flex items-center justify-center overflow-hidden">
            {/* Aperture Shutter Blades SVG */}
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full p-1 text-white opacity-90 transition-transform duration-500 group-hover:scale-105"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              {/* Shutter Blades */}
              <circle cx="50" cy="50" r="45" stroke="#1E3A8A" strokeWidth="2" opacity="0.4" />
              <path d="M50 10 L65 35 L40 45 Z" fill="#D62828" opacity="0.85" />
              <path d="M90 50 L65 65 L55 40 Z" fill="#1E3A8A" opacity="0.85" />
              <path d="M50 90 L35 65 L60 55 Z" fill="#D62828" opacity="0.85" />
              <path d="M10 50 L35 35 L45 60 Z" fill="#1E3A8A" opacity="0.85" />
              {/* Inner Lens Glass Focus */}
              <circle cx="50" cy="50" r="16" fill="url(#lensGrad)" stroke="#F59E0B" strokeWidth="1.5" />
              <defs>
                <radialGradient id="lensGrad" cx="30%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#1E3A8A" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#0F172A" stopOpacity="1" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Floating USA Star Badge */}
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#D62828] rounded-full border border-white shadow-xs"></span>
      </div>

      {/* Typography */}
      <div className="flex flex-col leading-none">
        <div className={`font-serif tracking-wider font-bold ${currentSize.title} ${textColor} flex items-center gap-1.5`}>
          <span>UMIYA</span>
          <span className="font-sans font-extrabold tracking-widest text-[0.8em] text-[#1E3A8A] bg-blue-50 px-1.5 py-0.5 rounded-xs border border-blue-200">
            USA
          </span>
        </div>
        {showSubtext && (
          <span className={`tracking-[0.25em] uppercase font-semibold mt-1 ${currentSize.sub} ${subTextColor}`}>
            STUDIO • PHOTOGRAPHY & FILM
          </span>
        )}
      </div>
    </div>
  );
};
