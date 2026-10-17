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
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const containerRef = useRef(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftStartRef = useRef(0);
  const lastMouseXRef = useRef(0);
  const lastMouseTimeRef = useRef(0);
  const velocityXRef = useRef(0);
  const momentumFrameRef = useRef(null);

  // Wheel transition lock & accumulator
  const isTransitioningRef = useRef(false);
  const accumulatedDeltaRef = useRef(0);
  const deltaResetTimeoutRef = useRef(null);

  const totalSections = 3;

  // Smooth Scroll to Section Index (triggered only by explicit button/arrow clicks)
  const scrollToSection = useCallback((index) => {
    if (!containerRef.current) return;
    const targetIdx = Math.max(0, Math.min(totalSections - 1, index));
    const container = containerRef.current;
    const targetScrollLeft = targetIdx * container.clientWidth;

    if (momentumFrameRef.current) {
      cancelAnimationFrame(momentumFrameRef.current);
    }

    container.scrollTo({
      left: targetScrollLeft,
      behavior: 'smooth'
    });
    setCurrentSection(targetIdx);
  }, [totalSections]);

  // Handle Middle Mouse Wheel scrolling
  useEffect(() => {
    const handleGlobalWheel = (e) => {
      // If modal or cart is open, let modal scroll normally
      if (isCartOpen || isSearchOpen) return;

      // Check if mouse is hovering over an actively scrollable container (e.g. grid list)
      const scrollableChild = e.target.closest('.overflow-y-auto');
      if (scrollableChild) {
        const canScrollDown = scrollableChild.scrollTop + scrollableChild.clientHeight < scrollableChild.scrollHeight - 4;
        const canScrollUp = scrollableChild.scrollTop > 4;
        if ((e.deltaY > 0 && canScrollDown) || (e.deltaY < 0 && canScrollUp)) {
          return;
        }
      }

      e.preventDefault();

      if (momentumFrameRef.current) {
        cancelAnimationFrame(momentumFrameRef.current);
      }

      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      accumulatedDeltaRef.current += delta;

      if (deltaResetTimeoutRef.current) {
        clearTimeout(deltaResetTimeoutRef.current);
      }

      // If not currently transitioning, check threshold
      if (!isTransitioningRef.current) {
        const threshold = 30; // responsive trigger for middle mouse wheel notches
        if (accumulatedDeltaRef.current > threshold) {
          if (currentSection < totalSections - 1) {
            isTransitioningRef.current = true;
            playSlideWhoosh();
            scrollToSection(currentSection + 1);
            accumulatedDeltaRef.current = 0;
            setTimeout(() => {
              isTransitioningRef.current = false;
            }, 600);
          }
        } else if (accumulatedDeltaRef.current < -threshold) {
          if (currentSection > 0) {
            isTransitioningRef.current = true;
            playSlideWhoosh();
            scrollToSection(currentSection - 1);
            accumulatedDeltaRef.current = 0;
            setTimeout(() => {
              isTransitioningRef.current = false;
            }, 600);
          }
        }
      }

      // Reset accumulated delta when rolling pauses
      deltaResetTimeoutRef.current = setTimeout(() => {
        accumulatedDeltaRef.current = 0;
      }, 180);
    };

    window.addEventListener('wheel', handleGlobalWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleGlobalWheel);
      if (deltaResetTimeoutRef.current) clearTimeout(deltaResetTimeoutRef.current);
    };
  }, [currentSection, totalSections, isCartOpen, isSearchOpen, scrollToSection]);

  // Track Scroll Progress & Section Detection Continuously
  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const scrollLeft = container.scrollLeft;
    const maxScroll = (totalSections - 1) * width;

    const progress = maxScroll > 0 ? scrollLeft / maxScroll : 0;
    setScrollProgress(Math.max(0, Math.min(1, progress)));

    // Active Section calculation for navbar and dock indicators
    const calculatedIdx = Math.round(scrollLeft / width);
    if (calculatedIdx !== currentSection && calculatedIdx >= 0 && calculatedIdx < totalSections) {
      setCurrentSection(calculatedIdx);
    }
  }, [currentSection, totalSections]);

  // Smooth Canvas Drag with Natural Inertia and NO SNAP
  const handleMouseDown = (e) => {
    if (e.target.closest('button, a, input, select, textarea, .cursor-pointer, .interactive-click')) return;
    
    if (momentumFrameRef.current) {
      cancelAnimationFrame(momentumFrameRef.current);
    }

    isDraggingRef.current = true;
    startXRef.current = e.pageX;
    scrollLeftStartRef.current = containerRef.current.scrollLeft;
    lastMouseXRef.current = e.pageX;
    lastMouseTimeRef.current = performance.now();
    velocityXRef.current = 0;
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current || !containerRef.current) return;
    e.preventDefault();

    const currentX = e.pageX;
    const now = performance.now();
    const dt = now - lastMouseTimeRef.current;
    const dx = currentX - lastMouseXRef.current;

    if (dt > 0) {
      velocityXRef.current = dx / dt;
    }

    lastMouseXRef.current = currentX;
    lastMouseTimeRef.current = now;

    const walk = (currentX - startXRef.current) * 1.25;
    containerRef.current.scrollLeft = scrollLeftStartRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    if (!isDraggingRef.current || !containerRef.current) return;
    isDraggingRef.current = false;

    // Apply natural momentum glide without forcing snap to any section
    let v = -velocityXRef.current * 14;
    const friction = 0.93;

    const runMomentum = () => {
      if (Math.abs(v) > 0.4 && containerRef.current && !isDraggingRef.current) {
        containerRef.current.scrollLeft += v;
        v *= friction;
        momentumFrameRef.current = requestAnimationFrame(runMomentum);
      }
    };

    if (Math.abs(v) > 0.8) {
      momentumFrameRef.current = requestAnimationFrame(runMomentum);
    }
  };

  // Touch Drag on Mobile without snap to section
  const touchLastXRef = useRef(0);
  const touchLastTimeRef = useRef(0);
  const touchVelocityRef = useRef(0);

  const handleTouchStart = (e) => {
    if (e.target.closest('button, a, input, select, textarea, .interactive-click')) return;
    if (momentumFrameRef.current) {
      cancelAnimationFrame(momentumFrameRef.current);
    }
    const touch = e.touches[0];
    startXRef.current = touch.clientX;
    scrollLeftStartRef.current = containerRef.current.scrollLeft;
    touchLastXRef.current = touch.clientX;
    touchLastTimeRef.current = performance.now();
    touchVelocityRef.current = 0;
  };

  const handleTouchMove = (e) => {
    if (!containerRef.current) return;
    const touch = e.touches[0];
    const now = performance.now();
    const dt = now - touchLastTimeRef.current;
    const dx = touch.clientX - touchLastXRef.current;

    if (dt > 0) {
      touchVelocityRef.current = dx / dt;
    }

    touchLastXRef.current = touch.clientX;
    touchLastTimeRef.current = now;

    const walk = (touch.clientX - startXRef.current);
    containerRef.current.scrollLeft = scrollLeftStartRef.current - walk;
  };

  const handleTouchEnd = () => {
    if (!containerRef.current) return;
    // Apply natural touch momentum glide without snap
    let v = -touchVelocityRef.current * 16;
    const friction = 0.94;

    const runTouchMomentum = () => {
      if (Math.abs(v) > 0.4 && containerRef.current) {
        containerRef.current.scrollLeft += v;
        v *= friction;
        momentumFrameRef.current = requestAnimationFrame(runTouchMomentum);
      }
    };

    if (Math.abs(v) > 0.8) {
      momentumFrameRef.current = requestAnimationFrame(runTouchMomentum);
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
    <div className="relative h-[100dvh] max-h-[100dvh] w-screen bg-[#F7EFE3] overflow-hidden flex flex-col select-none touch-pan-x">
      
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

      {/* Main Horizontal Side-Scrolling Viewport: Smooth drag without snap */}
      <main
        ref={containerRef}
        onScroll={handleScroll}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="flex-1 flex flex-row overflow-x-hidden overflow-y-hidden no-scrollbar w-full h-[calc(100dvh-54px)] sm:h-[calc(100dvh-60px)] cursor-grab active:cursor-grabbing touch-pan-x"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {/* SECTION 1: HOME / ABOUT US */}
        <section
          id="home"
          className="min-w-full w-full h-full flex-shrink-0 flex items-stretch overflow-hidden select-none"
        >
          <HeroHome 
            onGoToMenu={() => scrollToSection(2)}
            onGoToPromos={() => scrollToSection(1)}
          />
        </section>

        {/* SECTION 2: PROMOTIONS */}
        <section
          id="promotions"
          className="min-w-full w-full h-full flex-shrink-0 flex items-stretch overflow-hidden select-none"
        >
          <PromotionsSection 
            onGoToMenu={() => scrollToSection(2)}
          />
        </section>

        {/* SECTION 3: MENU SHOWCASE & AUTOMATIC PRODUCT SLIDESHOW */}
        <section
          id="menu"
          className="min-w-full w-full h-full flex-shrink-0 flex items-stretch overflow-hidden select-none"
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

      {/* Floating Bottom Navigation Controller with Continuous Progress Track */}
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
