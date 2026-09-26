import React from 'react';
import { Logo } from './Logo';
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Youtube,
  Facebook,
  ArrowRight,
  Heart,
  Globe,
  Award,
  ShieldCheck
} from 'lucide-react';
import { SERVICES_LIST } from '../../data/mockData';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
  onOpenBooking: () => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection, onOpenBooking, onOpenAdmin }) => {
  return (
    <footer className="bg-[#0F172A] text-slate-300 pt-16 pb-8 border-t border-slate-800 relative overflow-hidden">
      {/* Background Decorative USA/India Elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#1E3A8A]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#D62828]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Studio Brand & Presence */}
          <div className="lg:col-span-4 space-y-4">
            <Logo size="lg" variant="light" />
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm pt-2">
              Award-winning luxury photography and cinematic film studio documenting regal celebrations across the USA, India, and exotic destination venues worldwide.
            </p>

            <div className="pt-2 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-200">
                <Globe className="w-4 h-4 text-amber-400" />
                <span className="font-semibold text-white">Dual Global Headquarters</span>
              </div>
              <p className="text-slate-400 pl-6">
                <strong className="text-slate-200">USA:</strong> Edison, New Jersey • San Jose, California
              </p>
              <p className="text-slate-400 pl-6">
                <strong className="text-slate-200">INDIA:</strong> SG Highway, Ahmedabad • Bandra, Mumbai
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-[#D62828] text-white flex items-center justify-center transition-colors shadow-md"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-[#D62828] text-white flex items-center justify-center transition-colors shadow-md"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-[#1E3A8A] text-white flex items-center justify-center transition-colors shadow-md"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-lg font-bold text-white border-b border-slate-800 pb-2">Navigation</h4>
            <ul className="space-y-2 text-xs">
              {['Hero', 'Services', 'Portfolio', 'About', 'Experience', 'Videos', 'Contact'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => onNavigateSection(item.toLowerCase())}
                    className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                  >
                    <ArrowRight className="w-3 h-3 text-[#1E3A8A]" />
                    <span>{item === 'Hero' ? 'Home' : item}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Popular Services */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-lg font-bold text-white border-b border-slate-800 pb-2">Services</h4>
            <ul className="space-y-2 text-xs">
              {SERVICES_LIST.slice(0, 6).map((srv) => (
                <li key={srv.id}>
                  <button
                    onClick={onOpenBooking}
                    className="hover:text-amber-400 transition-colors flex items-center gap-1.5 text-left"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D62828]" />
                    <span>{srv.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Direct Contact & Newsletter */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif text-lg font-bold text-white border-b border-slate-800 pb-2">Direct Contact</h4>
            <div className="space-y-2.5 text-xs">
              <a
                href="tel:+18005558649"
                className="flex items-center gap-2.5 hover:text-amber-300 transition-colors text-slate-200"
              >
                <Phone className="w-4 h-4 text-[#1E3A8A]" />
                <span>+1 (800) 555-UMIYA (8649)</span>
              </a>
              <a
                href="mailto:contact@umiyastudio.com"
                className="flex items-center gap-2.5 hover:text-amber-300 transition-colors text-slate-200"
              >
                <Mail className="w-4 h-4 text-[#D62828]" />
                <span>contact@umiyastudio.com</span>
              </a>
              <div className="flex items-center gap-2.5 text-slate-300">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>USA & India Nationwide Coverage</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="w-full bg-gradient-to-r from-[#1E3A8A] to-[#D62828] text-white py-2.5 px-4 rounded-xl font-bold text-xs shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2"
              >
                <Award className="w-4 h-4 text-amber-300" />
                <span>Book Free Consultation</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} UMIYA STUDIO USA. All rights reserved.</p>

          <div className="flex items-center gap-6">
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="text-amber-400 font-bold hover:underline cursor-pointer"
              >
                Admin CMS Panel
              </button>
            )}
            <span>•</span>
            <span className="flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              FAA Part 107 Certified Drone Studio
            </span>
            <span>•</span>
            <span className="text-slate-400">Privacy Policy</span>
            <span>•</span>
            <span className="text-slate-400">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
