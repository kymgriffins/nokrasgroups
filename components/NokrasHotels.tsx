"use client";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { useWindowSize } from "usehooks-ts";

gsap.registerPlugin(ScrollTrigger);

const NokrasHotels = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useWindowSize();

  useEffect(() => {
    if (!containerRef.current) return;

    // Advanced GSAP Animations without Locomotive
    const animateHero = () => {
      const heroTitle = containerRef.current?.querySelector(".hero-title");
      const heroSubtitle =
        containerRef.current?.querySelector(".hero-subtitle");
      const heroImage = containerRef.current?.querySelector(".hero-image");
      const scrollIndicator =
        containerRef.current?.querySelector(".scroll-indicator");

      if (heroTitle) {
        const chars = heroTitle.textContent?.split("") || [];
        heroTitle.innerHTML = chars
          .map((char: string) => `<span class="char">${char}</span>`)
          .join("");

        gsap.from(".hero-title .char", {
          opacity: 0,
          y: 100,
          duration: 0.8,
          stagger: 0.05,
          delay: 0.2,
        });
      }

      if (heroSubtitle) {
        gsap.from(".hero-subtitle", {
          opacity: 0,
          y: 30,
          duration: 1,
          delay: 0.5,
        });
      }

      if (heroImage) {
        gsap.from(".hero-image", {
          opacity: 0,
          scale: 1.2,
          duration: 1.5,
          delay: 0.3,
          ease: "power2.out",
        });
      }

      if (scrollIndicator) {
        gsap.to(".scroll-indicator", {
          opacity: 0.3,
          y: 10,
          duration: 0.6,
          repeat: -1,
          yoyo: true,
        });
      }
    };

    const animateTextReveal = () => {
      gsap.utils.toArray(".text-reveal").forEach((element: any) => {
        const words = element.innerText.split(" ");
        element.innerHTML = words
          .map((word: string) => `<span class="word-span">${word}</span>`)
          .join(" ");

        gsap.from(element.querySelectorAll(".word-span"), {
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          opacity: 0.3,
          y: 20,
          duration: 0.6,
          stagger: 0.05,
        });
      });
    };

    const animateImageParallax = () => {
      gsap.utils.toArray(".parallax-image").forEach((element: any) => {
        gsap.to(element, {
          scrollTrigger: {
            trigger: element,
            start: "top center",
            end: "bottom center",
            scrub: 1,
          },
          y: -100,
          ease: "none",
        });
      });
    };

    const animateCards = () => {
      gsap.utils
        .toArray(".feature-card")
        .forEach((element: any, index: number) => {
          gsap.from(element, {
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            opacity: 0,
            y: 50,
            x: index % 2 === 0 ? -50 : 50,
            duration: 0.8,
            ease: "power3.out",
          });

          // Hover effect
          element.addEventListener("mouseenter", () => {
            gsap.to(element, {
              scale: 1.05,
              duration: 0.3,
              ease: "power2.out",
            });
          });

          element.addEventListener("mouseleave", () => {
            gsap.to(element, {
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
            });
          });
        });
    };

    const animateCounters = () => {
      gsap.utils.toArray(".counter").forEach((element: any) => {
        const finalValue = parseInt(
          element.getAttribute("data-value") || "0",
          10,
        );

        const obj = { value: 0 };

        gsap.to(obj, {
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          value: finalValue,
          duration: 2,
          ease: "power1.inOut",
          onUpdate: () => {
            element.textContent = Math.floor(obj.value);
          },
        });
      });
    };

    const animateBottomCTA = () => {
      const cta = containerRef.current?.querySelector(".cta-button");
      if (cta) {
        cta.addEventListener("mouseenter", () => {
          gsap.to(cta, {
            scale: 1.1,
            duration: 0.3,
            ease: "back.out",
          });
        });

        cta.addEventListener("mouseleave", () => {
          gsap.to(cta, {
            scale: 1,
            duration: 0.3,
            ease: "back.out",
          });
        });
      }
    };

    const animateCarousel = () => {
      const carousel = containerRef.current?.querySelector(
        ".distinctions-carousel"
      );
      const carouselSection = containerRef.current?.querySelector(
        ".distinctions-carousel"
      )?.parentElement?.parentElement;

      if (carousel && carouselSection) {
        const carouselWidth = (carousel as HTMLElement).scrollWidth;
        const viewportWidth = window.innerWidth;
        const scrollDistance = carouselWidth - viewportWidth;

        gsap.to(carousel, {
          scrollTrigger: {
            trigger: carouselSection,
            start: "top bottom",
            end: `bottom+=${scrollDistance} bottom`,
            scrub: 0.8,
            pin: true,
            pinSpacing: true,
            markers: false,
            invalidateOnRefresh: true,
          },
          x: -scrollDistance,
          ease: "none",
        });
      }
    };

    // Wait for next frame to ensure DOM is ready
    requestAnimationFrame(() => {
      animateHero();
      animateTextReveal();
      animateImageParallax();
      animateCards();
      animateCounters();
      animateBottomCTA();
      animateCarousel();
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [width]);

  return (
    <div
      ref={containerRef}
      className="w-full bg-black text-white overflow-x-hidden"
    >
      {/* Hero Section */}
      <section className="hero-section relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/hotels/1670070953-3W1A6479.jpg"
            alt="Luxury Hotel"
            className="hero-image w-full h-full object-cover"
            style={{ filter: "brightness(0.4) grayscale(1)" }}
          />
        </div>

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 text-center">
          <h1 className="hero-title text-7xl md:text-8xl font-bold tracking-tighter mb-6 overflow-hidden">
            NOKRAS
          </h1>
          <p className="hero-subtitle text-xl md:text-2xl font-light tracking-widest text-gray-300">
            LUXURY REDEFINED
          </p>
        </div>

        <div className="scroll-indicator absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white rounded-full mt-2" />
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 px-6 md:px-12 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light mb-12 text-center text-white">
            Experience Unparalleled Elegance
          </h2>
          <p className="text-gray-400 text-center text-lg md:text-xl leading-relaxed max-w-3xl mx-auto text-reveal">
            Discover a sanctuary of sophistication where luxury transcends the
            ordinary. Every detail curated for the discerning traveler seeking
            the pinnacle of comfort and exclusivity.
          </p>
        </div>
      </section>

      {/* Image Grid Section */}
      <section className="py-20 px-6 md:px-12 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="relative h-96 overflow-hidden group">
              <img
                src="/accommodation/1670073747-3W1A5836.jpg"
                alt="Accommodation"
                className="parallax-image w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                style={{ filter: "grayscale(1)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-start p-6">
                <h3 className="text-2xl font-light">Rooms & Suites</h3>
              </div>
            </div>

            <div className="relative h-96 overflow-hidden group">
              <img
                src="/hotels/1670070953-3W1A6479.jpg"
                alt="Amenities"
                className="parallax-image w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                style={{ filter: "grayscale(1)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-start p-6">
                <h3 className="text-2xl font-light">World-Class Amenities</h3>
              </div>
            </div>
          </div>

          <div className="relative h-96 overflow-hidden group">
            <img
              src="/hotels/1670163328-3W1A6953.jpg"
              alt="Dining"
              className="parallax-image w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              style={{ filter: "grayscale(1)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-start p-6">
              <h3 className="text-2xl font-light">Culinary Excellence</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Distinctions Section - Horizontal Scroll Carousel */}
      <section className="relative h-screen bg-black overflow-hidden">
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h2 className="text-5xl md:text-6xl font-light text-center absolute top-12 z-10 text-white">
            Activities & Experiences
          </h2>

          {/* Horizontal Scroll Container */}
          <div className="w-full h-full flex items-center justify-start overflow-hidden">
            <div className="distinctions-carousel flex gap-6 px-12" style={{ width: "max-content" }}>
              {[
                {
                  title: "Kayaking Adventures",
                  image: "/activities/kayak.jpg",
                },
                {
                  title: "Archery Experience",
                  image: "/activities/archery.jpg",
                },
                {
                  title: "Barbecue Evenings",
                  image: "/activities/barbaque.jpg",
                },
                {
                  title: "Fishing Expeditions",
                  image: "/activities/fishing.jpg",
                },
                {
                  title: "Gym & Fitness",
                  image: "/activities/gym.jpg",
                },
                {
                  title: "Outdoor Table Tennis",
                  image: "/activities/outdoor tabletennis.jpg",
                },
                {
                  title: "Poolside Relaxation",
                  image: "/activities/pool.jpg",
                },
                {
                  title: "Sports & Fun",
                  image: "/activities/sports fun.jpg",
                },
                {
                  title: "Wildlife Photography",
                  image: "/activities/wildlife.jpg",
                },
                {
                  title: "Darts Tournament",
                  image: "/activities/1634744411-darts.jpg",
                },
                {
                  title: "Scrabble Nights",
                  image: "/activities/1634744419-scrabble.jpg",
                },
                {
                  title: "Kayaking on the Lake",
                  image: "/activities/1634744397-kayaking.jpg",
                },
                {
                  title: "Nature Photography",
                  image: "/activities/1656692984-1501501042-DSC_0428.jpg",
                },
                {
                  title: "Adventure Activities",
                  image: "/activities/1656692997-1501500752-3W1A2268.jpg",
                },
                {
                  title: "Outdoor Exploration",
                  image: "/activities/1656693116-1501501153-3W1A2402.jpg",
                },
                {
                  title: "Sports Photography",
                  image: "/activities/1656693148-1501502212-DSC_0366-2.jpg",
                },
                {
                  title: "Aerial Photography",
                  image: "/activities/1671254945-DJI_0125.jpg",
                },
                {
                  title: "Archery Training",
                  image: "/activities/1671358476-3W1A6047.jpg",
                },
                {
                  title: "Outdoor Adventures",
                  image: "/activities/1671358499-3W1A6440.jpg",
                },
                {
                  title: "Nature Photography",
                  image: "/activities/1671358509-P1530700.jpg",
                },
                {
                  title: "Wildlife Safari",
                  image: "/activities/1671359841-P1555522.jpg",
                },
                {
                  title: "Fishing Expedition",
                  image: "/activities/fishing 2.jpg",
                },
                {
                  title: "Sunset Photography",
                  image: "/activities/1671254936-P1570280.jpg",
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="activity-card flex-shrink-0 w-80 h-96 relative overflow-hidden group rounded-lg"
                >
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    style={{ filter: "grayscale(1)" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-2xl font-light text-white">
                      {activity.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400 text-sm tracking-widest">
            SCROLL TO EXPLORE
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 px-6 md:px-12 bg-black border-y border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Years of Excellence", value: 25 },
              { label: "Guest Experiences", value: 500 },
              { label: "Award Recognitions", value: 85 },
              { label: "Global Destinations", value: 12 },
            ].map((stat, index) => (
              <div key={index}>
                <div
                  className="counter text-5xl md:text-6xl font-light mb-2"
                  data-value={stat.value}
                >
                  0
                </div>
                <p className="text-gray-400 text-sm md:text-base uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 px-6 md:px-12 bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-light mb-16 text-center">
            Gallery Showcase
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "/accommodation/1670073747-3W1A5836.jpg",
              "/hotels/1670070953-3W1A6479.jpg",
              "/accommodation/1670073975-3W1A5959.jpg",
              "/hotels/1670070960-P1530644.jpg",
              "/accommodation/1670074055-3W1A5927.jpg",
              "/hotels/1670163328-3W1A6953.jpg",
              "/accommodation/1670064577-3W1A2309.jpg",
              "/hotels/1670163348-3W1A7156.jpg",
            ].map((src, index) => (
              <div
                key={index}
                className="relative h-64 md:h-72 overflow-hidden group"
              >
                <img
                  src={src}
                  alt={`Gallery ${index + 1}`}
                  className="parallax-image w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  style={{ filter: "grayscale(1) brightness(0.9)" }}
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 md:px-12 bg-black border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-light mb-16 text-center">
            Guest Stories
          </h2>

          {[
            {
              quote:
                "An extraordinary sanctuary where elegance meets perfection in every detail.",
              author: "Alexandra Sterling",
              title: "Travel Connoisseur",
            },
            {
              quote:
                "The epitome of luxury hospitality. A transformative experience beyond expectation.",
              author: "Marcus Chen",
              title: "Luxury Traveler",
            },
            {
              quote:
                "Where sophistication becomes an art form. Truly incomparable.",
              author: "Isabelle Rousseau",
              title: "Design Enthusiast",
            },
          ].map((testimonial, index) => (
            <div
              key={index}
              className="feature-card mb-8 bg-white/5 backdrop-blur-sm border border-white/10 p-8 md:p-12"
            >
              <p className="text-xl md:text-2xl font-light italic mb-6 text-gray-100">
                "{testimonial.quote}"
              </p>
              <div className="flex flex-col">
                <span className="font-light text-white">
                  {testimonial.author}
                </span>
                <span className="text-gray-400 text-sm">
                  {testimonial.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/hotels/1670163429-DJI_0083.jpg"
            alt="Call to Action"
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.3) grayscale(1)" }}
          />
        </div>

        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 text-center">
          <h2 className="text-5xl md:text-7xl font-light mb-8">
            Begin Your Journey
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-12">
            Discover the pinnacle of hospitality
          </p>
          <button className="cta-button px-12 py-4 bg-white text-black font-light text-lg tracking-widest hover:bg-gray-200 transition-all duration-300 active:scale-95">
            RESERVE NOW
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-xl font-light mb-4">NOKRAS</h3>
              <p className="text-gray-400 text-sm">
                Luxury redefined for the discerning traveler.
              </p>
            </div>
            <div>
              <h4 className="text-sm uppercase tracking-widest mb-4 text-gray-300">
                Properties
              </h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Silver Oak Resort
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Mountain Retreat
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Urban Sanctuary
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm uppercase tracking-widest mb-4 text-gray-300">
                Experiences
              </h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Wellness
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Dining
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Events
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm uppercase tracking-widest mb-4 text-gray-300">
                Connect
              </h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center text-gray-500 text-sm">
            <p>&copy; 2026 NOKRAS Luxury Hotels. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NokrasHotels;
