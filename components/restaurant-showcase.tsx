"use client";

import { nokrasCompanyInfo, nokrasRestaurants } from "@/mock-data/restaurants";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import RestaurantCard from "./restaurant-card";

gsap.registerPlugin(ScrollTrigger);

/**
 * AWWWARD-LEVEL Restaurant Showcase Component
 * Features:
 * - Immersive 3D hero with parallax layers
 * - Magnetic cursor effects
 * - Scroll-velocity based animations
 * - Staggered restaurant reveals with 3D transforms
 * - Progress indicator with smooth transitions
 * - Premium micro-interactions
 */
const RestaurantShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const [cursorText, setCursorText] = useState("");

  useEffect(() => {
    if (!containerRef.current) return;

    // ===== CUSTOM CURSOR TRACKING =====
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.5,
          ease: "power3.out",
        });
      }
    };
    document.addEventListener("mousemove", handleMouseMove);

    // ===== HERO SECTION ANIMATIONS =====
    const heroTl = gsap.timeline();

    // Title reveal with 3D rotation
    if (titleRef.current) {
      const chars = titleRef.current.querySelectorAll("[data-char]");
      heroTl.fromTo(
        chars,
        {
          opacity: 0,
          y: 120,
          rotateX: -90,
          transformOrigin: "center bottom",
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1,
          stagger: 0.05,
          ease: "back.out(1.7)",
        },
        0.3
      );
    }

    // Subtitle fade with blur
    if (subtitleRef.current) {
      heroTl.fromTo(
        subtitleRef.current,
        {
          opacity: 0,
          y: 40,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power2.out",
        },
        0.8
      );
    }

    // ===== PARALLAX BACKGROUND LAYERS =====
    const parallaxLayers = containerRef.current.querySelectorAll("[data-parallax]");
    parallaxLayers.forEach((layer) => {
      const speed = parseFloat((layer as HTMLElement).dataset.parallax || "1");
      gsap.to(layer, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
        y: speed * 200,
        ease: "none",
      });
    });

    // ===== HERO PINNED SCALE EFFECT =====
    if (heroRef.current) {
      gsap.to(heroRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        scale: 1.1,
        opacity: 0.5,
        filter: "blur(8px)",
      });
    }

    // ===== RESTAURANT CARDS 3D ENTRANCE =====
    const restaurantCards = containerRef.current.querySelectorAll(".restaurant-card");
    restaurantCards.forEach((card, index) => {
      const cardElement = card as HTMLElement;

      // 3D entrance from different directions
      const direction = index % 2 === 0 ? -1 : 1;

      gsap.fromTo(
        cardElement,
        {
          opacity: 0,
          y: 150,
          rotateY: direction * 15,
          transformPerspective: 1000,
        },
        {
          scrollTrigger: {
            trigger: cardElement,
            start: "top 85%",
            end: "top 50%",
            scrub: 1,
          },
          opacity: 1,
          y: 0,
          rotateY: 0,
          ease: "power2.out",
        }
      );

      // Track active card
      ScrollTrigger.create({
        trigger: cardElement,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveIndex(index),
        onEnterBack: () => setActiveIndex(index),
      });
    });

    // ===== SCROLL PROGRESS TRACKING =====
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        setShowProgress(self.progress > 0.1 && self.progress < 0.95);
      },
    });

    // ===== FLOATING ELEMENTS ANIMATION =====
    const floatingElements = containerRef.current.querySelectorAll("[data-float]");
    floatingElements.forEach((el, idx) => {
      gsap.to(el, {
        y: -30 - idx * 10,
        duration: 3 + idx * 0.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: idx * 0.3,
      });
    });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Split text into characters for animation
  const splitText = (text: string) => {
    return text.split("").map((char, idx) => (
      <span
        key={idx}
        data-char
        className="inline-block"
        style={{ display: char === " " ? "inline" : "inline-block" }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <div ref={containerRef} className="relative w-full bg-black overflow-hidden">
      {/* ===== CUSTOM CURSOR ===== */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 w-4 h-4 rounded-full bg-white mix-blend-difference pointer-events-none z-[9999] transition-transform duration-300 ${cursorText ? "scale-[4]" : "scale-100"
          }`}
        style={{ transform: "translate(-50%, -50%)" }}
      >
        {cursorText && (
          <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-black">
            {cursorText}
          </span>
        )}
      </div>

      {/* ===== HERO SECTION ===== */}
      <section
        ref={heroRef}
        className="relative min-h-[120vh] w-full flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Animated Background Layers */}
        <div className="absolute inset-0">
          <div
            data-parallax="0.3"
            className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"
          />
          <div
            data-parallax="0.6"
            data-float
            className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[120px]"
          />
          <div
            data-parallax="0.4"
            data-float
            className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[100px]"
          />
          <div
            data-parallax="0.8"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-[150px]"
          />
        </div>

        {/* Grid Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "100px 100px",
            }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-6xl px-6">
          {/* Brand Badge */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-3 px-6 py-3 border border-white/20 rounded-full backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <p className="text-xs md:text-sm uppercase tracking-[0.4em] font-light text-white/80">
                {nokrasCompanyInfo.name}
              </p>
            </div>
          </div>

          {/* Main Title - Character Split Animation */}
          <div ref={titleRef} className="mb-8 overflow-hidden">
            <h1 className="text-7xl md:text-[10rem] font-black text-white leading-[0.85] tracking-tighter">
              <span className="block">{splitText("Culinary")}</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500">
                {splitText("Excellence")}
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <div ref={subtitleRef} className="mb-16">
            <p className="text-xl md:text-2xl text-white/60 font-light max-w-3xl mx-auto leading-relaxed">
              {nokrasCompanyInfo.tagline}
            </p>
            <p className="text-sm text-white/40 mt-4 max-w-2xl mx-auto">
              {nokrasRestaurants.length} exceptional dining venues across {nokrasCompanyInfo.branches.length} premium locations
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button
              className="group relative px-12 py-5 bg-white text-black font-bold text-lg overflow-hidden"
              onMouseEnter={() => setCursorText("GO")}
              onMouseLeave={() => setCursorText("")}
            >
              <span className="relative z-10 flex items-center gap-3">
                Explore Venues
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-amber-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            </button>
            <Link
              href="/booking"
              className="px-12 py-5 border-2 border-white/30 text-white font-bold text-lg hover:border-white hover:bg-white/10 transition-all duration-300"
              onMouseEnter={() => setCursorText("BOOK")}
              onMouseLeave={() => setCursorText("")}
            >
              Reserve Table
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center gap-4">
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">Scroll</p>
            <div className="w-px h-16 bg-gradient-to-b from-white/60 to-transparent animate-pulse" />
          </div>
        </div>
      </section>

      {/* ===== RESTAURANTS SECTION ===== */}
      <section className="relative z-20 bg-white">
        {/* Section Header */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-xl border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-black">
                {nokrasRestaurants.length} Dining Venues
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">
                {activeIndex + 1} / {nokrasRestaurants.length}
              </span>
              <div className="flex gap-1">
                {nokrasRestaurants.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1 rounded-full transition-all duration-500 ${idx === activeIndex ? "w-8 bg-black" : "w-2 bg-gray-300"
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Restaurant Cards */}
        <div className="space-y-0">
          {nokrasRestaurants.map((restaurant, index) => (
            <div
              key={restaurant.id}
              onMouseEnter={() => setCursorText("VIEW")}
              onMouseLeave={() => setCursorText("")}
            >
              <RestaurantCard
                restaurant={restaurant}
                index={index}
                isActive={activeIndex === index}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section className="relative bg-black text-white py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { number: nokrasRestaurants.length, label: "Restaurants" },
              { number: nokrasCompanyInfo.branches.length, label: "Locations" },
              { number: "50+", label: "Chefs" },
              { number: "4.8", label: "Avg Rating" },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <p className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
                  {stat.number}
                </p>
                <p className="text-sm uppercase tracking-[0.3em] text-white/60 mt-4">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOOTER CTA ===== */}
      <section className="relative black text-white py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
            Ready to
            <br />
            Experience
            <br />
            Excellence?
          </h3>
          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
            Contact any of our restaurants directly to make a reservation or inquire about private dining and special events.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href={`tel:${nokrasCompanyInfo.contact.phone}`}
              className="px-12 py-5 bg-white text-orange-600 font-bold text-lg hover:bg-black hover:text-white transition-all duration-300"
            >
              Call {nokrasCompanyInfo.contact.phone}
            </a>
            <Link
              href="/booking"
              className="px-12 py-5 border-2 border-white text-white font-bold text-lg hover:bg-white hover:text-orange-600 transition-all duration-300"
            >
              Book Now
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FLOATING PROGRESS ===== */}
      {showProgress && (
        <div className="fixed bottom-8 right-8 z-50">
          <div className="flex items-center gap-4 px-6 py-3 bg-black/90 backdrop-blur-lg rounded-full shadow-2xl">
            <span className="text-xs font-bold text-white/60">
              {Math.round(((activeIndex + 1) / nokrasRestaurants.length) * 100)}%
            </span>
            <div className="flex gap-1">
              {nokrasRestaurants.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${idx <= activeIndex ? "bg-white" : "bg-white/30"
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantShowcase;
