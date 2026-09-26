-- Seed Data for UMIYA STUDIO USA Database

INSERT INTO studio_stats (id, yearsExperience, weddingsCaptured, happyClients, countriesCovered, citiesInUSA, awardsWon)
VALUES ('main', 10, 500, 1200, 8, 35, 24)
ON CONFLICT (id) DO UPDATE SET 
  yearsExperience = EXCLUDED.yearsExperience,
  weddingsCaptured = EXCLUDED.weddingsCaptured,
  happyClients = EXCLUDED.happyClients,
  countriesCovered = EXCLUDED.countriesCovered,
  citiesInUSA = EXCLUDED.citiesInUSA,
  awardsWon = EXCLUDED.awardsWon;

-- Hero Slides
INSERT INTO hero_slides (id, title, subtitle, location, image, tag, display_order)
VALUES 
('slide-1', 'A Radiant Union in San Jose', 'Grand Indian Wedding & Cinematography', 'San Jose, California', 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=2000', 'Royal Wedding', 0),
('slide-2', 'New York Sky Skyline Romance', 'Intimate High-Fashion Bridal Editorial', 'Manhattan, New York', 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=2000', 'Luxury Editorial', 1),
('slide-3', 'Heritage Sangeet & Garba Night', 'Vibrant Cultural Celebrations in Texas', 'Dallas, Texas', 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&q=80&w=2000', 'Cultural Celebration', 2)
ON CONFLICT (id) DO NOTHING;
