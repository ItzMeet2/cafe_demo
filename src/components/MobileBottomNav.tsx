import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';

interface MobileBottomNavProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onOpenLoyalty: () => void;
  onOpenBooking: () => void;
  onScrollToMenu: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  cartCount,
  cartTotal,
  onOpenCart,
  onOpenLoyalty,
  onOpenBooking,
  onScrollToMenu
}) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 pointer-events-none flex flex-col items-center">
      {/* Floating Order Pill */}
      {cartCount > 0 && (
        <div className="w-full px-4 mb-2 pointer-events-auto">
          <button
            onClick={onOpenCart}
            className="w-full py-2.5 px-4 rounded-md bg-[#1C1917] text-[#FBF9F5] font-mono font-medium shadow-md flex items-center justify-between active:scale-[0.99] transition-transform cursor-pointer"
          >
            <div className="flex items-center gap-2 text-xs">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>View Order ({cartCount})</span>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span>₹{cartTotal}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>
      )}

      {/* Clean Light Bottom Bar for Mobile */}
      <div className="w-full pointer-events-auto bg-[#FFFFFF]/95 backdrop-blur-md border-t border-[#E8E3D8] px-6 py-2.5 pb-safe shadow-xs">
        <div className="flex items-center justify-around max-w-xs mx-auto text-xs font-mono text-[#78716C]">
          <button
            onClick={onScrollToMenu}
            className="hover:text-[#1C1917] active:text-[#1C1917] py-1 px-3 transition-colors cursor-pointer"
          >
            Menu
          </button>

          <button
            onClick={onOpenBooking}
            className="hover:text-[#1C1917] active:text-[#1C1917] py-1 px-3 transition-colors cursor-pointer"
          >
            Reservations
          </button>

          <button
            onClick={onOpenLoyalty}
            className="hover:text-[#1C1917] active:text-[#1C1917] py-1 px-3 transition-colors cursor-pointer"
          >
            Stamps
          </button>

          <button
            onClick={onOpenCart}
            className="hover:text-[#1C1917] active:text-[#1C1917] py-1 px-3 transition-colors font-medium text-[#1C1917] cursor-pointer"
          >
            Order {cartCount > 0 && `(${cartCount})`}
          </button>
        </div>
      </div>
    </div>
  );
};
