import React, { useState, useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenBooking
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'bg-[#FBF9F5]/95 backdrop-blur-md border-b border-[#E8E3D8] py-3.5 shadow-xs'
          : 'bg-transparent py-5 sm:py-6'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          {/* Wordmark: Pure CAFÉ */}
          <a href="#" className="flex items-center gap-2 group">
            <span className="font-serif tracking-[0.22em] text-lg sm:text-xl text-[#1C1917] uppercase font-semibold">
              CAFÉ
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#8C5E3C]" />
          </a>

          {/* Clean customer navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-mono text-[#78716C]">
            <a href="#menu" className="hover:text-[#1C1917] transition-colors">
              Menu
            </a>
            <button onClick={onOpenBooking} className="hover:text-[#1C1917] transition-colors cursor-pointer">
              Reservations
            </button>
            <a href="#loyalty" className="hover:text-[#1C1917] transition-colors">
              Stamps
            </a>
            <a href="#story" className="hover:text-[#1C1917] transition-colors">
              Reviews
            </a>
          </nav>

          {/* Right Action: Clean Order Button (replaced 'Bag') */}
          <div className="flex items-center">
            <button
              onClick={onOpenCart}
              className="px-3.5 py-1.5 rounded-md bg-[#1C1917] hover:bg-[#2C2724] text-[#FBF9F5] text-xs font-mono font-medium transition-colors flex items-center gap-2 shadow-xs cursor-pointer active:scale-95"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Order</span>
              {cartCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#8C5E3C] text-[#FBF9F5] text-[10px] flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
