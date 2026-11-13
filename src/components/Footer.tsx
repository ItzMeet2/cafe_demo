import React from 'react';
import { Phone, Mail, ArrowUp, Clock, MapPin } from 'lucide-react';

interface FooterProps {
  onOpenPitch: () => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPitch, onOpenBooking }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsApp = () => {
    window.open(
      'https://wa.me/918369961495?text=Hi%2C%20I%20would%20like%20to%20order%20ahead%20or%20inquire%20about%20table%20seating%20at%20CAF%C3%89.',
      '_blank'
    );
  };

  return (
    <footer className="relative bg-[#0C0A09] text-[#A8A29E] pt-20 pb-10 overflow-hidden border-t border-[#292524] font-sans">
      {/* Subtle vertical architectural gridline texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20" 
        style={{
          backgroundImage: 'repeating-linear-gradient(to right, transparent, transparent 79px, rgba(140, 94, 60, 0.25) 80px)',
        }}
      />

      {/* Atmospheric Radial Bronze / Warm Amber Roast Glow */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[850px] h-[520px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(140, 94, 60, 0.18) 0%, rgba(180, 83, 9, 0.08) 35%, rgba(68, 64, 60, 0.03) 65%, transparent 75%)',
          filter: 'blur(70px)'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-16">
          {/* Brand & Description Column (Left) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              {/* Minimalist Cafe Geometric Monogram */}
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8C5E3C] via-[#6F472B] to-[#442A17] p-0.5 shadow-md flex items-center justify-center shrink-0">
                <div className="w-full h-full bg-[#1C1917] rounded-[6px] flex items-center justify-center">
                  <span className="font-serif font-bold text-sm text-[#EAD7C5] tracking-widest">
                    C
                  </span>
                </div>
              </div>
              <span className="text-2xl font-serif font-bold tracking-[0.2em] text-[#FBF9F5] uppercase">
                CAFÉ
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#A8A29E] max-w-sm font-light leading-relaxed">
              Specialty roastery, seasonal bakery, and quiet communal space. Single-origin Arabica roasted weekly in small batches with zero compromises.
            </p>

            {/* Chat on WhatsApp Button */}
            <button
              onClick={handleWhatsApp}
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#0D281E] hover:bg-[#12382A] border border-[#166534]/60 text-[#4ADE80] text-xs font-mono font-medium transition-all shadow-sm group active:scale-95 cursor-pointer"
            >
              {/* WhatsApp Icon */}
              <svg className="w-4 h-4 fill-current text-[#4ADE80]" viewBox="0 0 24 24">
                <path d="M12.031 2c-5.508 0-9.986 4.477-9.986 9.983 0 1.761.459 3.483 1.332 5.006l-1.417 5.176 5.305-1.391c1.472.802 3.125 1.226 4.766 1.226 5.508 0 9.986-4.477 9.986-9.984s-4.478-9.99-9.986-9.99zm5.82 14.156c-.244.685-1.224 1.258-1.705 1.333-.45.069-1.037.106-3.344-.849-2.73-1.127-4.502-3.896-4.639-4.077-.137-.181-1.109-1.473-1.109-2.809 0-1.336.702-1.993.951-2.261.249-.268.544-.336.726-.336.181 0 .363.003.521.011.169.009.394-.064.617.471.228.547.778 1.897.846 2.034.068.137.114.298.023.479-.091.181-.137.294-.272.452-.136.159-.286.355-.409.476-.136.136-.278.284-.119.557.159.273.705 1.162 1.512 1.88 1.04 1.004 1.916 1.314 2.189 1.45.273.136.432.114.591-.068.159-.181.681-.795.863-1.068.181-.273.363-.227.613-.136.25.091 1.589.749 1.862.885.273.136.454.204.522.317.068.113.068.658-.176 1.343z"/>
              </svg>
              <span>Order Ahead on WhatsApp</span>
            </button>
          </div>

          {/* Menu / Offerings Column */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-[11px] font-mono tracking-widest text-[#FBF9F5] uppercase font-bold">
              OFFERINGS
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A8A29E] font-mono">
              <li><a href="#menu" className="hover:text-white transition-colors">Espresso Bar</a></li>
              <li><a href="#menu" className="hover:text-white transition-colors">18-Hr Cold Brews</a></li>
              <li><a href="#menu" className="hover:text-white transition-colors">Single Origin Filter</a></li>
              <li><a href="#menu" className="hover:text-white transition-colors">Artisan Sourdough</a></li>
              <li><a href="#menu" className="hover:text-white transition-colors">Whole Bean Retail</a></li>
            </ul>
          </div>

          {/* Experience Column */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-[11px] font-mono tracking-widest text-[#FBF9F5] uppercase font-bold">
              EXPERIENCE
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A8A29E] font-mono">
              <li>
                <button onClick={onOpenBooking} className="hover:text-white text-left transition-colors cursor-pointer">
                  Table Reservations
                </button>
              </li>
              <li><a href="#loyalty" className="hover:text-white transition-colors">Stamp Card</a></li>
              <li><a href="#story" className="hover:text-white transition-colors">Guest Impressions</a></li>
              <li><a href="#story" className="hover:text-white transition-colors">Farm Direct Trade</a></li>
              <li>
                <button 
                  onClick={onOpenPitch}
                  className="hover:text-[#EAD7C5] text-left transition-colors flex items-center gap-1.5 text-[#8C5E3C] font-medium cursor-pointer"
                  title="Cafe Owner Digital Pitch & Savings Calculator"
                >
                  <span>Cafe Owner Demo</span>
                  <span className="text-[9px] px-1 rounded bg-[#8C5E3C]/20 text-[#EAD7C5]">ROI</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Sourcing & Hours Column */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-[11px] font-mono tracking-widest text-[#FBF9F5] uppercase font-bold">
              HOURS & ETHOS
            </h4>
            <div className="space-y-3 text-xs text-[#A8A29E] font-mono">
              <div className="space-y-1">
                <div className="text-[#FBF9F5] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#8C5E3C]" />
                  <span>Mon – Fri: 08:00 – 18:00</span>
                </div>
                <div className="text-[#D6D3D1] pl-5">Sat – Sun: 08:00 – 20:00</div>
              </div>

              <div className="pt-1.5 space-y-1 text-[11px] border-t border-[#292524]">
                <div className="text-[#D6D3D1]">Chikmagalur 1,250m ASL</div>
                <div className="text-[#78716C]">Zero Single-Use Plastics</div>
                <div className="text-[#78716C]">100% Compostable Packaging</div>
              </div>
            </div>
          </div>

          {/* Location & Contact Column */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-[11px] font-mono tracking-widest text-[#FBF9F5] uppercase font-bold">
              VISIT & CONTACT
            </h4>
            <div className="space-y-3 text-xs text-[#A8A29E] font-mono">
              <div className="space-y-1">
                <div className="text-[#FBF9F5] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#8C5E3C]" />
                  <span>108 Artisan Row</span>
                </div>
                <div className="text-[#D6D3D1] pl-5">Heritage Quarter, Mumbai</div>
              </div>

              <div className="space-y-1.5 pt-1">
                <a 
                  href="tel:+918369961495" 
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#8C5E3C]" />
                  <span>+91 83699 61495</span>
                </a>
                <a 
                  href="mailto:hello@cafe-specialty.in" 
                  className="flex items-center gap-2 hover:text-white transition-colors truncate"
                >
                  <Mail className="w-3.5 h-3.5 text-[#8C5E3C] shrink-0" />
                  <span className="truncate">orders@cafe.in</span>
                </a>
              </div>

              <div className="pt-1">
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <svg className="w-3.5 h-3.5 text-[#8C5E3C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                  <span>@cafe.specialty</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Separator Line */}
        <div className="pt-6 pb-6 border-t border-[#292524] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#78716C]">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <span>© 2026 CAFÉ Specialty Roastery & Kitchen. All rights reserved.</span>
            <span className="hidden sm:inline text-[#44403C]">•</span>
            <span className="text-[#A8A29E] text-[11px]">
              Engineered by <a href="https://rootcrypt.in" target="_blank" rel="noreferrer" className="text-[#EAD7C5] hover:text-white transition-colors underline decoration-[#8C5E3C]/60">RootCrypt Agency</a>
            </span>
          </div>

          <button
            onClick={scrollToTop}
            className="hover:text-white transition-colors flex items-center gap-1.5 active:scale-95 text-[#A8A29E] cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Giant Background Typographic Watermark (Tailored for CAFÉ) */}
      <div className="relative w-full overflow-hidden select-none pointer-events-none mt-2 -mb-8 sm:-mb-12">
        <h2 className="text-center font-serif font-bold text-[22vw] leading-none tracking-tight text-[#1C1917]/80 bg-gradient-to-b from-[#292524]/70 via-[#1C1917]/40 to-transparent bg-clip-text text-transparent whitespace-nowrap">
          CAFÉ
        </h2>
      </div>
    </footer>
  );
};
