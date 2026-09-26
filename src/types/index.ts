export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  category: 'Wedding' | 'Portrait' | 'Commercial' | 'Events' | 'Video' | 'Special';
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  coverImage: string;
  galleryImages: string[];
  startingPrice: string;
  features: string[];
  popularTag?: string;
  deliverables: string[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  coupleOrClient: string;
  category: 'Wedding' | 'Pre Wedding' | 'Engagement' | 'Baby Shower' | 'Birthday' | 'Drone' | 'Portrait' | 'Cinematic';
  location: string; // e.g. "San Francisco, CA" or "Udaipur, Rajasthan"
  country: 'USA' | 'India' | 'Destination';
  image: string;
  width: number;
  height: number;
  date: string;
  cameraInfo?: string;
  description: string;
  tags: string[];
  featured?: boolean;
}

export interface VideoItem {
  id: string;
  title: string;
  coupleName: string;
  location: string;
  duration: string;
  thumbnail: string;
  videoUrl: string; // Embed or HTML5 video preview
  category: string;
  description: string;
  views: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  spouseName?: string;
  eventType: string;
  location: string;
  avatar: string;
  photoUrl: string;
  rating: number; // e.g. 5.0
  reviewText: string;
  weddingDate: string;
  verifiedBooking: boolean;
}

export interface TimelineEvent {
  year: string;
  title: string;
  subtitle: string;
  location: string;
  description: string;
  badge?: string;
  image?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  location: 'USA' | 'India';
  bio: string;
  image: string;
  specialty: string[];
  gear: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  readTime: string;
  date: string;
  author: string;
  image: string;
}

export interface StudioStats {
  yearsExperience: number;
  weddingsCaptured: number;
  happyClients: number;
  countriesCovered: number;
  citiesInUSA: number;
  awardsWon: number;
}

export interface BookingFormData {
  fullName: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  eventLocation: string;
  estimatedBudget: string;
  guestCount?: string;
  notes?: string;
  preferredContact: 'WhatsApp' | 'Phone' | 'Email';
}

export interface ContactMessage {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  office: 'USA' | 'India' | 'Both';
}
