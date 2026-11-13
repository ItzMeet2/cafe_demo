import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { CartItem, LiveOrder } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  discount: number;
  orderType: 'dine-in' | 'takeaway' | 'curbside';
  tableNumber: string;
  onCompleteOrder: (order: LiveOrder) => void;
  onOpenKDS: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  subtotal,
  discount,
  orderType,
  tableNumber,
  onCompleteOrder,
  onOpenKDS
}) => {
  const [customerName, setCustomerName] = useState('Rahul M.');
  const [customerPhone, setCustomerPhone] = useState('+91 98765 43210');
  const [tipAmount, setTipAmount] = useState<number>(30);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'counter'>('upi');
  const [orderCompleted, setOrderCompleted] = useState<LiveOrder | null>(null);

  if (!isOpen) return null;

  const gst = Math.round(subtotal * 0.05);
  const finalTotal = Math.max(0, subtotal - discount + gst + tipAmount);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    const newOrder: LiveOrder = {
      orderId: `ord-${Date.now()}`,
      orderNumber: `${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: customerName || 'Guest',
      customerPhone,
      items: [...items],
      subtotal,
      tip: tipAmount,
      discount,
      total: finalTotal,
      orderType,
      tableNumber: orderType === 'dine-in' ? (tableNumber || '04') : undefined,
      status: 'received',
      createdAt: new Date(),
      estimatedMinutes: 3,
      paymentMethod: paymentMethod === 'upi' ? 'UPI (GPay / PhonePe)' : paymentMethod === 'card' ? 'Debit/Credit Card' : 'Cash at Counter'
    };

    setOrderCompleted(newOrder);
    onCompleteOrder(newOrder);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs overflow-hidden">
      <div className="absolute inset-0" onClick={onClose} />

      <div 
        className="relative w-full sm:max-w-md bg-[#FFFFFF] border-t sm:border border-[#E8E3D8] rounded-t-xl sm:rounded-lg shadow-2xl overflow-hidden max-h-[92vh] flex flex-col z-10 font-mono text-xs"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#F0EBE1] flex items-center justify-between">
          <span className="text-xs uppercase tracking-wider text-[#1C1917] font-medium">
            {orderCompleted ? 'Order Placed' : 'Checkout'}
          </span>
          <button
            onClick={onClose}
            className="p-1 rounded text-[#78716C] hover:text-[#1C1917] hover:bg-[#F4F0E8]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto no-scrollbar space-y-4">
          {orderCompleted ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#8C5E3C]">
                <Check className="w-4 h-4" />
                <span className="font-medium">Ticket #{orderCompleted.orderNumber} Sent to Barista</span>
              </div>

              <div className="p-4 rounded-lg bg-[#FAF8F3] border border-[#E8E3D8] space-y-2 text-[#78716C] text-[11px]">
                <div className="flex justify-between border-b border-[#E8E3D8] pb-2 text-[#1C1917]">
                  <span className="font-serif font-semibold">CAFÉ DIGITAL RECEIPT</span>
                  <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>

                <div className="space-y-1 py-1">
                  {orderCompleted.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between text-[#1C1917]">
                      <span>{it.quantity}x {it.menuItem.name}</span>
                      <span>₹{it.itemTotalPrice}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-[#E8E3D8] space-y-1">
                  <div className="flex justify-between">
                    <span>Destination:</span>
                    <span className="text-[#1C1917]">
                      {orderCompleted.orderType === 'dine-in' ? `Table ${orderCompleted.tableNumber}` : 'Counter Pickup'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment:</span>
                    <span className="text-[#1C1917]">{orderCompleted.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between font-medium text-[#1C1917] text-xs pt-1 border-t border-[#E8E3D8]">
                    <span>Total Paid:</span>
                    <span>₹{orderCompleted.total}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-1 pb-safe">
                <button
                  onClick={() => {
                    onClose();
                    onOpenKDS();
                  }}
                  className="w-full py-2.5 rounded bg-[#1C1917] hover:bg-[#2C2724] text-[#FBF9F5] font-medium transition-colors"
                >
                  View Barista Screen Status
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handlePlaceOrder} className="space-y-4 pb-safe">
              {/* Contact */}
              <div className="space-y-1.5">
                <span className="text-[10px] text-[#A8A29E] uppercase tracking-wider block font-medium">
                  Contact Details
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full py-1.5 px-2.5 rounded bg-[#FAF8F3] border border-[#E8E3D8] text-[#1C1917] focus:outline-none focus:border-[#8C5E3C]"
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full py-1.5 px-2.5 rounded bg-[#FAF8F3] border border-[#E8E3D8] text-[#1C1917] focus:outline-none focus:border-[#8C5E3C]"
                  />
                </div>
              </div>

              {/* Tip in INR */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] text-[#A8A29E] uppercase tracking-wider">
                  <span>Barista Gratuity</span>
                  <span>₹{tipAmount}</span>
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {[0, 20, 30, 50].map((amt) => (
                    <button
                      type="button"
                      key={amt}
                      onClick={() => setTipAmount(amt)}
                      className={`py-1.5 rounded border text-xs transition-colors ${
                        tipAmount === amt
                          ? 'border-[#1C1917] bg-[#1C1917] text-[#FBF9F5]'
                          : 'border-[#E8E3D8] text-[#78716C] bg-[#FAF8F3]'
                      }`}
                    >
                      {amt === 0 ? 'None' : `₹${amt}`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-1.5">
                <span className="text-[10px] text-[#A8A29E] uppercase tracking-wider block font-medium">
                  Payment Mode
                </span>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`py-1.5 px-2 rounded border text-xs transition-colors ${
                      paymentMethod === 'upi'
                        ? 'border-[#1C1917] bg-[#1C1917] text-[#FBF9F5]'
                        : 'border-[#E8E3D8] text-[#78716C] bg-[#FAF8F3]'
                    }`}
                  >
                    UPI / GPay
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`py-1.5 px-2 rounded border text-xs transition-colors ${
                      paymentMethod === 'card'
                        ? 'border-[#1C1917] bg-[#1C1917] text-[#FBF9F5]'
                        : 'border-[#E8E3D8] text-[#78716C] bg-[#FAF8F3]'
                    }`}
                  >
                    Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('counter')}
                    className={`py-1.5 px-2 rounded border text-xs transition-colors ${
                      paymentMethod === 'counter'
                        ? 'border-[#1C1917] bg-[#1C1917] text-[#FBF9F5]'
                        : 'border-[#E8E3D8] text-[#78716C] bg-[#FAF8F3]'
                    }`}
                  >
                    At Counter
                  </button>
                </div>
              </div>

              {/* Pay Button */}
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded bg-[#1C1917] hover:bg-[#2C2724] text-[#FBF9F5] font-medium text-xs transition-colors flex items-center justify-between shadow-xs"
              >
                <span>Authorize Order</span>
                <span>₹{finalTotal}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
