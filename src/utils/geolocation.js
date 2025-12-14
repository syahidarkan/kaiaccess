// Geolocation utilities with permission handling

/**
 * Check if geolocation is supported
 */
export const isGeolocationSupported = () => {
  return 'geolocation' in navigator;
};

/**
 * Request geolocation permission and get current position
 * @returns {Promise<{lat, lng, accuracy}>}
 */
export const getCurrentPosition = () => {
  return new Promise((resolve, reject) => {
    if (!isGeolocationSupported()) {
      reject(new Error('Geolocation is not supported by this browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp,
        });
      },
      (error) => {
        reject(getGeolocationError(error));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  });
};

/**
 * Watch user position with continuous updates
 * @param {Function} onSuccess - Callback for position updates
 * @param {Function} onError - Callback for errors
 * @returns {number} Watch ID for clearing
 */
export const watchPosition = (onSuccess, onError) => {
  if (!isGeolocationSupported()) {
    onError(new Error('Geolocation is not supported'));
    return null;
  }

  const watchId = navigator.geolocation.watchPosition(
    (position) => {
      onSuccess({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        accuracy: position.coords.accuracy,
        heading: position.coords.heading,
        speed: position.coords.speed,
        timestamp: position.timestamp,
      });
    },
    (error) => {
      onError(getGeolocationError(error));
    },
    {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 5000,
    }
  );

  return watchId;
};

/**
 * Clear position watch
 * @param {number} watchId
 */
export const clearWatch = (watchId) => {
  if (watchId !== null && isGeolocationSupported()) {
    navigator.geolocation.clearWatch(watchId);
  }
};

/**
 * Get human-readable error message
 * @param {GeolocationPositionError} error
 * @returns {Error}
 */
const getGeolocationError = (error) => {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      return new Error(
        'Location permission denied. Please enable location access in your browser settings.'
      );
    case error.POSITION_UNAVAILABLE:
      return new Error(
        'Location information unavailable. Please check your device settings.'
      );
    case error.TIMEOUT:
      return new Error(
        'Location request timed out. Please try again.'
      );
    default:
      return new Error('An unknown error occurred while getting your location.');
  }
};

/**
 * Check geolocation permission status (if supported)
 * @returns {Promise<string>} Permission state: 'granted', 'denied', 'prompt'
 */
export const checkPermission = async () => {
  if (!navigator.permissions) {
    return 'unknown';
  }

  try {
    const result = await navigator.permissions.query({ name: 'geolocation' });
    return result.state;
  } catch (error) {
    return 'unknown';
  }
};

/**
 * Request permission with user-friendly prompt
 * @returns {Promise<boolean>} True if permission granted
 */
export const requestPermission = async () => {
  try {
    const position = await getCurrentPosition();
    return !!position;
  } catch (error) {
    console.error('Permission request failed:', error);
    return false;
  }
};

/**
 * Get geolocation with retry logic
 * @param {number} maxRetries
 * @returns {Promise<{lat, lng, accuracy}>}
 */
export const getPositionWithRetry = async (maxRetries = 3) => {
  let lastError;

  for (let i = 0; i < maxRetries; i++) {
    try {
      const position = await getCurrentPosition();
      return position;
    } catch (error) {
      lastError = error;
      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }

  throw lastError;
};

/**
 * Mock location for testing (simulates movement along a path)
 * @param {Array} route - Array of {lat, lng} coordinates
 * @param {number} index - Current position index
 * @returns {Object} Location object
 */
export const getMockLocation = (route, index) => {
  const position = route[index % route.length];
  return {
    lat: position[0],
    lng: position[1],
    accuracy: 10,
    timestamp: Date.now(),
    isMock: true,
  };
};

/**
 * Bali boundaries for validation
 */
const BALI_BOUNDS = {
  north: -8.0,
  south: -8.9,
  west: 114.4,
  east: 115.7,
};

/**
 * Check if coordinates are within Bali
 * @param {number} lat
 * @param {number} lng
 * @returns {boolean}
 */
export const isInBali = (lat, lng) => {
  return (
    lat >= BALI_BOUNDS.south &&
    lat <= BALI_BOUNDS.north &&
    lng >= BALI_BOUNDS.west &&
    lng <= BALI_BOUNDS.east
  );
};

/**
 * Validate location accuracy
 * @param {number} accuracy - Accuracy in meters
 * @returns {Object} {isAccurate, level, message}
 */
export const validateAccuracy = (accuracy) => {
  if (accuracy <= 50) {
    return {
      isAccurate: true,
      level: 'excellent',
      message: 'Excellent GPS accuracy',
    };
  } else if (accuracy <= 100) {
    return {
      isAccurate: true,
      level: 'good',
      message: 'Good GPS accuracy',
    };
  } else if (accuracy <= 500) {
    return {
      isAccurate: true,
      level: 'fair',
      message: 'Fair GPS accuracy',
    };
  } else {
    return {
      isAccurate: false,
      level: 'poor',
      message: 'Poor GPS accuracy. Please move to an open area.',
    };
  }
};
