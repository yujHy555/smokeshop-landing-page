import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, ChevronLeft, ChevronRight, Plus, Sparkles, Coffee, Cake, Maximize2, X } from 'lucide-react';
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
    <div className="relative min-w-full w-full h-full flex flex-col justify-center bg-[#F7EFE3] overflow-hidden px-4 sm:px-6 lg:px-10 py-1.5 sm:py-2 select-none">
      
      <div className="max-w-[1400px] mx-auto w-full z-10 flex flex-col justify-center my-auto">
        
        {/* Header Strip */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1.5 mb-1.5">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FFFDF9] border border-[#3A1D0B] text-[11px] sm:text-xs font-retro font-bold text-[#6B3C1B] retro-shadow-xs mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#8B3A2B]" />
              <span>SECTION 03 • ARTISAN MENU SHOWCASE</span>
            </div>
            <h2 className="font-bubble text-2xl sm:text-3xl md:text-4xl text-[#3A1D0B] leading-none">
              OUR HANDCRAFTED MENU
            </h2>
            <p className="font-retro text-xs sm:text-sm text-[#6B3C1B] mt-0.5">
              Featuring velvety espresso, frosty coffee freezas, and oven-fresh artisan doughnuts!
            </p>
          </div>

          {/* View Mode & Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                playPopSound();
                setViewMode(viewMode === 'slideshow' ? 'grid' : 'slideshow');
              }}
              className="px-3 py-1 rounded-full bg-[#FFFDF9] border border-[#3A1D0B] font-retro text-[11px] sm:text-xs font-bold text-[#3A1D0B] retro-shadow-xs hover:bg-[#EADDC7] transition-colors cursor-pointer"
            >
              {viewMode === 'slideshow' ? 'Browse Grid (7)' : 'Showcase Slideshow'}
            </button>

            {viewMode === 'slideshow' && (
              <button
                onClick={() => {
                  playPopSound();
                  setIsPlaying(!isPlaying);
                }}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#FFFDF9] border border-[#3A1D0B] flex items-center justify-center text-[#3A1D0B] retro-shadow-xs hover:bg-[#EADDC7] transition-colors cursor-pointer"
                title={isPlaying ? "Pause Automatic Slideshow" : "Resume Automatic Slideshow"}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Pills Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5 mb-1.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                playPopSound();
                setActiveCategory(cat.id);
              }}
              className={`px-3 py-1 rounded-full text-[11px] font-retro font-bold whitespace-nowrap transition-all border cursor-pointer ${
                activeCategory === cat.id 
                  ? 'bg-[#3A1D0B] text-white border-[#3A1D0B] shadow-xs' 
                  : 'bg-[#FFFDF9] text-[#6B3C1B] border-[#DFCBB5] hover:border-[#3A1D0B]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Content Body: Viewport Adaptive Heights */}
        {viewMode === 'slideshow' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 lg:gap-6 items-stretch">
            
            {/* Left Column: Featured Mockup Card (Col 1-7 or 1-8) */}
            <div className="lg:col-span-7 xl:col-span-8 relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentProduct.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="bg-[#FFFDF9] border-3 border-[#3A1D0B] rounded-2xl overflow-hidden retro-shadow relative group cursor-pointer h-[36vh] sm:h-[40vh] md:h-[42vh] max-h-[390px] flex flex-col justify-between"
                  onClick={() => setZoomImage(currentProduct)}
                  title="Click to view full-resolution image"
                >
                  {/* Image Container dynamically constrained to viewport */}
                  <div className="relative flex-1 w-full bg-[#FAF3E7] p-2 sm:p-3 flex items-center justify-center overflow-hidden">
                    <img
                      src={currentProduct.image}
                      alt={currentProduct.title}
                      draggable={false}
                      className="w-full h-full object-contain drop-shadow-md select-none pointer-events-none"
                    />

                    {/* Floating Badges */}
                    <div className="absolute top-2.5 left-2.5 bg-[#FFFDF9] border border-[#3A1D0B] px-2.5 py-0.5 rounded-full font-retro text-[10px] sm:text-xs font-bold text-[#8B3A2B] retro-shadow-xs">
                      {currentProduct.badge}
                    </div>

                    <div className="absolute top-2.5 right-2.5 bg-[#3A1D0B] text-white px-2.5 py-0.5 rounded-full font-retro text-[10px] sm:text-xs font-bold flex items-center gap-1">
                      {isFoodItem ? <Cake className="w-3 h-3 text-[#E29D38]" /> : <Coffee className="w-3 h-3 text-[#E29D38]" />}
                      <span>{currentProduct.category}</span>
                    </div>

                    <div className="absolute bottom-2.5 right-2.5 bg-[#3A1D0B]/85 text-white text-[10px] font-retro px-2 py-0.5 rounded-full opacity-80 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                      <Maximize2 className="w-2.5 h-2.5 text-[#E29D38]" />
                      <span>Enlarge</span>
                    </div>
                  </div>

                  {/* Slideshow Progress Bar Strip */}
                  <div className="w-full bg-[#EADDC7] h-1.5 overflow-hidden shrink-0">
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
                className="absolute left-1 sm:-left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#FFFDF9] border-2 border-[#3A1D0B] flex items-center justify-center text-[#3A1D0B] retro-shadow hover:bg-[#8B3A2B] hover:text-white transition-all cursor-pointer z-20"
                aria-label="Previous Item"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-1 sm:-right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#FFFDF9] border-2 border-[#3A1D0B] flex items-center justify-center text-[#3A1D0B] retro-shadow hover:bg-[#8B3A2B] hover:text-white transition-all cursor-pointer z-20"
                aria-label="Next Item"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Right Column: Customizer & Details (Col 8-12) */}
            <div className="lg:col-span-5 xl:col-span-4 bg-[#FFFDF9] border-3 border-[#3A1D0B] rounded-2xl p-3 sm:p-3.5 retro-shadow flex flex-col justify-between h-[36vh] sm:h-[40vh] md:h-[42vh] max-h-[390px]">
              
              <div>
                {/* Title & Price Header */}
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div>
                    <h3 className="font-bubble text-xl sm:text-2xl text-[#3A1D0B] leading-tight">
                      {currentProduct.title}
                    </h3>
                    <div className="font-retro text-[11px] font-bold text-[#8A5230] mt-0.5">
                      {currentProduct.details}
                    </div>
                  </div>

                  <div className="bg-[#FAF3E7] border border-[#3A1D0B] px-2.5 py-1 rounded-xl retro-shadow-xs text-center shrink-0">
                    <span className="font-retro text-lg sm:text-xl font-bold text-[#8B3A2B]">
                      {currentProduct.formattedPrice}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[#5C3A21] text-xs leading-snug mb-2 line-clamp-2">
                  {currentProduct.description}
                </p>

                {/* Doodled Note */}
                <div className="flex items-center gap-1.5 font-hand text-sm text-[#8B3A2B] mb-2.5">
                  <span>{currentProduct.tagline}</span>
                  <span>•</span>
                  <span className="text-[11px] font-retro text-[#6B3C1B]">{currentProduct.roast}</span>
                  <span>•</span>
                  <span className="text-[11px] font-mono text-[#8A5230]">{currentProduct.calories}</span>
                </div>

                {/* Customizer Options */}
                <div className="space-y-2 pt-2 border-t border-[#DFCBB5]">
                  {!isFoodItem ? (
                    <>
                      <div>
                        <label className="block text-[10px] font-retro font-bold text-[#6B3C1B] uppercase mb-0.5">
                          Milk Preference:
                        </label>
                        <div className="grid grid-cols-3 gap-1">
                          {['Whole Milk', 'Oat Milk (+R8.00)', 'Almond Milk'].map((milk) => (
                            <button
                              key={milk}
                              onClick={() => {
                                playPopSound();
                                setSelectedMilk(milk);
                              }}
                              className={`py-1 px-1 rounded-lg text-[11px] font-retro font-bold border transition-all cursor-pointer ${
                                selectedMilk === milk 
                                  ? 'bg-[#3A1D0B] text-white border-[#3A1D0B]' 
                                  : 'bg-[#FAF3E7] text-[#6B3C1B] border-[#DFCBB5] hover:border-[#3A1D0B]'
                              }`}
                            >
                              {milk.split(' ')[0]}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-retro font-bold text-[#6B3C1B] uppercase mb-0.5">
                          Sweetness:
                        </label>
                        <div className="grid grid-cols-3 gap-1">
                          {['Standard', 'Half Sweet', 'Unsweetened'].map((sweet) => (
                            <button
                              key={sweet}
                              onClick={() => {
                                playPopSound();
                                setSelectedSweetness(sweet);
                              }}
                              className={`py-1 px-1 rounded-lg text-[11px] font-retro font-bold border transition-all cursor-pointer ${
                                selectedSweetness === sweet 
                                  ? 'bg-[#8B3A2B] text-white border-[#3A1D0B]' 
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
                    <>
                      <div>
                        <label className="block text-[10px] font-retro font-bold text-[#6B3C1B] uppercase mb-0.5">
                          Serving Temperature:
                        </label>
                        <div className="grid grid-cols-2 gap-1.5">
                          {['Warm from Oven ♨️', 'Room Temp'].map((prep) => (
                            <button
                              key={prep}
                              onClick={() => {
                                playPopSound();
                                setSelectedPrep(prep);
                              }}
                              className={`py-1 px-1.5 rounded-lg text-[11px] font-retro font-bold border transition-all cursor-pointer ${
                                selectedPrep === prep 
                                  ? 'bg-[#8B3A2B] text-white border-[#3A1D0B]' 
                                  : 'bg-[#FAF3E7] text-[#6B3C1B] border-[#DFCBB5] hover:border-[#3A1D0B]'
                              }`}
                            >
                              {prep}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-retro font-bold text-[#6B3C1B] uppercase mb-0.5">
                          Packaging:
                        </label>
                        <div className="grid grid-cols-2 gap-1.5">
                          {['Bakery Pouch', 'Gift Box 🎁'].map((pack) => (
                            <button
                              key={pack}
                              onClick={() => {
                                playPopSound();
                                setSelectedPackaging(pack);
                              }}
                              className={`py-1 px-1.5 rounded-lg text-[11px] font-retro font-bold border transition-all cursor-pointer ${
                                selectedPackaging === pack 
                                  ? 'bg-[#3A1D0B] text-white border-[#3A1D0B]' 
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
              <div className="mt-2 pt-2 border-t border-[#DFCBB5]">
                <button
                  onClick={() => handleAddCurrentToCart()}
                  className="w-full py-2.5 rounded-full bg-[#8B3A2B] hover:bg-[#A54534] text-white font-retro font-bold text-xs sm:text-sm border-2 border-[#3A1D0B] retro-shadow-xs flex items-center justify-center gap-1.5 cursor-pointer mb-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>ADD TO SIP TRAY • {currentProduct.formattedPrice}</span>
                </button>

                {addedItemName && (
                  <motion.div
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#27C93F]/15 border border-[#27C93F] text-[#1E7E2C] text-[10px] font-retro font-bold py-0.5 px-2 rounded-lg flex items-center justify-between mb-1.5"
                  >
                    <span>Added {addedItemName}!</span>
                    <button onClick={onOpenCart} className="underline cursor-pointer">
                      View Tray ➔
                    </button>
                  </motion.div>
                )}

                {/* Slideshow Dots */}
                <div className="flex items-center justify-center gap-1">
                  {activeProducts.map((prod, idx) => (
                    <button
                      key={prod.id}
                      onClick={() => handleSelectSlide(idx)}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        currentIndex === idx 
                          ? 'w-6 bg-[#8B3A2B] border border-[#3A1D0B]' 
                          : 'w-2 bg-[#DFCBB5] hover:bg-[#6B3C1B]'
                      }`}
                      title={prod.title}
                    />
                  ))}
                </div>
              </div>

            </div>

          </div>
        ) : (
          /* Grid View Mode: Constrained to viewport */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 items-stretch h-[44vh] sm:h-[48vh] overflow-y-auto pr-1">
            {activeProducts.map((prod) => (
              <div 
                key={prod.id}
                className="bg-[#FFFDF9] border-2 border-[#3A1D0B] rounded-2xl p-3 retro-shadow-sm flex flex-col justify-between group"
              >
                <div>
                  <div 
                    className="h-32 sm:h-36 rounded-xl overflow-hidden bg-[#FAF3E7] border border-[#DFCBB5] mb-2 relative flex items-center justify-center p-1.5 cursor-pointer"
                    onClick={() => setZoomImage(prod)}
                    title="Click to zoom image"
                  >
                    <img 
                      src={prod.image} 
                      alt={prod.title}
                      draggable={false}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-sm" 
                    />
                    <span className="absolute top-1.5 right-1.5 bg-[#3A1D0B] text-white text-[10px] font-retro font-bold px-2 py-0.5 rounded-full">
                      {prod.formattedPrice}
                    </span>
                    <span className="absolute top-1.5 left-1.5 bg-[#FFFDF9] text-[#8B3A2B] text-[10px] font-retro font-bold px-2 py-0.5 rounded-full border border-[#3A1D0B]">
                      {prod.badge}
                    </span>
                  </div>

                  <h4 className="font-bubble text-base sm:text-lg text-[#3A1D0B] leading-tight mb-0.5">
                    {prod.title}
                  </h4>
                  <p className="text-[11px] text-[#6B3C1B] line-clamp-2 leading-snug mb-1">
                    {prod.description}
                  </p>
                  <div className="font-hand text-xs text-[#8B3A2B]">
                    {prod.details}
                  </div>
                </div>

                <div className="mt-2 pt-1.5 border-t border-[#DFCBB5] flex items-center justify-between">
                  <span className="font-retro text-[10px] font-bold text-[#8A5230]">
                    {prod.calories}
                  </span>
                  <button
                    onClick={() => handleAddCurrentToCart(prod)}
                    className="p-1 px-3 rounded-lg bg-[#8B3A2B] text-white hover:bg-[#A54534] transition-colors cursor-pointer text-xs font-retro font-bold flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add</span>
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
              className="bg-[#FFFDF9] border-3 border-[#3A1D0B] rounded-3xl p-4 sm:p-5 max-w-3xl w-full relative retro-shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setZoomImage(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#FAF3E7] border border-[#3A1D0B] flex items-center justify-center text-[#3A1D0B] hover:bg-[#8B3A2B] hover:text-white transition-colors cursor-pointer z-10"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-full max-h-[70vh] flex items-center justify-center overflow-hidden rounded-xl bg-[#FAF3E7] p-2">
                <img
                  src={zoomImage.image}
                  alt={zoomImage.title}
                  className="w-full h-full max-h-[65vh] object-contain drop-shadow-xl"
                />
              </div>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="font-bubble text-xl text-[#3A1D0B]">{zoomImage.title}</h3>
                  <p className="font-hand text-sm text-[#8B3A2B]">{zoomImage.details}</p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-retro text-xl font-bold text-[#8B3A2B]">{zoomImage.formattedPrice}</span>
                  <button
                    onClick={() => {
                      handleAddCurrentToCart(zoomImage);
                      setZoomImage(null);
                    }}
                    className="px-4 py-2 rounded-full bg-[#8B3A2B] text-white font-retro font-bold text-xs cursor-pointer"
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
