// Distance calculation utilities using Haversine formula

/**
 * Calculate distance between two coordinates using Haversine formula
 * @param {number} lat1 - Latitude of point 1
 * @param {number} lon1 - Longitude of point 1
 * @param {number} lat2 - Latitude of point 2
 * @param {number} lon2 - Longitude of point 2
 * @returns {number} Distance in meters
 */
export const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // Distance in meters

  return distance;
};

/**
 * Calculate distance from coordinates object
 * @param {Object} point1 - {lat, lng}
 * @param {Object} point2 - {lat, lng}
 * @returns {number} Distance in meters
 */
export const calculateDistance = (point1, point2) => {
  if (!point1 || !point2 || !point1.lat || !point1.lng || !point2.lat || !point2.lng) {
    return Infinity;
  }
  return haversineDistance(point1.lat, point1.lng, point2.lat, point2.lng);
};

/**
 * Format distance for display
 * @param {number} meters - Distance in meters
 * @returns {string} Formatted distance string
 */
export const formatDistance = (meters) => {
  if (meters < 1000) {
    return `${Math.round(meters)}m`;
  }
  return `${(meters / 1000).toFixed(1)}km`;
};

/**
 * Check if user is within unlock radius of a checkpoint
 * @param {Object} userLocation - {lat, lng}
 * @param {Object} checkpointLocation - {lat, lng}
 * @param {number} radius - Unlock radius in meters
 * @returns {boolean}
 */
export const isWithinRadius = (userLocation, checkpointLocation, radius = 100) => {
  const distance = calculateDistance(userLocation, checkpointLocation);
  return distance <= radius;
};

/**
 * Get nearest checkpoint from user location
 * @param {Object} userLocation - {lat, lng}
 * @param {Array} checkpoints - Array of checkpoint objects
 * @returns {Object} Nearest checkpoint with distance
 */
export const getNearestCheckpoint = (userLocation, checkpoints) => {
  if (!userLocation || !checkpoints || checkpoints.length === 0) {
    return null;
  }

  let nearest = null;
  let minDistance = Infinity;

  checkpoints.forEach(checkpoint => {
    const distance = calculateDistance(userLocation, checkpoint.coordinates);
    if (distance < minDistance) {
      minDistance = distance;
      nearest = checkpoint;
    }
  });

  return {
    checkpoint: nearest,
    distance: minDistance,
    formattedDistance: formatDistance(minDistance),
  };
};

/**
 * Sort checkpoints by distance from user location
 * @param {Object} userLocation - {lat, lng}
 * @param {Array} checkpoints - Array of checkpoint objects
 * @returns {Array} Sorted checkpoints with distance
 */
export const sortCheckpointsByDistance = (userLocation, checkpoints) => {
  if (!userLocation || !checkpoints) {
    return checkpoints;
  }

  return checkpoints
    .map(checkpoint => ({
      ...checkpoint,
      distance: calculateDistance(userLocation, checkpoint.coordinates),
    }))
    .sort((a, b) => a.distance - b.distance);
};

/**
 * Get checkpoints within a certain range
 * @param {Object} userLocation - {lat, lng}
 * @param {Array} checkpoints - Array of checkpoint objects
 * @param {number} maxDistance - Maximum distance in meters
 * @returns {Array} Checkpoints within range
 */
export const getCheckpointsWithinRange = (userLocation, checkpoints, maxDistance = 5000) => {
  if (!userLocation || !checkpoints) {
    return [];
  }

  return checkpoints
    .map(checkpoint => ({
      ...checkpoint,
      distance: calculateDistance(userLocation, checkpoint.coordinates),
    }))
    .filter(checkpoint => checkpoint.distance <= maxDistance)
    .sort((a, b) => a.distance - b.distance);
};

/**
 * Calculate bearing/direction from one point to another
 * @param {Object} point1 - {lat, lng}
 * @param {Object} point2 - {lat, lng}
 * @returns {number} Bearing in degrees (0-360)
 */
export const calculateBearing = (point1, point2) => {
  const φ1 = (point1.lat * Math.PI) / 180;
  const φ2 = (point2.lat * Math.PI) / 180;
  const Δλ = ((point2.lng - point1.lng) * Math.PI) / 180;

  const y = Math.sin(Δλ) * Math.cos(φ2);
  const x =
    Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);

  const θ = Math.atan2(y, x);
  const bearing = ((θ * 180) / Math.PI + 360) % 360;

  return bearing;
};

/**
 * Convert bearing to cardinal direction
 * @param {number} bearing - Bearing in degrees
 * @returns {string} Cardinal direction (N, NE, E, etc.)
 */
export const bearingToDirection = (bearing) => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(bearing / 45) % 8;
  return directions[index];
};

/**
 * Get direction text from user to checkpoint
 * @param {Object} userLocation - {lat, lng}
 * @param {Object} checkpointLocation - {lat, lng}
 * @returns {Object} {bearing, direction, distance}
 */
export const getDirectionTo = (userLocation, checkpointLocation) => {
  const bearing = calculateBearing(userLocation, checkpointLocation);
  const direction = bearingToDirection(bearing);
  const distance = calculateDistance(userLocation, checkpointLocation);

  return {
    bearing,
    direction,
    distance,
    formattedDistance: formatDistance(distance),
  };
};
