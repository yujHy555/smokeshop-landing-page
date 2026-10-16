import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { playPopSound } from '../utils/soundEffects';

export default function WalkingCupMascot({ className = "", onInteract }) {
  const [isJumping, setIsJumping] = useState(false);
  const [showHearts, setShowHearts] = useState(false);

  const handleClick = () => {
    setIsJumping(true);
    setShowHearts(true);
    playPopSound();
    if (onInteract) onInteract();
    setTimeout(() => setIsJumping(false), 900);
    setTimeout(() => setShowHearts(false), 1600);
  };

  return (
    <div 
      className={`relative inline-block cursor-pointer select-none group ${className}`}
      onClick={handleClick}
      title="Click me for a happy sip!"
    >
      {/* Floating Steam Hearts / Sparkles on Click */}
      {showHearts && (
        <motion.div 
          initial={{ opacity: 0, y: 0, scale: 0.5 }}
          animate={{ opacity: [0, 1, 0], y: -80, scale: [0.5, 1.2, 1] }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="absolute -top-12 left-1/2 -translate-x-1/2 pointer-events-none flex gap-2 text-2xl z-20"
        >
          <span>☕</span>
          <span className="text-[#8B3A2B] font-bold">♥</span>
          <span>✨</span>
        </motion.div>
      )}

      {/* Main Animated Mascot using the actual character from logo */}
      <motion.div
        animate={isJumping ? {
          y: [0, -35, 0, -15, 0],
          rotate: [0, -8, 8, -4, 0],
          scale: [1, 1.1, 0.95, 1.05, 1]
        } : {
          y: [0, -8, 0],
          rotate: [-1, 1, -1]
        }}
        transition={isJumping ? {
          duration: 0.9,
          ease: "easeInOut"
        } : {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative w-60 sm:w-72 md:w-80 lg:w-96 flex items-center justify-center"
      >
        <img
          src="/images/mascot-character-transparent.png"
          alt="Smoke Shop Official Coffee Mascot"
          className="w-full h-auto object-contain filter drop-shadow-[0_12px_20px_rgba(58,29,11,0.22)] group-hover:scale-105 transition-transform duration-300"
        />

        {/* Shadow on ground beneath boots */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-48 sm:w-56 h-4 bg-[#3A1D0B]/20 rounded-full blur-md pointer-events-none" />

        {/* Hover Hint Pill */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#3A1D0B] text-[#FFFDF9] text-xs font-retro px-3.5 py-1 rounded-full whitespace-nowrap pointer-events-none retro-shadow-sm z-10">
          Tap for Good Vibes ✨
        </div>
      </motion.div>
    </div>
  );
}
