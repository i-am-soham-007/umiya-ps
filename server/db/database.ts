import fs from 'fs';
import path from 'path';
import pg from 'pg';
import { dbConfig } from '../config/database';
import {
  STUDIO_STATS,
  HERO_SLIDES,
  SERVICES_LIST,
  PORTFOLIO_GALLERY,
  FEATURED_VIDEOS,
  TESTIMONIALS,
  TIMELINE_EVENTS,
  INSTAGRAM_POSTS,
  TEAM_MEMBERS
} from '../../src/data/mockData';

const { Pool } = pg;

let pgPool: pg.Pool | null = null;
let usePg = false;

// Check if PostgreSQL environment parameters exist
if (process.env.DATABASE_URL || (process.env.PGHOST && process.env.PGDATABASE)) {
  try {
    pgPool = new Pool({
      connectionString: dbConfig.connectionString,
      host: dbConfig.host,
      port: dbConfig.port,
      user: dbConfig.user,
      password: dbConfig.password,
      database: dbConfig.database,
      ssl: dbConfig.ssl ? { rejectUnauthorized: false } : undefined
    });
    usePg = true;
    console.log(`🔌 PostgreSQL Driver enabled. Target database: ${dbConfig.database}`);
  } catch (err) {
    console.warn('⚠️ Could not initialize PostgreSQL Pool, falling back to local database store:', err);
    usePg = false;
  }
}

const dbFilePath = path.resolve(process.cwd(), 'umiya_studio_db.json');

// In-memory data store structure for local mode
let store: Record<string, any[]> = {
  studio_stats: [],
  hero_slides: [],
  services: [],
  portfolio_items: [],
  featured_videos: [],
  testimonials: [],
  timeline_events: [],
  instagram_posts: [],
  team_members: [],
  bookings: [],
  contact_messages: []
};

function saveDb() {
  try {
    fs.writeFileSync(dbFilePath, JSON.stringify(store, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to save local database file:', err);
  }
}

function loadDb() {
  try {
    if (fs.existsSync(dbFilePath)) {
      const content = fs.readFileSync(dbFilePath, 'utf-8');
      const loaded = JSON.parse(content);
      store = { ...store, ...loaded };
    }
  } catch (err) {
    console.error('Failed to load local database file, using default state:', err);
  }
}

export async function initDatabase() {
  if (usePg && pgPool) {
    try {
      // Test PostgreSQL Connection
      const res = await pgPool.query('SELECT NOW()');
      console.log('✅ PostgreSQL connected successfully at:', res.rows[0].now);

      // Auto-run PostgreSQL table creations if they don't exist
      const schemaSqlPath = path.resolve(process.cwd(), 'server', 'db', 'schema.sql');
      if (fs.existsSync(schemaSqlPath)) {
        const ddl = fs.readFileSync(schemaSqlPath, 'utf-8');
        await pgPool.query(ddl);
        console.log('✅ PostgreSQL Schema verified.');
      }
      return;
    } catch (pgErr) {
      console.warn('⚠️ PostgreSQL connection failed. Falling back to local storage engine:', (pgErr as Error).message);
      usePg = false;
    }
  }

  console.log('Initializing Local File Engine...');
  loadDb();

  // Seed default data if tables are empty
  if (!store.studio_stats || store.studio_stats.length === 0) {
    store.studio_stats = [{ id: 'main', ...STUDIO_STATS }];
  }

  if (!store.hero_slides || store.hero_slides.length === 0) {
    store.hero_slides = HERO_SLIDES.map((s, idx) => ({ ...s, display_order: idx }));
  }

  if (!store.services || store.services.length === 0) {
    store.services = SERVICES_LIST.map((s, idx) => ({
      ...s,
      galleryImages: JSON.stringify(s.galleryImages || []),
      features: JSON.stringify(s.features || []),
      deliverables: JSON.stringify(s.deliverables || []),
      display_order: idx
    }));
  }

  if (!store.portfolio_items || store.portfolio_items.length === 0) {
    store.portfolio_items = PORTFOLIO_GALLERY.map((p, idx) => ({
      ...p,
      tags: JSON.stringify(p.tags || []),
      featured: p.featured ? 1 : 0,
      display_order: idx
    }));
  }

  if (!store.featured_videos || store.featured_videos.length === 0) {
    store.featured_videos = FEATURED_VIDEOS.map((v, idx) => ({ ...v, display_order: idx }));
  }

  if (!store.testimonials || store.testimonials.length === 0) {
    store.testimonials = TESTIMONIALS.map((t, idx) => ({
      ...t,
      verifiedBooking: t.verifiedBooking ? 1 : 0,
      display_order: idx
    }));
  }

  if (!store.timeline_events || store.timeline_events.length === 0) {
    store.timeline_events = TIMELINE_EVENTS.map((e, idx) => ({
      id: (e as any).id || `tl-${idx}`,
      ...e,
      badge: e.badge || '',
      image: e.image || '',
      display_order: idx
    }));
  }

  if (!store.instagram_posts || store.instagram_posts.length === 0) {
    store.instagram_posts = INSTAGRAM_POSTS.map((i, idx) => ({ ...i, display_order: idx }));
  }

  if (!store.team_members || store.team_members.length === 0) {
    store.team_members = TEAM_MEMBERS.map((tm, idx) => ({
      ...tm,
      specialty: JSON.stringify(tm.specialty || []),
      display_order: idx
    }));
  }

  if (!store.bookings) store.bookings = [];
  if (!store.contact_messages) store.contact_messages = [];

  saveDb();
  console.log('Database initialized successfully.');
}

// SQL helper functions with pattern matching for seamless repository compatibility
export async function query<T = any>(sql: string, params: any[] = []): Promise<T[]> {
  if (usePg && pgPool) {
    try {
      // Convert ? placeholders to $1, $2 for PostgreSQL
      let paramCount = 0;
      const pgSql = sql.replace(/\?/g, () => `$${++paramCount}`);
      const res = await pgPool.query(pgSql, params);
      return res.rows as T[];
    } catch (err) {
      console.error('PostgreSQL Query Error:', err);
    }
  }

  const cleanSql = sql.trim();
  const fromMatch = cleanSql.match(/FROM\s+([a_z0-9_]+)/i);
  if (!fromMatch) return [];
  const table = fromMatch[1];
  let rows = store[table] ? [...store[table]] : [];

  if (cleanSql.includes('WHERE')) {
    if (cleanSql.includes('id = ? OR slug = ?')) {
      const paramVal = params[0];
      rows = rows.filter((r) => r.id === paramVal || r.slug === paramVal);
    } else if (cleanSql.includes('id = ?')) {
      rows = rows.filter((r) => r.id === params[0]);
    }
  }

  if (cleanSql.includes('ORDER BY')) {
    if (cleanSql.includes('display_order ASC')) {
      rows.sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));
    } else if (cleanSql.includes('createdAt DESC')) {
      rows.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
    }
  }

  return rows as T[];
}

export async function getOne<T = any>(sql: string, params: any[] = []): Promise<T | null> {
  const rows = await query<T>(sql, params);
  return rows.length > 0 ? rows[0] : null;
}

export async function run(sql: string, params: any[] = []): Promise<{ lastID: number; changes: number }> {
  if (usePg && pgPool) {
    try {
      let paramCount = 0;
      const pgSql = sql.replace(/\?/g, () => `$${++paramCount}`);
      const res = await pgPool.query(pgSql, params);
      return { lastID: Date.now(), changes: res.rowCount || 1 };
    } catch (err) {
      console.error('PostgreSQL Exec Error:', err);
    }
  }

  const cleanSql = sql.trim();

  // 1. INSERT INTO
  if (cleanSql.toUpperCase().startsWith('INSERT INTO')) {
    const tableMatch = cleanSql.match(/INSERT\s+INTO\s+([a_z0-9_]+)\s*\(([^)]+)\)/i);
    if (tableMatch) {
      const table = tableMatch[1];
      const cols = tableMatch[2].split(',').map((c) => c.trim());

      const record: Record<string, any> = {};
      cols.forEach((col, i) => {
        record[col] = params[i] !== undefined ? params[i] : null;
      });

      if (!store[table]) store[table] = [];
      store[table].push(record);
      saveDb();
      return { lastID: Date.now(), changes: 1 };
    }
  }

  // 2. UPDATE
  if (cleanSql.toUpperCase().startsWith('UPDATE')) {
    const tableMatch = cleanSql.match(/UPDATE\s+([a_z0-9_]+)\s+SET\s+(.+)\s+WHERE\s+(.+)/i);
    if (tableMatch) {
      const table = tableMatch[1];
      const setClause = tableMatch[2];
      const whereClause = tableMatch[3];

      const setCols = setClause.split(',').map((part) => part.split('=')[0].trim());
      const targetId = params[params.length - 1];

      if (store[table]) {
        let updatedCount = 0;
        store[table] = store[table].map((row) => {
          let matches = false;
          if (whereClause.includes("id = 'main'")) {
            matches = row.id === 'main';
          } else if (whereClause.includes('id = ?')) {
            matches = row.id === targetId;
          }

          if (matches) {
            updatedCount++;
            const updatedRow = { ...row };
            setCols.forEach((col, i) => {
              updatedRow[col] = params[i];
            });
            return updatedRow;
          }
          return row;
        });

        if (updatedCount > 0) saveDb();
        return { lastID: 0, changes: updatedCount };
      }
    }
  }

  // 3. DELETE
  if (cleanSql.toUpperCase().startsWith('DELETE FROM')) {
    const tableMatch = cleanSql.match(/DELETE\s+FROM\s+([a_z0-9_]+)\s+WHERE\s+id\s*=\s*\?/i);
    if (tableMatch) {
      const table = tableMatch[1];
      const targetId = params[0];

      if (store[table]) {
        const initialLen = store[table].length;
        store[table] = store[table].filter((r) => r.id !== targetId);
        const changes = initialLen - store[table].length;
        if (changes > 0) saveDb();
        return { lastID: 0, changes };
      }
    }
  }

  return { lastID: 0, changes: 0 };
}
