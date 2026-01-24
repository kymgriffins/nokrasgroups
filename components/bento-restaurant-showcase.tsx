"use client";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { nokrasRestaurants, restaurantsByBranch } from "@/mock-data/restaurants";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

/**
 * Modern Restaurant Showcase with Bento Grid Layout
 * Features scroll-engineered animations and responsive design
 */
const BentoRestaurantShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const items = gridRef.current.querySelectorAll("[data-bento-item]");

    // Create staggered entrance animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: gridRef.current,
        start: "top 60%",
        end: "top 20%",
        scrub: 1.2,
        markers: false,
      },
    });

    items.forEach((item, index) => {
      tl.from(
        item,
        {
          y: 80,
          opacity: 0,
          scale: 0.9,
          duration: 0.7,
          ease: "back.out(1.5)",
        },
        index * 0.12
      );

      // Magnetic hover effect
      const itemEl = item as HTMLElement;
      itemEl.addEventListener("mouseenter", () => {
        gsap.to(itemEl, {
          scale: 1.08,
          y: -10,
          duration: 0.3,
          ease: "power2.out",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.2)",
          overwrite: "auto",
        });
      });

      itemEl.addEventListener("mouseleave", () => {
        gsap.to(itemEl, {
          scale: 1,
          y: 0,
          duration: 0.4,
          ease: "elastic.out(1, 0.4)",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
          overwrite: "auto",
        });
      });
    });

    return () => {
      tl.kill();
      items.forEach((item) => {
        (item as HTMLElement).removeEventListener("mouseenter", () => {});
        (item as HTMLElement).removeEventListener("mouseleave", () => {});
      });
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-20">
          <p className="text-xs md:text-sm uppercase tracking-[0.3em] font-bold text-gray-600 mb-4">
            Dining Venues
          </p>
          <h2 className="text-5xl md:text-7xl font-black text-black mb-6 leading-tight">
            Explore Our
            <br />
            Restaurants
          </h2>
          <p className="text-base md:text-lg text-gray-700 max-w-2xl">
            Choose from our curated collection of fine dining and casual venues
            across all Nokras properties.
          </p>
        </div>

        {/* Bento Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[300px]"
        >
          {nokrasRestaurants.map((restaurant, index) => {
            // Create varied grid sizes for visual interest
            const isLarge = index % 5 === 0;
            const isMedium = index % 3 === 0 && index % 5 !== 0;

            return (
              <div
                key={restaurant.id}
                data-bento-item
                className={`group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow cursor-pointer ${
                  isLarge ? "md:col-span-2 md:row-span-2" : ""
                } ${isMedium ? "md:row-span-2" : ""}`}
              >
                {/* Background Image */}
                {restaurant.images[0] && (
                  <Image
                    src={restaurant.images[0]}
                    alt={restaurant.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                )}

                {/* Fallback gradient */}
                {!restaurant.images[0] && (
                  <div className="w-full h-full bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900" />
                )}

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300" />

                {/* Content overlay - appears on hover */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/80 via-transparent to-transparent">
                  <h3 className="text-xl md:text-2xl font-black text-white mb-2">
                    {restaurant.name}
                  </h3>
                  <p className="text-sm text-gray-200 mb-3">
                    {restaurant.cuisine}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur text-xs font-bold text-white rounded-full">
                        ⭐ {restaurant.rating}
                      </span>
                      <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur text-xs font-bold text-white rounded-full">
                        {restaurant.priceRange}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-300 mt-3">
                    {restaurant.hotelName}
                  </p>
                </div>

                {/* Corner badge */}
                <div className="absolute top-4 right-4 z-10">
                  <div className="px-3 py-1 bg-black/60 backdrop-blur text-xs font-bold text-white rounded-full">
                    {restaurant.cuisine.split(" ")[0]}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-t border-gray-200">
          <div>
            <p className="text-3xl md:text-4xl font-black text-black mb-2">
              {nokrasRestaurants.length}
            </p>
            <p className="text-sm text-gray-600 uppercase tracking-wide font-semibold">
              Dining Venues
            </p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-black text-black mb-2">
              {Math.max(...nokrasRestaurants.map((r) => r.seatingCapacity))}+
            </p>
            <p className="text-sm text-gray-600 uppercase tracking-wide font-semibold">
              Max Capacity
            </p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-black text-black mb-2">
              4
            </p>
            <p className="text-sm text-gray-600 uppercase tracking-wide font-semibold">
              Hotel Locations
            </p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-black text-black mb-2">
              {(
                nokrasRestaurants.reduce((acc, r) => acc + r.rating, 0) /
                nokrasRestaurants.length
              ).toFixed(1)}
            </p>
            <p className="text-sm text-gray-600 uppercase tracking-wide font-semibold">
              Avg Rating
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BentoRestaurantShowcase;
