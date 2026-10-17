import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, BookOpen, X, Flame, Smile } from 'lucide-react';
import SmokeWaves from './SmokeWaves';
import { playPopSound, playSipChime } from '../utils/soundEffects';

export default function HeroHome({ onGoToMenu, onGoToPromos }) {
  const [showAboutModal, setShowAboutModal] = useState(false);

  return (
    <div className="relative min-w-full w-full min-h-[calc(100vh-80px)] flex flex-col justify-between bg-[#F7EFE3] overflow-hidden px-4 sm:px-8 lg:px-14 pt-4 sm:pt-8 pb-0">
      {/* Decorative Doodles in Background (Sparkles, Swirls) */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        <span className="absolute top-12 left-10 text-3xl text-[#3A1D0B] opacity-70 animate-pulse">✦</span>
        <span className="absolute top-28 right-24 text-2xl text-[#8B3A2B] opacity-80">✧</span>
        <span className="absolute bottom-44 left-1/3 text-4xl text-[#D99B43] opacity-60">✦</span>
        <svg className="absolute top-20 right-1/4 w-12 h-12 text-[#6B3C1B] opacity-40 animate-spin-slow" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round">
          <path d="M50 20C65 20 75 35 70 50C65 65 45 65 40 55C35 45 45 35 55 40" />
        </svg>
        <svg className="absolute bottom-36 right-16 w-14 h-14 text-[#6B3C1B] opacity-35" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round">
          <path d="M30 70C30 50 50 35 70 45C85 55 80 75 65 75C50 75 45 60 55 52" />
        </svg>
      </div>

      {/* Main Hero Content Grid */}
      <div className="max-w-7xl mx-auto w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center flex-1">
        
        {/* Left Column: Bold Retro Typography & CTAs */}
        <div className="lg:col-span-6 flex flex-col items-start text-left pt-2 sm:pt-4">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFDF9] border-2 border-[#3A1D0B] text-xs sm:text-sm font-retro font-bold text-[#6B3C1B] retro-shadow-sm mb-4">
            <Sparkles className="w-4 h-4 text-[#D99B43]" />
            <span>ARTISAN ROASTED COFFEE &amp; BAKERY • EST. 2024</span>
          </div>

          {/* Big Retro 3D Bubble Title from Mockup */}
          <h1 className="font-bubble text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#4A2E1B] tracking-tight leading-[0.95] mb-3">
            YOUR DAILY <br />
            <span className="text-[#8B3A2B] inline-block hover:scale-[1.02] transition-transform">
              SPARKS
            </span>{" "}
            &amp;{" "}
            <span className="text-[#4A2E1B] inline-block hover:scale-[1.02] transition-transform">
              SIPS
            </span>
          </h1>

          {/* Subtitle from Mockup */}
          <p className="font-retro text-2xl sm:text-3xl md:text-4xl text-[#3A1D0B] font-bold tracking-wide mb-5">
            Welcome to the Chill Hub.
          </p>

          <p className="text-[#5C3A21] text-base sm:text-lg max-w-xl font-normal leading-relaxed mb-7">
            Cozy artisanal beans, frosty coffee freezas, oven-fresh doughnuts, and good vibes. 
            Step in, kick back, score high in our coffee game, or find your new favorite sip.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-5 mb-7">
            <button
              onClick={() => {
                playPopSound();
                onGoToMenu();
              }}
              className="px-7 sm:px-9 py-3.5 sm:py-4 rounded-full bg-[#8B3A2B] hover:bg-[#A54534] text-[#FFFDF9] font-retro text-lg sm:text-xl font-bold tracking-wider border-2 border-[#3A1D0B] retro-shadow retro-shadow-hover flex items-center gap-2.5 cursor-pointer"
            >
              <span>SHOP NOW</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => {
                playSipChime();
                setShowAboutModal(true);
              }}
              className="px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#FFFDF9] hover:bg-[#F3E6D3] text-[#3A1D0B] font-retro text-lg sm:text-xl font-bold tracking-wider border-2 border-[#3A1D0B] retro-shadow retro-shadow-hover flex items-center gap-2 cursor-pointer"
            >
              <BookOpen className="w-5 h-5 text-[#6B3C1B]" />
              <span>ABOUT US</span>
            </button>
          </div>

          {/* Hand-drawn Arrow Doodled Note */}
          <div className="flex items-center gap-3 text-[#6B3C1B] font-hand text-xl sm:text-2xl">
            <svg className="w-8 h-8 text-[#4A2E1B]" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
              <path d="M10 25C25 15 35 30 42 20M42 20L36 18M42 20L40 26" />
            </svg>
            <span>Freshly brewed daily with love ♥</span>
          </div>
        </div>

        {/* Right Column: Complete Uncropped Official Smoke Shop Logo (Non-Interactive) */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center relative pt-2 pb-6">
          <div className="w-full max-w-lg lg:max-w-xl rounded-3xl overflow-hidden bg-[#FAF3E7] border-3 border-[#3A1D0B] retro-shadow-lg p-3 sm:p-5">
            <img
              src="/images/main-logo.jpg"
              alt="The Smoke Shop Official Complete Logo"
              className="w-full h-auto object-contain rounded-2xl drop-shadow-sm select-none pointer-events-none"
              draggable={false}
            />
          </div>

          {/* Quick Perks Strip */}
          <div className="mt-5 grid grid-cols-3 gap-2.5 w-full max-w-lg">
            <div className="bg-[#FFFDF9] border-2 border-[#3A1D0B] rounded-2xl p-2.5 text-center retro-shadow-sm">
              <div className="text-base sm:text-lg font-bold text-[#8B3A2B] font-retro">100%</div>
              <div className="text-[11px] text-[#6B3C1B] font-medium leading-tight">Fair-Trade Beans</div>
            </div>
            <div className="bg-[#FFFDF9] border-2 border-[#3A1D0B] rounded-2xl p-2.5 text-center retro-shadow-sm">
              <div className="text-base sm:text-lg font-bold text-[#8B3A2B] font-retro">4.9 ★</div>
              <div className="text-[11px] text-[#6B3C1B] font-medium leading-tight">Chill Vibe Rating</div>
            </div>
            <div className="bg-[#FFFDF9] border-2 border-[#3A1D0B] rounded-2xl p-2.5 text-center retro-shadow-sm">
              <div className="text-base sm:text-lg font-bold text-[#8B3A2B] font-retro">FREE</div>
              <div className="text-[11px] text-[#6B3C1B] font-medium leading-tight">Arcade Game</div>
            </div>
          </div>
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
              {/* Close Button */}
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
