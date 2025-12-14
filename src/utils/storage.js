// LocalStorage utility with error handling and versioning

const STORAGE_VERSION = '1.0.0';
const STORAGE_PREFIX = 'kai_bali_';

// Storage keys
export const STORAGE_KEYS = {
  BOOKINGS: `${STORAGE_PREFIX}bookings`,
  ACTIVE_JOURNEY: `${STORAGE_PREFIX}active_journey`,
  CHECKPOINTS: `${STORAGE_PREFIX}checkpoints`,
  BADGES: `${STORAGE_PREFIX}badges`,
  USER: `${STORAGE_PREFIX}user`,
  VERSION: `${STORAGE_PREFIX}version`,
};

// Check if localStorage is available
const isLocalStorageAvailable = () => {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
};

// Initialize storage with version check
export const initializeStorage = () => {
  if (!isLocalStorageAvailable()) {
    console.warn('LocalStorage is not available');
    return false;
  }

  const currentVersion = localStorage.getItem(STORAGE_KEYS.VERSION);

  if (!currentVersion) {
    // First time initialization
    localStorage.setItem(STORAGE_KEYS.VERSION, STORAGE_VERSION);
    setItem(STORAGE_KEYS.BOOKINGS, []);
    setItem(STORAGE_KEYS.ACTIVE_JOURNEY, null);
    setItem(STORAGE_KEYS.CHECKPOINTS, {});
    setItem(STORAGE_KEYS.BADGES, []);
    setItem(STORAGE_KEYS.USER, {
      name: '',
      email: '',
      totalJourneys: 0,
      totalCheckpoints: 0,
      favoriteCheckpoints: [],
      settings: {
        demoMode: false,
        language: 'en',
        notifications: true,
      },
    });
  }

  return true;
};

// Generic get item with JSON parsing
export const getItem = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from storage (${key}):`, error);
    return defaultValue;
  }
};

// Generic set item with JSON stringification
export const setItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error writing to storage (${key}):`, error);
    if (error.name === 'QuotaExceededError') {
      alert('Storage quota exceeded. Please clear some data.');
    }
    return false;
  }
};

// Remove item
export const removeItem = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing from storage (${key}):`, error);
    return false;
  }
};

// Clear all app data
export const clearAllData = () => {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    initializeStorage();
    return true;
  } catch (error) {
    console.error('Error clearing storage:', error);
    return false;
  }
};

// Export all data as JSON
export const exportData = () => {
  try {
    const data = {};
    Object.entries(STORAGE_KEYS).forEach(([name, key]) => {
      data[name] = getItem(key);
    });
    return JSON.stringify(data, null, 2);
  } catch (error) {
    console.error('Error exporting data:', error);
    return null;
  }
};

// Import data from JSON
export const importData = (jsonString) => {
  try {
    const data = JSON.parse(jsonString);
    Object.entries(data).forEach(([name, value]) => {
      const key = STORAGE_KEYS[name];
      if (key) {
        setItem(key, value);
      }
    });
    return true;
  } catch (error) {
    console.error('Error importing data:', error);
    return false;
  }
};

// Get storage usage
export const getStorageUsage = () => {
  try {
    let total = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        total += localStorage[key].length + key.length;
      }
    }
    return {
      used: total,
      usedKB: (total / 1024).toFixed(2),
      usedMB: (total / 1024 / 1024).toFixed(2),
    };
  } catch (error) {
    console.error('Error calculating storage usage:', error);
    return null;
  }
};

// Booking-specific utilities
export const saveBooking = (booking) => {
  const bookings = getItem(STORAGE_KEYS.BOOKINGS, []);
  bookings.push(booking);
  return setItem(STORAGE_KEYS.BOOKINGS, bookings);
};

export const getBookings = () => {
  return getItem(STORAGE_KEYS.BOOKINGS, []);
};

export const getBookingById = (bookingId) => {
  const bookings = getBookings();
  return bookings.find(b => b.id === bookingId);
};

export const deleteBooking = (bookingId) => {
  const bookings = getBookings();
  const filtered = bookings.filter(b => b.id !== bookingId);
  return setItem(STORAGE_KEYS.BOOKINGS, filtered);
};

// Journey-specific utilities
export const saveActiveJourney = (journey) => {
  return setItem(STORAGE_KEYS.ACTIVE_JOURNEY, journey);
};

export const getActiveJourney = () => {
  return getItem(STORAGE_KEYS.ACTIVE_JOURNEY);
};

export const clearActiveJourney = () => {
  return setItem(STORAGE_KEYS.ACTIVE_JOURNEY, null);
};

// Checkpoint-specific utilities
export const unlockCheckpoint = (checkpointId) => {
  const checkpoints = getItem(STORAGE_KEYS.CHECKPOINTS, {});
  checkpoints[checkpointId] = {
    unlockedAt: new Date().toISOString(),
    visited: true,
  };
  return setItem(STORAGE_KEYS.CHECKPOINTS, checkpoints);
};

export const getUnlockedCheckpoints = () => {
  return getItem(STORAGE_KEYS.CHECKPOINTS, {});
};

export const isCheckpointUnlocked = (checkpointId) => {
  const checkpoints = getUnlockedCheckpoints();
  return !!checkpoints[checkpointId];
};

// Badge-specific utilities
export const awardBadge = (badgeId) => {
  const badges = getItem(STORAGE_KEYS.BADGES, []);
  if (!badges.includes(badgeId)) {
    badges.push(badgeId);
    return setItem(STORAGE_KEYS.BADGES, badges);
  }
  return true;
};

export const getEarnedBadges = () => {
  return getItem(STORAGE_KEYS.BADGES, []);
};

export const hasBadge = (badgeId) => {
  const badges = getEarnedBadges();
  return badges.includes(badgeId);
};

// User-specific utilities
export const updateUser = (updates) => {
  const user = getItem(STORAGE_KEYS.USER, {});
  const updated = { ...user, ...updates };
  return setItem(STORAGE_KEYS.USER, updated);
};

export const getUser = () => {
  return getItem(STORAGE_KEYS.USER, {
    settings: { demoMode: false, language: 'en', notifications: true }
  });
};

export const updateUserSettings = (settings) => {
  const user = getUser();
  user.settings = { ...user.settings, ...settings };
  return setItem(STORAGE_KEYS.USER, user);
};

export const toggleDemoMode = () => {
  const user = getUser();
  user.settings.demoMode = !user.settings.demoMode;
  return setItem(STORAGE_KEYS.USER, user);
};

export const isDemoModeEnabled = () => {
  const user = getUser();
  return user.settings?.demoMode || false;
};
