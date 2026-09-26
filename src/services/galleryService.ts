import { PORTFOLIO_GALLERY } from '../data/mockData';
import { PortfolioItem } from '../types';

export class GalleryService {
  /**
   * GET /api/portfolio
   */
  static async getGallery(category?: string): Promise<PortfolioItem[]> {
    try {
      const res = await fetch('/api/portfolio');
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        let items: PortfolioItem[] = json.data;
        if (category && category !== 'All') {
          items = items.filter((item) => item.category === category);
        }
        return items;
      }
    } catch (err) {
      console.warn('Falling back to local gallery:', err);
    }

    if (!category || category === 'All') {
      return PORTFOLIO_GALLERY;
    }
    return PORTFOLIO_GALLERY.filter((item) => item.category === category);
  }

  /**
   * GET /api/portfolio (featured)
   */
  static async getFeaturedItems(): Promise<PortfolioItem[]> {
    const all = await this.getGallery();
    return all.filter((i) => i.featured);
  }
}
