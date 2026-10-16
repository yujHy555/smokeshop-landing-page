export const PRODUCTS = [
  // COFFEE & DRINKS
  {
    id: 'espresso-shot',
    title: 'ESPRESSO SHOT',
    shortTitle: 'Espresso Shot',
    type: 'drink',
    category: 'Hot Sips',
    price: 3.00,
    formattedPrice: '$3.00',
    description: 'Bold, intense, and full-bodied! A concentrated shot of our signature espresso, expertly brewed with a thick, velvety golden crema on top. The ultimate quick pick-me-up!',
    details: 'Single or Double shot | Served hot',
    tagline: 'Made with love ♥',
    image: '/images/espresso-shot.jpg',
    calories: '5 kcal',
    roast: 'Dark Italian Roast',
    accentColor: '#6B3C1B',
    badge: 'Classic Wakeup ⚡'
  },
  {
    id: 'coffee-freeza',
    title: 'COFFEE FREEZA',
    shortTitle: 'Coffee Freeza',
    type: 'drink',
    category: 'Frosty Blends',
    price: 5.50,
    formattedPrice: '$5.50',
    description: 'A frosty, blended delight! Rich espresso and milk blended with ice to icy perfection, topped with a mountain of whipped cream and a sweet chocolate drizzle.',
    details: '16 oz | Served frozen',
    tagline: 'Made with love ♥',
    image: '/images/coffee-freeza.jpg',
    calories: '380 kcal',
    roast: 'Sweet Mocha Blend',
    accentColor: '#8A5230',
    badge: 'Customer Favorite ❄️'
  },
  {
    id: 'cappuccino',
    title: 'CAPPUCCINO',
    shortTitle: 'Cappuccino',
    type: 'drink',
    category: 'Hot Sips',
    price: 4.50,
    formattedPrice: '$4.50',
    description: 'A warm hug in a cup. Rich, velvety espresso balanced with perfectly steamed milk, topped with a thick, fluffy layer of foam & a dusting of chocolate love.',
    details: '12 oz | Served hot',
    tagline: 'Made with love ♥',
    image: '/images/cappuccino.jpg',
    calories: '140 kcal',
    roast: 'Smooth Medium Roast',
    accentColor: '#4A2E1B',
    badge: 'Artisan Latte Art ☕'
  },
  {
    id: 'pumpkin-spice-latte',
    title: 'PUMPKIN SPICE LATTE',
    shortTitle: 'Pumpkin Spice Latte',
    type: 'drink',
    category: 'Seasonal',
    price: 5.75,
    formattedPrice: '$5.75',
    description: 'A cozy autumn favorite! Rich espresso and steamed milk blended with real pumpkin, cinnamon, nutmeg, and clove, topped with a mountain of whipped cream and a warm spice dusting.',
    details: '16 oz | Served hot or iced',
    tagline: 'Made with love ♥',
    image: '/images/pumpkin-spice-latte.jpg',
    calories: '310 kcal',
    roast: 'Spiced Velvet Blend',
    accentColor: '#D96B27',
    badge: 'Seasonal Hit 🍁'
  },

  // BAKERY & FOOD ITEMS
  {
    id: 'chocolate-doughnut',
    title: 'THE CHOCOLATE DEAL',
    shortTitle: 'Double Chocolate Doughnut',
    type: 'food',
    category: 'Fresh Bakery',
    price: 4.50,
    formattedPrice: '$4.50',
    description: 'Indulge in this decadent, double chocolate dream! A rich, fluffy chocolate doughnut topped with a luscious chocolate glaze, a generous cascade of dark chocolate crumbs, chocolate heart-shaped sprinkles, and a hand-crafted chocolate heart. Deeply rich, chocolatey, and Oh-So-Satisfying!',
    details: 'Chocolate lover\'s dream! | Freshly baked',
    tagline: 'Made with love ♥',
    image: '/images/chocolate-doughnut.jpg',
    calories: '340 kcal',
    roast: 'Artisan Oven Bake',
    accentColor: '#3A1D0B',
    badge: 'Special Menu 🍫'
  },
  {
    id: 'red-velvet-doughnut',
    title: 'RED VELVET DOUGHNUT',
    shortTitle: 'Red Velvet Doughnut',
    type: 'food',
    category: 'Fresh Bakery',
    price: 4.75,
    formattedPrice: '$4.75',
    description: 'Fall in love with this decadent, velvety treat! A rich, fluffy red velvet doughnut topped with a luscious cream cheese glaze, a romantic cascade of deep-red cake crumbs, sweet heart-shaped sprinkles, and a chocolate heart. Deeply rich, passionate, and Oh-So-Dreamy!',
    details: 'Love at first bite | Freshly baked',
    tagline: 'Made with love ♥',
    image: '/images/red-velvet-doughnut.jpg',
    calories: '360 kcal',
    roast: 'Velvet Cream Bake',
    accentColor: '#8B3A2B',
    badge: 'Romantic Menu ❤️'
  },
  {
    id: 'birthday-doughnut',
    title: 'BIRTHDAY DOUGHNUT',
    shortTitle: 'Birthday Doughnut',
    type: 'food',
    category: 'Fresh Bakery',
    price: 4.50,
    formattedPrice: '$4.50',
    description: 'Celebrate any day with this festive treat! A fluffy, fresh-glazed doughnut topped with a colorful cascade of rainbow sprinkles, rich vanilla buttercream, and a tiny Birthday candle. Sweet, nostalgic, and Oh-So-Delicious!',
    details: 'Sprinkles galore | Freshly baked',
    tagline: 'Made with love ♥',
    image: '/images/birthday-doughnut.jpg',
    calories: '330 kcal',
    roast: 'Sweet Vanilla Glaze',
    accentColor: '#E29D38',
    badge: 'Celebration Treat 🎂'
  }
];

export const CATEGORIES = [
  { id: 'All', label: 'All Sips & Bites' },
  { id: 'Hot Sips', label: '☕ Hot Espresso' },
  { id: 'Frosty Blends', label: '❄️ Frosty Freezas' },
  { id: 'Fresh Bakery', label: '🍩 Artisan Doughnuts' },
  { id: 'Seasonal', label: '🍁 Autumn Specials' }
];

export const PROMOTIONS = [
  {
    id: 'game-challenge',
    title: 'Play The Coffee Game & Win 20% Off',
    subtitle: 'Interactive High-Score Promo',
    description: 'Jump into our official retro arcade coffee game! Score 1,000+ points and show your score to your barista to get 20% off your entire drink and doughnut order.',
    code: 'CHILLHUB20',
    discount: '20% OFF',
    url: 'https://coffee-zeta-weld.vercel.app/',
    type: 'game',
    badge: 'Featured Game',
    tag: 'Web & Mobile Friendly'
  },
  {
    id: 'thursday-nights',
    title: 'Coffee & Board Game Nights',
    subtitle: 'Every Thursday 5 PM – 9 PM',
    description: 'Free espresso shot upgrade with any fresh bakery doughnut (Chocolate, Red Velvet, or Birthday!). Bring your friends and enjoy board games.',
    code: 'GAMENIGHT',
    discount: 'FREE SHOT',
    type: 'community',
    badge: 'In-Store Event',
    tag: 'Community Perk'
  },
  {
    id: 'early-bird',
    title: 'Early Bird Sparks',
    subtitle: 'Weekdays 7:00 AM – 9:00 AM',
    description: 'Start your morning strong! Grab our signature single or double espresso shot for just $2.00 flat with any fresh morning treat.',
    code: 'EARLYBIRD',
    discount: '$2 SHOTS',
    type: 'daily',
    badge: 'Morning Special',
    tag: 'Daily Routine'
  }
];
