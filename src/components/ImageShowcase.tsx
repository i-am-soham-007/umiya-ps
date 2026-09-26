import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PortfolioItem } from '../types';
import {
  Camera,
  Sparkles,
  MapPin,
  Maximize2,
  Heart,
  Share2,
  CheckCircle,
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Layers,
  ArrowRight,
  SlidersHorizontal,
  Grid3X3,
  LayoutGrid,
  Search,
  RotateCcw,
} from 'lucide-react';

interface ImageShowcaseProps {
  portfolio: PortfolioItem[];
  onOpenBooking: (initialData?: { category?: string; photographer?: string }) => void;
  onViewStory?: (storyId: string) => void;
  primaryColor?: string;
  accentColor?: string;
}

// Single Card with inner 3-Image Carousel and Motion animation
const PortfolioCard: React.FC<{
  photo: PortfolioItem;
  primaryColor: string;
  onOpenModal: (photo: PortfolioItem, imageIndex: number) => void;
  onOpenBooking: (initialData?: { category?: string; photographer?: string }) => void;
  onViewStory?: (storyId: string) => void;
  isLiked: boolean;
  onToggleLike: (id: string, e: React.MouseEvent) => void;
  isCopied: boolean;
  onShare: (photo: PortfolioItem, e: React.MouseEvent) => void;
}> = ({
  photo,
  primaryColor,
  onOpenModal,
  onOpenBooking,
  onViewStory,
  isLiked,
  onToggleLike,
  isCopied,
  onShare,
}) => {
  // Ensure maximum 3 images per card/div
  const images = photo.images && photo.images.length > 0
    ? photo.images.slice(0, 3)
    : [photo.imageUrl];

  const [activeImgIndex, setActiveImgIndex] = useState<number>(0);
  const [slideDirection, setSlideDirection] = useState<number>(1);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSlideDirection(1);
    setActiveImgIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSlideDirection(-1);
    setActiveImgIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleDotClick = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSlideDirection(idx > activeImgIndex ? 1 : -1);
    setActiveImgIndex(idx);
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        if (onViewStory) {
          onViewStory(photo.id);
        } else {
          onOpenModal(photo, activeImgIndex);
        }
      }}
      className="bg-white rounded-2xl overflow-hidden border border-[#E5E0D0] hover:border-[#DC2626] hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col justify-between"
    >
      <div>
        {/* Carousel Image Container (Max 3 Images per Card) */}
        <div className="relative aspect-[4/3] overflow-hidden bg-[#F2F0E6] select-none">
          <AnimatePresence mode="wait" initial={false}>
            <motion.img
              key={`${photo.id}-img-${activeImgIndex}`}
              src={images[activeImgIndex]}
              alt={`${photo.title} photo ${activeImgIndex + 1}`}
              initial={{ opacity: 0, x: slideDirection * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -slideDirection * 40 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          </AnimatePresence>

          {/* Vignette Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/25 pointer-events-none" />

          {/* Category Pill */}
          <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider border border-white/20">
            {photo.category}
          </div>

          {/* Image Count & Like Badges Top Right */}
          <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 z-10">
            {/* 3-Image Badge */}
            <div className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[#D4E2BA] text-[10px] font-semibold border border-white/20">
              {activeImgIndex + 1}/{images.length}
            </div>

            {/* Like Button */}
            <button
              onClick={(e) => onToggleLike(photo.id, e)}
              className={`p-1.5 rounded-full backdrop-blur-md transition ${
                isLiked
                  ? 'bg-rose-500 text-white'
                  : 'bg-black/40 text-white/80 hover:text-white hover:bg-black/60'
              }`}
              title="Favorite Photo"
            >
              <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Left / Right Carousel Arrow Buttons */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className={`absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/60 hover:bg-black/85 text-white transition-all duration-200 z-10 ${
                  isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-1 sm:opacity-100 sm:translate-x-0'
                }`}
                title="Previous photo in carousel"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextImage}
                className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/60 hover:bg-black/85 text-white transition-all duration-200 z-10 ${
                  isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-1 sm:opacity-100 sm:translate-x-0'
                }`}
                title="Next photo in carousel"
                aria-label="Next photo"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}

          {/* Carousel Pagination Dots (Max 3 dots) */}
          {images.length > 1 && (
            <div className="absolute bottom-7 left-0 right-0 flex items-center justify-center gap-1.5 z-10">
              {images.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={(e) => handleDotClick(dotIdx, e)}
                  className={`transition-all duration-200 rounded-full ${
                    activeImgIndex === dotIdx
                      ? 'w-5 h-1.5 bg-white shadow-sm'
                      : 'w-1.5 h-1.5 bg-white/50 hover:bg-white/80'
                  }`}
                  aria-label={`Slide ${dotIdx + 1}`}
                />
              ))}
            </div>
          )}

          {/* Bottom Location Info Tag */}
          <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-white text-[11px] pointer-events-none">
            <div className="flex items-center gap-1 truncate drop-shadow-sm">
              <MapPin className="w-3 h-3 text-[#D4E2BA] shrink-0" />
              <span className="truncate">{photo.location}</span>
            </div>
            <span className="text-[10px] text-white/80 shrink-0 drop-shadow-sm font-medium">
              {photo.city.split(',')[0]}
            </span>
          </div>
        </div>

        {/* Text Details */}
        <div className="p-4 space-y-2 text-left">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm font-bold text-[#2D3021] line-clamp-1 leading-snug group-hover:text-[#1E3A8A] transition-colors">
              {photo.title}
            </h3>
          </div>
          <p className="text-xs text-[#5C594D] line-clamp-2 leading-relaxed font-normal">
            {photo.description || `High-resolution session in ${photo.location} captured by ${photo.photographer}.`}
          </p>

          {/* Tags */}
          {photo.tags && photo.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-1">
              {photo.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded bg-[#F2F0E6] text-[#5C594D] text-[10px] font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="px-4 pb-4 pt-2 border-t border-[#F2F0E6] flex items-center justify-between text-[11px] text-[#8C887B]">
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (onViewStory) {
              onViewStory(photo.id);
            } else {
              onOpenModal(photo, activeImgIndex);
            }
          }}
          className="font-bold text-[#1E3A8A] hover:underline flex items-center gap-1"
        >
          <span>Read Story & Details</span>
          <ArrowRight className="w-3 h-3" />
        </button>
        
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={(e) => onShare(photo, e)}
            className="p-1.5 rounded-lg hover:bg-[#F2F0E6] text-[#8C887B] hover:text-[#2D3021] transition"
            title="Copy Image URL"
          >
            {isCopied ? (
              <CheckCircle className="w-3.5 h-3.5 text-[#1E3A8A]" />
            ) : (
              <Share2 className="w-3.5 h-3.5" />
            )}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenBooking({
                category: photo.category,
                photographer: photo.photographer,
              });
            }}
            className="px-3 py-1.5 rounded-lg text-white font-bold text-[11px] hover:opacity-90 transition shadow-2xs flex items-center gap-1"
            style={{ backgroundColor: primaryColor }}
          >
            <span>Book Shoot</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export const ImageShowcase: React.FC<ImageShowcaseProps> = ({
  portfolio,
  onOpenBooking,
  onViewStory,
  primaryColor = '#1E3A8A',
  accentColor = '#DC2626',
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'popular' | 'title'>('featured');
  const [gridColumns, setGridColumns] = useState<3 | 4>(4);
  const [selectedPhoto, setSelectedPhoto] = useState<{
    photo: PortfolioItem;
    initialIndex: number;
  } | null>(null);
  const [modalImageIndex, setModalImageIndex] = useState<number>(0);
  const [likedIds, setLikedIds] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    'All',
    'Couples & Proposals',
    'Family & Kids',
    'Portraits & Headshots',
    'Maternity & Newborn',
    'Weddings & Events',
    'Graduations & Pets',
  ];

  const totalAngleCount = useMemo(() => {
    return portfolio.reduce((acc, curr) => {
      const count = curr.images && curr.images.length > 0 ? curr.images.length : 1;
      return acc + count;
    }, 0);
  }, [portfolio]);

  const filteredPhotos = useMemo(() => {
    let list = portfolio;

    if (activeCategory !== 'All') {
      list = list.filter((p) => p.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q) ||
          p.photographer.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.tags && p.tags.some((t) => t.toLowerCase().includes(q)))
      );
    }

    return [...list].sort((a, b) => {
      if (sortBy === 'popular') return (b.likes || 0) - (a.likes || 0);
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      // default: featured first then likes
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return (b.likes || 0) - (a.likes || 0);
    });
  }, [portfolio, activeCategory, searchQuery, sortBy]);

  const handleToggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSharePhoto = (photo: PortfolioItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const url = (photo.images && photo.images[0]) || photo.imageUrl;
    navigator.clipboard.writeText(url);
    setCopiedId(photo.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleOpenModal = (photo: PortfolioItem, imageIndex: number) => {
    setSelectedPhoto({ photo, initialIndex: imageIndex });
    setModalImageIndex(imageIndex);
  };

  return (
    <section id="gallery" className="py-20 bg-[#FAF9F5] text-[#2D3021] relative overflow-hidden border-t border-[#EAE6D8]">
      {/* Background Ambience Accents */}
      <div className="absolute top-1/3 right-0 -mr-24 w-96 h-96 rounded-full bg-[#DC2626]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 -ml-24 w-80 h-80 rounded-full bg-[#1E3A8A]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFF6FF] text-[#1E3A8A] border border-[#93C5FD] text-xs font-bold uppercase tracking-wider">
              <Camera className="w-3.5 h-3.5 text-[#DC2626]" />
              Interactive 3-Image Carousel Gallery
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#2D3021]">
              Photo Stories by Category
            </h2>
            <p className="text-sm sm:text-base text-[#5C594D] max-w-2xl font-normal leading-relaxed">
              Every card contains an interactive 3-image animated carousel. Swipe or click through each story&apos;s shot angles, view full-resolution lightbox details, and book your 30-minute shoot.
            </p>
          </div>

          {/* Action CTAs & Grid Layout Selector */}
          <div className="flex flex-wrap items-center gap-3">
            {/* 3 vs 4 Columns Grid Selector */}
            <div className="bg-[#EAE6D8] p-1 rounded-xl flex items-center gap-1 border border-[#DDD8C7]">
              <button
                onClick={() => setGridColumns(3)}
                className={`p-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  gridColumns === 3
                    ? 'bg-white text-[#2D3021] shadow-xs'
                    : 'text-[#6C685B] hover:text-[#2D3021]'
                }`}
                title="3 Columns Grid"
              >
                <Grid3X3 className="w-4 h-4" />
                <span className="hidden sm:inline">3 Cards</span>
              </button>
              <button
                onClick={() => setGridColumns(4)}
                className={`p-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  gridColumns === 4
                    ? 'bg-white text-[#2D3021] shadow-xs'
                    : 'text-[#6C685B] hover:text-[#2D3021]'
                }`}
                title="4 Columns Grid"
              >
                <LayoutGrid className="w-4 h-4" />
                <span className="hidden sm:inline">4 Cards</span>
              </button>
            </div>

            <button
              onClick={() => onOpenBooking()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white shadow-md hover:shadow-lg transition-all hover:scale-[1.02]"
              style={{ backgroundColor: primaryColor }}
            >
              <Calendar className="w-4 h-4" />
              <span>Book Category Shoot</span>
            </button>
          </div>
        </div>

        {/* Search & Sort Toolbar */}
        <div className="mb-6 bg-white p-3.5 rounded-2xl border border-[#E5E0D0] shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C887B]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by city, photographer, tag..."
              className="w-full pl-9.5 pr-8 py-2 text-xs sm:text-sm bg-[#FAF9F5] border border-[#E5E0D0] rounded-xl text-[#2D3021] placeholder-[#8C887B] focus:outline-none focus:border-[#1E3A8A] transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8C887B] hover:text-[#2D3021]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between md:justify-end gap-3 w-full md:w-auto">
            {/* Stats Badge */}
            <div className="text-xs text-[#5C594D] font-medium bg-[#EFF6FF] px-3 py-1.5 rounded-xl border border-[#93C5FD]">
              <span className="font-bold text-[#1E3A8A]">{filteredPhotos.length}</span> Stories • <span className="font-bold text-[#1E3A8A]">{filteredPhotos.length * 3}</span> Carousel Angles
            </div>

            {/* Sort Filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#8C887B] font-semibold hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'featured' | 'popular' | 'title')}
                aria-label="Sort photo stories"
                className="px-3 py-1.5 text-xs font-semibold bg-[#FAF9F5] border border-[#E5E0D0] rounded-xl text-[#2D3021] focus:outline-none focus:border-[#1E3A8A]"
              >
                <option value="featured">Featured First</option>
                <option value="popular">Most Popular</option>
                <option value="title">Alphabetical (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Filters Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeCategory === cat
                  ? 'text-white shadow-md scale-[1.02]'
                  : 'bg-white text-[#5C594D] hover:bg-[#F2F0E6] hover:text-[#2D3021] border border-[#E5E0D0]'
              }`}
              style={{
                backgroundColor: activeCategory === cat ? primaryColor : undefined,
              }}
            >
              {activeCategory === cat && <Sparkles className="w-3 h-3 text-[#D4E2BA]" />}
              <span>{cat}</span>
              <span
                className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] ${
                  activeCategory === cat
                    ? 'bg-white/20 text-white'
                    : 'bg-[#F2F0E6] text-[#8C887B]'
                }`}
              >
                {cat === 'All'
                  ? portfolio.length
                  : portfolio.filter((p) => p.category === cat).length}
              </span>
            </button>
          ))}
        </div>

        {/* Empty State if Search/Filter has no matches */}
        {filteredPhotos.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-[#E5E0D0] my-8 space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-[#EFF6FF] text-[#1E3A8A] flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#2D3021]">No photo stories matched your search</h3>
            <p className="text-xs sm:text-sm text-[#5C594D] max-w-md mx-auto">
              Try adjusting your search terms or select another category filter to explore all {portfolio.length} available photo collections.
            </p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-[#2D3021] text-white hover:bg-black transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        ) : (
          /* Grid of Cards (Each single div/card contains a 3-image carousel with slide animation) */
          <div
            className={`grid gap-6 ${
              gridColumns === 3
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            }`}
          >
            {filteredPhotos.map((photo) => (
              <PortfolioCard
                key={photo.id}
                photo={photo}
                primaryColor={primaryColor}
                onOpenModal={handleOpenModal}
                onOpenBooking={onOpenBooking}
                onViewStory={onViewStory}
                isLiked={!!likedIds[photo.id]}
                onToggleLike={handleToggleLike}
                isCopied={copiedId === photo.id}
                onShare={handleSharePhoto}
              />
            ))}
          </div>
        )}

        {/* Bottom Guarantee Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-[#2D3021] text-[#FDFBF7] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-[#3D422E]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#1E3A8A] flex items-center justify-center text-white shrink-0 shadow-md">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white">
                Every Shoot Includes 40+ Lightly Retouched High-Res Images
              </h4>
              <p className="text-xs sm:text-sm text-[#D4CEB8] max-w-xl">
                Delivered in 3-5 days in your private digital gallery. Download individual favorites for $15/photo, or purchase full album bundles at discounted rates.
              </p>
            </div>
          </div>
          <button
            onClick={() => onOpenBooking()}
            className="w-full md:w-auto px-6 py-3.5 rounded-xl bg-white text-[#2D3021] font-bold text-sm hover:bg-[#F2F0E6] transition shadow-md whitespace-nowrap shrink-0 flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4 text-[#1E3A8A]" />
            <span>Reserve 30-Minute Shoot</span>
          </button>
        </div>

      </div>

      {/* Full-Screen Lightbox Modal for Full Resolution Viewing */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setSelectedPhoto(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition shadow-lg"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Container */}
          {(() => {
            const currentItem = selectedPhoto.photo;
            const modalImages = currentItem.images && currentItem.images.length > 0
              ? currentItem.images.slice(0, 3)
              : [currentItem.imageUrl];

            const handleNextModalImg = (e: React.MouseEvent) => {
              e.stopPropagation();
              setModalImageIndex((prev) => (prev + 1) % modalImages.length);
            };

            const handlePrevModalImg = (e: React.MouseEvent) => {
              e.stopPropagation();
              setModalImageIndex((prev) => (prev - 1 + modalImages.length) % modalImages.length);
            };

            return (
              <div
                className="max-w-5xl w-full bg-[#1F2218] border border-[#3A402D] rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Image Preview Container with modal prev/next */}
                <div className="lg:col-span-8 bg-black flex items-center justify-center relative min-h-[320px] lg:min-h-[500px] overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={modalImages[modalImageIndex]}
                      src={modalImages[modalImageIndex]}
                      alt={currentItem.title}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.25 }}
                      className="max-h-[75vh] w-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </AnimatePresence>

                  {/* Modal Arrows */}
                  {modalImages.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevModalImg}
                        className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition shadow-lg"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={handleNextModalImg}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition shadow-lg"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}

                  {/* Category and Index Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <div className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[#D4E2BA] text-xs font-bold uppercase tracking-wider border border-white/20">
                      {currentItem.category}
                    </div>
                    {modalImages.length > 1 && (
                      <div className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-xs font-semibold border border-white/20">
                        {modalImageIndex + 1} / {modalImages.length}
                      </div>
                    )}
                  </div>
                </div>

                {/* Sidebar Details */}
                <div className="lg:col-span-4 p-6 flex flex-col justify-between space-y-6 text-[#FDFBF7] bg-[#262A1D] overflow-y-auto">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="text-xs font-bold text-[#DC2626] uppercase tracking-wider">
                        {currentItem.category}
                      </div>
                      <h3 className="text-xl font-extrabold text-white leading-tight">
                        {currentItem.title}
                      </h3>
                      <p className="text-xs text-[#D4CEB8] leading-relaxed">
                        {currentItem.description || 'Full-resolution editorial capture with authentic expressions and magazine-quality color tuning.'}
                      </p>
                    </div>

                    {/* Thumbnails of the 3 images in this card */}
                    {modalImages.length > 1 && (
                      <div className="space-y-1.5 pt-2">
                        <span className="text-[11px] text-[#8C887B] font-medium">Card Photos:</span>
                        <div className="flex items-center gap-2">
                          {modalImages.map((img, i) => (
                            <button
                              key={i}
                              onClick={() => setModalImageIndex(i)}
                              className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition ${
                                modalImageIndex === i ? 'border-[#DC2626] scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                              }`}
                            >
                              <img src={img} alt={`Thumb ${i + 1}`} className="w-full h-full object-cover" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Shooting & Photographer Details */}
                    <div className="space-y-2.5 text-xs text-[#EAE6D8] pt-3 border-t border-[#3A402D]">
                      <div className="flex items-center justify-between">
                        <span className="text-[#8C887B]">Lead Photographer:</span>
                        <span className="font-semibold text-white">{currentItem.photographer}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#8C887B]">Location:</span>
                        <span className="font-semibold text-white">{currentItem.location}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#8C887B]">City:</span>
                        <span className="font-semibold text-white">{currentItem.city}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#8C887B]">Format:</span>
                        <span className="font-semibold text-[#D4E2BA]">4K High-Res JPEG + Print Release</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2.5 pt-4 border-t border-[#3A402D]">
                    <button
                      onClick={() => {
                        const chosen = currentItem;
                        setSelectedPhoto(null);
                        onOpenBooking({
                          category: chosen.category,
                          photographer: chosen.photographer,
                        });
                      }}
                      className="w-full py-3 px-4 rounded-xl text-white font-bold text-sm shadow-md transition-all hover:opacity-90 flex items-center justify-center gap-2"
                      style={{ backgroundColor: primaryColor }}
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Book This Style Session</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => handleToggleLike(currentItem.id, e)}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border transition ${
                          likedIds[currentItem.id]
                            ? 'bg-rose-600 text-white border-rose-500'
                            : 'bg-[#1F2218] text-[#D4CEB8] border-[#3A402D] hover:bg-[#343927]'
                        }`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${likedIds[currentItem.id] ? 'fill-current' : ''}`} />
                        <span>{likedIds[currentItem.id] ? 'Favorited' : 'Add to Favorites'}</span>
                      </button>
                      <button
                        onClick={(e) => handleSharePhoto(currentItem, e)}
                        className="p-2 rounded-xl bg-[#1F2218] text-[#D4CEB8] border border-[#3A402D] hover:bg-[#343927] transition"
                        title="Copy Image URL"
                      >
                        {copiedId === currentItem.id ? (
                          <CheckCircle className="w-4 h-4 text-[#DC2626]" />
                        ) : (
                          <Share2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </section>
  );
};
