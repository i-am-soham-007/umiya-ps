import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Send,
  MessageSquare,
  Globe,
  Clock,
  CheckCircle,
  Map,
  Compass
} from 'lucide-react';
import { BookingService } from '../../services/bookingService';
import { ContactMessage } from '../../types';

export const ContactSection: React.FC = () => {
  const [mapLocation, setMapLocation] = useState<'USA' | 'INDIA'>('USA');
  const [mapType, setMapType] = useState<'Road' | 'Satellite'>('Road');

  const [contactData, setContactData] = useState<ContactMessage>({
    name: '',
    email: '',
    phone: '',
    subject: 'General Photography Inquiry',
    message: '',
    office: 'USA'
  });

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await BookingService.submitContactMessage(contactData);
      if (res.success) {
        setFeedback(res.message);
        setContactData({
          name: '',
          email: '',
          phone: '',
          subject: 'General Photography Inquiry',
          message: '',
          office: 'USA'
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#FAF8F5] text-[#1E293B] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest bg-blue-100 text-[#1E3A8A] uppercase border border-blue-200">
            CONNECT WITH US
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900">
            Get In Touch
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Our offices are situated in New Jersey & California (USA) and Gujarat & Mumbai (India).
          </p>
        </div>

        {/* Form & Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Form */}
          <div className="lg:col-span-6 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xl space-y-6">
            <h3 className="font-serif text-2xl font-bold text-slate-900">Send an Inquiry Message</h3>

            {feedback ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-center space-y-3">
                <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-lg">Message Sent!</h4>
                <p className="text-xs">{feedback}</p>
                <button
                  onClick={() => setFeedback(null)}
                  className="mt-2 text-xs font-bold text-[#1E3A8A] underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Your Name *</label>
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={contactData.name}
                      onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={contactData.phone}
                      onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    placeholder="name@domain.com"
                    value={contactData.email}
                    onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Preferred Office</label>
                    <select
                      value={contactData.office}
                      onChange={(e) => setContactData({ ...contactData, office: e.target.value as any })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                    >
                      <option value="USA">USA Office (EDISON, NJ / CA)</option>
                      <option value="India">India Office (AHMEDABAD / MUMBAI)</option>
                      <option value="Both">Both (International Destination)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Subject</label>
                    <input
                      type="text"
                      value={contactData.subject}
                      onChange={(e) => setContactData({ ...contactData, subject: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Your Message</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your event dates, venue locations, or specialized photo requests..."
                    value={contactData.message}
                    onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#1E3A8A] hover:bg-[#D62828] text-white py-3.5 rounded-2xl font-bold text-sm shadow-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Sending Message...' : 'Submit Message'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Map Placeholder & Studio Location Cards */}
          <div className="lg:col-span-6 space-y-6">
            {/* Interactive Map Simulator */}
            <div className="bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-xl p-4 text-white space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#D62828]" />
                  <h4 className="font-serif font-bold text-base">
                    {mapLocation === 'USA' ? 'USA Studio Headquarters' : 'India Studio Headquarters'}
                  </h4>
                </div>

                {/* Switch Location Tabs */}
                <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl text-xs font-semibold">
                  <button
                    onClick={() => setMapLocation('USA')}
                    className={`px-3 py-1 rounded-lg transition-colors ${
                      mapLocation === 'USA' ? 'bg-[#1E3A8A] text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    USA
                  </button>
                  <button
                    onClick={() => setMapLocation('INDIA')}
                    className={`px-3 py-1 rounded-lg transition-colors ${
                      mapLocation === 'INDIA' ? 'bg-[#D62828] text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    India
                  </button>
                </div>
              </div>

              {/* Map Graphic Box */}
              <div className="relative h-64 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center p-6 text-center">
                <img
                  src={
                    mapLocation === 'USA'
                      ? 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80'
                      : 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80'
                  }
                  alt="Map Location"
                  className="absolute inset-0 w-full h-full object-cover opacity-30"
                  referrerPolicy="no-referrer"
                />

                <div className="relative z-10 bg-slate-900/90 backdrop-blur-md p-6 rounded-2xl border border-slate-700 max-w-sm space-y-2">
                  <span className="text-[10px] font-mono text-amber-400 tracking-widest uppercase">
                    GOOGLE MAPS LOCATOR
                  </span>
                  <h5 className="font-serif font-bold text-lg text-white">
                    {mapLocation === 'USA'
                      ? '120 Wood Avenue South, Edison, NJ 08837'
                      : 'SG Highway, Bodakdev, Ahmedabad, Gujarat 380054'}
                  </h5>
                  <p className="text-xs text-slate-300">
                    {mapLocation === 'USA'
                      ? 'Branch Office: San Jose, CA (By Appointment Only)'
                      : 'Branch Office: Bandra West, Mumbai'}
                  </p>
                  <div className="pt-2 flex items-center justify-center gap-2 text-xs font-bold text-emerald-400">
                    <Compass className="w-4 h-4" />
                    <span>GPS Navigation Ready</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Contact Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                <Phone className="w-5 h-5 text-[#1E3A8A]" />
                <h5 className="font-bold text-slate-900 text-sm">USA Toll-Free Hotline</h5>
                <p className="text-slate-600">+1 (800) 555-UMIYA (8649)</p>
                <p className="text-slate-400 text-[11px]">Mon - Sat: 9 AM - 8 PM EST</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                <MessageSquare className="w-5 h-5 text-emerald-600" />
                <h5 className="font-bold text-slate-900 text-sm">WhatsApp Instant Chat</h5>
                <p className="text-slate-600">+1 (201) 555-0199</p>
                <p className="text-slate-400 text-[11px]">24/7 Concierge Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
