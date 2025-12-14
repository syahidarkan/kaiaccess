import { create } from 'zustand';
import {
  saveActiveJourney,
  getActiveJourney,
  clearActiveJourney as clearStoredJourney,
} from '../utils/storage';

export const useJourneyStore = create((set, get) => ({
  activeJourney: getActiveJourney(),
  currentLocation: null,
  locationWatchId: null,
  isTracking: false,

  startJourney: (bookingId) => {
    const startTime = new Date();
    const endTime = new Date(startTime.getTime() + 5 * 60 * 60 * 1000); // 5 hours from start

    const journey = {
      bookingId,
      startedAt: startTime.toISOString(),
      endAt: endTime.toISOString(),
      currentLocation: null,
      unlockedCheckpoints: [],
      progress: 0,
    };

    saveActiveJourney(journey);
    set({ activeJourney: journey, isTracking: true });
    return journey;
  },

  isJourneyActive: () => {
    const journey = get().activeJourney;
    if (!journey) return false;

    const now = new Date();
    const startTime = new Date(journey.startedAt);
    const endTime = new Date(journey.endAt);

    return now >= startTime && now <= endTime;
  },

  updateLocation: (location) => {
    const journey = get().activeJourney;
    if (journey) {
      const updated = { ...journey, currentLocation: location };
      saveActiveJourney(updated);
      set({ activeJourney: updated, currentLocation: location });
    } else {
      set({ currentLocation: location });
    }
  },

  setLocationWatchId: (watchId) => set({ locationWatchId: watchId }),

  endJourney: () => {
    clearStoredJourney();
    set({ activeJourney: null, isTracking: false, currentLocation: null });
  },

  refreshJourney: () => set({ activeJourney: getActiveJourney() }),
}));
