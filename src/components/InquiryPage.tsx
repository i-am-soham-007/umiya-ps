import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SiteConfig, BookingSubmission } from '../types';
import confetti from 'canvas-confetti';
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Camera,
  CheckCircle2,
  Sparkles,
  Video,
  ShieldCheck,
  Zap,
  ArrowRight,
  Download,
  Share2,
  Check,
  User,
  Mail,
  Phone,
  MessageSquare,
  Award,
  DollarSign,
  Heart,
  RotateCcw,
} from 'lucide-react';

interface InquiryPageProps {
  config: SiteConfig;
  initialData?: {
    city?: string;
    category?: string;
    spot?: string;
    photographerId?: string;
    photographerName?: string;
    storyTitle?: string;
  };
  onBack: () => void;
  onNavigateHome: () => void;
}

export const InquiryPage: React.FC<InquiryPageProps> = ({
  config,
  initialData,
  onBack,
  onNavigateHome,
}) => {
  const [step, setStep] = useState<number>(1);
  const [category, setCategory] = useState<string>(
    initialData?.category || 'Couples & Proposals'
  );
  const [cityId, setCityId] = useState<string>(
    initialData?.city
      ? config.cities.find(
          (c) =>
            c.name.toLowerCase().includes(initialData.city!.toLowerCase()) ||
            initialData.city!.toLowerCase().includes(c.name.toLowerCase())
        )?.id || config.cities[0].id
      : config.cities[0].id
  );
  const [spotName, setSpotName] = useState<string>(initialData?.spot || '');
  const [selectedDate, setSelectedDate] = useState<string>('2026-04-04');
  const [selectedSlot, setSelectedSlot] = useState<string>('10:00 AM - 10:30 AM');
  const [photographerId, setPhotographerId] = useState<string>(
    initialData?.photographerId || config.photographers[0].id
  );

  // Contact inputs
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [attendeesCount, setAttendeesCount] = useState<number>(2);
  const [specialNotes, setSpecialNotes] = useState(
    initialData?.storyTitle
      ? `Inspired by the "${initialData.storyTitle}" shoot style.`
      : ''
  );

  // Addons
  const [videoReelAddon, setVideoReelAddon] = useState(true);
  const [droneFootageAddon, setDroneFootageAddon] = useState(false);
  const [rushDeliveryAddon, setRushDeliveryAddon] = useState(false);

  // Confirmed booking state
  const [confirmedBooking, setConfirmedBooking] = useState<BookingSubmission | null>(
    null
  );

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Synchronize when initialData changes
  useEffect(() => {
    if (initialData?.category) setCategory(initialData.category);
    if (initialData?.city) {
      const match = config.cities.find(
        (c) =>
          c.name.toLowerCase().includes(initialData.city!.toLowerCase()) ||
          initialData.city!.toLowerCase().includes(c.name.toLowerCase())
      );
      if (match) setCityId(match.id);
    }
    if (initialData?.spot) setSpotName(initialData.spot);
    if (initialData?.photographerId) setPhotographerId(initialData.photographerId);
    if (initialData?.storyTitle) {
      setSpecialNotes(`Inspired by the "${initialData.storyTitle}" shoot style.`);
    }
  }, [initialData, config.cities]);

  const currentCityObj =
    config.cities.find((c) => c.id === cityId) || config.cities[0];
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
    { label: 'Sunday, Apr 19', value: '2026-04-19' },
    { label: 'Saturday, Apr 25', value: '2026-04-25' },
  ];

  const categories = [
    'Couples & Proposals',
    'Family & Kids',
    'Portraits & Headshots',
    'Maternity & Newborn',
    'Weddings & Events',
    'Graduations & Pets',
  ];

  // Calculate upfront cost
  const upfrontTotal =
    (videoReelAddon ? 45 : 0) +
    (droneFootageAddon ? 75 : 0) +
    (rushDeliveryAddon ? 35 : 0);

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !email || !phone) {
      alert('Please fill in your name, email, and mobile phone number.');
      return;
    }

    const newBooking: BookingSubmission = {
      id: `UMIYA-${Math.floor(100000 + Math.random() * 900000)}`,
      category,
      city: currentCityObj.name,
      spot: spotName || currentCitySpots[0]?.name || 'City Highlights Spot',
      date: selectedDate,
      timeSlot: selectedSlot,
      photographerId,
      photographerName: currentPhotographer.name,
      fullName,
      email,
      phone,
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

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#1E3A8A', '#DC2626', '#93C5FD', '#F4A261', '#E76F51'],
      });
    } catch {
      // ignore
    }
  };

  const handleDownloadCalendar = () => {
    if (!confirmedBooking) return;
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Umiya Studio//Photoshoot Booking//EN
BEGIN:VEVENT
SUMMARY:Umiya Studio 30-Min ${confirmedBooking.category} Shoot
DESCRIPTION:Your photoshoot with ${confirmedBooking.photographerName} at ${confirmedBooking.spot}, ${confirmedBooking.city}. Confirmation ID: ${confirmedBooking.id}.
LOCATION:${confirmedBooking.spot}, ${confirmedBooking.city}
DTSTART:${confirmedBooking.date.replace(/-/g, '')}T150000Z
DTEND:${confirmedBooking.date.replace(/-/g, '')}T153000Z
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
    <div className="min-h-screen bg-[#FDFBF7] text-[#2D3021] pb-24">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#E6E2D3] py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white hover:bg-[#EFF6FF] text-xs sm:text-sm font-bold text-[#2D3021] border border-[#93C5FD] shadow-2xs hover:scale-105 active:scale-95 transition-all group"
          >
            <ArrowLeft className="w-4 h-4 text-[#1E3A8A] group-hover:-translate-x-1 transition-transform" />
            <span>Back</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-bold text-[#1E3A8A] bg-[#EFF6FF] px-3.5 py-1.5 rounded-full border border-[#93C5FD]">
            <ShieldCheck className="w-4 h-4 text-[#DC2626]" />
            <span>Shoott Model: $0 Free Shoot • $15 Per Photo</span>
          </div>

          <button
            onClick={onNavigateHome}
            className="text-xs font-bold text-[#5C594D] hover:text-[#2D3021] transition hidden sm:inline"
          >
            Home
          </button>
        </div>
      </header>

      {/* Main Form Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        {/* If Confirmed, Show Success Screen */}
        {confirmedBooking ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="p-8 sm:p-12 rounded-3xl bg-white border border-[#93C5FD] shadow-xl text-center space-y-6 max-w-2xl mx-auto"
          >
            <div className="w-20 h-20 rounded-full bg-[#EFF6FF] text-[#1E3A8A] flex items-center justify-center mx-auto ring-8 ring-[#EFF6FF]/50">
              <CheckCircle2 className="w-10 h-10 text-[#1E3A8A]" />
            </div>

            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFF6FF] text-[#1E3A8A] text-xs font-extrabold uppercase tracking-wider">
                Booking Confirmed • Zero Upfront Cost
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2D3021]">
                You&apos;re All Set, {confirmedBooking.fullName.split(' ')[0]}!
              </h1>
              <p className="text-xs sm:text-sm text-[#5C594D] max-w-md mx-auto">
                We sent a confirmation email & SMS to <strong className="text-[#2D3021]">{confirmedBooking.email}</strong>. Your photographer will meet you at the designated spot.
              </p>
            </div>

            {/* Booking Details Card */}
            <div className="p-5 rounded-2xl bg-[#FAF9F5] border border-[#E6E2D3] text-left space-y-3 text-xs sm:text-sm">
              <div className="flex items-center justify-between pb-2 border-b border-[#E6E2D3]">
                <span className="text-[#8C887B] font-semibold">Confirmation Code</span>
                <span className="font-mono font-extrabold text-[#1E3A8A] bg-white px-2.5 py-1 rounded-md border border-[#93C5FD]">
                  {confirmedBooking.id}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#8C887B] font-semibold">Session Type</span>
                <span className="font-bold text-[#2D3021]">{confirmedBooking.category}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#8C887B] font-semibold">Date & Slot</span>
                <span className="font-bold text-[#2D3021]">{confirmedBooking.date} • {confirmedBooking.timeSlot}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#8C887B] font-semibold">Location</span>
                <span className="font-bold text-[#2D3021]">{confirmedBooking.spot}, {confirmedBooking.city}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#8C887B] font-semibold">Assigned Photographer</span>
                <span className="font-bold text-[#2D3021]">{confirmedBooking.photographerName}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={handleDownloadCalendar}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#1E3A8A] text-white text-xs sm:text-sm font-bold shadow-md hover:bg-[#3B4B1C] transition"
              >
                <Download className="w-4 h-4" />
                <span>Add to Calendar (.ics)</span>
              </button>

              <button
                onClick={onNavigateHome}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#2D3021] text-xs sm:text-sm font-bold border border-[#93C5FD] transition"
              >
                <span>Return to Home</span>
              </button>
            </div>
          </motion.div>
        ) : (
          /* Step-by-Step Inquiry Wizard Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Main Form Column (8 Cols) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Context Banner if redirected from story */}
              {initialData?.storyTitle && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-2xl bg-[#EFF6FF] border border-[#93C5FD] flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <Sparkles className="w-4 h-4 text-[#1E3A8A] shrink-0" />
                    <div>
                      <span className="font-bold text-[#2D3021]">Pre-filled from Story:</span>{' '}
                      <span className="text-[#1E3A8A] font-extrabold">{initialData.storyTitle}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold bg-white px-2 py-0.5 rounded-full border border-[#93C5FD] text-[#5C594D]">
                    {initialData.category}
                  </span>
                </motion.div>
              )}

              {/* Step Progress Indicators */}
              <div className="flex items-center justify-between border-b border-[#E6E2D3] pb-4">
                {[
                  { num: 1, label: 'Session & Spot' },
                  { num: 2, label: 'Date & Time' },
                  { num: 3, label: 'Photographer & Reels' },
                  { num: 4, label: 'Your Details' },
                ].map((s) => (
                  <button
                    key={s.num}
                    onClick={() => setStep(s.num)}
                    className={`flex items-center gap-2 text-xs font-bold transition ${
                      step === s.num
                        ? 'text-[#1E3A8A]'
                        : step > s.num
                        ? 'text-[#DC2626]'
                        : 'text-[#8C887B]'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] ${
                        step === s.num
                          ? 'bg-[#1E3A8A] text-white shadow-xs'
                          : step > s.num
                          ? 'bg-[#DC2626] text-white'
                          : 'bg-[#EAE6D8] text-[#7D796C]'
                      }`}
                    >
                      {step > s.num ? '✓' : s.num}
                    </div>
                    <span className="hidden sm:inline">{s.label}</span>
                  </button>
                ))}
              </div>

              {/* Form Body Steps */}
              <form onSubmit={handleSubmitInquiry} className="space-y-6">
                
                {/* STEP 1: Category & Spot */}
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-[#E6E2D3] shadow-xs"
                  >
                    <div>
                      <h2 className="text-xl font-extrabold text-[#2D3021]">
                        1. Select Your Photoshoot Category & City
                      </h2>
                      <p className="text-xs sm:text-sm text-[#5C594D]">
                        Choose the style of session you would like to book for your 30-minute mini shoot.
                      </p>
                    </div>

                    {/* Category Selection Grid */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#5C594D] uppercase tracking-wider">
                        Photography Style
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {categories.map((cat) => (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => setCategory(cat)}
                            className={`p-3 rounded-xl text-left text-xs font-bold border transition ${
                              category === cat
                                ? 'bg-[#EFF6FF] text-[#1E3A8A] border-[#1E3A8A] ring-2 ring-[#1E3A8A]/20'
                                : 'bg-[#FAF9F5] text-[#2D3021] border-[#E6E2D3] hover:border-[#DC2626]'
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* City Selection Grid */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#5C594D] uppercase tracking-wider">
                        Metro Area
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {config.cities.map((city) => (
                          <button
                            key={city.id}
                            type="button"
                            onClick={() => {
                              setCityId(city.id);
                              setSpotName('');
                            }}
                            className={`p-3 rounded-xl text-left text-xs font-bold border transition ${
                              cityId === city.id
                                ? 'bg-[#1E3A8A] text-white border-[#1E3A8A] shadow-xs'
                                : 'bg-[#FAF9F5] text-[#2D3021] border-[#E6E2D3] hover:border-[#DC2626]'
                            }`}
                          >
                            <div>{city.name}</div>
                            <div className="text-[10px] opacity-80">{city.state}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Spot Selector */}
                    {currentCitySpots.length > 0 && (
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-[#5C594D] uppercase tracking-wider">
                          Scenic Location Spot in {currentCityObj.name}
                        </label>
                        <select
                          value={spotName}
                          onChange={(e) => setSpotName(e.target.value)}
                          className="w-full p-3 rounded-xl bg-[#FAF9F5] border border-[#E6E2D3] text-xs sm:text-sm font-semibold text-[#2D3021] focus:outline-none focus:border-[#1E3A8A]"
                        >
                          <option value="">Select a popular spot (or let photographer suggest)</option>
                          {currentCitySpots.map((s) => (
                            <option key={s.id} value={s.name}>
                              {s.name} ({s.vibe})
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    <div className="flex justify-end pt-4">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1E3A8A] text-white text-xs sm:text-sm font-bold hover:bg-[#3B4B1C] transition shadow-md"
                      >
                        <span>Next: Pick Date & Slot</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: Date & Time */}
                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-[#E6E2D3] shadow-xs"
                  >
                    <div>
                      <h2 className="text-xl font-extrabold text-[#2D3021]">
                        2. Choose Shoot Date & 30-Minute Time Slot
                      </h2>
                      <p className="text-xs sm:text-sm text-[#5C594D]">
                        Select when you would like to meet your pro photographer in {currentCityObj.name}.
                      </p>
                    </div>

                    {/* Date Selector */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#5C594D] uppercase tracking-wider">
                        Available Weekend & Weekday Dates
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {datesList.map((d) => (
                          <button
                            key={d.value}
                            type="button"
                            onClick={() => setSelectedDate(d.value)}
                            className={`p-3 rounded-xl text-left text-xs font-bold border transition ${
                              selectedDate === d.value
                                ? 'bg-[#EFF6FF] text-[#1E3A8A] border-[#1E3A8A] ring-2 ring-[#1E3A8A]/20'
                                : 'bg-[#FAF9F5] text-[#2D3021] border-[#E6E2D3] hover:border-[#DC2626]'
                            }`}
                          >
                            <Calendar className="w-3.5 h-3.5 mb-1 text-[#DC2626]" />
                            <div>{d.label}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Slot Selector */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#5C594D] uppercase tracking-wider">
                        30-Minute Time Window
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedSlot(slot)}
                            className={`p-3 rounded-xl text-left text-xs font-bold border transition flex items-center justify-between ${
                              selectedSlot === slot
                                ? 'bg-[#1E3A8A] text-white border-[#1E3A8A] shadow-xs'
                                : 'bg-[#FAF9F5] text-[#2D3021] border-[#E6E2D3] hover:border-[#DC2626]'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <Clock className="w-3.5 h-3.5" />
                              <span>{slot}</span>
                            </div>
                            {selectedSlot === slot && <Check className="w-4 h-4" />}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between pt-4">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="px-5 py-3 rounded-xl text-xs font-bold text-[#5C594D] hover:bg-[#F2F0E6] transition"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1E3A8A] text-white text-xs sm:text-sm font-bold hover:bg-[#3B4B1C] transition shadow-md"
                      >
                        <span>Next: Photographer & Add-ons</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: Photographer & 4K Reel Add-ons */}
                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-[#E6E2D3] shadow-xs"
                  >
                    <div>
                      <h2 className="text-xl font-extrabold text-[#2D3021]">
                        3. Match Photographer & Optional Video Reel
                      </h2>
                      <p className="text-xs sm:text-sm text-[#5C594D]">
                        Every shoot includes high-resolution photography. You can optionally add a 4K Cinematic Reel!
                      </p>
                    </div>

                    {/* Photographer Picker */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#5C594D] uppercase tracking-wider">
                        Select Your Pro Photographer
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {config.photographers.map((p) => (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => setPhotographerId(p.id)}
                            className={`p-3.5 rounded-2xl text-left border transition flex items-center gap-3 ${
                              photographerId === p.id
                                ? 'bg-[#EFF6FF] border-[#1E3A8A] ring-2 ring-[#1E3A8A]/20'
                                : 'bg-[#FAF9F5] border-[#E6E2D3] hover:border-[#DC2626]'
                            }`}
                          >
                            <img
                              src={p.avatar}
                              alt={p.name}
                              className="w-12 h-12 rounded-full object-cover shrink-0"
                            />
                            <div className="truncate">
                              <div className="text-xs font-bold text-[#2D3021] truncate">
                                {p.name}
                              </div>
                              <div className="text-[11px] text-[#5C594D] truncate">
                                {p.title} • ★ {p.rating}
                              </div>
                              <div className="text-[10px] text-[#8C887B]">
                                {p.city}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Add-ons Checklist */}
                    <div className="space-y-3 pt-2">
                      <label className="text-xs font-bold text-[#5C594D] uppercase tracking-wider">
                        Optional Video & Express Upgrades
                      </label>

                      {/* 4K Video Reel Addon */}
                      <label
                        className={`p-4 rounded-2xl border transition flex items-start gap-3 cursor-pointer ${
                          videoReelAddon
                            ? 'bg-[#EFF6FF] border-[#1E3A8A]'
                            : 'bg-[#FAF9F5] border-[#E6E2D3]'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={videoReelAddon}
                          onChange={(e) => setVideoReelAddon(e.target.checked)}
                          className="mt-1 w-4 h-4 rounded text-[#1E3A8A] focus:ring-[#1E3A8A]"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs sm:text-sm font-bold text-[#2D3021] flex items-center gap-1.5">
                              <Video className="w-4 h-4 text-[#1E3A8A]" />
                              4K Cinematic Video Reel (60s Vertical + 4K Cut)
                            </span>
                            <span className="text-xs font-extrabold text-[#1E3A8A]">
                              +$45
                            </span>
                          </div>
                          <p className="text-[11px] text-[#5C594D] mt-0.5">
                            Color-graded highlight reel filmed alongside your photos, optimized for Instagram, TikTok, and wedding announcements.
                          </p>
                        </div>
                      </label>

                      {/* Rush Delivery */}
                      <label
                        className={`p-4 rounded-2xl border transition flex items-start gap-3 cursor-pointer ${
                          rushDeliveryAddon
                            ? 'bg-[#EFF6FF] border-[#1E3A8A]'
                            : 'bg-[#FAF9F5] border-[#E6E2D3]'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={rushDeliveryAddon}
                          onChange={(e) => setRushDeliveryAddon(e.target.checked)}
                          className="mt-1 w-4 h-4 rounded text-[#1E3A8A] focus:ring-[#1E3A8A]"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs sm:text-sm font-bold text-[#2D3021] flex items-center gap-1.5">
                              <Zap className="w-4 h-4 text-[#DC2626]" />
                              48-Hour Rush Delivery
                            </span>
                            <span className="text-xs font-extrabold text-[#1E3A8A]">
                              +$35
                            </span>
                          </div>
                          <p className="text-[11px] text-[#5C594D] mt-0.5">
                            Receive your online gallery in 48 hours instead of standard 3-5 business days.
                          </p>
                        </div>
                      </label>
                    </div>

                    <div className="flex justify-between pt-4">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="px-5 py-3 rounded-xl text-xs font-bold text-[#5C594D] hover:bg-[#F2F0E6] transition"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep(4)}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1E3A8A] text-white text-xs sm:text-sm font-bold hover:bg-[#3B4B1C] transition shadow-md"
                      >
                        <span>Next: Contact Info</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 4: Contact & Vision Notes */}
                {step === 4 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-[#E6E2D3] shadow-xs"
                  >
                    <div>
                      <h2 className="text-xl font-extrabold text-[#2D3021]">
                        4. Finalize Inquiry & Contact Details
                      </h2>
                      <p className="text-xs sm:text-sm text-[#5C594D]">
                        Where should we send your gallery link and booking confirmation?
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-bold text-[#5C594D] uppercase tracking-wider block mb-1">
                          Full Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C887B]" />
                          <input
                            type="text"
                            required
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="e.g. Sarah Jenkins"
                            className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm bg-[#FAF9F5] border border-[#E6E2D3] rounded-xl text-[#2D3021] focus:outline-none focus:border-[#1E3A8A]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-bold text-[#5C594D] uppercase tracking-wider block mb-1">
                            Email Address *
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C887B]" />
                            <input
                              type="email"
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="sarah@example.com"
                              className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm bg-[#FAF9F5] border border-[#E6E2D3] rounded-xl text-[#2D3021] focus:outline-none focus:border-[#1E3A8A]"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-xs font-bold text-[#5C594D] uppercase tracking-wider block mb-1">
                            Mobile Phone * (For Shoot Updates)
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C887B]" />
                            <input
                              type="tel"
                              required
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              placeholder="(555) 000-1234"
                              className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm bg-[#FAF9F5] border border-[#E6E2D3] rounded-xl text-[#2D3021] focus:outline-none focus:border-[#1E3A8A]"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-bold text-[#5C594D] uppercase tracking-wider block mb-1">
                            Number of People / Pets
                          </label>
                          <select
                            value={attendeesCount}
                            onChange={(e) => setAttendeesCount(Number(e.target.value))}
                            className="w-full p-3 text-xs sm:text-sm bg-[#FAF9F5] border border-[#E6E2D3] rounded-xl text-[#2D3021] focus:outline-none focus:border-[#1E3A8A]"
                          >
                            <option value={1}>1 Person (Solo / Headshot)</option>
                            <option value={2}>2 People (Couple / Friends)</option>
                            <option value={3}>3-5 People (Family / Small Group)</option>
                            <option value={6}>6+ People (Extended Family / Group)</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-[#5C594D] uppercase tracking-wider block mb-1">
                          Special Requests, Outfit Ideas, or Questions
                        </label>
                        <textarea
                          rows={3}
                          value={specialNotes}
                          onChange={(e) => setSpecialNotes(e.target.value)}
                          placeholder="Tell your photographer what vibe you're aiming for..."
                          className="w-full p-3.5 text-xs sm:text-sm bg-[#FAF9F5] border border-[#E6E2D3] rounded-xl text-[#2D3021] focus:outline-none focus:border-[#1E3A8A]"
                        />
                      </div>
                    </div>

                    <div className="flex justify-between pt-4">
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="px-5 py-3 rounded-xl text-xs font-bold text-[#5C594D] hover:bg-[#F2F0E6] transition"
                      >
                        Back
                      </button>

                      <button
                        type="submit"
                        id="btn-submit-inquiry-page"
                        className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#1E3A8A] hover:bg-[#3B4B1C] text-white text-sm font-extrabold shadow-lg hover:scale-105 active:scale-95 transition-all"
                      >
                        <Sparkles className="w-4 h-4 text-[#93C5FD]" />
                        <span>Confirm & Reserve ($0 Upfront)</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </form>
            </div>

            {/* Right Summary & Price Breakdown Column (4 Cols) */}
            <div className="lg:col-span-4 space-y-6 sticky top-24">
              <div className="p-6 rounded-3xl bg-white border border-[#E6E2D3] shadow-xs space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#E6E2D3]">
                  <h3 className="font-extrabold text-sm text-[#2D3021]">
                    Session Summary
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#EFF6FF] text-[10px] font-bold text-[#1E3A8A]">
                    30-Minute Shoot
                  </span>
                </div>

                {/* Selection Overview */}
                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[#8C887B]">Category:</span>
                    <span className="font-bold text-[#2D3021]">{category}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#8C887B]">Location:</span>
                    <span className="font-bold text-[#2D3021]">
                      {spotName || 'City Highlights'}, {currentCityObj.name}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#8C887B]">Date:</span>
                    <span className="font-bold text-[#2D3021]">{selectedDate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#8C887B]">Time Slot:</span>
                    <span className="font-bold text-[#2D3021]">{selectedSlot}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#8C887B]">Photographer:</span>
                    <span className="font-bold text-[#2D3021]">
                      {currentPhotographer.name}
                    </span>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E6E2D3] space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[#5C594D]">30-Min Photoshoot:</span>
                    <span className="font-bold text-[#1E3A8A] uppercase">FREE ($0)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#5C594D]">Photo Downloads:</span>
                    <span className="font-bold text-[#2D3021]">$15 / each (later)</span>
                  </div>
                  {videoReelAddon && (
                    <div className="flex items-center justify-between">
                      <span className="text-[#5C594D]">4K Video Reel:</span>
                      <span className="font-bold text-[#2D3021]">+$45</span>
                    </div>
                  )}
                  {rushDeliveryAddon && (
                    <div className="flex items-center justify-between">
                      <span className="text-[#5C594D]">48h Delivery:</span>
                      <span className="font-bold text-[#2D3021]">+$35</span>
                    </div>
                  )}

                  <div className="pt-2 border-t border-[#E6E2D3] flex items-center justify-between font-extrabold text-sm">
                    <span className="text-[#2D3021]">Due Today:</span>
                    <span className="text-[#1E3A8A]">
                      {upfrontTotal === 0 ? '$0.00' : `$${upfrontTotal}.00`}
                    </span>
                  </div>
                </div>

                {/* Trust Guarantees */}
                <div className="space-y-2 text-[11px] text-[#5C594D]">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#1E3A8A] shrink-0" />
                    <span>Free cancellation up to 48 hours before shoot</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#1E3A8A] shrink-0" />
                    <span>Receive 40+ edited photos in online gallery</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#1E3A8A] shrink-0" />
                    <span>Only purchase the photos you absolutely love</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
