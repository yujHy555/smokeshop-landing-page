export const PRODUCTS = [
  {
    id: 'espresso-shot',
    title: 'ESPRESSO SHOT',
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
    bgColor: '#FFFDF9',
    badge: 'Classic Wakeup'
  },
  {
    id: 'coffee-freeza',
    title: 'COFFEE FREEZA',
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
    bgColor: '#FFFDF9',
    badge: 'Customer Favorite'
  },
  {
    id: 'cappuccino',
    title: 'CAPPUCCINO',
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
    bgColor: '#FFFDF9',
    badge: 'Artisan Latte Art'
  },
  {
    id: 'pumpkin-spice-latte',
    title: 'PUMPKIN SPICE LATTE',
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
    bgColor: '#FFFDF9',
    badge: 'Seasonal Hit 🍁'
  }
];

export const PROMOTIONS = [
  {
    id: 'game-challenge',
    title: 'Play The Coffee Game & Win 20% Off',
    subtitle: 'Interactive High-Score Promo',
    description: 'Jump into our official retro arcade coffee game! Score 1,000+ points and show your score to your barista to get 20% off your entire drink order.',
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
    description: 'Free espresso shot upgrade with any fresh bakery item. Bring your friends, pick a board game from our library, and enjoy the chill vibes.',
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
    description: 'Start your morning strong! Grab our signature single or double espresso shot for just $2.00 flat.',
    code: 'EARLYBIRD',
    discount: '$2 SHOTS',
    type: 'daily',
    badge: 'Morning Special',
    tag: 'Daily Routine'
  }
];
