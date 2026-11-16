"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

interface BookingModalContextType {
  isOpen: boolean;
  openBooking: () => void;
  closeBooking: () => void;
}

const BookingModalContext = createContext<BookingModalContextType | null>(null);

export function BookingModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openBooking = useCallback(() => setIsOpen(true), []);
  const closeBooking = useCallback(() => setIsOpen(false), []);

  return (
    <BookingModalContext.Provider value={{ isOpen, openBooking, closeBooking }}>
      {children}
    </BookingModalContext.Provider>
  );
}

export function useBookingModal(): BookingModalContextType {
  const ctx = useContext(BookingModalContext);
  if (!ctx) {
    throw new Error("useBookingModal must be used within BookingModalProvider");
  }
  return ctx;
}
