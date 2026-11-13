import { MenuItem, CafeReview } from '../types';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'cortado',
    name: 'Cortado',
    tagline: 'Equal parts double ristretto and textured milk',
    description: 'Double ristretto with silky steamed whole milk. Notes of roasted hazelnut, cocoa, and subtle caramel sweetness.',
    price: 220,
    category: 'espresso',
    tags: ['Single Origin'],
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    prepTime: '3 min',
    origin: 'Chikmagalur, Karnataka',
    roastProfile: 'Medium-Light Roast',
    tastingNotes: ['Hazelnut', 'Dark Cacao', 'Jaggery']
  },
  {
    id: 'cold-brew',
    name: 'Cold Brew',
    tagline: '18-hour slow cold extraction',
    description: 'Slow-steeped Arabica micro-lot. Exceptionally smooth with dark chocolate finish and natural sweetness over ice.',
    price: 260,
    category: 'cold-brew',
    tags: ['Iced'],
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    prepTime: '2 min',
    origin: 'Attikan Estate, Biligirirangana Hills',
    roastProfile: 'Medium Roast',
    tastingNotes: ['Dark Chocolate', 'Toasted Walnut', 'Ripe Plum']
  },
  {
    id: 'flat-white',
    name: 'Flat White',
    tagline: 'Double shot with velvety microfoam',
    description: 'Rich double espresso with finely textured microfoam. Creamy, balanced, and comforting.',
    price: 240,
    category: 'espresso',
    tags: ['Classic'],
    image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    prepTime: '3 min',
    origin: 'Shevaroys, Tamil Nadu',
    roastProfile: 'Medium Roast',
    tastingNotes: ['Caramel', 'Milk Chocolate', 'Cardamom']
  },
  {
    id: 'pour-over',
    name: 'Manual Pour Over',
    tagline: 'Single-cup V60 precision filter extraction',
    description: 'Single-origin washed lot brewed manually at 92°C. High clarity of cup with floral aromas and crisp stone fruit finish.',
    price: 320,
    category: 'espresso',
    tags: ['Single Origin'],
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    prepTime: '5 min',
    origin: 'Kerehaklu Estate, Aldur',
    roastProfile: 'Light Roast',
    tastingNotes: ['Orange Blossom', 'Dried Fig', 'Wild Honey']
  },
  {
    id: 'matcha-latte',
    name: 'Ceremonial Matcha',
    tagline: 'First-harvest Kyoto green tea with oat milk',
    description: 'Stone-ground ceremonial green tea whisked with warm oat milk. Smooth, creamy, and grounding.',
    price: 280,
    category: 'tea-matcha',
    tags: ['Dairy-Free'],
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    prepTime: '3 min',
    origin: 'Uji, Kyoto',
    roastProfile: 'First Harvest',
    tastingNotes: ['Sweet Umami', 'Fresh Green', 'Oat Cream']
  },
  {
    id: 'croissant',
    name: 'Almond Croissant',
    tagline: 'Twice-baked butter pastry with almond frangipane',
    description: 'Flaky laminated butter pastry filled with rich almond cream, dusted with roasted sliced almonds.',
    price: 240,
    category: 'bakery',
    tags: ['Baked Fresh Daily'],
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    prepTime: '1 min',
    tastingNotes: ['Butter', 'Toasted Almond', 'Vanilla Bean']
  },
  {
    id: 'sourdough-tartine',
    name: 'Avocado Tartine',
    tagline: 'Toasted country sourdough with farm poached egg',
    description: 'Thick sourdough toast, crushed Hass avocado, extra virgin olive oil, sea salt crystals, and free-range soft egg.',
    price: 380,
    category: 'brunch',
    tags: ['Kitchen'],
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    prepTime: '7 min',
    tastingNotes: ['Sourdough', 'Sea Salt', 'Pressed Olive']
  },
  {
    id: 'house-beans',
    name: 'Whole Beans (250g)',
    tagline: 'Specialty Arabica roasted weekly in-house',
    description: 'Direct-trade washed Arabica beans. Balanced acidity and heavy cocoa body, packaged with one-way aroma valve.',
    price: 650,
    category: 'coffee-beans',
    tags: ['Whole Bean'],
    image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    prepTime: 'In Stock',
    origin: 'Chikmagalur, 1,350m',
    roastProfile: 'Medium Roast',
    tastingNotes: ['Dark Chocolate', 'Roasted Almond', 'Brown Sugar']
  }
];

export const CAFE_ZONES = [
  {
    id: 'patio',
    name: 'Garden Patio',
    description: 'Outdoor courtyard shaded by greenery. Calm ambient natural light.',
    capacity: '16 seats'
  },
  {
    id: 'main',
    name: 'Main Room',
    description: 'Solid wood communal tables and quiet banquette seating.',
    capacity: '20 seats'
  },
  {
    id: 'counter',
    name: 'Espresso Bar',
    description: 'Stools facing the machine and manual filter brew bar.',
    capacity: '6 seats'
  }
];

export const CAFE_REVIEWS: CafeReview[] = [
  {
    id: 'rev-1',
    name: 'R. Sharma',
    role: 'Architect',
    comment: 'Uncluttered room, natural oak surfaces, and ordering from Table 04 without standing in line is effortless. The pour over clarity is outstanding.',
    date: 'Yesterday',
    rating: 5,
    category: 'space',
    favoriteItem: 'Single Origin Pour Over',
    verified: true
  },
  {
    id: 'rev-2',
    name: 'A. Nair',
    role: 'Product Designer',
    comment: 'The cortado has proper silky microfoam and dark cacao notes without any bitterness. Easily the most peaceful cafe to work from in town.',
    date: '3 days ago',
    rating: 5,
    category: 'coffee',
    favoriteItem: 'Cortado',
    verified: true
  },
  {
    id: 'rev-3',
    name: 'P. Mehta',
    role: 'Author & Researcher',
    comment: 'The almond croissant is flaky and warm, paired with the 18-hour cold brew tonic. Fast WiFi and quiet seating pods.',
    date: '1 week ago',
    rating: 5,
    category: 'food',
    favoriteItem: 'Almond Croissant & Cold Brew',
    verified: true
  },
  {
    id: 'rev-4',
    name: 'Dr. V. Kulkarni',
    role: 'Specialty Surgeon',
    comment: 'Clean table QR ordering with instant UPI payment. Staff brought water and the chemex within 4 minutes. Exceptionally run.',
    date: '2 weeks ago',
    rating: 5,
    category: 'service',
    favoriteItem: 'Manual Chemex',
    verified: true
  }
];
