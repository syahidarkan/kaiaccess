// Simulated GPS tracking for Kereta Eksplorasi Bali route

import { route } from '../data/route';

// Train speed configuration
const TRAIN_SPEED_KM_H = 40; // Average train speed in km/h
const UPDATE_INTERVAL_MS = 2000; // Update every 2 seconds
const DISTANCE_PER_UPDATE = (TRAIN_SPEED_KM_H / 3600) * (UPDATE_INTERVAL_MS / 1000); // km per update

/**
 * Calculate distance between two coordinates using Haversine formula
 * @param {Object} coord1 - {lat, lng}
 * @param {Object} coord2 - {lat, lng}
 * @returns {number} Distance in kilometers
 */
function calculateDistance(coord1, coord2) {
  const R = 6371; // Earth's radius in km
  const dLat = (coord2.lat - coord1.lat) * Math.PI / 180;
  const dLon = (coord2.lng - coord1.lng) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(coord1.lat * Math.PI / 180) *
    Math.cos(coord2.lat * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Interpolate between two points
 * @param {Array} point1 - [lat, lng]
 * @param {Array} point2 - [lat, lng]
 * @param {number} fraction - 0 to 1
 * @returns {Object} {lat, lng}
 */
function interpolate(point1, point2, fraction) {
  return {
    lat: point1[0] + (point2[0] - point1[0]) * fraction,
    lng: point1[1] + (point2[1] - point1[1]) * fraction
  };
}

/**
 * Route Simulator Class
 */
export class RouteSimulator {
  constructor(onLocationUpdate) {
    this.polyline = route.polyline;
    this.currentIndex = 0;
    this.fraction = 0;
    this.onLocationUpdate = onLocationUpdate;
    this.intervalId = null;
    this.isRunning = false;
    this.totalDistance = 0;
    this.speed = TRAIN_SPEED_KM_H;
  }

  /**
   * Start the simulation
   */
  start() {
    if (this.isRunning) return;

    this.isRunning = true;

    // Send initial position
    this.updatePosition();

    // Start periodic updates
    this.intervalId = setInterval(() => {
      this.updatePosition();
    }, UPDATE_INTERVAL_MS);
  }

  /**
   * Stop the simulation
   */
  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isRunning = false;
  }

  /**
   * Reset simulation to start
   */
  reset() {
    this.stop();
    this.currentIndex = 0;
    this.fraction = 0;
    this.totalDistance = 0;
  }

  /**
   * Update current position along the route
   */
  updatePosition() {
    if (this.currentIndex >= this.polyline.length - 1) {
      // Route completed, loop back to start
      this.currentIndex = 0;
      this.fraction = 0;
      this.totalDistance = 0;
    }

    const currentPoint = this.polyline[this.currentIndex];
    const nextPoint = this.polyline[this.currentIndex + 1];

    // Calculate distance to next waypoint
    const segmentDistance = calculateDistance(
      { lat: currentPoint[0], lng: currentPoint[1] },
      { lat: nextPoint[0], lng: nextPoint[1] }
    );

    // Calculate how much of this segment we traverse in one update
    const fractionIncrement = DISTANCE_PER_UPDATE / segmentDistance;

    this.fraction += fractionIncrement;

    // Move to next segment if we've completed this one
    if (this.fraction >= 1.0) {
      this.currentIndex++;
      this.fraction = 0;
      this.totalDistance += segmentDistance;

      // Check if we've reached the end
      if (this.currentIndex >= this.polyline.length - 1) {
        this.currentIndex = this.polyline.length - 2;
        this.fraction = 1.0;
      }
    }

    // Get current position by interpolating
    const position = interpolate(
      this.polyline[this.currentIndex],
      this.polyline[this.currentIndex + 1],
      this.fraction
    );

    // Calculate heading (bearing to next point)
    const heading = this.calculateBearing(
      this.polyline[this.currentIndex],
      this.polyline[this.currentIndex + 1]
    );

    // Send update with realistic GPS data
    const locationData = {
      lat: position.lat,
      lng: position.lng,
      accuracy: 15 + Math.random() * 10, // Realistic GPS accuracy 15-25m
      heading: heading,
      speed: this.speed / 3.6, // Convert km/h to m/s
      timestamp: Date.now(),
      isSimulated: true,
      progress: {
        currentIndex: this.currentIndex,
        totalWaypoints: this.polyline.length,
        distanceTraveled: this.totalDistance,
        totalDistance: route.distance
      }
    };

    this.onLocationUpdate(locationData);
  }

  /**
   * Calculate bearing between two points
   * @param {Array} point1 - [lat, lng]
   * @param {Array} point2 - [lat, lng]
   * @returns {number} Bearing in degrees
   */
  calculateBearing(point1, point2) {
    const lat1 = point1[0] * Math.PI / 180;
    const lat2 = point2[0] * Math.PI / 180;
    const dLon = (point2[1] - point1[1]) * Math.PI / 180;

    const y = Math.sin(dLon) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) -
              Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);

    let bearing = Math.atan2(y, x) * 180 / Math.PI;
    bearing = (bearing + 360) % 360; // Normalize to 0-360

    return bearing;
  }

  /**
   * Set simulation speed
   * @param {number} speedKmH - Speed in km/h
   */
  setSpeed(speedKmH) {
    this.speed = speedKmH;
  }

  /**
   * Jump to specific waypoint
   * @param {number} index - Waypoint index
   */
  jumpToWaypoint(index) {
    if (index >= 0 && index < this.polyline.length) {
      this.currentIndex = index;
      this.fraction = 0;
      this.updatePosition();
    }
  }

  /**
   * Get current progress percentage
   * @returns {number} Progress 0-100
   */
  getProgress() {
    const totalWaypoints = this.polyline.length;
    const currentProgress = this.currentIndex + this.fraction;
    return (currentProgress / totalWaypoints) * 100;
  }
}

/**
 * Create and start a new route simulator
 * @param {Function} onLocationUpdate - Callback for position updates
 * @returns {RouteSimulator} Simulator instance
 */
export function startRouteSimulation(onLocationUpdate) {
  const simulator = new RouteSimulator(onLocationUpdate);
  simulator.start();
  return simulator;
}

/**
 * Get simulated position at specific progress percentage
 * @param {number} progressPercent - 0-100
 * @returns {Object} {lat, lng}
 */
export function getPositionAtProgress(progressPercent) {
  const polyline = route.polyline;
  const totalWaypoints = polyline.length;
  const targetProgress = (progressPercent / 100) * totalWaypoints;

  const index = Math.floor(targetProgress);
  const fraction = targetProgress - index;

  if (index >= polyline.length - 1) {
    return {
      lat: polyline[polyline.length - 1][0],
      lng: polyline[polyline.length - 1][1]
    };
  }

  return interpolate(polyline[index], polyline[index + 1], fraction);
}
