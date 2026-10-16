import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles, Check, Coffee } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playPopSound, playSipChime } from '../utils/soundEffects';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  items = [], 
  onUpdateQuantity, 
  onRemoveItem,
  onClearCart 
}) {
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0); // e.g. 0.20
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  const rawSubtotal = items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  const discountAmount = rawSubtotal * appliedDiscount;
  const finalTotal = Math.max(0, rawSubtotal - discountAmount);

  const handleApplyPromo = () => {
    playPopSound();
    const clean = promoCode.trim().toUpperCase();
    if (clean === 'CHILLHUB20' || clean === 'GAMENIGHT') {
      setAppliedDiscount(0.20);
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch (e) {}
    } else {
      alert("Invalid code. Try using 'CHILLHUB20' from the Promotions game!");
    }
  };

  const handleCheckout = () => {
    playSipChime();
    try {
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.5 }
      });
    } catch (e) {}
    setOrderSubmitted(true);
  };

  const handleReset = () => {
    setOrderSubmitted(false);
    onClearCart();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#2E1505]/50 backdrop-blur-xs flex justify-end">
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="w-full max-w-md bg-[#FFFDF9] border-l-3 border-[#3A1D0B] h-full flex flex-col justify-between shadow-2xl relative"
      >
        {/* Header */}
        <div className="p-5 border-b-2 border-[#4A2E1B] bg-[#FAF3E7] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">☕</span>
            <div>
              <h3 className="font-bubble text-2xl text-[#3A1D0B] leading-none">YOUR SIP TRAY</h3>
              <p className="font-retro text-xs text-[#8A5230] font-bold mt-0.5">THE SMOKE SHOP ORDER TRAY</p>
            </div>
          </div>

          <button
            onClick={() => {
              playPopSound();
              onClose();
            }}
            className="w-9 h-9 rounded-full bg-white border-2 border-[#3A1D0B] flex items-center justify-center text-[#3A1D0B] hover:bg-[#8B3A2B] hover:text-white transition-colors cursor-pointer"
            aria-label="Close Tray"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {orderSubmitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-20 h-20 bg-[#27C93F]/20 border-3 border-[#27C93F] rounded-full mx-auto flex items-center justify-center text-3xl">
                ☕✨
              </div>
              <h4 className="font-bubble text-3xl text-[#3A1D0B]">ORDER BREWING!</h4>
              <p className="font-retro text-sm text-[#6B3C1B] max-w-xs mx-auto">
                Your drinks have been sent to our barista counter. Estimated pickup ready time: <strong>6–9 minutes</strong>.
              </p>
              <div className="bg-[#FAF3E7] p-3 rounded-2xl border-2 border-[#3A1D0B] inline-block font-mono text-xs font-bold text-[#8B3A2B]">
                PICKUP TICKET #SS-{Math.floor(1000 + Math.random() * 9000)}
              </div>
              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-full bg-[#3A1D0B] text-white font-retro font-bold text-sm cursor-pointer"
                >
                  Start New Tray
                </button>
              </div>
            </div>
          ) : items.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <span className="text-4xl block">🧁</span>
              <h4 className="font-bubble text-2xl text-[#3A1D0B]">YOUR TRAY IS EMPTY</h4>
              <p className="font-retro text-xs text-[#8A5230] max-w-xs mx-auto">
                Explore our menu to add artisanal espresso, frozen freezas, and seasonal lattes!
              </p>
            </div>
          ) : (
            items.map((item, idx) => (
              <div
                key={item.cartId || idx}
                className="bg-[#FAF3E7] border-2 border-[#3A1D0B] rounded-2xl p-3.5 retro-shadow-sm flex items-center gap-3"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 rounded-xl object-cover border border-[#3A1D0B]"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <h5 className="font-bubble text-base text-[#3A1D0B] truncate">
                      {item.title}
                    </h5>
                    <span className="font-retro text-sm font-bold text-[#8B3A2B]">
                      ${(item.price * (item.quantity || 1)).toFixed(2)}
                    </span>
                  </div>

                  <p className="text-[11px] text-[#6B3C1B] font-medium truncate">
                    {item.milk} • {item.sweetness}
                  </p>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2 bg-white px-2 py-0.5 rounded-lg border border-[#DFCBB5]">
                      <button
                        onClick={() => onUpdateQuantity(item.cartId, (item.quantity || 1) - 1)}
                        className="text-[#3A1D0B] hover:text-[#8B3A2B] cursor-pointer"
                        title="Decrease"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-retro text-xs font-bold text-[#3A1D0B]">
                        {item.quantity || 1}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.cartId, (item.quantity || 1) + 1)}
                        className="text-[#3A1D0B] hover:text-[#8B3A2B] cursor-pointer"
                        title="Increase"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.cartId)}
                      className="text-[#8B3A2B] hover:text-[#3A1D0B] p-1 cursor-pointer"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Summary */}
        {!orderSubmitted && items.length > 0 && (
          <div className="p-5 border-t-2 border-[#4A2E1B] bg-[#FAF3E7] space-y-3">
            {/* Promo Code Input */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="PROMO CODE (e.g. CHILLHUB20)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 bg-white border-2 border-[#3A1D0B] rounded-xl px-3 py-1.5 text-xs font-mono font-bold uppercase placeholder:text-gray-400 focus:outline-hidden"
              />
              <button
                onClick={handleApplyPromo}
                className="px-3.5 py-1.5 rounded-xl bg-[#E29D38] hover:bg-[#D48F2A] text-[#3A1D0B] font-retro text-xs font-bold border-2 border-[#3A1D0B] retro-shadow-sm cursor-pointer"
              >
                Apply
              </button>
            </div>

            {/* Totals */}
            <div className="space-y-1 text-xs font-retro text-[#6B3C1B] pt-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-bold text-[#3A1D0B]">${rawSubtotal.toFixed(2)}</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-[#8B3A2B] font-bold">
                  <span>Game Reward Discount (20%):</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-bold text-[#3A1D0B] pt-1 border-t border-[#DFCBB5]">
                <span>Total:</span>
                <span className="font-bubble text-xl text-[#8B3A2B]">${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-3.5 rounded-full bg-[#8B3A2B] hover:bg-[#A54534] text-white font-retro font-bold text-base border-2 border-[#3A1D0B] retro-shadow retro-shadow-hover flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>SEND ORDER TO BARISTA</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
