export type Category = 
  | 'all' 
  | 'espresso' 
  | 'cold-brew' 
  | 'tea-matcha' 
  | 'bakery' 
  | 'brunch' 
  | 'coffee-beans';

export interface MenuItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  category: Category;
  tags: string[];
  image: string;
  rating: number;
  prepTime: string;
  calories?: number;
  origin?: string;
  elevation?: string;
  roastProfile?: string;
  tastingNotes?: string[];
  isPopular?: boolean;
  isNew?: boolean;
}

export interface CustomizationOptions {
  milk: 'Whole Milk' | 'Oat Milk' | 'Almond Milk' | 'Coconut Milk' | 'No Milk';
  roast: 'House Signature Espresso' | 'Ethiopian Yirgacheffe Light' | 'Sumatra Dark Roast';
  sweetness: '0% Unsweetened' | '25% Subtle' | '50% Balanced' | '100% Sweet';
  temperature: 'Hot (150°F)' | 'Iced' | 'Extra Cold Foam';
  extraShot: boolean;
  flavorSyrup: 'None' | 'Tahitian Vanilla' | 'Salted Caramel' | 'Lavender Honey' | 'Hazelnut Praline';
  specialNotes?: string;
}

export interface CartItem {
  cartId: string;
  menuItem: MenuItem;
  quantity: number;
  customization?: CustomizationOptions;
  itemTotalPrice: number;
}

export interface TableBooking {
  id: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  date: string;
  timeSlot: string;
  guestsCount: number;
  seatingArea: 'Sunlit Garden Patio' | 'Velvet Corner Lounge' | 'Barista Tasting Counter' | 'Quiet Study Pod' | 'Private Meeting Nook';
  specialRequest?: string;
  status: 'confirmed' | 'seated' | 'completed';
  createdAt: string;
}

export type OrderStatus = 'received' | 'grinding' | 'brewing' | 'ready' | 'completed';

export interface LiveOrder {
  orderId: string;
  orderNumber: string;
  customerName: string;
  customerPhone?: string;
  items: CartItem[];
  subtotal: number;
  tip: number;
  discount: number;
  total: number;
  orderType: 'dine-in' | 'takeaway' | 'curbside';
  tableNumber?: string;
  status: OrderStatus;
  createdAt: Date;
  estimatedMinutes: number;
  paymentMethod: string;
}

export interface BeanSubscription {
  origin: string;
  grind: string;
  bagSize: string;
  frequency: string;
  pricePerBag: number;
}

export interface CafeReview {
  id: string;
  name: string;
  role: string;
  comment: string;
  date: string;
  rating: number;
  category: 'all' | 'coffee' | 'space' | 'food' | 'service';
  favoriteItem?: string;
  verified?: boolean;
}

