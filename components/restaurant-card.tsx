"use client";

import { Restaurant } from "@/mock-data/restaurants";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

interface RestaurantCardProps {
  restaurant: Restaurant;
  index: number;
  isActive: boolean;
}

/**
 * AWWWARD-LEVEL Restaurant Card Component
 * Features:
 * - 3D parallax image effect
 * - Staggered content reveals
 * - Magnetic hover interactions
 * - Premium micro-animations
 * - Responsive luxury design
 */
const RestaurantCard = ({
  restaurant,
  index,
  isActive,
}: RestaurantCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const ctx = gsap.context(() => {
      // ===== IMAGE PARALLAX =====
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { y: -80, scale: 1.15 },
          {
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
            y: 80,
            scale: 1,
          }
        );
      }

      // ===== CONTENT STAGGER REVEAL =====
      if (contentRef.current) {
        const elements = contentRef.current.querySelectorAll("[data-animate]");
        gsap.fromTo(
          elements,
          {
            opacity: 0,
            y: 60,
            filter: "blur(5px)",
          },
          {
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
          }
        );
      }

      // ===== HOVER OVERLAY =====
      if (imageContainerRef.current && overlayRef.current) {
        const container = imageContainerRef.current;
        const overlay = overlayRef.current;

        container.addEventListener("mouseenter", () => {
          gsap.to(overlay, {
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
          });
        });

        container.addEventListener("mouseleave", () => {
          gsap.to(overlay, {
            opacity: 0,
            duration: 0.4,
            ease: "power2.out",
          });
        });
      }
    }, cardRef);

    return () => ctx.revert();
  }, []);

  // Alternate layout for even/odd cards
  const isReversed = index % 2 !== 0;

  return (
    <div
      ref={cardRef}
      className={`restaurant-card relative w-full py-16 md:py-24 transition-all duration-500 ${
        isActive ? "z-10" : "z-0"
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
            isReversed ? "lg:flex-row-reverse" : ""
          }`}
        >
          {/* ===== IMAGE SECTION ===== */}
          <div
            ref={imageContainerRef}
            className={`relative group overflow-hidden rounded-2xl ${
              isReversed ? "lg:order-2" : ""
            }`}
          >
            <div className="relative aspect-[4/5] md:aspect-[4/3] lg:aspect-[4/5] overflow-hidden">
              <div ref={imageRef} className="absolute inset-0 w-full h-[120%] -top-[10%]">
                {restaurant.images[0] ? (
                  <Image
                    src={restaurant.images[0]}
                    alt={restaurant.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority={index === 0}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-800 via-gray-900 to-black" />
                )}
              </div>

              {/* Hover Overlay */}
              <div
                ref={overlayRef}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 flex items-center justify-center"
              >
                <span className="px-8 py-4 border-2 border-white text-white font-bold text-lg">
                  View Details
                </span>
              </div>
            </div>

            {/* Price Badge */}
            <div className="absolute top-6 right-6 z-10">
              <div className="px-5 py-2 bg-black/90 backdrop-blur-md rounded-full">
                <span className="text-white font-bold text-sm tracking-wide">
                  {restaurant.priceRange}
                </span>
              </div>
            </div>

            {/* Rating Badge */}
            <div className="absolute bottom-6 left-6 z-10">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/95 backdrop-blur-md rounded-full">
                <svg className="w-4 h-4 text-amber-500 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-black font-bold text-sm">
                  {restaurant.rating}
                </span>
                <span className="text-gray-500 text-xs">
                  ({restaurant.totalReviews})
                </span>
              </div>
            </div>
          </div>

          {/* ===== CONTENT SECTION ===== */}
          <div
            ref={contentRef}
            className={`space-y-8 ${isReversed ? "lg:order-1 lg:text-right" : ""}`}
          >
            {/* Header */}
            <div data-animate>
              <div className={`flex items-center gap-3 mb-4 ${isReversed ? "lg:justify-end" : ""}`}>
                <div className="w-12 h-px bg-black" />
                <span className="text-xs uppercase tracking-[0.3em] font-bold text-gray-500">
                  {restaurant.hotelName}
                </span>
              </div>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-black leading-[0.95]">
                {restaurant.name}
              </h3>
            </div>

            {/* Cuisine Type */}
            <div data-animate className={`flex items-center gap-4 ${isReversed ? "lg:justify-end" : ""}`}>
              <span className="px-4 py-2 bg-black text-white text-xs font-bold uppercase tracking-wider">
                {restaurant.cuisine}
              </span>
              <span className="text-gray-500 text-sm">
                {restaurant.ambiance}
              </span>
            </div>

            {/* Description */}
            <p data-animate className="text-gray-700 text-lg leading-relaxed max-w-xl">
              {restaurant.briefDescription}
            </p>

            {/* Key Info Grid */}
            <div data-animate className="grid grid-cols-2 gap-6 py-6 border-y border-gray-200">
              <div className={isReversed ? "lg:text-right" : ""}>
                <p className="text-xs uppercase tracking-[0.2em] font-bold text-gray-400 mb-2">
                  Capacity
                </p>
                <p className="text-2xl font-black text-black">
                  {restaurant.seatingCapacity}
                  <span className="text-sm font-normal text-gray-500 ml-1">seats</span>
                </p>
              </div>
              <div className={isReversed ? "lg:text-right" : ""}>
                <p className="text-xs uppercase tracking-[0.2em] font-bold text-gray-400 mb-2">
                  Location
                </p>
                <p className="text-lg font-bold text-black">
                  {restaurant.city}
                </p>
              </div>
            </div>

            {/* Specialties */}
            <div data-animate>
              <p className={`text-xs uppercase tracking-[0.2em] font-bold text-gray-400 mb-4 ${isReversed ? "lg:text-right" : ""}`}>
                Chef Specialties
              </p>
              <div className={`flex flex-wrap gap-2 ${isReversed ? "lg:justify-end" : ""}`}>
                {restaurant.specialties.slice(0, 3).map((specialty, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            {/* Features */}
            <div data-animate className={`flex flex-wrap gap-3 ${isReversed ? "lg:justify-end" : ""}`}>
              {restaurant.features.slice(0, 4).map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-sm text-gray-600"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  {feature}
                </div>
              ))}
            </div>

            {/* Contact & CTA */}
            <div data-animate className={`flex flex-wrap gap-4 pt-4 ${isReversed ? "lg:justify-end" : ""}`}>
              <a
                href={`tel:${restaurant.phone}`}
                className="group px-8 py-4 bg-black text-white font-bold text-sm flex items-center gap-3 hover:bg-gray-900 transition-colors"
              >
                <span>📞</span>
                <span>Call to Reserve</span>
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href={`mailto:${restaurant.email}`}
                className="px-8 py-4 border-2 border-black text-black font-bold text-sm hover:bg-black hover:text-white transition-all"
              >
                Email Inquiry
              </a>
            </div>

            {/* Reservation Notice */}
            {restaurant.reservationRequired && (
              <p data-animate className={`text-xs text-gray-500 italic ${isReversed ? "lg:text-right" : ""}`}>
                * Reservation recommended • Live music: {restaurant.liveMusic ? "Yes" : "No"} • Private events: {restaurant.privateEvents ? "Available" : "Not available"}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Section Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
    </div>
  );
};

export default RestaurantCard;
