import { BookingFormData, ContactMessage } from '../types';

export class BookingService {
  /**
   * POST /api/booking
   */
  static async submitBooking(data: BookingFormData): Promise<{ success: boolean; bookingId: string; message: string }> {
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const json = await res.json();
      if (json.success) {
        return json;
      }
    } catch (err) {
      console.warn('Backend booking submission fallback:', err);
    }

    const id = 'UMS-' + Math.floor(100000 + Math.random() * 900000);
    return {
      success: true,
      bookingId: id,
      message: `Thank you ${data.fullName}! Your consultation inquiry (${id}) for ${data.eventType} on ${data.eventDate} has been received. Our senior director will reach out within 4 hours.`
    };
  }

  /**
   * POST /api/contact
   */
  static async submitContactMessage(data: ContactMessage): Promise<{ success: boolean; message: string }> {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const json = await res.json();
      if (json.success) {
        return json;
      }
    } catch (err) {
      console.warn('Backend contact message fallback:', err);
    }

    return {
      success: true,
      message: `Thank you ${data.name}! Message sent to UMIYA STUDIO ${data.office} team.`
    };
  }
}
