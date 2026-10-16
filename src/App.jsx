import React, { useState, useRef, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import HeroHome from './components/HeroHome';
import PromotionsSection from './components/PromotionsSection';
import MenuSlideshow from './components/MenuSlideshow';
import SideScrollControls from './components/SideScrollControls';
import CartDrawer from './components/CartDrawer';
import SearchModal from './components/SearchModal';
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

      // Translate vertical wheel delta into horizontal scroll
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        container.scrollLeft += e.deltaY * 1.05;
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
      }, 140);
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

  // Drag-to-Scroll support on desktop
  const handleMouseDown = (e) => {
    // Only drag on non-interactive elements
    if (e.target.closest('button, a, input, select, textarea, .cursor-pointer')) return;
    isDraggingRef.current = true;
    startXRef.current = e.pageX - containerRef.current.offsetLeft;
    scrollLeftStartRef.current = containerRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
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
    <div className="relative min-h-screen w-screen bg-[#F7EFE3] overflow-hidden flex flex-col select-none">
      
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
        className="flex-1 flex flex-row overflow-x-auto overflow-y-hidden scroll-snap-x scroll-smooth no-scrollbar w-full h-[calc(100vh-80px)] cursor-grab active:cursor-grabbing"
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
        onSelectProduct={(product) => {
          scrollToSection(2);
        }}
        onSelectPromo={(promo) => {
          scrollToSection(1);
        }}
      />

    </div>
  );
}
