'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Types
export interface BookingFormData {
  fullName: string;
  email: string;
  phone: string;
  departureDate: string;
  returnDate: string;
  totalGuests: number;
  specialRequests: string;
  emergencyContact: string;
  emergencyPhone: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  type: 'credit_card' | 'bank_transfer' | 'ewallet' | 'virtual_account';
  icon: React.ReactNode;
  description: string;
  processingFee: number;
  isAvailable: boolean;
}

export interface BookingState {
  // Modal states
  isBookingFormOpen: boolean;
  isPaymentMethodOpen: boolean;
  
  // Form data
  bookingFormData: BookingFormData | null;
  selectedPaymentMethod: PaymentMethod | null;
  
  // Package data
  packageData: {
    id: string;
    title: string;
    price: string;
    duration: string;
    location: string;
  } | undefined;
  
  // Booking status
  bookingStatus: 'idle' | 'form_completed' | 'payment_selected' | 'processing' | 'completed' | 'error';
  error: string | null;
}

export interface BookingContextType {
  // State
  state: BookingState;
  
  // Actions
  openBookingForm: (packageData: NonNullable<BookingState['packageData']>) => void;
  closeBookingForm: () => void;
  submitBookingForm: (formData: BookingFormData) => void;
  
  openPaymentMethod: () => void;
  closePaymentMethod: () => void;
  selectPaymentMethod: (paymentMethod: PaymentMethod) => void;
  
  resetBooking: () => void;
  setError: (error: string | null) => void;
}

// Initial state
const initialState: BookingState = {
  isBookingFormOpen: false,
  isPaymentMethodOpen: false,
  bookingFormData: null,
  selectedPaymentMethod: null,
  packageData: undefined,
  bookingStatus: 'idle',
  error: null,
};

// Create context
const BookingContext = createContext<BookingContextType | undefined>(undefined);

// Provider component
export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<BookingState>(initialState);

  const openBookingForm = (packageData: NonNullable<BookingState['packageData']>) => {
    setState(prev => ({
      ...prev,
      isBookingFormOpen: true,
      packageData,
      bookingStatus: 'idle',
      error: null,
    }));
  };

  const closeBookingForm = () => {
    setState(prev => ({
      ...prev,
      isBookingFormOpen: false,
      bookingStatus: 'idle',
      error: null,
    }));
  };

  const submitBookingForm = (formData: BookingFormData) => {
    setState(prev => ({
      ...prev,
      bookingFormData: formData,
      isBookingFormOpen: false,
      isPaymentMethodOpen: true,
      bookingStatus: 'form_completed',
      error: null,
    }));
  };

  const openPaymentMethod = () => {
    setState(prev => ({
      ...prev,
      isPaymentMethodOpen: true,
      error: null,
    }));
  };

  const closePaymentMethod = () => {
    setState(prev => ({
      ...prev,
      isPaymentMethodOpen: false,
      error: null,
    }));
  };

  const selectPaymentMethod = (paymentMethod: PaymentMethod) => {
    setState(prev => ({
      ...prev,
      selectedPaymentMethod: paymentMethod,
      isPaymentMethodOpen: false,
      bookingStatus: 'payment_selected',
      error: null,
    }));
  };

  const resetBooking = () => {
    setState(initialState);
  };

  const setError = (error: string | null) => {
    setState(prev => ({
      ...prev,
      error,
      bookingStatus: error ? 'error' : prev.bookingStatus,
    }));
  };

  const value: BookingContextType = {
    state,
    openBookingForm,
    closeBookingForm,
    submitBookingForm,
    openPaymentMethod,
    closePaymentMethod,
    selectPaymentMethod,
    resetBooking,
    setError,
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};

// Custom hook to use booking context
export const useBooking = (): BookingContextType => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

// Utility functions
export const calculateTotalGuests = (formData: BookingFormData): number => {
  return formData.totalGuests;
};

export const calculateTotalPrice = (
  basePrice: string,
  totalGuests: number,
  processingFee: number = 0
): number => {
  // Extract numeric value from price string (e.g., "Rp 6.188.000" -> 6188000)
  const numericPrice = parseInt(basePrice.replace(/[^\d]/g, ''));
  
  // Calculate total based on guest count
  // For simplicity, we'll use the same price for all guests
  // In a real app, you might want different pricing for adults/children/infants
  return numericPrice * totalGuests + processingFee;
};

export const formatPrice = (price: number): string => {
  return `Rp ${price.toLocaleString('id-ID')}`;
};

export default BookingContext;
