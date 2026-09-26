import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC<{ active: boolean }> = ({ active }) => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  useEffect(() => {
    if (!active) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.closest('button') ||
          target.closest('a') ||
          target.classList.contains('cursor-pointer'))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Outer Luxury Ring */}
      <div
        className={`fixed w-8 h-8 rounded-full border border-[#1E3A8A] transition-transform duration-100 ease-out -translate-x-1/2 -translate-y-1/2 ${
          isHovered ? 'scale-150 border-[#D62828] bg-blue-500/10' : ''
        } ${isMouseDown ? 'scale-90' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`
        }}
      />
      {/* Center Precision Dot */}
      <div
        className={`fixed w-2 h-2 rounded-full bg-[#D62828] transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2 ${
          isHovered ? 'bg-amber-500 scale-125' : ''
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`
        }}
      />
    </div>
  );
};
