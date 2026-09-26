import { FEATURED_VIDEOS } from '../data/mockData';
import { VideoItem } from '../types';

export class VideoService {
  /**
   * GET /api/videos
   */
  static async getVideos(): Promise<VideoItem[]> {
    try {
      const res = await fetch('/api/videos');
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        return json.data;
      }
    } catch (err) {
      console.warn('Falling back to local videos:', err);
    }
    return FEATURED_VIDEOS;
  }
}
