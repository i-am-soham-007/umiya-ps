import React, { useState, useEffect } from 'react';
import { UmiyaLogo } from './UmiyaLogo';
import { SiteConfig, CityData } from '../types';
import {
  MapPin,
  Calendar,
  Sliders,
  Menu,
  X,
  PlaySquare,
  Camera,
  ChevronDown,
  Phone,
  Sparkles,
} from 'lucide-react';

interface NavbarProps {
  config: SiteConfig;
  selectedCity: string;
  onSelectCity: (cityId: string) => void;
  onOpenBooking: (initialData?: { city?: string; category?: string }) => void;
  onToggleCustomizer: () => void;
  isCustomizerOpen: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  config,
  selectedCity,
  onSelectCity,
  onOpenBooking,
  onToggleCustomizer,
  isCustomizerOpen,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentCityObj = config.cities.find((c) => c.id === selectedCity) || config.cities[0];

  return (
    <header
      id="main-navbar"
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FDFBF7]/95 backdrop-blur-md shadow-xs border-b border-[#E6E2D3] py-3'
          : 'bg-[#FDFBF7]/80 backdrop-blur-sm border-b border-[#E6E2D3]/60 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <a href="#hero" className="flex items-center gap-2 group">
          <UmiyaLogo
            customLogoUrl={config.customLogoUrl}
            size={48}
            showText={true}
          />
        </a>

        {/* City Dropdown Selector (Shoott style) */}
        <div className="relative hidden lg:block">
          <button
            onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#DCD8C8] hover:border-[#DC2626] bg-[#F2F0E6]/80 text-xs font-semibold text-[#3D3B36] transition"
          >
            <MapPin className="w-3.5 h-3.5 text-[#1E3A8A] shrink-0" />
            <span>{currentCityObj.name}, {currentCityObj.state}</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#7D796C]" />
          </button>

          {cityDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-[#E6E2D3] p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-3 py-1.5 text-[11px] font-bold text-[#8C887B] uppercase tracking-wider">
                Select Your Metro Area
              </div>
              <div className="max-h-60 overflow-y-auto space-y-1">
                {config.cities.map((city) => (
                  <button
                    key={city.id}
                    onClick={() => {
                      onSelectCity(city.id);
                      setCityDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-left transition ${
                      selectedCity === city.id
                        ? 'bg-[#EFF6FF] text-[#1E3A8A] font-bold'
                        : 'hover:bg-[#F8F6F0] text-[#3D3B36]'
                    }`}
                  >
                    <span>{city.name}, {city.state}</span>
                    <span className="text-[10px] bg-[#EAE6D8] text-[#5C594D] px-1.5 py-0.5 rounded-full">
                      {city.spotCount} spots
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-[#5C594D]">
          <a
            href="#how-it-works"
            className="hover:text-[#1E3A8A] transition-colors"
          >
            How It Works
          </a>
          <a
            href="#videos"
            className="inline-flex items-center gap-1.5 hover:text-[#1E3A8A] transition-colors group"
          >
            <PlaySquare className="w-4 h-4 text-[#DC2626] group-hover:scale-110 transition-transform" />
            <span>Video Stories</span>
            <span className="px-1.5 py-0.2 bg-[#EFF6FF] text-[#1E3A8A] border border-[#93C5FD] text-[10px] font-extrabold rounded-full">
              4K
            </span>
          </a>
          <a
            href="#gallery"
            className="inline-flex items-center gap-1.5 hover:text-[#1E3A8A] transition-colors group"
          >
            <Camera className="w-4 h-4 text-[#DC2626] group-hover:scale-110 transition-transform" />
            <span>Photo Gallery</span>
          </a>
          <a
            href="#pricing"
            className="hover:text-[#1E3A8A] transition-colors"
          >
            Pricing
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">


          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#3D3B36] hover:text-[#1E3A8A] md:hidden rounded-lg hover:bg-[#F2F0E6]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E6E2D3] bg-[#FDFBF7] px-4 pt-3 pb-6 space-y-4 shadow-xl animate-in slide-in-from-top duration-200">
          {/* City Picker for mobile */}
          <div className="space-y-1.5 pb-3 border-b border-[#E6E2D3]">
            <label className="text-xs font-bold text-[#7D796C] uppercase tracking-wider flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#1E3A8A]" /> Active City
            </label>
            <select
              value={selectedCity}
              onChange={(e) => onSelectCity(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-[#DCD8C8] text-sm font-semibold bg-[#F2F0E6] text-[#3D3B36]"
            >
              {config.cities.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}, {c.state} ({c.spotCount} spots)
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm font-semibold text-[#3D3B36]">
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-[#F2F0E6] flex items-center gap-2"
            >
              <span>How It Works</span>
            </a>
            <a
              href="#videos"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-[#EFF6FF] text-[#1E3A8A] flex items-center gap-2 font-bold"
            >
              <PlaySquare className="w-4 h-4 text-[#DC2626]" />
              <span>Video Stories</span>
            </a>
            <a
              href="#gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-[#EFF6FF] text-[#1E3A8A] flex items-center gap-2 font-bold"
            >
              <Camera className="w-4 h-4 text-[#DC2626]" />
              <span>Photo Gallery</span>
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-[#F2F0E6]"
            >
              Pricing
            </a>
            <a
              href="#photographers"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-[#F2F0E6]"
            >
              Photographers
            </a>
          </div>

          <div className="pt-2 border-t border-[#E6E2D3] flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onToggleCustomizer();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold bg-[#F2F0E6] text-[#3D3B36] border border-[#DCD8C8]"
            >
              <Sliders className="w-4 h-4 text-[#DC2626]" />
              <span>Open WordPress Live Customizer</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white shadow-md"
              style={{ backgroundColor: config.theme.primaryColor || '#1E3A8A' }}
            >
              <Calendar className="w-4 h-4" />
              <span>Book 30-Minute Shoot ($0 upfront)</span>
            </button>

            <div className="flex items-center justify-between text-xs text-[#7D796C] px-1 pt-1">
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3 text-[#7D796C]" /> {config.phoneContact}
              </span>
              <span className="font-medium text-[#3D3B36]">4.95 ★ (14k+ reviews)</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
