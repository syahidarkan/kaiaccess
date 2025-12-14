// Date and time utilities using date-fns

import {
  format,
  formatDistance,
  formatRelative,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  addDays,
  isAfter,
  isBefore,
  parseISO,
  startOfDay,
} from 'date-fns';
import { id as idLocale, enUS } from 'date-fns/locale';

/**
 * Format date for display
 * @param {Date|string} date
 * @param {string} formatString
 * @param {string} locale
 * @returns {string}
 */
export const formatDate = (date, formatString = 'PPP', locale = 'en') => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  const localeObj = locale === 'id' ? idLocale : enUS;
  return format(dateObj, formatString, { locale: localeObj });
};

/**
 * Format time for display
 * @param {Date|string} date
 * @param {boolean} use24Hour
 * @returns {string}
 */
export const formatTime = (date, use24Hour = true) => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, use24Hour ? 'HH:mm' : 'h:mm a');
};

/**
 * Format date and time
 * @param {Date|string} date
 * @param {string} locale
 * @returns {string}
 */
export const formatDateTime = (date, locale = 'en') => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  const localeObj = locale === 'id' ? idLocale : enUS;
  return format(dateObj, 'PPP p', { locale: localeObj });
};

/**
 * Format relative time (e.g., "2 hours ago", "in 3 days")
 * @param {Date|string} date
 * @param {string} locale
 * @returns {string}
 */
export const formatRelativeTime = (date, locale = 'en') => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  const localeObj = locale === 'id' ? idLocale : enUS;
  return formatRelative(dateObj, new Date(), { locale: localeObj });
};

/**
 * Format distance to now (e.g., "about 2 hours")
 * @param {Date|string} date
 * @param {string} locale
 * @returns {string}
 */
export const formatDistanceToNow = (date, locale = 'en') => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  const localeObj = locale === 'id' ? idLocale : enUS;
  return formatDistance(dateObj, new Date(), { addSuffix: true, locale: localeObj });
};

/**
 * Check if booking date is valid (1-90 days from now)
 * @param {Date|string} date
 * @returns {Object} {isValid, message}
 */
export const validateBookingDate = (date) => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  const today = startOfDay(new Date());
  const maxDate = addDays(today, 90);
  const daysDiff = differenceInDays(dateObj, today);

  if (isBefore(dateObj, today)) {
    return {
      isValid: false,
      message: 'Cannot book for past dates',
    };
  }

  if (isAfter(dateObj, maxDate)) {
    return {
      isValid: false,
      message: 'Can only book up to 90 days in advance',
    };
  }

  return {
    isValid: true,
    message: 'Date is valid',
    daysFromNow: daysDiff,
  };
};


/**
 * Generate time slots
 * @param {Array} times - Array of time strings (HH:mm)
 * @returns {Array} Array of time slot objects
 */
export const generateTimeSlots = (times = ['06:00', '08:00', '10:00']) => {
  return times.map(time => ({
    value: time,
    label: time,
    label12h: format(parseTimeString(time), 'h:mm a'),
    available: true,
  }));
};

/**
 * Parse time string to Date object (today's date with specified time)
 * @param {string} timeString - Time string (HH:mm)
 * @returns {Date}
 */
const parseTimeString = (timeString) => {
  const [hours, minutes] = timeString.split(':').map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
};

/**
 * Get disabled dates for date picker
 * @returns {Array} Array of Date objects to disable
 */
export const getDisabledDates = () => {
  const disabled = [];
  const today = startOfDay(new Date());

  // Disable past dates
  for (let i = 1; i <= 365; i++) {
    disabled.push(addDays(today, -i));
  }

  // Disable dates > 90 days from now
  for (let i = 91; i <= 365; i++) {
    disabled.push(addDays(today, i));
  }

  return disabled;
};

/**
 * Calculate journey countdown
 * @param {string} bookingDate
 * @param {string} bookingTime
 * @returns {Object} Countdown object
 */
export const getJourneyCountdown = (bookingDate, bookingTime) => {
  const [bookingHours, bookingMinutes] = bookingTime.split(':').map(Number);
  const journeyDate = new Date(bookingDate);
  journeyDate.setHours(bookingHours, bookingMinutes, 0, 0);

  const now = new Date();
  const totalMinutes = differenceInMinutes(journeyDate, now);

  if (totalMinutes < 0) {
    return {
      isPast: true,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      total: 0,
    };
  }

  const days = Math.floor(totalMinutes / (24 * 60));
  const hours = Math.floor((totalMinutes % (24 * 60)) / 60);
  const mins = totalMinutes % 60;

  return {
    isPast: false,
    days,
    hours,
    minutes: mins,
    total: totalMinutes,
    formatted: days > 0
      ? `${days}d ${hours}h ${mins}m`
      : hours > 0
      ? `${hours}h ${mins}m`
      : `${mins}m`,
  };
};

/**
 * Check if date is available for booking
 * @param {Date} date
 * @returns {boolean}
 */
export const isDateAvailable = (date) => {
  const today = startOfDay(new Date());
  const maxDate = addDays(today, 90);

  return !isBefore(date, today) && !isAfter(date, maxDate);
};

/**
 * Format duration in minutes to human readable
 * @param {number} minutes
 * @returns {string}
 */
export const formatDuration = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) {
    return `${mins} minutes`;
  }
  if (mins === 0) {
    return `${hours} hour${hours > 1 ? 's' : ''}`;
  }
  return `${hours} hour${hours > 1 ? 's' : ''} ${mins} minutes`;
};

/**
 * Check journey status and determine if it can be accessed
 * @param {string} bookingDate - Date string
 * @param {string} bookingTime - Time string (HH:mm)
 * @returns {Object} Status object with isActive, status, and message
 */
export const checkJourneyStatus = (bookingDate, bookingTime) => {
  const [bookingHours, bookingMinutes] = bookingTime.split(':').map(Number);
  const journeyDate = new Date(bookingDate);
  journeyDate.setHours(bookingHours, bookingMinutes, 0, 0);

  const now = new Date();
  const diffMinutes = differenceInMinutes(journeyDate, now);
  const diffHours = differenceInHours(journeyDate, now);

  // Journey is in the future (more than 2 hours away)
  if (diffHours > 2) {
    return {
      isActive: false,
      status: 'upcoming',
      message: 'Journey starts in ' + formatDistanceToNow(journeyDate),
    };
  }

  // Journey is starting soon (within 2 hours before)
  if (diffMinutes > 0 && diffMinutes <= 120) {
    return {
      isActive: true,
      status: 'ready',
      message: 'Journey starting soon! You can access it now.',
    };
  }

  // Journey time has arrived (within 24 hours after scheduled time)
  // This gives a 24-hour grace period for testing/demo
  const hoursSinceStart = Math.abs(diffHours);
  if (diffMinutes <= 0 && hoursSinceStart <= 24) {
    return {
      isActive: true,
      status: 'active',
      message: 'Journey is active!',
    };
  }

  // Journey has ended (more than 24 hours past)
  return {
    isActive: false,
    status: 'ended',
    message: 'Journey time window has passed',
  };
};

/**
 * Get greeting based on time of day
 * @param {string} locale
 * @returns {string}
 */
export const getGreeting = (locale = 'en') => {
  const hour = new Date().getHours();

  if (locale === 'id') {
    if (hour < 11) return 'Selamat Pagi';
    if (hour < 15) return 'Selamat Siang';
    if (hour < 18) return 'Selamat Sore';
    return 'Selamat Malam';
  }

  if (hour < 12) return 'Good Morning';
  if (hour < 18) return 'Good Afternoon';
  return 'Good Evening';
};

/**
 * Format price in Indonesian Rupiah
 * @param {number} amount
 * @returns {string}
 */
export const formatPrice = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

/**
 * Generate booking code
 * @param {Date} date
 * @param {number} sequence
 * @returns {string}
 */
export const generateBookingCode = (date, sequence = 1) => {
  const dateStr = format(date, 'yyyyMMdd');
  const seqStr = String(sequence).padStart(3, '0');
  return `KAI-BH-${dateStr}-${seqStr}`;
};
