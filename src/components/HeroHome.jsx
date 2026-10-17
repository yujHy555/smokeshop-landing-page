import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, BookOpen, X, Flame, Smile, Gamepad2, Coffee, Heart } from 'lucide-react';
import SmokeWaves from './SmokeWaves';
import { playPopSound, playSipChime } from '../utils/soundEffects';

export default function HeroHome({ onGoToMenu, onGoToPromos }) {
  const [showAboutModal, setShowAboutModal] = useState(false);

  return (
    <div className="relative min-w-full w-full min-h-[calc(100vh-80px)] flex flex-col justify-between bg-[#F7EFE3] overflow-hidden px-4 sm:px-8 lg:px-14 pt-3 sm:pt-5 pb-0">
      {/* Decorative Background Doodles */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        <span className="absolute top-8 left-10 text-3xl text-[#3A1D0B] opacity-60 animate-pulse">✦</span>
        <span className="absolute top-20 right-20 text-2xl text-[#8B3A2B] opacity-70">✧</span>
        <span className="absolute bottom-36 left-16 text-3xl text-[#D99B43] opacity-60">✦</span>
        <span className="absolute bottom-40 right-28 text-3xl text-[#8B3A2B] opacity-60">✧</span>
        <svg className="absolute top-16 right-1/4 w-12 h-12 text-[#6B3C1B] opacity-30 animate-spin-slow" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round">
          <path d="M50 20C65 20 75 35 70 50C65 65 45 65 40 55C35 45 45 35 55 40" />
        </svg>
      </div>

      {/* Main Hero Content: Centered with Logo as the Undisputed Main Element */}
      <div className="max-w-5xl mx-auto w-full z-10 flex-1 flex flex-col items-center justify-center text-center py-2 sm:py-4">
        
        {/* Top Category Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#FFFDF9] border-2 border-[#3A1D0B] text-xs sm:text-sm font-retro font-bold text-[#6B3C1B] retro-shadow-sm mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#D99B43]" />
          <span>ARTISAN ROASTED COFFEE &amp; BAKERY • EST. 2024</span>
          <Sparkles className="w-3.5 h-3.5 text-[#D99B43]" />
        </div>

        {/* PRIMARY HERO ELEMENT: The Official Complete Uncropped Smoke Shop Logo */}
        <div className="w-full max-w-xl md:max-w-2xl lg:max-w-3xl rounded-3xl overflow-hidden bg-[#FAF3E7] border-4 border-[#3A1D0B] retro-shadow-lg p-3 sm:p-5 my-1 sm:my-2">
          <img
            src="/images/main-logo.jpg"
            alt="The Smoke Shop Official Logo"
            className="w-full h-auto max-h-[44vh] sm:max-h-[48vh] object-contain rounded-2xl drop-shadow-md select-none pointer-events-none"
            draggable={false}
          />
        </div>

        {/* Taglines Proportionately Sized Beneath the Main Logo */}
        <div className="mt-3 sm:mt-4 max-w-3xl space-y-1 sm:space-y-2">
          <h1 className="font-bubble text-3xl sm:text-4xl md:text-5xl text-[#4A2E1B] tracking-tight leading-none">
            YOUR DAILY SPARKS &amp; SIPS
          </h1>
          <p className="font-retro text-lg sm:text-xl md:text-2xl text-[#8B3A2B] font-bold tracking-wide">
            Welcome to the Chill Hub.
          </p>
          <p className="text-[#5C3A21] text-xs sm:text-sm md:text-base max-w-xl mx-auto font-normal leading-relaxed">
            Cozy single-origin beans, frosty coffee freezas, and oven-fresh celebration doughnuts.
          </p>
        </div>

        {/* Action Buttons Row */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-4 sm:mt-5 mb-3">
          <button
            onClick={() => {
              playPopSound();
              onGoToMenu();
            }}
            className="px-6 sm:px-8 py-3 rounded-full bg-[#8B3A2B] hover:bg-[#A54534] text-[#FFFDF9] font-retro text-base sm:text-lg font-bold tracking-wider border-2 border-[#3A1D0B] retro-shadow retro-shadow-hover flex items-center gap-2 cursor-pointer"
          >
            <Coffee className="w-4 h-4" />
            <span>SHOP NOW</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              playPopSound();
              onGoToPromos();
            }}
            className="px-6 sm:px-7 py-3 rounded-full bg-[#E29D38] hover:bg-[#D48F2A] text-[#3A1D0B] font-retro text-base sm:text-lg font-bold tracking-wider border-2 border-[#3A1D0B] retro-shadow retro-shadow-hover flex items-center gap-2 cursor-pointer"
          >
            <Gamepad2 className="w-4 h-4" />
            <span>PLAY GAME</span>
          </button>

          <button
            onClick={() => {
              playSipChime();
              setShowAboutModal(true);
            }}
            className="px-6 sm:px-7 py-3 rounded-full bg-[#FFFDF9] hover:bg-[#F3E6D3] text-[#3A1D0B] font-retro text-base sm:text-lg font-bold tracking-wider border-2 border-[#3A1D0B] retro-shadow retro-shadow-hover flex items-center gap-2 cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-[#6B3C1B]" />
            <span>ABOUT US</span>
          </button>
        </div>

        {/* Quick Perks Strip */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[11px] sm:text-xs font-retro font-bold text-[#6B3C1B] mt-1 mb-2">
          <span className="bg-[#FFFDF9] border border-[#DFCBB5] px-3 py-1 rounded-full retro-shadow-sm">
            ☕ 100% Fair-Trade Beans
          </span>
          <span className="bg-[#FFFDF9] border border-[#DFCBB5] px-3 py-1 rounded-full retro-shadow-sm">
            ★ 4.9 Chill Vibe Rating
          </span>
          <span className="bg-[#FFFDF9] border border-[#DFCBB5] px-3 py-1 rounded-full retro-shadow-sm">
            🍩 Fresh Oven Bakes
          </span>
          <span className="bg-[#FFFDF9] border border-[#DFCBB5] px-3 py-1 rounded-full retro-shadow-sm">
            🎮 Free Arcade Rewards
          </span>
        </div>

      </div>

      {/* Smoke Cloud Waves along Bottom */}
      <div className="w-full mt-auto">
        <SmokeWaves />
      </div>

      {/* About Us Modal */}
      <AnimatePresence>
        {showAboutModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2E1505]/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-[#FFFDF9] border-3 border-[#3A1D0B] rounded-3xl p-6 sm:p-8 max-w-2xl w-full retro-shadow-lg relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => {
                  playPopSound();
                  setShowAboutModal(false);
                }}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#F5EADB] border-2 border-[#3A1D0B] flex items-center justify-center text-[#3A1D0B] hover:bg-[#8B3A2B] hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-[#DFCBB5]">
                <img
                  src="/images/main-logo.jpg"
                  alt="Smoke Shop EST. 2024"
                  className="h-14 sm:h-16 w-auto object-contain"
                />
                <div className="text-left sm:text-right">
                  <div className="font-bubble text-xl sm:text-2xl text-[#3A1D0B] leading-none">
                    ABOUT THE SHOP
                  </div>
                  <p className="font-retro text-xs text-[#8B3A2B] font-bold mt-1">
                    YOUR COZY NEIGHBORHOOD CHILL HUB
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-[#5C3A21] text-sm sm:text-base leading-relaxed">
                <p>
                  Born out of a genuine passion for honest craftsmanship and laid-back community culture, 
                  <strong> The Smoke Shop</strong> is more than just coffee. It is an intentional sanctuary 
                  where daily sparks meet calming sips.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
                  <div className="bg-[#FAF3E7] p-3.5 rounded-2xl border-2 border-[#3A1D0B] retro-shadow-sm">
                    <h4 className="font-retro font-bold text-[#8B3A2B] text-base mb-1 flex items-center gap-1.5">
                      <Flame className="w-4 h-4" /> Fresh Micro-Roasts
                    </h4>
                    <p className="text-xs text-[#6B3C1B]">
                      Sourced ethically from smallholder growers in Ethiopia, Colombia, and Guatemala. Roasted weekly in small batches.
                    </p>
                  </div>

                  <div className="bg-[#FAF3E7] p-3.5 rounded-2xl border-2 border-[#3A1D0B] retro-shadow-sm">
                    <h4 className="font-retro font-bold text-[#8B3A2B] text-base mb-1 flex items-center gap-1.5">
                      <Smile className="w-4 h-4" /> Good Vibes Only
                    </h4>
                    <p className="text-xs text-[#6B3C1B]">
                      Plentiful outlets, vinyl records spinning on the turntable, tabletop board games, and zero pretense.
                    </p>
                  </div>
                </div>

                <p>
                  Whether you are dropping in for a lightning-fast <strong>$3.00 Espresso Shot</strong> before work, 
                  cooling off with a creamy chocolate-drizzled <strong>Coffee Freeza</strong>, biting into a warm <strong>Double Chocolate Doughnut</strong>, 
                  or challenging friends in our coffee arcade game, you will always find a warm smile waiting for you.
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-[#DFCBB5] flex flex-wrap items-center justify-between gap-4">
                <div className="font-hand text-xl text-[#6B3C1B]">
                  "Keep it cozy, keep it roasted." ♥
                </div>

                <button
                  onClick={() => {
                    playPopSound();
                    setShowAboutModal(false);
                    onGoToMenu();
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#8B3A2B] hover:bg-[#A54534] text-white font-retro font-bold text-sm border-2 border-[#3A1D0B] retro-shadow-sm cursor-pointer"
                >
                  Explore Our Menu
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
