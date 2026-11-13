import React, { useState } from 'react';
import { X, Clock } from 'lucide-react';
import { LiveOrder, OrderStatus } from '../types';

interface KitchenDisplaySystemModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: LiveOrder[];
  onUpdateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
}

export const KitchenDisplaySystemModal: React.FC<KitchenDisplaySystemModalProps> = ({
  isOpen,
  onClose,
  orders,
  onUpdateOrderStatus
}) => {
  const [activeTab, setActiveTab] = useState<'kds' | 'customer'>('kds');

  if (!isOpen) return null;

  const currentOrder = orders[0] || null;

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'received':
        return <span className="text-[10px] text-[#78716C] font-mono uppercase font-medium">Queued</span>;
      case 'grinding':
        return <span className="text-[10px] text-[#8C5E3C] font-mono uppercase font-bold">Grinding</span>;
      case 'brewing':
        return <span className="text-[10px] text-[#8C5E3C] font-mono uppercase font-bold">Brewing</span>;
      case 'ready':
        return <span className="text-[10px] text-[#1C1917] font-mono uppercase font-bold bg-[#F4F0E8] px-1.5 py-0.5 rounded">Ready</span>;
      case 'completed':
        return <span className="text-[10px] text-[#A8A29E] font-mono uppercase">Completed</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs overflow-hidden font-mono">
      <div className="absolute inset-0" onClick={onClose} />

      <div 
        className="relative w-full sm:max-w-3xl bg-[#FFFFFF] border-t sm:border border-[#E8E3D8] rounded-t-xl sm:rounded-lg shadow-2xl overflow-hidden max-h-[92vh] flex flex-col z-10 text-xs"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#F0EBE1] flex items-center justify-between">
          <div>
            <span className="text-[10px] text-[#8C5E3C] uppercase tracking-wider block font-medium">
              Live Operations
            </span>
            <h2 className="text-base font-serif text-[#1C1917] font-semibold">
              Kitchen Display Screen (KDS)
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex bg-[#FAF8F3] border border-[#E8E3D8] p-0.5 rounded">
              <button
                onClick={() => setActiveTab('kds')}
                className={`px-2.5 py-1 rounded text-xs transition-colors ${
                  activeTab === 'kds'
                    ? 'bg-[#1C1917] text-[#FBF9F5] font-medium'
                    : 'text-[#78716C]'
                }`}
              >
                Staff Screen
              </button>
              <button
                onClick={() => setActiveTab('customer')}
                className={`px-2.5 py-1 rounded text-xs transition-colors ${
                  activeTab === 'customer'
                    ? 'bg-[#1C1917] text-[#FBF9F5] font-medium'
                    : 'text-[#78716C]'
                }`}
              >
                Customer Tracker
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1 rounded text-[#78716C] hover:text-[#1C1917] hover:bg-[#F4F0E8]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto no-scrollbar space-y-4 flex-1">
          {activeTab === 'kds' ? (
            <div className="space-y-3">
              <div className="flex justify-between text-xs text-[#78716C]">
                <span>Active Tickets ({orders.length})</span>
                <span className="text-[#8C5E3C]">Station: Bar 1</span>
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-12 text-[#A8A29E]">
                  No active orders in kitchen queue.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {orders.map((ord) => (
                    <div
                      key={ord.orderId}
                      className="p-4 rounded-lg bg-[#FAF8F3] border border-[#E8E3D8] flex flex-col justify-between space-y-3 shadow-xs"
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-[#E8E3D8]">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-[#1C1917]">
                              #{ord.orderNumber}
                            </span>
                            <span className="text-xs text-[#78716C]">
                              ({ord.customerName})
                            </span>
                          </div>
                          <span className="text-[10px] text-[#A8A29E] block">
                            {ord.orderType === 'dine-in' ? `Table ${ord.tableNumber || '04'}` : 'Counter Pickup'}
                          </span>
                        </div>
                        {getStatusBadge(ord.status)}
                      </div>

                      <div className="space-y-1.5 py-1">
                        {ord.items.map((it, idx) => (
                          <div key={idx} className="p-2 rounded bg-[#FFFFFF] border border-[#E8E3D8] text-xs">
                            <div className="flex justify-between text-[#1C1917]">
                              <span>{it.quantity}x {it.menuItem.name}</span>
                              <span className="text-[#78716C]">₹{it.itemTotalPrice}</span>
                            </div>
                            {it.customization && (
                              <div className="mt-0.5 text-[10px] text-[#78716C]">
                                <span>{it.customization.milk} · {it.customization.temperature}</span>
                                {it.customization.extraShot && <span> · Extra Shot</span>}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 border-t border-[#E8E3D8] flex items-center justify-between">
                        <span className="text-[10px] text-[#A8A29E] flex items-center gap-1">
                          <Clock className="w-3 h-3" /> 2m ago
                        </span>

                        <div className="flex gap-1.5">
                          {ord.status === 'received' && (
                            <button
                              onClick={() => onUpdateOrderStatus(ord.orderId, 'brewing')}
                              className="px-2.5 py-1 rounded bg-[#1C1917] hover:bg-[#2C2724] text-[#FBF9F5] text-xs transition-colors font-medium"
                            >
                              Start Brewing
                            </button>
                          )}
                          {ord.status === 'brewing' && (
                            <button
                              onClick={() => onUpdateOrderStatus(ord.orderId, 'ready')}
                              className="px-2.5 py-1 rounded bg-[#8C5E3C] hover:bg-[#784F31] text-[#FBF9F5] text-xs font-medium transition-colors"
                            >
                              Mark Ready
                            </button>
                          )}
                          {ord.status === 'ready' && (
                            <button
                              onClick={() => onUpdateOrderStatus(ord.orderId, 'completed')}
                              className="px-2.5 py-1 rounded bg-[#E8E3D8] text-[#1C1917] hover:bg-[#DDD7CC] text-xs transition-colors"
                            >
                              Served
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="max-w-md mx-auto space-y-4 py-2">
              {currentOrder ? (
                <div className="p-5 rounded-lg bg-[#FAF8F3] border border-[#E8E3D8] space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E8E3D8]">
                    <div>
                      <span className="text-[10px] text-[#8C5E3C] uppercase block font-medium">
                        Order #{currentOrder.orderNumber}
                      </span>
                      <h4 className="text-sm font-serif text-[#1C1917] font-semibold">
                        Estimated Ready in ~3 Mins
                      </h4>
                    </div>
                    {getStatusBadge(currentOrder.status)}
                  </div>

                  <div className="space-y-3">
                    {[
                      { step: 'received', title: 'Order Received', desc: 'Ticket printed at barista counter' },
                      { step: 'grinding', title: 'Grinding & Dosing', desc: 'Single-origin espresso extraction' },
                      { step: 'brewing', title: 'Extracting & Steaming', desc: 'Silky microfoam poured at 65°C' },
                      { step: 'ready', title: 'Ready for Collection', desc: currentOrder.orderType === 'dine-in' ? `Dispatched to Table ${currentOrder.tableNumber || '04'}` : 'Ready at counter' }
                    ].map((s, idx) => {
                      const orderStatusSequence: OrderStatus[] = ['received', 'grinding', 'brewing', 'ready', 'completed'];
                      const currentIdx = orderStatusSequence.indexOf(currentOrder.status);
                      const stepIdx = orderStatusSequence.indexOf(s.step as OrderStatus);
                      const isComplete = currentIdx >= stepIdx;
                      const isCurrent = currentIdx === stepIdx;

                      return (
                        <div key={idx} className="flex items-start gap-2.5">
                          <div
                            className={`w-5 h-5 rounded flex items-center justify-center shrink-0 text-[10px] ${
                              isComplete
                                ? 'bg-[#1C1917] text-[#FBF9F5] font-bold'
                                : 'bg-[#E8E3D8] text-[#78716C]'
                            }`}
                          >
                            {isComplete ? '✓' : idx + 1}
                          </div>
                          <div>
                            <div className={`text-xs ${isCurrent ? 'text-[#8C5E3C] font-semibold' : isComplete ? 'text-[#1C1917] font-medium' : 'text-[#78716C]'}`}>
                              {s.title}
                            </div>
                            <div className="text-[11px] text-[#78716C]">{s.desc}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-[#A8A29E]">
                  No active orders right now.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-[#F0EBE1] bg-[#FAF8F3] text-center text-[10px] text-[#78716C] pb-safe">
          Runs on any browser or tablet with zero POS hardware leases.
        </div>
      </div>
    </div>
  );
};
