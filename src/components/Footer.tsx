import React from 'react';
import { SiteConfig } from '../types';
import { UmiyaLogo } from './UmiyaLogo';
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Youtube,
  Sparkles,
  Heart,
  ShieldCheck,
} from 'lucide-react';

interface FooterProps {
  config: SiteConfig;
  onSelectCity: (cityId: string) => void;
  onOpenBooking: () => void;
  onToggleCustomizer: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  config,
  onSelectCity,
  onOpenBooking,
  onToggleCustomizer,
}) => {
  return (
    <footer className="bg-[#1F2218] text-[#FDFBF7] pt-16 pb-12 border-t border-[#3A402D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#3A402D]">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <UmiyaLogo
                customLogoUrl={config.customLogoUrl}
                size={44}
                showText={true}
              />
            </div>
            <p className="text-xs text-[#D4CEB8] leading-relaxed max-w-sm">
              Umiya Studio USA is the premier nationwide photography and 4K cinematography mini-session service. 30-minute shoots at iconic scenic spots—pay only for the memories you love.
            </p>

            <div className="space-y-2 pt-2 text-xs text-[#EAE6D8]">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#DC2626]" />
                <span>{config.phoneContact} (Concierge SMS / Call)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#DC2626]" />
                <span>{config.emailContact}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={config.youtubeChannelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#2D3021] hover:bg-[#A25035] text-white flex items-center justify-center transition border border-[#3E432E]"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={`https://instagram.com/${config.instagramHandle.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#2D3021] hover:bg-[#DC2626] text-white flex items-center justify-center transition border border-[#3E432E]"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Top Metro Cities */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#D4E2BA]">
              Top Metro Hubs
            </h4>
            <ul className="space-y-2 text-xs text-[#D4CEB8]">
              {config.cities.slice(0, 6).map((city) => (
                <li key={city.id}>
                  <button
                    onClick={() => {
                      onSelectCity(city.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-white transition flex items-center gap-1 text-left"
                  >
                    <span>{city.name}, {city.state}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Photography Styles */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#D4E2BA]">
              Session Styles
            </h4>
            <ul className="space-y-2 text-xs text-[#D4CEB8]">
              <li><a href="#gallery" className="hover:text-white transition">Family & Children</a></li>
              <li><a href="#gallery" className="hover:text-white transition">Couples & Surprise Proposals</a></li>
              <li><a href="#gallery" className="hover:text-white transition">Maternity Golden Hour</a></li>
              <li><a href="#gallery" className="hover:text-white transition">Executive & LinkedIn Headshots</a></li>
              <li><a href="#videos" className="hover:text-[#D4E2BA] transition font-semibold">4K YouTube Video Reels</a></li>
              <li><a href="#gallery" className="hover:text-white transition">Puppies & Pets Sessions</a></li>
            </ul>
          </div>

          {/* Col 4: Quick Action & WP Customizer */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#D4E2BA]">
              Quick Actions
            </h4>
            <div className="space-y-2">
              <button
                onClick={onOpenBooking}
                className="w-full py-2 px-3 rounded-lg bg-[#1E3A8A] text-white font-bold text-xs hover:bg-[#3D4D1D] transition text-center shadow-xs"
              >
                Book 30-Min Shoot
              </button>
              <button
                onClick={onToggleCustomizer}
                className="w-full py-2 px-3 rounded-lg bg-[#DC2626]/20 text-[#D4E2BA] border border-[#DC2626]/40 font-bold text-xs hover:bg-[#DC2626]/30 transition text-center"
              >
                Admin Login
              </button>
            </div>
            <p className="text-[11px] text-[#8C887B] leading-normal pt-1">
              Guaranteed satisfaction or 100% free re-shoot.
            </p>
          </div>

        </div>

        {/* Copyright & Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8C887B]">
          <p>© {new Date().getFullYear()} Umiya Studio USA. Inspired by the Shoott model. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-[#D4CEB8] cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-[#D4CEB8] cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-[#D4CEB8] cursor-pointer">Print Release</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
