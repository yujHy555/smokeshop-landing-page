import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, Gift, Sparkles, Copy, Check, ExternalLink, Smartphone, Coffee, QrCode, X, Play } from 'lucide-react';
import { playPopSound, playSipChime } from '../utils/soundEffects';

export default function PromotionsSection({ onGoToMenu }) {
  const [copiedCode, setCopiedCode] = useState(null);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  const gameUrl = "https://coffee-zeta-weld.vercel.app/";

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#8B3A2B', '#E29D38', '#4A2E1B', '#FFFDF9', '#D96B27', '#27C93F']
      });
    } catch (e) {}
  };

  const handleCopyCode = (code) => {
    playPopSound();
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    triggerConfetti();
    setTimeout(() => setCopiedCode(null), 3000);
  };

  const handleCopyUrl = () => {
    playPopSound();
    navigator.clipboard.writeText(gameUrl);
    setCopiedUrl(true);
    triggerConfetti();
    setTimeout(() => setCopiedUrl(false), 2500);
  };

  return (
    <div className="relative min-w-full w-full h-full flex flex-col justify-center bg-[#F2E7D5] overflow-hidden px-4 sm:px-6 lg:px-10 py-1.5 sm:py-2 select-none">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 rounded-full bg-[#E5D2BA]/40 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#D9BF9F]/30 blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto w-full z-10 flex flex-col justify-center my-auto">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1.5 mb-1.5 sm:mb-2">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FFFDF9] border border-[#3A1D0B] text-[11px] sm:text-xs font-retro font-bold text-[#8B3A2B] retro-shadow-xs mb-1">
              <Gift className="w-3.5 h-3.5 text-[#E29D38]" />
              <span>SECTION 02 • SUMMER PROMO GAME &amp; GIVEAWAYS</span>
            </div>
            <h2 className="font-bubble text-2xl sm:text-3xl md:text-4xl text-[#3A1D0B] leading-none">
              PLAY THE SMOKE SHOP SUMMER PROMO GAME!
            </h2>
            <p className="font-retro text-xs sm:text-sm text-[#6B3C1B] mt-0.5">
              Enjoy great discounts, unlockable voucher codes, and coffee giveaways!
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 font-hand text-sm md:text-base text-[#8B3A2B]">
            <span>Scan on mobile</span>
            <span className="text-xl">📱 ➔</span>
          </div>
        </div>

        {/* Promo Showcase Grid: Compact & Viewport-Adaptive */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4 items-stretch">
          
          {/* Left Column: Official Arcade Dark Modal Card (Col 1-5) */}
          <div className="lg:col-span-5 bg-[#120D08] border-3 border-[#3A1D0B] rounded-2xl p-3 sm:p-3.5 retro-shadow text-white flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-[#FFBD2E]/10 rounded-full blur-2xl pointer-events-none"></div>

            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-1.5">
                <span className="bg-[#00D2FF] text-[#0A2540] font-retro text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                  <Smartphone className="w-3 h-3" />
                  <span>INSTANT MOBILE ACCESS</span>
                </span>
                <span className="text-[10px] font-retro text-gray-400">iOS &amp; Android</span>
              </div>

              {/* Title & Instructions */}
              <h3 className="font-bubble text-lg sm:text-xl text-[#FFE6B0] mb-0.5 leading-tight">
                Scan to Play on Mobile
              </h3>
              <p className="text-gray-300 text-[11px] sm:text-xs leading-snug mb-1.5 line-clamp-2">
                Point your phone's camera at this QR code to launch directly on iOS &amp; Android!
              </p>

              {/* Center Crisp QR Code */}
              <div className="flex justify-center my-1">
                <div 
                  className="p-2 bg-white rounded-xl shadow-[0_0_20px_rgba(255,189,46,0.25)] border border-white/20 relative group/qr cursor-pointer"
                  onClick={() => setShowQrModal(true)}
                  title="Click to enlarge"
                >
                  <QRCodeSVG
                    value={gameUrl}
                    size={105}
                    level="H"
                    includeMargin={false}
                    fgColor="#120D08"
                    bgColor="#FFFFFF"
                  />
                  <div className="absolute inset-0 bg-black/40 rounded-xl opacity-0 group-hover/qr:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-[#E29D38] text-[#120D08] font-retro text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                      <QrCode className="w-3 h-3" /> Enlarge
                    </span>
                  </div>
                </div>
              </div>

              {/* Direct Game URL Strip */}
              <div className="mt-2 bg-[#1E1710] border border-[#3E2E20] rounded-lg p-1.5 flex items-center justify-between gap-1.5">
                <span className="font-mono text-[10px] text-[#A69480] truncate pl-1 select-all">
                  {gameUrl}
                </span>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={handleCopyUrl}
                    className="px-2 py-0.5 rounded-md bg-[#0088CC] hover:bg-[#0099E6] text-white font-retro text-[10px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    {copiedUrl ? <Check className="w-2.5 h-2.5 text-white" /> : <Copy className="w-2.5 h-2.5" />}
                    <span>{copiedUrl ? "Copied" : "Copy"}</span>
                  </button>

                  <a
                    href={gameUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2 py-0.5 rounded-md bg-[#00A86B] hover:bg-[#00BF7A] text-white font-retro text-[10px] font-bold flex items-center gap-1 transition-colors"
                  >
                    <span>Open</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Launch Game Button */}
            <div className="mt-2.5 pt-2 border-t border-white/10">
              <a
                href={gameUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={triggerConfetti}
                className="w-full py-2 rounded-xl bg-gradient-to-r from-[#FF9900] via-[#F5A623] to-[#E68A00] hover:brightness-110 text-[#2B1704] font-retro text-xs sm:text-sm font-extrabold flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Play Game Online ▶</span>
              </a>
            </div>
          </div>

          {/* Center Column: Summer Promo Sticker & Crew Showcase (Col 6-8) */}
          <div className="lg:col-span-4 flex flex-col gap-2.5 sm:gap-3 justify-between">
            
            {/* Promo Sticker Card */}
            <div className="bg-[#FFFDF9] border-2 border-[#3A1D0B] rounded-2xl p-3 retro-shadow flex items-center gap-3">
              <div className="relative w-28 sm:w-32 aspect-square rounded-full overflow-hidden border border-[#3A1D0B] shrink-0">
                <img
                  src="/images/promo-badge-sticker.jpg"
                  alt="Summer Promo Game Sticker"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <span className="bg-[#8B3A2B] text-white font-retro text-[10px] font-bold px-2 py-0.5 rounded-full">
                  OFFICIAL STICKER
                </span>
                <h4 className="font-bubble text-base sm:text-lg text-[#3A1D0B] mt-1 leading-tight">
                  COLLECT &amp; WIN
                </h4>
                <p className="text-[11px] text-[#6B3C1B] leading-snug mt-0.5">
                  Scan the sticker on every to-go cup for seasonal giveaways &amp; secret perks!
                </p>
              </div>
            </div>

            {/* Mascot Cups Crew Card */}
            <div className="bg-[#FFFDF9] border-2 border-[#3A1D0B] rounded-2xl p-2.5 retro-shadow flex items-center gap-3">
              <img
                src="/images/promo-cups-crew.jpg"
                alt="Smoke Shop Mascot Cups Crew"
                className="w-20 h-16 rounded-xl object-cover border border-[#3A1D0B] shrink-0"
              />
              <div>
                <div className="font-bubble text-sm sm:text-base text-[#3A1D0B] leading-tight">
                  MEET THE SIPS CREW
                </div>
                <p className="text-[10px] sm:text-[11px] text-[#6B3C1B] leading-snug mt-0.5 line-clamp-2">
                  Our walking cups are serving fresh vibes. Join them in the game!
                </p>
                <span className="font-hand text-xs text-[#8B3A2B] font-bold">
                  High-scores unlock 20% off ♥
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Active Promo Codes (Col 9-12) */}
          <div className="lg:col-span-3 flex flex-col gap-2.5 sm:gap-3 justify-between">
            
            {/* Challenge Voucher */}
            <div className="bg-[#FFFDF9] border-2 border-[#3A1D0B] rounded-2xl p-3 retro-shadow flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[10px] font-retro font-bold mb-0.5">
                  <span className="bg-[#27C93F]/20 text-[#1AAB29] px-2 py-0.5 rounded-full border border-[#27C93F]">
                    GAME REWARD
                  </span>
                  <span className="font-extrabold text-[#8B3A2B]">20% OFF</span>
                </div>
                <h4 className="font-bubble text-base text-[#3A1D0B]">
                  HIGH SCORE VOUCHER
                </h4>
                <p className="text-[11px] text-[#6B3C1B] leading-snug">
                  Score 1,000+ points and use code for 20% off all drinks &amp; doughnuts!
                </p>
              </div>

              <div className="mt-2 pt-1.5 border-t border-[#DFCBB5] flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#8B3A2B]">CHILLHUB20</span>
                <button
                  onClick={() => handleCopyCode('CHILLHUB20')}
                  className="px-2 py-0.5 rounded-md bg-[#E29D38] hover:bg-[#D48F2A] text-[#3A1D0B] font-retro text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                >
                  {copiedCode === 'CHILLHUB20' ? <Check className="w-2.5 h-2.5 text-green-900" /> : <Copy className="w-2.5 h-2.5" />}
                  <span>{copiedCode === 'CHILLHUB20' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Board Game Night Perk */}
            <div className="bg-[#FFFDF9] border-2 border-[#3A1D0B] rounded-2xl p-3 retro-shadow flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[10px] font-retro font-bold mb-0.5">
                  <span className="bg-[#EADDC7] text-[#3A1D0B] px-2 py-0.5 rounded-full border border-[#3A1D0B]">
                    THURSDAYS 5-9 PM
                  </span>
                  <span className="font-bold text-[#8B3A2B]">FREE SHOT</span>
                </div>
                <h4 className="font-bubble text-base text-[#3A1D0B]">
                  COFFEE &amp; BOARD GAMES
                </h4>
                <p className="text-[11px] text-[#6B3C1B] leading-snug">
                  Free espresso upgrade with any fresh doughnut!
                </p>
              </div>

              <div className="mt-2 pt-1.5 border-t border-[#DFCBB5] flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#8B3A2B]">GAMENIGHT</span>
                <button
                  onClick={() => handleCopyCode('GAMENIGHT')}
                  className="px-2 py-0.5 rounded-md bg-[#FAF3E7] hover:bg-[#EADDC7] text-[#3A1D0B] font-retro text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                >
                  {copiedCode === 'GAMENIGHT' ? <Check className="w-2.5 h-2.5 text-green-900" /> : <Copy className="w-2.5 h-2.5" />}
                  <span>{copiedCode === 'GAMENIGHT' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Direct Menu Jump Button */}
            <button
              onClick={() => {
                playPopSound();
                onGoToMenu();
              }}
              className="w-full py-2 rounded-xl bg-[#3A1D0B] hover:bg-[#5C3A21] text-white font-retro font-bold text-xs retro-shadow-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              <Coffee className="w-3.5 h-3.5 text-[#E29D38]" />
              <span>Redeem on Menu &amp; Doughnuts ➔</span>
            </button>
          </div>

        </div>

      </div>

      {/* Enlarged QR Code Modal */}
      <AnimatePresence>
        {showQrModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-[#120D08] border-3 border-[#FF9900] rounded-3xl p-5 max-w-xs w-full text-center text-white relative shadow-2xl"
            >
              <button
                onClick={() => setShowQrModal(false)}
                className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="inline-block bg-[#00D2FF] text-[#0A2540] font-retro text-[10px] font-bold px-2.5 py-0.5 rounded-full mb-2">
                📱 SCAN TO PLAY
              </div>
              <h3 className="font-bubble text-xl text-[#FFE6B0] mb-1">
                Launch Coffee Game
              </h3>
              <p className="text-gray-300 text-[11px] mb-3">
                Scan with your phone camera to play:
              </p>

              <div className="p-3 bg-white rounded-xl inline-block shadow-lg mb-3">
                <QRCodeSVG
                  value={gameUrl}
                  size={160}
                  level="H"
                  fgColor="#120D08"
                  bgColor="#FFFFFF"
                />
              </div>

              <div className="font-mono text-[10px] text-[#FF9900] truncate bg-black/50 p-1.5 rounded-lg mb-3">
                {gameUrl}
              </div>

              <a
                href={gameUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 rounded-xl bg-[#FF9900] text-[#120D08] font-retro font-bold text-xs block cursor-pointer"
              >
                Open Game in Browser ➔
              </a>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
