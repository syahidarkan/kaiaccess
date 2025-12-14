import { create } from 'zustand';
import { checkpoints } from '../data/checkpoints';
import {
  unlockCheckpoint as unlockInStorage,
  getUnlockedCheckpoints,
  isCheckpointUnlocked,
} from '../utils/storage';

export const useCheckpointStore = create((set, get) => ({
  checkpoints,
  unlockedCheckpoints: getUnlockedCheckpoints(),

  unlockCheckpoint: (checkpointId) => {
    unlockInStorage(checkpointId);
    set({ unlockedCheckpoints: getUnlockedCheckpoints() });
  },

  isUnlocked: (checkpointId) => {
    return isCheckpointUnlocked(checkpointId);
  },

  getCheckpointById: (id) => {
    return checkpoints.find(cp => cp.id === id);
  },

  getUnlockedCount: () => {
    return Object.keys(get().unlockedCheckpoints).length;
  },

  refreshCheckpoints: () => {
    set({ unlockedCheckpoints: getUnlockedCheckpoints() });
  },
}));
