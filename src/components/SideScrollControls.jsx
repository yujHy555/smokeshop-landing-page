import React from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { playPopSound, playSlideWhoosh } from '../utils/soundEffects';

export default function SideScrollControls({ 
  currentSection, 
  totalSections = 3, 
  onNavigate, 
  scrollProgress = 0 
}) {
  const sections = [
    { id: 0, label: '01 Home & About', short: 'Home' },
    { id: 1, label: '02 Promotions & Game', short: 'Promos' },
    { id: 2, label: '03 Menu & Slideshow', short: 'Menu' },
  ];

  const handlePrev = () => {
    if (currentSection > 0) {
      playSlideWhoosh();
      onNavigate(currentSection - 1);
    }
  };

  const handleNext = () => {
    if (currentSection < totalSections - 1) {
      playSlideWhoosh();
      onNavigate(currentSection + 1);
    }
  };

  return (
    <aside aria-label="Horizontal side-scrolling controls" className="fixed bottom-2 sm:bottom-2.5 left-1/2 -translate-x-1/2 z-30 w-[92%] max-w-lg pointer-events-none">
      <div className="bg-[#FAF3E7]/95 backdrop-blur-md border-2 border-[#3A1D0B] rounded-full p-1.5 px-3 sm:px-4 retro-shadow-sm pointer-events-auto flex items-center justify-between gap-2 sm:gap-3">
        
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          disabled={currentSection === 0}
          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-[#3A1D0B] flex items-center justify-center transition-all ${
            currentSection === 0
              ? 'opacity-30 cursor-not-allowed bg-[#EADDC7]'
              : 'bg-[#FFFDF9] hover:bg-[#8B3A2B] hover:text-white cursor-pointer retro-shadow-sm'
          }`}
          title="Previous section (Left arrow)"
          aria-label="Previous Section"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Section Pill Indicators & Mini Progress Track */}
        <div className="flex-1 flex flex-col items-center">
          {/* Section Selector Buttons */}
          <div className="flex items-center gap-1 sm:gap-2">
            {sections.map((sec) => {
              const isActive = currentSection === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => {
                    playPopSound();
                    onNavigate(sec.id);
                  }}
                  className={`px-2.5 sm:px-3 py-1 rounded-full text-xs font-retro font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#3A1D0B] text-[#FFFDF9] shadow-xs scale-105'
                      : 'text-[#6B3C1B] hover:bg-[#EADDC7]/60'
                  }`}
                >
                  <span className="hidden sm:inline">{sec.label}</span>
                  <span className="sm:hidden">{sec.short}</span>
                </button>
              );
            })}
          </div>

          {/* Mini Real-Time Track with Walking Cup Indicator */}
          <div className="w-full max-w-[200px] h-1.5 bg-[#DFCBB5] rounded-full mt-1.5 relative overflow-hidden">
            <div
              className="h-full bg-[#8B3A2B] rounded-full transition-all duration-300 ease-out"
              style={{ width: `${Math.max(8, scrollProgress * 100)}%` }}
            />
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={currentSection === totalSections - 1}
          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-[#3A1D0B] flex items-center justify-center transition-all ${
            currentSection === totalSections - 1
              ? 'opacity-30 cursor-not-allowed bg-[#EADDC7]'
              : 'bg-[#FFFDF9] hover:bg-[#8B3A2B] hover:text-white cursor-pointer retro-shadow-sm'
          }`}
          title="Next section (Right arrow)"
          aria-label="Next Section"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

      </div>

      {/* Keyboard Shortcut & Soft Stop Hint */}
      <div className="text-center mt-1.5 hidden md:block">
        <span className="font-retro text-[10px] text-[#7E5738] bg-[#FAF3E7]/80 px-2.5 py-0.5 rounded-full border border-[#DFCBB5]">
          Scroll wheel / trackpad or [←] [→] keys • Soft magnetic snap
        </span>
      </div>
    </aside>
  );
}
