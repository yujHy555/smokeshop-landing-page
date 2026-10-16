import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, Gift, Sparkles, Copy, Check, ExternalLink, Trophy, Smartphone, Coffee, Flame, QrCode, X, Play } from 'lucide-react';
import { playPopSound, playSipChime } from '../utils/soundEffects';
import { PROMOTIONS } from '../data/products';

export default function PromotionsSection({ onGoToMenu }) {
  const [copiedCode, setCopiedCode] = useState(null);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  const gameUrl = "https://coffee-zeta-weld.vercel.app/";

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 90,
        spread: 80,
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
    <div className="relative min-w-full w-full min-h-[calc(100vh-80px)] flex flex-col justify-between bg-[#F2E7D5] overflow-hidden px-4 sm:px-8 lg:px-14 py-6 sm:py-9">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-[#E5D2BA]/50 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-[#D9BF9F]/40 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto w-full z-10 flex-1 flex flex-col justify-center">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFDF9] border-2 border-[#3A1D0B] text-xs font-retro font-bold text-[#8B3A2B] retro-shadow-sm mb-2.5">
              <Gift className="w-4 h-4 text-[#E29D38]" />
              <span>SECTION 02 • SUMMER PROMO GAME &amp; GIVEAWAYS</span>
            </div>
            <h2 className="font-bubble text-3xl sm:text-5xl md:text-6xl text-[#3A1D0B] leading-none">
              PLAY THE SMOKE SHOP SUMMER PROMO GAME!
            </h2>
            <p className="font-retro text-sm sm:text-lg text-[#6B3C1B] mt-1.5">
              Enjoy great discounts, unlockable voucher codes, and coffee giveaways!
            </p>
          </div>

          <div className="flex items-center gap-2 font-hand text-lg text-[#8B3A2B]">
            <span>Scan to play on mobile</span>
            <span className="text-2xl">📱 ➔</span>
          </div>
        </div>

        {/* Promo Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Column: Official Arcade Dark Modal Card matching user's mockup (Col 1-5) */}
          <div className="lg:col-span-5 bg-[#120D08] border-3 border-[#3A1D0B] rounded-3xl p-5 sm:p-6 retro-shadow-lg text-white flex flex-col justify-between relative overflow-hidden group">
            {/* Ambient Backlight */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#FFBD2E]/10 rounded-full blur-2xl pointer-events-none"></div>

            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="bg-[#00D2FF] text-[#0A2540] font-retro text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>INSTANT MOBILE ACCESS</span>
                </span>
                <span className="text-xs font-retro text-gray-400">iOS &amp; Android</span>
              </div>

              {/* Title & Instructions matching user's uploaded mockup */}
              <h3 className="font-bubble text-2xl sm:text-3xl text-[#FFE6B0] mb-1 leading-tight">
                Scan to Play on Mobile
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-4">
                Point your phone's camera at this QR code to launch the game directly on iOS &amp; Android devices!
              </p>

              {/* Center Crisp QR Code with subtle glow */}
              <div className="flex justify-center my-2">
                <div className="p-3 bg-white rounded-2xl shadow-[0_0_25px_rgba(255,189,46,0.3)] border-2 border-white/20 relative group/qr">
                  <QRCodeSVG
                    value={gameUrl}
                    size={160}
                    level="H"
                    includeMargin={false}
                    fgColor="#120D08"
                    bgColor="#FFFFFF"
                  />
                  <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover/qr:opacity-100 transition-opacity flex items-center justify-center cursor-pointer" onClick={() => setShowQrModal(true)}>
                    <span className="bg-[#E29D38] text-[#120D08] font-retro text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                      <QrCode className="w-3.5 h-3.5" /> Enlarge
                    </span>
                  </div>
                </div>
              </div>

              {/* Direct Game URL Strip with Copy & Open Buttons matching mockup */}
              <div className="mt-4 bg-[#1E1710] border border-[#3E2E20] rounded-xl p-2 flex items-center justify-between gap-2">
                <span className="font-mono text-[11px] text-[#A69480] truncate pl-1 select-all">
                  {gameUrl}
                </span>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={handleCopyUrl}
                    className="px-2.5 py-1 rounded-lg bg-[#0088CC] hover:bg-[#0099E6] text-white font-retro text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                    title="Copy game link"
                  >
                    {copiedUrl ? <Check className="w-3 h-3 text-white" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedUrl ? "Copied" : "Copy"}</span>
                  </button>

                  <a
                    href={gameUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 rounded-lg bg-[#00A86B] hover:bg-[#00BF7A] text-white font-retro text-xs font-bold flex items-center gap-1 transition-colors"
                    title="Open game in new tab"
                  >
                    <span>Open</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Launch Game Button matching Mockup Amber Pill */}
            <div className="mt-5 pt-3 border-t border-white/10">
              <a
                href={gameUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={triggerConfetti}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#FF9900] via-[#F5A623] to-[#E68A00] hover:brightness-110 text-[#2B1704] font-retro text-sm sm:text-base font-extrabold flex items-center justify-center gap-2 shadow-lg hover:shadow-orange-500/20 transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Play Game Online ▶</span>
              </a>
            </div>
          </div>

          {/* Center Column: Summer Promo Sticker & Crew Showcase (Col 6-8) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            
            {/* Promo Sticker Card */}
            <div className="bg-[#FFFDF9] border-3 border-[#3A1D0B] rounded-3xl p-4 sm:p-5 retro-shadow flex flex-col items-center text-center justify-between">
              <div className="relative w-44 sm:w-52 aspect-square rounded-full overflow-hidden border-2 border-[#3A1D0B] retro-shadow-sm mb-3">
                <img
                  src="/images/promo-badge-sticker.jpg"
                  alt="Summer Promo Game Sticker"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div>
                <span className="bg-[#8B3A2B] text-white font-retro text-xs font-bold px-3 py-1 rounded-full">
                  OFFICIAL PROMO STICKER
                </span>
                <h4 className="font-bubble text-xl sm:text-2xl text-[#3A1D0B] mt-2 mb-1">
                  COLLECT &amp; WIN
                </h4>
                <p className="text-xs text-[#6B3C1B] leading-relaxed">
                  Look for this sticker on every to-go cup! Scan anytime for seasonal giveaways and secret discounts.
                </p>
              </div>
            </div>

            {/* Mascot Cups Crew Card */}
            <div className="bg-[#FFFDF9] border-3 border-[#3A1D0B] rounded-3xl p-3.5 retro-shadow flex items-center gap-3">
              <img
                src="/images/promo-cups-crew.jpg"
                alt="Smoke Shop Mascot Cups Crew"
                className="w-24 h-20 rounded-2xl object-cover border-2 border-[#3A1D0B] shrink-0"
              />
              <div>
                <div className="font-bubble text-base text-[#3A1D0B] leading-snug">
                  MEET THE SIPS CREW
                </div>
                <p className="text-[11px] text-[#6B3C1B] line-clamp-2 mt-0.5">
                  Our walking cups are serving fresh vibes every day. Join them in the game!
                </p>
                <span className="font-hand text-xs text-[#8B3A2B] font-bold">
                  High-scores unlock 20% off ♥
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Active Promo Codes & In-Store Perks (Col 9-12) */}
          <div className="lg:col-span-3 flex flex-col gap-3.5">
            
            {/* Challenge Voucher */}
            <div className="bg-[#FFFDF9] border-2 border-[#3A1D0B] rounded-2xl p-4 retro-shadow flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[11px] font-retro font-bold mb-1">
                  <span className="bg-[#27C93F]/20 text-[#1AAB29] px-2 py-0.5 rounded-full border border-[#27C93F]">
                    GAME REWARD
                  </span>
                  <span className="font-extrabold text-[#8B3A2B]">20% OFF</span>
                </div>
                <h4 className="font-bubble text-lg text-[#3A1D0B]">
                  HIGH SCORE VOUCHER
                </h4>
                <p className="text-xs text-[#6B3C1B] leading-relaxed">
                  Score 1,000+ points and use code at checkout for 20% off all drinks &amp; doughnuts!
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-[#DFCBB5] flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#8B3A2B]">CHILLHUB20</span>
                <button
                  onClick={() => handleCopyCode('CHILLHUB20')}
                  className="px-2.5 py-1 rounded-lg bg-[#E29D38] hover:bg-[#D48F2A] text-[#3A1D0B] font-retro text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  {copiedCode === 'CHILLHUB20' ? <Check className="w-3 h-3 text-green-900" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedCode === 'CHILLHUB20' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Board Game Night Perk */}
            <div className="bg-[#FFFDF9] border-2 border-[#3A1D0B] rounded-2xl p-4 retro-shadow flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[11px] font-retro font-bold mb-1">
                  <span className="bg-[#EADDC7] text-[#3A1D0B] px-2 py-0.5 rounded-full border border-[#3A1D0B]">
                    THURSDAYS 5-9 PM
                  </span>
                  <span className="font-bold text-[#8B3A2B]">FREE SHOT</span>
                </div>
                <h4 className="font-bubble text-lg text-[#3A1D0B]">
                  COFFEE &amp; BOARD GAMES
                </h4>
                <p className="text-xs text-[#6B3C1B] leading-relaxed">
                  Free espresso upgrade with any fresh doughnut (Chocolate, Red Velvet, or Birthday).
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-[#DFCBB5] flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#8B3A2B]">GAMENIGHT</span>
                <button
                  onClick={() => handleCopyCode('GAMENIGHT')}
                  className="px-2.5 py-1 rounded-lg bg-[#FAF3E7] hover:bg-[#EADDC7] text-[#3A1D0B] font-retro text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  {copiedCode === 'GAMENIGHT' ? <Check className="w-3 h-3 text-green-900" /> : <Copy className="w-3 h-3" />}
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
              className="w-full py-3 rounded-2xl bg-[#3A1D0B] hover:bg-[#5C3A21] text-white font-retro font-bold text-xs sm:text-sm retro-shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <Coffee className="w-4 h-4 text-[#E29D38]" />
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
              className="bg-[#120D08] border-3 border-[#FF9900] rounded-3xl p-6 max-w-sm w-full text-center text-white relative shadow-2xl"
            >
              <button
                onClick={() => setShowQrModal(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="inline-block bg-[#00D2FF] text-[#0A2540] font-retro text-xs font-bold px-3 py-1 rounded-full mb-3">
                📱 SCAN TO PLAY
              </div>
              <h3 className="font-bubble text-2xl text-[#FFE6B0] mb-2">
                Launch Coffee Game
              </h3>
              <p className="text-gray-300 text-xs mb-4">
                Scan with your smartphone camera to play instantly:
              </p>

              <div className="p-4 bg-white rounded-2xl inline-block shadow-lg mb-4">
                <QRCodeSVG
                  value={gameUrl}
                  size={200}
                  level="H"
                  fgColor="#120D08"
                  bgColor="#FFFFFF"
                />
              </div>

              <div className="font-mono text-xs text-[#FF9900] truncate bg-black/50 p-2 rounded-xl mb-4">
                {gameUrl}
              </div>

              <a
                href={gameUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-[#FF9900] text-[#120D08] font-retro font-bold text-sm block cursor-pointer"
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
