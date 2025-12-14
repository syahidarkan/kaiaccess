// Demo mode utilities for testing without real GPS

import { route } from '../data/route';

/**
 * Demo journey simulator class
 */
class DemoJourney {
  constructor(routeCoordinates, onLocationUpdate, speed = 1) {
    this.route = routeCoordinates;
    this.onLocationUpdate = onLocationUpdate;
    this.speed = speed; // 1x, 2x, 5x speed
    this.currentIndex = 0;
    this.intervalId = null;
    this.isRunning = false;
  }

  start() {
    if (this.isRunning) return;

    this.isRunning = true;
    const interval = 30000 / this.speed; // Base 30 seconds (diperlambat dari 10 detik) divided by speed

    // Immediately update to first position
    this.updatePosition();

    // Then continue updating
    this.intervalId = setInterval(() => {
      this.updatePosition();

      // Stop at end of route
      if (this.currentIndex >= this.route.length - 1) {
        this.stop();
      }
    }, interval);
  }

  updatePosition() {
    if (this.currentIndex < this.route.length) {
      const position = this.route[this.currentIndex];
      const location = {
        lat: position[0],
        lng: position[1],
        accuracy: 10,
        timestamp: Date.now(),
        isDemo: true,
        progress: ((this.currentIndex + 1) / this.route.length) * 100,
      };

      this.onLocationUpdate(location);
      this.currentIndex++;
    }
  }

  pause() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      this.isRunning = false;
    }
  }

  resume() {
    if (!this.isRunning) {
      this.start();
    }
  }

  stop() {
    this.pause();
    this.currentIndex = 0;
  }

  setSpeed(speed) {
    const wasRunning = this.isRunning;
    this.pause();
    this.speed = speed;
    if (wasRunning) {
      this.start();
    }
  }

  jumpTo(index) {
    this.currentIndex = Math.max(0, Math.min(index, this.route.length - 1));
    this.updatePosition();
  }

  getCurrentProgress() {
    return {
      index: this.currentIndex,
      total: this.route.length,
      percentage: (this.currentIndex / this.route.length) * 100,
    };
  }
}

/**
 * Create a demo journey instance
 * @param {Function} onLocationUpdate - Callback for location updates
 * @param {number} speed - Speed multiplier (1, 2, 5)
 * @returns {DemoJourney}
 */
export const createDemoJourney = (onLocationUpdate, speed = 1) => {
  return new DemoJourney(route.polyline, onLocationUpdate, speed);
};

/**
 * Generate intermediate points between two coordinates
 * @param {Array} start - [lat, lng]
 * @param {Array} end - [lat, lng]
 * @param {number} steps - Number of intermediate points
 * @returns {Array} Array of [lat, lng] coordinates
 */
export const generateIntermediatePoints = (start, end, steps = 10) => {
  const points = [];
  for (let i = 0; i <= steps; i++) {
    const ratio = i / steps;
    const lat = start[0] + (end[0] - start[0]) * ratio;
    const lng = start[1] + (end[1] - start[1]) * ratio;
    points.push([lat, lng]);
  }
  return points;
};

/**
 * Create detailed route with intermediate points
 * @param {Array} routePolyline - Array of [lat, lng] coordinates
 * @param {number} pointsPerSegment - Points to add between each waypoint
 * @returns {Array} Detailed route
 */
export const createDetailedRoute = (routePolyline, pointsPerSegment = 5) => {
  const detailedRoute = [];

  for (let i = 0; i < routePolyline.length - 1; i++) {
    const start = routePolyline[i];
    const end = routePolyline[i + 1];
    const intermediatePoints = generateIntermediatePoints(start, end, pointsPerSegment);

    // Add all points except the last one (to avoid duplicates)
    detailedRoute.push(...intermediatePoints.slice(0, -1));
  }

  // Add the final point
  detailedRoute.push(routePolyline[routePolyline.length - 1]);

  return detailedRoute;
};

/**
 * Get random location near a checkpoint (for testing unlock)
 * @param {Object} checkpoint - Checkpoint with coordinates
 * @param {number} radiusMeters - Radius in meters
 * @returns {Object} {lat, lng}
 */
export const getRandomLocationNear = (checkpoint, radiusMeters = 50) => {
  // Convert meters to degrees (approximate)
  const radiusDegrees = radiusMeters / 111000;

  const angle = Math.random() * 2 * Math.PI;
  const distance = Math.random() * radiusDegrees;

  const lat = checkpoint.coordinates.lat + distance * Math.cos(angle);
  const lng = checkpoint.coordinates.lng + distance * Math.sin(angle);

  return { lat, lng, accuracy: 10, timestamp: Date.now(), isDemo: true };
};

/**
 * Simulate checkpoint unlock sequence
 * @param {Array} checkpoints - Array of checkpoints
 * @param {Function} onUnlock - Callback when checkpoint unlocked
 * @param {number} delayMs - Delay between unlocks in milliseconds
 */
export const simulateUnlockSequence = async (checkpoints, onUnlock, delayMs = 5000) => {
  for (const checkpoint of checkpoints) {
    await new Promise(resolve => setTimeout(resolve, delayMs));
    onUnlock(checkpoint);
  }
};

/**
 * Demo mode presets
 */
export const DEMO_PRESETS = {
  QUICK_TOUR: {
    name: 'Quick Tour',
    speed: 5,
    checkpoints: 5,
    description: 'Fast demo - unlock 5 checkpoints in 2 minutes',
  },
  NORMAL_JOURNEY: {
    name: 'Normal Journey',
    speed: 2,
    checkpoints: 10,
    description: 'Regular speed - explore 10 checkpoints in 10 minutes',
  },
  FULL_EXPERIENCE: {
    name: 'Full Experience',
    speed: 1,
    checkpoints: 15,
    description: 'Complete journey - all checkpoints at normal speed',
  },
  MANUAL_MODE: {
    name: 'Manual Mode',
    speed: 0,
    checkpoints: 0,
    description: 'Manually unlock checkpoints as needed',
  },
};

/**
 * Get demo checkpoint unlock schedule
 * @param {number} totalCheckpoints
 * @param {number} speed
 * @returns {Array} Schedule with timing
 */
export const getDemoUnlockSchedule = (totalCheckpoints, speed = 1) => {
  const baseInterval = 10000 / speed; // Base 10 seconds
  const schedule = [];

  for (let i = 0; i < totalCheckpoints; i++) {
    schedule.push({
      checkpointIndex: i,
      unlockTime: baseInterval * (i + 1),
      formattedTime: formatDemoTime(baseInterval * (i + 1)),
    });
  }

  return schedule;
};

/**
 * Format demo time
 * @param {number} milliseconds
 * @returns {string}
 */
const formatDemoTime = (milliseconds) => {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  if (minutes > 0) {
    return `${minutes}m ${remainingSeconds}s`;
  }
  return `${seconds}s`;
};

/**
 * Generate demo statistics
 * @param {Object} progress
 * @returns {Object} Demo stats
 */
export const getDemoStats = (progress) => {
  return {
    checkpointsUnlocked: progress.checkpointsUnlocked || 0,
    totalCheckpoints: progress.totalCheckpoints || 15,
    progress: progress.percentage || 0,
    estimatedTimeRemaining: progress.estimatedTimeRemaining || 0,
    currentSpeed: progress.speed || 1,
    isDemoMode: true,
  };
};

/**
 * Export demo data for sharing/testing
 * @param {Object} demoSession
 * @returns {string} JSON string
 */
export const exportDemoData = (demoSession) => {
  return JSON.stringify({
    type: 'demo_session',
    timestamp: new Date().toISOString(),
    data: demoSession,
  }, null, 2);
};

/**
 * Load demo data
 * @param {string} jsonString
 * @returns {Object} Demo session data
 */
export const importDemoData = (jsonString) => {
  try {
    const parsed = JSON.parse(jsonString);
    if (parsed.type === 'demo_session') {
      return parsed.data;
    }
    throw new Error('Invalid demo data format');
  } catch (error) {
    console.error('Error importing demo data:', error);
    return null;
  }
};
