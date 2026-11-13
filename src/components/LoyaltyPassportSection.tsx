import React, { useState } from 'react';
import { Check, RotateCcw, Sparkles, Gift, Smartphone, Coffee } from 'lucide-react';

export const LoyaltyPassportSection: React.FC = () => {
  const [stamps, setStamps] = useState<number>(4);

  const handleAddStamp = (index: number) => {
    if (index === stamps && stamps < 6) {
      setStamps(stamps + 1);
    }
  };

  return (
    <section id="loyalty" className="py-16 sm:py-24 bg-[#FBF9F5] border-t border-[#E8E3D8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Balanced 2-Column Layout for Proper Desktop & Mobile Spacing */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Heading & Perks */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#78716C] block mb-2">
                03 / Rewards
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#1C1917] tracking-tight">
                Stamp Card
              </h2>
              <p className="text-xs sm:text-sm text-[#78716C] mt-3 font-light leading-relaxed">
                Every sixth coffee is on us. No physical paper cards to carry or lose—your stamps save directly in your phone browser every time you order.
              </p>
            </div>

            {/* 3 Minimal Perks */}
            <div className="space-y-3.5 pt-2 font-mono text-xs text-[#78716C]">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-[#FAF8F3] border border-[#E8E3D8]">
                <Coffee className="w-4 h-4 text-[#8C5E3C] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#1C1917] font-medium block">1 Stamp per Beverage</span>
                  <span className="text-[11px] text-[#A8A29E] font-light">Valid on all espresso, cold brews, and manual filter coffees.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-[#FAF8F3] border border-[#E8E3D8]">
                <Smartphone className="w-4 h-4 text-[#8C5E3C] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#1C1917] font-medium block">Saved to Your Phone</span>
                  <span className="text-[11px] text-[#A8A29E] font-light">Zero app downloads. Linked to your browser session automatically.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-[#FAF8F3] border border-[#E8E3D8]">
                <Gift className="w-4 h-4 text-[#8C5E3C] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#1C1917] font-medium block">6th Brew Free</span>
                  <span className="text-[11px] text-[#A8A29E] font-light">Redeem instantly at table or counter for any drink on the menu.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Stamp Card */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-xl bg-[#FFFFFF] border border-[#E8E3D8] shadow-sm space-y-6 font-mono">
              {/* Card Top Details */}
              <div className="flex items-center justify-between pb-4 border-b border-[#F0EBE1]">
                <div>
                  <span className="text-[11px] font-medium text-[#1C1917] uppercase tracking-wider block">
                    Stamp Card
                  </span>
                  <span className="text-[10px] text-[#A8A29E]">Card ID: #STAMP-8841</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-[#8C5E3C] block">
                    {stamps} of 6 Stamps
                  </span>
                  <span className="text-[10px] text-[#A8A29E]">
                    {6 - stamps === 0 ? 'Reward Ready' : `${6 - stamps} more for a free drink`}
                  </span>
                </div>
              </div>

              {/* 6 Tactile Stamp Circles */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4 py-3">
                {[0, 1, 2, 3, 4, 5].map((idx) => {
                  const isStamped = idx < stamps;
                  const isNext = idx === stamps;

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleAddStamp(idx)}
                      disabled={!isNext}
                      className={`aspect-square rounded-xl border-2 flex flex-col items-center justify-center transition-all text-xs relative ${
                        isStamped
                          ? 'border-[#1C1917] bg-[#1C1917] text-[#FBF9F5] shadow-xs'
                          : isNext
                          ? 'border-[#8C5E3C] bg-[#FAF8F3] text-[#8C5E3C] hover:border-[#1C1917] hover:bg-[#F2ECE1] cursor-pointer shadow-xs animate-pulse-subtle'
                          : 'border-[#E8E3D8] bg-[#FAF8F3]/50 text-[#C4BEB1] cursor-default'
                      }`}
                      title={isNext ? 'Tap to stamp visit' : undefined}
                    >
                      {isStamped ? (
                        <div className="flex flex-col items-center gap-1">
                          <Check className="w-4 h-4 text-[#FBF9F5]" />
                          <span className="text-[9px] text-[#DDD7CC]">0{idx + 1}</span>
                        </div>
                      ) : idx === 5 ? (
                        <div className="text-center">
                          <span className="text-[10px] font-bold text-[#8C5E3C] block">FREE</span>
                          <span className="text-[8px] text-[#A8A29E]">CUP</span>
                        </div>
                      ) : (
                        <div className="text-center">
                          <span className="text-xs font-medium">0{idx + 1}</span>
                          {isNext && (
                            <span className="text-[8px] text-[#8C5E3C] block font-bold mt-0.5">TAP</span>
                          )}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Stamp Status / Instructions */}
              {stamps === 6 ? (
                <div className="p-4 rounded-lg bg-[#FAF8F3] border border-[#8C5E3C]/40 space-y-2">
                  <div className="flex items-center gap-2 text-[#8C5E3C] text-xs font-bold">
                    <Sparkles className="w-4 h-4" />
                    <span>Reward Unlocked: 1 Complimentary Brew</span>
                  </div>
                  <p className="text-[11px] text-[#78716C] font-sans font-light">
                    Show voucher code <span className="font-mono font-bold text-[#1C1917]">STAMP-FREE-88</span> at the counter or apply it in your order checkout!
                  </p>
                </div>
              ) : (
                <div className="p-3.5 rounded-lg bg-[#FAF8F3] border border-[#E8E3D8] flex items-center justify-between text-[11px] text-[#78716C]">
                  <span>Tap stamp #0{stamps + 1} to simulate recording a visit.</span>
                  <span className="text-[#8C5E3C] font-medium shrink-0 ml-2">Interactive Demo</span>
                </div>
              )}

              {/* Card Footer */}
              <div className="pt-3 flex items-center justify-between border-t border-[#F0EBE1] text-[11px] text-[#A8A29E]">
                <span>Valid on all specialty beverages</span>
                <button
                  onClick={() => setStamps(0)}
                  className="hover:text-[#1C1917] flex items-center gap-1.5 transition-colors cursor-pointer text-[#78716C]"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Stamps</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
