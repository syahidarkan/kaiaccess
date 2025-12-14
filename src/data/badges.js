// Comprehensive badge system for Kereta Eksplorasi Bali
export const badges = [
  // Milestone Badges
  {
    id: "BADGE_FIRST",
    name: "First Steps",
    nameId: "Langkah Pertama",
    category: "milestone",
    icon: "🎯",
    description: {
      en: "Unlocked your first checkpoint on the journey",
      id: "Membuka checkpoint pertama Anda dalam perjalanan"
    },
    requirement: "Unlock 1 checkpoint",
    rarity: "common"
  },
  {
    id: "BADGE_EXPLORER",
    name: "Heritage Explorer",
    nameId: "Penjelajah Warisan",
    category: "milestone",
    icon: "🗺️",
    description: {
      en: "Discovered 5 heritage sites across Bali",
      id: "Menemukan 5 situs warisan di seluruh Bali"
    },
    requirement: "Unlock 5 checkpoints",
    rarity: "common"
  },
  {
    id: "BADGE_ADVENTURER",
    name: "Bali Adventurer",
    nameId: "Petualang Bali",
    category: "milestone",
    icon: "🏆",
    description: {
      en: "Explored half of all heritage checkpoints",
      id: "Menjelajahi setengah dari semua checkpoint warisan"
    },
    requirement: "Unlock 10 checkpoints",
    rarity: "rare"
  },
  {
    id: "BADGE_MASTER",
    name: "Heritage Master",
    nameId: "Master Warisan",
    category: "milestone",
    icon: "👑",
    description: {
      en: "Visited all checkpoints on Kereta Eksplorasi Bali",
      id: "Mengunjungi semua checkpoint di Kereta Eksplorasi Bali"
    },
    requirement: "Unlock all 15 checkpoints",
    rarity: "legendary"
  },

  // Category-specific Badges
  {
    id: "BADGE_TEMPLE_EXPLORER",
    name: "Temple Guardian",
    nameId: "Penjaga Pura",
    category: "category",
    icon: "🛕",
    description: {
      en: "Visited 5 sacred temples across the island",
      id: "Mengunjungi 5 pura suci di seluruh pulau"
    },
    requirement: "Visit 5 temple checkpoints",
    rarity: "rare"
  },
  {
    id: "BADGE_NATURE_LOVER",
    name: "Nature's Friend",
    nameId: "Sahabat Alam",
    category: "category",
    icon: "🌿",
    description: {
      en: "Explored 5 natural wonders of Bali",
      id: "Menjelajahi 5 keajaiban alam Bali"
    },
    requirement: "Visit 5 nature checkpoints",
    rarity: "rare"
  },
  {
    id: "BADGE_CULTURAL_ENTHUSIAST",
    name: "Cultural Ambassador",
    nameId: "Duta Budaya",
    category: "category",
    icon: "🎭",
    description: {
      en: "Immersed in Balinese culture and traditions",
      id: "Tenggelam dalam budaya dan tradisi Bali"
    },
    requirement: "Visit 3 cultural checkpoints",
    rarity: "common"
  },
  {
    id: "BADGE_HISTORY_BUFF",
    name: "History Keeper",
    nameId: "Penjaga Sejarah",
    category: "category",
    icon: "📜",
    description: {
      en: "Learned about Bali's rich historical heritage",
      id: "Mempelajari warisan sejarah Bali yang kaya"
    },
    requirement: "Visit all historical checkpoints",
    rarity: "rare"
  },

  // Special Activity Badges
  {
    id: "BADGE_EARLY_BIRD",
    name: "Early Riser",
    nameId: "Penganut Pagi",
    category: "special",
    icon: "🌅",
    description: {
      en: "Started your journey with the first train of the day",
      id: "Memulai perjalanan dengan kereta pertama hari ini"
    },
    requirement: "Book 06:00 departure",
    rarity: "common"
  },
  {
    id: "BADGE_PHOTO_PRO",
    name: "Snapshot Master",
    nameId: "Master Foto",
    category: "special",
    icon: "📸",
    description: {
      en: "Captured memories at 10 different checkpoints",
      id: "Mengabadikan kenangan di 10 checkpoint berbeda"
    },
    requirement: "Take photos at 10 checkpoints",
    rarity: "rare"
  },
  {
    id: "BADGE_SPEED_RUNNER",
    name: "Speed Pilgrim",
    nameId: "Peziarah Cepat",
    category: "special",
    icon: "⚡",
    description: {
      en: "Completed the entire circuit in under 7 hours",
      id: "Menyelesaikan seluruh sirkuit dalam waktu kurang dari 7 jam"
    },
    requirement: "Finish journey in < 7 hours",
    rarity: "epic"
  },
  {
    id: "BADGE_AR_PIONEER",
    name: "AR Explorer",
    nameId: "Penjelajah AR",
    category: "special",
    icon: "🥽",
    description: {
      en: "Experienced AR content at 5 checkpoints",
      id: "Mengalami konten AR di 5 checkpoint"
    },
    requirement: "Use AR mode at 5 checkpoints",
    rarity: "rare"
  },
  {
    id: "BADGE_AUDIO_GUIDE",
    name: "Story Listener",
    nameId: "Pendengar Cerita",
    category: "special",
    icon: "🎧",
    description: {
      en: "Listened to audio guides at 8 checkpoints",
      id: "Mendengarkan panduan audio di 8 checkpoint"
    },
    requirement: "Complete 8 audio guides",
    rarity: "common"
  },

  // Hidden/Easter Egg Badges
  {
    id: "BADGE_SECRET_SUNRISE",
    name: "Sunrise Seeker",
    nameId: "Pencari Matahari Terbit",
    category: "hidden",
    icon: "🌄",
    description: {
      en: "Witnessed sunrise at a sacred location",
      id: "Menyaksikan matahari terbit di lokasi suci"
    },
    requirement: "Visit Besakih before 7 AM",
    rarity: "epic",
    hidden: true
  },
  {
    id: "BADGE_SECRET_SUNSET",
    name: "Sunset Chaser",
    nameId: "Pemburu Matahari Terbenam",
    category: "hidden",
    icon: "🌇",
    description: {
      en: "Caught the perfect sunset moment",
      id: "Menangkap momen matahari terbenam yang sempurna"
    },
    requirement: "Visit Tanah Lot or Uluwatu after 5 PM",
    rarity: "epic",
    hidden: true
  },
  {
    id: "BADGE_TRIPLE_TAP",
    name: "Secret Discoverer",
    nameId: "Penemu Rahasia",
    category: "hidden",
    icon: "🔐",
    description: {
      en: "Found the hidden demo mode feature",
      id: "Menemukan fitur mode demo tersembunyi"
    },
    requirement: "Triple-tap KAI logo",
    rarity: "legendary",
    hidden: true
  },

  // Achievement Badges
  {
    id: "BADGE_COMPLETION",
    name: "Journey Complete",
    nameId: "Perjalanan Selesai",
    category: "achievement",
    icon: "✅",
    description: {
      en: "Successfully completed Kereta Eksplorasi Bali",
      id: "Berhasil menyelesaikan Kereta Eksplorasi Bali"
    },
    requirement: "Complete full journey",
    rarity: "epic"
  },
  {
    id: "BADGE_PERFECT",
    name: "Perfect Traveler",
    nameId: "Wisatawan Sempurna",
    category: "achievement",
    icon: "💎",
    description: {
      en: "Unlocked all checkpoints and collected all badges",
      id: "Membuka semua checkpoint dan mengumpulkan semua lencana"
    },
    requirement: "Collect all non-hidden badges",
    rarity: "legendary"
  },
  {
    id: "BADGE_COLLECTOR",
    name: "Badge Collector",
    nameId: "Kolektor Lencana",
    category: "achievement",
    icon: "🎖️",
    description: {
      en: "Earned 10 different badges",
      id: "Mendapatkan 10 lencana berbeda"
    },
    requirement: "Earn 10 badges",
    rarity: "rare"
  },

  // Regional Badges
  {
    id: "BADGE_TABANAN",
    name: "Tabanan Explorer",
    nameId: "Penjelajah Tabanan",
    category: "regional",
    icon: "🏞️",
    description: {
      en: "Visited all checkpoints in Tabanan regency",
      id: "Mengunjungi semua checkpoint di Kabupaten Tabanan"
    },
    requirement: "Visit all Tabanan checkpoints",
    rarity: "common"
  },
  {
    id: "BADGE_KARANGASEM",
    name: "Karangasem Pilgrim",
    nameId: "Peziarah Karangasem",
    category: "regional",
    icon: "⛰️",
    description: {
      en: "Explored the sacred lands of Karangasem",
      id: "Menjelajahi tanah suci Karangasem"
    },
    requirement: "Visit all Karangasem checkpoints",
    rarity: "common"
  },
  {
    id: "BADGE_BULELENG",
    name: "North Bali Wanderer",
    nameId: "Pengembara Bali Utara",
    category: "regional",
    icon: "🌊",
    description: {
      en: "Discovered the beauty of North Bali",
      id: "Menemukan keindahan Bali Utara"
    },
    requirement: "Visit all Buleleng checkpoints",
    rarity: "common"
  },
  {
    id: "BADGE_KLUNGKUNG",
    name: "Klungkung Historian",
    nameId: "Sejarawan Klungkung",
    category: "regional",
    icon: "🏰",
    description: {
      en: "Explored historical sites of Klungkung",
      id: "Menjelajahi situs sejarah Klungkung"
    },
    requirement: "Visit all Klungkung checkpoints",
    rarity: "common"
  },

  // Social Badges
  {
    id: "BADGE_SHARE",
    name: "Story Teller",
    nameId: "Pencerita",
    category: "social",
    icon: "📱",
    description: {
      en: "Shared your journey on social media",
      id: "Membagikan perjalanan Anda di media sosial"
    },
    requirement: "Share 5 times",
    rarity: "common"
  },
  {
    id: "BADGE_REVIEW",
    name: "Valued Reviewer",
    nameId: "Pengulas Berharga",
    category: "social",
    icon: "⭐",
    description: {
      en: "Provided valuable feedback",
      id: "Memberikan umpan balik yang berharga"
    },
    requirement: "Leave a review",
    rarity: "common"
  }
];

// Badge helper functions
export const getBadgeById = (id) => badges.find(badge => badge.id === id);

export const getBadgesByCategory = (category) =>
  badges.filter(badge => badge.category === category);

export const getBadgesByRarity = (rarity) =>
  badges.filter(badge => badge.rarity === rarity);

export const getVisibleBadges = () =>
  badges.filter(badge => !badge.hidden);

export const getAllBadges = () => badges;

export const getTotalBadges = () => badges.length;

export const getBadgeProgress = (earnedBadges) => {
  const total = badges.length;
  const earned = earnedBadges.length;
  return {
    earned,
    total,
    percentage: Math.round((earned / total) * 100)
  };
};

// Check if user should earn a badge based on criteria
export const checkBadgeEligibility = (badgeId, userData) => {
  const badge = getBadgeById(badgeId);
  if (!badge) return false;

  const { unlockedCheckpoints = [], photosTaken = 0, audioGuidesCompleted = 0 } = userData;

  switch (badgeId) {
    case "BADGE_FIRST":
      return unlockedCheckpoints.length >= 1;
    case "BADGE_EXPLORER":
      return unlockedCheckpoints.length >= 5;
    case "BADGE_ADVENTURER":
      return unlockedCheckpoints.length >= 10;
    case "BADGE_MASTER":
      return unlockedCheckpoints.length >= 15;
    case "BADGE_PHOTO_PRO":
      return photosTaken >= 10;
    case "BADGE_AUDIO_GUIDE":
      return audioGuidesCompleted >= 8;
    case "BADGE_COLLECTOR":
      return userData.earnedBadges?.length >= 10;
    // Add more conditions as needed
    default:
      return false;
  }
};
