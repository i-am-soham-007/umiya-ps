/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { SiteConfig, YouTubeVideo } from './types';
import { initialSiteConfig } from './data/defaultConfig';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { HowItWorks } from './components/HowItWorks';
import { VideoShowcase } from './components/VideoShowcase';
import { ImageShowcase } from './components/ImageShowcase';
import { PricingSection } from './components/PricingSection';
import { PhotographersSection } from './components/PhotographersSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { VideoModal } from './components/VideoModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { StoryDetailsPage } from './components/StoryDetailsPage';
import { InquiryPage } from './components/InquiryPage';
import { Sliders, Sparkles } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

const STORAGE_KEY = 'umiya_studio_wp_config_v5';

export default function App() {
  // Load initial config from localStorage if present
  const [config, setConfig] = useState<SiteConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure latest portfolio and video items are included
        if (!parsed.portfolio || parsed.portfolio.length < initialSiteConfig.portfolio.length) {
          parsed.portfolio = initialSiteConfig.portfolio;
        }
        if (!parsed.videos || parsed.videos.length < initialSiteConfig.videos.length) {
          parsed.videos = initialSiteConfig.videos;
        }
        return parsed;
      }
    } catch (e) {
      console.error('Failed to load saved config:', e);
    }
    return initialSiteConfig;
  });

  const [selectedCity, setSelectedCity] = useState<string>('nyc');
  const [selectedStoryId, setSelectedStoryId] = useState<string | null>(null);
  const [isInquiryView, setIsInquiryView] = useState<boolean>(false);
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [bookingInitialData, setBookingInitialData] = useState<{
    city?: string;
    category?: string;
    spot?: string;
    photographerId?: string;
    photographerName?: string;
    storyTitle?: string;
  }>({});

  const [videoModalUrl, setVideoModalUrl] = useState<string | null>(null);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState<boolean>(false);
  const [customizerActiveTab, setCustomizerActiveTab] = useState<string>('theme');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isAnnouncementVisible, setIsAnnouncementVisible] = useState<boolean>(true);

  // Persist to localStorage whenever config changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch (e) {
      console.error('Failed to save config:', e);
    }
  }, [config]);

  const handleUpdateConfig = (newConfig: SiteConfig) => {
    setConfig(newConfig);
  };

  const handleResetConfig = () => {
    if (window.confirm('Reset all custom settings back to official Umiya Studio template?')) {
      setConfig(initialSiteConfig);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const handleOpenBooking = (initialData?: {
    city?: string;
    category?: string;
    spot?: string;
    photographerId?: string;
    photographerName?: string;
    storyTitle?: string;
  }) => {
    setBookingInitialData(initialData || { city: selectedCity });
    setIsBookingOpen(true);
  };

  const handleNavigateToInquiryPage = (initialData?: {
    city?: string;
    category?: string;
    spot?: string;
    photographerId?: string;
    photographerName?: string;
    storyTitle?: string;
  }) => {
    setBookingInitialData(initialData || { city: selectedCity });
    setSelectedStoryId(null);
    setIsInquiryView(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenStoryDetails = (storyId: string) => {
    setSelectedStoryId(storyId);
    setIsInquiryView(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenVideoModal = (videoIdOrUrl: string) => {
    setVideoModalUrl(videoIdOrUrl);
  };

  const handleOpenCustomizerWithTab = (tab: string) => {
    setCustomizerActiveTab(tab);
    setIsCustomizerOpen(true);
  };

  // Find active video for modal data
  const currentVideoData = config.videos.find(
    (v) =>
      v.youtubeId === videoModalUrl ||
      v.youtubeUrl === videoModalUrl ||
      videoModalUrl?.includes(v.youtubeId)
  );

  // Device preview frame dimensions
  const getDeviceFrameClass = () => {
    if (previewDevice === 'mobile') {
      return 'max-w-[400px] mx-auto my-6 rounded-[40px] border-[12px] border-neutral-900 shadow-2xl overflow-hidden min-h-screen';
    }
    if (previewDevice === 'tablet') {
      return 'max-w-[820px] mx-auto my-6 rounded-[28px] border-[10px] border-neutral-900 shadow-2xl overflow-hidden min-h-screen';
    }
    return 'w-full min-h-screen';
  };

  return (
    <div
      className="min-h-screen text-[#3D3B36] flex flex-col selection:bg-[#1E3A8A] selection:text-white transition-all"
      style={{
        backgroundColor: config.theme.backgroundColor || '#FDFBF7',
        fontFamily: config.theme.fontFamily || 'Plus Jakarta Sans, sans-serif',
      }}
    >
      {/* Device Preview Outer Container wrapper */}
      <div className={getDeviceFrameClass()}>
        
        {/* Top Announcement Bar */}
        {config.announcement?.enabled && isAnnouncementVisible && (
          <AnnouncementBar
            text={config.announcement.text}
            linkText={config.announcement.linkText}
            accentColor={config.theme.accentColor}
            onLinkClick={() => handleNavigateToInquiryPage()}
            onClose={() => setIsAnnouncementVisible(false)}
          />
        )}

        {/* Primary Navbar */}
        <Navbar
          config={config}
          selectedCity={selectedCity}
          onSelectCity={setSelectedCity}
          onOpenBooking={handleNavigateToInquiryPage}
          onToggleCustomizer={() => setIsCustomizerOpen(!isCustomizerOpen)}
          isCustomizerOpen={isCustomizerOpen}
        />

        {/* View Switcher: Story Details View, Full Inquiry Page, or Main Home Layout */}
        <AnimatePresence mode="wait">
          {selectedStoryId ? (
            <motion.div
              key={`story-${selectedStoryId}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <StoryDetailsPage
                storyId={selectedStoryId}
                config={config}
                onBack={() => {
                  setSelectedStoryId(null);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onOpenInquiry={(data) => handleNavigateToInquiryPage(data)}
                onSelectOtherStory={(otherId) => {
                  setSelectedStoryId(otherId);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </motion.div>
          ) : isInquiryView ? (
            <motion.div
              key="inquiry-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <InquiryPage
                config={config}
                initialData={bookingInitialData}
                onBack={() => {
                  setIsInquiryView(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onNavigateHome={() => {
                  setIsInquiryView(false);
                  setSelectedStoryId(null);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </motion.div>
          ) : (
            <motion.main
              key="home-main"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex-1"
            >
              {/* How It Works (Shoott 3-Step Model) */}
              <HowItWorks
                primaryColor={config.theme.primaryColor}
                onOpenBooking={handleNavigateToInquiryPage}
              />

              {/* YouTube Video Showcase & 4K Cinema Reels */}
              <VideoShowcase
                videos={config.videos}
                onOpenVideoModal={handleOpenVideoModal}
                onOpenBooking={handleNavigateToInquiryPage}
                onOpenCustomizerWithTab={handleOpenCustomizerWithTab}
                primaryColor={config.theme.primaryColor}
                accentColor={config.theme.accentColor}
              />

              {/* Category-Wise Image & Photography Gallery Showcase with 3-Image Carousel & Story Links */}
              <ImageShowcase
                portfolio={config.portfolio}
                onOpenBooking={handleOpenBooking}
                onViewStory={handleOpenStoryDetails}
                primaryColor={config.theme.primaryColor}
                accentColor={config.theme.accentColor}
              />

              {/* Pricing & Interactive Bundle Calculator */}
              <PricingSection
                pricing={config.pricing}
                onOpenBooking={handleNavigateToInquiryPage}
                primaryColor={config.theme.primaryColor}
                accentColor={config.theme.accentColor}
              />

              {/* Photographers Roster */}
              <PhotographersSection
                photographers={config.photographers}
                onOpenBooking={handleNavigateToInquiryPage}
                primaryColor={config.theme.primaryColor}
              />

              {/* Testimonials & Reviews */}
              <TestimonialsSection testimonials={config.testimonials} />

              {/* Frequently Asked Questions */}
              <FaqSection faqs={config.faqs} />
            </motion.main>
          )}
        </AnimatePresence>

        {/* Footer */}
        <Footer
          config={config}
          onSelectCity={setSelectedCity}
          onOpenBooking={handleNavigateToInquiryPage}
          onToggleCustomizer={() => setIsCustomizerOpen(true)}
        />
      </div>


      {/* 4-Step Photoshoot Booking Wizard Modal (Quick popup) */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        config={config}
        initialData={bookingInitialData}
      />

      {/* Fullscreen YouTube Video Player Modal */}
      <VideoModal
        videoIdOrUrl={videoModalUrl}
        videoData={currentVideoData}
        onClose={() => setVideoModalUrl(null)}
        onOpenBooking={handleNavigateToInquiryPage}
        primaryColor={config.theme.primaryColor}
      />

      {/* Admin Dashboard Modal */}
      <AdminDashboard
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
      />
    </div>
  );
}
