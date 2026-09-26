import React from 'react';

interface UmiyaLogoProps {
  className?: string;
  size?: number;
  customLogoUrl?: string;
  showText?: boolean;
}

export const UmiyaLogo: React.FC<UmiyaLogoProps> = ({
  className = '',
  size = 52,
  customLogoUrl,
  showText = true,
}) => {
  if (customLogoUrl && customLogoUrl.trim() !== '') {
    return (
      <div className={`inline-flex items-center gap-3 ${className}`}>
        <img
          src={customLogoUrl}
          alt="Umiya Studio USA"
          className="rounded-full object-cover border border-neutral-300 shadow-sm"
          style={{ width: size, height: size }}
          referrerPolicy="no-referrer"
        />
        {showText && (
          <div className="flex flex-col">
            <span className="font-extrabold tracking-tight text-neutral-950 text-lg leading-tight uppercase font-['Plus_Jakarta_Sans',sans-serif]">
              UMIYA STUDIO
            </span>
            <span className="text-xs font-bold tracking-[0.25em] text-red-600 uppercase">
              USA
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Official Umiya Studio USA Circular Flag Camera Badge */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 hover:scale-105"
      >
        {/* Outer Circular Ring */}
        <circle
          cx="100"
          cy="100"
          r="95"
          stroke="#6B7280"
          strokeWidth="6"
          fill="#FFFFFF"
        />

        {/* Camera Silhouette / Flag Shape */}
        <g transform="translate(42, 38)">
          <defs>
            <clipPath id="camera-clip">
              {/* Camera Body Silhouette with Pentaprism/Flash top */}
              <path
                d="M 12 18 C 12 14 15 11 19 11 L 34 11 C 37 11 39 9 41 6 L 47 1 C 49 -0.5 53 -0.5 55 1 L 61 6 C 63 9 65 11 68 11 L 97 11 C 101 11 104 14 104 18 L 104 70 C 104 74 101 77 97 77 L 19 77 C 15 77 12 74 12 70 Z"
              />
            </clipPath>
          </defs>

          {/* Render Stripes & Blue Canton clipped inside Camera Shape */}
          <g clipPath="url(#camera-clip)">
            {/* Background Red */}
            <rect x="0" y="0" width="120" height="85" fill="#DC2626" />
            
            {/* White Stripes */}
            <rect x="0" y="11" width="120" height="9" fill="#FFFFFF" />
            <rect x="0" y="27" width="120" height="9" fill="#FFFFFF" />
            <rect x="0" y="43" width="120" height="9" fill="#FFFFFF" />
            <rect x="0" y="59" width="120" height="9" fill="#FFFFFF" />

            {/* Blue Canton (Left Side with Star) */}
            <path
              d="M 10 0 L 52 0 L 52 50 L 10 50 Z"
              fill="#1E3A8A"
            />

            {/* White Star in Blue Field */}
            <g transform="translate(30, 24) scale(0.9)">
              <polygon
                points="0,-12 3.7,-3.7 12.6,-3.7 5.5,1.4 8.2,9.7 0,4.6 -8.2,9.7 -5.5,1.4 -12.6,-3.7 -3.7,-3.7"
                fill="#FFFFFF"
              />
            </g>
          </g>

          {/* Crisp Camera Outline */}
          <path
            d="M 12 18 C 12 14 15 11 19 11 L 34 11 C 37 11 39 9 41 6 L 47 1 C 49 -0.5 53 -0.5 55 1 L 61 6 C 63 9 65 11 68 11 L 97 11 C 101 11 104 14 104 18 L 104 70 C 104 74 101 77 97 77 L 19 77 C 15 77 12 74 12 70 Z"
            stroke="#1E3A8A"
            strokeWidth="3"
            fill="none"
          />

          {/* Red Bottom Bar Accent */}
          <rect x="12" y="69" width="92" height="8" rx="3" fill="#DC2626" />
        </g>

        {/* Text Below Camera inside Circle: UMIYA STUDIO */}
        <text
          x="100"
          y="138"
          textAnchor="middle"
          fill="#1E3A8A"
          fontSize="18"
          fontWeight="800"
          letterSpacing="1.2"
          fontFamily="system-ui, -apple-system, 'Plus Jakarta Sans', sans-serif"
        >
          UMIYA STUDIO
        </text>

        {/* Text Below: USA */}
        <text
          x="100"
          y="166"
          textAnchor="middle"
          fill="#DC2626"
          fontSize="17"
          fontWeight="700"
          letterSpacing="4"
          fontFamily="system-ui, -apple-system, 'Plus Jakarta Sans', sans-serif"
        >
          USA
        </text>
      </svg>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-neutral-900 text-lg md:text-xl tracking-tight leading-none uppercase font-['Plus_Jakarta_Sans',sans-serif]">
              UMIYA STUDIO
            </span>
            <span className="px-1.5 py-0.5 text-[10px] font-bold bg-[#1E3A8A] text-white rounded tracking-widest uppercase">
              USA
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
