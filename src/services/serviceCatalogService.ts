import { SERVICES_LIST } from '../data/mockData';
import { ServiceItem } from '../types';

export class ServiceCatalogService {
  /**
   * GET /api/services
   */
  static async getServices(): Promise<ServiceItem[]> {
    try {
      const res = await fetch('/api/services');
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        return json.data;
      }
    } catch (err) {
      console.warn('Falling back to local services list:', err);
    }
    return SERVICES_LIST;
  }

  /**
   * GET /api/services/:id
   */
  static async getServiceById(idOrSlug: string): Promise<ServiceItem | null> {
    try {
      const res = await fetch(`/api/services/${idOrSlug}`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const json = await res.json();
      if (json.success && json.data) {
        return json.data;
      }
    } catch (err) {
      console.warn('Falling back to local service lookup:', err);
    }
    const found = SERVICES_LIST.find((s) => s.id === idOrSlug || s.slug === idOrSlug);
    return found || null;
  }
}
