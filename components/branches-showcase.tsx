"use client";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { nokrasLocations } from "@/mock-data/locations";
import { nokrasCompanyInfo } from "@/mock-data/restaurants";
import Link from "next/link";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

/**
 * AWWWARD-LEVEL Branches Showcase
 * Features:
 * - Immersive full-screen hotel reveals
 * - Horizontal scroll sections
 * - 3D card transforms with parallax
 * - Magnetic cursor interactions
 * - Smooth scroll-based animations
 * - Premium micro-interactions
 */
const BranchesShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cursorText, setCursorText] = useState("");

  useEffect(() => {
    if (!containerRef.current) return;

    // ===== CUSTOM CURSOR =====
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.4,
          ease: "power3.out",
        });
      }
    };
    document.addEventListener("mousemove", handleMouseMove);

    // ===== HERO TITLE ANIMATION =====
    if (titleRef.current) {
      const lines = titleRef.current.querySelectorAll("[data-line]");
      gsap.fromTo(
        lines,
        {
          opacity: 0,
          y: 100,
          rotateX: -45,
          transformOrigin: "center bottom",
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          delay: 0.3,
        }
      );
    }

    // ===== HERO PARALLAX =====
    if (heroRef.current) {
      gsap.to(heroRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
        y: 200,
        scale: 1.1,
        opacity: 0.3,
      });
    }

    // ===== BRANCH SECTIONS ANIMATIONS =====
    const branchSections = containerRef.current.querySelectorAll(".branch-section");
    branchSections.forEach((section, index) => {
      const sectionEl = section as HTMLElement;

      // Image parallax
      const image = sectionEl.querySelector("[data-parallax-image]");
      if (image) {
        gsap.fromTo(
          image,
          { y: -100, scale: 1.2 },
          {
            scrollTrigger: {
              trigger: sectionEl,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
            y: 100,
            scale: 1,
          }
        );
      }

      // Content reveal
      const content = sectionEl.querySelector("[data-content]");
      if (content) {
        gsap.fromTo(
          content,
          {
            opacity: 0,
            x: index % 2 === 0 ? -100 : 100,
          },
          {
            scrollTrigger: {
              trigger: sectionEl,
              start: "top 70%",
              end: "top 30%",
              scrub: 1,
            },
            opacity: 1,
            x: 0,
          }
        );
      }

      // Active index tracking
      ScrollTrigger.create({
        trigger: sectionEl,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveIndex(index),
        onEnterBack: () => setActiveIndex(index),
      });
    });

    // ===== FLOATING DECORATIONS =====
    const floatingEls = containerRef.current.querySelectorAll("[data-float]");
    floatingEls.forEach((el, idx) => {
      gsap.to(el, {
        y: -25 - idx * 8,
        rotation: idx % 2 === 0 ? 5 : -5,
        duration: 4 + idx * 0.5,
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

  return (
    <div ref={containerRef} className="relative w-full bg-black overflow-hidden">
      {/* ===== CUSTOM CURSOR ===== */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 w-4 h-4 rounded-full bg-white mix-blend-difference pointer-events-none z-[9999] transition-transform duration-300 ${
          cursorText ? "scale-[5]" : "scale-100"
        }`}
        style={{ transform: "translate(-50%, -50%)" }}
      >
        {cursorText && (
          <span className="absolute inset-0 flex items-center justify-center text-[7px] font-bold text-black uppercase">
            {cursorText}
          </span>
        )}
      </div>

      {/* ===== HERO SECTION ===== */}
      <section
        ref={heroRef}
        className="relative min-h-[120vh] w-full flex items-center justify-center overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
          <div
            data-float
            className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[150px]"
          />
          <div
            data-float
            className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[180px]"
          />
          <div
            data-float
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[120px]"
          />
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-6xl px-6">
          {/* Badge */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-3 px-6 py-3 border border-white/20 rounded-full backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <p className="text-xs uppercase tracking-[0.4em] text-white/70">
                {nokrasLocations.length} Premium Properties
              </p>
            </div>
          </div>

          {/* Title */}
          <h1
            ref={titleRef}
            className="text-6xl md:text-[9rem] font-black text-white leading-[0.85] tracking-tighter mb-10"
          >
            <span data-line className="block overflow-hidden">
              <span className="inline-block">Our</span>
            </span>
            <span data-line className="block overflow-hidden">
              <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                Properties
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/50 font-light max-w-3xl mx-auto mb-16 leading-relaxed opacity-0 animate-fade-in animation-delay-3">
            {nokrasCompanyInfo.description}
          </p>

          {/* Property Quick Links */}
          <div className="flex flex-wrap justify-center gap-4">
            {nokrasLocations.map((location, idx) => (
              <button
                key={location.id}
                onClick={() => {
                  const el = document.getElementById(`branch-${idx}`);
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`px-6 py-3 border rounded-full text-sm font-medium transition-all duration-300 ${
                  activeIndex === idx
                    ? "bg-white text-black border-white"
                    : "border-white/30 text-white/70 hover:border-white hover:text-white"
                }`}
                onMouseEnter={() => setCursorText("GO")}
                onMouseLeave={() => setCursorText("")}
              >
                {location.city}
              </button>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-4">
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">Discover</p>
            <div className="w-px h-20 bg-gradient-to-b from-white/60 to-transparent animate-pulse" />
          </div>
        </div>
      </section>

      {/* ===== BRANCH SECTIONS ===== */}
      {nokrasLocations.map((branch, index) => (
        <section
          key={branch.id}
          id={`branch-${index}`}
          className={`branch-section relative min-h-screen w-full ${
            index % 2 === 0 ? "bg-white text-black" : "bg-black text-white"
          }`}
        >
          <div className="h-full w-full max-w-[1800px] mx-auto">
            <div
              className={`grid grid-cols-1 lg:grid-cols-2 min-h-screen ${
                index % 2 !== 0 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image Side */}
              <div
                className={`relative h-[60vh] lg:h-screen overflow-hidden ${
                  index % 2 !== 0 ? "lg:order-2" : ""
                }`}
              >
                <div
                  data-parallax-image
                  className="absolute inset-0 w-full h-[120%] -top-[10%]"
                >
                  {branch.images[0] && (
                    <Image
                      src={branch.images[0]}
                      alt={branch.name}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                  )}
                  {!branch.images[0] && (
                    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900" />
                  )}
                </div>

                {/* Overlay with gradient */}
                <div
                  className={`absolute inset-0 ${
                    index % 2 === 0
                      ? "bg-gradient-to-r from-white/20 to-transparent"
                      : "bg-gradient-to-l from-black/30 to-transparent"
                  }`}
                />

                {/* Location Badge */}
                <div className="absolute top-8 left-8 z-10">
                  <div className="flex items-center gap-3 px-5 py-3 bg-black/80 backdrop-blur-md rounded-full">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-white text-xs uppercase tracking-[0.2em] font-medium">
                      {branch.city}, {branch.country}
                    </span>
                  </div>
                </div>

                {/* Star Rating */}
                <div className="absolute bottom-8 left-8 z-10">
                  <div className="flex items-center gap-1">
                    {[...Array(branch.stars)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-amber-400 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-2 text-white text-sm font-medium">
                      {branch.stars}-Star
                    </span>
                  </div>
                </div>
              </div>

              {/* Content Side */}
              <div
                data-content
                className={`flex flex-col justify-center p-8 md:p-16 lg:p-20 ${
                  index % 2 !== 0 ? "lg:order-1" : ""
                }`}
              >
                {/* Branch Number */}
                <div className="mb-8">
                  <span
                    className={`text-8xl md:text-[12rem] font-black leading-none ${
                      index % 2 === 0 ? "text-gray-100" : "text-white/10"
                    }`}
                  >
                    0{index + 1}
                  </span>
                </div>

                {/* Branch Name */}
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-[0.95]">
                  {branch.name.replace("Nokras ", "").replace("Hotel", "")}
                </h2>

                {/* Divider */}
                <div
                  className={`w-24 h-1 mb-8 ${
                    index % 2 === 0 ? "bg-black" : "bg-white"
                  }`}
                />

                {/* Description */}
                <p
                  className={`text-lg md:text-xl leading-relaxed mb-10 max-w-xl ${
                    index % 2 === 0 ? "text-gray-700" : "text-white/70"
                  }`}
                >
                  {branch.description}
                </p>

                {/* Amenities Grid */}
                <div className="mb-10">
                  <p
                    className={`text-xs uppercase tracking-[0.3em] font-bold mb-4 ${
                      index % 2 === 0 ? "text-gray-500" : "text-white/50"
                    }`}
                  >
                    Featured Amenities
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {branch.amenities.slice(0, 6).map((amenity) => (
                      <div
                        key={amenity}
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${
                          index % 2 === 0
                            ? "bg-gray-100 text-gray-800"
                            : "bg-white/10 text-white/80"
                        }`}
                      >
                        {amenity}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-3 mb-10">
                  {branch.phone && (
                    <a
                      href={`tel:${branch.phone}`}
                      className={`flex items-center gap-3 text-sm ${
                        index % 2 === 0
                          ? "text-gray-600 hover:text-black"
                          : "text-white/60 hover:text-white"
                      } transition-colors`}
                    >
                      <span>📞</span>
                      <span>{branch.phone}</span>
                    </a>
                  )}
                  {branch.email && (
                    <a
                      href={`mailto:${branch.email}`}
                      className={`flex items-center gap-3 text-sm ${
                        index % 2 === 0
                          ? "text-gray-600 hover:text-black"
                          : "text-white/60 hover:text-white"
                      } transition-colors`}
                    >
                      <span>✉️</span>
                      <span>{branch.email}</span>
                    </a>
                  )}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/booking"
                    className={`px-10 py-4 font-bold text-lg transition-all duration-300 ${
                      index % 2 === 0
                        ? "bg-black text-white hover:bg-gray-900"
                        : "bg-white text-black hover:bg-gray-100"
                    }`}
                    onMouseEnter={() => setCursorText("BOOK")}
                    onMouseLeave={() => setCursorText("")}
                  >
                    Book Now
                  </Link>
                  <Link
                    href="/restaurants"
                    className={`px-10 py-4 font-bold text-lg border-2 transition-all duration-300 ${
                      index % 2 === 0
                        ? "border-black text-black hover:bg-black hover:text-white"
                        : "border-white text-white hover:bg-white hover:text-black"
                    }`}
                    onMouseEnter={() => setCursorText("DINE")}
                    onMouseLeave={() => setCursorText("")}
                  >
                    Dining
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ===== FOOTER CTA ===== */}
      <section className="relative bg-black py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "30px 30px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight">
            Find Your
            <br />
            Perfect Stay
          </h3>
          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
            Experience luxury hospitality across Kenya's most breathtaking locations.
            Book your stay today.
          </p>
          <Link
            href="/booking"
            className="inline-block px-14 py-6 bg-white text-purple-600 font-bold text-xl hover:bg-black hover:text-white transition-all duration-300 transform hover:scale-105"
            onMouseEnter={() => setCursorText("GO")}
            onMouseLeave={() => setCursorText("")}
          >
            Explore All Properties
          </Link>
        </div>
      </section>

      {/* ===== FIXED PROGRESS INDICATOR ===== */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3">
        {nokrasLocations.map((location, idx) => (
          <button
            key={location.id}
            onClick={() => {
              const el = document.getElementById(`branch-${idx}`);
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group flex items-center gap-3"
          >
            <span
              className={`text-xs font-medium transition-all duration-300 opacity-0 group-hover:opacity-100 ${
                activeIndex === idx ? "text-white" : "text-white/50"
              }`}
            >
              {location.city}
            </span>
            <div
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                activeIndex === idx
                  ? "bg-white scale-150"
                  : "bg-white/30 group-hover:bg-white/60"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default BranchesShowcase;
