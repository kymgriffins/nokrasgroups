import RestaurantShowcase from "@/components/restaurant-showcase";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Culinary Excellence | Nokras Hotels",
  description:
    "Discover fine dining and casual restaurants across Nokras Hotel locations. Reserve your table for an unforgettable culinary experience.",
  keywords:
    "restaurants, fine dining, dining venues, Nokras hotels, reservations",
};

/**
 * Restaurant Showcase Page
 * Displays all dining venues with GSAP scroll animations
 */
export default function RestaurantsPage() {
  return (
    <main className="w-full min-h-screen">
      <RestaurantShowcase />
    </main>
  );
}
