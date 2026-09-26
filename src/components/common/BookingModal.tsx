import React, { useState } from 'react';
import { X, Calendar, CheckCircle, Sparkles, MapPin, Send, Phone, Shield } from 'lucide-react';
import { SERVICES_LIST } from '../../data/mockData';
import { BookingService } from '../../services/bookingService';
import { BookingFormData } from '../../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceTitle?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialServiceTitle = 'Wedding Photography'
}) => {
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    email: '',
    phone: '',
    eventType: initialServiceTitle,
    eventDate: '',
    eventLocation: 'USA - California',
    estimatedBudget: '$3,000 - $5,000',
    guestCount: '150-300 Guests',
    notes: '',
    preferredContact: 'WhatsApp'
  });

  const [loading, setLoading] = useState(false);
  const [successResponse, setSuccessResponse] = useState<{
    bookingId: string;
    message: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await BookingService.submitBooking(formData);
      if (res.success) {
        setSuccessResponse({
          bookingId: res.bookingId,
          message: res.message
        });
      }
    } catch (err) {
      console.error('Booking submission error', err);
    } finally {
      setLoading(false);
    }
  };

  const selectedServiceObj = SERVICES_LIST.find((s) => s.title === formData.eventType) || SERVICES_LIST[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-slate-900 max-h-[90vh] flex flex-col">
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-[#0F172A] via-[#1E3A8A] to-[#0F172A] text-white p-6 relative flex justify-between items-start">
          <div>
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-widest bg-[#D62828] text-white uppercase mb-2">
              UMIYA STUDIO USA • DIRECT BOOKING
            </span>
            <h3 className="font-serif text-2xl font-bold">Reserve Your Session & Consultation</h3>
            <p className="text-xs text-slate-300 mt-1">
              Check availability for your dates across USA, India, & Worldwide destinations.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {successResponse ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h4 className="font-serif text-2xl font-bold text-slate-900">Inquiry Received Successfully!</h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                {successResponse.message}
              </p>
              <div className="inline-block bg-slate-100 px-4 py-2 rounded-xl text-xs font-mono text-slate-700">
                Reference ID: <span className="font-bold text-[#1E3A8A]">{successResponse.bookingId}</span>
              </div>
              <div className="pt-4">
                <button
                  onClick={() => {
                    setSuccessResponse(null);
                    onClose();
                  }}
                  className="bg-[#1E3A8A] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#D62828] transition-colors"
                >
                  Return to Website
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Event & Service Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Service Required *</label>
                  <select
                    value={formData.eventType}
                    onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900 font-medium focus:ring-2 focus:ring-[#1E3A8A] outline-none"
                    required
                  >
                    {SERVICES_LIST.map((srv) => (
                      <option key={srv.id} value={srv.title}>
                        {srv.title} ({srv.startingPrice})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Target Date / Month *</label>
                  <input
                    type="date"
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900 font-medium focus:ring-2 focus:ring-[#1E3A8A] outline-none"
                    required
                  />
                </div>
              </div>

              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Priya Sharma"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900 focus:ring-2 focus:ring-[#1E3A8A] outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Phone / WhatsApp Number *</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900 focus:ring-2 focus:ring-[#1E3A8A] outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    placeholder="priya@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900 focus:ring-2 focus:ring-[#1E3A8A] outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Event Location / Venue</label>
                  <input
                    type="text"
                    placeholder="e.g. San Francisco, CA / Udaipur Palace"
                    value={formData.eventLocation}
                    onChange={(e) => setFormData({ ...formData, eventLocation: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900 focus:ring-2 focus:ring-[#1E3A8A] outline-none"
                  />
                </div>
              </div>

              {/* Guest Count & Budget Estimate */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Estimated Budget Range</label>
                  <select
                    value={formData.estimatedBudget}
                    onChange={(e) => setFormData({ ...formData, estimatedBudget: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900 focus:ring-2 focus:ring-[#1E3A8A] outline-none"
                  >
                    <option value="Under $2,000">Under $2,000</option>
                    <option value="$2,000 - $4,000">$2,000 - $4,000</option>
                    <option value="$4,000 - $8,000">$4,000 - $8,000</option>
                    <option value="$8,000+ Luxury Full Coverage">$8,000+ Luxury Full Coverage</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Preferred Contact Method</label>
                  <div className="flex gap-2 pt-1">
                    {(['WhatsApp', 'Phone', 'Email'] as const).map((method) => (
                      <button
                        type="button"
                        key={method}
                        onClick={() => setFormData({ ...formData, preferredContact: method })}
                        className={`flex-1 py-2 rounded-xl font-semibold border transition-all ${
                          formData.preferredContact === method
                            ? 'bg-[#1E3A8A] text-white border-[#1E3A8A]'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Special Notes */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Special Requirements / Event Details</label>
                <textarea
                  rows={2}
                  placeholder="Tell us about your multi-day events, functions, outfit themes, or special drone requirements..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:ring-2 focus:ring-[#1E3A8A] outline-none"
                />
              </div>

              {/* Service Highlights Box */}
              <div className="bg-amber-500/10 border border-amber-300/40 p-3 rounded-2xl flex items-center justify-between text-amber-900">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                  <div>
                    <span className="font-bold">{selectedServiceObj.title}</span> starts at{' '}
                    <span className="font-extrabold text-[#D62828]">{selectedServiceObj.startingPrice}</span>
                  </div>
                </div>
                <span className="text-[10px] text-slate-500 font-medium hidden sm:inline">Includes 4K Retouched Edits</span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1E3A8A] hover:bg-[#D62828] text-white py-3.5 rounded-2xl font-bold text-sm shadow-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <span>Securing Calendar Slot...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Confirm Consultation Request</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 pt-1">
                <Shield className="w-3 h-3 text-emerald-500" />
                <span>Zero Spam Guarantee • Private & Confidential Inquiry</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
