import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ShoppingBag, Plus, Check, Maximize2, X, Shirt, Coffee, Tag, ArrowRight, ShieldCheck, Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';
import { MERCHANDISE } from '../data/products';
import { playPopSound, playSipChime, playSlideWhoosh } from '../utils/soundEffects';

export default function MerchandiseSection({ onAddToCart, onOpenCart }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const [selectedSize, setSelectedSize] = useState('L');
  const [selectedPackaging, setSelectedPackaging] = useState('Collector Gift Box 🎁');
  const [addedItemName, setAddedItemName] = useState(null);
  const [zoomItem, setZoomItem] = useState(null);
  const [viewMode, setViewMode] = useState('showcase'); // 'showcase' | 'grid'

  const SLIDE_DURATION = 5000; // 5s per merch item

  const categories = [
    { id: 'All', label: 'All Merch (4)' },
    { id: 'Wearables', label: '👕 Retro Tees (2)' },
    { id: 'Ceramics', label: '☕ Boots Mugs (2)' }
  ];

  const filteredMerch = activeCategory === 'All'
    ? MERCHANDISE
    : MERCHANDISE.filter(m => m.category === activeCategory);

  // Safety clamp index when category filter changes
  useEffect(() => {
    setCurrentIndex(0);
    setProgress(0);
  }, [activeCategory]);

  const currentItem = filteredMerch[currentIndex] || filteredMerch[0] || MERCHANDISE[0];
  const isApparel = currentItem.category === 'Wearables';

  // Auto-play progress loop matching coffee & food slideshow
  useEffect(() => {
    if (!isPlaying || filteredMerch.length <= 1) return;

    const intervalTime = 50;
    const step = (intervalTime / SLIDE_DURATION) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentIndex((curr) => (curr + 1) % filteredMerch.length);
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPlaying, currentIndex, filteredMerch.length]);

  const handleNext = () => {
    playSlideWhoosh();
    setProgress(0);
    setCurrentIndex((prev) => (prev + 1) % filteredMerch.length);
  };

  const handlePrev = () => {
    playSlideWhoosh();
    setProgress(0);
    setCurrentIndex((prev) => (prev - 1 + filteredMerch.length) % filteredMerch.length);
  };

  const handleSelectSlide = (idx) => {
    playPopSound();
    setProgress(0);
    setCurrentIndex(idx);
    const item = filteredMerch[idx];
    if (item && item.sizes) {
      setSelectedSize(item.sizes[2] || item.sizes[0]);
    }
  };

  const handleAddToCart = (item = currentItem) => {
    playSipChime();
    const isTee = item.category === 'Wearables';
    const note = isTee ? `Size: ${selectedSize} • Heavyweight Cotton` : `${selectedPackaging} • 350ml Ceramic`;
    const cartId = `merch-${item.id}-${isTee ? selectedSize : selectedPackaging}-${Date.now()}`;

    const cartProduct = {
      id: item.id,
      title: item.title,
      price: item.price,
      formattedPrice: item.formattedPrice,
      image: item.image,
      customNote: note,
      cartId,
      quantity: 1
    };

    onAddToCart(cartProduct);
    setAddedItemName(item.shortTitle);
    setTimeout(() => setAddedItemName(null), 2500);
  };

  return (
    <div className="relative min-w-full w-full h-full flex flex-col justify-center bg-[#F4ECE1] overflow-hidden px-4 sm:px-6 lg:px-10 py-1.5 sm:py-2 select-none">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-[#E8DAC5]/50 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#DFCEB5]/40 blur-3xl pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto w-full z-10 flex flex-col justify-center my-auto">
        
        {/* Header Strip */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1.5 mb-1.5">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FFFDF9] border border-[#3A1D0B] text-[11px] sm:text-xs font-retro font-bold text-[#8B3A2B] retro-shadow-xs mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#E29D38]" />
              <span>SECTION 04 • OFFICIAL MERCH DROP &amp; GEAR</span>
            </div>
            <h2 className="font-bubble text-2xl sm:text-3xl md:text-4xl text-[#3A1D0B] leading-none">
              WEAR &amp; SIP THE SMOKE SHOP VIBE
            </h2>
            <p className="font-retro text-xs sm:text-sm text-[#6B3C1B] mt-0.5">
              Heavyweight vintage streetwear tees and collectible ceramic mascot mugs with freestanding boots!
            </p>
          </div>

          {/* View Mode & Auto-Play Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                playPopSound();
                setViewMode(viewMode === 'showcase' ? 'grid' : 'showcase');
              }}
              className="px-3 py-1 rounded-full bg-[#FFFDF9] border border-[#3A1D0B] font-retro text-[11px] sm:text-xs font-bold text-[#3A1D0B] retro-shadow-xs hover:bg-[#EADDC7] transition-colors cursor-pointer"
            >
              {viewMode === 'showcase' ? 'Browse Grid (4)' : 'Showcase Slideshow'}
            </button>

            {viewMode === 'showcase' && (
              <button
                onClick={() => {
                  playPopSound();
                  setIsPlaying(!isPlaying);
                }}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#FFFDF9] border border-[#3A1D0B] flex items-center justify-center text-[#3A1D0B] retro-shadow-xs hover:bg-[#EADDC7] transition-colors cursor-pointer"
                title={isPlaying ? "Pause Automatic Merch Slideshow" : "Resume Automatic Merch Slideshow"}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Pills Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5 mb-1.5">
          {categories.map((cat) => (
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

        {/* Body: Viewport Adaptive Heights */}
        {viewMode === 'showcase' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 lg:gap-6 items-stretch">
            
            {/* Left Column: Big Mockup Spotlight Card (Col 1-7 or 1-8) */}
            <div className="lg:col-span-7 xl:col-span-8 relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentItem.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="bg-[#FFFDF9] border-3 border-[#3A1D0B] rounded-2xl overflow-hidden retro-shadow relative group cursor-pointer h-[36vh] sm:h-[40vh] md:h-[42vh] max-h-[390px] flex flex-col justify-between"
                  onClick={() => setZoomItem(currentItem)}
                  title="Click to zoom image"
                >
                  {/* Spotlight Image Container */}
                  <div className="relative flex-1 w-full bg-[#FAF3E7] p-2 sm:p-3 flex items-center justify-center overflow-hidden">
                    <img
                      src={currentItem.image}
                      alt={currentItem.title}
                      draggable={false}
                      className="w-full h-full object-contain drop-shadow-md select-none pointer-events-none group-hover:scale-102 transition-transform duration-300"
                    />

                    {/* Floating Badges */}
                    <div className="absolute top-2.5 left-2.5 bg-[#FFFDF9] border border-[#3A1D0B] px-2.5 py-0.5 rounded-full font-retro text-[10px] sm:text-xs font-bold text-[#8B3A2B] retro-shadow-xs">
                      {currentItem.badge}
                    </div>

                    <div className="absolute top-2.5 right-2.5 bg-[#3A1D0B] text-white px-2.5 py-0.5 rounded-full font-retro text-[10px] sm:text-xs font-bold flex items-center gap-1">
                      {isApparel ? <Shirt className="w-3 h-3 text-[#E29D38]" /> : <Coffee className="w-3 h-3 text-[#E29D38]" />}
                      <span>{currentItem.category}</span>
                    </div>

                    <div className="absolute bottom-2.5 right-2.5 bg-[#3A1D0B]/85 text-white text-[10px] font-retro px-2 py-0.5 rounded-full opacity-80 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                      <Maximize2 className="w-2.5 h-2.5 text-[#E29D38]" />
                      <span>Inspect Artwork</span>
                    </div>
                  </div>

                  {/* Auto-Play Slideshow Progress Bar Strip */}
                  <div className="w-full bg-[#EADDC7] h-1.5 overflow-hidden shrink-0">
                    <div 
                      className="h-full bg-[#8B3A2B] transition-all duration-75"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  {/* Thumbnail Row inside Showcase */}
                  <div className="bg-[#FAF3E7] p-1.5 border-t border-[#DFCBB5] flex items-center justify-center gap-2 overflow-x-auto no-scrollbar shrink-0">
                    {filteredMerch.map((item, idx) => (
                      <button
                        key={item.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectSlide(idx);
                        }}
                        className={`p-1 rounded-xl border-2 transition-all cursor-pointer flex items-center gap-2 ${
                          currentIndex === idx
                            ? 'bg-[#FFFDF9] border-[#8B3A2B] shadow-xs scale-102'
                            : 'bg-white/70 border-transparent hover:border-[#DFCBB5]'
                        }`}
                      >
                        <img src={item.image} alt={item.shortTitle} className="w-8 h-8 rounded-lg object-contain bg-white" />
                        <div className="text-left hidden sm:block pr-1">
                          <div className="font-bubble text-[11px] text-[#3A1D0B] leading-none">{item.shortTitle}</div>
                          <div className="font-retro text-[10px] text-[#8B3A2B] font-bold">{item.formattedPrice}</div>
                        </div>
                      </button>
                    ))}
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
                aria-label="Previous Merch Item"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-1 sm:-right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#FFFDF9] border-2 border-[#3A1D0B] flex items-center justify-center text-[#3A1D0B] retro-shadow hover:bg-[#8B3A2B] hover:text-white transition-all cursor-pointer z-20"
                aria-label="Next Merch Item"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Right Column: Customizer, Sizing & Add to Tray (Col 8-12) */}
            <div className="lg:col-span-5 xl:col-span-4 bg-[#FFFDF9] border-3 border-[#3A1D0B] rounded-2xl p-3 sm:p-3.5 retro-shadow flex flex-col justify-between h-[36vh] sm:h-[40vh] md:h-[42vh] max-h-[390px]">
              
              <div>
                {/* Title & Price Header */}
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div>
                    <h3 className="font-bubble text-xl sm:text-2xl text-[#3A1D0B] leading-tight">
                      {currentItem.title}
                    </h3>
                    <div className="font-retro text-[11px] font-bold text-[#8A5230] mt-0.5">
                      {currentItem.details}
                    </div>
                  </div>

                  <div className="bg-[#FAF3E7] border border-[#3A1D0B] px-2.5 py-1 rounded-xl retro-shadow-xs text-center shrink-0">
                    <span className="font-retro text-lg sm:text-xl font-bold text-[#8B3A2B]">
                      {currentItem.formattedPrice}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[#5C3A21] text-xs leading-snug mb-1.5 line-clamp-2">
                  {currentItem.description}
                </p>

                {/* Tagline / Stock badge */}
                <div className="flex items-center gap-2 font-hand text-xs text-[#8B3A2B] mb-2">
                  <span>{currentItem.tagline}</span>
                  <span>•</span>
                  <span className="text-[10px] font-retro text-[#27C93F] font-bold bg-[#27C93F]/10 px-2 py-0.5 rounded-full border border-[#27C93F]/30">
                    ✓ In Stock (Cape Town &amp; JHB Roasteries)
                  </span>
                </div>

                {/* Sizing / Customizer Controls */}
                <div className="space-y-2 pt-1.5 border-t border-[#DFCBB5]">
                  {isApparel ? (
                    <>
                      <div>
                        <div className="flex items-center justify-between mb-0.5">
                          <label className="text-[10px] font-retro font-bold text-[#6B3C1B] uppercase">
                            Select Unisex Size:
                          </label>
                          <span className="text-[10px] font-retro text-[#8A5230]">True to Size</span>
                        </div>
                        <div className="grid grid-cols-5 gap-1">
                          {currentItem.sizes.map((size) => (
                            <button
                              key={size}
                              onClick={() => {
                                playPopSound();
                                setSelectedSize(size);
                              }}
                              className={`py-1 rounded-lg text-xs font-retro font-bold border transition-all cursor-pointer ${
                                selectedSize === size
                                  ? 'bg-[#3A1D0B] text-white border-[#3A1D0B]'
                                  : 'bg-[#FAF3E7] text-[#6B3C1B] border-[#DFCBB5] hover:border-[#3A1D0B]'
                              }`}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-retro font-bold text-[#6B3C1B] uppercase mb-0.5">
                          Material &amp; Colorway:
                        </label>
                        <div className="bg-[#FAF3E7] border border-[#DFCBB5] p-1.5 rounded-xl flex items-center justify-between text-[11px] font-retro font-bold text-[#3A1D0B]">
                          <span>{currentItem.colors[0]} • 100% Cotton 240GSM</span>
                          <ShieldCheck className="w-3.5 h-3.5 text-[#27C93F]" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <label className="block text-[10px] font-retro font-bold text-[#6B3C1B] uppercase mb-0.5">
                          Packaging Option:
                        </label>
                        <div className="grid grid-cols-2 gap-1.5">
                          {['Collector Gift Box 🎁', 'Standard Safe Box'].map((pack) => (
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

                      <div className="bg-[#FAF3E7] border border-[#DFCBB5] p-1.5 rounded-xl flex items-center gap-2 text-[10px] font-retro text-[#6B3C1B]">
                        <span className="text-base">📱</span>
                        <span>Includes official Summer Promo Game QR stamp on rear!</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Add to Tray Action */}
              <div className="mt-1 pt-1.5 border-t border-[#DFCBB5]">
                <button
                  onClick={() => handleAddToCart()}
                  className="w-full py-2.5 rounded-full bg-[#8B3A2B] hover:bg-[#A54534] text-white font-retro font-bold text-xs sm:text-sm border-2 border-[#3A1D0B] retro-shadow-xs flex items-center justify-center gap-1.5 cursor-pointer mb-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>ADD TO SIP TRAY • {currentItem.formattedPrice}</span>
                </button>

                {addedItemName && (
                  <motion.div
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#27C93F]/15 border border-[#27C93F] text-[#1E7E2C] text-[10px] font-retro font-bold py-0.5 px-2 rounded-lg flex items-center justify-between mb-1"
                  >
                    <span>Added {addedItemName} to tray!</span>
                    <button onClick={onOpenCart} className="underline cursor-pointer">
                      View Tray ➔
                    </button>
                  </motion.div>
                )}

                {/* Slideshow Progress Dots */}
                <div className="flex items-center justify-center gap-1 pt-0.5">
                  {filteredMerch.map((prod, idx) => (
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
          /* Grid View Mode: All 4 Merch Items */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-stretch h-[36vh] sm:h-[40vh] md:h-[42vh] max-h-[390px] overflow-y-auto pr-1">
            {filteredMerch.map((item, idx) => (
              <div
                key={item.id}
                className="bg-[#FFFDF9] border-2 border-[#3A1D0B] rounded-2xl p-2.5 retro-shadow-sm flex flex-col justify-between group hover:border-[#8B3A2B] transition-all"
              >
                <div>
                  <div
                    className="h-28 sm:h-32 rounded-xl overflow-hidden bg-[#FAF3E7] border border-[#DFCBB5] mb-2 relative flex items-center justify-center p-2 cursor-pointer"
                    onClick={() => setZoomItem(item)}
                    title="Click to enlarge"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      draggable={false}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-sm"
                    />
                    <div className="absolute top-1.5 left-1.5 bg-[#FFFDF9] border border-[#3A1D0B] px-1.5 py-0.5 rounded-full font-retro text-[9px] font-bold text-[#8B3A2B]">
                      {item.badge}
                    </div>
                  </div>

                  <div className="flex items-start justify-between gap-1 mb-1">
                    <h4 className="font-bubble text-sm text-[#3A1D0B] leading-tight">
                      {item.shortTitle}
                    </h4>
                    <span className="font-retro text-xs font-bold text-[#8B3A2B]">
                      {item.formattedPrice}
                    </span>
                  </div>

                  <p className="text-[10px] text-[#6B3C1B] line-clamp-2 leading-snug">
                    {item.description}
                  </p>
                </div>

                <div className="mt-2 pt-2 border-t border-[#DFCBB5] flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      handleSelectSlide(idx);
                      setViewMode('showcase');
                    }}
                    className="flex-1 py-1 rounded-lg bg-[#FAF3E7] hover:bg-[#EADDC7] text-[#3A1D0B] font-retro text-[10px] font-bold border border-[#3A1D0B] transition-colors cursor-pointer"
                  >
                    Customize
                  </button>

                  <button
                    onClick={() => handleAddToCart(item)}
                    className="px-2.5 py-1 rounded-lg bg-[#8B3A2B] hover:bg-[#A54534] text-white font-retro text-[10px] font-bold border border-[#3A1D0B] transition-colors cursor-pointer flex items-center gap-1"
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

      {/* Lightbox / Zoom Modal */}
      <AnimatePresence>
        {zoomItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2E1505]/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-[#FFFDF9] border-3 border-[#3A1D0B] rounded-3xl p-5 max-w-2xl w-full retro-shadow-lg relative"
            >
              <button
                onClick={() => {
                  playPopSound();
                  setZoomItem(null);
                }}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#FAF3E7] border-2 border-[#3A1D0B] flex items-center justify-center text-[#3A1D0B] hover:bg-[#8B3A2B] hover:text-white transition-colors cursor-pointer z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="w-full sm:w-1/2 aspect-square bg-[#FAF3E7] border-2 border-[#DFCBB5] rounded-2xl p-4 flex items-center justify-center">
                  <img
                    src={zoomItem.image}
                    alt={zoomItem.title}
                    className="w-full h-full object-contain drop-shadow-lg"
                  />
                </div>

                <div className="w-full sm:w-1/2 flex flex-col justify-between">
                  <div>
                    <span className="bg-[#8B3A2B] text-white font-retro text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {zoomItem.badge}
                    </span>
                    <h3 className="font-bubble text-2xl text-[#3A1D0B] mt-1.5 leading-tight">
                      {zoomItem.title}
                    </h3>
                    <div className="font-retro text-lg font-bold text-[#8B3A2B] mt-1">
                      {zoomItem.formattedPrice}
                    </div>
                    <p className="text-xs text-[#5C3A21] mt-2 leading-relaxed">
                      {zoomItem.description}
                    </p>
                    <div className="text-[11px] font-mono text-[#8A5230] mt-1.5">
                      {zoomItem.details}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      handleAddToCart(zoomItem);
                      setZoomItem(null);
                    }}
                    className="mt-4 w-full py-2.5 rounded-full bg-[#8B3A2B] hover:bg-[#A54534] text-white font-retro font-bold text-sm border-2 border-[#3A1D0B] retro-shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>ADD TO TRAY • {zoomItem.formattedPrice}</span>
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
