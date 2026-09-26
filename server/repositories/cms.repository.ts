import { query, getOne, run } from '../db/database';

export class StatsRepository {
  static async getStats() {
    const row = await getOne('SELECT * FROM studio_stats WHERE id = ?', ['main']);
    if (!row) {
      return {
        yearsExperience: 10,
        weddingsCaptured: 500,
        happyClients: 1200,
        countriesCovered: 8,
        citiesInUSA: 35,
        awardsWon: 24
      };
    }
    return row;
  }

  static async updateStats(data: any) {
    await run(
      `UPDATE studio_stats SET 
        yearsExperience = ?, weddingsCaptured = ?, happyClients = ?, 
        countriesCovered = ?, citiesInUSA = ?, awardsWon = ? 
       WHERE id = 'main'`,
      [
        data.yearsExperience,
        data.weddingsCaptured,
        data.happyClients,
        data.countriesCovered,
        data.citiesInUSA,
        data.awardsWon
      ]
    );
    return this.getStats();
  }
}

export class HeroRepository {
  static async getAll() {
    return query('SELECT * FROM hero_slides ORDER BY display_order ASC');
  }

  static async getById(id: string) {
    return getOne('SELECT * FROM hero_slides WHERE id = ?', [id]);
  }

  static async create(item: any) {
    const id = item.id || `slide-${Date.now()}`;
    await run(
      `INSERT INTO hero_slides (id, title, subtitle, location, image, tag, display_order)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [id, item.title, item.subtitle, item.location, item.image, item.tag, item.display_order || 0]
    );
    return this.getById(id);
  }

  static async update(id: string, item: any) {
    await run(
      `UPDATE hero_slides SET title = ?, subtitle = ?, location = ?, image = ?, tag = ?, display_order = ?
       WHERE id = ?`,
      [item.title, item.subtitle, item.location, item.image, item.tag, item.display_order || 0, id]
    );
    return this.getById(id);
  }

  static async delete(id: string) {
    await run('DELETE FROM hero_slides WHERE id = ?', [id]);
    return { success: true };
  }
}

export class ServicesRepository {
  static async getAll() {
    const rows = await query<any>('SELECT * FROM services ORDER BY display_order ASC');
    return rows.map((r) => ({
      ...r,
      galleryImages: JSON.parse(r.galleryImages || '[]'),
      features: JSON.parse(r.features || '[]'),
      deliverables: JSON.parse(r.deliverables || '[]')
    }));
  }

  static async getById(idOrSlug: string) {
    const row = await getOne<any>('SELECT * FROM services WHERE id = ? OR slug = ?', [idOrSlug, idOrSlug]);
    if (!row) return null;
    return {
      ...row,
      galleryImages: JSON.parse(row.galleryImages || '[]'),
      features: JSON.parse(row.features || '[]'),
      deliverables: JSON.parse(row.deliverables || '[]')
    };
  }

  static async create(item: any) {
    const id = item.id || `srv-${Date.now()}`;
    const slug = item.slug || item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    await run(
      `INSERT INTO services (id, title, slug, category, shortDescription, fullDescription, iconName, coverImage, galleryImages, startingPrice, popularTag, features, deliverables, display_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        item.title,
        slug,
        item.category || 'Wedding',
        item.shortDescription,
        item.fullDescription,
        item.iconName || 'Camera',
        item.coverImage,
        JSON.stringify(item.galleryImages || []),
        item.startingPrice,
        item.popularTag || '',
        JSON.stringify(item.features || []),
        JSON.stringify(item.deliverables || []),
        item.display_order || 0
      ]
    );
    return this.getById(id);
  }

  static async update(id: string, item: any) {
    const slug = item.slug || item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    await run(
      `UPDATE services SET title = ?, slug = ?, category = ?, shortDescription = ?, fullDescription = ?, iconName = ?, coverImage = ?, galleryImages = ?, startingPrice = ?, popularTag = ?, features = ?, deliverables = ?, display_order = ?
       WHERE id = ?`,
      [
        item.title,
        slug,
        item.category,
        item.shortDescription,
        item.fullDescription,
        item.iconName,
        item.coverImage,
        JSON.stringify(item.galleryImages || []),
        item.startingPrice,
        item.popularTag || '',
        JSON.stringify(item.features || []),
        JSON.stringify(item.deliverables || []),
        item.display_order || 0,
        id
      ]
    );
    return this.getById(id);
  }

  static async delete(id: string) {
    await run('DELETE FROM services WHERE id = ?', [id]);
    return { success: true };
  }
}

export class PortfolioRepository {
  static async getAll() {
    const rows = await query<any>('SELECT * FROM portfolio_items ORDER BY display_order ASC');
    return rows.map((r) => ({
      ...r,
      tags: JSON.parse(r.tags || '[]'),
      featured: Boolean(r.featured)
    }));
  }

  static async getById(id: string) {
    const row = await getOne<any>('SELECT * FROM portfolio_items WHERE id = ?', [id]);
    if (!row) return null;
    return {
      ...row,
      tags: JSON.parse(row.tags || '[]'),
      featured: Boolean(row.featured)
    };
  }

  static async create(item: any) {
    const id = item.id || `p-${Date.now()}`;
    await run(
      `INSERT INTO portfolio_items (id, title, coupleOrClient, category, location, country, image, width, height, date, cameraInfo, description, tags, featured, display_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        item.title,
        item.coupleOrClient,
        item.category || 'Wedding',
        item.location,
        item.country || 'USA',
        item.image,
        item.width || 1200,
        item.height || 800,
        item.date || new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        item.cameraInfo || '',
        item.description || '',
        JSON.stringify(item.tags || []),
        item.featured ? 1 : 0,
        item.display_order || 0
      ]
    );
    return this.getById(id);
  }

  static async update(id: string, item: any) {
    await run(
      `UPDATE portfolio_items SET title = ?, coupleOrClient = ?, category = ?, location = ?, country = ?, image = ?, width = ?, height = ?, date = ?, cameraInfo = ?, description = ?, tags = ?, featured = ?, display_order = ?
       WHERE id = ?`,
      [
        item.title,
        item.coupleOrClient,
        item.category,
        item.location,
        item.country,
        item.image,
        item.width || 1200,
        item.height || 800,
        item.date,
        item.cameraInfo || '',
        item.description || '',
        JSON.stringify(item.tags || []),
        item.featured ? 1 : 0,
        item.display_order || 0,
        id
      ]
    );
    return this.getById(id);
  }

  static async delete(id: string) {
    await run('DELETE FROM portfolio_items WHERE id = ?', [id]);
    return { success: true };
  }
}

export class VideoRepository {
  static async getAll() {
    return query('SELECT * FROM featured_videos ORDER BY display_order ASC');
  }

  static async getById(id: string) {
    return getOne('SELECT * FROM featured_videos WHERE id = ?', [id]);
  }

  static async create(item: any) {
    const id = item.id || `v-${Date.now()}`;
    await run(
      `INSERT INTO featured_videos (id, title, coupleName, location, duration, thumbnail, videoUrl, category, description, views, display_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        item.title,
        item.coupleName,
        item.location,
        item.duration || '03:30',
        item.thumbnail,
        item.videoUrl,
        item.category || 'Cinematic Film',
        item.description || '',
        item.views || '1.2k views',
        item.display_order || 0
      ]
    );
    return this.getById(id);
  }

  static async update(id: string, item: any) {
    await run(
      `UPDATE featured_videos SET title = ?, coupleName = ?, location = ?, duration = ?, thumbnail = ?, videoUrl = ?, category = ?, description = ?, views = ?, display_order = ?
       WHERE id = ?`,
      [
        item.title,
        item.coupleName,
        item.location,
        item.duration,
        item.thumbnail,
        item.videoUrl,
        item.category,
        item.description,
        item.views,
        item.display_order || 0,
        id
      ]
    );
    return this.getById(id);
  }

  static async delete(id: string) {
    await run('DELETE FROM featured_videos WHERE id = ?', [id]);
    return { success: true };
  }
}

export class TestimonialRepository {
  static async getAll() {
    const rows = await query<any>('SELECT * FROM testimonials ORDER BY display_order ASC');
    return rows.map((r) => ({
      ...r,
      verifiedBooking: Boolean(r.verifiedBooking)
    }));
  }

  static async getById(id: string) {
    const row = await getOne<any>('SELECT * FROM testimonials WHERE id = ?', [id]);
    if (!row) return null;
    return {
      ...row,
      verifiedBooking: Boolean(row.verifiedBooking)
    };
  }

  static async create(item: any) {
    const id = item.id || `t-${Date.now()}`;
    await run(
      `INSERT INTO testimonials (id, clientName, spouseName, eventType, location, avatar, photoUrl, rating, reviewText, weddingDate, verifiedBooking, display_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        item.clientName,
        item.spouseName || '',
        item.eventType,
        item.location,
        item.avatar,
        item.photoUrl,
        item.rating || 5.0,
        item.reviewText,
        item.weddingDate,
        item.verifiedBooking ? 1 : 0,
        item.display_order || 0
      ]
    );
    return this.getById(id);
  }

  static async update(id: string, item: any) {
    await run(
      `UPDATE testimonials SET clientName = ?, spouseName = ?, eventType = ?, location = ?, avatar = ?, photoUrl = ?, rating = ?, reviewText = ?, weddingDate = ?, verifiedBooking = ?, display_order = ?
       WHERE id = ?`,
      [
        item.clientName,
        item.spouseName || '',
        item.eventType,
        item.location,
        item.avatar,
        item.photoUrl,
        item.rating,
        item.reviewText,
        item.weddingDate,
        item.verifiedBooking ? 1 : 0,
        item.display_order || 0,
        id
      ]
    );
    return this.getById(id);
  }

  static async delete(id: string) {
    await run('DELETE FROM testimonials WHERE id = ?', [id]);
    return { success: true };
  }
}

export class TimelineRepository {
  static async getAll() {
    return query('SELECT * FROM timeline_events ORDER BY display_order ASC');
  }

  static async create(item: any) {
    const id = item.id || `tl-${Date.now()}`;
    await run(
      `INSERT INTO timeline_events (id, year, title, subtitle, location, description, badge, image, display_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        item.year,
        item.title,
        item.subtitle,
        item.location,
        item.description,
        item.badge || '',
        item.image || '',
        item.display_order || 0
      ]
    );
    return getOne('SELECT * FROM timeline_events WHERE id = ?', [id]);
  }

  static async update(id: string, item: any) {
    await run(
      `UPDATE timeline_events SET year = ?, title = ?, subtitle = ?, location = ?, description = ?, badge = ?, image = ?, display_order = ?
       WHERE id = ?`,
      [
        item.year,
        item.title,
        item.subtitle,
        item.location,
        item.description,
        item.badge || '',
        item.image || '',
        item.display_order || 0,
        id
      ]
    );
    return getOne('SELECT * FROM timeline_events WHERE id = ?', [id]);
  }

  static async delete(id: string) {
    await run('DELETE FROM timeline_events WHERE id = ?', [id]);
    return { success: true };
  }
}

export class TeamRepository {
  static async getAll() {
    const rows = await query<any>('SELECT * FROM team_members ORDER BY display_order ASC');
    return rows.map((r) => ({
      ...r,
      specialty: JSON.parse(r.specialty || '[]')
    }));
  }

  static async create(item: any) {
    const id = item.id || `tm-${Date.now()}`;
    await run(
      `INSERT INTO team_members (id, name, role, location, bio, image, specialty, gear, display_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        item.name,
        item.role,
        item.location || 'USA',
        item.bio,
        item.image,
        JSON.stringify(item.specialty || []),
        item.gear || '',
        item.display_order || 0
      ]
    );
    return getOne('SELECT * FROM team_members WHERE id = ?', [id]);
  }

  static async update(id: string, item: any) {
    await run(
      `UPDATE team_members SET name = ?, role = ?, location = ?, bio = ?, image = ?, specialty = ?, gear = ?, display_order = ?
       WHERE id = ?`,
      [
        item.name,
        item.role,
        item.location,
        item.bio,
        item.image,
        JSON.stringify(item.specialty || []),
        item.gear || '',
        item.display_order || 0,
        id
      ]
    );
    return getOne('SELECT * FROM team_members WHERE id = ?', [id]);
  }

  static async delete(id: string) {
    await run('DELETE FROM team_members WHERE id = ?', [id]);
    return { success: true };
  }
}

export class InstagramRepository {
  static async getAll() {
    return query('SELECT * FROM instagram_posts ORDER BY display_order ASC');
  }

  static async create(item: any) {
    const id = item.id || `ig-${Date.now()}`;
    await run(
      `INSERT INTO instagram_posts (id, image, likes, comments, caption, url, display_order)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [id, item.image, item.likes || '1.5k', item.comments || '50', item.caption || '', item.url || 'https://instagram.com', item.display_order || 0]
    );
    return getOne('SELECT * FROM instagram_posts WHERE id = ?', [id]);
  }

  static async update(id: string, item: any) {
    await run(
      `UPDATE instagram_posts SET image = ?, likes = ?, comments = ?, caption = ?, url = ?, display_order = ?
       WHERE id = ?`,
      [item.image, item.likes, item.comments, item.caption, item.url, item.display_order || 0, id]
    );
    return getOne('SELECT * FROM instagram_posts WHERE id = ?', [id]);
  }

  static async delete(id: string) {
    await run('DELETE FROM instagram_posts WHERE id = ?', [id]);
    return { success: true };
  }
}

export class BookingsRepository {
  static async getAll() {
    return query('SELECT * FROM bookings ORDER BY createdAt DESC');
  }

  static async create(item: any) {
    const id = item.id || 'UMS-' + Math.floor(100000 + Math.random() * 900000);
    const createdAt = new Date().toISOString();
    await run(
      `INSERT INTO bookings (id, fullName, email, phone, eventType, eventDate, eventLocation, estimatedBudget, guestCount, notes, preferredContact, status, createdAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        item.fullName,
        item.email,
        item.phone,
        item.eventType,
        item.eventDate,
        item.eventLocation,
        item.estimatedBudget,
        item.guestCount || '',
        item.notes || '',
        item.preferredContact || 'WhatsApp',
        'Pending',
        createdAt
      ]
    );
    return getOne('SELECT * FROM bookings WHERE id = ?', [id]);
  }

  static async updateStatus(id: string, status: string) {
    await run('UPDATE bookings SET status = ? WHERE id = ?', [status, id]);
    return getOne('SELECT * FROM bookings WHERE id = ?', [id]);
  }

  static async delete(id: string) {
    await run('DELETE FROM bookings WHERE id = ?', [id]);
    return { success: true };
  }
}

export class ContactRepository {
  static async getAll() {
    return query('SELECT * FROM contact_messages ORDER BY createdAt DESC');
  }

  static async create(item: any) {
    const id = `msg-${Date.now()}`;
    const createdAt = new Date().toISOString();
    await run(
      `INSERT INTO contact_messages (id, name, email, phone, subject, message, office, status, createdAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, item.name, item.email, item.phone, item.subject, item.message, item.office || 'USA', 'Unread', createdAt]
    );
    return getOne('SELECT * FROM contact_messages WHERE id = ?', [id]);
  }

  static async delete(id: string) {
    await run('DELETE FROM contact_messages WHERE id = ?', [id]);
    return { success: true };
  }
}
