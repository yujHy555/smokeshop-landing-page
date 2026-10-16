import React, { useState, useRef, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import HeroHome from './components/HeroHome';
import PromotionsSection from './components/PromotionsSection';
import MenuSlideshow from './components/MenuSlideshow';
import SideScrollControls from './components/SideScrollControls';
import CartDrawer from './components/CartDrawer';
import SearchModal from './components/SearchModal';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { playPopSound, playSlideWhoosh } from './utils/soundEffects';

export default function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [cartItems, setCartItems] = useState([
    {
      id: 'espresso-shot',
      title: 'ESPRESSO SHOT',
      price: 3.00,
      image: '/images/espresso-shot.jpg',
      milk: 'Standard (None)',
      sweetness: 'Unsweetened',
      quantity: 1,
      cartId: 'default-espresso-1'
    }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const containerRef = useRef(null);
  const isWheelingRef = useRef(false);
  const wheelTimeoutRef = useRef(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftStartRef = useRef(0);
  const touchStartXRef = useRef(0);

  const totalSections = 3;

  // Smooth Soft Scroll to Section Index
  const scrollToSection = useCallback((index) => {
    if (!containerRef.current) return;
    const targetIdx = Math.max(0, Math.min(totalSections - 1, index));
    const container = containerRef.current;
    const targetScrollLeft = targetIdx * container.clientWidth;

    container.scrollTo({
      left: targetScrollLeft,
      behavior: 'smooth'
    });
    setCurrentSection(targetIdx);
  }, [totalSections]);

  // Handle Wheel Events with Soft Magnetic Snap Stop
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      // If modal or cart is open, let normal modal scrolling occur
      if (isCartOpen || isSearchOpen) return;

      // Handle vertical wheel delta (deltaY) and horizontal trackpad swipe (deltaX)
      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      
      if (Math.abs(delta) > 1) {
        e.preventDefault();
        container.scrollLeft += delta * 1.15;
      }

      isWheelingRef.current = true;
      if (wheelTimeoutRef.current) {
        clearTimeout(wheelTimeoutRef.current);
      }

      // Soft stop magnetic settle after user stops wheeling
      wheelTimeoutRef.current = setTimeout(() => {
        isWheelingRef.current = false;
        if (!container) return;
        const width = container.clientWidth;
        const currentScroll = container.scrollLeft;
        const nearestIdx = Math.round(currentScroll / width);
        
        // Gentle soft snap to closest section
        container.scrollTo({
          left: nearestIdx * width,
          behavior: 'smooth'
        });
        setCurrentSection(nearestIdx);
      }, 150);
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      container.removeEventListener('wheel', handleWheel);
      if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current);
    };
  }, [isCartOpen, isSearchOpen]);

  // Track Scroll Progress & Section Detection
  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const scrollLeft = container.scrollLeft;
    const maxScroll = (totalSections - 1) * width;

    const progress = maxScroll > 0 ? scrollLeft / maxScroll : 0;
    setScrollProgress(Math.max(0, Math.min(1, progress)));

    // Active Section calculation
    const calculatedIdx = Math.round(scrollLeft / width);
    if (calculatedIdx !== currentSection && calculatedIdx >= 0 && calculatedIdx < totalSections) {
      setCurrentSection(calculatedIdx);
    }
  }, [currentSection, totalSections]);

  // Mouse Drag-to-Scroll support on desktop
  const handleMouseDown = (e) => {
    if (e.target.closest('button, a, input, select, textarea, .cursor-pointer, .interactive-click')) return;
    isDraggingRef.current = true;
    startXRef.current = e.pageX - containerRef.current.offsetLeft;
    scrollLeftStartRef.current = containerRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current || !containerRef.current) return;
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.6;
    containerRef.current.scrollLeft = scrollLeftStartRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    if (!isDraggingRef.current || !containerRef.current) return;
    isDraggingRef.current = false;
    
    // Soft stop settle to nearest section
    const width = containerRef.current.clientWidth;
    const currentScroll = containerRef.current.scrollLeft;
    const nearestIdx = Math.round(currentScroll / width);
    scrollToSection(nearestIdx);
  };

  // Mobile Touch Swipe support with soft inertia snap
  const handleTouchStart = (e) => {
    if (e.target.closest('button, a, input, select, textarea, .interactive-click')) return;
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (!containerRef.current) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;
    const width = containerRef.current.clientWidth;

    // Detect intentional horizontal swipe (> 45px)
    if (Math.abs(diff) > 45) {
      if (diff > 0 && currentSection < totalSections - 1) {
        playSlideWhoosh();
        scrollToSection(currentSection + 1);
      } else if (diff < 0 && currentSection > 0) {
        playSlideWhoosh();
        scrollToSection(currentSection - 1);
      } else {
        scrollToSection(currentSection);
      }
    } else {
      const nearestIdx = Math.round(containerRef.current.scrollLeft / width);
      scrollToSection(nearestIdx);
    }
  };

  // Keyboard navigation (Arrow keys, 1, 2, 3)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isCartOpen || isSearchOpen) return;
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        playSlideWhoosh();
        scrollToSection(currentSection + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        playSlideWhoosh();
        scrollToSection(currentSection - 1);
      } else if (e.key === '1') {
        scrollToSection(0);
      } else if (e.key === '2') {
        scrollToSection(1);
      } else if (e.key === '3') {
        scrollToSection(2);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSection, isCartOpen, isSearchOpen, scrollToSection]);

  // Cart operations
  const handleAddToCart = (newItem) => {
    setCartItems((prev) => {
      const existing = prev.find(item => item.id === newItem.id && item.milk === newItem.milk && item.sweetness === newItem.sweetness);
      if (existing) {
        return prev.map(item => item === existing ? { ...item, quantity: (item.quantity || 1) + 1 } : item);
      }
      return [...prev, { ...newItem, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (cartId, newQuantity) => {
    playPopSound();
    if (newQuantity <= 0) {
      handleRemoveItem(cartId);
      return;
    }
    setCartItems(prev => prev.map(item => item.cartId === cartId ? { ...item, quantity: newQuantity } : item));
  };

  const handleRemoveItem = (cartId) => {
    playPopSound();
    setCartItems(prev => prev.filter(item => item.cartId !== cartId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartUnits = cartItems.reduce((acc, it) => acc + (it.quantity || 1), 0);

  return (
    <div className="relative min-h-screen w-screen bg-[#F7EFE3] overflow-hidden flex flex-col select-none touch-pan-y">
      
      {/* Top Navbar */}
      <Navbar
        currentSection={currentSection}
        onNavigate={scrollToSection}
        cartCount={totalCartUnits}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
      />

      {/* Main Horizontal Side-Scrolling Viewport */}
      <main
        ref={containerRef}
        onScroll={handleScroll}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="flex-1 flex flex-row overflow-x-auto overflow-y-hidden scroll-snap-x scroll-smooth no-scrollbar w-full h-[calc(100vh-80px)] cursor-grab active:cursor-grabbing touch-pan-x"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {/* SECTION 1: HOME / ABOUT US */}
        <section
          id="home"
          className="scroll-snap-item min-w-full w-full h-full flex-shrink-0 flex items-stretch overflow-y-auto no-scrollbar"
        >
          <HeroHome 
            onGoToMenu={() => scrollToSection(2)}
            onGoToPromos={() => scrollToSection(1)}
          />
        </section>

        {/* SECTION 2: PROMOTIONS */}
        <section
          id="promotions"
          className="scroll-snap-item min-w-full w-full h-full flex-shrink-0 flex items-stretch overflow-y-auto no-scrollbar"
        >
          <PromotionsSection 
            onGoToMenu={() => scrollToSection(2)}
          />
        </section>

        {/* SECTION 3: MENU SHOWCASE & AUTOMATIC PRODUCT SLIDESHOW */}
        <section
          id="menu"
          className="scroll-snap-item min-w-full w-full h-full flex-shrink-0 flex items-stretch overflow-y-auto no-scrollbar"
        >
          <MenuSlideshow 
            onAddToCart={handleAddToCart}
            onOpenCart={() => setIsCartOpen(true)}
          />
        </section>
      </main>

      {/* Desktop Side Quick Glide Arrows */}
      {currentSection > 0 && (
        <button
          onClick={() => {
            playSlideWhoosh();
            scrollToSection(currentSection - 1);
          }}
          className="fixed left-3 top-1/2 -translate-y-1/2 z-30 hidden lg:flex w-12 h-12 rounded-full bg-[#FAF3E7]/90 hover:bg-[#8B3A2B] text-[#3A1D0B] hover:text-white border-2 border-[#3A1D0B] items-center justify-center retro-shadow transition-all cursor-pointer group"
          title="Previous Section (Left Arrow)"
          aria-label="Previous Section"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {currentSection < totalSections - 1 && (
        <button
          onClick={() => {
            playSlideWhoosh();
            scrollToSection(currentSection + 1);
          }}
          className="fixed right-3 top-1/2 -translate-y-1/2 z-30 hidden lg:flex w-12 h-12 rounded-full bg-[#FAF3E7]/90 hover:bg-[#8B3A2B] text-[#3A1D0B] hover:text-white border-2 border-[#3A1D0B] items-center justify-center retro-shadow transition-all cursor-pointer group"
          title="Next Section (Right Arrow)"
          aria-label="Next Section"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Floating Bottom Navigation Controller with Progress Track */}
      <SideScrollControls
        currentSection={currentSection}
        totalSections={totalSections}
        onNavigate={scrollToSection}
        scrollProgress={scrollProgress}
      />

      {/* Interactive Cart Tray Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={() => {
          scrollToSection(2);
        }}
        onSelectPromo={() => {
          scrollToSection(1);
        }}
      />

    </div>
  );
}
