import { create } from 'zustand';
import {
  getUser,
  updateUser as updateStoredUser,
  updateUserSettings as updateStoredSettings,
  toggleDemoMode as toggleStoredDemoMode,
  isDemoModeEnabled,
  getEarnedBadges,
  awardBadge as awardStoredBadge,
  hasBadge as hasStoredBadge,
} from '../utils/storage';

export const useUserStore = create((set, get) => ({
  user: getUser(),
  earnedBadges: getEarnedBadges(),

  updateUser: (updates) => {
    updateStoredUser(updates);
    set({ user: getUser() });
  },

  updateSettings: (settings) => {
    updateStoredSettings(settings);
    set({ user: getUser() });
  },

  toggleDemoMode: () => {
    toggleStoredDemoMode();
    set({ user: getUser() });
  },

  isDemoMode: () => isDemoModeEnabled(),

  awardBadge: (badgeId) => {
    awardStoredBadge(badgeId);
    set({ earnedBadges: getEarnedBadges() });
  },

  hasBadge: (badgeId) => hasStoredBadge(badgeId),

  refreshUser: () => {
    set({ user: getUser(), earnedBadges: getEarnedBadges() });
  },
}));
