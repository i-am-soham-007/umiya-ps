import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import {
  Phone,
  Calendar,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Camera,
  Heart,
  Video,
  Award,
  Globe,
  MapPin,
  ExternalLink
} from 'lucide-react';
import { SERVICES_LIST } from '../../data/mockData';

interface NavbarProps {
  onOpenBooking: (serviceTitle?: string) => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenAdmin?: () => void;
  cursorToggle?: boolean;
  onToggleCursor?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onNavigateSection,
  onOpenAdmin,
  cursorToggle = true,
  onToggleCursor
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'All' | 'Wedding' | 'Video' | 'Events'>('Wedding');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const topServices = SERVICES_LIST.slice(0, 8);

  const handleNavClick = (id: string) => {
    onNavigateSection(id);
    setMobileMenuOpen(false);
    setMegaMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-500">
      {/* Top Utility Bar */}
      <div className="bg-[#0F172A] text-slate-300 text-[11px] py-1.5 px-4 sm:px-8 flex justify-between items-center border-b border-slate-800">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 font-medium text-amber-300">
            <Globe className="w-3.5 h-3.5 text-[#1E3A8A]" />
            USA & Worldwide Luxury Photography Studio
          </span>
          <span className="hidden md:inline text-slate-500">|</span>
          <span className="hidden md:flex items-center gap-1.5 text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-[#D62828]" />
            Offices: New Jersey • California • Ahmedabad
          </span>
        </div>

        <div className="flex items-center gap-4 font-medium">
          <a
            href="https://wa.me/12015550199"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-400 transition-colors flex items-center gap-1"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            WhatsApp USA: +1 (201) 555-0199
          </a>
          <span className="text-slate-600">|</span>
          <a
            href="tel:+18005558649"
            className="hover:text-amber-300 transition-colors hidden sm:flex items-center gap-1"
          >
            <Phone className="w-3 h-3 text-[#1E3A8A]" />
            Direct: +1 (800) 555-UMIYA
          </a>
        </div>
      </div>

      {/* Main Glassmorphism Navbar */}
      <nav
        className={`transition-all duration-300 px-4 sm:px-8 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-md shadow-lg py-3 border-b border-slate-200/80 text-slate-900'
            : 'bg-gradient-to-b from-slate-950/80 via-slate-950/40 to-transparent text-white py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Studio Logo */}
          <div onClick={() => handleNavClick('hero')} className="cursor-pointer">
            <Logo
              size="md"
              variant={isScrolled ? 'dark' : 'light'}
            />
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-8 font-medium text-sm tracking-wide">
            <button
              onClick={() => handleNavClick('hero')}
              className="hover:text-[#D62828] transition-colors relative py-1"
            >
              Home
            </button>

            {/* Services with Mega Menu Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setMegaMenuOpen(true)}
              onMouseLeave={() => setMegaMenuOpen(false)}
            >
              <button
                onClick={() => handleNavClick('services')}
                className="flex items-center gap-1.5 hover:text-[#D62828] transition-colors py-1 group"
              >
                <span>Services</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${megaMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Mega Menu Overlay */}
              {megaMenuOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[720px] bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 text-slate-900 grid grid-cols-12 gap-6 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="col-span-4 bg-gradient-to-br from-[#1E3A8A] to-[#0F172A] text-white p-5 rounded-xl flex flex-col justify-between">
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest bg-[#D62828] text-white uppercase mb-3">
                        Luxury Catalog
                      </span>
                      <h4 className="font-serif text-xl font-bold mb-2">15 Dedicated Photography Services</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        From grand 4-day weddings to 4K cinematic film and aerial drone perspectives across USA and India.
                      </p>
                    </div>
                    <button
                      onClick={() => handleNavClick('services')}
                      className="mt-4 text-xs font-bold text-amber-400 flex items-center gap-1 hover:underline"
                    >
                      View All Services <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="col-span-8 grid grid-cols-2 gap-3 text-xs">
                    {topServices.map((srv) => (
                      <div
                        key={srv.id}
                        onClick={() => {
                          onOpenBooking(srv.title);
                          setMegaMenuOpen(false);
                        }}
                        className="p-2.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer border border-transparent hover:border-slate-200 flex items-start gap-2.5 group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1E3A8A] flex items-center justify-center shrink-0 group-hover:bg-[#1E3A8A] group-hover:text-white transition-colors">
                          <Camera className="w-4 h-4" />
                        </div>
                        <div>
                          <h5 className="font-semibold text-slate-900 group-hover:text-[#D62828] transition-colors">
                            {srv.title}
                          </h5>
                          <p className="text-[11px] text-slate-500 line-clamp-1">{srv.shortDescription}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavClick('portfolio')}
              className="hover:text-[#D62828] transition-colors relative py-1"
            >
              Portfolio
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className="hover:text-[#D62828] transition-colors relative py-1"
            >
              About Studio
            </button>

            <button
              onClick={() => handleNavClick('experience')}
              className="hover:text-[#D62828] transition-colors relative py-1"
            >
              Experience
            </button>

            <button
              onClick={() => handleNavClick('videos')}
              className="hover:text-[#D62828] transition-colors relative py-1"
            >
              Films
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className="hover:text-[#D62828] transition-colors relative py-1"
            >
              Contact
            </button>
          </div>

          {/* Right Action CTAs */}
          <div className="flex items-center gap-3">
            {/* Admin CMS Panel Trigger */}
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="hidden md:flex items-center gap-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer"
                title="Open Backend Admin Panel"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>CMS Admin</span>
              </button>
            )}

            {/* Custom Cursor Toggle Button */}
            {onToggleCursor && (
              <button
                onClick={onToggleCursor}
                title={cursorToggle ? 'Disable Custom Luxury Cursor' : 'Enable Custom Luxury Cursor'}
                className={`hidden sm:flex items-center justify-center w-8 h-8 rounded-full border text-xs transition-colors ${
                  cursorToggle
                    ? 'border-amber-500 text-amber-500 bg-amber-500/10'
                    : 'border-slate-400 text-slate-400 hover:border-slate-300'
                }`}
              >
                ✨
              </button>
            )}

            {/* Book Session CTA */}
            <button
              onClick={() => onOpenBooking()}
              className="bg-[#1E3A8A] hover:bg-[#D62828] text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-full shadow-md hover:shadow-xl transition-all duration-300 flex items-center gap-2 group cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-amber-300 group-hover:scale-110 transition-transform" />
              <span>Book Session</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-800 dark:text-white hover:bg-slate-200/20"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[88px] bg-[#0F172A] text-white p-6 shadow-2xl border-b border-slate-800 animate-in slide-in-from-top duration-300 max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col gap-4 font-medium text-base">
            <button
              onClick={() => handleNavClick('hero')}
              className="text-left py-2 border-b border-slate-800 hover:text-amber-400"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('services')}
              className="text-left py-2 border-b border-slate-800 hover:text-amber-400 flex items-center justify-between"
            >
              <span>Featured Services</span>
              <span className="text-xs bg-[#1E3A8A] px-2 py-0.5 rounded-full">15 Services</span>
            </button>
            <button
              onClick={() => handleNavClick('portfolio')}
              className="text-left py-2 border-b border-slate-800 hover:text-amber-400"
            >
              Portfolio Gallery
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="text-left py-2 border-b border-slate-800 hover:text-amber-400"
            >
              About Studio & Founder
            </button>
            <button
              onClick={() => handleNavClick('experience')}
              className="text-left py-2 border-b border-slate-800 hover:text-amber-400"
            >
              Our Creative Process
            </button>
            <button
              onClick={() => handleNavClick('videos')}
              className="text-left py-2 border-b border-slate-800 hover:text-amber-400"
            >
              Cinematic Films
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="text-left py-2 border-b border-slate-800 hover:text-amber-400"
            >
              Contact & Locations
            </button>

            <div className="pt-4 flex flex-col gap-3">
              <button
                onClick={() => {
                  onOpenBooking();
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-[#D62828] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Book Consultation Now
              </button>

              <div className="text-center text-xs text-slate-400 pt-2">
                <p>USA Office: New Jersey & California</p>
                <p>India Office: Ahmedabad & Mumbai</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
