"use client";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

/**
 * Enhanced Home Page - Nokras Luxury Brand
 * Video background with advanced GSAP animations
 * Scroll-engineered interactions throughout
 */
export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // ===== HERO SECTION ENTRANCE ANIMATIONS =====
    const tl = gsap.timeline();

    // Video fade in
    if (videoRef.current) {
      tl.fromTo(
        videoRef.current,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
        },
        0
      );
    }

    // Title stagger reveal with mask effect
    if (titleRef.current) {
      const words = titleRef.current.querySelectorAll("[data-word]");
      tl.fromTo(
        words,
        {
          opacity: 0,
          y: 100,
          rotateX: -90,
          transformOrigin: "center bottom",
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.7)",
        },
        0.3
      );
    }

    // Subtitle fade and slide
    if (subtitleRef.current) {
      tl.fromTo(
        subtitleRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        0.8
      );
    }

    // CTA buttons stagger and scale
    if (ctaRef.current) {
      const buttons = ctaRef.current.querySelectorAll("a, button");
      tl.fromTo(
        buttons,
        {
          opacity: 0,
          scale: 0.8,
          y: 20,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "elastic.out(1, 0.5)",
        },
        1.2
      );
    }

    // ===== FLOATING ELEMENTS =====
    const floatingElements = containerRef.current.querySelectorAll(
      "[data-float]"
    );
    floatingElements.forEach((element, index) => {
      gsap.to(element, {
        y: -20,
        opacity: 0.8,
        duration: 3 + index * 0.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.2,
      });
    });

    // ===== SCROLL ANIMATIONS FOR SECTIONS BELOW =====
    const sections = containerRef.current.querySelectorAll("[data-scroll-section]");
    sections.forEach((section) => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 100,
        duration: 0.8,
        ease: "power2.out",
      });
    });

    // ===== MOUSE PARALLAX EFFECT ON VIDEO =====
    document.addEventListener("mousemove", (e) => {
      if (!videoRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;

      gsap.to(videoRef.current, {
        x,
        y,
        duration: 0.5,
        ease: "power2.out",
        overwrite: "auto",
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full overflow-hidden bg-black -mt-16">
      {/* ===== HERO SECTION WITH VIDEO BACKGROUND ===== */}
      <section
        ref={heroRef}
        className="relative w-full h-screen overflow-hidden flex items-center justify-center"
      >
        {/* Video Background */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          onLoadedData={() => setVideoLoaded(true)}
        >
          <source
            src="/nokras.mp4"
            type="video/mp4"
          />
          {/* Fallback gradient if video doesn't load */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
        </video>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

        {/* Content Overlay */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          {/* Animated Background Accent */}
          <div
            data-float
            className="absolute -top-20 -left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
          />
          <div
            data-float
            className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
          />

          {/* Logo/Brand */}
          <div className="mb-8 opacity-0 animate-fade-in">
            <p className="text-xs md:text-sm uppercase tracking-[0.3em] font-bold text-gray-300">
              Luxury Hospitality Redefined
            </p>
          </div>

          {/* Main Title - Word by Word Reveal */}
          <h1
            ref={titleRef}
            className="text-6xl md:text-8xl font-black text-white leading-[0.9] mb-8 tracking-tighter"
          >
            <span data-word className="block">
              Nokras
            </span>
            <span data-word className="block">
              Group
            </span>
            <span data-word className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              of Hotels
            </span>
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-lg md:text-2xl text-gray-200 max-w-3xl mx-auto mb-12 leading-relaxed opacity-0"
          >
            Where Luxury Meets Nature. Experience world-class hospitality across
            Kenya's most breathtaking locations.
          </p>

          {/* CTA Buttons */}
          <div
            ref={ctaRef}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href="/restaurants"
              className="px-10 py-4 bg-white text-black font-bold text-lg rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
            >
              Explore Dining
            </Link>
            <Link
              href="/booking"
              className="px-10 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-lg rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
            >
              Book a Stay
            </Link>
            <Link
              href="/branches"
              className="px-10 py-4 border-2 border-white text-white font-bold text-lg rounded-lg hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-110"
            >
              Our Properties
            </Link>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section
        data-scroll-section
        className="relative w-full py-20 px-6 bg-gradient-to-b from-black via-gray-900 to-black"
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <p className="text-xs md:text-sm uppercase tracking-[0.3em] font-bold text-gray-400 mb-4">
              Experience
            </p>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
              Four Exceptional Properties
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Nokras Riverine",
                location: "Sagana",
                desc: "Riverside luxury with spa",
                icon: "🏨",
              },
              {
                title: "Nokras Enkare",
                location: "Sagana",
                desc: "Tented camp experience",
                icon: "⛺",
              },
              {
                title: "Hotel Nokras",
                location: "Murang'a",
                desc: "Business hospitality",
                icon: "🏢",
              },
              {
                title: "Nokras Silver Oak",
                location: "Embu",
                desc: "Modern city elegance",
                icon: "✨",
              },
            ].map((property, idx) => (
              <div
                key={idx}
                className="p-6 bg-gray-800/50 backdrop-blur rounded-lg border border-gray-700 hover:border-blue-500 transition-all duration-300 group cursor-pointer hover:scale-105 hover:shadow-lg"
              >
                <div className="text-4xl mb-3 group-hover:scale-125 transition-transform">
                  {property.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {property.title}
                </h3>
                <p className="text-sm text-gray-400 mb-2">{property.location}</p>
                <p className="text-sm text-gray-500">{property.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section
        data-scroll-section
        className="relative w-full py-20 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            Ready to Experience Luxury?
          </h2>
          <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto">
            Book your next getaway with Nokras Group. From riverside retreats to
            mountain escapes, we offer unforgettable experiences.
          </p>
          <Link
            href="/booking"
            className="inline-block px-12 py-5 bg-white text-blue-600 font-bold text-xl rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-110 shadow-xl hover:shadow-2xl"
          >
            Start Your Journey
          </Link>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer
        data-scroll-section
        className="relative w-full py-16 px-6 bg-black border-t border-gray-800"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Nokras Hotels</h3>
              <p className="text-gray-400 text-sm">
                Luxury hospitality across Kenya
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4 text-sm">Properties</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/branches" className="hover:text-white transition">
                    Riverine
                  </Link>
                </li>
                <li>
                  <Link href="/branches" className="hover:text-white transition">
                    Enkare
                  </Link>
                </li>
                <li>
                  <Link href="/branches" className="hover:text-white transition">
                    Silver Oak
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4 text-sm">Dining</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/restaurants" className="hover:text-white transition">
                    Fine Dining
                  </Link>
                </li>
                <li>
                  <Link href="/restaurants" className="hover:text-white transition">
                    Casual Venues
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4 text-sm">Connect</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="mailto:info@nokrashotels.com" className="hover:text-white transition">
                    Email
                  </a>
                </li>
                <li>
                  <a href="tel:+254700000100" className="hover:text-white transition">
                    +254 700 000 100
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
            <p>&copy; 2026 Nokras Group. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
