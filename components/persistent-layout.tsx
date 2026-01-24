"use client";

import { ReactNode, useState } from "react";
import { BookingFlow } from "@/components/dashboard/booking-flow";

/**
 * Layout with Persistent Booking Drawer
 * Booking page is always available via side drawer while viewing other pages
 * NOTE: Navbar is provided by root layout.tsx, not here
 */
interface PersistentLayoutProps {
  children: ReactNode;
  showBookingDrawer?: boolean;
}

export function PersistentLayout({
  children,
  showBookingDrawer = true,
}: PersistentLayoutProps) {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div className="relative w-full min-h-screen">
      {/* Main Content */}
      <main className="w-full">
        {children}
      </main>

      {/* Persistent Booking Drawer */}
      {showBookingDrawer && (
        <>
          {/* Booking Toggle Button */}
          <button
            onClick={() => setBookingOpen(!bookingOpen)}
            className="fixed bottom-6 right-6 z-30 px-6 py-3 bg-black text-white font-bold rounded-full shadow-lg hover:bg-gray-900 transition-all duration-300 hover:scale-110 group"
            title="Open booking panel"
          >
            <span className="inline-block group-hover:scale-110 transition-transform">
              📅
            </span>
            <span className="ml-2">Book Now</span>
          </button>

          {/* Drawer Overlay */}
          {bookingOpen && (
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300"
              onClick={() => setBookingOpen(false)}
            />
          )}

          {/* Booking Drawer */}
          <div
            className={`fixed right-0 top-0 h-full w-full max-w-2xl bg-white shadow-2xl z-50 transition-transform duration-500 ease-out ${
              bookingOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-black text-black">Booking Panel</h2>
              <button
                onClick={() => setBookingOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Drawer Content */}
            <div className="h-full overflow-y-auto p-6">
              <BookingFlow
                hotelName="Nokras Hotel"
                city="Nairobi"
                country="Kenya"
                image="/hotels/default.jpg"
                availableRooms={[]}
                onCancel={() => setBookingOpen(false)}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default PersistentLayout;
