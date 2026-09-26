import React, { useState } from 'react';
import { FaqItem } from '../types';
import { ChevronDown, HelpCircle, Search } from 'lucide-react';

interface FaqSectionProps {
  faqs: FaqItem[];
}

export const FaqSection: React.FC<FaqSectionProps> = ({ faqs }) => {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = [
    'All',
    'Booking & Costs',
    'The Photoshoot',
    'Photos & Video Delivery',
    'Rescheduling & Policy',
  ];

  const filteredFaqs = faqs.filter((item) => {
    const matchesCategory =
      activeCategory === 'All' || item.category === activeCategory;
    const matchesQuery =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faqs" className="py-20 bg-white border-b border-[#E6E2D3]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFF6FF] text-[#1E3A8A] border border-[#93C5FD] text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-[#DC2626]" />
            Got Questions? We’ve Got Answers
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2D3021] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-[#5C594D] font-normal">
            Everything you need to know about booking, posing, 4K video reels, and photo delivery.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="space-y-4 mb-8">
          <div className="relative">
            <Search className="w-4 h-4 text-[#7D796C] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search questions (e.g. video, cost, pets, rain)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E6E2D3] text-sm font-medium focus:ring-2 focus:ring-[#1E3A8A] focus:outline-none bg-[#FAF8F2] text-[#2D3021]"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition ${
                  activeCategory === cat
                    ? 'bg-[#2D3021] text-white shadow-2xs'
                    : 'bg-[#F2F0E6] text-[#5C594D] hover:bg-[#E6E2D3]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="border border-[#E6E2D3] rounded-2xl overflow-hidden bg-[#FAF8F2] transition-colors"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-bold text-[#2D3021] text-sm sm:text-base hover:bg-[#F2F0E6] transition"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#7D796C] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#1E3A8A]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#5C594D] leading-relaxed border-t border-[#E6E2D3] bg-white">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div className="text-center py-10 text-[#7D796C] text-sm">
              No questions found matching your search. Try searching for "cost", "free", or "video".
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
