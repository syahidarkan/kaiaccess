// Bali Island Heritage Circuit Route Data
export const route = {
  id: "ROUTE_BALI_HERITAGE",
  name: "Bali Island Heritage Circuit",
  nameId: "Sirkuit Warisan Pulau Bali",

  description: {
    en: "Experience the complete circle of Bali's coastal wonders. This full-day railway journey takes you through seven regencies, visiting 13 iconic coastal checkpoints including temples, beaches, and national parks.",
    id: "Rasakan lingkaran lengkap keajaiban pesisir Bali. Perjalanan kereta api sehari penuh ini membawa Anda melalui tujuh kabupaten, mengunjungi 13 pos pesisir ikonik termasuk pura, pantai, dan taman nasional."
  },

  distance: 360, // kilometers (approx loop)
  duration: 480, // minutes
  checkpointCount: 13,
  price: 450000,

  stations: [
    {
      id: "ST01",
      name: "Bandara I Gusti Ngurah Rai",
      nameId: "Bandara I Gusti Ngurah Rai",
      coordinates: { lat: -8.7467, lng: 115.1670 },
      region: "Badung",
      order: 1,
      facilities: ["Restaurant", "ATM", "Toilets", "Waiting room", "Transport hub"],
      nearbyCheckpoints: ["CP013", "CP001"],
      type: "airport"
    },
    {
      id: "ST02",
      name: "Gianyar Station",
      nameId: "Stasiun Gianyar",
      coordinates: { lat: -8.6400, lng: 115.3500 },
      region: "Kabupaten Gianyar",
      order: 2,
      facilities: ["Toilets", "Cafe", "Parking", "Tourist info"],
      nearbyCheckpoints: ["CP010", "CP011"],
      type: "regional"
    },
    {
      id: "ST03",
      name: "Amlapura Station",
      nameId: "Stasiun Amlapura",
      coordinates: { lat: -8.4500, lng: 115.6073 },
      region: "Kabupaten Karangasem",
      order: 3,
      facilities: ["Toilets", "Small market", "Parking"],
      nearbyCheckpoints: ["CP007", "CP008", "CP009"],
      type: "regional"
    },
    {
      id: "ST04",
      name: "Buleleng Station",
      nameId: "Stasiun Buleleng",
      coordinates: { lat: -8.1120, lng: 115.0881 },
      region: "Kabupaten Buleleng",
      order: 4,
      facilities: ["Restaurant", "ATM", "Toilets", "Wi-Fi"],
      nearbyCheckpoints: ["CP005", "CP006"],
      type: "regional"
    },
    {
      id: "ST05",
      name: "Jembrana Station",
      nameId: "Stasiun Jembrana",
      coordinates: { lat: -8.3569, lng: 114.6178 },
      region: "Kabupaten Jembrana",
      order: 5,
      facilities: ["Toilets", "Small cafe", "Parking"],
      nearbyCheckpoints: ["CP003", "CP004"],
      type: "regional"
    },
    {
      id: "ST06",
      name: "Tabanan Station",
      nameId: "Stasiun Tabanan",
      coordinates: { lat: -8.5147, lng: 114.9967 },
      region: "Kabupaten Tabanan",
      order: 6,
      facilities: ["Toilets", "Cafe", "Parking", "Photo spot"],
      nearbyCheckpoints: ["CP001", "CP002", "CP003"],
      type: "regional"
    },
  ],

  // Railway Route Polyline - Following ACTUAL ROADS/RAILWAYS on LAND (Not Ocean)
  polyline: [
    // START: Bandara I Gusti Ngurah Rai (South Bali)
    [-8.7467, 115.1670],

    // SOUTH - Airport to Sanur via Bypass Ngurah Rai (LAND ROUTE)
    [-8.7400, 115.1750], // Airport exit road
    [-8.7300, 115.1850], // Jl. Ngurah Rai
    [-8.7200, 115.1950], // Kuta inland
    [-8.7100, 115.2050], // Tuban area
    [-8.7000, 115.2150], // Bypass road
    [-8.6900, 115.2250], // Sanur approach inland
    [-8.6850, 115.2350], // Sanur inland
    [-8.6792, 115.2450], // Near Sanur Station
    [-8.6792, 115.2638], // Sanur Station
    [-8.6750, 115.2750], // East from Sanur
    [-8.6700, 115.2900], // Gianyar road
    [-8.6650, 115.3100], // Inland route
    [-8.6600, 115.3300], // Gianyar inland
    [-8.6400, 115.3500], // Gianyar Station

    // EAST - Gianyar to Karangasem via Klungkung Road (INLAND)
    [-8.6350, 115.3700], // Gianyar inland road
    [-8.6300, 115.3900], // East Gianyar
    [-8.6200, 115.4100], // Klungkung inland approach
    [-8.6100, 115.4300], // Klungkung town
    [-8.6000, 115.4500], // Klungkung center road
    [-8.5900, 115.4700], // East Klungkung
    [-8.5800, 115.4900], // Padang Bay road
    [-8.5700, 115.5100], // Inland route
    [-8.5600, 115.5300], // Candidasa inland
    [-8.5500, 115.5450], // Road to Amlapura
    [-8.5400, 115.5600], // Karangasem road
    [-8.5300, 115.5750], // Inland approach
    [-8.5200, 115.5900], // Amlapura road

    // NORTHEAST - Amlapura to North via Inland Road
    [-8.5100, 115.6000], // Amlapura inland
    [-8.4900, 115.6073], // Approaching station
    [-8.4500, 115.6073], // Amlapura/Karangasem Station
    [-8.4300, 115.6050], // North from station (inland)
    [-8.4100, 115.6000], // Mountain road
    [-8.3900, 115.5900], // Inland route north
    [-8.3700, 115.5800], // Amed road (inland)
    [-8.3500, 115.5700], // North Karangasem
    [-8.3300, 115.5600], // Inland mountain route
    [-8.3100, 115.5500], // Tulamben road
    [-8.2900, 115.5400], // North route
    [-8.2700, 115.5300], // Continuing north
    [-8.2500, 115.5200], // Buleleng approach

    // NORTH - Coastal Road to Singaraja (Main North Road)
    [-8.2300, 115.5100], // Tejakula inland
    [-8.2100, 115.4900], // North road
    [-8.1900, 115.4700], // Continuing west
    [-8.1700, 115.4500], // Buleleng road
    [-8.1500, 115.4300], // Inland route
    [-8.1400, 115.4100], // North main road
    [-8.1300, 115.3900], // Singaraja approach
    [-8.1200, 115.3700], // East Singaraja
    [-8.1150, 115.3500], // Singaraja inland
    [-8.1100, 115.3300], // Singaraja center
    [-8.1080, 115.3100], // City road
    [-8.1100, 115.2900], // West Singaraja
    [-8.1120, 115.2700], // Lovina road
    [-8.1150, 115.2500], // Inland Lovina
    [-8.1180, 115.2300], // West route
    [-8.1200, 115.2100], // Continuing west
    [-8.1250, 115.1900], // Seririt road
    [-8.1300, 115.1700], // West Buleleng
    [-8.1350, 115.1500], // Mountain road
    [-8.1380, 115.1300], // West approach
    [-8.1400, 115.1100], // Pemuteran road
    [-8.1120, 115.0881], // Buleleng Station

    // WEST - Main West Road via Gilimanuk (INLAND ROUTE)
    [-8.1500, 115.0700], // West from station
    [-8.1600, 115.0500], // National park road
    [-8.1700, 115.0300], // Inland west
    [-8.1800, 115.0100], // Continuing west
    [-8.1900, 114.9900], // West route
    [-8.2000, 114.9700], // Gilimanuk road
    [-8.2100, 114.9500], // Approaching port
    [-8.2200, 114.9300], // Gilimanuk inland
    [-8.2300, 114.9100], // Port area road
    [-8.2500, 114.8900], // South from port

    // SOUTHWEST - Jembrana Road (INLAND)
    [-8.2700, 114.8700], // South route
    [-8.2900, 114.8500], // Jembrana approach
    [-8.3100, 114.8300], // West Jembrana
    [-8.3300, 114.8100], // Inland road
    [-8.3400, 114.7900], // Continuing south
    [-8.3500, 114.7700], // Jembrana road
    [-8.3569, 114.7500], // Station approach
    [-8.3600, 114.7300], // Jembrana inland
    [-8.3569, 114.7100], // Near station
    [-8.3569, 114.6900], // Jembrana area
    [-8.3569, 114.6700], // Station road
    [-8.3569, 114.6500], // Approaching
    [-8.3569, 114.6300], // Near Jembrana Station
    [-8.3569, 114.6178], // Jembrana Station
    [-8.3700, 114.6000], // South from station
    [-8.3900, 114.5900], // Inland route
    [-8.4100, 114.5800], // Continuing
    [-8.4300, 114.5700], // Tabanan road

    // SOUTH - Tabanan to Denpasar Road (INLAND)
    [-8.4500, 114.5600], // East from west
    [-8.4600, 114.5800], // Tabanan inland
    [-8.4700, 114.6000], // Main road east
    [-8.4800, 114.6200], // Continuing
    [-8.4900, 114.6400], // Tabanan approach
    [-8.5000, 114.6600], // Road to station
    [-8.5100, 114.6800], // Tabanan area
    [-8.5147, 114.7000], // Near station
    [-8.5147, 114.7200], // Station road
    [-8.5147, 114.7400], // Approaching
    [-8.5147, 114.7600], // Tabanan inland
    [-8.5147, 114.7800], // Near station
    [-8.5147, 114.8000], // Station approach
    [-8.5147, 114.8200], // Tabanan area
    [-8.5147, 114.8400], // East route
    [-8.5147, 114.8600], // Continuing
    [-8.5147, 114.8800], // Canggu road
    [-8.5147, 114.9000], // Inland east
    [-8.5147, 114.9200], // Seminyak road
    [-8.5147, 114.9400], // Kuta approach
    [-8.5147, 114.9600], // Inland route
    [-8.5147, 114.9800], // Near station
    [-8.5147, 114.9967], // Tabanan Station

    // RETURN - Tabanan to Airport via Denpasar (MAIN ROAD)
    [-8.5200, 115.0100], // East from Tabanan
    [-8.5300, 115.0300], // Denpasar road
    [-8.5400, 115.0500], // Inland route
    [-8.5500, 115.0700], // Denpasar approach
    [-8.5600, 115.0900], // City road
    [-8.5700, 115.1100], // Denpasar center
    [-8.5800, 115.1200], // South Denpasar
    [-8.6000, 115.1300], // Airport road
    [-8.6200, 115.1400], // Bypass road
    [-8.6400, 115.1500], // Airport approach
    [-8.6600, 115.1550], // Final approach
    [-8.6800, 115.1600], // Airport area
    [-8.7000, 115.1630], // Airport road
    [-8.7200, 115.1650], // Final stretch
    [-8.7467, 115.1670]  // RETURN: Bandara I Gusti Ngurah Rai
  ],

  segments: [
    { from: "ST01", to: "ST02", distance: 40, estimatedTime: 60, highlights: ["Kuta Coast", "Tanah Lot"] },
    { from: "ST02", to: "ST03", distance: 60, estimatedTime: 80, highlights: ["West Coast Beaches", "Rambut Siwi"] },
    { from: "ST03", to: "ST04", distance: 80, estimatedTime: 100, highlights: ["National Park", "North Coast"] },
    { from: "ST04", to: "ST05", distance: 70, estimatedTime: 90, highlights: ["Volcanic Beaches", "Amed"] },
    { from: "ST05", to: "ST06", distance: 50, estimatedTime: 70, highlights: ["Water Palaces", "East Coast"] },
    { from: "ST06", to: "ST07", distance: 30, estimatedTime: 50, highlights: ["Sanur Sunrise", "Uluwatu Cliffs"] }
  ],

  departureTime: ["06:00", "08:00"],
  operatingDays: ["Daily"],
  included: ["Train ticket", "Checkpoint access", "Meals"],
  notIncluded: ["Tips", "Personal expenses"],
  guidelines: {
    en: ["Arrive 30 mins early", "Wear comfortable clothes"],
    id: ["Tiba 30 menit awal", "Pakaian nyaman"]
  },
  cancellationPolicy: {
    en: "Free cancellation 24h prior",
    id: "Batal gratis 24 jam sebelum"
  }
};

export const getRouteDetails = () => route;
export const getStationById = (id) => route.stations.find(st => st.id === id);
export const getTotalDistance = () => route.distance;
export const getTotalDuration = () => route.duration;
