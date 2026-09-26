import React, { useState } from 'react';
import { SiteConfig, YouTubeVideo, PricingBundle } from '../types';
import { extractYouTubeId, getYouTubeThumbnail } from '../utils/youtube';
import {
  Sliders,
  X,
  RotateCcw,
  Download,
  Upload,
  Save,
  Palette,
  Film,
  Type,
  Layout,
  DollarSign,
  MapPin,
  Sparkles,
  Plus,
  Trash2,
  Edit2,
  Check,
  Play,
  Monitor,
  Tablet,
  Smartphone,
  ExternalLink,
  Info,
} from 'lucide-react';

interface WordPressCustomizerProps {
  config: SiteConfig;
  isOpen: boolean;
  onClose: () => void;
  onUpdateConfig: (newConfig: SiteConfig) => void;
  onResetConfig: () => void;
  activeTab?: string;
  previewDevice: 'desktop' | 'tablet' | 'mobile';
  onChangePreviewDevice: (device: 'desktop' | 'tablet' | 'mobile') => void;
}

export const WordPressCustomizer: React.FC<WordPressCustomizerProps> = ({
  config,
  isOpen,
  onClose,
  onUpdateConfig,
  onResetConfig,
  activeTab: initialTab = 'theme',
  previewDevice,
  onChangePreviewDevice,
}) => {
  const [currentTab, setCurrentTab] = useState<string>(initialTab);
  const [showSavedToast, setShowSavedToast] = useState(false);

  // New Video Form State
  const [newVideoUrl, setNewVideoUrl] = useState('');
  const [newVideoTitle, setNewVideoTitle] = useState('');
  const [newVideoCategory, setNewVideoCategory] = useState<YouTubeVideo['category']>('Weddings');
  const [newVideoPhotog, setNewVideoPhotog] = useState('Umiya Senior Creator');
  const [newVideoLocation, setNewVideoLocation] = useState('Central Park, NYC');
  const [newVideoDuration, setNewVideoDuration] = useState('2:30');
  const [newVideoDesc, setNewVideoDesc] = useState('');
  const [newVideoIsVertical, setNewVideoIsVertical] = useState(false);
  const [showAddVideoForm, setShowAddVideoForm] = useState(false);

  if (!isOpen) return null;

  const triggerSaveNotification = () => {
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 2000);
  };

  const handleUpdate = (updater: (prev: SiteConfig) => SiteConfig) => {
    const updated = updater(config);
    onUpdateConfig(updated);
    triggerSaveNotification();
  };

  const handleAddYouTubeVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVideoUrl) return;

    const ytId = extractYouTubeId(newVideoUrl);
    const newVideo: YouTubeVideo = {
      id: `vid-${Date.now()}`,
      title: newVideoTitle || 'Umiya Studio Cinematic Session',
      category: newVideoCategory,
      youtubeUrl: newVideoUrl,
      youtubeId: ytId,
      duration: newVideoDuration || '2:15',
      photographerName: newVideoPhotog || 'Marcus Vance',
      location: newVideoLocation || 'Scenic City Spot',
      thumbnail: getYouTubeThumbnail(ytId),
      description: newVideoDesc || 'Cinematic 4K highlight video reel captured during a 30-minute mini session.',
      isVertical: newVideoIsVertical,
      views: '1.2K views',
    };

    handleUpdate((prev) => ({
      ...prev,
      videos: [newVideo, ...prev.videos],
    }));

    // Reset form
    setNewVideoUrl('');
    setNewVideoTitle('');
    setNewVideoDesc('');
    setShowAddVideoForm(false);
  };

  const handleDeleteVideo = (videoId: string) => {
    handleUpdate((prev) => ({
      ...prev,
      videos: prev.videos.filter((v) => v.id !== videoId),
    }));
  };

  const handleExportJSON = () => {
    const jsonStr = JSON.stringify(config, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `umiya-studio-wp-theme-config-${Date.now()}.json`;
    link.click();
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.siteName && parsed.hero) {
          onUpdateConfig(parsed);
          triggerSaveNotification();
        } else {
          alert('Invalid configuration file structure.');
        }
      } catch (err) {
        alert('Failed to parse JSON file.');
      }
    };
    reader.readAsText(file);
  };

  const tabs = [
    { id: 'branding', label: 'Branding', icon: Layout },
    { id: 'theme', label: 'Theme & Colors', icon: Palette },
    { id: 'videos', label: 'YouTube Videos', icon: Film },
    { id: 'hero', label: 'Hero Section', icon: Type },
    { id: 'pricing', label: 'Pricing Plans', icon: DollarSign },
    { id: 'export', label: 'Export / Backup', icon: Download },
  ];

  return (
    <aside
      id="wordpress-live-customizer"
      className="fixed inset-y-0 right-0 z-50 w-full sm:w-[460px] bg-neutral-900 text-white shadow-2xl border-l border-neutral-800 flex flex-col animate-in slide-in-from-right duration-300 select-none"
    >
      {/* Top Header */}
      <div className="p-4 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-white leading-none">
              WordPress Live Customizer
            </h3>
            <p className="text-[10px] text-neutral-400 mt-0.5">
              Live Theme & Content Editor • Umiya Studio
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Responsive Preview Switcher */}
          <div className="flex items-center bg-neutral-800 rounded-lg p-0.5 border border-neutral-700">
            <button
              onClick={() => onChangePreviewDevice('desktop')}
              className={`p-1.5 rounded ${previewDevice === 'desktop' ? 'bg-neutral-700 text-white' : 'text-neutral-400 hover:text-white'}`}
              title="Desktop View"
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onChangePreviewDevice('tablet')}
              className={`p-1.5 rounded ${previewDevice === 'tablet' ? 'bg-neutral-700 text-white' : 'text-neutral-400 hover:text-white'}`}
              title="Tablet View"
            >
              <Tablet className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onChangePreviewDevice('mobile')}
              className={`p-1.5 rounded ${previewDevice === 'mobile' ? 'bg-neutral-700 text-white' : 'text-neutral-400 hover:text-white'}`}
              title="Mobile View"
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700 transition"
            aria-label="Close Customizer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tabs Navigation Bar */}
      <div className="flex items-center gap-1 overflow-x-auto px-3 py-2 bg-neutral-950/60 border-b border-neutral-800 scrollbar-none text-xs">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition-colors ${
                currentTab === tab.id
                  ? 'bg-amber-500 text-neutral-950 shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Save Notification Toast */}
      {showSavedToast && (
        <div className="bg-emerald-600 text-white text-xs font-bold px-4 py-1.5 flex items-center justify-between animate-in fade-in slide-in-from-top-1">
          <div className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5" />
            <span>Saved live to website state</span>
          </div>
          <span className="text-[10px] opacity-80">Synced</span>
        </div>
      )}

      {/* Scrollable Form Content */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6 text-xs text-left">
        
        {/* BRANDING TAB */}
        {currentTab === 'branding' && (
          <div className="space-y-4">
            <div>
              <label className="block font-bold text-neutral-300 uppercase mb-1">
                Site Name
              </label>
              <input
                type="text"
                value={config.siteName}
                onChange={(e) =>
                  handleUpdate((p) => ({ ...p, siteName: e.target.value }))
                }
                className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white font-semibold focus:ring-1 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-neutral-300 uppercase mb-1">
                Brand Tagline
              </label>
              <input
                type="text"
                value={config.tagline}
                onChange={(e) =>
                  handleUpdate((p) => ({ ...p, tagline: e.target.value }))
                }
                className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white font-semibold focus:ring-1 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-neutral-300 uppercase mb-1">
                Announcement Top Bar Text
              </label>
              <textarea
                rows={2}
                value={config.announcement.text}
                onChange={(e) =>
                  handleUpdate((p) => ({
                    ...p,
                    announcement: { ...p.announcement, text: e.target.value },
                  }))
                }
                className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white font-semibold focus:ring-1 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-neutral-300 uppercase mb-1">
                Custom Logo Image URL (Optional)
              </label>
              <input
                type="url"
                placeholder="https://... (leave blank to use official Umiya Studio vector logo)"
                value={config.customLogoUrl || ''}
                onChange={(e) =>
                  handleUpdate((p) => ({ ...p, customLogoUrl: e.target.value }))
                }
                className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white font-medium focus:ring-1 focus:ring-amber-500 focus:outline-none"
              />
              <p className="text-[10px] text-neutral-500 mt-1">
                By default, the crisp official vector logo matching your uploaded emblem is active.
              </p>
            </div>

            <div>
              <label className="block font-bold text-neutral-300 uppercase mb-1">
                Phone Contact
              </label>
              <input
                type="text"
                value={config.phoneContact}
                onChange={(e) =>
                  handleUpdate((p) => ({ ...p, phoneContact: e.target.value }))
                }
                className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white font-semibold"
              />
            </div>

            <div>
              <label className="block font-bold text-neutral-300 uppercase mb-1">
                Concierge Email
              </label>
              <input
                type="email"
                value={config.emailContact}
                onChange={(e) =>
                  handleUpdate((p) => ({ ...p, emailContact: e.target.value }))
                }
                className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white font-semibold"
              />
            </div>
          </div>
        )}

        {/* THEME & COLORS TAB */}
        {currentTab === 'theme' && (
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="block font-bold text-neutral-300 uppercase">
                Primary Brand Color (Buttons & Headers)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={config.theme.primaryColor}
                  onChange={(e) =>
                    handleUpdate((p) => ({
                      ...p,
                      theme: { ...p.theme, primaryColor: e.target.value },
                    }))
                  }
                  className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
                />
                <input
                  type="text"
                  value={config.theme.primaryColor}
                  onChange={(e) =>
                    handleUpdate((p) => ({
                      ...p,
                      theme: { ...p.theme, primaryColor: e.target.value },
                    }))
                  }
                  className="flex-1 px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white font-mono text-xs"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block font-bold text-neutral-300 uppercase">
                Accent Color (Badges & 4K Video Alerts)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={config.theme.accentColor}
                  onChange={(e) =>
                    handleUpdate((p) => ({
                      ...p,
                      theme: { ...p.theme, accentColor: e.target.value },
                    }))
                  }
                  className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
                />
                <input
                  type="text"
                  value={config.theme.accentColor}
                  onChange={(e) =>
                    handleUpdate((p) => ({
                      ...p,
                      theme: { ...p.theme, accentColor: e.target.value },
                    }))
                  }
                  className="flex-1 px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white font-mono text-xs"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block font-bold text-neutral-300 uppercase">
                Canvas Background Atmosphere
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { name: 'Natural Tone', val: '#FDFBF7' },
                  { name: 'Warm Cream', val: '#FAF9F6' },
                  { name: 'Pure Clean', val: '#FFFFFF' },
                ].map((bg) => (
                  <button
                    key={bg.val}
                    type="button"
                    onClick={() =>
                      handleUpdate((p) => ({
                        ...p,
                        theme: { ...p.theme, backgroundColor: bg.val },
                      }))
                    }
                    className={`p-2.5 rounded-lg border text-center transition ${
                      config.theme.backgroundColor === bg.val
                        ? 'border-amber-500 bg-neutral-800 text-amber-400 font-bold'
                        : 'border-neutral-700 bg-neutral-800/60 text-neutral-300'
                    }`}
                  >
                    <div
                      className="w-4 h-4 rounded-full mx-auto mb-1 border border-neutral-500"
                      style={{ backgroundColor: bg.val }}
                    />
                    <span>{bg.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block font-bold text-neutral-300 uppercase">
                Quick Color Palettes
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { name: 'Natural Tones (Olive + Moss)', primary: '#1E3A8A', accent: '#DC2626', bg: '#FDFBF7' },
                  { name: 'Umiya Classic (Navy + Crimson)', primary: '#1E3A8A', accent: '#DC2626', bg: '#FAF9F6' },
                  { name: 'Modern Editorial (Slate + Gold)', primary: '#0F172A', accent: '#D97706', bg: '#FAF9F6' },
                  { name: 'Pacific Coast (Teal + Coral)', primary: '#0D9488', accent: '#F97316', bg: '#FAF9F6' },
                ].map((palette) => (
                  <button
                    key={palette.name}
                    type="button"
                    onClick={() =>
                      handleUpdate((p) => ({
                        ...p,
                        theme: {
                          ...p.theme,
                          primaryColor: palette.primary,
                          accentColor: palette.accent,
                          backgroundColor: palette.bg || p.theme.backgroundColor,
                        },
                      }))
                    }
                    className="p-2.5 rounded-lg border border-neutral-700 bg-neutral-800 hover:border-amber-500 text-left transition"
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: palette.primary }} />
                      <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: palette.accent }} />
                    </div>
                    <span className="font-bold text-neutral-200">{palette.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* YOUTUBE VIDEOS TAB (CORE USER REQUEST) */}
        {currentTab === 'videos' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
              <div>
                <h4 className="font-bold text-white text-sm">
                  YouTube Video Showcase ({config.videos.length})
                </h4>
                <p className="text-[11px] text-neutral-400">
                  Add full YouTube URLs or video IDs with instant embed.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowAddVideoForm(!showAddVideoForm)}
                className="px-3 py-1.5 rounded-lg bg-red-600 text-white font-bold text-xs hover:bg-red-700 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{showAddVideoForm ? 'Cancel' : 'Add YouTube Video'}</span>
              </button>
            </div>

            {/* Add Video Form Drawer */}
            {showAddVideoForm && (
              <form
                onSubmit={handleAddYouTubeVideo}
                className="bg-neutral-950 p-4 rounded-xl border border-red-500/40 space-y-3"
              >
                <div className="text-xs font-extrabold text-red-400 uppercase tracking-wider">
                  New YouTube Video Embed
                </div>

                <div>
                  <label className="block font-bold text-neutral-300 mb-1">
                    YouTube URL or Video ID *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="https://www.youtube.com/watch?v=... or ID"
                    value={newVideoUrl}
                    onChange={(e) => setNewVideoUrl(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white text-xs font-mono focus:ring-1 focus:ring-red-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-neutral-300 mb-1">
                    Video Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Romantic Golden Hour Engagement Reel"
                    value={newVideoTitle}
                    onChange={(e) => setNewVideoTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white text-xs font-semibold focus:ring-1 focus:ring-red-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-neutral-300 mb-1">
                      Category
                    </label>
                    <select
                      value={newVideoCategory}
                      onChange={(e) =>
                        setNewVideoCategory(e.target.value as YouTubeVideo['category'])
                      }
                      className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white text-xs font-semibold"
                    >
                      <option value="Weddings">Weddings</option>
                      <option value="Family & Portraits">Family & Portraits</option>
                      <option value="Commercial & Events">Commercial & Events</option>
                      <option value="Cinematic Reels">Cinematic Reels</option>
                      <option value="Behind The Scenes">Behind The Scenes</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-300 mb-1">
                      Duration
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 2:45"
                      value={newVideoDuration}
                      onChange={(e) => setNewVideoDuration(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white text-xs font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-neutral-300 mb-1">
                      Creator / Photographer
                    </label>
                    <input
                      type="text"
                      placeholder="Marcus Vance"
                      value={newVideoPhotog}
                      onChange={(e) => setNewVideoPhotog(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white text-xs font-medium"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-neutral-300 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      placeholder="Central Park, NYC"
                      value={newVideoLocation}
                      onChange={(e) => setNewVideoLocation(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white text-xs font-medium"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="chk-vertical"
                    checked={newVideoIsVertical}
                    onChange={(e) => setNewVideoIsVertical(e.target.checked)}
                    className="w-4 h-4 accent-red-600"
                  />
                  <label htmlFor="chk-vertical" className="text-neutral-300 font-semibold cursor-pointer">
                    Vertical Video (TikTok / 9:16 Instagram Reel Format)
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-red-600 text-white font-bold text-xs hover:bg-red-700 shadow-md flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Video to Showcase</span>
                </button>
              </form>
            )}

            {/* List of existing videos */}
            <div className="space-y-3">
              {config.videos.map((vid, idx) => {
                const thumb = vid.thumbnail || getYouTubeThumbnail(vid.youtubeId || vid.youtubeUrl);
                return (
                  <div
                    key={vid.id}
                    className="p-3 bg-neutral-800/80 rounded-xl border border-neutral-700/80 flex items-start justify-between gap-3 group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative w-16 aspect-video rounded-lg overflow-hidden bg-neutral-900 shrink-0">
                        <img
                          src={thumb}
                          alt={vid.title}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <Play className="w-3 h-3 text-white fill-current" />
                        </div>
                      </div>
                      <div className="space-y-0.5">
                        <h5 className="font-bold text-white text-xs line-clamp-1">
                          {vid.title}
                        </h5>
                        <p className="text-[10px] text-neutral-400">
                          {vid.category} • {vid.duration} • By {vid.photographerName}
                        </p>
                        <p className="text-[10px] text-neutral-500 font-mono truncate max-w-[200px]">
                          ID: {vid.youtubeId || vid.youtubeUrl}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleDeleteVideo(vid.id)}
                        className="p-1.5 rounded hover:bg-red-950 hover:text-red-400 text-neutral-400 transition"
                        title="Delete video"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* HERO SECTION TAB */}
        {currentTab === 'hero' && (
          <div className="space-y-4">
            <div>
              <label className="block font-bold text-neutral-300 uppercase mb-1">
                Hero Headline
              </label>
              <textarea
                rows={2}
                value={config.hero.headline}
                onChange={(e) =>
                  handleUpdate((p) => ({
                    ...p,
                    hero: { ...p.hero, headline: e.target.value },
                  }))
                }
                className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white font-semibold focus:ring-1 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-neutral-300 uppercase mb-1">
                Hero Subheadline
              </label>
              <textarea
                rows={3}
                value={config.hero.subheadline}
                onChange={(e) =>
                  handleUpdate((p) => ({
                    ...p,
                    hero: { ...p.hero, subheadline: e.target.value },
                  }))
                }
                className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white font-medium focus:ring-1 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-neutral-300 uppercase mb-1">
                  Rating Score
                </label>
                <input
                  type="text"
                  value={config.hero.ratingScore}
                  onChange={(e) =>
                    handleUpdate((p) => ({
                      ...p,
                      hero: { ...p.hero, ratingScore: e.target.value },
                    }))
                  }
                  className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white font-semibold"
                />
              </div>
              <div>
                <label className="block font-bold text-neutral-300 uppercase mb-1">
                  Reviews Count
                </label>
                <input
                  type="text"
                  value={config.hero.ratingReviewsCount}
                  onChange={(e) =>
                    handleUpdate((p) => ({
                      ...p,
                      hero: { ...p.hero, ratingReviewsCount: e.target.value },
                    }))
                  }
                  className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white font-semibold"
                />
              </div>
            </div>
          </div>
        )}

        {/* PRICING TAB */}
        {currentTab === 'pricing' && (
          <div className="space-y-4">
            <p className="text-[11px] text-neutral-400">
              Customize package pricing numbers and bundle discounts live.
            </p>
            {config.pricing.map((tier, idx) => (
              <div key={tier.id} className="p-3 bg-neutral-800 rounded-xl border border-neutral-700 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">{tier.name}</span>
                  <div className="flex items-center gap-1">
                    <span className="text-neutral-400">$</span>
                    <input
                      type="number"
                      value={tier.price}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        handleUpdate((p) => {
                          const next = [...p.pricing];
                          next[idx] = { ...next[idx], price: val };
                          return { ...p, pricing: next };
                        });
                      }}
                      className="w-16 px-2 py-1 rounded bg-neutral-900 border border-neutral-600 text-white font-bold text-xs"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* EXPORT & BACKUP TAB */}
        {currentTab === 'export' && (
          <div className="space-y-4">
            <div className="p-4 bg-neutral-800 rounded-xl border border-neutral-700 space-y-3">
              <h5 className="font-bold text-white">Export WordPress Site Config</h5>
              <p className="text-[11px] text-neutral-400">
                Download your custom colors, content, and YouTube video embeds as a clean JSON backup file.
              </p>
              <button
                type="button"
                onClick={handleExportJSON}
                className="w-full py-2.5 rounded-lg bg-amber-500 text-neutral-950 font-bold text-xs hover:bg-amber-400 flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Configuration JSON</span>
              </button>
            </div>

            <div className="p-4 bg-neutral-800 rounded-xl border border-neutral-700 space-y-3">
              <h5 className="font-bold text-white">Import Configuration</h5>
              <p className="text-[11px] text-neutral-400">
                Upload previously saved configuration JSON to restore settings.
              </p>
              <label className="w-full py-2.5 rounded-lg bg-neutral-700 hover:bg-neutral-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer">
                <Upload className="w-3.5 h-3.5" />
                <span>Choose JSON File</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportJSON}
                  className="hidden"
                />
              </label>
            </div>

            <div className="p-4 bg-red-950/30 rounded-xl border border-red-900/50 space-y-3">
              <h5 className="font-bold text-red-300">Reset to Default Template</h5>
              <p className="text-[11px] text-neutral-400">
                Revert all styling, content, and videos back to original Umiya Studio defaults.
              </p>
              <button
                type="button"
                onClick={onResetConfig}
                className="w-full py-2 rounded-lg bg-red-600/80 hover:bg-red-600 text-white font-bold text-xs flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Defaults</span>
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Footer Status Bar */}
      <div className="p-3 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-400">
        <span>Auto-persisted to browser storage</span>
        <button
          onClick={onClose}
          className="px-3 py-1 bg-neutral-800 hover:bg-neutral-700 text-white rounded font-bold"
        >
          Close Customizer
        </button>
      </div>
    </aside>
  );
};
