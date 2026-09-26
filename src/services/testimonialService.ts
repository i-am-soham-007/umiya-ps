import { TESTIMONIALS } from '../data/mockData';
import { Testimonial } from '../types';

export class TestimonialService {
  /**
   * GET /api/testimonials
   */
  static async getTestimonials(): Promise<Testimonial[]> {
    try {
      const res = await fetch('/api/testimonials');
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        return json.data;
      }
    } catch (err) {
      console.warn('Falling back to local testimonials:', err);
    }
    return TESTIMONIALS;
  }
}
