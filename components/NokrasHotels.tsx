'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowDown, Phone, Mail, MapPin, Award, Clock } from 'lucide-react';

const hotels = [
  {
    name: "Enkare",
    tagline: "Wild Elegance Awaits",
    description: "Where the rhythm of the savannah meets five-star sophistication. Experience wildlife encounters from the comfort of absolute luxury.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=80",
    primaryColor: "#8B4513",
    secondaryColor: "#F4A460",
    stats: [
      { label: "Rooms", value: "42" },
      { label: "Acres", value: "850" },
      { label: "Rating", value: "5★" }
    ]
  },
  {
    name: "Murang'a",
    tagline: "Highland Haven",
    description: "Perched among tea-covered hills and misty mountains. A sanctuary where nature's tranquility enhances every moment of your stay.",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1600&q=80",
    primaryColor: "#2F5233",
    secondaryColor: "#7CB342",
    stats: [
      { label: "Rooms", value: "36" },
      { label: "Elevation", value: "2100m" },
      { label: "Rating", value: "5★" }
    ]
  },
  {
    name: "SilverOak",
    tagline: "Urban Refinement",
    description: "In the pulse of Nairobi's business district, discover an oasis of calm. Contemporary design meets impeccable service at every turn.",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1600&q=80",
    primaryColor: "#1C1C1C",
    secondaryColor: "#C0C0C0",
    stats: [
      { label: "Rooms", value: "128" },
      { label: "Floors", value: "24" },
      { label: "Rating", value: "5★" }
    ]
  },
  {
    name: "Riverine",
    tagline: "Waterside Serenity",
    description: "Along the banks of flowing waters, find your perfect escape. Every suite offers intimate access to nature's most peaceful soundtrack.",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1600&q=80",
    primaryColor: "#004D68",
    secondaryColor: "#4FC3F7",
    stats: [
      { label: "Rooms", value: "52" },
      { label: "Riverfront", value: "Yes" },
      { label: "Rating", value: "5★" }
    ]
  }
];

export default function NokrasHotels() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollPercent, setScrollPercent] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / docHeight) * 100;
      setScrollPercent(scrolled);

      const index = Math.min(
        Math.floor((scrollTop / docHeight) * hotels.length),
        hotels.length - 1
      );
      setCurrentIndex(index);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const current = hotels[currentIndex];

  return (
    <div ref={containerRef} className="relative">
      {/* Fixed Background Layer */}
      <div className="fixed inset-0 bg-black">
        {hotels.map((hotel, index) => (
          <div
            key={hotel.name}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{
              opacity: currentIndex === index ? 1 : 0,
            }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
              style={{
                backgroundImage: `url(${hotel.image})`,
                transform: `scale(${currentIndex === index ? 1 : 1.1})`
              }}
            />
            <div
              className="absolute inset-0 transition-all duration-1000"
              style={{
                background: `linear-gradient(to bottom, ${hotel.primaryColor}E6 0%, ${hotel.primaryColor}99 40%, ${hotel.primaryColor}CC 100%)`
              }}
            />
          </div>
        ))}
      </div>

      {/* Fixed Content Layer */}
      <div className="fixed inset-0 flex flex-col">
        {/* Header with Nokras Branding */}
        <header className="px-8 py-8 flex items-start justify-between z-20">
          <div>
            <h1 className="text-8xl md:text-9xl font-serif text-white leading-none tracking-tighter mb-2">
              Nokras
            </h1>
            <p className="text-white/60 text-sm tracking-[0.3em] uppercase">
              Hotels Collection
            </p>
          </div>

          <nav className="hidden md:flex items-center gap-8 mt-6">
            <a href="#reserve" className="text-white/80 hover:text-white transition-colors text-sm tracking-widest uppercase">
              Reserve
            </a>
            <a href="#contact" className="text-white/80 hover:text-white transition-colors text-sm tracking-widest uppercase">
              Contact
            </a>
            <Link href="/booking">
              <button
                className="px-6 py-3 border border-white/40 text-white text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-all"
                style={{ borderColor: current.secondaryColor }}
              >
                Book Now
              </button>
            </Link>
          </nav>
        </header>

        {/* Main Content Area */}
        <div className="flex-1 flex items-center px-8 md:px-16">
          <div className="max-w-4xl">
            {hotels.map((hotel, index) => (
              <div
                key={hotel.name}
                className="absolute transition-all duration-700"
                style={{
                  opacity: currentIndex === index ? 1 : 0,
                  transform: currentIndex === index ? 'translateY(0)' : 'translateY(40px)',
                  pointerEvents: currentIndex === index ? 'auto' : 'none'
                }}
              >
                {/* Property Name */}
                <div className="mb-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className="h-px w-16 transition-colors duration-500"
                      style={{ backgroundColor: hotel.secondaryColor }}
                    />
                    <span
                      className="text-xs tracking-[0.4em] uppercase transition-colors duration-500"
                      style={{ color: hotel.secondaryColor }}
                    >
                      Property {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h2 className="text-7xl md:text-8xl font-serif text-white mb-6 leading-none">
                    {hotel.name}
                  </h2>

                  <p
                    className="text-3xl md:text-4xl font-light italic mb-8 transition-colors duration-500"
                    style={{ color: hotel.secondaryColor }}
                  >
                    {hotel.tagline}
                  </p>
                </div>

                {/* Description */}
                <p className="text-xl text-white/90 leading-relaxed mb-12 max-w-2xl">
                  {hotel.description}
                </p>

                {/* Stats Row */}
                <div className="flex flex-wrap gap-8 mb-12">
                  {hotel.stats.map((stat, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-500"
                        style={{ backgroundColor: `${hotel.secondaryColor}20` }}
                      >
                        <Award
                          className="w-5 h-5 transition-colors duration-500"
                          style={{ color: hotel.secondaryColor }}
                        />
                      </div>
                      <div>
                        <p className="text-2xl font-light text-white">{stat.value}</p>
                        <p className="text-sm text-white/60 uppercase tracking-wider">{stat.label}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex flex-wrap gap-4">
                  <button
                    className="px-10 py-5 text-white text-sm tracking-widest uppercase transition-all hover:scale-105"
                    style={{ backgroundColor: hotel.primaryColor }}
                  >
                    Explore {hotel.name}
                  </button>
                  <button className="px-10 py-5 border-2 border-white/30 text-white text-sm tracking-widest uppercase hover:bg-white/10 transition-all">
                    Virtual Tour
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="px-8 py-8 flex items-center justify-between z-20 border-t border-white/10">
          <div className="flex items-center gap-12">
            <div className="flex items-center gap-3 text-white/60">
              <Phone className="w-4 h-4" />
              <span className="text-sm">+254 700 000 000</span>
            </div>
            <div className="flex items-center gap-3 text-white/60">
              <Mail className="w-4 h-4" />
              <span className="text-sm">stay@nokras.com</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-white/60 text-sm">
              {currentIndex + 1} / {hotels.length}
            </span>
            <div className="flex gap-2">
              {hotels.map((_, index) => (
                <div
                  key={index}
                  className="h-1 w-12 bg-white/20 overflow-hidden"
                >
                  <div
                    className="absolute top-0 left-0 w-full transition-all duration-500"
                    style={{
                      width: currentIndex >= index ? '100%' : '0%',
                      backgroundColor: current.secondaryColor
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="fixed bottom-32 left-1/2 -translate-x-1/2 z-20 text-center animate-bounce">
        <p className="text-white/60 text-xs tracking-widest uppercase mb-3">Scroll</p>
        <ArrowDown className="w-6 h-6 text-white/60 mx-auto" />
      </div>

      {/* Vertical Progress Bar */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-20">
        <div className="h-64 w-px bg-white/20 relative">
          <div
            className="absolute top-0 left-0 w-full transition-all duration-300"
            style={{
              height: `${scrollPercent}%`,
              backgroundColor: current.secondaryColor
            }}
          />

          {hotels.map((hotel, index) => (
            <button
              key={index}
              onClick={() => {
                const targetScroll = (index / hotels.length) * (document.documentElement.scrollHeight - window.innerHeight);
                window.scrollTo({ top: targetScroll, behavior: 'smooth' });
              }}
              className="absolute left-1/2 -translate-x-1/2 group"
              style={{ top: `${(index / (hotels.length - 1)) * 100}%` }}
            >
              <div
                className={`w-3 h-3 rounded-full border-2 transition-all ${
                  currentIndex === index ? 'bg-white scale-125' : 'bg-transparent'
                }`}
                style={{
                  borderColor: currentIndex === index ? current.secondaryColor : 'rgba(255,255,255,0.4)'
                }}
              />
              <span
                className={`absolute right-6 top-1/2 -translate-y-1/2 text-xs whitespace-nowrap transition-all ${
                  currentIndex === index ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ color: current.secondaryColor }}
              >
                {hotel.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Spacer for scroll */}
      <div style={{ height: `${hotels.length * 100}vh` }} />
    </div>
  );
}
