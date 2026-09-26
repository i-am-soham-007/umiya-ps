import React, { useState } from 'react';
import { PhotoSpot, CityData, SiteConfig } from '../types';
import {
  MapPin,
  Calendar,
  Clock,
  Car,
  Sparkles,
  ArrowRight,
  ChevronRight,
} from 'lucide-react';

interface LocationsSectionProps {
  config: SiteConfig;
  selectedCity: string;
  onSelectCity: (cityId: string) => void;
  onOpenBooking: (initialData?: { city?: string; spot?: string }) => void;
  primaryColor?: string;
}

export const LocationsSection: React.FC<LocationsSectionProps> = ({
  config,
  selectedCity,
  onSelectCity,
  onOpenBooking,
  primaryColor = '#1E3A8A',
}) => {
  const currentCity = config.cities.find((c) => c.id === selectedCity) || config.cities[0];
  
  // Filter spots belonging to the selected city, or show all if city has few
  const citySpots = config.spots.filter((s) => s.cityId === selectedCity);
  const displaySpots = citySpots.length > 0 ? citySpots : config.spots;

  return (
    <section id="locations" className="py-20 bg-[#FDFBF7] border-b border-[#E6E2D3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFF6FF] text-[#1E3A8A] border border-[#93C5FD] text-xs font-bold uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5 text-[#1E3A8A]" />
              Nationwide Scenic Hotspots
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2D3021] tracking-tight">
              Curated Photo Spots in {currentCity.name}
            </h2>
            <p className="text-sm sm:text-base text-[#5C594D] max-w-2xl font-normal">
              We hand-scout iconic parks, historic bridges, waterfront promenades, and urban murals with optimal natural lighting and easy accessibility.
            </p>
          </div>

          <div className="text-xs font-bold text-[#7D796C] flex items-center gap-2">
            <span>Showing locations for:</span>
            <span className="px-2.5 py-1 rounded-lg bg-white border border-[#E6E2D3] text-[#2D3021] font-extrabold">
              {currentCity.name}, {currentCity.state}
            </span>
          </div>
        </div>

        {/* City Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {config.cities.map((city) => (
            <button
              key={city.id}
              onClick={() => onSelectCity(city.id)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                selectedCity === city.id
                  ? 'bg-[#2D3021] text-[#FDFBF7] shadow-sm'
                  : 'bg-white text-[#5C594D] hover:bg-[#F2F0E6] border border-[#E6E2D3]'
              }`}
            >
              <span>{city.name}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  selectedCity === city.id
                    ? 'bg-white/20 text-white'
                    : 'bg-[#F2F0E6] text-[#7D796C]'
                }`}
              >
                {city.spotCount}
              </span>
            </button>
          ))}
        </div>

        {/* Spots Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displaySpots.map((spot) => (
            <div
              key={spot.id}
              className="bg-white rounded-2xl overflow-hidden border border-[#E6E2D3] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Spot Cover Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#F2F0E6]">
                  <img
                    src={spot.coverImage}
                    alt={spot.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* Vibe Badge */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md text-[#2D3021] text-[11px] font-bold shadow-xs">
                    {spot.vibe}
                  </div>

                  {/* City Badge */}
                  <div className="absolute bottom-3 left-3 text-white">
                    <p className="text-xs font-semibold text-white/90">
                      {spot.cityName}, {spot.state}
                    </p>
                  </div>
                </div>

                {/* Spot Details */}
                <div className="p-5 space-y-4">
                  <h3 className="text-lg font-bold text-[#2D3021] leading-snug group-hover:text-[#1E3A8A] transition-colors">
                    {spot.name}
                  </h3>
                  <p className="text-xs text-[#5C594D] leading-relaxed font-normal">
                    {spot.description}
                  </p>

                  <div className="space-y-2 text-xs text-[#5C594D] pt-2 border-t border-[#E6E2D3]">
                    <div className="flex items-start gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#C49A45] shrink-0 mt-0.5" />
                      <span><strong>Best Light:</strong> {spot.bestTime}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Car className="w-3.5 h-3.5 text-[#7D796C] shrink-0 mt-0.5" />
                      <span><strong>Parking:</strong> {spot.parkingInfo}</span>
                    </div>
                  </div>

                  {/* Next Available Dates Chips */}
                  <div className="pt-2">
                    <div className="text-[11px] font-bold text-[#7D796C] uppercase mb-1.5 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#1E3A8A]" /> Next Upcoming Dates:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {spot.nextAvailableDates.map((dateStr, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-[#F2F0E6] text-[#3D3B36] text-[11px] font-semibold border border-[#E6E2D3]"
                        >
                          {dateStr}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking CTA Footer */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => onOpenBooking({ city: spot.cityId, spot: spot.name })}
                  className="w-full py-2.5 px-4 rounded-xl text-white font-bold text-xs sm:text-sm shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 hover:opacity-95"
                  style={{ backgroundColor: primaryColor }}
                >
                  <span>Book at {spot.name.split('-')[0].trim()}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
