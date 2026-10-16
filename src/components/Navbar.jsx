import React, { useState } from 'react';
import { ShoppingBag, Search, Sparkles, Volume2, VolumeX, Coffee, Gamepad2, Menu as MenuIcon, X } from 'lucide-react';
import { playPopSound } from '../utils/soundEffects';

export default function Navbar({ 
  currentSection = 0, 
  onNavigate, 
  cartCount = 0, 
  onOpenCart, 
  onOpenSearch,
  soundEnabled = true,
  onToggleSound 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 0, label: 'HOME & ABOUT', href: '#home' },
    { id: 1, label: 'PROMOTIONS', href: '#promotions' },
    { id: 2, label: 'MENU', href: '#menu' },
  ];

  const handleNavClick = (idx) => {
    playPopSound();
    onNavigate(idx);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF3E7]/95 backdrop-blur-md border-b-2 border-[#4A2E1B] transition-colors">
      {/* Browser Window Chrome Top Header Strip (From Mockup) */}
      <div className="bg-[#EFE4D2] px-4 py-1.5 border-b border-[#DFCBB5] flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] inline-block shadow-xs"></span>
          <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] inline-block shadow-xs"></span>
          <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29] inline-block shadow-xs"></span>
          <span className="ml-3 font-retro text-[#7E5738] hidden sm:inline-block tracking-wider">
            ☕ the-smokeshop.chill • artisanal cafe & coffee game
          </span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://coffee-zeta-weld.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[11px] font-retro bg-[#8B3A2B] text-[#FFFDF9] px-2.5 py-0.5 rounded-full hover:bg-[#A54534] transition-colors retro-shadow-sm"
          >
            <Gamepad2 className="w-3 h-3" />
            <span>Play Game Online</span>
          </a>

          <button
            onClick={onToggleSound}
            title={soundEnabled ? "Mute interactive sounds" : "Enable tactile sounds"}
            className="text-[#6B3C1B] hover:text-[#3A1D0B] p-0.5 rounded transition-colors"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5 opacity-50" />}
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Logo matching mockup */}
        <button 
          onClick={() => handleNavClick(0)}
          className="flex items-center gap-2.5 sm:gap-3 text-left focus:outline-hidden group"
        >
          {/* Cute Mini Mascot Cup in Logo */}
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#FFFDF9] border-2 border-[#4A2E1B] flex items-center justify-center retro-shadow-sm group-hover:rotate-6 transition-transform">
            <span className="text-xl">☕</span>
          </div>

          <div className="flex flex-col">
            <div className="font-bubble text-xl sm:text-2xl text-[#4A2E1B] tracking-tight leading-none group-hover:text-[#8B3A2B] transition-colors">
              SMOKE SHOP
            </div>
            <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-retro text-[#8A5230] tracking-widest uppercase">
              <span>EST. 2024</span>
              <span>•</span>
              <span className="text-[#8B3A2B] font-bold">CHILL HUB</span>
            </div>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map((item) => {
            const isActive = currentSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2 rounded-full font-retro text-sm font-bold tracking-wider transition-all duration-200 relative ${
                  isActive 
                    ? 'bg-[#4A2E1B] text-[#FFFDF9] retro-shadow-sm scale-105' 
                    : 'text-[#6B3C1B] hover:text-[#3A1D0B] hover:bg-[#EADDC7]/60'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#E29D38]"></span>
                )}
              </button>
            );
          })}

          {/* Direct Link to the Game on Promo Page */}
          <a
            href="https://coffee-zeta-weld.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 flex items-center gap-1.5 px-3 py-1.5 rounded-full font-retro text-xs font-bold text-[#8B3A2B] border-2 border-dashed border-[#8B3A2B] hover:bg-[#8B3A2B] hover:text-white transition-all duration-200"
          >
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>Coffee Game ↗</span>
          </a>
        </nav>

        {/* Right Action Icons (Search & Cart Tray) */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => {
              playPopSound();
              onOpenSearch();
            }}
            className="w-10 h-10 rounded-full bg-[#FFFDF9] border-2 border-[#4A2E1B] flex items-center justify-center text-[#4A2E1B] hover:bg-[#EADDC7] transition-colors retro-shadow-sm cursor-pointer"
            title="Search menu and promos"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              playPopSound();
              onOpenCart();
            }}
            className="relative h-10 px-3 sm:px-4 rounded-full bg-[#8B3A2B] hover:bg-[#A54534] text-[#FFFDF9] border-2 border-[#4A2E1B] flex items-center gap-2 transition-all retro-shadow-sm cursor-pointer"
            title="View Sip Tray"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="font-retro text-xs sm:text-sm font-bold hidden sm:inline">Tray</span>
            {cartCount > 0 && (
              <span className="bg-[#E29D38] text-[#3A1D0B] text-xs font-bold font-retro rounded-full w-5 h-5 flex items-center justify-center border border-[#3A1D0B] animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => {
              playPopSound();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="md:hidden w-10 h-10 rounded-full bg-[#FFFDF9] border-2 border-[#4A2E1B] flex items-center justify-center text-[#4A2E1B] retro-shadow-sm cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF3E7] border-b-2 border-[#4A2E1B] px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-4 py-2.5 rounded-xl font-retro font-bold text-base flex items-center justify-between ${
                currentSection === item.id 
                  ? 'bg-[#4A2E1B] text-[#FFFDF9]' 
                  : 'text-[#6B3C1B] hover:bg-[#EADDC7]'
              }`}
            >
              <span>{item.label}</span>
              {currentSection === item.id && <Sparkles className="w-4 h-4 text-[#E29D38]" />}
            </button>
          ))}
          <a
            href="https://coffee-zeta-weld.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl font-retro font-bold text-sm bg-[#8B3A2B] text-white"
          >
            <span className="flex items-center gap-2">
              <Gamepad2 className="w-4 h-4" />
              Play Coffee Game
            </span>
            <span>↗</span>
          </a>
        </div>
      )}
    </header>
  );
}
