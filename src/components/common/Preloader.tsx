import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from './Logo';

interface PreloaderProps {
  onComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING CAMERA OPTICS...');
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFinished(true);
            if (onComplete) onComplete();
          }, 300);
          return 100;
        }

        const next = prev + Math.floor(Math.random() * 8) + 4;

        if (next > 25 && next < 55) {
          setStatusText('CALIBRATING 8K COLOR PROFILES...');
        } else if (next >= 55 && next < 85) {
          setStatusText('LOADING CINEMATIC GALLERY ARCHIVES...');
        } else if (next >= 85) {
          setStatusText('UMIYA STUDIO USA READY');
        }

        return next > 100 ? 100 : next;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-50 bg-[#0F172A] text-white flex flex-col items-center justify-center p-6 select-none overflow-hidden"
        >
          {/* Subtle Background Aperture Rays */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,rgba(30,58,138,0.8)_0%,transparent_70%)] animate-pulse" />

          {/* Central Animated Aperture & Logo */}
          <div className="relative z-10 flex flex-col items-center max-w-sm text-center">
            {/* Spinning Camera Iris Aperture */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
              className="relative w-28 h-28 mb-8 flex items-center justify-center"
            >
              <div className="absolute inset-0 rounded-full border border-blue-500/30 border-t-[#D62828] border-r-[#1E3A8A] animate-spin" />
              <div className="w-20 h-20 rounded-full bg-slate-900/90 border border-amber-500/40 p-2 flex items-center justify-center shadow-2xl">
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full text-amber-400 opacity-90"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <circle cx="50" cy="50" r="42" stroke="#1E3A8A" strokeWidth="2" />
                  <path d="M50 15 L68 40 L42 48 Z" fill="#D62828" />
                  <path d="M85 50 L60 68 L52 42 Z" fill="#1E3A8A" />
                  <path d="M50 85 L32 60 L58 52 Z" fill="#D62828" />
                  <path d="M15 50 L40 32 L48 58 Z" fill="#1E3A8A" />
                </svg>
              </div>
            </motion.div>

            {/* Studio Brand */}
            <Logo size="lg" variant="light" className="justify-center mb-6" />

            {/* Progress Percentage */}
            <div className="text-4xl font-serif font-bold text-amber-400 tracking-wider mb-3">
              {progress}<span className="text-2xl font-sans text-slate-400">%</span>
            </div>

            {/* Status text */}
            <p className="text-[11px] font-mono tracking-[0.2em] text-slate-400 uppercase h-5">
              {statusText}
            </p>

            {/* Progress Line Bar */}
            <div className="w-64 h-1 bg-slate-800 rounded-full mt-6 overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-[#1E3A8A] via-[#D62828] to-amber-400"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>

            {/* USA & India Presence Tag */}
            <div className="mt-8 flex items-center gap-3 text-xs text-slate-400 tracking-widest font-semibold uppercase">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#1E3A8A] inline-block" />
                USA
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
                INDIA
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
