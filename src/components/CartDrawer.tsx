import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartId: string, delta: number) => void;
  onRemoveItem: (cartId: string) => void;
  onProceedToCheckout: () => void;
  orderType: 'dine-in' | 'takeaway' | 'curbside';
  onChangeOrderType: (type: 'dine-in' | 'takeaway' | 'curbside') => void;
  tableNumber: string;
  onChangeTableNumber: (table: string) => void;
  promoCode: string;
  onApplyPromoCode: (code: string) => boolean;
  discountAmount: number;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  orderType,
  onChangeOrderType,
  tableNumber,
  onChangeTableNumber,
  onApplyPromoCode,
  discountAmount
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [promoStatus, setPromoStatus] = useState<string | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.itemTotalPrice, 0);
  const gst = Math.round(subtotal * 0.05); // 5% GST standard for cafes in India
  const finalTotal = Math.max(0, subtotal - discountAmount + gst);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput) return;
    const success = onApplyPromoCode(promoInput);
    if (success) {
      setPromoStatus('20% discount applied');
    } else {
      setPromoStatus('Invalid code (try CAFE20)');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs">
      <div 
        className="fixed inset-y-0 right-0 max-w-full flex w-full sm:w-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full sm:w-[400px] bg-[#FFFFFF] border-l border-[#E8E3D8] shadow-2xl flex flex-col justify-between font-mono">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#F0EBE1] flex items-center justify-between pt-safe">
            <h2 className="text-sm font-medium text-[#1C1917] uppercase tracking-wider">
              Your Order ({items.reduce((acc, i) => acc + i.quantity, 0)})
            </h2>
            <button
              onClick={onClose}
              className="p-1 rounded text-[#78716C] hover:text-[#1C1917] hover:bg-[#F4F0E8] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Items */}
          <div className="p-4 sm:p-5 overflow-y-auto flex-1 no-scrollbar space-y-4 text-xs">
            {/* Dining Option Toggle */}
            <div className="space-y-1.5">
              <span className="text-[10px] text-[#A8A29E] uppercase tracking-wider block font-medium">
                Order Destination
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onChangeOrderType('dine-in')}
                  className={`py-1.5 px-3 rounded border text-xs transition-colors ${
                    orderType === 'dine-in'
                      ? 'border-[#1C1917] bg-[#1C1917] text-[#FBF9F5] font-medium'
                      : 'border-[#E8E3D8] text-[#78716C] bg-[#FAF8F3]'
                  }`}
                >
                  Table Delivery
                </button>
                <button
                  onClick={() => onChangeOrderType('takeaway')}
                  className={`py-1.5 px-3 rounded border text-xs transition-colors ${
                    orderType === 'takeaway'
                      ? 'border-[#1C1917] bg-[#1C1917] text-[#FBF9F5] font-medium'
                      : 'border-[#E8E3D8] text-[#78716C] bg-[#FAF8F3]'
                  }`}
                >
                  Counter Pickup
                </button>
              </div>

              {orderType === 'dine-in' && (
                <div className="pt-1.5 flex items-center gap-2">
                  <span className="text-xs text-[#78716C]">Table Number:</span>
                  <input
                    type="text"
                    value={tableNumber}
                    onChange={(e) => onChangeTableNumber(e.target.value)}
                    placeholder="e.g. 04"
                    className="w-16 py-1 px-2 rounded bg-[#FAF8F3] border border-[#E8E3D8] text-[#1C1917] text-xs focus:outline-none focus:border-[#8C5E3C]"
                  />
                  <span className="text-[10px] text-[#A8A29E]">Brought to seat</span>
                </div>
              )}
            </div>

            {/* Item list */}
            {items.length === 0 ? (
              <div className="text-center py-12 text-[#A8A29E]">
                Your order is currently empty.
              </div>
            ) : (
              <div className="space-y-3 pt-1">
                {items.map((item) => (
                  <div
                    key={item.cartId}
                    className="p-3 rounded-lg bg-[#FAF8F3] border border-[#E8E3D8] flex items-start justify-between gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline">
                        <h4 className="text-xs text-[#1C1917] font-medium truncate font-serif font-semibold">
                          {item.menuItem.name}
                        </h4>
                        <span className="text-xs text-[#1C1917] ml-2 font-medium">
                          ₹{item.itemTotalPrice}
                        </span>
                      </div>

                      {item.customization && (
                        <div className="mt-0.5 text-[10px] text-[#78716C]">
                          {item.customization.milk} · {item.customization.temperature}
                          {item.customization.extraShot && ' · Extra Shot'}
                        </div>
                      )}

                      <div className="mt-2 flex items-center gap-2">
                        <button
                          onClick={() => onUpdateQuantity(item.cartId, -1)}
                          className="w-5 h-5 rounded bg-[#FFFFFF] border border-[#E8E3D8] text-[#78716C] hover:text-[#1C1917] flex items-center justify-center text-xs"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs text-[#1C1917] font-bold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.cartId, 1)}
                          className="w-5 h-5 rounded bg-[#FFFFFF] border border-[#E8E3D8] text-[#78716C] hover:text-[#1C1917] flex items-center justify-center text-xs"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.cartId)}
                      className="text-[#A8A29E] hover:text-[#1C1917] transition-colors p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Promo */}
            {items.length > 0 && (
              <form onSubmit={handleApplyPromo} className="pt-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Coupon (CAFE20)"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="flex-1 py-1.5 px-2.5 rounded bg-[#FAF8F3] border border-[#E8E3D8] text-[#1C1917] text-xs uppercase placeholder:text-[#A8A29E] focus:outline-none focus:border-[#8C5E3C]"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded bg-[#F4F0E8] hover:bg-[#EAE5DC] text-[#1C1917] text-xs font-medium"
                  >
                    Apply
                  </button>
                </div>
                {promoStatus && (
                  <span className="text-[10px] text-[#8C5E3C] mt-1 block">
                    {promoStatus}
                  </span>
                )}
              </form>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-[#F0EBE1] bg-[#FAF8F3] space-y-3 pb-safe text-xs">
              <div className="space-y-1">
                <div className="flex justify-between text-[#78716C]">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#8C5E3C]">
                    <span>Discount (20%)</span>
                    <span>-₹{Math.round(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#78716C]">
                  <span>GST (5%)</span>
                  <span>₹{gst}</span>
                </div>
                <div className="flex justify-between text-sm font-medium text-[#1C1917] pt-1.5 border-t border-[#E8E3D8]">
                  <span>Total</span>
                  <span className="font-bold font-serif text-base">₹{finalTotal}</span>
                </div>
              </div>

              <button
                onClick={onProceedToCheckout}
                className="w-full py-2.5 px-4 rounded bg-[#1C1917] hover:bg-[#2C2724] text-[#FBF9F5] font-medium text-xs transition-colors flex items-center justify-between shadow-xs"
              >
                <span>Proceed to Pay</span>
                <span className="flex items-center gap-1">
                  ₹{finalTotal} <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
