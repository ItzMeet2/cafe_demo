import React, { useState } from 'react';
import { X } from 'lucide-react';

interface PitchModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDemoTableQR: () => void;
  onDemoKDS: () => void;
  onDemoBooking: () => void;
}

export const PitchModeModal: React.FC<PitchModeModalProps> = ({
  isOpen,
  onClose,
  onDemoTableQR,
  onDemoKDS,
  onDemoBooking
}) => {
  const [dailyOrders, setDailyOrders] = useState<number>(100);
  const [avgTicket, setAvgTicket] = useState<number>(380);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  // Swiggy / Zomato take average 28% commission
  const monthlyAggregatorLoss = Math.round(dailyOrders * avgTicket * 30 * 0.28);
  const annualAggregatorLoss = monthlyAggregatorLoss * 12;

  const handleCopyPitchSummary = () => {
    navigator.clipboard.writeText(
      `CAFÉ Digital Economics Proposal:\n- Commission Recovered: ₹${monthlyAggregatorLoss.toLocaleString('en-IN')}/month\n- Annual Profit Recovered: ₹${annualAggregatorLoss.toLocaleString('en-IN')}\n- Features: Direct Web Ordering, Table QR Service, Barista KDS Screen, Digital Stamp Card.\n- White-label Turnkey Setup: 48 Hours.`
    );
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs overflow-hidden font-mono">
      <div className="absolute inset-0" onClick={onClose} />

      <div 
        className="relative w-full sm:max-w-2xl bg-[#FFFFFF] border-t sm:border border-[#E8E3D8] rounded-t-xl sm:rounded-lg shadow-2xl overflow-hidden max-h-[92vh] flex flex-col z-10 text-xs"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#F0EBE1] flex items-center justify-between">
          <div>
            <span className="text-[10px] text-[#8C5E3C] uppercase tracking-wider block font-medium">
              Agency Walk-In Deck
            </span>
            <h2 className="text-base font-serif text-[#1C1917] font-semibold">
              Cafe Owner ROI & Margin Recovery
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-[#78716C] hover:text-[#1C1917] hover:bg-[#F4F0E8]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto no-scrollbar space-y-6 flex-1">
          {/* Margin Recovery Calculator */}
          <div className="p-4 rounded-lg bg-[#FAF8F3] border border-[#E8E3D8] space-y-4">
            <div className="flex justify-between items-baseline">
              <span className="text-xs uppercase tracking-wider text-[#1C1917] font-semibold">
                Direct Web Ordering vs. Swiggy / Zomato
              </span>
              <span className="text-[11px] text-[#8C5E3C] font-medium">28% Commission Saved</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-[#78716C]">
                  <span>Daily Orders:</span>
                  <span className="text-[#1C1917] font-bold">{dailyOrders} / day</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="350"
                  step="10"
                  value={dailyOrders}
                  onChange={(e) => setDailyOrders(Number(e.target.value))}
                  className="w-full h-1.5 bg-[#E8E3D8] rounded appearance-none cursor-pointer accent-[#1C1917]"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-[#78716C]">
                  <span>Average Bill Value:</span>
                  <span className="text-[#1C1917] font-bold">₹{avgTicket}</span>
                </div>
                <input
                  type="range"
                  min="150"
                  max="900"
                  step="10"
                  value={avgTicket}
                  onChange={(e) => setAvgTicket(Number(e.target.value))}
                  className="w-full h-1.5 bg-[#E8E3D8] rounded appearance-none cursor-pointer accent-[#1C1917]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2.5 border-t border-[#E8E3D8]">
              <div>
                <span className="text-[10px] text-[#A8A29E] block uppercase font-medium">Monthly Commission Kept</span>
                <span className="text-xl sm:text-2xl font-serif text-[#8C5E3C] mt-0.5 block font-bold">
                  +₹{monthlyAggregatorLoss.toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-[#78716C]">100% direct profit to cafe</span>
              </div>
              <div>
                <span className="text-[10px] text-[#A8A29E] block uppercase font-medium">Annual Margin Recovered</span>
                <span className="text-xl sm:text-2xl font-serif text-[#1C1917] mt-0.5 block font-bold">
                  +₹{annualAggregatorLoss.toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-[#78716C]">Instead of third-party cuts</span>
              </div>
            </div>
          </div>

          {/* Operational Value Pillars */}
          <div className="space-y-2">
            <span className="text-[10px] text-[#A8A29E] uppercase tracking-wider block font-medium">
              4 Critical Solutions for Local Cafes
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[11px]">
              <div className="p-3 rounded-lg bg-[#FAF8F3] border border-[#E8E3D8] space-y-1">
                <span className="text-[#1C1917] block font-semibold">1. Zero-Commission Web Store</span>
                <p className="text-[#78716C] font-sans font-light">Direct UPI and Card payments with 0% platform take-rate. Customer database belongs to you.</p>
              </div>

              <div className="p-3 rounded-lg bg-[#FAF8F3] border border-[#E8E3D8] space-y-1">
                <span className="text-[#1C1917] block font-semibold">2. Table QR Order & Pay</span>
                <p className="text-[#78716C] font-sans font-light">Seated guests order and pay directly. Increases table turnover by 24% during rush hours.</p>
              </div>

              <div className="p-3 rounded-lg bg-[#FAF8F3] border border-[#E8E3D8] space-y-1">
                <span className="text-[#1C1917] block font-semibold">3. Digital Browser Stamp Card</span>
                <p className="text-[#78716C] font-sans font-light">Replaces lost paper loyalty punch cards. Boosts repeat customer frequency by 2.4x.</p>
              </div>

              <div className="p-3 rounded-lg bg-[#FAF8F3] border border-[#E8E3D8] space-y-1">
                <span className="text-[#1C1917] block font-semibold">4. Tablet Kitchen Display (KDS)</span>
                <p className="text-[#78716C] font-sans font-light">Runs smoothly on any basic Android tablet or iPad. Eliminates costly proprietary POS rentals.</p>
              </div>
            </div>
          </div>

          {/* Demo Actions */}
          <div className="space-y-2">
            <span className="text-[10px] text-[#A8A29E] uppercase tracking-wider block font-medium">
              Interactive Demos for the Cafe Owner
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => { onClose(); onDemoTableQR(); }}
                className="p-2.5 rounded-lg bg-[#FFFFFF] hover:bg-[#FAF8F3] border border-[#E8E3D8] text-left transition-colors shadow-xs"
              >
                <span className="text-xs text-[#1C1917] block font-semibold">Table QR</span>
                <span className="text-[10px] text-[#78716C]">At-table service</span>
              </button>

              <button
                onClick={() => { onClose(); onDemoKDS(); }}
                className="p-2.5 rounded-lg bg-[#FFFFFF] hover:bg-[#FAF8F3] border border-[#E8E3D8] text-left transition-colors shadow-xs"
              >
                <span className="text-xs text-[#1C1917] block font-semibold">Kitchen KDS</span>
                <span className="text-[10px] text-[#78716C]">Staff screen</span>
              </button>

              <button
                onClick={() => { onClose(); onDemoBooking(); }}
                className="p-2.5 rounded-lg bg-[#FFFFFF] hover:bg-[#FAF8F3] border border-[#E8E3D8] text-left transition-colors shadow-xs"
              >
                <span className="text-xs text-[#1C1917] block font-semibold">Reservations</span>
                <span className="text-[10px] text-[#78716C]">Floor plan</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#F0EBE1] bg-[#FAF8F3] flex items-center justify-between gap-2 pb-safe">
          <button
            onClick={handleCopyPitchSummary}
            className="py-2 px-3 rounded bg-[#FFFFFF] hover:bg-[#F4F0E8] text-[#1C1917] text-xs transition-colors border border-[#E8E3D8] font-medium"
          >
            {copiedLink ? 'Copied to Clipboard' : 'Copy Proposal Summary'}
          </button>
          <button
            onClick={onClose}
            className="py-2 px-4 rounded bg-[#1C1917] hover:bg-[#2C2724] text-[#FBF9F5] text-xs font-medium transition-colors shadow-xs"
          >
            Back to Site
          </button>
        </div>
      </div>
    </div>
  );
};
