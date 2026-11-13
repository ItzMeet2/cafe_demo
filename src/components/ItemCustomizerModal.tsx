import React, { useState } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { MenuItem, CustomizationOptions, CartItem } from '../types';

interface ItemCustomizerModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (cartItem: CartItem) => void;
}

export const ItemCustomizerModal: React.FC<ItemCustomizerModalProps> = ({
  item,
  isOpen,
  onClose,
  onAddToCart
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [milk, setMilk] = useState<CustomizationOptions['milk']>('Oat Milk');
  const [roast, setRoast] = useState<CustomizationOptions['roast']>('House Signature Espresso');
  const [sweetness, setSweetness] = useState<CustomizationOptions['sweetness']>('0% Unsweetened');
  const [temperature, setTemperature] = useState<CustomizationOptions['temperature']>('Hot (150°F)');
  const [extraShot, setExtraShot] = useState<boolean>(false);
  const [flavorSyrup, setFlavorSyrup] = useState<CustomizationOptions['flavorSyrup']>('None');
  const [specialNotes, setSpecialNotes] = useState<string>('');

  if (!isOpen || !item) return null;

  // Price Calculation in INR (₹)
  let basePrice = item.price;
  if (milk === 'Oat Milk' || milk === 'Almond Milk' || milk === 'Coconut Milk') {
    basePrice += 40;
  }
  if (extraShot) {
    basePrice += 50;
  }
  const totalItemPrice = basePrice * quantity;

  const handleConfirmAddToCart = () => {
    const cartItem: CartItem = {
      cartId: `${item.id}-${Date.now()}`,
      menuItem: item,
      quantity,
      customization: {
        milk,
        roast,
        sweetness,
        temperature,
        extraShot,
        flavorSyrup,
        specialNotes
      },
      itemTotalPrice: totalItemPrice
    };
    onAddToCart(cartItem);
    onClose();
  };

  const isBeverage = item.category === 'espresso' || item.category === 'cold-brew' || item.category === 'tea-matcha';

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs overflow-hidden">
      <div className="absolute inset-0" onClick={onClose} />

      <div 
        className="relative w-full sm:max-w-lg bg-[#FFFFFF] border-t sm:border border-[#E8E3D8] rounded-t-xl sm:rounded-lg shadow-2xl overflow-hidden max-h-[90vh] flex flex-col z-10 font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#F0EBE1] flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-[#78716C] uppercase tracking-wider block">
              {item.category.replace('-', ' ')}
            </span>
            <h3 className="text-lg font-serif text-[#1C1917] font-semibold">{item.name}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-[#78716C] hover:text-[#1C1917] hover:bg-[#F4F0E8] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Options */}
        <div className="p-4 sm:p-6 space-y-5 overflow-y-auto no-scrollbar flex-1 font-mono text-xs">
          {/* Micro-interaction Coffee Layer Simulator (Skiper UI / Motion inspired) */}
          {isBeverage && (
            <div className="p-3.5 rounded-lg bg-[#FAF8F3] border border-[#E8E3D8] flex items-center gap-4">
              {/* Cup Graphic */}
              <div className="w-14 h-20 rounded-b-xl border-2 border-[#1C1917] relative overflow-hidden flex flex-col justify-end bg-[#FFFFFF] shrink-0 shadow-inner">
                {/* Milk Layer */}
                {milk !== 'No Milk' && (
                  <div 
                    className="w-full transition-all duration-300" 
                    style={{
                      height: '52%',
                      backgroundColor: milk === 'Oat Milk' ? '#F2E8D5' : milk === 'Almond Milk' ? '#EFE7DA' : '#FFFDF7',
                      borderBottom: '1px dashed #D6CFBF'
                    }}
                  />
                )}
                {/* Espresso / Base Layer */}
                <div 
                  className="w-full transition-all duration-300 relative" 
                  style={{
                    height: milk === 'No Milk' ? '80%' : extraShot ? '48%' : '38%',
                    backgroundColor: temperature === 'Iced' ? '#2A1A12' : '#3D2214'
                  }}
                >
                  {/* Crema Line */}
                  <div className="h-1 w-full bg-[#B47B49]/80" />
                </div>

                {/* Ice Cubes indicator if Iced */}
                {temperature === 'Iced' && (
                  <div className="absolute top-2 left-1.5 right-1.5 flex justify-between pointer-events-none opacity-80">
                    <span className="w-2.5 h-2.5 rounded-xs border border-white/60 bg-white/40 block" />
                    <span className="w-2 h-2 rounded-xs border border-white/60 bg-white/40 block rotate-12" />
                  </div>
                )}
              </div>

              {/* Extraction Specs */}
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#1C1917]">Live Brew Recipe</span>
                  <span className="text-[10px] text-[#8C5E3C]">{temperature}</span>
                </div>
                <div className="text-[11px] text-[#78716C] leading-snug">
                  {extraShot ? 'Triple Extraction (36g yield)' : 'Double Extraction (24g yield)'} · {milk}
                </div>
                <div className="text-[10px] text-[#A8A29E]">
                  93.5°C water temp · 9 bar pump extraction
                </div>
              </div>
            </div>
          )}

          <p className="text-[#78716C] font-sans text-xs leading-relaxed font-light">
            {item.description}
          </p>

          {/* Temperature */}
          {item.category !== 'bakery' && item.category !== 'coffee-beans' && (
            <div className="space-y-2">
              <label className="text-[11px] text-[#A8A29E] uppercase tracking-wider block font-medium">
                Serving Temperature
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['Hot (150°F)', 'Iced'] as const).map((temp) => (
                  <button
                    key={temp}
                    onClick={() => setTemperature(temp)}
                    className={`py-2 px-3 rounded text-xs border transition-colors cursor-pointer ${
                      temperature === temp
                        ? 'border-[#1C1917] bg-[#1C1917] text-[#FBF9F5] font-medium'
                        : 'border-[#E8E3D8] text-[#78716C] hover:border-[#D6CFBF] bg-[#FAF8F3]'
                    }`}
                  >
                    {temp}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Milk Selection */}
          {(item.category === 'espresso' || item.category === 'tea-matcha') && (
            <div className="space-y-2">
              <label className="text-[11px] text-[#A8A29E] uppercase tracking-wider block font-medium">
                Milk Choice
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { name: 'Oat Milk', extra: '+₹40' },
                  { name: 'Whole Milk', extra: 'Included' },
                  { name: 'Almond Milk', extra: '+₹40' },
                  { name: 'No Milk', extra: 'Black' }
                ].map((m) => (
                  <button
                    key={m.name}
                    onClick={() => setMilk(m.name as CustomizationOptions['milk'])}
                    className={`py-2 px-3 rounded text-xs border text-left flex justify-between items-center transition-colors cursor-pointer ${
                      milk === m.name
                        ? 'border-[#1C1917] bg-[#1C1917] text-[#FBF9F5] font-medium'
                        : 'border-[#E8E3D8] text-[#78716C] hover:border-[#D6CFBF] bg-[#FAF8F3]'
                    }`}
                  >
                    <span>{m.name}</span>
                    <span className="text-[10px] opacity-75">{m.extra}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Extra Shot */}
          {item.category === 'espresso' && (
            <div className="py-2.5 flex items-center justify-between border-y border-[#F0EBE1]">
              <span className="text-xs text-[#1C1917]">Extra Espresso Shot</span>
              <button
                type="button"
                onClick={() => setExtraShot(!extraShot)}
                className={`px-3 py-1 rounded text-xs transition-colors cursor-pointer ${
                  extraShot
                    ? 'bg-[#1C1917] text-[#FBF9F5] font-medium'
                    : 'bg-[#F4F0E8] text-[#78716C] hover:text-[#1C1917]'
                }`}
              >
                {extraShot ? 'Added (+₹50)' : '+ ₹50'}
              </button>
            </div>
          )}

          {/* Barista Notes */}
          <div className="space-y-1.5">
            <label className="text-[11px] text-[#A8A29E] uppercase tracking-wider block font-medium">
              Notes for Barista
            </label>
            <input
              type="text"
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              placeholder="e.g. Extra hot, light ice..."
              className="w-full py-2 px-3 rounded bg-[#FAF8F3] border border-[#E8E3D8] text-[#1C1917] text-xs placeholder:text-[#A8A29E] focus:outline-none focus:border-[#8C5E3C]"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-[#F0EBE1] bg-[#FAF8F3] flex items-center justify-between gap-3 pb-safe">
          <div className="flex items-center gap-2 bg-[#FFFFFF] border border-[#E8E3D8] rounded p-1">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-7 h-7 rounded text-[#78716C] hover:text-[#1C1917] flex items-center justify-center text-xs cursor-pointer"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs font-mono text-[#1C1917] min-w-4 text-center font-bold">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-7 h-7 rounded text-[#78716C] hover:text-[#1C1917] flex items-center justify-center text-xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={handleConfirmAddToCart}
            className="flex-1 py-2.5 px-4 rounded bg-[#1C1917] hover:bg-[#2C2724] text-[#FBF9F5] font-mono font-medium text-xs transition-colors flex items-center justify-between shadow-xs cursor-pointer active:scale-98"
          >
            <span>Add to Order</span>
            <span>₹{totalItemPrice}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
