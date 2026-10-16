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

      {/* Main Animated Mascot */}
      <motion.div
        animate={isJumping ? {
          y: [0, -35, 0, -15, 0],
          rotate: [0, -8, 8, -4, 0],
          scale: [1, 1.1, 0.95, 1.05, 1]
        } : {
          y: [0, -6, 0],
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
        className="relative w-48 sm:w-60 md:w-72 drop-shadow-xl"
      >
        <svg
          viewBox="0 0 320 340"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto overflow-visible"
        >
          {/* Steam Swirls above Cup */}
          <g className="steam-container">
            {/* Left steam puff */}
            <motion.path
              d="M130 70C125 55 140 40 135 25C130 15 142 5 145 0"
              stroke="#6B3C1B"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
              animate={{
                d: [
                  "M130 70C125 55 140 40 135 25C130 15 142 5 145 0",
                  "M130 70C135 52 122 38 132 20C138 10 135 3 140 0",
                  "M130 70C125 55 140 40 135 25C130 15 142 5 145 0"
                ],
                opacity: [0.4, 0.85, 0.4]
              }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Center steam curl */}
            <motion.path
              d="M175 65C170 48 185 35 180 20C176 10 190 2 195 0"
              stroke="#6B3C1B"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
              animate={{
                d: [
                  "M175 65C170 48 185 35 180 20C176 10 190 2 195 0",
                  "M175 65C182 45 168 30 178 15C184 8 180 2 188 0",
                  "M175 65C170 48 185 35 180 20C176 10 190 2 195 0"
                ],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            />
            {/* Right steam curl */}
            <motion.path
              d="M215 72C225 58 215 42 225 30C230 20 226 10 230 5"
              stroke="#6B3C1B"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
              animate={{
                opacity: [0.3, 0.7, 0.3]
              }}
              transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            />
          </g>

          {/* Cup Handle (Right Side) */}
          <path
            d="M245 130C275 130 290 155 285 185C280 215 250 230 230 225"
            stroke="#3A1D0B"
            strokeWidth="16"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M245 135C268 135 278 155 274 180C270 202 248 215 233 212"
            stroke="#F5E8D3"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />

          {/* Cup Body Base */}
          <path
            d="M85 110L98 230C100 248 115 262 135 262H205C225 262 240 248 242 230L255 110C255 110 210 120 170 120C130 120 85 110 85 110Z"
            fill="#F6EBD9"
            stroke="#3A1D0B"
            strokeWidth="10"
            strokeLinejoin="round"
          />

          {/* Cup Rim (Oval top with coffee surface) */}
          <ellipse
            cx="170"
            cy="110"
            rx="85"
            ry="24"
            fill="#3A1D0B"
            stroke="#3A1D0B"
            strokeWidth="9"
          />
          {/* Coffee liquid surface with crema highlights */}
          <ellipse
            cx="170"
            cy="111"
            rx="78"
            ry="18"
            fill="#271105"
          />
          <ellipse
            cx="175"
            cy="110"
            rx="66"
            ry="13"
            fill="#441E0A"
          />
          <ellipse
            cx="160"
            cy="108"
            rx="45"
            ry="7"
            fill="#693414"
            opacity="0.8"
          />

          {/* Eyes with cheerful shine */}
          <g className="cup-face">
            {/* Left Eye */}
            <circle cx="138" cy="168" r="11" fill="#3A1D0B" />
            <circle cx="135" cy="164" r="4" fill="#FFFFFF" />
            
            {/* Right Eye */}
            <circle cx="198" cy="168" r="11" fill="#3A1D0B" />
            <circle cx="195" cy="164" r="4" fill="#FFFFFF" />

            {/* Rosy Cheeks */}
            <ellipse cx="122" cy="180" rx="10" ry="6" fill="#E89B84" opacity="0.65" />
            <ellipse cx="214" cy="180" rx="10" ry="6" fill="#E89B84" opacity="0.65" />

            {/* Cheerful Open Smile */}
            <path
              d="M152 184C152 198 162 208 172 208C182 208 192 198 192 184H152Z"
              fill="#8B3A2B"
              stroke="#3A1D0B"
              strokeWidth="5"
              strokeLinejoin="round"
            />
            {/* Tongue */}
            <path
              d="M162 198C166 204 178 204 182 198C176 195 168 195 162 198Z"
              fill="#FFA8A8"
            />
          </g>

          {/* Left Arm (Waving up high) */}
          <motion.g
            animate={{
              rotate: [0, 15, -5, 12, 0],
              originX: "75px",
              originY: "170px"
            }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Arm line */}
            <path
              d="M90 170L58 140"
              stroke="#3A1D0B"
              strokeWidth="8"
              strokeLinecap="round"
            />
            {/* Cartoon Hand / Fingers */}
            <path
              d="M58 140C52 136 48 126 52 120C56 115 63 118 67 124C69 116 77 114 80 120C83 125 78 132 75 137"
              stroke="#3A1D0B"
              strokeWidth="6"
              fill="#F6EBD9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.g>

          {/* Right Arm (Reaching down relaxed) */}
          <g>
            <path
              d="M236 180L260 215"
              stroke="#3A1D0B"
              strokeWidth="8"
              strokeLinecap="round"
            />
            {/* Cartoon hand */}
            <ellipse cx="264" cy="218" rx="8" ry="11" fill="#F6EBD9" stroke="#3A1D0B" strokeWidth="6" />
          </g>

          {/* Legs & Boots (Walking forward like in mockup) */}
          {/* Left Leg */}
          <motion.g
            animate={{
              y: [0, -4, 0],
              x: [0, 2, 0]
            }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <path
              d="M136 260L126 295"
              stroke="#3A1D0B"
              strokeWidth="9"
              strokeLinecap="round"
            />
            {/* Left Boot (Burgundy / Brown with cuff) */}
            <path
              d="M106 315C106 302 118 290 132 292L140 294C143 304 140 318 132 320C122 322 106 322 106 315Z"
              fill="#8B3A2B"
              stroke="#3A1D0B"
              strokeWidth="6"
              strokeLinejoin="round"
            />
            {/* Sole */}
            <path
              d="M104 321C114 323 134 323 140 319"
              stroke="#3A1D0B"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </motion.g>

          {/* Right Leg (Stepping back/forward) */}
          <motion.g
            animate={{
              y: [0, 4, 0],
              x: [0, -2, 0]
            }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.75 }}
          >
            <path
              d="M200 260L215 288"
              stroke="#3A1D0B"
              strokeWidth="9"
              strokeLinecap="round"
            />
            {/* Right Boot */}
            <path
              d="M210 290C224 285 240 295 242 308C244 316 235 320 220 320C210 320 205 310 210 290Z"
              fill="#8B3A2B"
              stroke="#3A1D0B"
              strokeWidth="6"
              strokeLinejoin="round"
            />
            <path
              d="M210 320H240"
              stroke="#3A1D0B"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </motion.g>
        </svg>

        {/* Hover Hint Pill */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#3A1D0B] text-[#FFFDF9] text-xs font-retro px-3 py-1 rounded-full whitespace-nowrap pointer-events-none retro-shadow-sm">
          Tap for Good Vibes ✨
        </div>
      </motion.div>
    </div>
  );
}
