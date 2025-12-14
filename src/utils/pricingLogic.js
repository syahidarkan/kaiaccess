// Dynamic Pricing Logic for Kereta Eksplorasi Bali

// Indonesian Holidays & High Season Dates (2025)
const SEASONAL_DATES = [
  // Tahun Baru
  { start: '2025-01-01', end: '2025-01-01' },
  // Imlek
  { start: '2025-01-29', end: '2025-01-29' },
  // Nyepi (Tahun Baru Saka)
  { start: '2025-03-29', end: '2025-03-30' },
  // Idul Fitri & Cuti Bersama
  { start: '2025-03-29', end: '2025-04-07' },
  // Hari Buruh
  { start: '2025-05-01', end: '2025-05-01' },
  // Kenaikan Isa Al-Masih
  { start: '2025-05-29', end: '2025-05-29' },
  // Waisak
  { start: '2025-06-01', end: '2025-06-01' },
  // Idul Adha & Cuti Bersama
  { start: '2025-06-06', end: '2025-06-09' },
  // Tahun Baru Islam
  { start: '2025-06-27', end: '2025-06-27' },
  // HUT RI
  { start: '2025-08-17', end: '2025-08-17' },
  // Maulid Nabi Muhammad
  { start: '2025-09-05', end: '2025-09-05' },
  // Natal & Tahun Baru
  { start: '2025-12-24', end: '2025-12-31' },

  // High Season (Peak Tourism Periods in Bali)
  { start: '2025-06-15', end: '2025-07-15' }, // Mid-year school holiday
  { start: '2025-07-01', end: '2025-08-20' }, // International summer season
];

// Base Prices per Class (Weekday)
export const BASE_PRICES = {
  Eksekutif: 500000,  // Weekday base
  Bisnis: 400000,     // Weekday base
  Ekonomi: 300000     // Weekday base
};

// Price Multipliers
const PRICE_MULTIPLIERS = {
  weekday: 1.0,      // Mon-Thu: Base price (Rp 500,000 for Eksekutif)
  weekend: 1.3,      // Fri-Sun: +30% (Rp 650,000 for Eksekutif)
  seasonal: 2.0      // Holidays/High Season: +100% (Rp 1,000,000 for Eksekutif)
};

/**
 * Check if a date falls within seasonal/holiday period
 * @param {string} dateString - Date in YYYY-MM-DD format
 * @returns {boolean}
 */
function isSeasonalDate(dateString) {
  const date = new Date(dateString);

  for (const period of SEASONAL_DATES) {
    const start = new Date(period.start);
    const end = new Date(period.end);

    if (date >= start && date <= end) {
      return true;
    }
  }

  return false;
}

/**
 * Check if a date is a weekend (Friday-Sunday in Indonesia)
 * @param {string} dateString - Date in YYYY-MM-DD format
 * @returns {boolean}
 */
function isWeekend(dateString) {
  const date = new Date(dateString);
  const dayOfWeek = date.getDay();

  // In Indonesia, weekend is typically Friday-Sunday
  // 0 = Sunday, 5 = Friday, 6 = Saturday
  return dayOfWeek === 0 || dayOfWeek === 5 || dayOfWeek === 6;
}

/**
 * Get price type for a given date
 * @param {string} dateString - Date in YYYY-MM-DD format
 * @returns {'seasonal' | 'weekend' | 'weekday'}
 */
export function getPriceType(dateString) {
  if (!dateString) return 'weekday';

  if (isSeasonalDate(dateString)) {
    return 'seasonal';
  }

  if (isWeekend(dateString)) {
    return 'weekend';
  }

  return 'weekday';
}

/**
 * Calculate dynamic price based on date and carriage class
 * @param {string} carriageClass - 'Eksekutif' | 'Bisnis' | 'Ekonomi'
 * @param {string} dateString - Date in YYYY-MM-DD format
 * @returns {number} - Price in Rupiah
 */
export function calculatePrice(carriageClass, dateString) {
  const basePrice = BASE_PRICES[carriageClass] || BASE_PRICES.Ekonomi;
  const priceType = getPriceType(dateString);
  const multiplier = PRICE_MULTIPLIERS[priceType];

  return Math.round(basePrice * multiplier);
}

/**
 * Get price label/badge for display
 * @param {string} dateString - Date in YYYY-MM-DD format
 * @returns {{ label: string, color: string, multiplier: string }}
 */
export function getPriceLabel(dateString) {
  const priceType = getPriceType(dateString);

  switch (priceType) {
    case 'seasonal':
      return {
        label: 'High Season / Holiday',
        color: 'error',
        multiplier: '+100%'
      };
    case 'weekend':
      return {
        label: 'Weekend',
        color: 'warning',
        multiplier: '+30%'
      };
    case 'weekday':
    default:
      return {
        label: 'Weekday',
        color: 'success',
        multiplier: 'Normal'
      };
  }
}

/**
 * Get all prices for a date (for all carriage classes)
 * @param {string} dateString - Date in YYYY-MM-DD format
 * @returns {{ Eksekutif: number, Bisnis: number, Ekonomi: number }}
 */
export function getAllPrices(dateString) {
  return {
    Eksekutif: calculatePrice('Eksekutif', dateString),
    Bisnis: calculatePrice('Bisnis', dateString),
    Ekonomi: calculatePrice('Ekonomi', dateString)
  };
}
