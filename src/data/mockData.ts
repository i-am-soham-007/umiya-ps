import {
  ServiceItem,
  PortfolioItem,
  VideoItem,
  Testimonial,
  TimelineEvent,
  TeamMember,
  BlogPost,
  StudioStats
} from '../types';

export const STUDIO_STATS: StudioStats = {
  yearsExperience: 10,
  weddingsCaptured: 500,
  happyClients: 1200,
  countriesCovered: 8,
  citiesInUSA: 35,
  awardsWon: 24
};

export const HERO_SLIDES = [
  {
    id: '1',
    title: 'Capture Moments. Create Memories. Live Forever.',
    subtitle: 'Luxury Wedding & Cinematic Storytelling Across USA & Worldwide',
    location: 'Napa Valley, California',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=85',
    tag: 'Grand Royal Wedding'
  },
  {
    id: '2',
    title: 'Timeless Elegance & Cinematic Mastery',
    subtitle: 'From High-Fashion Pre-Weddings to Regal Destination Celebrations',
    location: 'Udaipur Palace, India & New York City',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=2000&q=85',
    tag: 'Destination Celebration'
  },
  {
    id: '3',
    title: 'High-Resolution Drone & Cinematic Films',
    subtitle: '4K Cinema Cinema Cameras & Master Color Grading',
    location: 'Maui, Hawaii & Chicago, IL',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=2000&q=85',
    tag: 'Aerial & Cinematic'
  }
];

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: '1',
    title: 'Wedding Photography',
    slug: 'wedding-photography',
    category: 'Wedding',
    shortDescription: 'Comprehensive luxury wedding coverage blending candid emotions with magazine editorial art.',
    fullDescription: 'Our flagship wedding experience captures every sacred ritual, emotional glance, and opulent decor detail. We seamlessly fuse traditional South Asian & Western aesthetics with high-fashion lighting.',
    iconName: 'Camera',
    coverImage: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80'
    ],
    startingPrice: '$3,499',
    popularTag: 'Most Requested',
    features: [
      'Full Day Multi-Event Coverage (Sangeet, Barat, Wedding, Reception)',
      'Dual Senior Lead Photographers + Assistants',
      'High-Resolution Hand-Retouched Gallery',
      'Luxury Italian Leather Handcrafted Album',
      'Online Password-Protected Web Gallery'
    ],
    deliverables: ['800+ Retouched Photos', 'Print Release', 'Flush Mount Leather Album', 'Highlight Reel Slideshow']
  },
  {
    id: '2',
    title: 'Pre Wedding Shoot',
    slug: 'pre-wedding',
    category: 'Wedding',
    shortDescription: 'Cinematic romantic couple shoots in iconic USA locations or scenic worldwide destinations.',
    fullDescription: 'Express your unique love story in iconic backdrops — from Central Park in NYC to Golden Gate Bridge in San Francisco, or desert dunes in Arizona. Includes outfit planning and drone portraits.',
    iconName: 'HeartHandshake',
    coverImage: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1000&q=80'
    ],
    startingPrice: '$1,299',
    popularTag: 'Trending',
    features: [
      '3-4 Hours Outdoor Location Session',
      'Up to 3 Luxury Outfit Changes',
      'Aerial Drone Couple Shots Included',
      'Styling & Color Concepting Guidance'
    ],
    deliverables: ['60+ Master Retouched Images', 'Save The Date Digital Cards', 'High-Res Web Drive']
  },
  {
    id: '3',
    title: 'Engagement Ceremony',
    slug: 'engagement',
    category: 'Wedding',
    shortDescription: 'Documenting the ring exchange, family blessings, and intimate celebration joy.',
    fullDescription: 'Capture the joyful proposal and formal ring ceremony with authentic storytelling, golden hour couple portraits, and family formals.',
    iconName: 'Sparkles',
    coverImage: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1000&q=80'],
    startingPrice: '$899',
    features: ['Up to 5 Hours Coverage', 'Formal & Candid Mix', 'Family Portraits', 'Fast 48-Hour Sneak Peeks'],
    deliverables: ['250+ Edited Photos', 'Online Sharing Portal']
  },
  {
    id: '4',
    title: 'Cinematic Wedding Film',
    slug: 'cinematic-wedding-film',
    category: 'Video',
    shortDescription: 'Hollywood-style cinema films featuring 4K video, crisp audio, drone sweeps, and custom scoring.',
    fullDescription: 'We produce cinematic masterpieces with multi-camera setups, wireless lavalier sound recording of vows, and professional color grading in DaVinci Resolve.',
    iconName: 'Video',
    coverImage: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1000&q=80'],
    startingPrice: '$3,999',
    popularTag: 'Award Winning',
    features: [
      '4K RED/Sony Cinema Cameras',
      'Licensed Soundtracks & Speech Audio',
      '5-7 Minute Cinematic Highlight Film',
      'Full Feature Length Documentary Edit'
    ],
    deliverables: ['Cinematic Teaser Trailer (60s)', 'Highlight Film', 'Full Event Recording', 'USB Master Box']
  },
  {
    id: '5',
    title: 'Drone Shoot & Aerial',
    slug: 'drone-shoot',
    category: 'Special',
    shortDescription: 'Licensed FAA Part 107 drone operators delivering dramatic aerial vistas and venue fly-throughs.',
    fullDescription: 'Add grandeur to your celebration with smooth 4K aerial footage of grand estate venues, baraat processions, outdoor mandaps, and coastal sunset shots.',
    iconName: 'Zap',
    coverImage: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1000&q=80'],
    startingPrice: '$699',
    features: ['FAA Certified Drone Pilots', '4K 60fps Aerial Video & HDR Stills', 'Safety Approved Protocols'],
    deliverables: ['Aerial Video Clips', 'High-Res Drone Photos']
  },
  {
    id: '6',
    title: 'Baby Shower / Seemantham',
    slug: 'baby-shower',
    category: 'Events',
    shortDescription: 'Warm, joyful celebration of new beginnings, pregnancy glow, and family blessing rituals.',
    fullDescription: 'Capture the tender excitement, floral background decor, traditional games, and maternity glow with loving detail.',
    iconName: 'Baby',
    coverImage: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=800&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=1000&q=80'],
    startingPrice: '$799',
    features: ['Maternity Couple Portraits', 'Ritual & Floral Decor Coverage', 'Family Group Photos'],
    deliverables: ['200+ Edited Photos', 'Same-Week Gallery Access']
  },
  {
    id: '7',
    title: 'Birthday & Milestone Parties',
    slug: 'birthday',
    category: 'Events',
    shortDescription: 'Energetic photography for 1st birthday galas, Sweet 16, 21st, 50th jubilees, and theme parties.',
    fullDescription: 'From high-energy dance floors to detailed cake cutting ceremonies and guest portraits, we capture every lively moment.',
    iconName: 'Gift',
    coverImage: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1000&q=80'],
    startingPrice: '$699',
    features: ['Action & Stage Photography', 'Photo Booth Setup Optional', 'Decor & Theme Close-ups'],
    deliverables: ['All Select High-Res Edits', 'Web Gallery']
  },
  {
    id: '8',
    title: 'Family Portrait Session',
    slug: 'family-portrait',
    category: 'Portrait',
    shortDescription: 'Heirloom studio or outdoor family portraits capturing natural smiles and multi-generational love.',
    fullDescription: 'Create lasting family keepsakes with soft natural lighting in outdoor parks, beaches, or private indoor studios.',
    iconName: 'Users',
    coverImage: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1000&q=80'],
    startingPrice: '$599',
    features: ['1-2 Hours Casual/Formal Session', 'Individual & Group Poses', 'Pet Friendly'],
    deliverables: ['30+ Fully Retouched Images', 'Canvas Print Credit']
  },
  {
    id: '9',
    title: 'Corporate & Gala Events',
    slug: 'corporate-events',
    category: 'Commercial',
    shortDescription: 'Professional coverage for conventions, award galas, product launches, and executive summits.',
    fullDescription: 'Polished, unobtrusive corporate event photography and highlight videography for marketing, press releases, and internal communications.',
    iconName: 'Briefcase',
    coverImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80'],
    startingPrice: '$1,499',
    features: ['Keynote Speaker Shots', 'Networking & Crowd Vibe', 'Fast Turnaround for Press PR'],
    deliverables: ['High-Res Press Gallery', 'Commercially Licensed']
  },
  {
    id: '10',
    title: 'Live Streaming Services',
    slug: 'live-streaming',
    category: 'Special',
    shortDescription: 'Ultra-low latency HD multi-camera live broadcast for family and guests unable to travel.',
    fullDescription: 'Connect overseas loved ones in India, Europe, or Australia with smooth, clear 1080p multi-cam YouTube/Zoom private live streaming.',
    iconName: 'Radio',
    coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80'],
    startingPrice: '$799',
    features: ['Multi-Camera Switcher', 'Dedicated 4G/5G Bonded Internet Unit', 'Custom Overlay & Title Graphics'],
    deliverables: ['Private Stream Link', 'Instant Replay Video File']
  },
  {
    id: '11',
    title: 'Destination Wedding',
    slug: 'destination-wedding',
    category: 'Wedding',
    shortDescription: 'Seamless travel team for destination weddings across Hawaii, Mexico, Caribbean, Europe, & India.',
    fullDescription: 'Complete peace of mind knowing your trusted USA photography & film team travels directly to your exotic venue.',
    iconName: 'Globe',
    coverImage: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=800&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=1000&q=80'],
    startingPrice: '$5,999',
    popularTag: 'International',
    features: ['Multi-Day All-Inclusive Travel Package', 'Sunset & Sunrise Location Shoots', 'Local Permitting Assistance'],
    deliverables: ['Complete Master Archive', 'Custom Premium Flush Albums']
  },
  {
    id: '12',
    title: 'Studio Portrait & Headshots',
    slug: 'studio-portrait',
    category: 'Portrait',
    shortDescription: 'High-end studio fashion portraits, executive headshots, and modeling portfolio sessions.',
    fullDescription: 'Controlled studio lighting, seamless backdrops, and precise retouching for actors, executives, and models.',
    iconName: 'UserCheck',
    coverImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80'],
    startingPrice: '$399',
    features: ['Studio Lighting Options', 'Skin & Hair Precision Retouching', 'Multiple Crop Ratios'],
    deliverables: ['LinkedIn & Web Formats', 'High-Res Tiff/Jpeg']
  },
  {
    id: '13',
    title: 'Commercial & Fashion Shoot',
    slug: 'commercial-shoot',
    category: 'Commercial',
    shortDescription: 'High-impact product photography, bridal fashion lookbooks, and brand campaigns.',
    fullDescription: 'Creative direction, professional color accuracy, and high-fashion aesthetics for jewelry, ethnic wear brands, and luxury lifestyle products.',
    iconName: 'ShoppingBag',
    coverImage: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1000&q=80'],
    startingPrice: '$1,899',
    features: ['Model & Makeup Artist Coordination', 'High-Speed Tethered Capture', 'Full Commercial Usage Rights'],
    deliverables: ['E-Commerce & Print Ready Files']
  },
  {
    id: '14',
    title: 'Videography & Reel Highlights',
    slug: 'videography-reels',
    category: 'Video',
    shortDescription: 'Vertical 9:16 social media reels, 60-second Instagram edits, and short highlights.',
    fullDescription: 'Instant viral-worthy vertical clips optimized for Instagram Reels, TikTok, and YouTube Shorts delivered within 48 hours of event.',
    iconName: 'Film',
    coverImage: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1000&q=80'],
    startingPrice: '$899',
    popularTag: 'Fast Turnaround',
    features: ['Vertical 4K Mobile Format', 'Trending Audio Integration', 'Quick Next-Day Delivery Option'],
    deliverables: ['3x Custom Social Reels']
  },
  {
    id: '15',
    title: 'Candid & Traditional Hybrid',
    slug: 'candid-traditional-hybrid',
    category: 'Wedding',
    shortDescription: 'The perfect balance of artistic candid emotions and structured family tradition coverage.',
    fullDescription: 'Designed specifically for large traditional weddings ensuring zero family members are missed while retaining artistic storytelling.',
    iconName: 'Layers',
    coverImage: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1000&q=80'],
    startingPrice: '$2,899',
    features: ['Dedicated Stage Team + Dedicated Candid Artist', 'Complete Ritual Logging', 'Massive Family Group Coordination'],
    deliverables: ['Comprehensive Complete Album', 'Digital Archive']
  }
];

export const PORTFOLIO_GALLERY: PortfolioItem[] = [
  {
    id: 'p1',
    title: 'Aarav & Diya’s Royal Palace Wedding',
    coupleOrClient: 'Aarav & Diya',
    category: 'Wedding',
    location: 'Napa Valley Estate, California',
    country: 'USA',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85',
    width: 1200,
    height: 800,
    date: 'June 2026',
    cameraInfo: 'Sony A1 | 85mm f/1.2 GM',
    description: 'A breathtaking golden hour sunset ceremony surrounded by rolling vineyards and floral mandap architecture.',
    tags: ['Royal Wedding', 'Golden Hour', 'California'],
    featured: true
  },
  {
    id: 'p2',
    title: 'Rohan & Ananya Sunset Romance',
    coupleOrClient: 'Rohan & Ananya',
    category: 'Pre Wedding',
    location: 'Central Park & Brooklyn Bridge, NYC',
    country: 'USA',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85',
    width: 800,
    height: 1200,
    date: 'May 2026',
    cameraInfo: 'Canon R3 | 50mm f/1.2 L',
    description: 'High-fashion editorial pre-wedding shoot against the iconic New York City skyline.',
    tags: ['NYC', 'Pre-Wedding', 'Editorial'],
    featured: true
  },
  {
    id: 'p3',
    title: 'Aerial Majesty at Lake Tahoe',
    coupleOrClient: 'Karan & Natasha',
    category: 'Drone',
    location: 'Lake Tahoe, Nevada',
    country: 'USA',
    image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&q=85',
    width: 1200,
    height: 750,
    date: 'April 2026',
    cameraInfo: 'DJI Inspire 3 | 24mm 8K Raw',
    description: 'Sweeping 8K aerial view of a lakeside glass mandap surrounded by pine mountain vistas.',
    tags: ['Drone', 'Nature', 'Aerial'],
    featured: true
  },
  {
    id: 'p4',
    title: 'Priyan & Meera Rings of Promises',
    coupleOrClient: 'Priyan & Meera',
    category: 'Engagement',
    location: 'Pasadena Villa, Los Angeles',
    country: 'USA',
    image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1200&q=85',
    width: 800,
    height: 1000,
    date: 'March 2026',
    cameraInfo: 'Sony A7R V | 135mm f/1.8 GM',
    description: 'Intimate engagement garden party with candlelit ambiance and acoustic live music.',
    tags: ['Engagement', 'Garden', 'Los Angeles'],
    featured: false
  },
  {
    id: 'p5',
    title: 'Blessings & Blooms Seemantham',
    coupleOrClient: 'Patel Family',
    category: 'Baby Shower',
    location: 'Edison, New Jersey',
    country: 'USA',
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=1200&q=85',
    width: 1000,
    height: 1200,
    date: 'February 2026',
    cameraInfo: 'Sony A1 | 35mm f/1.4 GM',
    description: 'Traditional floral jhula setup, jasmine strings, and warm smiles from three generations.',
    tags: ['Baby Shower', 'Floral', 'New Jersey'],
    featured: false
  },
  {
    id: 'p6',
    title: 'Vivaan’s Royal 1st Birthday Kingdom',
    coupleOrClient: 'Vivaan Shah',
    category: 'Birthday',
    location: 'Chicago, Illinois',
    country: 'USA',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=85',
    width: 1200,
    height: 800,
    date: 'January 2026',
    cameraInfo: 'Canon R5 | 24-70mm f/2.8 L',
    description: 'Whimsical hot air balloon themed 1st birthday extravaganza.',
    tags: ['Birthday', 'Celebration', 'Chicago'],
    featured: false
  },
  {
    id: 'p7',
    title: 'Udaipur Palace Destination Symphony',
    coupleOrClient: 'Vikram & Radhika',
    category: 'Wedding',
    location: 'City Palace, Udaipur',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85',
    width: 1200,
    height: 900,
    date: 'December 2025',
    cameraInfo: 'Sony A1 | 50mm f/1.2 GM',
    description: 'Multi-day royal wedding featuring lakeside fireworks, folk dancers, and regal lehengas.',
    tags: ['Udaipur', 'Destination', 'Royal'],
    featured: true
  },
  {
    id: 'p8',
    title: 'Oceanfront Vows in Maui',
    coupleOrClient: 'Jay & Simran',
    category: 'Cinematic',
    location: 'Wailea Coast, Maui, Hawaii',
    country: 'USA',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85',
    width: 1200,
    height: 800,
    date: 'November 2025',
    cameraInfo: 'RED Komodo 6K Cinema Camera',
    description: 'Dramatic beach sunset ceremony with traditional Polynesian and Indian fusion elements.',
    tags: ['Hawaii', 'Beach', 'Cinematic'],
    featured: true
  }
];

export const FEATURED_VIDEOS: VideoItem[] = [
  {
    id: 'v1',
    title: 'The Royal Tale of Aarav & Diya',
    coupleName: 'Aarav & Diya',
    location: 'Napa Valley, CA',
    duration: '04:45',
    thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    category: 'Cinematic Wedding Film',
    description: 'A magical 4K cinema highlight set amidst golden vineyards with emotional vows and high energy baraat.',
    views: '48.2k views'
  },
  {
    id: 'v2',
    title: 'Udaipur Palace Symphony of Love',
    coupleName: 'Vikram & Radhika',
    location: 'Udaipur, India',
    duration: '06:12',
    thumbnail: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    category: 'Destination Feature',
    description: 'Three days of regal festivities, lakeside fireworks, and breathtaking heritage architecture.',
    views: '92.5k views'
  },
  {
    id: 'v3',
    title: 'New York City Pre-Wedding Film',
    coupleName: 'Rohan & Ananya',
    location: 'Manhattan, NYC',
    duration: '03:18',
    thumbnail: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    category: 'Pre Wedding Film',
    description: 'A stylish urban story filmed across Central Park, Soho streets, and Brooklyn waterfront.',
    views: '34.1k views'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    clientName: 'Priya & Siddharth Sharma',
    spouseName: 'Siddharth',
    eventType: '4-Day Destination Wedding',
    location: 'Ritz-Carlton, San Francisco',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    photoUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    reviewText: 'UMIYA STUDIO USA exceeded our wildest dreams! Their team managed our 4-day fusion wedding with unmatched professionalism and artistic perfection. From the drone footage to our hand-crafted leather album, every single photo looks straight out of Vogue Bride. They felt like family throughout!',
    weddingDate: 'May 2026',
    verifiedBooking: true
  },
  {
    id: 't2',
    clientName: 'Neha & Kevin Patel',
    spouseName: 'Kevin',
    eventType: 'Hindu-Western Fusion Wedding',
    location: 'The Plaza Hotel, NYC',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    photoUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    reviewText: 'Choosing Umiya Studio was the best decision of our wedding planning. They understood both cultural rituals and modern cinematic aesthetics seamlessly. Our parents in India and friends in the US were blown away by the live stream and the 4K wedding trailer!',
    weddingDate: 'April 2026',
    verifiedBooking: true
  },
  {
    id: 't3',
    clientName: 'Anand & Pooja Mehta',
    spouseName: 'Pooja',
    eventType: 'Pre-Wedding & Wedding Gala',
    location: 'Houston, Texas',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    photoUrl: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    reviewText: 'Their attention to detail and ability to put us at ease in front of the camera was remarkable. The lighting, composition, and colors in our portraits are absolute art pieces on our living room wall now!',
    weddingDate: 'March 2026',
    verifiedBooking: true
  }
];

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    year: '2014',
    title: 'Studio Origin in Gujarat & Mumbai',
    subtitle: 'Foundation of Artistry',
    location: 'India',
    description: 'Started as a boutique passion project specializing in authentic ritual photography and portrait storytelling.',
    badge: 'Inception'
  },
  {
    year: '2018',
    title: 'Expansion to USA Operations',
    subtitle: 'East Coast Launch',
    location: 'New Jersey / NYC',
    description: 'Opened headquarters in the USA to serve the growing South Asian diaspora with premium cinematic wedding coverage.',
    badge: 'Global Step'
  },
  {
    year: '2021',
    title: '4K Cinema & Aerial Drone Fleet',
    subtitle: 'Tech & Artistic Upgrade',
    location: 'USA & India',
    description: 'Upgraded to cinema-grade RED and Sony FX series gear, FAA Part 107 drone licensing, and color grading suites.',
    badge: 'Tech Milestone'
  },
  {
    year: '2024',
    title: 'Cross-Country Coverage & Destination Luxury',
    subtitle: '500+ Milestone',
    location: 'California, Texas, Florida, Europe',
    description: 'Expanded full-service operations across 35+ US states and international luxury destination hotspots.',
    badge: '500+ Weddings'
  },
  {
    year: '2026',
    title: 'The Next Generation Studio USA',
    subtitle: 'Award-Winning Flagship Experience',
    location: 'Nationwide & Worldwide',
    description: 'Introducing ultra-low latency live streaming, custom handcrafted Italian albums, and nationwide team deployment.',
    badge: 'Present'
  }
];

export const INSTAGRAM_POSTS = [
  {
    id: 'ig1',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
    likes: '2,840',
    comments: '142',
    caption: 'Golden hour bliss in Napa Valley with Aarav & Diya. ✨ #UmiyaStudioUSA #LuxuryWedding',
    url: 'https://instagram.com'
  },
  {
    id: 'ig2',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80',
    likes: '3,120',
    comments: '189',
    caption: 'Regal reflections at City Palace Udaipur. 👑 #DestinationWedding #UmiyaStudio',
    url: 'https://instagram.com'
  },
  {
    id: 'ig3',
    image: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=600&q=80',
    likes: '1,950',
    comments: '88',
    caption: 'NYC pre-wedding strolls with sunset views. 🌇 #NYCWeddingPhotographer',
    url: 'https://instagram.com'
  },
  {
    id: 'ig4',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80',
    likes: '4,210',
    comments: '230',
    caption: 'Maui island magic for Jay & Simran! 🌺 #HawaiiWedding #UmiyaStudioUSA',
    url: 'https://instagram.com'
  },
  {
    id: 'ig5',
    image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=600&q=80',
    likes: '2,400',
    comments: '115',
    caption: 'Aerial perspective of a dream glass mandap. 🚁 #DronePhotography',
    url: 'https://instagram.com'
  },
  {
    id: 'ig6',
    image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=600&q=80',
    likes: '1,890',
    comments: '94',
    caption: 'Pure emotion captured during the ring ceremony. 💍 #EngagementShoot',
    url: 'https://instagram.com'
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'tm1',
    name: 'Jayesh Patel',
    role: 'Founder & Master Creative Director',
    location: 'USA',
    bio: 'With over 12 years of experience capturing high-profile celebrations across North America and India, Jayesh blends artistic composition with technological innovation.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    specialty: ['Creative Direction', 'Luxury Portraiture', 'Lighting Design'],
    gear: 'Sony A1, Leica M11, 85mm f/1.2 GM'
  },
  {
    id: 'tm2',
    name: 'Aniket Varma',
    role: 'Head of Cinema & Drone Operations',
    location: 'USA',
    bio: 'FAA Certified Part 107 drone pilot and cinematographer specializing in multi-cam 4K cinema films and DaVinci color grading.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    specialty: ['Aerial Videography', 'RED Cinema', 'Documentary Editing'],
    gear: 'RED Komodo 6K, DJI Inspire 3, Ronin 2'
  },
  {
    id: 'tm3',
    name: 'Pooja Desai',
    role: 'Lead Candid Photographer & Stylist',
    location: 'USA',
    bio: 'Specializing in intimate emotional moments, bride prep, and high-fashion detail shots.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    specialty: ['Candid Moments', 'Bride Styling', 'Editorial Detail'],
    gear: 'Canon R3, 50mm f/1.2 L, 35mm f/1.4'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    title: 'How to Plan Your Destination Wedding Timeline in 2026',
    slug: 'destination-wedding-timeline-guide',
    category: 'Wedding Tips',
    excerpt: 'Key strategies for coordinating golden hour ceremonies, lighting setups, and multiple event functions in resort venues.',
    content: 'Full article text regarding destination wedding planning...',
    readTime: '5 min read',
    date: 'July 15, 2026',
    author: 'Jayesh Patel',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'b2',
    title: 'Top 10 Pre-Wedding Shoot Locations Across the USA',
    slug: 'top-10-pre-wedding-locations-usa',
    category: 'Inspiration',
    excerpt: 'From Napa Valley vineyards and NYC rooftops to Sedona red rocks and Pacific coast cliffs.',
    content: 'Full article text on locations...',
    readTime: '7 min read',
    date: 'June 28, 2026',
    author: 'Pooja Desai',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80'
  }
];
