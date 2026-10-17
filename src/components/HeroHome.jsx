import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, BookOpen, X, Flame, Smile, Gamepad2, Coffee, Shirt } from 'lucide-react';
import { playPopSound, playSipChime } from '../utils/soundEffects';

export default function HeroHome({ onGoToMenu, onGoToPromos, onGoToMerch }) {
  const [showAboutModal, setShowAboutModal] = useState(false);

  return (
    <div className="relative min-w-full w-full h-full flex flex-col justify-center items-center bg-[#F7EFE3] overflow-hidden px-4 sm:px-6 lg:px-10 py-2 sm:py-3 select-none">
      {/* Decorative Background Doodles */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        <span className="absolute top-6 left-8 text-2xl text-[#3A1D0B] opacity-40 animate-pulse">✦</span>
        <span className="absolute top-12 right-14 text-xl text-[#8B3A2B] opacity-50">✧</span>
        <span className="absolute bottom-28 left-12 text-2xl text-[#D99B43] opacity-40">✦</span>
        <span className="absolute bottom-24 right-20 text-2xl text-[#8B3A2B] opacity-40">✧</span>
      </div>

      {/* Main Hero Content: Centered with Logo as Main Element, perfectly adaptive */}
      <div className="max-w-4xl mx-auto w-full z-10 flex flex-col items-center justify-center text-center my-auto py-0.5">
        
        {/* Top Category Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FFFDF9] border border-[#3A1D0B] text-[11px] sm:text-xs font-retro font-bold text-[#6B3C1B] retro-shadow-sm mb-1.5">
          <Sparkles className="w-3 h-3 text-[#D99B43]" />
          <span>ARTISAN ROASTED COFFEE &amp; BAKERY • EST. 2024</span>
          <Sparkles className="w-3 h-3 text-[#D99B43]" />
        </div>

        {/* PRIMARY HERO ELEMENT: The Official Complete Logo, adaptively sized */}
        <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl rounded-2xl overflow-hidden bg-[#FAF3E7] border-3 border-[#3A1D0B] retro-shadow-sm p-2 sm:p-2.5 my-0.5">
          <img
            src="/images/main-logo.jpg"
            alt="The Smoke Shop Official Logo"
            className="w-full h-auto max-h-[23vh] sm:max-h-[26vh] md:max-h-[28vh] object-contain rounded-xl select-none pointer-events-none"
            draggable={false}
          />
        </div>

        {/* Taglines Proportionately Sized */}
        <div className="mt-1.5 sm:mt-2 max-w-2xl space-y-0.5 sm:space-y-1">
          <h1 className="font-bubble text-2xl sm:text-3xl md:text-4xl text-[#4A2E1B] tracking-tight leading-none">
            YOUR DAILY SPARKS &amp; SIPS
          </h1>
          <p className="font-retro text-sm sm:text-base md:text-lg text-[#8B3A2B] font-bold tracking-wide">
            Welcome to the Chill Hub.
          </p>
          <p className="text-[#5C3A21] text-xs sm:text-sm max-w-md mx-auto font-normal leading-relaxed line-clamp-2">
            Cozy single-origin beans, frosty coffee freezas, and oven-fresh celebration doughnuts.
          </p>
        </div>

        {/* Action Buttons Row */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mt-2.5 sm:mt-3 mb-1.5">
          <button
            onClick={() => {
              playPopSound();
              onGoToMenu();
            }}
            className="px-4 sm:px-5 py-2 rounded-full bg-[#8B3A2B] hover:bg-[#A54534] text-[#FFFDF9] font-retro text-xs sm:text-sm font-bold tracking-wider border-2 border-[#3A1D0B] retro-shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            <Coffee className="w-3.5 h-3.5" />
            <span>MENU</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => {
              playPopSound();
              if (onGoToMerch) onGoToMerch();
            }}
            className="px-4 sm:px-5 py-2 rounded-full bg-[#3A1D0B] hover:bg-[#522910] text-[#FFFDF9] font-retro text-xs sm:text-sm font-bold tracking-wider border-2 border-[#3A1D0B] retro-shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            <Shirt className="w-3.5 h-3.5 text-[#E29D38]" />
            <span>OFFICIAL MERCH</span>
          </button>

          <button
            onClick={() => {
              playPopSound();
              onGoToPromos();
            }}
            className="px-4 sm:px-5 py-2 rounded-full bg-[#E29D38] hover:bg-[#D48F2A] text-[#3A1D0B] font-retro text-xs sm:text-sm font-bold tracking-wider border-2 border-[#3A1D0B] retro-shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>PLAY GAME</span>
          </button>

          <button
            onClick={() => {
              playSipChime();
              setShowAboutModal(true);
            }}
            className="px-4 sm:px-5 py-2 rounded-full bg-[#FFFDF9] hover:bg-[#F3E6D3] text-[#3A1D0B] font-retro text-xs sm:text-sm font-bold tracking-wider border-2 border-[#3A1D0B] retro-shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#6B3C1B]" />
            <span>ABOUT US</span>
          </button>
        </div>

        {/* Quick Perks Strip */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-retro font-bold text-[#6B3C1B] mt-0.5 mb-1">
          <span className="bg-[#FFFDF9] border border-[#DFCBB5] px-2.5 py-0.5 rounded-full retro-shadow-xs">
            ☕ Fair-Trade Beans
          </span>
          <span className="bg-[#FFFDF9] border border-[#DFCBB5] px-2.5 py-0.5 rounded-full retro-shadow-xs">
            ★ 4.9 Chill Rating
          </span>
          <span className="bg-[#FFFDF9] border border-[#DFCBB5] px-2.5 py-0.5 rounded-full retro-shadow-xs">
            🍩 Fresh Bakes
          </span>
          <span className="bg-[#FFFDF9] border border-[#DFCBB5] px-2.5 py-0.5 rounded-full retro-shadow-xs">
            🎮 Free Arcade Game
          </span>
        </div>

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
                  className="h-12 sm:h-14 w-auto object-contain"
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
                  <div className="bg-[#FAF3E7] p-3 rounded-2xl border-2 border-[#3A1D0B] retro-shadow-sm">
                    <h4 className="font-retro font-bold text-[#8B3A2B] text-sm mb-1 flex items-center gap-1.5">
                      <Flame className="w-4 h-4" /> Fresh Micro-Roasts
                    </h4>
                    <p className="text-xs text-[#6B3C1B]">
                      Sourced ethically from smallholder growers in Ethiopia, Colombia, and Guatemala. Roasted weekly in small batches.
                    </p>
                  </div>

                  <div className="bg-[#FAF3E7] p-3 rounded-2xl border-2 border-[#3A1D0B] retro-shadow-sm">
                    <h4 className="font-retro font-bold text-[#8B3A2B] text-sm mb-1 flex items-center gap-1.5">
                      <Smile className="w-4 h-4" /> Good Vibes Only
                    </h4>
                    <p className="text-xs text-[#6B3C1B]">
                      Plentiful outlets, vinyl records spinning on the turntable, tabletop board games, and zero pretense.
                    </p>
                  </div>
                </div>

                <p>
                  Whether you are dropping in for a lightning-fast <strong>R35.00 Espresso Shot</strong> before work, 
                  cooling off with a creamy chocolate-drizzled <strong>Coffee Freeza</strong>, biting into a warm <strong>Double Chocolate Doughnut</strong>, 
                  or challenging friends in our coffee arcade game, you will always find a warm smile waiting for you.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#DFCBB5] flex flex-wrap items-center justify-between gap-4">
                <div className="font-hand text-lg text-[#6B3C1B]">
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
