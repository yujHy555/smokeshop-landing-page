import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, ChevronLeft, ChevronRight, Plus, Sparkles, Heart, Check, Coffee, Flame, Info, Eye } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { playPopSound, playSipChime, playSlideWhoosh } from '../utils/soundEffects';

export default function MenuSlideshow({ onAddToCart, onOpenCart }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [selectedMilk, setSelectedMilk] = useState('Whole Milk');
  const [selectedSweetness, setSelectedSweetness] = useState('Standard');
  const [addedItemName, setAddedItemName] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [viewMode, setViewMode] = useState('slideshow'); // 'slideshow' | 'grid'

  const SLIDE_DURATION = 5000; // 5 seconds per slide
  const currentProduct = PRODUCTS[currentIndex];

  // Auto-play progress loop
  useEffect(() => {
    if (!isPlaying) return;

    const intervalTime = 50;
    const step = (intervalTime / SLIDE_DURATION) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentIndex((curr) => (curr + 1) % PRODUCTS.length);
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPlaying, currentIndex]);

  const handleNext = () => {
    playSlideWhoosh();
    setProgress(0);
    setCurrentIndex((prev) => (prev + 1) % PRODUCTS.length);
  };

  const handlePrev = () => {
    playSlideWhoosh();
    setProgress(0);
    setCurrentIndex((prev) => (prev - 1 + PRODUCTS.length) % PRODUCTS.length);
  };

  const handleSelectSlide = (idx) => {
    playPopSound();
    setProgress(0);
    setCurrentIndex(idx);
  };

  const handleAddCurrentToCart = (product = currentProduct) => {
    playSipChime();
    const itemToAdd = {
      ...product,
      milk: selectedMilk,
      sweetness: selectedSweetness,
      cartId: `${product.id}-${selectedMilk}-${selectedSweetness}-${Date.now()}`
    };
    onAddToCart(itemToAdd);
    setAddedItemName(product.title);
    setTimeout(() => setAddedItemName(null), 2500);
  };

  const filteredProducts = activeFilter === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeFilter);

  return (
    <div className="relative min-w-full w-full min-h-[calc(100vh-80px)] flex flex-col justify-between bg-[#F7EFE3] overflow-hidden px-4 sm:px-8 lg:px-14 py-8 sm:py-10">
      
      <div className="max-w-7xl mx-auto w-full z-10 flex-1 flex flex-col justify-center">
        
        {/* Header Strip */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFDF9] border-2 border-[#3A1D0B] text-xs font-retro font-bold text-[#6B3C1B] retro-shadow-sm mb-3">
              <Coffee className="w-4 h-4 text-[#8B3A2B]" />
              <span>SECTION 03 • ARTISAN MENU SHOWCASE</span>
            </div>
            <h2 className="font-bubble text-4xl sm:text-5xl md:text-6xl text-[#3A1D0B] leading-none">
              OUR HANDCRAFTED MENU
            </h2>
            <p className="font-retro text-base sm:text-lg text-[#6B3C1B] mt-2">
              Featuring our signature espresso pulls, icy coffee freezas, and autumn favorites.
            </p>
          </div>

          {/* View Mode & Play/Pause Controls */}
          <div className="flex items-center gap-3">
            {/* Filter Pills */}
            <div className="hidden lg:flex items-center gap-1.5 bg-[#FAF3E7] p-1 rounded-full border-2 border-[#3A1D0B]">
              {['All', 'Hot Sips', 'Frosty Blends', 'Seasonal'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    playPopSound();
                    setActiveFilter(cat);
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-retro font-bold transition-all ${
                    activeFilter === cat 
                      ? 'bg-[#3A1D0B] text-white' 
                      : 'text-[#6B3C1B] hover:text-[#3A1D0B]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Toggle Slideshow / Grid */}
            <button
              onClick={() => {
                playPopSound();
                setViewMode(viewMode === 'slideshow' ? 'grid' : 'slideshow');
              }}
              className="px-3.5 py-1.5 rounded-full bg-[#FFFDF9] border-2 border-[#3A1D0B] font-retro text-xs font-bold text-[#3A1D0B] retro-shadow-sm hover:bg-[#EADDC7] transition-colors cursor-pointer"
            >
              {viewMode === 'slideshow' ? 'View All Grid' : 'View Slideshow'}
            </button>

            {/* Play / Pause Button */}
            {viewMode === 'slideshow' && (
              <button
                onClick={() => {
                  playPopSound();
                  setIsPlaying(!isPlaying);
                }}
                className="w-9 h-9 rounded-full bg-[#FFFDF9] border-2 border-[#3A1D0B] flex items-center justify-center text-[#3A1D0B] retro-shadow-sm hover:bg-[#EADDC7] transition-colors cursor-pointer"
                title={isPlaying ? "Pause Automatic Slideshow" : "Resume Automatic Slideshow"}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>
            )}
          </div>
        </div>

        {/* Content Body: Slideshow vs Grid */}
        {viewMode === 'slideshow' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            {/* Left Column: The Authentic Mockup Card Presentation (Col 1-7) */}
            <div className="lg:col-span-7 relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentProduct.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="bg-[#FFFDF9] border-3 border-[#3A1D0B] rounded-3xl overflow-hidden retro-shadow-lg relative group"
                >
                  {/* Real Mockup Image Rendering */}
                  <div className="relative aspect-[16/9] w-full bg-[#FAF3E7] overflow-hidden flex items-center justify-center">
                    <img
                      src={currentProduct.image}
                      alt={currentProduct.title}
                      className="w-full h-full object-contain sm:object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Floating Badge */}
                    <div className="absolute top-4 left-4 bg-[#FFFDF9] border-2 border-[#3A1D0B] px-3.5 py-1 rounded-full font-retro text-xs font-bold text-[#8B3A2B] retro-shadow-sm">
                      {currentProduct.badge}
                    </div>

                    {/* Category pill */}
                    <div className="absolute top-4 right-4 bg-[#3A1D0B] text-white px-3 py-1 rounded-full font-retro text-xs font-bold">
                      {currentProduct.category}
                    </div>
                  </div>

                  {/* Slideshow Progress Bar Strip */}
                  <div className="w-full bg-[#EADDC7] h-1.5 overflow-hidden">
                    <div 
                      className="h-full bg-[#8B3A2B] transition-all duration-75"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Prev / Next Floating Arrows */}
              <button
                onClick={handlePrev}
                className="absolute left-2 sm:-left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#FFFDF9] border-2 border-[#3A1D0B] flex items-center justify-center text-[#3A1D0B] retro-shadow hover:bg-[#EADDC7] transition-all cursor-pointer z-20"
                aria-label="Previous Drink"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-2 sm:-right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#FFFDF9] border-2 border-[#3A1D0B] flex items-center justify-center text-[#3A1D0B] retro-shadow hover:bg-[#EADDC7] transition-all cursor-pointer z-20"
                aria-label="Next Drink"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Right Column: Interactive Details & Order Customizer (Col 8-12) */}
            <div className="lg:col-span-5 bg-[#FFFDF9] border-3 border-[#3A1D0B] rounded-3xl p-6 sm:p-7 retro-shadow-lg flex flex-col justify-between">
              
              <div>
                {/* Title & Price Header */}
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="font-bubble text-3xl sm:text-4xl text-[#3A1D0B] leading-tight">
                      {currentProduct.title}
                    </h3>
                    <div className="font-retro text-xs font-bold text-[#8A5230] tracking-wide mt-1">
                      {currentProduct.details}
                    </div>
                  </div>

                  <div className="bg-[#FAF3E7] border-2 border-[#3A1D0B] px-3.5 py-1.5 rounded-2xl retro-shadow-sm text-center">
                    <span className="font-retro text-2xl font-bold text-[#8B3A2B]">
                      {currentProduct.formattedPrice}
                    </span>
                  </div>
                </div>

                {/* Description matching user's mockup text */}
                <p className="text-[#5C3A21] text-sm leading-relaxed mb-4">
                  {currentProduct.description}
                </p>

                {/* Doodled Note */}
                <div className="flex items-center gap-2 font-hand text-lg text-[#8B3A2B] mb-5">
                  <span>{currentProduct.tagline}</span>
                  <span>•</span>
                  <span className="text-sm font-retro text-[#6B3C1B]">{currentProduct.roast}</span>
                </div>

                {/* Customizer Options */}
                <div className="space-y-3 pt-3 border-t border-[#DFCBB5]">
                  <div>
                    <label className="block text-xs font-retro font-bold text-[#6B3C1B] uppercase mb-1.5">
                      Milk Option:
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Whole Milk', 'Oat Milk (+0.50)', 'Almond Milk'].map((milk) => (
                        <button
                          key={milk}
                          onClick={() => {
                            playPopSound();
                            setSelectedMilk(milk);
                          }}
                          className={`py-1.5 px-2 rounded-xl text-xs font-retro font-bold border-2 transition-all cursor-pointer ${
                            selectedMilk === milk 
                              ? 'bg-[#3A1D0B] text-white border-[#3A1D0B] retro-shadow-sm' 
                              : 'bg-[#FAF3E7] text-[#6B3C1B] border-[#DFCBB5] hover:border-[#3A1D0B]'
                          }`}
                        >
                          {milk.split(' ')[0]}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-retro font-bold text-[#6B3C1B] uppercase mb-1.5">
                      Sweetness:
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Standard', 'Half Sweet', 'Unsweetened'].map((sweet) => (
                        <button
                          key={sweet}
                          onClick={() => {
                            playPopSound();
                            setSelectedSweetness(sweet);
                          }}
                          className={`py-1.5 px-2 rounded-xl text-xs font-retro font-bold border-2 transition-all cursor-pointer ${
                            selectedSweetness === sweet 
                              ? 'bg-[#8B3A2B] text-white border-[#3A1D0B] retro-shadow-sm' 
                              : 'bg-[#FAF3E7] text-[#6B3C1B] border-[#DFCBB5] hover:border-[#3A1D0B]'
                          }`}
                        >
                          {sweet}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Add to Tray Button & Thumbnails */}
              <div className="mt-6 pt-4 border-t border-[#DFCBB5]">
                <button
                  onClick={() => handleAddCurrentToCart()}
                  className="w-full py-3.5 rounded-full bg-[#8B3A2B] hover:bg-[#A54534] text-white font-retro font-bold text-base border-2 border-[#3A1D0B] retro-shadow retro-shadow-hover flex items-center justify-center gap-2 cursor-pointer mb-4"
                >
                  <Plus className="w-5 h-5" />
                  <span>ADD TO SIP TRAY • {currentProduct.formattedPrice}</span>
                </button>

                {/* Added Confirmation Banner */}
                {addedItemName && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#27C93F]/15 border border-[#27C93F] text-[#1E7E2C] text-xs font-retro font-bold py-1.5 px-3 rounded-xl flex items-center justify-between mb-3"
                  >
                    <span className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5" /> Added {addedItemName} to your tray!
                    </span>
                    <button 
                      onClick={onOpenCart} 
                      className="underline cursor-pointer hover:text-black"
                    >
                      View Tray ➔
                    </button>
                  </motion.div>
                )}

                {/* Slideshow Thumbnail Indicator Dots */}
                <div className="flex items-center justify-center gap-2">
                  {PRODUCTS.map((prod, idx) => (
                    <button
                      key={prod.id}
                      onClick={() => handleSelectSlide(idx)}
                      className={`h-2.5 rounded-full transition-all cursor-pointer ${
                        currentIndex === idx 
                          ? 'w-8 bg-[#8B3A2B] border border-[#3A1D0B]' 
                          : 'w-2.5 bg-[#DFCBB5] hover:bg-[#6B3C1B]'
                      }`}
                      title={prod.title}
                    />
                  ))}
                </div>
              </div>

            </div>

          </div>
        ) : (
          /* Grid View Mode */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {filteredProducts.map((prod) => (
              <div 
                key={prod.id}
                className="bg-[#FFFDF9] border-2 border-[#3A1D0B] rounded-3xl p-4 retro-shadow flex flex-col justify-between hover:translate-y-[-2px] transition-transform"
              >
                <div>
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#FAF3E7] border border-[#DFCBB5] mb-3 relative">
                    <img 
                      src={prod.image} 
                      alt={prod.title}
                      className="w-full h-full object-cover" 
                    />
                    <span className="absolute top-2 right-2 bg-[#3A1D0B] text-white text-[10px] font-retro font-bold px-2 py-0.5 rounded-full">
                      {prod.formattedPrice}
                    </span>
                  </div>

                  <h4 className="font-bubble text-xl text-[#3A1D0B] mb-1">
                    {prod.title}
                  </h4>
                  <p className="text-xs text-[#6B3C1B] line-clamp-2 leading-relaxed mb-2">
                    {prod.description}
                  </p>
                  <div className="font-hand text-xs text-[#8B3A2B]">
                    {prod.details}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#DFCBB5] flex items-center justify-between">
                  <span className="font-retro text-xs font-bold text-[#8B3A2B]">
                    {prod.badge}
                  </span>
                  <button
                    onClick={() => handleAddCurrentToCart(prod)}
                    className="p-2 rounded-xl bg-[#8B3A2B] text-white hover:bg-[#A54534] transition-colors cursor-pointer"
                    title={`Add ${prod.title} to tray`}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
