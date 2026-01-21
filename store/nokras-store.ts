import { create } from "zustand";
import {
  listings as initialListings,
  type Listing,
  type RoomType,
} from "@/mock-data/listings";
import { nokrasLocations, type HotelLocation } from "@/mock-data/locations";

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
}));
