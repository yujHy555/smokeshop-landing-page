import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, ChevronLeft, ChevronRight, Plus, Sparkles, Heart, Check, Coffee, Cake, Maximize2, X } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { playPopSound, playSipChime, playSlideWhoosh } from '../utils/soundEffects';

export default function MenuSlideshow({ onAddToCart, onOpenCart }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  // Drink customizer state
  const [selectedMilk, setSelectedMilk] = useState('Whole Milk');
  const [selectedSweetness, setSelectedSweetness] = useState('Standard');

  // Food customizer state
  const [selectedPrep, setSelectedPrep] = useState('Warm from Oven');
  const [selectedPackaging, setSelectedPackaging] = useState('Bakery Pouch');

  const [addedItemName, setAddedItemName] = useState(null);
  const [viewMode, setViewMode] = useState('slideshow'); // 'slideshow' | 'grid'
  const [zoomImage, setZoomImage] = useState(null);

  const SLIDE_DURATION = 5000; // 5s per slide

  // Filter products by category
  const activeProducts = activeCategory === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  // Safety clamp index when category filter changes
  useEffect(() => {
    setCurrentIndex(0);
    setProgress(0);
  }, [activeCategory]);

  const currentProduct = activeProducts[currentIndex] || activeProducts[0] || PRODUCTS[0];
  const isFoodItem = currentProduct.type === 'food';

  // Auto-play progress loop
  useEffect(() => {
    if (!isPlaying || activeProducts.length <= 1) return;

    const intervalTime = 50;
    const step = (intervalTime / SLIDE_DURATION) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentIndex((curr) => (curr + 1) % activeProducts.length);
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPlaying, currentIndex, activeProducts.length]);

  const handleNext = () => {
    playSlideWhoosh();
    setProgress(0);
    setCurrentIndex((prev) => (prev + 1) % activeProducts.length);
  };

  const handlePrev = () => {
    playSlideWhoosh();
    setProgress(0);
    setCurrentIndex((prev) => (prev - 1 + activeProducts.length) % activeProducts.length);
  };

  const handleSelectSlide = (idx) => {
    playPopSound();
    setProgress(0);
    setCurrentIndex(idx);
  };

  const handleAddCurrentToCart = (product = currentProduct) => {
    playSipChime();
    const isFood = product.type === 'food';
    const itemToAdd = {
      ...product,
      milk: isFood ? selectedPrep : selectedMilk,
      sweetness: isFood ? selectedPackaging : selectedSweetness,
      customNote: isFood ? `${selectedPrep} • ${selectedPackaging}` : `${selectedMilk} • ${selectedSweetness}`,
      cartId: `${product.id}-${isFood ? selectedPrep : selectedMilk}-${Date.now()}`
    };
    onAddToCart(itemToAdd);
    setAddedItemName(product.title);
    setTimeout(() => setAddedItemName(null), 2500);
  };

  return (
    <div className="relative min-w-full w-full min-h-[calc(100vh-80px)] flex flex-col justify-between bg-[#F7EFE3] overflow-hidden px-4 sm:px-6 lg:px-12 py-5 sm:py-8">
      
      <div className="max-w-[1500px] mx-auto w-full z-10 flex-1 flex flex-col justify-center">
        
        {/* Header Strip */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFDF9] border-2 border-[#3A1D0B] text-xs font-retro font-bold text-[#6B3C1B] retro-shadow-sm mb-2">
              <Sparkles className="w-4 h-4 text-[#8B3A2B]" />
              <span>SECTION 03 • ARTISAN MENU SHOWCASE</span>
            </div>
            <h2 className="font-bubble text-3xl sm:text-5xl md:text-6xl text-[#3A1D0B] leading-none">
              OUR HANDCRAFTED MENU
            </h2>
            <p className="font-retro text-sm sm:text-base text-[#6B3C1B] mt-1">
              Featuring velvety espresso, frosty coffee freezas, and oven-fresh artisan doughnuts!
            </p>
          </div>

          {/* View Mode & Controls */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* View Mode Toggle */}
            <button
              onClick={() => {
                playPopSound();
                setViewMode(viewMode === 'slideshow' ? 'grid' : 'slideshow');
              }}
              className="px-4 py-1.5 rounded-full bg-[#FFFDF9] border-2 border-[#3A1D0B] font-retro text-xs font-bold text-[#3A1D0B] retro-shadow-sm hover:bg-[#EADDC7] transition-colors cursor-pointer"
            >
              {viewMode === 'slideshow' ? 'Browse Grid View (7 Items)' : 'Showcase Slideshow'}
            </button>

            {/* Play / Pause Button for slideshow */}
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

        {/* Category Filter Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1.5 mb-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                playPopSound();
                setActiveCategory(cat.id);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-retro font-bold whitespace-nowrap transition-all border-2 cursor-pointer ${
                activeCategory === cat.id 
                  ? 'bg-[#3A1D0B] text-white border-[#3A1D0B] retro-shadow-sm scale-105' 
                  : 'bg-[#FFFDF9] text-[#6B3C1B] border-[#DFCBB5] hover:border-[#3A1D0B]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Content Body: Large Featured Slideshow vs Grand Grid */}
        {viewMode === 'slideshow' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center">
            
            {/* Left Column: Extra Large Featured Mockup Card (Col 1-8: Massive Showcase!) */}
            <div className="lg:col-span-8 relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentProduct.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="bg-[#FFFDF9] border-3 border-[#3A1D0B] rounded-3xl overflow-hidden retro-shadow-lg relative group cursor-pointer"
                  onClick={() => setZoomImage(currentProduct)}
                  title="Click to view full-resolution image"
                >
                  {/* Extra Large Image Container */}
                  <div className="relative min-h-[380px] sm:min-h-[460px] md:min-h-[520px] lg:min-h-[580px] xl:min-h-[620px] w-full bg-[#FAF3E7] p-2 sm:p-5 flex items-center justify-center overflow-hidden">
                    <img
                      src={currentProduct.image}
                      alt={currentProduct.title}
                      draggable={false}
                      className="w-full h-full max-h-[620px] object-contain drop-shadow-xl transform group-hover:scale-[1.02] transition-transform duration-500"
                    />

                    {/* Floating Badges */}
                    <div className="absolute top-4 left-4 bg-[#FFFDF9] border-2 border-[#3A1D0B] px-3.5 py-1.5 rounded-full font-retro text-xs font-bold text-[#8B3A2B] retro-shadow-sm">
                      {currentProduct.badge}
                    </div>

                    <div className="absolute top-4 right-4 bg-[#3A1D0B] text-white px-3.5 py-1.5 rounded-full font-retro text-xs font-bold flex items-center gap-1.5">
                      {isFoodItem ? <Cake className="w-3.5 h-3.5 text-[#E29D38]" /> : <Coffee className="w-3.5 h-3.5 text-[#E29D38]" />}
                      <span>{currentProduct.category}</span>
                    </div>

                    {/* Zoom Hint Pill */}
                    <div className="absolute bottom-4 right-4 bg-[#3A1D0B]/85 text-white text-[11px] font-retro px-3 py-1 rounded-full opacity-80 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                      <Maximize2 className="w-3 h-3 text-[#E29D38]" />
                      <span>Click to Enlarge</span>
                    </div>
                  </div>

                  {/* Slideshow Progress Bar Strip */}
                  <div className="w-full bg-[#EADDC7] h-2 overflow-hidden">
                    <div 
                      className="h-full bg-[#8B3A2B] transition-all duration-75"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Prev / Next Floating Arrows */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-2 sm:-left-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#FFFDF9] border-2 border-[#3A1D0B] flex items-center justify-center text-[#3A1D0B] retro-shadow hover:bg-[#8B3A2B] hover:text-white transition-all cursor-pointer z-20"
                aria-label="Previous Item"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-2 sm:-right-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#FFFDF9] border-2 border-[#3A1D0B] flex items-center justify-center text-[#3A1D0B] retro-shadow hover:bg-[#8B3A2B] hover:text-white transition-all cursor-pointer z-20"
                aria-label="Next Item"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Right Column: Customizer & Details (Col 9-12) */}
            <div className="lg:col-span-4 bg-[#FFFDF9] border-3 border-[#3A1D0B] rounded-3xl p-5 sm:p-6 retro-shadow-lg flex flex-col justify-between">
              
              <div>
                {/* Title & Price Header */}
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <div>
                    <h3 className="font-bubble text-2xl sm:text-3xl text-[#3A1D0B] leading-tight">
                      {currentProduct.title}
                    </h3>
                    <div className="font-retro text-xs font-bold text-[#8A5230] tracking-wide mt-1">
                      {currentProduct.details}
                    </div>
                  </div>

                  <div className="bg-[#FAF3E7] border-2 border-[#3A1D0B] px-3.5 py-1.5 rounded-2xl retro-shadow-sm text-center shrink-0">
                    <span className="font-retro text-2xl font-bold text-[#8B3A2B]">
                      {currentProduct.formattedPrice}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[#5C3A21] text-xs sm:text-sm leading-relaxed mb-3">
                  {currentProduct.description}
                </p>

                {/* Doodled Note */}
                <div className="flex items-center gap-2 font-hand text-base text-[#8B3A2B] mb-4">
                  <span>{currentProduct.tagline}</span>
                  <span>•</span>
                  <span className="text-xs font-retro text-[#6B3C1B]">{currentProduct.roast}</span>
                  <span>•</span>
                  <span className="text-xs font-mono text-[#8A5230]">{currentProduct.calories}</span>
                </div>

                {/* Customizer Options */}
                <div className="space-y-3 pt-3 border-t border-[#DFCBB5]">
                  {!isFoodItem ? (
                    /* Drink Customizers */
                    <>
                      <div>
                        <label className="block text-[11px] font-retro font-bold text-[#6B3C1B] uppercase mb-1">
                          Milk Preference:
                        </label>
                        <div className="grid grid-cols-3 gap-1.5">
                          {['Whole Milk', 'Oat Milk (+0.50)', 'Almond Milk'].map((milk) => (
                            <button
                              key={milk}
                              onClick={() => {
                                playPopSound();
                                setSelectedMilk(milk);
                              }}
                              className={`py-1.5 px-1 rounded-xl text-xs font-retro font-bold border-2 transition-all cursor-pointer ${
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
                        <label className="block text-[11px] font-retro font-bold text-[#6B3C1B] uppercase mb-1">
                          Sweetness:
                        </label>
                        <div className="grid grid-cols-3 gap-1.5">
                          {['Standard', 'Half Sweet', 'Unsweetened'].map((sweet) => (
                            <button
                              key={sweet}
                              onClick={() => {
                                playPopSound();
                                setSelectedSweetness(sweet);
                              }}
                              className={`py-1.5 px-1 rounded-xl text-xs font-retro font-bold border-2 transition-all cursor-pointer ${
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
                    </>
                  ) : (
                    /* Doughnut Customizers */
                    <>
                      <div>
                        <label className="block text-[11px] font-retro font-bold text-[#6B3C1B] uppercase mb-1">
                          Serving Temperature:
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {['Warm from Oven ♨️', 'Room Temp'].map((prep) => (
                            <button
                              key={prep}
                              onClick={() => {
                                playPopSound();
                                setSelectedPrep(prep);
                              }}
                              className={`py-1.5 px-2 rounded-xl text-xs font-retro font-bold border-2 transition-all cursor-pointer ${
                                selectedPrep === prep 
                                  ? 'bg-[#8B3A2B] text-white border-[#3A1D0B] retro-shadow-sm' 
                                  : 'bg-[#FAF3E7] text-[#6B3C1B] border-[#DFCBB5] hover:border-[#3A1D0B]'
                              }`}
                            >
                              {prep}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-retro font-bold text-[#6B3C1B] uppercase mb-1">
                          Packaging:
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {['Bakery Pouch', 'Cute Gift Box 🎁'].map((pack) => (
                            <button
                              key={pack}
                              onClick={() => {
                                playPopSound();
                                setSelectedPackaging(pack);
                              }}
                              className={`py-1.5 px-2 rounded-xl text-xs font-retro font-bold border-2 transition-all cursor-pointer ${
                                selectedPackaging === pack 
                                  ? 'bg-[#3A1D0B] text-white border-[#3A1D0B] retro-shadow-sm' 
                                  : 'bg-[#FAF3E7] text-[#6B3C1B] border-[#DFCBB5] hover:border-[#3A1D0B]'
                              }`}
                            >
                              {pack}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Add to Tray Button & Thumbnails */}
              <div className="mt-5 pt-3 border-t border-[#DFCBB5]">
                <button
                  onClick={() => handleAddCurrentToCart()}
                  className="w-full py-3.5 rounded-full bg-[#8B3A2B] hover:bg-[#A54534] text-white font-retro font-bold text-sm sm:text-base border-2 border-[#3A1D0B] retro-shadow retro-shadow-hover flex items-center justify-center gap-2 cursor-pointer mb-3"
                >
                  <Plus className="w-5 h-5" />
                  <span>ADD TO SIP &amp; BITE TRAY • {currentProduct.formattedPrice}</span>
                </button>

                {/* Added Confirmation Banner */}
                {addedItemName && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#27C93F]/15 border border-[#27C93F] text-[#1E7E2C] text-xs font-retro font-bold py-1 px-3 rounded-xl flex items-center justify-between mb-2.5"
                  >
                    <span className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5" /> Added {addedItemName}!
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
                <div className="flex items-center justify-center gap-1.5 flex-wrap">
                  {activeProducts.map((prod, idx) => (
                    <button
                      key={prod.id}
                      onClick={() => handleSelectSlide(idx)}
                      className={`h-2.5 rounded-full transition-all cursor-pointer ${
                        currentIndex === idx 
                          ? 'w-7 bg-[#8B3A2B] border border-[#3A1D0B]' 
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
          /* Grand Grid View Mode with Extra Large Cards */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch max-h-[66vh] overflow-y-auto pr-1">
            {activeProducts.map((prod) => (
              <div 
                key={prod.id}
                className="bg-[#FFFDF9] border-3 border-[#3A1D0B] rounded-3xl p-4 retro-shadow flex flex-col justify-between hover:translate-y-[-3px] transition-transform group"
              >
                <div>
                  {/* Large Card Image */}
                  <div 
                    className="min-h-[260px] sm:min-h-[290px] rounded-2xl overflow-hidden bg-[#FAF3E7] border-2 border-[#DFCBB5] mb-3 relative flex items-center justify-center p-2 cursor-pointer"
                    onClick={() => setZoomImage(prod)}
                    title="Click to zoom image"
                  >
                    <img 
                      src={prod.image} 
                      alt={prod.title}
                      draggable={false}
                      className="w-full h-full max-h-[290px] object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-md" 
                    />
                    <span className="absolute top-2.5 right-2.5 bg-[#3A1D0B] text-white text-xs font-retro font-bold px-2.5 py-1 rounded-full">
                      {prod.formattedPrice}
                    </span>
                    <span className="absolute top-2.5 left-2.5 bg-[#FFFDF9] text-[#8B3A2B] text-xs font-retro font-bold px-2.5 py-1 rounded-full border border-[#3A1D0B]">
                      {prod.badge}
                    </span>
                  </div>

                  <h4 className="font-bubble text-xl sm:text-2xl text-[#3A1D0B] leading-tight mb-1">
                    {prod.title}
                  </h4>
                  <p className="text-xs text-[#6B3C1B] line-clamp-3 leading-relaxed mb-2">
                    {prod.description}
                  </p>
                  <div className="font-hand text-sm text-[#8B3A2B]">
                    {prod.details}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#DFCBB5] flex items-center justify-between">
                  <span className="font-retro text-xs font-bold text-[#8A5230]">
                    {prod.calories}
                  </span>
                  <button
                    onClick={() => handleAddCurrentToCart(prod)}
                    className="p-2 px-4 rounded-xl bg-[#8B3A2B] text-white hover:bg-[#A54534] transition-colors cursor-pointer text-xs font-retro font-bold flex items-center gap-1.5 retro-shadow-sm"
                    title={`Add ${prod.title} to tray`}
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add to Tray</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Fullscreen HD Image Lightbox Modal */}
      <AnimatePresence>
        {zoomImage && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs cursor-zoom-out"
            onClick={() => setZoomImage(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-[#FFFDF9] border-4 border-[#3A1D0B] rounded-3xl p-4 sm:p-6 max-w-4xl w-full relative retro-shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setZoomImage(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#FAF3E7] border-2 border-[#3A1D0B] flex items-center justify-center text-[#3A1D0B] hover:bg-[#8B3A2B] hover:text-white transition-colors cursor-pointer z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-full max-h-[75vh] flex items-center justify-center overflow-hidden rounded-2xl bg-[#FAF3E7] p-2">
                <img
                  src={zoomImage.image}
                  alt={zoomImage.title}
                  className="w-full h-full max-h-[70vh] object-contain drop-shadow-2xl"
                />
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="font-bubble text-2xl text-[#3A1D0B]">{zoomImage.title}</h3>
                  <p className="font-hand text-base text-[#8B3A2B]">{zoomImage.details} • {zoomImage.tagline}</p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-retro text-2xl font-bold text-[#8B3A2B]">{zoomImage.formattedPrice}</span>
                  <button
                    onClick={() => {
                      handleAddCurrentToCart(zoomImage);
                      setZoomImage(null);
                    }}
                    className="px-5 py-2.5 rounded-full bg-[#8B3A2B] text-white font-retro font-bold text-sm cursor-pointer"
                  >
                    Add to Tray
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
