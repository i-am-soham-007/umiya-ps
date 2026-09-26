-- =======================================================
-- UMIYA STUDIO USA - PostgreSQL Database Schema
-- =======================================================

-- 1. Studio Stats Table
CREATE TABLE IF NOT EXISTS studio_stats (
  id VARCHAR(50) PRIMARY KEY DEFAULT 'main',
  yearsExperience INT NOT NULL DEFAULT 10,
  weddingsCaptured INT NOT NULL DEFAULT 500,
  happyClients INT NOT NULL DEFAULT 1200,
  countriesCovered INT NOT NULL DEFAULT 8,
  citiesInUSA INT NOT NULL DEFAULT 35,
  awardsWon INT NOT NULL DEFAULT 24,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Hero Slides Table
CREATE TABLE IF NOT EXISTS hero_slides (
  id VARCHAR(100) PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  location TEXT NOT NULL,
  image TEXT NOT NULL,
  tag TEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 0
);

-- 3. Services Catalog Table
CREATE TABLE IF NOT EXISTS services (
  id VARCHAR(100) PRIMARY KEY,
  title TEXT NOT NULL,
  slug VARCHAR(150) UNIQUE NOT NULL,
  category VARCHAR(100) NOT NULL,
  shortDescription TEXT NOT NULL,
  fullDescription TEXT NOT NULL,
  iconName VARCHAR(100) NOT NULL,
  coverImage TEXT NOT NULL,
  galleryImages JSONB NOT NULL DEFAULT '[]'::jsonb,
  startingPrice VARCHAR(50) NOT NULL,
  popularTag VARCHAR(100),
  features JSONB NOT NULL DEFAULT '[]'::jsonb,
  deliverables JSONB NOT NULL DEFAULT '[]'::jsonb,
  display_order INT NOT NULL DEFAULT 0
);

-- 4. Portfolio Items Table
CREATE TABLE IF NOT EXISTS portfolio_items (
  id VARCHAR(100) PRIMARY KEY,
  title TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  location TEXT NOT NULL,
  year VARCHAR(20) NOT NULL,
  coverImage TEXT NOT NULL,
  tags JSONB NOT NULL DEFAULT '[]'::jsonb,
  aspectRatio VARCHAR(50) NOT NULL DEFAULT 'vertical',
  featured INT NOT NULL DEFAULT 0,
  description TEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 0
);

-- 5. Featured Videos Table
CREATE TABLE IF NOT EXISTS featured_videos (
  id VARCHAR(100) PRIMARY KEY,
  title TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  coupleName VARCHAR(150) NOT NULL,
  location TEXT NOT NULL,
  youtubeId VARCHAR(100) NOT NULL,
  thumbnail TEXT NOT NULL,
  duration VARCHAR(50) NOT NULL,
  story TEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 0
);

-- 6. Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
  id VARCHAR(100) PRIMARY KEY,
  clientName VARCHAR(150) NOT NULL,
  eventTitle TEXT NOT NULL,
  location TEXT NOT NULL,
  rating INT NOT NULL DEFAULT 5,
  date VARCHAR(50) NOT NULL,
  review TEXT NOT NULL,
  avatar TEXT NOT NULL,
  verifiedBooking INT NOT NULL DEFAULT 1,
  serviceCategory VARCHAR(100) NOT NULL,
  display_order INT NOT NULL DEFAULT 0
);

-- 7. Timeline Events Table
CREATE TABLE IF NOT EXISTS timeline_events (
  id VARCHAR(100) PRIMARY KEY,
  year VARCHAR(20) NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  location TEXT NOT NULL,
  description TEXT NOT NULL,
  badge VARCHAR(100),
  image TEXT,
  display_order INT NOT NULL DEFAULT 0
);

-- 8. Instagram Posts Table
CREATE TABLE IF NOT EXISTS instagram_posts (
  id VARCHAR(100) PRIMARY KEY,
  title TEXT NOT NULL,
  image TEXT NOT NULL,
  likes VARCHAR(20) NOT NULL,
  comments VARCHAR(20) NOT NULL,
  link TEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 0
);

-- 9. Team Members Table
CREATE TABLE IF NOT EXISTS team_members (
  id VARCHAR(100) PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  role VARCHAR(150) NOT NULL,
  location VARCHAR(150) NOT NULL,
  bio TEXT NOT NULL,
  photo TEXT NOT NULL,
  specialty JSONB NOT NULL DEFAULT '[]'::jsonb,
  experience VARCHAR(50) NOT NULL,
  display_order INT NOT NULL DEFAULT 0
);

-- 10. Bookings Table
CREATE TABLE IF NOT EXISTS bookings (
  id VARCHAR(100) PRIMARY KEY,
  clientName VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  eventDate VARCHAR(50) NOT NULL,
  eventLocation TEXT NOT NULL,
  serviceCategory VARCHAR(100) NOT NULL,
  estimatedBudget VARCHAR(100) NOT NULL,
  guestCount VARCHAR(50),
  message TEXT,
  status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 11. Contact Messages Table
CREATE TABLE IF NOT EXISTS contact_messages (
  id VARCHAR(100) PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL,
  phone VARCHAR(50),
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  region VARCHAR(20) NOT NULL DEFAULT 'USA',
  status VARCHAR(20) NOT NULL DEFAULT 'UNREAD',
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
