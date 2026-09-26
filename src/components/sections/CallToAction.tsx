import React from 'react';
import { Calendar, Phone, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

interface CallToActionProps {
  onOpenBooking: () => void;
}

export const CallToAction: React.FC<CallToActionProps> = ({ onOpenBooking }) => {
  return (
    <section className="py-24 bg-gradient-to-r from-[#0F172A] via-[#1E3A8A] to-[#0F172A] text-white relative overflow-hidden border-y border-slate-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 text-center space-y-8 relative z-10">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest bg-amber-500/20 text-amber-300 uppercase border border-amber-500/30">
          <Sparkles className="w-3.5 h-3.5 text-[#D62828]" />
          LIMITED DATES AVAILABLE FOR 2026 & 2027
        </span>

        <h2 className="font-serif text-3xl sm:text-6xl font-bold tracking-tight leading-tight">
          Ready to Capture Your Story?
        </h2>

        <p className="text-slate-300 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Let’s turn your once-in-a-lifetime celebration into heirloom art that lasts for generations. Contact our senior creative team today for custom package pricing.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={onOpenBooking}
            className="bg-[#D62828] hover:bg-amber-500 text-white font-bold text-sm sm:text-base px-9 py-4 rounded-full shadow-2xl transition-all duration-300 flex items-center gap-2 cursor-pointer"
          >
            <Calendar className="w-5 h-5 text-amber-200" />
            <span>Book Consultation Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href="https://wa.me/12015550199"
            target="_blank"
            rel="noreferrer"
            className="bg-white/10 hover:bg-white/20 text-white font-semibold text-sm sm:text-base px-8 py-4 rounded-full border border-white/20 transition-colors flex items-center gap-2"
          >
            <Phone className="w-5 h-5 text-emerald-400" />
            <span>WhatsApp USA Team</span>
          </a>
        </div>

        <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Complimentary Initial Consultation
          </span>
          <span>•</span>
          <span>No Obligation Date Reserve</span>
          <span>•</span>
          <span>Custom Multi-Day Packages</span>
        </div>
      </div>
    </section>
  );
};
