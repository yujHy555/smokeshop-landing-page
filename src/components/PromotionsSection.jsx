import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';
import { Gamepad2, Gift, Sparkles, Copy, Check, ExternalLink, Trophy, Clock, Star, Flame, Coffee } from 'lucide-react';
import { playPopSound, playSipChime } from '../utils/soundEffects';
import { PROMOTIONS } from '../data/products';

export default function PromotionsSection({ onGoToMenu }) {
  const [copiedCode, setCopiedCode] = useState(null);
  const [activeTab, setActiveTab] = useState('all');

  const gameUrl = "https://coffee-zeta-weld.vercel.app/";

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#8B3A2B', '#E29D38', '#4A2E1B', '#FFFDF9', '#D96B27']
      });
    } catch (e) {
      // Ignore
    }
  };

  const handleCopyCode = (code) => {
    playPopSound();
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    triggerConfetti();
    setTimeout(() => setCopiedCode(null), 3000);
  };

  return (
    <div className="relative min-w-full w-full min-h-[calc(100vh-80px)] flex flex-col justify-between bg-[#F2E7D5] overflow-hidden px-4 sm:px-8 lg:px-14 py-8 sm:py-12">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-[#E5D2BA]/50 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-[#D9BF9F]/40 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto w-full z-10 flex-1 flex flex-col justify-center">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFDF9] border-2 border-[#3A1D0B] text-xs font-retro font-bold text-[#8B3A2B] retro-shadow-sm mb-3">
              <Gift className="w-4 h-4 text-[#E29D38]" />
              <span>SECTION 02 • PERKS &amp; ARCADE</span>
            </div>
            <h2 className="font-bubble text-4xl sm:text-5xl md:text-6xl text-[#3A1D0B] leading-[1.05]">
              SPARKS, GAMES &amp; REWARDS
            </h2>
            <p className="font-retro text-lg sm:text-xl text-[#6B3C1B] mt-2">
              Play our retro coffee game, score points, and unlock instant savings in-store!
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 font-hand text-xl text-[#8B3A2B]">
            <span>Scan to play on mobile</span>
            <span className="text-2xl">📱 ➔</span>
          </div>
        </div>

        {/* Hero Promo Spotlight: The Official Coffee Game Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-8">
          
          {/* Main Game Feature Card (Col 1-8) */}
          <div className="lg:col-span-8 bg-[#FFFDF9] border-3 border-[#3A1D0B] rounded-3xl p-6 sm:p-8 retro-shadow-lg relative overflow-hidden flex flex-col justify-between">
            {/* Top Badge */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-2 bg-[#8B3A2B] text-white px-4 py-1.5 rounded-full font-retro text-sm font-bold border-2 border-[#3A1D0B] retro-shadow-sm">
                <Gamepad2 className="w-4 h-4" />
                <span>OFFICIAL WEB &amp; MOBILE GAME</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold font-retro text-[#6B3C1B] bg-[#F7EFE3] px-3 py-1 rounded-full border border-[#DFCBB5]">
                <Trophy className="w-3.5 h-3.5 text-[#E29D38]" />
                <span>CHALLENGE: 1,000+ PTS = 20% OFF</span>
              </div>
            </div>

            {/* Game Content Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center my-auto">
              {/* Text & Pitch */}
              <div className="sm:col-span-7 space-y-3">
                <h3 className="font-bubble text-3xl sm:text-4xl text-[#3A1D0B] leading-tight">
                  THE COFFEE GAME
                </h3>
                <p className="text-[#5C3A21] text-sm sm:text-base leading-relaxed">
                  Test your barista reflexes! Dodge spilled beans, catch falling espresso drops, and climb the high-score leaderboard.
                </p>

                {/* Direct Link Box */}
                <div className="bg-[#FAF3E7] p-3.5 rounded-2xl border-2 border-[#3A1D0B] retro-shadow-sm space-y-2">
                  <div className="text-xs font-retro font-bold text-[#8A5230] uppercase tracking-wider flex items-center justify-between">
                    <span>Direct Game URL</span>
                    <span className="text-[11px] text-[#27C93F] font-bold">● LIVE ON VERCEL</span>
                  </div>
                  <div className="flex items-center justify-between gap-2 bg-white px-3 py-2 rounded-xl border border-[#DFCBB5]">
                    <span className="font-mono text-xs sm:text-sm text-[#3A1D0B] truncate select-all">
                      {gameUrl}
                    </span>
                    <a
                      href={gameUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#8B3A2B] hover:text-[#3A1D0B] shrink-0"
                      title="Open game"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Secret Promo Code Unlock */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <div className="flex items-center gap-2 bg-[#FFFDF9] border-2 border-dashed border-[#8B3A2B] px-3.5 py-1.5 rounded-xl">
                    <span className="font-retro text-xs font-bold text-[#6B3C1B]">VOUCHER CODE:</span>
                    <span className="font-mono font-bold text-sm text-[#8B3A2B]">CHILLHUB20</span>
                  </div>
                  <button
                    onClick={() => handleCopyCode('CHILLHUB20')}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#E29D38] hover:bg-[#D48F2A] text-[#3A1D0B] font-retro text-xs font-bold border-2 border-[#3A1D0B] retro-shadow-sm transition-all cursor-pointer"
                  >
                    {copiedCode === 'CHILLHUB20' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-green-800" />
                        <span>COPIED!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>COPY &amp; WIN</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* QR Code Presentation Box */}
              <div className="sm:col-span-5 flex flex-col items-center justify-center p-4 bg-[#FAF3E7] border-2 border-[#3A1D0B] rounded-2xl retro-shadow-sm text-center">
                <div className="p-3 bg-white border-2 border-[#3A1D0B] rounded-xl retro-shadow-sm mb-3">
                  <QRCodeSVG
                    value={gameUrl}
                    size={150}
                    level="H"
                    includeMargin={false}
                    fgColor="#3A1D0B"
                    bgColor="#FFFFFF"
                  />
                </div>
                <div className="font-retro text-xs font-bold text-[#3A1D0B] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#E29D38]" />
                  <span>POINT CAMERA TO PLAY</span>
                </div>
                <p className="font-hand text-sm text-[#8A5230] mt-1">
                  Works on iPhone &amp; Android instantly!
                </p>
              </div>
            </div>

            {/* Launch Button Bar */}
            <div className="mt-6 pt-4 border-t border-[#DFCBB5] flex flex-wrap items-center justify-between gap-4">
              <span className="font-hand text-lg text-[#6B3C1B]">
                Free to play • No download or registration needed!
              </span>

              <a
                href={gameUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={triggerConfetti}
                className="px-6 py-3 rounded-full bg-[#8B3A2B] hover:bg-[#A54534] text-white font-retro font-bold text-base border-2 border-[#3A1D0B] retro-shadow retro-shadow-hover inline-flex items-center gap-2"
              >
                <Gamepad2 className="w-5 h-5" />
                <span>LAUNCH GAME NOW</span>
                <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>

          {/* Side Promos Strip (Col 9-12) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            
            {/* Promo Card 1: Game Night */}
            <div className="bg-[#FFFDF9] border-2 border-[#3A1D0B] rounded-2xl p-5 retro-shadow flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-retro font-bold mb-2">
                  <span className="bg-[#EADDC7] text-[#3A1D0B] px-2.5 py-0.5 rounded-full border border-[#3A1D0B]">
                    THURSDAYS 5-9 PM
                  </span>
                  <span className="text-[#8B3A2B]">FREE UPGRADE</span>
                </div>
                <h4 className="font-bubble text-xl text-[#3A1D0B] mb-1">
                  COFFEE &amp; BOARD GAMES
                </h4>
                <p className="text-xs text-[#6B3C1B] leading-relaxed">
                  Complimentary double espresso upgrade when you order any fresh morning croissant or afternoon cinnamon bun!
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#DFCBB5] flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#8B3A2B]">CODE: GAMENIGHT</span>
                <button
                  onClick={() => handleCopyCode('GAMENIGHT')}
                  className="text-xs font-retro font-bold text-[#3A1D0B] hover:text-[#8B3A2B] flex items-center gap-1 cursor-pointer"
                >
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </button>
              </div>
            </div>

            {/* Promo Card 2: Early Bird */}
            <div className="bg-[#FFFDF9] border-2 border-[#3A1D0B] rounded-2xl p-5 retro-shadow flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-retro font-bold mb-2">
                  <span className="bg-[#E29D38] text-[#3A1D0B] px-2.5 py-0.5 rounded-full border border-[#3A1D0B]">
                    WEEKDAYS 7-9 AM
                  </span>
                  <span className="text-[#8B3A2B]">$2.00 SHOTS</span>
                </div>
                <h4 className="font-bubble text-xl text-[#3A1D0B] mb-1">
                  EARLY BIRD SPARKS
                </h4>
                <p className="text-xs text-[#6B3C1B] leading-relaxed">
                  Start your grind with velvety golden crema. Hand-pulled single or double espresso shots for $2 flat before 9 AM.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#DFCBB5] flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#8B3A2B]">CODE: EARLYBIRD</span>
                <button
                  onClick={() => handleCopyCode('EARLYBIRD')}
                  className="text-xs font-retro font-bold text-[#3A1D0B] hover:text-[#8B3A2B] flex items-center gap-1 cursor-pointer"
                >
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </button>
              </div>
            </div>

            {/* Quick jump to menu */}
            <button
              onClick={() => {
                playPopSound();
                onGoToMenu();
              }}
              className="w-full py-3 rounded-2xl bg-[#3A1D0B] text-white font-retro font-bold text-sm retro-shadow-sm hover:bg-[#5C3A21] transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Coffee className="w-4 h-4 text-[#E29D38]" />
              <span>Use Promos On Our Menu ➔</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
