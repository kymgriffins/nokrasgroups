"use client";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

/**
 * /test1 - Testing & Development Page
 * Playground for new features and animations
 */
export default function Test1Page() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Hero entrance animation
    if (heroRef.current) {
      gsap.from(heroRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power2.out",
      });
    }

    // Staggered elements
    const testItems = containerRef.current.querySelectorAll("[data-test-item]");
    gsap.fromTo(
      testItems,
      {
        opacity: 0,
        y: 60,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.12,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main ref={containerRef} className="w-full bg-white pt-20">
      {/* Hero */}
      <section
        ref={heroRef}
        className="max-w-7xl mx-auto px-6 py-20 text-center"
      >
        <h1 className="text-6xl md:text-7xl font-black text-black mb-6">
          Test Page #1
        </h1>
        <p className="text-xl text-gray-700 max-w-2xl mx-auto">
          Development and testing playground for Nokras features
        </p>
      </section>

      {/* Feature Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-black text-black mb-12">
          Available Features to Test
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Booking System",
              desc: "Test the booking flow with real availability checks",
              link: "/booking",
            },
            {
              title: "Restaurant Showcase",
              desc: "View all dining venues with scroll animations",
              link: "/restaurants",
            },
            {
              title: "Branch Locations",
              desc: "Explore all 4 hotel properties and details",
              link: "/branches",
            },
            {
              title: "Design Patterns",
              desc: "See 25 animation patterns and design system",
              link: "/design",
            },
            {
              title: "Dashboard",
              desc: "Interactive map view and listings management",
              link: "/(dashboard)",
            },
            {
              title: "Hero Magnetic",
              desc: "Cursor-following magnetic button effects",
              link: "/design/hero-magnetic",
            },
          ].map((feature, idx) => (
            <Link
              key={idx}
              href={feature.link}
              data-test-item
              className="p-8 border-2 border-gray-300 rounded-lg hover:border-black hover:shadow-lg transition-all duration-300 group"
            >
              <h3 className="text-2xl font-bold text-black mb-3 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-700">{feature.desc}</p>
              <div className="mt-6 text-sm font-bold text-black group-hover:translate-x-2 transition-transform">
                Test →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Animation Tests */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-black text-black mb-12">
          Animation Test Elements
        </h2>
        <div className="space-y-8">
          {[
            { name: "Fade In", class: "animate-fade-in" },
            { name: "Slide In Up", class: "animate-slide-in-up" },
            { name: "Scale In", class: "animate-scale-in" },
            { name: "Float", class: "animate-float" },
          ].map((anim, idx) => (
            <div
              key={idx}
              data-test-item
              className={`p-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-bold text-xl ${anim.class}`}
            >
              Testing: {anim.name} Animation
            </div>
          ))}
        </div>
      </section>

      {/* Performance Info */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-black text-black mb-12">
          Development Notes
        </h2>
        <div data-test-item className="p-8 bg-gray-100 rounded-lg border-2 border-gray-300">
          <ul className="space-y-4 text-gray-700">
            <li>
              ✅ <strong>Navbar:</strong> Single instance in root layout (fixed)
            </li>
            <li>
              ✅ <strong>Persistent Booking:</strong> Available via "Book Now" button on all pages
            </li>
            <li>
              ✅ <strong>Animations:</strong> GSAP ScrollTrigger for scroll-based effects
            </li>
            <li>
              ✅ <strong>Home Page:</strong> Video background with advanced entrance animations
            </li>
            <li>
              ✅ <strong>Design System:</strong> 25 patterns with documentation
            </li>
            <li>
              ✅ <strong>Responsive:</strong> Mobile-first design approach
            </li>
            <li>
              ✅ <strong>Accessibility:</strong> prefers-reduced-motion support
            </li>
          </ul>
        </div>
      </section>

      {/* Back to Home */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <Link
          href="/"
          className="inline-block px-10 py-4 bg-black text-white font-bold text-lg rounded-lg hover:bg-gray-900 transition-all duration-300 transform hover:scale-110"
        >
          ← Back to Home
        </Link>
      </section>
    </main>
  );
}
