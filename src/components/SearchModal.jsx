import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, X, ArrowRight, Coffee, Sparkles, Shirt } from 'lucide-react';
import { PRODUCTS, PROMOTIONS, MERCHANDISE } from '../data/products';
import { playPopSound } from '../utils/soundEffects';

export default function SearchModal({ isOpen, onClose, onSelectProduct, onSelectPromo, onSelectMerch }) {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filteredProducts = PRODUCTS.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredMerch = MERCHANDISE.filter(m => 
    m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.shortTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPromos = PROMOTIONS.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-[#2E1505]/60 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-xl bg-[#FFFDF9] border-3 border-[#3A1D0B] rounded-3xl p-5 retro-shadow-lg overflow-hidden"
      >
        {/* Search Input Box */}
        <div className="flex items-center gap-3 bg-[#FAF3E7] border-2 border-[#3A1D0B] rounded-2xl px-4 py-3 retro-shadow-sm">
          <Search className="w-5 h-5 text-[#8A5230]" />
          <input
            type="text"
            placeholder="Search espresso, freezas, promos, or game..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent font-retro text-base font-bold text-[#3A1D0B] placeholder:text-[#9C795C] focus:outline-hidden"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-[#6B3C1B] hover:text-[#3A1D0B] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => {
              playPopSound();
              onClose();
            }}
            className="w-7 h-7 rounded-full bg-white border border-[#3A1D0B] flex items-center justify-center text-[#3A1D0B] hover:bg-[#8B3A2B] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Results */}
        <div className="mt-4 max-h-80 overflow-y-auto space-y-3 pr-1">
          {/* Products */}
          {filteredProducts.length > 0 && (
            <div>
              <div className="text-[11px] font-retro font-bold text-[#8A5230] uppercase tracking-wider mb-2">
                Drinks &amp; Menu ({filteredProducts.length})
              </div>
              <div className="space-y-2">
                {filteredProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      playPopSound();
                      onSelectProduct(p);
                      onClose();
                    }}
                    className="p-2.5 rounded-xl bg-[#FAF3E7] hover:bg-[#F0E2CD] border border-[#DFCBB5] flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt={p.title} className="w-10 h-10 rounded-lg object-cover border border-[#3A1D0B]" />
                      <div>
                        <div className="font-bubble text-sm text-[#3A1D0B]">{p.title}</div>
                        <div className="font-retro text-xs text-[#8B3A2B] font-bold">{p.formattedPrice} • {p.category}</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#8A5230]" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Official Merch */}
          {filteredMerch.length > 0 && (
            <div className="pt-2">
              <div className="text-[11px] font-retro font-bold text-[#8A5230] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Shirt className="w-3.5 h-3.5 text-[#8B3A2B]" />
                <span>Official Merch Drop ({filteredMerch.length})</span>
              </div>
              <div className="space-y-2">
                {filteredMerch.map((m) => (
                  <div
                    key={m.id}
                    onClick={() => {
                      playPopSound();
                      if (onSelectMerch) onSelectMerch(m);
                      onClose();
                    }}
                    className="p-2.5 rounded-xl bg-[#FAF3E7] hover:bg-[#F0E2CD] border border-[#DFCBB5] flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img src={m.image} alt={m.title} className="w-10 h-10 rounded-lg object-contain bg-white border border-[#3A1D0B]" />
                      <div>
                        <div className="font-bubble text-sm text-[#3A1D0B]">{m.title}</div>
                        <div className="font-retro text-xs text-[#8B3A2B] font-bold">{m.formattedPrice} • {m.category}</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#8A5230]" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Promos */}
          {filteredPromos.length > 0 && (
            <div className="pt-2">
              <div className="text-[11px] font-retro font-bold text-[#8A5230] uppercase tracking-wider mb-2">
                Promos &amp; Perks
              </div>
              <div className="space-y-2">
                {filteredPromos.map((pr) => (
                  <div
                    key={pr.id}
                    onClick={() => {
                      playPopSound();
                      onSelectPromo(pr);
                      onClose();
                    }}
                    className="p-2.5 rounded-xl bg-[#FFFDF9] hover:bg-[#F0E2CD] border border-[#DFCBB5] flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <div>
                      <div className="font-bubble text-sm text-[#3A1D0B]">{pr.title}</div>
                      <div className="font-retro text-xs text-[#6B3C1B]">{pr.subtitle}</div>
                    </div>
                    <span className="font-mono text-xs font-bold text-[#8B3A2B] bg-[#FAF3E7] px-2 py-0.5 rounded-sm">
                      {pr.discount}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {filteredProducts.length === 0 && filteredMerch.length === 0 && filteredPromos.length === 0 && (
            <div className="py-8 text-center text-[#8A5230] font-retro text-sm">
              No coffee, merch, or promo found matching "{searchTerm}".
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
