export interface StudioStats {
  id: string;
  yearsExperience: number;
  weddingsCaptured: number;
  happyClients: number;
  countriesCovered: number;
  citiesInUSA: number;
  awardsWon: number;
  updatedAt?: string;
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  image: string;
  tag: string;
  display_order: number;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  coverImage: string;
  galleryImages: string[] | string;
  startingPrice: string;
  popularTag?: string;
  features: string[] | string;
  deliverables: string[] | string;
  display_order: number;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  location: string;
  year: string;
  coverImage: string;
  tags: string[] | string;
  aspectRatio: string;
  featured: boolean | number;
  description: string;
  display_order: number;
}

export interface FeaturedVideo {
  id: string;
  title: string;
  category: string;
  coupleName: string;
  location: string;
  youtubeId: string;
  thumbnail: string;
  duration: string;
  story: string;
  display_order: number;
}

export interface Testimonial {
  id: string;
  clientName: string;
  eventTitle: string;
  location: string;
  rating: number;
  date: string;
  review: string;
  avatar: string;
  verifiedBooking: boolean | number;
  serviceCategory: string;
  display_order: number;
}

export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  location: string;
  description: string;
  badge?: string;
  image?: string;
  display_order: number;
}

export interface InstagramPost {
  id: string;
  title: string;
  image: string;
  likes: string;
  comments: string;
  link: string;
  display_order: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  location: string;
  bio: string;
  photo: string;
  specialty: string[] | string;
  experience: string;
  display_order: number;
}

export interface Booking {
  id: string;
  clientName: string;
  email: string;
  phone: string;
  eventDate: string;
  eventLocation: string;
  serviceCategory: string;
  estimatedBudget: string;
  guestCount?: string;
  message?: string;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  region: 'USA' | 'INDIA' | 'INTERNATIONAL';
  status: 'UNREAD' | 'READ' | 'ARCHIVED';
  createdAt: string;
}
