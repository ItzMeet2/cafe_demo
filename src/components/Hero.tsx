import React from 'react';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenBooking
}) => {
  const marqueeItems = [
    'CHIKMAGALUR SINGLE ESTATE ARABICA',
    '18-HOUR COLD EXTRACTION',
    'ETHICAL DIRECT TRADE',
    '100% ARABICA SPECIALTY LOT',
    'ZERO COMPROMISE CRAFT',
    'ARTISAN SOURDOUGH BAKERY',
    'CUPPING SCORE 86+',
    'ATTIKAN ESTATE MICRO-LOT',
    'CONTACTLESS TABLE SERVICE',
    'CAST IRON DRUM ROAST'
  ];

  return (
    <section className="relative pt-28 sm:pt-36 border-b border-[#E8E3D8] bg-[#FBF9F5] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          {/* Main Editorial Headline */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono text-[#78716C]">
              <span>Specialty Roastery & Kitchen</span>
              <span>/</span>
              <span>Open 08:00 – 18:00</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif text-[#1C1917] tracking-tight leading-[1.08]">
              Pure coffee. <br />
              <span className="italic text-[#8C5E3C]">Quiet</span> spaces.
            </h1>

            <p className="text-sm text-[#78716C] max-w-lg leading-relaxed font-light">
              Single-origin lots roasted in small batches, seasonal bakery, and quiet communal tables. 
              Order directly from your phone for table delivery, takeaway, or reserve seating in advance.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#menu"
                className="px-5 py-2.5 rounded-md bg-[#1C1917] hover:bg-[#2C2724] text-[#FBF9F5] text-xs font-mono font-medium transition-colors shadow-xs cursor-pointer active:scale-95"
              >
                Explore Menu
              </a>

              <button
                onClick={onOpenBooking}
                className="px-4 py-2.5 rounded-md bg-[#FFFFFF] hover:bg-[#F4F0E8] border border-[#DDD7CC] text-[#1C1917] text-xs font-mono transition-colors font-medium cursor-pointer active:scale-95"
              >
                Reserve a Table
              </button>
            </div>
          </div>

          {/* Minimal Editorial Image Block */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-[#E8E3D8] bg-[#F0EBE1] shadow-xs group">
              <img
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=80"
                alt="Manual pour over brew"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-[#FBF9F5]">
                <span>108 Artisan Row</span>
                <span className="text-[#EAD7C5]">Washed & Natural Lots</span>
              </div>
            </div>
          </div>
        </div>

        {/* Minimal Specs Bar */}
        <div className="mt-12 pt-6 border-t border-[#E8E3D8] grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div>
            <span className="text-[#A8A29E] block text-[10px] uppercase">Service</span>
            <span className="text-[#1C1917] mt-0.5 block font-medium">Table & Counter Order</span>
          </div>
          <div>
            <span className="text-[#A8A29E] block text-[10px] uppercase">Roasting</span>
            <span className="text-[#1C1917] mt-0.5 block font-medium">Cast Iron Drum</span>
          </div>
          <div>
            <span className="text-[#A8A29E] block text-[10px] uppercase">Atmosphere</span>
            <span className="text-[#1C1917] mt-0.5 block font-medium">Garden Patio & Stalls</span>
          </div>
          <div>
            <span className="text-[#A8A29E] block text-[10px] uppercase">Direct Channel</span>
            <span className="text-[#8C5E3C] mt-0.5 block font-medium">0% Third-Party Cut</span>
          </div>
        </div>
      </div>

      {/* Magic UI Style Continuous Infinite Marquee Ticker */}
      <div className="border-t border-[#E8E3D8] bg-[#FAF8F3] py-2.5 overflow-hidden flex select-none">
        <div className="animate-marquee flex items-center gap-8 font-mono text-[11px] text-[#78716C] uppercase tracking-widest whitespace-nowrap">
          {marqueeItems.concat(marqueeItems).map((text, i) => (
            <div key={i} className="flex items-center gap-8 shrink-0">
              <span className="hover:text-[#1C1917] transition-colors">{text}</span>
              <span className="w-1 h-1 rounded-full bg-[#8C5E3C]/60" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
