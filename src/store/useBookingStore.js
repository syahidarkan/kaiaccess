import { create } from 'zustand';
import {
  saveBooking,
  getBookings,
  getBookingById as getStoredBooking,
  deleteBooking as removeBooking,
} from '../utils/storage';
import { generateBookingCode } from '../utils/dateHelpers';

export const useBookingStore = create((set, get) => ({
  bookings: getBookings(),
  currentBooking: null,
  bookingStep: 1,

  // Create new booking
  createBooking: (bookingData) => {
    const booking = {
      id: generateBookingCode(new Date(bookingData.date), get().bookings.length + 1),
      ...bookingData,
      createdAt: new Date().toISOString(),
      status: 'confirmed',
    };

    saveBooking(booking);
    set({ bookings: getBookings(), currentBooking: booking });
    return booking;
  },

  // Get booking by ID
  getBookingById: (id) => {
    return getStoredBooking(id);
  },

  // Delete booking
  deleteBooking: (id) => {
    removeBooking(id);
    set({ bookings: getBookings() });
  },

  // Set current booking for booking flow
  setCurrentBooking: (booking) => set({ currentBooking: booking }),

  // Update booking step
  setBookingStep: (step) => set({ bookingStep: step }),

  // Reset booking flow
  resetBookingFlow: () => set({ currentBooking: null, bookingStep: 1 }),

  // Refresh bookings from storage
  refreshBookings: () => set({ bookings: getBookings() }),
}));
