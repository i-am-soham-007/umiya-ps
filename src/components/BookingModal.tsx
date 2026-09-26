import React, { useState, useEffect } from 'react';
import { SiteConfig, BookingSubmission } from '../types';
import confetti from 'canvas-confetti';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Camera,
  CheckCircle2,
  Sparkles,
  Video,
  Zap,
  ArrowRight,
  ArrowLeft,
  Download,
  Share2,
  Info,
} from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: SiteConfig;
  initialData?: {
    city?: string;
    category?: string;
    spot?: string;
    photographerId?: string;
    photographerName?: string;
  };
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  config,
  initialData,
}) => {
  const [step, setStep] = useState<number>(1);
  const [category, setCategory] = useState<string>(
    initialData?.category || 'Family'
  );
  const [cityId, setCityId] = useState<string>(
    initialData?.city || config.cities[0].id
  );
  const [spotName, setSpotName] = useState<string>(
    initialData?.spot || ''
  );
  const [selectedDate, setSelectedDate] = useState<string>('2026-04-04');
  const [selectedSlot, setSelectedSlot] = useState<string>('10:00 AM - 10:30 AM');
  const [photographerId, setPhotographerId] = useState<string>(
    initialData?.photographerId || config.photographers[0].id
  );

  // Form inputs
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [attendeesCount, setAttendeesCount] = useState<number>(2);
  const [specialNotes, setSpecialNotes] = useState('');

  // Addons
  const [videoReelAddon, setVideoReelAddon] = useState(true); // default true for rich experience
  const [droneFootageAddon, setDroneFootageAddon] = useState(false);
  const [rushDeliveryAddon, setRushDeliveryAddon] = useState(false);

  // Confirmed booking state
  const [confirmedBooking, setConfirmedBooking] = useState<BookingSubmission | null>(null);

  useEffect(() => {
    if (initialData?.category) setCategory(initialData.category);
    if (initialData?.city) setCityId(initialData.city);
    if (initialData?.spot) setSpotName(initialData.spot);
    if (initialData?.photographerId) setPhotographerId(initialData.photographerId);
  }, [initialData]);

  if (!isOpen) return null;

  const currentCityObj = config.cities.find((c) => c.id === cityId) || config.cities[0];
  const currentCitySpots = config.spots.filter((s) => s.cityId === cityId);
  const currentPhotographer =
    config.photographers.find((p) => p.id === photographerId) ||
    config.photographers[0];

  const timeSlots = [
    '08:30 AM - 09:00 AM (Morning Glow)',
    '09:15 AM - 09:45 AM',
    '10:00 AM - 10:30 AM (Popular)',
    '10:45 AM - 11:15 AM',
    '03:30 PM - 04:00 PM',
    '04:15 PM - 04:45 PM (Golden Hour)',
    '05:00 PM - 05:30 PM (Sunset Golden)',
  ];

  const datesList = [
    { label: 'Saturday, Apr 4', value: '2026-04-04' },
    { label: 'Sunday, Apr 5', value: '2026-04-05' },
    { label: 'Saturday, Apr 11', value: '2026-04-11' },
    { label: 'Sunday, Apr 12', value: '2026-04-12' },
    { label: 'Saturday, Apr 18', value: '2026-04-18' },
  ];

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Finalize booking
      const newBooking: BookingSubmission = {
        id: `UMIYA-${Math.floor(100000 + Math.random() * 900000)}`,
        category,
        city: `${currentCityObj.name}, ${currentCityObj.state}`,
        spot: spotName || (currentCitySpots[0]?.name ?? 'Scenic City Park'),
        date: selectedDate,
        timeSlot: selectedSlot,
        photographerId: currentPhotographer.id,
        photographerName: currentPhotographer.name,
        fullName: fullName || 'Valued Guest',
        email: email || 'guest@example.com',
        phone: phone || '+1 (555) 019-2834',
        attendeesCount,
        specialNotes,
        addons: {
          videoReel: videoReelAddon,
          droneFootage: droneFootageAddon,
          rushDelivery48h: rushDeliveryAddon,
          extraPhotographer: false,
        },
        createdAt: new Date().toISOString(),
        status: 'Confirmed',
      };

      setConfirmedBooking(newBooking);
      setStep(4);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (err) {
        // ignore
      }
    }
  };

  const handleDownloadCalendar = () => {
    if (!confirmedBooking) return;
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Umiya Studio//Photoshoot Reservation//EN
BEGIN:VEVENT
SUMMARY:30-Min Photoshoot with Umiya Studio USA
DESCRIPTION:Photoshoot at ${confirmedBooking.spot} with ${confirmedBooking.photographerName}. Reservation ID: ${confirmedBooking.id}
LOCATION:${confirmedBooking.spot}, ${confirmedBooking.city}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `umiya-photoshoot-${confirmedBooking.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-neutral-200 flex flex-col my-8">
        
        {/* Top Header */}
        <div className="px-6 py-4 bg-[#2D3021] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#DC2626] animate-pulse" />
            <div>
              <h3 className="text-base font-bold text-white leading-tight">
                {step === 4 ? 'Photoshoot Confirmed!' : 'Book 30-Minute Photoshoot'}
              </h3>
              <p className="text-[11px] text-[#D4CEB8]">
                {step === 4 ? 'Zero upfront cost • Pay only for photos you love' : `Step ${step} of 3 • Easy Online Reservation`}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 text-white/80 hover:text-white hover:bg-white/20 transition"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar (Steps 1-3) */}
        {step <= 3 && (
          <div className="w-full bg-[#E6E2D3] h-1.5 flex">
            <div
              className="bg-[#1E3A8A] transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto bg-[#FDFBF7]">
          
          {/* STEP 1: Category, City & Spot */}
          {step === 1 && (
            <form onSubmit={handleNextStep} className="space-y-6">
              <div>
                <h4 className="text-lg font-bold text-[#2D3021] mb-1">
                  1. Choose Session Style & Location
                </h4>
                <p className="text-xs text-[#5C594D]">
                  Select the type of photoshoot you would like and your desired scenic spot.
                </p>
              </div>

              {/* Session Type Grid */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#5C594D]">
                  Session Type
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    'Family',
                    'Couples & Maternity',
                    'Portraits & Headshots',
                    'Events & Parties',
                    'Graduation & Pets',
                    'Cinematic Reel',
                  ].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`p-3 rounded-xl text-xs font-bold text-left border transition-all ${
                        category === cat
                          ? 'border-[#1E3A8A] bg-[#EFF6FF] text-[#2D3021] ring-2 ring-[#1E3A8A]/20'
                          : 'border-[#E6E2D3] bg-white hover:border-[#93C5FD] text-[#5C594D]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Metro City Select */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#5C594D]">
                  Metro City
                </label>
                <select
                  value={cityId}
                  onChange={(e) => {
                    setCityId(e.target.value);
                    setSpotName('');
                  }}
                  className="w-full px-4 py-3 rounded-xl border border-[#E6E2D3] text-sm font-semibold bg-white text-[#2D3021] focus:ring-2 focus:ring-[#1E3A8A] focus:outline-none"
                >
                  {config.cities.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name}, {city.state} ({city.spotCount} locations)
                    </option>
                  ))}
                </select>
              </div>

              {/* Specific Photo Spot */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#5C594D]">
                  Select Scenic Photo Spot
                </label>
                <div className="space-y-2">
                  {currentCitySpots.length > 0 ? (
                    currentCitySpots.map((spot) => (
                      <div
                        key={spot.id}
                        onClick={() => setSpotName(spot.name)}
                        className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                          spotName === spot.name || (!spotName && currentCitySpots[0].name === spot.name)
                            ? 'border-[#1E3A8A] bg-[#EFF6FF] ring-1 ring-[#1E3A8A]'
                            : 'border-[#E6E2D3] bg-white hover:bg-[#FAF8F2]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={spot.coverImage}
                            alt={spot.name}
                            className="w-12 h-12 rounded-lg object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <div className="text-xs font-bold text-[#2D3021]">
                              {spot.name}
                            </div>
                            <div className="text-[11px] text-[#7D796C]">
                              {spot.vibe}
                            </div>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-[#1E3A8A]">
                          {spotName === spot.name ? 'Selected' : 'Choose'}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="p-3 bg-white rounded-xl text-xs text-[#5C594D] border border-[#E6E2D3]">
                      Scenic Downtown & Central Park Hotspots available.
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-[#E6E2D3] flex items-center justify-between">
                <div className="text-xs text-[#5C594D]">
                  Deposit: <strong className="text-[#2D3021]">$0.00</strong>
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-[#1E3A8A] text-white font-bold text-sm hover:bg-[#3D4D1D] transition flex items-center gap-2 shadow-xs"
                >
                  <span>Select Date & Time</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Date & Available 30-min Slot */}
          {step === 2 && (
            <form onSubmit={handleNextStep} className="space-y-6">
              <div>
                <h4 className="text-lg font-bold text-[#2D3021] mb-1">
                  2. Select Date & 30-Minute Time Slot
                </h4>
                <p className="text-xs text-[#5C594D]">
                  Choose an available weekend or weekday slot with optimal outdoor lighting.
                </p>
              </div>

              {/* Date selector chips */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#5C594D] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#1E3A8A]" /> Upcoming Available Dates
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {datesList.map((d) => (
                    <button
                      key={d.value}
                      type="button"
                      onClick={() => setSelectedDate(d.value)}
                      className={`p-3 rounded-xl text-xs font-bold text-center border transition-all ${
                        selectedDate === d.value
                          ? 'border-[#1E3A8A] bg-[#EFF6FF] text-[#1E3A8A] ring-2 ring-[#1E3A8A]/20'
                          : 'border-[#E6E2D3] bg-white hover:border-[#93C5FD] text-[#5C594D]'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time slots */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#5C594D] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#1E3A8A]" /> Available 30-Min Windows
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`p-3 rounded-xl text-xs font-bold text-left border flex items-center justify-between transition-all ${
                        selectedSlot === slot
                          ? 'border-[#1E3A8A] bg-[#EFF6FF] text-[#1E3A8A] ring-1 ring-[#1E3A8A]'
                          : 'border-[#E6E2D3] bg-white hover:bg-[#FAF8F2] text-[#5C594D]'
                      }`}
                    >
                      <span>{slot}</span>
                      {selectedSlot === slot && (
                        <CheckCircle2 className="w-4 h-4 text-[#1E3A8A]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Photographer match preview */}
              <div className="p-4 bg-white rounded-2xl border border-[#E6E2D3] flex items-center gap-3">
                <img
                  src={currentPhotographer.avatar}
                  alt={currentPhotographer.name}
                  className="w-12 h-12 rounded-full object-cover border border-[#E6E2D3]"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="text-xs font-bold text-[#2D3021]">
                    Assigned Pro: {currentPhotographer.name}
                  </div>
                  <div className="text-[11px] text-[#7D796C]">
                    {currentPhotographer.rating} ★ • {currentPhotographer.title}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E6E2D3] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 rounded-xl border border-[#E6E2D3] bg-white text-[#5C594D] text-xs font-bold hover:bg-[#FAF8F2] transition flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-[#1E3A8A] text-white font-bold text-sm hover:bg-[#3D4D1D] transition flex items-center gap-2 shadow-xs"
                >
                  <span>Attendee Details & Add-ons</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Attendee Details & Add-ons */}
          {step === 3 && (
            <form onSubmit={handleNextStep} className="space-y-6">
              <div>
                <h4 className="text-lg font-bold text-[#2D3021] mb-1">
                  3. Contact Info & Optional Add-ons
                </h4>
                <p className="text-xs text-[#5C594D]">
                  Where should we send your private online gallery link and shoot reminder?
                </p>
              </div>

              {/* Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-[#5C594D] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maya Lin"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#E6E2D3] bg-white text-[#2D3021] text-sm font-medium focus:ring-2 focus:ring-[#1E3A8A] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-[#5C594D] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="maya@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#E6E2D3] bg-white text-[#2D3021] text-sm font-medium focus:ring-2 focus:ring-[#1E3A8A] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-[#5C594D] mb-1">
                    Cell Phone (For Day-Of SMS) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 234-5678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#E6E2D3] bg-white text-[#2D3021] text-sm font-medium focus:ring-2 focus:ring-[#1E3A8A] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-[#5C594D] mb-1">
                    Number of Attendees / Pets
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={attendeesCount}
                    onChange={(e) => setAttendeesCount(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#E6E2D3] bg-white text-[#2D3021] text-sm font-medium focus:ring-2 focus:ring-[#1E3A8A] focus:outline-none"
                  />
                </div>
              </div>

              {/* Special Notes */}
              <div>
                <label className="block text-[11px] font-bold uppercase text-[#5C594D] mb-1">
                  Special Requests / Posing Preferences (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Surprise proposal, bringing our golden retriever, prefer candid laughter..."
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E6E2D3] bg-white text-[#2D3021] text-sm font-medium focus:ring-2 focus:ring-[#1E3A8A] focus:outline-none"
                />
              </div>

              {/* Video and Add-ons selection */}
              <div className="space-y-2 pt-2 border-t border-[#E6E2D3]">
                <label className="text-xs font-bold uppercase tracking-wider text-[#5C594D] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#C49A45]" /> Optional Session Enhancements (Pay Later)
                </label>

                {/* 4K YouTube Video Reel Add-on */}
                <div
                  onClick={() => setVideoReelAddon(!videoReelAddon)}
                  className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                    videoReelAddon
                      ? 'border-[#1E3A8A] bg-[#EFF6FF] ring-1 ring-[#1E3A8A]'
                      : 'border-[#E6E2D3] bg-white hover:bg-[#FAF8F2]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#1E3A8A] text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Video className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#2D3021] flex items-center gap-1.5">
                        <span>4K Cinematic Highlight Reel & YouTube Link</span>
                        <span className="px-1.5 py-0.2 bg-[#DC2626] text-white text-[9px] font-extrabold rounded">
                          POPULAR
                        </span>
                      </div>
                      <div className="text-[11px] text-[#5C594D]">
                        30s music-synced vertical reel for Instagram/TikTok + unlisted YouTube link.
                      </div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={videoReelAddon}
                    onChange={() => {}}
                    className="w-4 h-4 accent-[#1E3A8A]"
                  />
                </div>

                {/* 48h Rush Delivery */}
                <div
                  onClick={() => setRushDeliveryAddon(!rushDeliveryAddon)}
                  className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                    rushDeliveryAddon
                      ? 'border-[#1E3A8A] bg-[#EFF6FF] ring-1 ring-[#1E3A8A]'
                      : 'border-[#E6E2D3] bg-white hover:bg-[#FAF8F2]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#2D3021] text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#2D3021]">
                        Priority 48-Hour Gallery Turnaround
                      </div>
                      <div className="text-[11px] text-[#5C594D]">
                        Get your edited digital proof gallery within 2 business days.
                      </div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={rushDeliveryAddon}
                    onChange={() => {}}
                    className="w-4 h-4 accent-[#1E3A8A]"
                  />
                </div>
              </div>

              {/* Reassurance Banner */}
              <div className="p-3 bg-[#EFF6FF] rounded-xl border border-[#93C5FD] text-xs text-[#2D3021] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#1E3A8A] shrink-0" />
                <span>
                  <strong>No upfront payment required!</strong> You only pay for photos or video bundles you love after seeing your proof gallery.
                </span>
              </div>

              <div className="pt-4 border-t border-[#E6E2D3] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2.5 rounded-xl border border-[#E6E2D3] bg-white text-[#5C594D] text-xs font-bold hover:bg-[#FAF8F2] transition flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 rounded-xl bg-[#1E3A8A] text-white font-bold text-sm hover:bg-[#3D4D1D] transition shadow-md flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Confirm Reservation</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Success & Confirmation */}
          {step === 4 && confirmedBooking && (
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 rounded-full bg-[#EFF6FF] text-[#1E3A8A] border border-[#93C5FD] flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h4 className="text-2xl font-extrabold text-[#2D3021]">
                  You're Booked! See You on Location
                </h4>
                <p className="text-xs text-[#7D796C] font-medium">
                  Booking Reference: <span className="font-mono font-bold text-[#2D3021]">{confirmedBooking.id}</span>
                </p>
              </div>

              {/* Booking Summary Box */}
              <div className="bg-white rounded-2xl p-5 border border-[#E6E2D3] text-left space-y-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-[#E6E2D3]">
                  <span className="text-[#7D796C]">Session Type:</span>
                  <span className="font-bold text-[#2D3021]">{confirmedBooking.category}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-[#E6E2D3]">
                  <span className="text-[#7D796C]">Location:</span>
                  <span className="font-bold text-[#2D3021]">{confirmedBooking.spot}, {confirmedBooking.city}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-[#E6E2D3]">
                  <span className="text-[#7D796C]">Date & Window:</span>
                  <span className="font-bold text-[#2D3021]">{confirmedBooking.date} • {confirmedBooking.timeSlot}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-[#E6E2D3]">
                  <span className="text-[#7D796C]">Photographer:</span>
                  <span className="font-bold text-[#1E3A8A]">{confirmedBooking.photographerName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#7D796C]">Upfront Amount Charged:</span>
                  <span className="font-extrabold text-[#1E3A8A] text-sm">$0.00 (Pay Later)</span>
                </div>
              </div>

              {/* Prep Tips */}
              <div className="text-left bg-[#EFF6FF] p-4 rounded-xl border border-[#93C5FD] text-xs text-[#2D3021] space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-[#1E3A8A]">
                  <Info className="w-3.5 h-3.5 text-[#1E3A8A]" /> What happens next:
                </div>
                <p className="text-[#5C594D] leading-relaxed text-[11px]">
                  1. You’ll receive a confirmation email and SMS reminder 24 hours prior.<br />
                  2. Arrive 5 minutes early at the landmark meet spot.<br />
                  3. In 3-5 days, your digital gallery with 40+ photos + 4K video teaser will arrive in your inbox!
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={handleDownloadCalendar}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#2D3021] text-white text-xs font-bold hover:bg-[#3D422E] transition flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Add to Calendar (.ics)</span>
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-3 px-4 rounded-xl bg-white border border-[#E6E2D3] text-[#2D3021] text-xs font-bold hover:bg-[#FAF8F2] transition"
                >
                  Done & Close
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
