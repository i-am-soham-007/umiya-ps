import { STUDIO_STATS, HERO_SLIDES, TIMELINE_EVENTS } from '../data/mockData';
import { StudioStats, TimelineEvent } from '../types';

export class HomeService {
  /**
   * GET /api/home
   * Fetches dynamic home section data from SQLite backend API.
   */
  static async getHomeData(): Promise<{
    stats: StudioStats;
    heroSlides: typeof HERO_SLIDES;
    timeline: TimelineEvent[];
  }> {
    try {
      const res = await fetch('/api/home');
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const json = await res.json();
      if (json.success && json.data) {
        return {
          stats: json.data.stats || STUDIO_STATS,
          heroSlides: json.data.heroSlides?.length ? json.data.heroSlides : HERO_SLIDES,
          timeline: json.data.timeline?.length ? json.data.timeline : TIMELINE_EVENTS
        };
      }
    } catch (err) {
      console.warn('Falling back to initial client state for Home API:', err);
    }

    return {
      stats: STUDIO_STATS,
      heroSlides: HERO_SLIDES,
      timeline: TIMELINE_EVENTS
    };
  }
}
