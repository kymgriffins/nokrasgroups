import { create } from "zustand";
import {
  listings as initialListings,
  type Listing,
  type RoomType,
} from "@/mock-data/listings";
import { nokrasLocations, type HotelLocation } from "@/mock-data/locations";

// MVP Booking System Types
export type BookingStatus = "pending" | "confirmed" | "cancelled";

export interface Booking {
  id: string;
  listingId: string;
  checkIn: Date;
  checkOut: Date;
  guests: {
    adults: number;
    children: { age: number }[];
  };
  contactInfo: {
    name: string;
    email: string;
    phone: string;
  };
  status: BookingStatus;
  createdAt: Date;
  confirmedAt?: Date;
  cancelledAt?: Date;
  totalPrice: number;
}

// Canonical Time System - Single authoritative "now"
export const getCanonicalNow = (): Date => new Date();

// Normalize dates to start/end of day in UTC
export const normalizeCheckIn = (date: Date): Date => {
  const normalized = new Date(date);
  normalized.setUTCHours(14, 0, 0, 0); // Check-in at 2 PM UTC
  return normalized;
};

export const normalizeCheckOut = (date: Date): Date => {
  const normalized = new Date(date);
  normalized.setUTCHours(12, 0, 0, 0); // Check-out at 12 PM UTC
  return normalized;
};

// Check if date is in the past (future-only bookings)
export const isPastDate = (date: Date): boolean => {
  const now = getCanonicalNow();
  return date < now;
};

type SortBy =
  | "price-low"
  | "price-high"
  | "rating"
  | "newest"
  | "reviews"
  | "nearest";

type MapStyle = "default" | "streets" | "outdoors" | "satellite";

interface GuestInfo {
  adults: number;
  children: { age: number }[];
}

interface HotelsState {
  listings: Listing[];
  hotels: HotelLocation[];
  bookings: Booking[];
  searchQuery: string;
  selectedRoomTypes: RoomType[];
  priceRange: [number, number];
  beds: number | null;
  guests: GuestInfo | null;
  amenities: string[];
  sortBy: SortBy;
  selectedListingId: string | null;
  selectedHotelId: string | null;
  mapCenter: { lat: number; lng: number };
  mapZoom: number;
  mapStyle: MapStyle;
  userLocation: { lat: number; lng: number } | null;
  isBookingMode: boolean;
  setSearchQuery: (query: string) => void;
  toggleRoomType: (type: RoomType) => void;
  setPriceRange: (range: [number, number]) => void;
  setBeds: (count: number | null) => void;
  setGuests: (guests: GuestInfo | null) => void;
  addChild: (age: number) => void;
  removeChild: (index: number) => void;
  updateChildAge: (index: number, age: number) => void;
  toggleAmenity: (amenity: string) => void;
  setSortBy: (sort: SortBy) => void;
  toggleFavorite: (listingId: string) => void;
  selectListing: (listingId: string | null) => void;
  selectHotel: (hotelId: string | null) => void;
  setMapCenter: (center: { lat: number; lng: number }) => void;
  setMapZoom: (zoom: number) => void;
  setMapStyle: (style: MapStyle) => void;
  setUserLocation: (location: { lat: number; lng: number } | null) => void;
  setIsBookingMode: (mode: boolean) => void;
  getFilteredListings: () => Listing[];
  getFavoriteListings: () => Listing[];
  getFilteredHotels: () => HotelLocation[];
  getRoomTypesForHotel: (hotelName: string) => Listing[];
  resetFilters: () => void;
  // MVP Booking System Functions
  checkAvailability: (listingId: string, checkIn: Date, checkOut: Date) => boolean;
  createBooking: (bookingData: Omit<Booking, 'id' | 'status' | 'createdAt' | 'totalPrice'>) => { success: boolean; booking?: Booking; error?: string };
  cancelBooking: (bookingId: string) => { success: boolean; error?: string };
  getBookingsForListing: (listingId: string) => Booking[];
  getAllBookings: () => Booking[];
}

const defaultPriceRange: [number, number] = [0, 100000];

function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export const useHotelsStore = create<HotelsState>((set, get) => ({
  listings: initialListings,
  hotels: nokrasLocations,
  bookings: [],
  searchQuery: "",
  selectedRoomTypes: [],
  priceRange: defaultPriceRange,
  beds: null,
  guests: null,
  amenities: [],
  sortBy: "price-low",
  selectedListingId: null,
  selectedHotelId: null,
  mapCenter: { lat: -1.0, lng: 37.5 },
  mapZoom: 7,
  mapStyle: "default",
  userLocation: null,
  isBookingMode: false,

  setSearchQuery: (query) => set({ searchQuery: query }),

  setIsBookingMode: (mode) => set({ isBookingMode: mode }),

  toggleRoomType: (type) =>
    set((state) => ({
      selectedRoomTypes: state.selectedRoomTypes.includes(type)
        ? state.selectedRoomTypes.filter((t) => t !== type)
        : [...state.selectedRoomTypes, type],
    })),

  setPriceRange: (range) => set({ priceRange: range }),

  setBeds: (count) => set({ beds: count }),

  setGuests: (guests) => set({ guests }),

  addChild: (age) =>
    set((state) => ({
      guests: state.guests
        ? { ...state.guests, children: [...state.guests.children, { age }] }
        : { adults: 2, children: [{ age }] },
    })),

  removeChild: (index) =>
    set((state) => ({
      guests: state.guests
        ? {
            ...state.guests,
            children: state.guests.children.filter((_, i) => i !== index),
          }
        : null,
    })),

  updateChildAge: (index, age) =>
    set((state) => ({
      guests: state.guests
        ? {
            ...state.guests,
            children: state.guests.children.map((child, i) =>
              i === index ? { age } : child
            ),
          }
        : null,
    })),

  toggleAmenity: (amenity) =>
    set((state) => ({
      amenities: state.amenities.includes(amenity)
        ? state.amenities.filter((a) => a !== amenity)
        : [...state.amenities, amenity],
    })),

  setSortBy: (sort) => set({ sortBy: sort }),

  toggleFavorite: (listingId) =>
    set((state) => ({
      listings: state.listings.map((listing) =>
        listing.id === listingId
          ? { ...listing, isFavorite: !listing.isFavorite }
          : listing
      ),
    })),

  selectListing: (listingId) => set({ selectedListingId: listingId }),

  selectHotel: (hotelId) => set({ selectedHotelId: hotelId }),

  setMapCenter: (center) => set({ mapCenter: center }),

  setMapZoom: (zoom) => set({ mapZoom: zoom }),

  setMapStyle: (style) => set({ mapStyle: style }),

  setUserLocation: (location) => set({ userLocation: location }),

  resetFilters: () =>
    set({
      searchQuery: "",
      selectedRoomTypes: [],
      priceRange: defaultPriceRange,
      beds: null,
      guests: null,
      amenities: [],
      sortBy: "price-low",
    }),

  getFilteredListings: () => {
    const state = get();
    let filtered = [...state.listings];

    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (listing) =>
          listing.title.toLowerCase().includes(query) ||
          listing.description.toLowerCase().includes(query) ||
          listing.city.toLowerCase().includes(query) ||
          listing.address.toLowerCase().includes(query) ||
          listing.hotel.name.toLowerCase().includes(query)
      );
    }

    if (state.selectedRoomTypes.length > 0) {
      filtered = filtered.filter((listing) =>
        state.selectedRoomTypes.includes(listing.roomType)
      );
    }

    filtered = filtered.filter(
      (listing) =>
        listing.pricePerNight >= state.priceRange[0] &&
        listing.pricePerNight <= state.priceRange[1]
    );

    if (state.beds !== null) {
      filtered = filtered.filter((listing) => listing.beds >= state.beds!);
    }

    if (state.guests !== null) {
      const totalGuests = state.guests.adults + state.guests.children.length;
      filtered = filtered.filter((listing) => listing.guests >= totalGuests);
    }

    if (state.amenities.length > 0) {
      filtered = filtered.filter((listing) =>
        state.amenities.every((amenity) => listing.amenities.includes(amenity))
      );
    }

    switch (state.sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.pricePerNight - b.pricePerNight);
        break;
      case "price-high":
        filtered.sort((a, b) => b.pricePerNight - a.pricePerNight);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case "reviews":
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case "nearest":
        if (state.userLocation) {
          filtered.sort((a, b) => {
            const distA = calculateDistance(
              state.userLocation!.lat,
              state.userLocation!.lng,
              a.coordinates.lat,
              a.coordinates.lng
            );
            const distB = calculateDistance(
              state.userLocation!.lat,
              state.userLocation!.lng,
              b.coordinates.lat,
              b.coordinates.lng
            );
            return distA - distB;
          });
        } else {
          // If no user location, sort by price low as fallback
          filtered.sort((a, b) => a.pricePerNight - b.pricePerNight);
        }
        break;
    }

    if (state.selectedListingId) {
      const selectedIndex = filtered.findIndex(
        (listing) => listing.id === state.selectedListingId
      );
      if (selectedIndex > 0) {
        const selected = filtered.splice(selectedIndex, 1)[0];
        filtered.unshift(selected);
      }
    }

    return filtered;
  },

  getFavoriteListings: () => {
    const state = get();
    let favorites = state.listings.filter((listing) => listing.isFavorite);

    if (state.selectedListingId) {
      const selectedIndex = favorites.findIndex(
        (listing) => listing.id === state.selectedListingId
      );
      if (selectedIndex > 0) {
        const selected = favorites.splice(selectedIndex, 1)[0];
        favorites.unshift(selected);
      }
    }

    return favorites;
  },

  getFilteredHotels: () => {
    const state = get();
    let filtered = [...state.hotels];

    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (hotel) =>
          hotel.name.toLowerCase().includes(query) ||
          hotel.description?.toLowerCase().includes(query) ||
          hotel.city.toLowerCase().includes(query) ||
          hotel.address.toLowerCase().includes(query)
      );
    }

    return filtered;
  },

  getRoomTypesForHotel: (hotelName: string) => {
    const state = get();
    return state.listings.filter((listing) => listing.hotel.name === hotelName);
  },

  // MVP Booking System Functions

  // 3. Authoritative Availability Engine - Check for overlapping confirmed bookings
  checkAvailability: (listingId: string, checkIn: Date, checkOut: Date): boolean => {
    const state = get();
    const normalizedCheckIn = normalizeCheckIn(checkIn);
    const normalizedCheckOut = normalizeCheckOut(checkOut);

    // Basic validation rules
    if (normalizedCheckOut <= normalizedCheckIn) return false;
    if (isPastDate(normalizedCheckIn)) return false;

    // Check for overlapping confirmed bookings
    const conflictingBookings = state.bookings.filter(booking =>
      booking.listingId === listingId &&
      booking.status === "confirmed" &&
      // Overlap detection: !(booking.checkOut <= checkIn || booking.checkIn >= checkOut)
      !(normalizeCheckOut(booking.checkOut) <= normalizedCheckIn || normalizeCheckIn(booking.checkIn) >= normalizedCheckOut)
    );

    return conflictingBookings.length === 0;
  },

  // 4. Atomic Booking Confirmation - Check availability and create booking in one operation
  createBooking: (bookingData: Omit<Booking, 'id' | 'status' | 'createdAt' | 'totalPrice'>): { success: boolean; booking?: Booking; error?: string } => {
    const state = get();

    // Find the listing to calculate price
    const listing = state.listings.find(l => l.id === bookingData.listingId);
    if (!listing) {
      return { success: false, error: "Listing not found" };
    }

    // Basic validation rules
    const normalizedCheckIn = normalizeCheckIn(bookingData.checkIn);
    const normalizedCheckOut = normalizeCheckOut(bookingData.checkOut);

    if (normalizedCheckOut <= normalizedCheckIn) {
      return { success: false, error: "Check-out must be after check-in" };
    }

    if (isPastDate(normalizedCheckIn)) {
      return { success: false, error: "Cannot book past dates" };
    }

    // Calculate nights and total price
    const nights = Math.ceil((normalizedCheckOut.getTime() - normalizedCheckIn.getTime()) / (1000 * 60 * 60 * 24));
    if (nights < 1) {
      return { success: false, error: "Minimum 1 night stay required" };
    }

    const totalPrice = nights * listing.pricePerNight;

    // Atomic operation: Check availability and create booking
    const isAvailable = get().checkAvailability(bookingData.listingId, bookingData.checkIn, bookingData.checkOut);
    if (!isAvailable) {
      return { success: false, error: "Room not available for selected dates" };
    }

    // Create booking with confirmed status (direct to confirmed for MVP)
    const booking: Booking = {
      ...bookingData,
      id: `booking-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      status: "confirmed",
      createdAt: getCanonicalNow(),
      confirmedAt: getCanonicalNow(),
      totalPrice,
    };

    // Add to bookings (simulating database insert)
    set(state => ({
      bookings: [...state.bookings, booking]
    }));

    return { success: true, booking };
  },

  // 7. No Past Data Mutation - Cancel instead of delete
  cancelBooking: (bookingId: string): { success: boolean; error?: string } => {
    const state = get();
    const booking = state.bookings.find(b => b.id === bookingId);

    if (!booking) {
      return { success: false, error: "Booking not found" };
    }

    if (booking.status === "cancelled") {
      return { success: false, error: "Booking already cancelled" };
    }

    // Update booking status to cancelled (no deletion)
    set(state => ({
      bookings: state.bookings.map(b =>
        b.id === bookingId
          ? { ...b, status: "cancelled", cancelledAt: getCanonicalNow() }
          : b
      )
    }));

    return { success: true };
  },

  getBookingsForListing: (listingId: string): Booking[] => {
    const state = get();
    return state.bookings.filter(booking => booking.listingId === listingId);
  },

  getAllBookings: (): Booking[] => {
    const state = get();
    return [...state.bookings];
  },
}));
