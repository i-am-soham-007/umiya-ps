import React, { useState } from 'react';
import { PricingBundle } from '../types';
import {
  Check,
  Sparkles,
  Zap,
  ShieldCheck,
  Video,
  Gift,
  ArrowRight,
  Calculator,
} from 'lucide-react';

interface PricingSectionProps {
  pricing: PricingBundle[];
  onOpenBooking: () => void;
  primaryColor?: string;
  accentColor?: string;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  pricing,
  onOpenBooking,
  primaryColor = '#1E3A8A',
  accentColor = '#DC2626',
}) => {
  const [photoSliderCount, setPhotoSliderCount] = useState<number>(20);

  // Calculate dynamic bundle price
  const calculateDynamicPrice = (count: number) => {
    if (count <= 1) return { price: 15, perPhoto: 15, savings: 0, perk: 'Zero commitment' };
    if (count < 10) return { price: count * 15, perPhoto: 15, savings: 0, perk: 'Pay-as-you-go' };
    if (count < 20) {
      const p = 120 + (count - 10) * 12;
      return { price: p, perPhoto: (p / count).toFixed(1), savings: count * 15 - p, perk: 'Save 20%' };
    }
    if (count < 35) {
      const p = 195 + (count - 20) * 8;
      return { price: p, perPhoto: (p / count).toFixed(1), savings: count * 15 - p, perk: 'Save 35% + Priority Delivery' };
    }
    return {
      price: 245,
      perPhoto: (245 / 45).toFixed(1),
      savings: 45 * 15 - 245,
      perk: 'ALL Photos (40+) + Free 4K Video Reel ($120 value)',
    };
  };

  const dynamicData = calculateDynamicPrice(photoSliderCount);

  return (
    <section id="pricing" className="py-20 bg-[#FDFBF7] border-b border-[#E6E2D3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFF6FF] text-[#1E3A8A] border border-[#93C5FD] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#DC2626]" />
            Zero Hidden Fees & Transparent Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2D3021] tracking-tight">
            Flexible Pricing, Pay Only For Photos You Love
          </h2>
          <p className="text-sm sm:text-base text-[#5C594D] leading-relaxed font-normal">
            No expensive sitting fees. Reserve your 30-minute shoot and review your private gallery first, then pick individual photos or bundle and save.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 items-stretch">
          {pricing.map((plan) => {
            const isPopular = plan.popular;
            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ${
                  isPopular
                    ? 'bg-[#2D3021] text-[#FDFBF7] shadow-2xl ring-2 ring-[#DC2626] lg:-translate-y-2'
                    : 'bg-white text-[#3D3B36] border border-[#E6E2D3] shadow-2xs hover:shadow-lg'
                }`}
              >
                {/* Badge */}
                {plan.badge && (
                  <div
                    className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[11px] font-extrabold tracking-wider uppercase shadow-xs ${
                      isPopular
                        ? 'bg-[#DC2626] text-white'
                        : 'bg-[#EFF6FF] text-[#1E3A8A] border border-[#93C5FD]'
                    }`}
                  >
                    {plan.badge}
                  </div>
                )}

                <div>
                  <div className="mb-4">
                    <h3 className="text-lg font-bold mb-1">{plan.name}</h3>
                    <p
                      className={`text-xs ${
                        isPopular ? 'text-[#D4CEB8]' : 'text-[#7D796C]'
                      }`}
                    >
                      {plan.photoCount === 'all'
                        ? 'All 40+ high-res images'
                        : `${plan.photoCount} digital photo${plan.photoCount > 1 ? 's' : ''}`}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-4xl font-extrabold tracking-tight">
                      ${plan.price}
                    </span>
                    {plan.originalPrice && (
                      <span
                        className={`text-sm line-through ${
                          isPopular ? 'text-[#8C887B]' : 'text-[#8C887B]'
                        }`}
                      >
                        ${plan.originalPrice}
                      </span>
                    )}
                    <span
                      className={`text-xs font-semibold ${
                        isPopular ? 'text-[#D4CEB8]' : 'text-[#7D796C]'
                      }`}
                    >
                      {plan.photoCount === 1 ? '/ photo' : 'total'}
                    </span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8 text-xs">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Check
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            isPopular ? 'text-[#DC2626]' : 'text-[#1E3A8A]'
                          }`}
                        />
                        <span
                          className={
                            isPopular ? 'text-[#EAE6D8]' : 'text-[#5C594D]'
                          }
                        >
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Button */}
                <button
                  onClick={onOpenBooking}
                  className={`w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-xs ${
                    isPopular
                      ? 'bg-[#DC2626] text-white hover:bg-[#78874E] shadow-md'
                      : 'bg-[#2D3021] text-white hover:bg-[#3D422E]'
                  }`}
                >
                  Book Session
                </button>
              </div>
            );
          })}
        </div>

        {/* Interactive Bundle Savings Calculator */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E6E2D3] shadow-sm max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] text-[#1E3A8A] flex items-center justify-center font-bold">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-[#2D3021]">
                Interactive Photo Bundle Calculator
              </h3>
              <p className="text-xs text-[#7D796C]">
                Drag the slider to see exact package pricing & estimated savings for your gallery.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Slider */}
            <div>
              <div className="flex items-center justify-between text-sm font-bold text-[#2D3021] mb-2">
                <span>Selected Photo Quantity:</span>
                <span className="text-lg text-[#1E3A8A] font-extrabold px-3 py-0.5 bg-[#EFF6FF] rounded-lg border border-[#93C5FD]">
                  {photoSliderCount >= 40 ? 'All 40+ Photos' : `${photoSliderCount} Photos`}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="40"
                value={photoSliderCount}
                onChange={(e) => setPhotoSliderCount(Number(e.target.value))}
                className="w-full h-3 bg-[#E6E2D3] rounded-lg appearance-none cursor-pointer accent-[#1E3A8A]"
              />
              <div className="flex justify-between text-[11px] text-[#7D796C] font-bold mt-1">
                <span>1 photo ($15)</span>
                <span>10 photos ($120)</span>
                <span>20 photos ($195)</span>
                <span>All 40+ ($245 + Video Reel)</span>
              </div>
            </div>

            {/* Calculated Results Bar */}
            <div className="bg-[#FAF8F2] rounded-2xl p-5 border border-[#E6E2D3] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-xs text-[#7D796C] font-medium">Estimated Package Total:</div>
                <div className="text-3xl font-extrabold text-[#2D3021]">
                  ${dynamicData.price}{' '}
                  <span className="text-xs font-normal text-[#7D796C]">
                    (~${dynamicData.perPhoto} per photo)
                  </span>
                </div>
                <div className="text-xs font-bold text-[#1E3A8A] mt-0.5">
                  {dynamicData.perk}
                </div>
              </div>

              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-6 py-3 rounded-xl text-white font-bold text-sm shadow-md hover:shadow-lg transition-all hover:opacity-95"
                style={{ backgroundColor: primaryColor }}
              >
                Reserve 30-Min Shoot
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
