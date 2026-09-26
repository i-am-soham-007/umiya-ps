export interface YouTubeVideo {
  id: string;
  title: string;
  category: 'Weddings' | 'Family & Portraits' | 'Commercial & Events' | 'Cinematic Reels' | 'Behind The Scenes';
  youtubeUrl: string;
  youtubeId: string;
  duration: string;
  photographerName: string;
  location: string;
  thumbnail: string;
  description: string;
  views?: string;
  isVertical?: boolean;
  featured?: boolean;
}

export interface PhotoSpot {
  id: string;
  name: string;
  cityId: string;
  cityName: string;
  state: string;
  coverImage: string;
  description: string;
  vibe: string;
  bestTime: string;
  parkingInfo: string;
  samplePhotos: string[];
  nextAvailableDates: string[];
}

export interface CityData {
  id: string;
  name: string;
  state: string;
  spotCount: number;
  popularSpot: string;
  image: string;
}

export interface Photographer {
  id: string;
  name: string;
  title: string;
  city: string;
  rating: number;
  reviewsCount: number;
  avatar: string;
  bio: string;
  gear: string[];
  specialties: string[];
  portfolio: string[];
  experienceYears: number;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  images?: string[]; // Up to 3+ images for the card's inner carousel and details gallery
  location: string;
  city: string;
  photographer: string;
  photographerAvatar?: string;
  aspectRatio?: 'square' | 'portrait' | 'landscape';
  description?: string;
  featured?: boolean;
  likes?: number;
  tags?: string[];
  // Rich blog & story details
  subtitle?: string;
  date?: string;
  readingTime?: string;
  clientName?: string;
  clientQuote?: string;
  storyVision?: string;
  behindTheLens?: string;
  lightingSetup?: string;
  gearUsed?: string[];
  outfitAdvice?: string;
  bestTimeOfDay?: string;
  youtubeId?: string;
  youtubeUrl?: string;
  videoDuration?: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  city: string;
  rating: number;
  text: string;
  date: string;
  avatar: string;
  sessionType: string;
  photoUrl?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'Booking & Costs' | 'The Photoshoot' | 'Photos & Video Delivery' | 'Rescheduling & Policy';
}

export interface PricingBundle {
  id: string;
  name: string;
  photoCount: number | 'all';
  price: number;
  originalPrice?: number;
  popular?: boolean;
  features: string[];
  badge?: string;
}

export interface BookingSubmission {
  id: string;
  category: string;
  city: string;
  spot: string;
  date: string;
  timeSlot: string;
  photographerId: string;
  photographerName: string;
  fullName: string;
  email: string;
  phone: string;
  attendeesCount: number;
  specialNotes?: string;
  addons: {
    videoReel: boolean;
    droneFootage: boolean;
    rushDelivery48h: boolean;
    extraPhotographer: boolean;
  };
  createdAt: string;
  status: 'Confirmed' | 'Pending';
}

export interface SiteConfig {
  siteName: string;
  tagline: string;
  brandSubtitle: string;
  announcement: {
    enabled: boolean;
    text: string;
    linkText: string;
  };
  hero: {
    headline: string;
    subheadline: string;
    ctaPrimary: string;
    ctaSecondary: string;
    ratingScore: string;
    ratingReviewsCount: string;
    heroImages: string[];
    featuredVideoId?: string;
  };
  theme: {
    primaryColor: string;
    accentColor: string;
    backgroundColor: string;
    fontFamily: string;
    borderRadius: 'rounded-md' | 'rounded-xl' | 'rounded-2xl' | 'rounded-none';
  };
  videos: YouTubeVideo[];
  cities: CityData[];
  spots: PhotoSpot[];
  photographers: Photographer[];
  portfolio: PortfolioItem[];
  pricing: PricingBundle[];
  testimonials: Testimonial[];
  faqs: FaqItem[];
  customLogoUrl?: string;
  phoneContact: string;
  emailContact: string;
  instagramHandle: string;
  youtubeChannelUrl: string;
}
