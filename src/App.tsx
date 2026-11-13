import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { TableReservationSection } from './components/TableReservationSection';
import { LoyaltyPassportSection } from './components/LoyaltyPassportSection';
import { ReviewsAndStorySection } from './components/ReviewsAndStorySection';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';

import { PitchModeModal } from './components/PitchModeModal';
import { ItemCustomizerModal } from './components/ItemCustomizerModal';
import { AtTableQRModal } from './components/AtTableQRModal';
import { KitchenDisplaySystemModal } from './components/KitchenDisplaySystemModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';

import { MenuItem, CartItem, LiveOrder, OrderStatus, TableBooking } from './types';
import { MENU_ITEMS } from './data/cafeData';

export function App() {
  // Cart State (in INR ₹)
  const [cart, setCart] = useState<CartItem[]>([
    {
      cartId: 'c-1',
      menuItem: MENU_ITEMS[0], // Cortado
      quantity: 1,
      customization: {
        milk: 'Oat Milk',
        roast: 'House Signature Espresso',
        sweetness: '0% Unsweetened',
        temperature: 'Hot (150°F)',
        extraShot: false,
        flavorSyrup: 'None',
        specialNotes: 'Silky microfoam'
      },
      itemTotalPrice: 260
    },
    {
      cartId: 'c-2',
      menuItem: MENU_ITEMS[5], // Almond Croissant
      quantity: 1,
      itemTotalPrice: 240
    }
  ]);

  // Live Orders for Kitchen Display
  const [orders, setOrders] = useState<LiveOrder[]>([
    {
      orderId: 'ord-101',
      orderNumber: '8841',
      customerName: 'Marcus C.',
      items: [
        {
          cartId: 'c1',
          menuItem: MENU_ITEMS[1], // Cold Brew
          quantity: 2,
          customization: {
            milk: 'No Milk',
            roast: 'House Signature Espresso',
            sweetness: '0% Unsweetened',
            temperature: 'Iced',
            extraShot: false,
            flavorSyrup: 'None'
          },
          itemTotalPrice: 520
        }
      ],
      subtotal: 520,
      tip: 40,
      discount: 0,
      total: 586,
      orderType: 'dine-in',
      tableNumber: '04',
      status: 'brewing',
      createdAt: new Date(Date.now() - 3 * 60 * 1000),
      estimatedMinutes: 2,
      paymentMethod: 'UPI (GPay)'
    }
  ]);

  // Modal Visibility
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isPitchModeOpen, setIsPitchModeOpen] = useState(false);
  const [isTableSimOpen, setIsTableSimOpen] = useState(false);
  const [isKDSOpen, setIsKDSOpen] = useState(false);
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);

  // Dining
  const [orderType, setOrderType] = useState<'dine-in' | 'takeaway' | 'curbside'>('dine-in');
  const [tableNumber, setTableNumber] = useState('04');
  const [promoCode, setPromoCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleAddToCart = (newCartItem: CartItem) => {
    setCart((prev) => [...prev, newCartItem]);
    showToast(`Added ${newCartItem.menuItem.name}`);
  };

  const handleQuickAdd = (item: MenuItem) => {
    const quickCartItem: CartItem = {
      cartId: `${item.id}-${Date.now()}`,
      menuItem: item,
      quantity: 1,
      itemTotalPrice: item.price
    };
    setCart((prev) => [...prev, quickCartItem]);
    showToast(`Added ${item.name}`);
  };

  const handleUpdateQuantity = (cartId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.cartId === cartId) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            const singleUnitPrice = item.itemTotalPrice / item.quantity;
            return {
              ...item,
              quantity: newQty,
              itemTotalPrice: singleUnitPrice * newQty
            };
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (cartId: string) => {
    setCart((prev) => prev.filter((i) => i.cartId !== cartId));
  };

  const handleApplyPromoCode = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === 'CAFE20' || clean === 'FIRSTCUP') {
      const sub = cart.reduce((acc, i) => acc + i.itemTotalPrice, 0);
      setDiscountAmount(sub * 0.2);
      setPromoCode(clean);
      return true;
    }
    return false;
  };

  const handleCompleteOrder = (newOrder: LiveOrder) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    setDiscountAmount(0);
    setPromoCode('');
    showToast(`Order #${newOrder.orderNumber} sent to kitchen`);
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.orderId === orderId ? { ...ord, status: newStatus } : ord))
    );
  };

  const handleReservationCompleted = (booking: TableBooking) => {
    showToast(`Table booked for ${booking.guestName}`);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartPrice = Math.max(0, cart.reduce((sum, item) => sum + item.itemTotalPrice, 0) - discountAmount);

  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToLoyalty = () => {
    const el = document.getElementById('loyalty');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToBooking = () => {
    const el = document.getElementById('reservations');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#1C1917] flex flex-col font-sans selection:bg-[#8C5E3C]/15 selection:text-[#1C1917] pb-20 md:pb-0">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 right-4 left-4 sm:left-auto sm:right-6 z-50 px-3.5 py-2.5 rounded bg-[#1C1917] text-[#FBF9F5] shadow-xl text-xs font-mono">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Navigation (Clean: No Kitchen Screen, No Pitch Mode, No Table 7) */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenBooking={scrollToBooking}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        <Hero
          onOpenBooking={scrollToBooking}
        />

        <MenuSection
          onSelectItem={(item) => setCustomizingItem(item)}
          onQuickAdd={handleQuickAdd}
        />

        <TableReservationSection
          onReservationComplete={handleReservationCompleted}
        />

        <LoyaltyPassportSection />

        <ReviewsAndStorySection />
      </main>

      {/* Footer (Holds RootCrypt Agency Pitch Demo & WhatsApp) */}
      <Footer
        onOpenPitch={() => setIsPitchModeOpen(true)}
        onOpenBooking={scrollToBooking}
      />

      {/* Clean Mobile Bottom Bar */}
      <MobileBottomNav
        cartCount={totalCartCount}
        cartTotal={totalCartPrice}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenLoyalty={scrollToLoyalty}
        onOpenBooking={scrollToBooking}
        onScrollToMenu={scrollToMenu}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        orderType={orderType}
        onChangeOrderType={setOrderType}
        tableNumber={tableNumber}
        onChangeTableNumber={setTableNumber}
        promoCode={promoCode}
        onApplyPromoCode={handleApplyPromoCode}
        discountAmount={discountAmount}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        subtotal={cart.reduce((sum, item) => sum + item.itemTotalPrice, 0)}
        discount={discountAmount}
        orderType={orderType}
        tableNumber={tableNumber}
        onCompleteOrder={handleCompleteOrder}
        onOpenKDS={() => setIsKDSOpen(true)}
      />

      {/* Item Customizer Modal */}
      <ItemCustomizerModal
        item={customizingItem}
        isOpen={!!customizingItem}
        onClose={() => setCustomizingItem(null)}
        onAddToCart={handleAddToCart}
      />

      {/* At-Table QR Code Simulator Modal */}
      <AtTableQRModal
        isOpen={isTableSimOpen}
        onClose={() => setIsTableSimOpen(false)}
        onOrderForTable={() => {
          setOrderType('dine-in');
          setTableNumber('04');
          scrollToMenu();
        }}
      />

      {/* Kitchen Display Screen (KDS) */}
      <KitchenDisplaySystemModal
        isOpen={isKDSOpen}
        onClose={() => setIsKDSOpen(false)}
        orders={orders}
        onUpdateOrderStatus={handleUpdateOrderStatus}
      />

      {/* Cafe Owner Pitch Mode (Accessible via Footer) */}
      <PitchModeModal
        isOpen={isPitchModeOpen}
        onClose={() => setIsPitchModeOpen(false)}
        onDemoTableQR={() => setIsTableSimOpen(true)}
        onDemoKDS={() => setIsKDSOpen(true)}
        onDemoBooking={scrollToBooking}
      />
    </div>
  );
}

export default App;
