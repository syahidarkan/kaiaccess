// Comprehensive checkpoint data for Bali Heritage Rail Experience
export const checkpoints = [
  {
    id: "CP001",
    name: "Pura Tanah Lot",
    nameId: "Pura Tanah Lot",
    category: "temple",
    coordinates: { lat: -8.6212, lng: 115.0868 }, // Coastal
    region: "Kabupaten Tabanan",
    unlockRadius: 500,
    media: {
      coverImage: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&q=80",
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
        "https://images.unsplash.com/photo-1580654712603-eb43273aff33?w=800&q=80",
      ],
      video: "",
      panorama: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=2000&q=80",
      oldImage: "https://images.unsplash.com/photo-1604430456280-43f66e8c9180?w=800&q=80&sat=-100&sepia=80", // Colonial-era Balinese temple architecture
      model3D: { type: 'artifact', url: 'virtual-artifact' }
    },
    content: {
      story: {
        en: "Tanah Lot Temple represents the epitome of Bali's spiritual and architectural heritage. Perched on a massive 3-acre rock formation, this sea temple (Pura Segara) defies the crashing waves of the Indian Ocean, creating a silhouette that has become the icon of the island. \n\nThe history of Tanah Lot dates back to the 16th century and is inextricably linked to the legendary Majapahit priest, Dang Hyang Nirartha. During his travels along the southern coast, he perceived a divine vibration (japa) emanating from this rock. He rested here and captivated the local fishermen with his teachings. Before leaving, he instructed them to build a shrine on the rock, for he felt it was a holy place to worship the Balinese sea gods.\n\nMythology weaves a protective aura around the temple. Legends say Nirartha threw his sashes into the sea, which transformed into the sea snakes that guard the temple's base to this day. These guardians protect the temple from evil spirits and intruders. At the base of the rocky island, a freshwater spring flows inexplicably from the ocean—a holy water source (Tirta Pabersihan) used for purification ceremonies.",
        id: "Pura Tanah Lot merupakan puncak warisan spiritual dan arsitektur Bali. Bertengger di atas bongkahan batu karang seluas 3 hektar, pura segara ini menantang deburan ombak Samudra Hindia, menciptakan siluet yang telah menjadi ikon pulau dewata.\n\nSejarah Tanah Lot bermula pada abad ke-16 dan tak terpisahkan dari kisah pendeta legendaris Majapahit, Dang Hyang Nirartha. Dalam perjalanannya menyusuri pantai selatan, beliau merasakan getaran suci (japa) memancar dari batu karang ini. Beliau beristirahat di sini dan memikat para nelayan setempat dengan ajaran-ajarannya. Sebelum melanjutkan perjalanan, beliau menginstruksikan warga untuk membangun pelinggih (bangunan suci) di atas batu tersebut, karena beliau meyakini tempat itu suci untuk memuja dewa-dewa laut.\n\nMitologi menyelimuti pura ini dengan aura perlindungan. Legenda menuturkan bahwa Nirartha melemparkan selendangnya ke laut, yang kemudian menjelma menjadi ular-ular laut penghuni celah karang. Ular-ular ini dipercaya sebagai penjaga abadi pura dari roh jahat dan mara bahaya. Keajaiban lain terdapat di kaki karang, di mana mata air tawar mengalir di tengah asinnya air laut—sumber Tirta Pabersihan yang digunakan untuk upacara penyucian."
      },
      audioGuide: { en: "", id: "", duration: 240, transcript: "Welcome to Tanah Lot..." },
      facts: ["Built in 16th century", "Sea temple", "Sunset view"],
      localTips: { bestTime: "Sunset", facilities: ["Parking", "Cafe"], nearbyAttractions: [], etiquette: [], entryFee: "Rp 60k" }
    },
    badge: { id: "BADGE_TANAH_LOT", name: "Sea Guardian", icon: "🌊", description: "Visited Tanah Lot" },
    arContent: { enabled: true, type: "info-overlay", description: "View temple history" }
  },
  {
    id: "CP002",
    name: "Soka Beach",
    nameId: "Pantai Soka",
    category: "nature",
    coordinates: { lat: -8.5147, lng: 114.9967 }, // West Coast
    region: "Kabupaten Tabanan",
    unlockRadius: 500,
    media: {
      coverImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800", // Generic beach
      gallery: ["https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800"],
      panorama: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=2000",
      oldImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80&sat=-100&sepia=70", // Vintage coastal scenery
      model3D: { type: 'artifact' }
    },
    content: {
      story: { en: "Soka Beach offers dramatic views of the Indian Ocean and is famous for its ancient rock formations...", id: "Pantai Soka menawarkan pemandangan dramatis Samudra Hindia..." },
      facts: ["Black sand beach", "Ancient rock formations", "Sunset spot"],
      audioGuide: { en: "", id: "", duration: 120, transcript: "" },
      localTips: { bestTime: "Sunset", facilities: [], nearbyAttractions: [], etiquette: [], entryFee: "" }
    },
    badge: { id: "BADGE_SOKA", name: "West Coast", icon: "🏖️", description: "Reached Soka Beach" },
    arContent: { enabled: true, type: "info-overlay", description: "Geological history" }
  },
  {
    id: "CP003",
    name: "Rambut Siwi Temple",
    nameId: "Pura Rambut Siwi",
    category: "temple",
    coordinates: { lat: -8.3970, lng: 114.7640 }, // West Coast
    region: "Jembrana",
    unlockRadius: 500,
    media: {
      coverImage: "https://images.unsplash.com/photo-1552422554-0d567c69991b?w=800", // Temple
      gallery: ["https://images.unsplash.com/photo-1552422554-0d567c69991b?w=800"],
      panorama: "https://images.unsplash.com/photo-1552422554-0d567c69991b?w=2000",
      oldImage: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80&sat=-100&sepia=80", // Vintage Hindu temple cliff setting
      model3D: { type: 'artifact' }
    },
    content: {
      story: { en: "One of the biggest Hindu temples in Bali, located on a cliff bank with a wide view to the Indian Ocean...", id: "Salah satu pura Hindu terbesar di Bali, terletak di tebing dengan pemandangan luas ke Samudra Hindia..." },
      facts: ["Cliff temple", "Majapahit era", "Sunset view"],
      audioGuide: { en: "", id: "", duration: 180, transcript: "" },
      localTips: { bestTime: "Afternoon", facilities: [], nearbyAttractions: [], etiquette: [], entryFee: "" }
    },
    badge: { id: "BADGE_RAMBUT_SIWI", name: "Cliff Pilgrim", icon: "🕍", description: "Visited Rambut Siwi" },
    arContent: { enabled: true, type: "info-overlay", description: "Temple architecture" }
  },
  {
    id: "CP004",
    name: "West Bali National Park",
    nameId: "Taman Nasional Bali Barat",
    category: "nature",
    coordinates: { lat: -8.1453, lng: 114.4475 }, // North West Coast
    region: "Jembrana",
    unlockRadius: 500,
    media: {
      coverImage: "https://images.unsplash.com/photo-1584266336582-4f3693fb1d0b?w=800", // Nature
      gallery: ["https://images.unsplash.com/photo-1584266336582-4f3693fb1d0b?w=800"],
      panorama: "https://images.unsplash.com/photo-1584266336582-4f3693fb1d0b?w=2000",
      oldImage: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80&sat=-100&sepia=60", // Vintage forest/jungle landscape
      model3D: { type: 'artifact' }
    },
    content: {
      story: { en: "The only national park in Bali, home to the endangered Bali Starling...", id: "Satu-satunya taman nasional di Bali, rumah bagi Jalak Bali..." },
      facts: ["Protected area", "Bali Starling home", "Mangroves"],
      audioGuide: { en: "", id: "", duration: 300, transcript: "" },
      localTips: { bestTime: "Morning", facilities: [], nearbyAttractions: [], etiquette: [], entryFee: "" }
    },
    badge: { id: "BADGE_NATIONAL_PARK", name: "Ranger", icon: "🦜", description: "Explored National Park" },
    arContent: { enabled: true, type: "info-overlay", description: "Wildlife guide" }
  },
  {
    id: "CP005",
    name: "Lovina Beach",
    nameId: "Pantai Lovina",
    category: "nature",
    coordinates: { lat: -8.1580, lng: 115.0274 }, // North Coast
    region: "Buleleng",
    unlockRadius: 500,
    media: {
      coverImage: "https://images.unsplash.com/photo-1519046904884-53103b34b271?w=800",
      gallery: ["https://images.unsplash.com/photo-1519046904884-53103b34b271?w=800"],
      panorama: "https://images.unsplash.com/photo-1519046904884-53103b34b271?w=2000",
      oldImage: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&q=80&sat=-100&sepia=70", // Vintage fishing boats on beach
      model3D: { type: 'artifact' }
    },
    content: {
      story: { en: "Famous for its black sand and dolphin watching...", id: "Terkenal dengan pasir hitam dan lumba-lumba..." },
      facts: ["Dolphin watching", "Black sand", "Calm waves"],
      audioGuide: { en: "", id: "", duration: 180, transcript: "" },
      localTips: { bestTime: "Sunrise", facilities: [], nearbyAttractions: [], etiquette: [], entryFee: "" }
    },
    badge: { id: "BADGE_LOVINA", name: "Dolphin", icon: "🐬", description: "Visited Lovina" },
    arContent: { enabled: true, type: "info-overlay", description: "Marine life" }
  },
  {
    id: "CP006",
    name: "Pulaki Temple",
    nameId: "Pura Pulaki",
    category: "temple",
    coordinates: { lat: -8.1444, lng: 114.6853 }, // North Coast (Replaces Git Git)
    region: "Buleleng",
    unlockRadius: 500,
    media: {
      coverImage: "https://images.unsplash.com/photo-1555400038-63f5ba517a97?w=800",
      gallery: ["https://images.unsplash.com/photo-1555400038-63f5ba517a97?w=800"],
      panorama: "https://images.unsplash.com/photo-1555400038-63f5ba517a97?w=2000",
      oldImage: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&q=80&sat=-100&sepia=75", // Vintage temple with monkeys
      model3D: { type: 'artifact' }
    },
    content: {
      story: { en: "Pura Pulaki is a sea temple located on a hill near the beach...", id: "Pura Pulaki adalah pura segara yang terletak di bukit dekat pantai..." },
      facts: ["Sea temple", "Monkey inhabitants", "Black stone architecture"],
      audioGuide: { en: "", id: "", duration: 200, transcript: "" },
      localTips: { bestTime: "Morning", facilities: [], nearbyAttractions: [], etiquette: [], entryFee: "" }
    },
    badge: { id: "BADGE_PULAKI", name: "North Guardian", icon: "🐒", description: "Visited Pulaki" },
    arContent: { enabled: true, type: "info-overlay", description: "Monkey facts" }
  },
  {
    id: "CP007",
    name: "Amed Beach",
    nameId: "Pantai Amed",
    category: "nature",
    coordinates: { lat: -8.3342, lng: 115.6493 }, // East Coast (Replaces Jatiluwih)
    region: "Karangasem",
    unlockRadius: 500,
    media: {
      coverImage: "https://images.unsplash.com/photo-1537953773345-d172ccf08acf?w=800",
      gallery: ["https://images.unsplash.com/photo-1537953773345-d172ccf08acf?w=800"],
      panorama: "https://images.unsplash.com/photo-1537953773345-d172ccf08acf?w=2000",
      oldImage: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80&sat=-100&sepia=65", // Vintage diving/coastal village era
      model3D: { type: 'artifact' }
    },
    content: {
      story: { en: "Amed is famous for its diving spots and traditional salt farming...", id: "Amed terkenal dengan spot menyelam dan pertanian garam tradisional..." },
      facts: ["Diving spot", "Salt farming", "Mt Agung view"],
      audioGuide: { en: "", id: "", duration: 240, transcript: "" },
      localTips: { bestTime: "Morning", facilities: [], nearbyAttractions: [], etiquette: [], entryFee: "" }
    },
    badge: { id: "BADGE_AMED", name: "Diver", icon: "🐠", description: "Visited Amed" },
    arContent: { enabled: true, type: "info-overlay", description: "Coral reef guide" }
  },
  {
    id: "CP008",
    name: "Taman Ujung",
    nameId: "Taman Ujung Water Palace",
    category: "cultural",
    coordinates: { lat: -8.4633, lng: 115.6309 }, // East Coast (Replaces Taman Ayun)
    region: "Karangasem",
    unlockRadius: 500,
    media: {
      coverImage: "https://images.unsplash.com/photo-1571217696433-2810848035ed?w=800",
      gallery: ["https://images.unsplash.com/photo-1571217696433-2810848035ed?w=800"],
      panorama: "https://images.unsplash.com/photo-1571217696433-2810848035ed?w=2000",
      oldImage: "https://images.unsplash.com/photo-1583224964806-f5c7508cb8cd?w=800&q=80&sat=-100&sepia=80", // Colonial-era royal palace architecture
      model3D: { type: 'artifact' }
    },
    content: {
      story: { en: "A royal water palace built by the King of Karangasem...", id: "Istana air kerajaan yang dibangun oleh Raja Karangasem..." },
      facts: ["Royal palace", "Fusion architecture", "Coastal view"],
      audioGuide: { en: "", id: "", duration: 250, transcript: "" },
      localTips: { bestTime: "Morning", facilities: [], nearbyAttractions: [], etiquette: [], entryFee: "" }
    },
    badge: { id: "BADGE_UJUNG", name: "Royal", icon: "🏰", description: "Visited Taman Ujung" },
    arContent: { enabled: true, type: "info-overlay", description: "Palace history" }
  },
  {
    id: "CP009",
    name: "Candidasa",
    nameId: "Candidasa",
    category: "nature",
    coordinates: { lat: -8.5028, lng: 115.5658 }, // East Coast
    region: "Karangasem",
    unlockRadius: 500,
    media: {
      coverImage: "https://images.unsplash.com/photo-1544644181-1bc988c6fbbf?w=800",
      gallery: ["https://images.unsplash.com/photo-1544644181-1bc988c6fbbf?w=800"],
      panorama: "https://images.unsplash.com/photo-1544644181-1bc988c6fbbf?w=2000",
      oldImage: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800&q=80&sat=-100&sepia=70", // Vintage tropical coastal town
      model3D: { type: 'artifact' }
    },
    content: {
      story: { en: "A relaxing coastal town with a lotus lagoon...", id: "Kota pantai yang santai dengan laguna teratai..." },
      facts: ["Lotus lagoon", "Beach town", "Snorkeling"],
      audioGuide: { en: "", id: "", duration: 150, transcript: "" },
      localTips: { bestTime: "Sunset", facilities: [], nearbyAttractions: [], etiquette: [], entryFee: "" }
    },
    badge: { id: "BADGE_CANDIDASA", name: "Lotus", icon: "🪷", description: "Visited Candidasa" },
    arContent: { enabled: true, type: "info-overlay", description: "Lotus ecology" }
  },
  {
    id: "CP010",
    name: "Goa Lawah",
    nameId: "Pura Goa Lawah",
    category: "temple",
    coordinates: { lat: -8.5534, lng: 115.4727 }, // East Coast
    region: "Klungkung",
    unlockRadius: 500,
    media: {
      coverImage: "https://images.unsplash.com/photo-1571217696433-2810848035ed?w=800",
      gallery: ["https://images.unsplash.com/photo-1571217696433-2810848035ed?w=800"],
      panorama: "https://images.unsplash.com/photo-1571217696433-2810848035ed?w=2000",
      oldImage: "https://images.unsplash.com/photo-1589519160732-57fc498494f8?w=800&q=80&sat=-100&sepia=75", // Colonial temple cave setting
      model3D: { type: 'artifact' }
    },
    content: {
      story: { en: "The Bat Cave Temple...", id: "Pura Gua Kelelawar..." },
      facts: ["Bat cave", "Directional temple", "Coastal"],
      audioGuide: { en: "", id: "", duration: 180, transcript: "" },
      localTips: { bestTime: "Morning", facilities: [], nearbyAttractions: [], etiquette: [], entryFee: "" }
    },
    badge: { id: "BADGE_GOA_LAWAH", name: "Bat Cave", icon: "🦇", description: "Visited Goa Lawah" },
    arContent: { enabled: true, type: "info-overlay", description: "Bat facts" }
  },
  {
    id: "CP011",
    name: "Sanur Beach",
    nameId: "Pantai Sanur",
    category: "nature",
    coordinates: { lat: -8.6792, lng: 115.2638 }, // South East Coast (Replaces Tegalalang)
    region: "Denpasar",
    unlockRadius: 500,
    media: {
      coverImage: "https://images.unsplash.com/photo-1510153706013-163f58855792?w=800",
      gallery: ["https://images.unsplash.com/photo-1510153706013-163f58855792?w=800"],
      panorama: "https://images.unsplash.com/photo-1510153706013-163f58855792?w=2000",
      oldImage: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80&sat=-100&sepia=65", // Vintage resort beach 1930s era
      model3D: { type: 'artifact' }
    },
    content: {
      story: { en: "Sanur is Bali's oldest upscale resort area and is famous for its sunrise...", id: "Sanur adalah area resor kelas atas tertua di Bali dan terkenal dengan matahari terbitnya..." },
      facts: ["Sunrise beach", "Calm water", "Biking path"],
      audioGuide: { en: "", id: "", duration: 180, transcript: "" },
      localTips: { bestTime: "Sunrise", facilities: [], nearbyAttractions: [], etiquette: [], entryFee: "" }
    },
    badge: { id: "BADGE_SANUR", name: "Sunrise", icon: "🌅", description: "Visited Sanur" },
    arContent: { enabled: true, type: "info-overlay", description: "Marine life" }
  },
  {
    id: "CP012",
    name: "Uluwatu Temple",
    nameId: "Pura Luhur Uluwatu",
    category: "temple",
    coordinates: { lat: -8.8292, lng: 115.0852 }, // South Coast
    region: "Badung",
    unlockRadius: 500,
    media: {
      coverImage: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800", // Uluwatu
      gallery: ["https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800"],
      panorama: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=2000",
      oldImage: "https://images.unsplash.com/photo-1528127269322-539801943592?w=800&q=80&sat=-100&sepia=80", // Vintage cliff temple ruins
      model3D: { type: 'artifact' }
    },
    content: {
      story: { en: "Perched on a steep cliff 70 meters above the roaring ocean...", id: "Bertengger di tebing curam 70 meter di atas lautan bergemuruh..." },
      facts: ["Cliff temple", "Kecak dance", "Monkeys"],
      audioGuide: { en: "", id: "", duration: 220, transcript: "" },
      localTips: { bestTime: "Sunset", facilities: [], nearbyAttractions: [], etiquette: [], entryFee: "" }
    },
    badge: { id: "BADGE_ULUWATU", name: "Cliff", icon: "🧗", description: "Visited Uluwatu" }
  },
  {
    id: "CP013",
    name: "Jimbaran Bay",
    nameId: "Teluk Jimbaran",
    category: "nature",
    coordinates: { lat: -8.7731, lng: 115.1686 }, // South Coast (Near Airport)
    region: "Badung",
    unlockRadius: 500,
    media: {
      coverImage: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800",
      gallery: [],
      panorama: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=2000",
      oldImage: "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&q=80&sat=-100&sepia=70", // Vintage fishing village bay
      model3D: null
    },
    content: {
      story: { en: "Famous seafood dining spot on the beach...", id: "Tempat makan seafood terkenal di pantai..." },
      facts: ["Seafood dinner", "Sunset", "Fishing village"],
      audioGuide: { en: "", id: "", duration: 0, transcript: "" },
      localTips: { bestTime: "Evening", facilities: [], nearbyAttractions: [], etiquette: [], entryFee: "" }
    },
    badge: { id: "BADGE_JIMBARAN", name: "Seafood Lover", icon: "🦐", description: "Visited Jimbaran" }
  }
];
