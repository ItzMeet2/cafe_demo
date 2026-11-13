import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

interface AtTableQRModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderForTable: () => void;
}

export const AtTableQRModal: React.FC<AtTableQRModalProps> = ({
  isOpen,
  onClose,
  onOrderForTable
}) => {
  const [activeNotification, setActiveNotification] = useState<string | null>(null);

  if (!isOpen) return null;

  const triggerStaffCall = (actionText: string) => {
    setActiveNotification(`Staff notified: ${actionText}`);
    setTimeout(() => {
      setActiveNotification(null);
    }, 3500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs overflow-hidden font-mono">
      <div className="absolute inset-0" onClick={onClose} />

      <div 
        className="relative w-full sm:max-w-md bg-[#FFFFFF] border-t sm:border border-[#E8E3D8] rounded-t-xl sm:rounded-lg shadow-2xl p-5 sm:p-6 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#F0EBE1]">
          <div>
            <span className="text-[10px] text-[#8C5E3C] uppercase tracking-wider block font-medium">
              Table QR Scanned
            </span>
            <h3 className="text-base font-serif text-[#1C1917] font-semibold">
              Table 04 — Patio Seating
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-[#78716C] hover:text-[#1C1917] hover:bg-[#F4F0E8] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Notification feedback */}
        {activeNotification && (
          <div className="mt-3 p-2.5 rounded bg-[#FAF8F3] border border-[#E8E3D8] text-[#8C5E3C] text-xs flex items-center gap-2">
            <Check className="w-3.5 h-3.5" />
            <span>{activeNotification}</span>
          </div>
        )}

        {/* Service buttons */}
        <div className="py-5 space-y-4 text-xs">
          <span className="text-[10px] text-[#A8A29E] uppercase tracking-wider block font-medium">
            Immediate Assistance
          </span>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => triggerStaffCall('Still water requested at Table 04')}
              className="p-3 rounded bg-[#FAF8F3] hover:bg-[#F4F0E8] border border-[#E8E3D8] text-left transition-colors"
            >
              <div className="text-xs text-[#1C1917] font-medium">Water</div>
              <div className="text-[10px] text-[#78716C] mt-0.5">Complimentary</div>
            </button>

            <button
              onClick={() => triggerStaffCall('Staff assistance requested at Table 04')}
              className="p-3 rounded bg-[#FAF8F3] hover:bg-[#F4F0E8] border border-[#E8E3D8] text-left transition-colors"
            >
              <div className="text-xs text-[#1C1917] font-medium">Call Staff</div>
              <div className="text-[10px] text-[#78716C] mt-0.5">At-table support</div>
            </button>

            <button
              onClick={() => triggerStaffCall('Bill requested at Table 04')}
              className="p-3 rounded bg-[#FAF8F3] hover:bg-[#F4F0E8] border border-[#E8E3D8] text-left transition-colors"
            >
              <div className="text-xs text-[#1C1917] font-medium">Request Bill</div>
              <div className="text-[10px] text-[#78716C] mt-0.5">Card or Cash</div>
            </button>

            <button
              onClick={() => triggerStaffCall('Napkins requested at Table 04')}
              className="p-3 rounded bg-[#FAF8F3] hover:bg-[#F4F0E8] border border-[#E8E3D8] text-left transition-colors"
            >
              <div className="text-xs text-[#1C1917] font-medium">Napkins</div>
              <div className="text-[10px] text-[#78716C] mt-0.5">Service item</div>
            </button>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                onClose();
                onOrderForTable();
              }}
              className="w-full py-2.5 px-4 rounded bg-[#1C1917] hover:bg-[#2C2724] text-[#FBF9F5] font-medium text-xs transition-colors shadow-xs"
            >
              Order Directly to Table
            </button>
          </div>
        </div>

        <div className="pt-3 border-t border-[#F0EBE1] text-center pb-safe">
          <p className="text-[11px] text-[#A8A29E]">
            Contactless ordering frees up floor staff and eliminates wait times.
          </p>
        </div>
      </div>
    </div>
  );
};
