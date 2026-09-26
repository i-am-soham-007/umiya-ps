import React, { useState } from 'react';
import { SERVICES_LIST } from '../../data/mockData';
import { ServiceItem } from '../../types';
import {
  Camera,
  Video,
  Sparkles,
  Heart,
  Zap,
  Globe,
  Users,
  Baby,
  Gift,
  Briefcase,
  Radio,
  ShoppingBag,
  Film,
  Layers,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

interface FeaturedServicesProps {
  onOpenBooking: (serviceTitle?: string) => void;
}

export const FeaturedServices: React.FC<FeaturedServicesProps> = ({ onOpenBooking }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalService, setActiveModalService] = useState<ServiceItem | null>(null);

  const categories = ['All', 'Wedding', 'Video', 'Events', 'Portrait', 'Commercial', 'Special'];

  const filteredServices =
    selectedCategory === 'All'
      ? SERVICES_LIST
      : SERVICES_LIST.filter((s) => s.category === selectedCategory);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Camera': return <Camera className="w-5 h-5" />;
      case 'Video': return <Video className="w-5 h-5" />;
      case 'HeartHandshake': return <Heart className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      case 'Zap': return <Zap className="w-5 h-5" />;
      case 'Baby': return <Baby className="w-5 h-5" />;
      case 'Gift': return <Gift className="w-5 h-5" />;
      case 'Users': return <Users className="w-5 h-5" />;
      case 'Briefcase': return <Briefcase className="w-5 h-5" />;
      case 'Radio': return <Radio className="w-5 h-5" />;
      case 'Globe': return <Globe className="w-5 h-5" />;
      case 'ShoppingBag': return <ShoppingBag className="w-5 h-5" />;
      case 'Film': return <Film className="w-5 h-5" />;
      case 'Layers': return <Layers className="w-5 h-5" />;
      default: return <Camera className="w-5 h-5" />;
    }
  };

  return (
    <section id="services" className="py-24 bg-[#FAF8F5] text-[#1E293B] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest bg-blue-100 text-[#1E3A8A] uppercase border border-blue-200">
            OUR FEATURED SERVICES
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900">
            Artistic Mastery & Cinematic Craft
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Tailored photography and filmmaking solutions for every chapter of life — from regal multi-day weddings to commercial brand campaigns.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#1E3A8A] text-white shadow-lg scale-105'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid (15 items) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col justify-between hover:-translate-y-1.5"
            >
              {/* Card Image */}
              <div className="relative h-56 overflow-hidden bg-slate-900">
                <img
                  src={service.coverImage}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                {/* Tag Badge */}
                {service.popularTag && (
                  <span className="absolute top-4 right-4 bg-[#D62828] text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-full shadow-md">
                    {service.popularTag}
                  </span>
                )}

                {/* Icon Badge */}
                <div className="absolute bottom-4 left-4 w-11 h-11 rounded-2xl bg-white/90 backdrop-blur-md text-[#1E3A8A] flex items-center justify-center shadow-lg group-hover:bg-[#1E3A8A] group-hover:text-white transition-colors duration-300">
                  {getIcon(service.iconName)}
                </div>

                {/* Price pill */}
                <div className="absolute bottom-4 right-4 bg-slate-900/90 text-amber-300 text-xs font-serif font-bold px-3 py-1 rounded-full border border-amber-500/30">
                  Starting {service.startingPrice}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif text-xl font-bold text-slate-900 group-hover:text-[#1E3A8A] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 text-xs leading-relaxed mt-2 line-clamp-3">
                    {service.shortDescription}
                  </p>

                  {/* Top Features bullets */}
                  <ul className="mt-4 space-y-1.5 text-xs text-slate-700">
                    {service.features.slice(0, 3).map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="line-clamp-1">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setActiveModalService(service)}
                    className="text-xs font-bold text-slate-700 hover:text-[#1E3A8A] underline cursor-pointer"
                  >
                    View Details
                  </button>

                  <button
                    onClick={() => onOpenBooking(service.title)}
                    className="bg-[#1E3A8A] hover:bg-[#D62828] text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors duration-300 flex items-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <span>Book Service</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Detail Modal */}
      {activeModalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 text-slate-900 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveModalService(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700"
            >
              ✕
            </button>

            <div className="relative h-64 rounded-2xl overflow-hidden bg-slate-900">
              <img
                src={activeModalService.coverImage}
                alt={activeModalService.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
              <div className="absolute bottom-4 left-6 text-white">
                <span className="text-amber-400 font-bold text-xs uppercase tracking-widest">
                  {activeModalService.category}
                </span>
                <h3 className="font-serif text-2xl font-bold">{activeModalService.title}</h3>
              </div>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed">
              {activeModalService.fullDescription}
            </p>

            <div className="space-y-3">
              <h4 className="font-serif text-lg font-bold text-slate-900">Service Deliverables & Features</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                {activeModalService.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-[#1E3A8A] shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <div>
                <span className="text-xs text-slate-500 block">Investment Starting From</span>
                <span className="font-serif text-2xl font-bold text-[#1E3A8A]">
                  {activeModalService.startingPrice}
                </span>
              </div>

              <button
                onClick={() => {
                  onOpenBooking(activeModalService.title);
                  setActiveModalService(null);
                }}
                className="bg-[#D62828] hover:bg-[#1E3A8A] text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xl transition-colors cursor-pointer"
              >
                Proceed to Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
