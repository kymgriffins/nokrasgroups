"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BookingFlow } from "@/components/dashboard/booking-flow";
import { useHotelsStore } from "@/store/hotels-store";
import { Button } from "@/components/ui/button";

function PaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const listingId = searchParams.get("listingId");

  const { getFilteredListings } = useHotelsStore();
  const listings = getFilteredListings();

  const listing = React.useMemo(() => {
    if (!listingId) return null;
    return listings.find((l) => l.id === listingId) ?? null;
  }, [listings, listingId]);

  const availableRooms = React.useMemo(() => {
    if (!listing) return [];
    return listings.filter((l) => l.hotel.name === listing.hotel.name);
  }, [listing, listings]);

  if (!listingId) {
    return (
      <div className="h-screen w-full flex items-center justify-center p-6">
        <div className="max-w-md w-full rounded-xl border bg-card p-6 text-center space-y-3">
          <h1 className="text-lg font-semibold">Payment</h1>
          <p className="text-sm text-muted-foreground">
            No room selected. Please go back and choose a room to continue.
          </p>
          <Button onClick={() => router.push("/")}>Back to Hotels</Button>
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="h-screen w-full flex items-center justify-center p-6">
        <div className="max-w-md w-full rounded-xl border bg-card p-6 text-center space-y-3">
          <h1 className="text-lg font-semibold">Payment</h1>
          <p className="text-sm text-muted-foreground">
            We couldn&apos;t find that room. It may have been filtered out or is
            no longer available.
          </p>
          <Button onClick={() => router.push("/")}>Back to Hotels</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full overflow-hidden">
      <div className="h-full w-full max-w-3xl mx-auto">
        <div className="h-full border-x bg-background flex flex-col">
          <div className="border-b px-4 sm:px-6 py-4 flex items-center justify-between gap-3 shrink-0">
            <div className="min-w-0">
              <h1 className="font-semibold text-base sm:text-lg truncate">
                Complete your booking
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground truncate">
                {listing.hotel.name} • {listing.city}, {listing.country}
              </p>
            </div>
            <Button variant="outline" onClick={() => router.back()}>
              Back
            </Button>
          </div>

          <div className="flex-1 min-h-0 overflow-hidden">
            <BookingFlow
              hotelName={listing.hotel.name}
              city={listing.city}
              country={listing.country}
              image={listing.images[0]}
              availableRooms={availableRooms}
              initialRoomId={listing.id}
              onCancel={() => router.back()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <React.Suspense
      fallback={
        <div className="h-screen w-full flex items-center justify-center">
          <div className="text-center space-y-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="text-sm text-muted-foreground">Loading booking...</p>
          </div>
        </div>
      }
    >
      <PaymentContent />
    </React.Suspense>
  );
}

