import React from 'react';
import { TIMELINE_EVENTS, STUDIO_STATS, TEAM_MEMBERS } from '../../data/mockData';
import { Award, Globe, Sparkles, MapPin, CheckCircle, ShieldCheck } from 'lucide-react';

export const AboutStudio: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-[#F3EFE9] text-[#1E293B] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-20">
        {/* Studio Story Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Visual Image Stack */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white group">
              <img
                src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85"
                alt="UMIYA Studio USA Founder"
                className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 text-white p-4 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-white/20">
                <span className="text-amber-400 text-xs font-bold uppercase tracking-widest block">
                  FOUNDER & CREATIVE DIRECTOR
                </span>
                <h4 className="font-serif text-xl font-bold">Jayesh Patel</h4>
                <p className="text-xs text-slate-300">
                  Master Storyteller • 12+ Years Documenting Royal Indian & Fusion Weddings across USA & India
                </p>
              </div>
            </div>

            {/* Floating Award Badge */}
            <div className="absolute -bottom-6 -right-6 bg-white p-5 rounded-3xl shadow-xl border border-slate-200 hidden sm:flex items-center gap-4 max-w-xs">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <div className="font-serif font-bold text-slate-900 text-sm">Top 10 Indian Photographer in USA</div>
                <div className="text-[10px] text-slate-500">Recognized by Maharani Weddings & South Asian Bride Magazine</div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-6 space-y-6">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest bg-[#1E3A8A] text-white uppercase shadow-sm">
              ABOUT UMIYA STUDIO USA
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900 leading-tight">
              Where Sacred Rituals Meet Hollywood Cinema Art
            </h2>

            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              Founded on the pillars of authenticity, emotional depth, and technical excellence, <strong className="text-[#1E3A8A]">UMIYA STUDIO USA</strong> has spent over a decade documenting the most opulent celebrations in North America and India.
            </p>

            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              We bridge traditional South Asian heritage with high-fashion editorial lighting, RED 6K cinema sensors, and FAA Part 107 aerial cinematography. Whether it's a 4-day palace affair in Udaipur or a coastal Napa Valley sunset ceremony, our dual USA & India team ensures seamless execution.
            </p>

            {/* Core Pillars */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
                <Globe className="w-5 h-5 text-[#1E3A8A] mb-2" />
                <h4 className="font-bold text-slate-900 text-sm">USA + India Presence</h4>
                <p className="text-xs text-slate-500 mt-1">Full-service teams based in NJ, CA, & Gujarat.</p>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
                <ShieldCheck className="w-5 h-5 text-[#D62828] mb-2" />
                <h4 className="font-bold text-slate-900 text-sm">4K Cinema & Aerial</h4>
                <p className="text-xs text-slate-500 mt-1">Licensed drone pilots & cinema cameras.</p>
              </div>
            </div>
          </div>
        </div>

        {/* USA & India Journey Timeline */}
        <div className="pt-12 border-t border-slate-300">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D62828]">STUDIO CHRONICLES</span>
            <h3 className="font-serif text-3xl font-bold text-slate-900 mt-1">Our Journey Across Continents</h3>
          </div>

          <div className="relative border-l-2 border-[#1E3A8A]/30 ml-4 sm:ml-32 space-y-8">
            {TIMELINE_EVENTS.map((evt, idx) => (
              <div key={idx} className="relative pl-6 sm:pl-10 group">
                {/* Year Marker Box */}
                <div className="absolute -left-3 sm:-left-[125px] top-0 w-24 sm:w-28 text-left sm:text-right font-serif font-bold text-lg sm:text-xl text-[#1E3A8A]">
                  <span className="bg-[#1E3A8A] text-white px-2.5 py-1 rounded-lg text-xs font-sans font-bold shadow-md inline-block">
                    {evt.year}
                  </span>
                </div>

                {/* Timeline Dot */}
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-[#1E3A8A] group-hover:scale-125 transition-transform" />

                {/* Timeline Content Card */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 hover:shadow-md transition-shadow">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h4 className="font-serif text-lg font-bold text-slate-900">{evt.title}</h4>
                    {evt.badge && (
                      <span className="text-[10px] font-bold uppercase bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full">
                        {evt.badge}
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-semibold text-[#D62828] mb-2">{evt.subtitle} • {evt.location}</div>
                  <p className="text-xs text-slate-600 leading-relaxed">{evt.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
