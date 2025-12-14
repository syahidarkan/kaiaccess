// Food & Beverage Menu for KAI Bali Heritage Train

export const foodCategories = {
  APPETIZER: 'appetizer',
  MAIN_COURSE: 'main',
  DESSERT: 'dessert',
  BEVERAGE: 'beverage',
  SNACK: 'snack',
  BALI_SPECIAL: 'bali_special'
};

export const foodMenu = [
  // Bali Special Dishes
  {
    id: 'FOOD001',
    name: 'Babi Guling Set',
    nameId: 'Babi Guling Set',
    category: foodCategories.BALI_SPECIAL,
    price: 125000,
    description: {
      en: 'Traditional Balinese roasted suckling pig with aromatic spices, served with rice, lawar, and sambal matah',
      id: 'Babi guling khas Bali dengan bumbu rempah aromatik, disajikan dengan nasi, lawar, dan sambal matah'
    },
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&q=80',
    isAvailable: true,
    preparationTime: 15, // minutes
    isHalal: false,
    allergens: ['pork', 'nuts'],
    rating: 4.9,
    calories: 850,
    tags: ['signature', 'local', 'spicy']
  },
  {
    id: 'FOOD002',
    name: 'Ayam Betutu',
    nameId: 'Ayam Betutu',
    category: foodCategories.MAIN_COURSE,
    price: 95000,
    description: {
      en: 'Slow-cooked chicken with traditional Balinese spice paste, wrapped in banana leaves',
      id: 'Ayam kukus dengan bumbu base genep khas Bali, dibungkus daun pisang'
    },
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&q=80',
    isAvailable: true,
    preparationTime: 12,
    isHalal: true,
    allergens: ['nuts', 'garlic'],
    rating: 4.8,
    calories: 720,
    tags: ['signature', 'local', 'halal']
  },
  {
    id: 'FOOD003',
    name: 'Nasi Goreng Premium',
    nameId: 'Nasi Goreng Premium',
    category: foodCategories.MAIN_COURSE,
    price: 75000,
    description: {
      en: 'Premium Indonesian fried rice with shrimp, chicken satay, and fried egg',
      id: 'Nasi goreng premium dengan udang, sate ayam, dan telur mata sapi'
    },
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&q=80',
    isAvailable: true,
    preparationTime: 10,
    isHalal: true,
    allergens: ['shellfish', 'egg'],
    rating: 4.7,
    calories: 680,
    tags: ['popular', 'halal']
  },
  {
    id: 'FOOD004',
    name: 'Sate Lilit Bali',
    nameId: 'Sate Lilit Bali',
    category: foodCategories.APPETIZER,
    price: 55000,
    description: {
      en: 'Minced fish satay wrapped around lemongrass sticks with Balinese spices (6 pcs)',
      id: 'Sate ikan cincang dengan bumbu khas Bali yang dililitkan pada batang serai (6 tusuk)'
    },
    image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=600&q=80',
    isAvailable: true,
    preparationTime: 8,
    isHalal: true,
    allergens: ['fish'],
    rating: 4.6,
    calories: 320,
    tags: ['signature', 'local']
  },

  // Main Courses
  {
    id: 'FOOD005',
    name: 'Beef Rendang',
    nameId: 'Rendang Sapi',
    category: foodCategories.MAIN_COURSE,
    price: 95000,
    description: {
      en: 'Slow-cooked beef in rich coconut milk with aromatic spices, served with steamed rice',
      id: 'Daging sapi masak santan dengan rempah-rempah aromatik, disajikan dengan nasi putih'
    },
    image: 'https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=600&q=80',
    isAvailable: true,
    preparationTime: 10,
    isHalal: true,
    allergens: ['dairy'],
    rating: 4.8,
    calories: 750,
    tags: ['halal', 'popular']
  },
  {
    id: 'FOOD006',
    name: 'Grilled Salmon Teriyaki',
    nameId: 'Salmon Teriyaki Bakar',
    category: foodCategories.MAIN_COURSE,
    price: 145000,
    description: {
      en: 'Norwegian salmon fillet grilled to perfection with teriyaki glaze, served with vegetables and rice',
      id: 'Fillet salmon Norway panggang dengan saus teriyaki, disajikan dengan sayuran dan nasi'
    },
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&q=80',
    isAvailable: true,
    preparationTime: 15,
    isHalal: false,
    allergens: ['fish', 'soy'],
    rating: 4.7,
    calories: 580,
    tags: ['premium', 'healthy']
  },

  // Snacks
  {
    id: 'FOOD007',
    name: 'Spring Rolls (4 pcs)',
    nameId: 'Lumpia Goreng (4 pcs)',
    category: foodCategories.SNACK,
    price: 35000,
    description: {
      en: 'Crispy spring rolls filled with vegetables and chicken',
      id: 'Lumpia goreng renyah berisi sayuran dan ayam'
    },
    image: 'https://images.unsplash.com/photo-1541529086526-db283c563a1b?w=600&q=80',
    isAvailable: true,
    preparationTime: 6,
    isHalal: true,
    allergens: ['wheat'],
    rating: 4.5,
    calories: 280,
    tags: ['quick', 'halal']
  },
  {
    id: 'FOOD008',
    name: 'French Fries',
    nameId: 'Kentang Goreng',
    category: foodCategories.SNACK,
    price: 25000,
    description: {
      en: 'Crispy golden french fries with choice of sauce',
      id: 'Kentang goreng renyah dengan pilihan saus'
    },
    image: 'https://images.unsplash.com/photo-1630384082442-7b562a4f1e8b?w=600&q=80',
    isAvailable: true,
    preparationTime: 5,
    isHalal: true,
    allergens: [],
    rating: 4.3,
    calories: 365,
    tags: ['quick', 'kids']
  },

  // Desserts
  {
    id: 'FOOD009',
    name: 'Bubur Injin',
    nameId: 'Bubur Injin',
    category: foodCategories.DESSERT,
    price: 35000,
    description: {
      en: 'Traditional Balinese black rice pudding with coconut milk',
      id: 'Bubur ketan hitam khas Bali dengan santan'
    },
    image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&q=80',
    isAvailable: true,
    preparationTime: 5,
    isHalal: true,
    allergens: ['dairy'],
    rating: 4.6,
    calories: 280,
    tags: ['local', 'dessert']
  },
  {
    id: 'FOOD010',
    name: 'Chocolate Lava Cake',
    nameId: 'Chocolate Lava Cake',
    category: foodCategories.DESSERT,
    price: 45000,
    description: {
      en: 'Warm chocolate cake with molten center, served with vanilla ice cream',
      id: 'Kue cokelat hangat dengan isi lumer, disajikan dengan es krim vanilla'
    },
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=600&q=80',
    isAvailable: true,
    preparationTime: 8,
    isHalal: true,
    allergens: ['dairy', 'egg', 'wheat'],
    rating: 4.8,
    calories: 420,
    tags: ['dessert', 'popular']
  },

  // Beverages
  {
    id: 'BEV001',
    name: 'Es Daluman',
    nameId: 'Es Daluman',
    category: foodCategories.BEVERAGE,
    price: 25000,
    description: {
      en: 'Traditional Balinese green jelly drink with coconut milk and palm sugar',
      id: 'Minuman jelly hijau khas Bali dengan santan dan gula merah'
    },
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80',
    isAvailable: true,
    preparationTime: 3,
    isHalal: true,
    allergens: ['dairy'],
    rating: 4.7,
    calories: 180,
    tags: ['local', 'refreshing']
  },
  {
    id: 'BEV002',
    name: 'Bali Coffee (Hot/Ice)',
    nameId: 'Kopi Bali (Panas/Es)',
    category: foodCategories.BEVERAGE,
    price: 30000,
    description: {
      en: 'Premium Balinese arabica coffee from Kintamani highlands',
      id: 'Kopi arabika premium dari dataran tinggi Kintamani'
    },
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80',
    isAvailable: true,
    preparationTime: 5,
    isHalal: true,
    allergens: [],
    rating: 4.8,
    calories: 5,
    tags: ['local', 'coffee']
  },
  {
    id: 'BEV003',
    name: 'Fresh Orange Juice',
    nameId: 'Jus Jeruk Segar',
    category: foodCategories.BEVERAGE,
    price: 35000,
    description: {
      en: 'Freshly squeezed orange juice',
      id: 'Jus jeruk segar peras langsung'
    },
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600&q=80',
    isAvailable: true,
    preparationTime: 3,
    isHalal: true,
    allergens: [],
    rating: 4.5,
    calories: 110,
    tags: ['fresh', 'healthy']
  },
  {
    id: 'BEV004',
    name: 'Mineral Water (600ml)',
    nameId: 'Air Mineral (600ml)',
    category: foodCategories.BEVERAGE,
    price: 15000,
    description: {
      en: 'Premium bottled mineral water',
      id: 'Air mineral kemasan premium'
    },
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=600&q=80',
    isAvailable: true,
    preparationTime: 1,
    isHalal: true,
    allergens: [],
    rating: 4.2,
    calories: 0,
    tags: ['quick']
  },
];

// Helper functions
export const getFoodByCategory = (category) => {
  return foodMenu.filter(item => item.category === category);
};

export const getFoodById = (id) => {
  return foodMenu.find(item => item.id === id);
};

export const getAvailableFood = () => {
  return foodMenu.filter(item => item.isAvailable);
};

export const searchFood = (query) => {
  const lowerQuery = query.toLowerCase();
  return foodMenu.filter(item =>
    item.name.toLowerCase().includes(lowerQuery) ||
    item.nameId.toLowerCase().includes(lowerQuery) ||
    item.description.en.toLowerCase().includes(lowerQuery) ||
    item.description.id.toLowerCase().includes(lowerQuery)
  );
};

export const getHalalFood = () => {
  return foodMenu.filter(item => item.isHalal);
};

export const getFoodByTags = (tags) => {
  return foodMenu.filter(item =>
    item.tags.some(tag => tags.includes(tag))
  );
};
