"use client";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { useWindowSize } from "usehooks-ts";

gsap.registerPlugin(ScrollTrigger);

// Custom eases for luxury feel
const luxuryEase = "power2.out";
const entranceEase = "cubic-bezier(0.16, 1, 0.3, 1)";
const exitEase = "cubic-bezier(0.7, 0, 0.84, 0)";

// Preloader Component - Entry Sequence
const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const preloaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!preloaderRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(onComplete, 300);
      }
    });

    // Logo materializes from negative space
    tl.fromTo(".preloader-logo",
      {
        opacity: 0,
        scale: 0.8,
        filter: "blur(10px)"
      },
      {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.8,
        ease: entranceEase
      }
    )
    // Blueprint lines draw themselves
    .fromTo(".blueprint-line",
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.2,
        transformOrigin: "left",
        ease: luxuryEase
      },
      "-=0.4"
    )
    // Melt into luxurious texture
    .to(".preloader-logo", {
      filter: "blur(2px)",
      duration: 0.6,
      ease: exitEase
    })
    .to(".blueprint-line", {
      opacity: 0,
      duration: 0.6,
      ease: exitEase
    }, "-=0.6")
    .to(preloaderRef.current, {
      opacity: 0,
      duration: 0.4,
      onComplete: () => {
        if (preloaderRef.current) {
          preloaderRef.current.style.display = "none";
        }
      }
    });

  }, [onComplete]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 bg-black z-50 flex items-center justify-center"
    >
      <div className="text-center">
        <div className="preloader-logo text-5xl md:text-7xl font-light tracking-widest mb-6 text-white relative">
          NOKRAS
          <div className="blueprint-line absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent origin-left scale-x-0"></div>
        </div>
      </div>
    </div>
  );
};

const NokrasHotels = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useWindowSize();
  const [isLoading, setIsLoading] = useState(true);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
    // Start cinematic sequence after preloader
    setTimeout(() => {
      animateHeroSection();
    }, 200);
  };

  // FRAME 1: Hero Section animation (2s-8s)
  const animateHeroSection = () => {
    const tl = gsap.timeline();

    // 2.0s: Full-bleed hero video/image reveals
    tl.fromTo(".hero-image", {
      opacity: 0,
      scale: 1.0
    }, {
      opacity: 1,
      scale: 1.0,
      duration: 0.8,
      ease: "cubic-bezier(0.16, 1, 0.3, 1)"
    })
    // Slow ken burns zoom (scale 1.0 → 1.1 over 15s)
    .to(".hero-image", {
      scale: 1.1,
      duration: 15,
      ease: "none"
    }, "-=0.8")
    // Subtle vignette darkens edges for text contrast
    .fromTo(".hero-vignette", {
      opacity: 0
    }, {
      opacity: 1,
      duration: 1,
      ease: "power2.out"
    }, "-=0.8");

    // 2.4s: Hotel name/logo entrance
    tl.fromTo(".hero-title", {
      opacity: 0,
      letterSpacing: "0.3em"
    }, {
      opacity: 1,
      letterSpacing: "0.15em",
      duration: 0.8,
      ease: "cubic-bezier(0.16, 1, 0.3, 1)"
    }, "-=0.6");

    // 3.0s: Primary headline stagger
    const headlineWords = ["Experience", "•", "Timeless", "•", "Elegance"];
    tl.fromTo(".headline-word", {
      opacity: 0,
      y: 30
    }, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "cubic-bezier(0.16, 1, 0.3, 1)"
    }, "-=0.4");

    // 3.8s: Subheadline/tagline
    tl.fromTo(".hero-subtitle", {
      opacity: 0,
      filter: "blur(2px)"
    }, {
      opacity: 1,
      filter: "blur(0px)",
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.2");

    // 4.6s: CTA button materializes
    tl.fromTo(".cta-button-outline", {
      scaleX: 0,
      opacity: 0
    }, {
      scaleX: 1,
      opacity: 1,
      duration: 0.6,
      transformOrigin: "center",
      ease: "cubic-bezier(0.16, 1, 0.3, 1)"
    })
    .fromTo(".cta-button", {
      opacity: 0
    }, {
      opacity: 1,
      duration: 0.4,
      ease: "power2.out"
    }, "-=0.2");

    // 5.2s: Scroll indicator appears
    tl.fromTo(".scroll-indicator", {
      opacity: 0,
      y: 20
    }, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "cubic-bezier(0.16, 1, 0.3, 1)"
    })
    // Gentle bounce loop (2s cycle)
    .to(".scroll-indicator", {
      y: 10,
      duration: 0.6,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    }, "-=0.3");

    return tl;
  };

  useEffect(() => {
    if (!containerRef.current || isLoading) return;

    // Navigation scroll effect
    const animateNavigation = () => {
      gsap.to(".nav-background", {
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "top -100",
          scrub: 0.5,
        },
        opacity: 1,
        ease: "none",
      });
    };

    // Hero Section animations
    const animateHeroSection = () => {
      const tl = gsap.timeline();

      // Video background with Ken Burns effect
      tl.fromTo(".hero-video", {
        scale: 1.0,
        opacity: 0
      }, {
        scale: 1.0,
        opacity: 1,
        duration: 1.2,
        ease: entranceEase
      })
      .to(".hero-video", {
        scale: 1.1,
        duration: 20,
        ease: "none"
      }, "-=1.2");

      // Title with letter spacing animation
      tl.fromTo(".hero-title", {
        opacity: 0,
        letterSpacing: "0.5em",
        filter: "blur(10px)"
      }, {
        opacity: 1,
        letterSpacing: "0.1em",
        filter: "blur(0px)",
        duration: 1.2,
        ease: entranceEase
      }, "-=0.8");

      // Headline stagger
      const headlineWords = document.querySelectorAll(".headline-word");
      tl.fromTo(headlineWords, {
        opacity: 0,
        y: 40,
        filter: "blur(5px)"
      }, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.8,
        stagger: 0.15,
        ease: luxuryEase
      }, "-=0.6");

      // CTA button with scale effect
      tl.fromTo(".cta-button", {
        opacity: 0,
        scale: 0.8,
        filter: "blur(3px)"
      }, {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.8,
        ease: entranceEase
      }, "-=0.4");

      // Scroll indicator with continuous bounce
      tl.fromTo(".scroll-indicator", {
        opacity: 0,
        y: 30
      }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: luxuryEase
      }, "-=0.2")
      .to(".scroll-indicator", {
        y: 15,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      }, "-=0.6");

      return tl;
    };

    // Architecture Section animations
    const animateArchitectureSection = () => {
      const section = containerRef.current?.querySelector("#architecture");
      if (!section) return;

      // Section title
      gsap.fromTo(section.querySelector("h2"), {
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 50,
        filter: "blur(5px)"
      }, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: luxuryEase
      });

      // Space reveals with staggered timing
      gsap.utils.toArray(".space-reveal").forEach((element: any, index: number) => {
        gsap.fromTo(element, {
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          x: index % 2 === 0 ? -100 : 100,
          filter: "blur(10px)"
        }, {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 1.2,
          ease: luxuryEase
        });

        // Animated connecting lines
        gsap.fromTo(element.querySelector(".connecting-line"), {
          scaleX: 0,
          opacity: 0
        }, {
          scaleX: 1,
          opacity: 1,
          duration: 1.5,
          ease: luxuryEase,
          delay: 0.3
        });
      });

      // Room carousel horizontal scroll
      const roomCarousel = section.querySelector(".room-carousel");
      if (roomCarousel) {
        gsap.to(roomCarousel, {
          scrollTrigger: {
            trigger: section,
            start: "center center",
            end: "bottom top",
            scrub: 1,
          },
          x: -roomCarousel.scrollWidth + window.innerWidth,
          ease: "none",
        });
      }
    };

    // Experiential Section animations
    const animateExperiencesSection = () => {
      const section = containerRef.current?.querySelector("#experiences");
      if (!section) return;

      // Section title
      gsap.fromTo(section.querySelector("h2"), {
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 50,
        filter: "blur(5px)"
      }, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: luxuryEase
      });

      // Morphing icons with color flood
      gsap.utils.toArray(".amenity-icon").forEach((element: any, index: number) => {
        gsap.fromTo(element, {
          scrollTrigger: {
            trigger: element,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          scale: 0.8,
          filter: "blur(5px)"
        }, {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.8,
          ease: luxuryEase,
          delay: index * 0.1
        });
      });

      // 3D card flip effects
      gsap.utils.toArray(".experience-card").forEach((element: any) => {
        const cardInner = element.querySelector(".card-inner");

        element.addEventListener("mouseenter", () => {
          gsap.to(cardInner, {
            rotationY: 180,
            duration: 0.8,
            ease: luxuryEase
          });
        });

        element.addEventListener("mouseleave", () => {
          gsap.to(cardInner, {
            rotationY: 0,
            duration: 0.8,
            ease: luxuryEase
          });
        });
      });

      // Culinary parallax
      const culinaryGallery = section.querySelector(".culinary-parallax .food-gallery");
      if (culinaryGallery) {
        gsap.to(culinaryGallery, {
          scrollTrigger: {
            trigger: section,
            start: "center center",
            end: "bottom top",
            scrub: 1,
          },
          x: -culinaryGallery.scrollWidth + window.innerWidth,
          ease: "none",
        });
      }
    };

    // Room Showcase animations
    const animateShowcaseSection = () => {
      const section = containerRef.current?.querySelector("#showcase");
      if (!section) return;

      // Section title
      gsap.fromTo(section.querySelector("h2"), {
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 50,
        filter: "blur(5px)"
      }, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: luxuryEase
      });

      // Room viewport scroll-triggered zoom
      const roomViewport = section.querySelector(".room-viewport");
      if (roomViewport) {
        gsap.to(roomViewport.querySelector("img"), {
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "center center",
            scrub: 1,
          },
          scale: 1.2,
          ease: "none",
        });
      }

      // Feature highlights
      gsap.utils.toArray(".feature-highlight").forEach((element: any, index: number) => {
        gsap.fromTo(element, {
          scrollTrigger: {
            trigger: element,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          scale: 0.5
        }, {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: luxuryEase,
          delay: index * 0.2
        });
      });
    };

    // Location & Context animations
    const animateLocationSection = () => {
      const section = containerRef.current?.querySelector(".py-32.px-6.md\\:px-12.bg-black:nth-child(7)");
      if (!section) return;

      // SVG map animations
      const connectionLines = section.querySelectorAll(".connection-line");
      gsap.fromTo(connectionLines, {
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        strokeDasharray: "1000",
        strokeDashoffset: "1000"
      }, {
        strokeDashoffset: 0,
        duration: 2,
        ease: luxuryEase
      });

      // Landmark info reveal
      gsap.fromTo(".landmark-info", {
        scrollTrigger: {
          trigger: section,
          start: "center 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        x: -50
      }, {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: luxuryEase
      });

      // Location video parallax
      const locationVideo = section.querySelector(".location-video video");
      if (locationVideo) {
        gsap.to(locationVideo, {
          scrollTrigger: {
            trigger: section,
            start: "center top",
            end: "bottom top",
            scrub: 1,
          },
          y: -200,
          ease: "none",
        });
      }
    };

    // Testimonials cascade animation
    const animateTestimonialsSection = () => {
      const section = containerRef.current?.querySelector(".py-32.px-6.md\\:px-12.bg-black:nth-child(8)");
      if (!section) return;

      gsap.utils.toArray(".testimonial-card").forEach((element: any, index: number) => {
        gsap.fromTo(element, {
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 100,
          rotation: 5
        }, {
          opacity: 1,
          y: 0,
          rotation: 0,
          duration: 1,
          ease: luxuryEase,
          delay: index * 0.2
        });
      });

      // Typewriter effect for testimonial text
      gsap.utils.toArray(".typewriter-text").forEach((element: any) => {
        const text = element.textContent;
        element.textContent = "";
        gsap.to({}, {
          scrollTrigger: {
            trigger: element,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
          duration: text.length * 0.05,
          onUpdate: function() {
            const progress = Math.floor(this.progress() * text.length);
            element.textContent = text.substring(0, progress);
          }
        });
      });
    };

    // Booking form animations
    const animateBookingSection = () => {
      const section = containerRef.current?.querySelector("#booking");
      if (!section) return;

      // Form field focus effects
      gsap.utils.toArray(".form-group input, .form-group select").forEach((element: any) => {
        element.addEventListener("focus", () => {
          gsap.to(element, {
            scale: 1.02,
            borderColor: "rgba(255, 255, 255, 0.6)",
            duration: 0.3,
            ease: luxuryEase
          });
        });

        element.addEventListener("blur", () => {
          gsap.to(element, {
            scale: 1,
            borderColor: "rgba(255, 255, 255, 0.3)",
            duration: 0.3,
            ease: luxuryEase
          });
        });
      });

      // Magnetic button effect
      const checkButton = section.querySelector(".check-availability-btn");
      if (checkButton) {
        section.addEventListener("mousemove", (e: any) => {
          const rect = checkButton.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const deltaX = e.clientX - centerX;
          const deltaY = e.clientY - centerY;
          const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

          if (distance < 200) {
            gsap.to(checkButton, {
              x: deltaX * 0.1,
              y: deltaY * 0.1,
              duration: 0.3,
              ease: luxuryEase
            });
          }
        });
      }
    };

    // Footer particle burst on hover
    const animateFooter = () => {
      const footer = containerRef.current?.querySelector("footer");
      if (!footer) return;

      gsap.utils.toArray(".social-icon").forEach((element: any) => {
        element.addEventListener("mouseenter", () => {
          gsap.to(element, {
            scale: 1.1,
            duration: 0.3,
            ease: "back.out(1.7)"
          });
        });

        element.addEventListener("mouseleave", () => {
          gsap.to(element, {
            scale: 1,
            duration: 0.3,
            ease: luxuryEase
          });
        });
      });
    };

    // Micro-interactions: Tilt effect on images
    const addTiltEffect = () => {
      gsap.utils.toArray("img").forEach((element: any) => {
        element.addEventListener("mousemove", (e: any) => {
          const rect = element.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const deltaX = (e.clientX - centerX) / rect.width;
          const deltaY = (e.clientY - centerY) / rect.height;

          gsap.to(element, {
            rotationY: deltaX * 5,
            rotationX: -deltaY * 5,
            duration: 0.3,
            ease: luxuryEase
          });
        });

        element.addEventListener("mouseleave", () => {
          gsap.to(element, {
            rotationY: 0,
            rotationX: 0,
            duration: 0.5,
            ease: luxuryEase
          });
        });
      });
    };

    // Initialize all animations
    requestAnimationFrame(() => {
      animateNavigation();
      animateHeroSection();
      animateArchitectureSection();
      animateExperiencesSection();
      animateShowcaseSection();
      animateLocationSection();
      animateTestimonialsSection();
      animateBookingSection();
      animateFooter();
      addTiltEffect();
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [width, isLoading]);

  return (
    <>
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}

      <div
        ref={containerRef}
        className="w-full bg-black text-white overflow-x-hidden"
      >
        {/* Navigation Bar - Dematerializes on scroll */}
        <nav className="fixed top-0 left-0 right-0 z-40 transition-all duration-500">
          <div className="nav-background absolute inset-0 bg-black/80 backdrop-blur-md opacity-0"></div>
          <div className="relative flex justify-between items-center px-6 py-4 md:px-12">
            <div className="text-2xl font-light tracking-wider">NOKRAS</div>
            <div className="hidden md:flex space-x-8">
              <a href="#architecture" className="text-sm uppercase tracking-wider hover:text-gray-300 transition-colors">Spaces</a>
              <a href="#experiences" className="text-sm uppercase tracking-wider hover:text-gray-300 transition-colors">Experiences</a>
              <a href="#showcase" className="text-sm uppercase tracking-wider hover:text-gray-300 transition-colors">Suites</a>
              <a href="#booking" className="text-sm uppercase tracking-wider hover:text-gray-300 transition-colors">Reserve</a>
            </div>
          </div>
        </nav>

        {/* 1. Hero Section – The Grand Arrival */}
        <section className="hero-section relative h-screen w-full flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <video
              src="/nokras.mp4"
              autoPlay
              muted
              loop
              className="hero-video w-full h-full object-cover"
              style={{ filter: "brightness(0.4) contrast(1.1)" }}
            />
          </div>

          {/* Parallax tilt effect */}
          <div className="hero-vignette absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/30" />

          <div className="absolute inset-0 bg-black/40" />

          <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
            <h1 className="hero-title text-4xl sm:text-5xl md:text-8xl font-light tracking-tighter mb-6 sm:mb-8 text-white">
              An Escape Perfected
            </h1>

            {/* Headline arrives with weighted grace */}
            <div className="mb-8 sm:mb-12 flex flex-wrap justify-center">
              {["Where", "luxury", "meets", "serenity"].map((word, index) => (
                <span key={index} className="headline-word text-lg sm:text-xl md:text-2xl font-light tracking-wide text-gray-200 mx-1.5 sm:mx-3 mb-2">
                  {word}
                </span>
              ))}
            </div>

            {/* CTA with persistent glow-pulse */}
            <div className="relative inline-block">
              <button className="cta-button px-8 py-4 bg-transparent border-2 border-white text-white font-light text-lg tracking-wider hover:bg-white hover:text-black transition-all duration-500 relative overflow-hidden group">
                <span className="relative z-10">Discover Your Suite</span>
                <div className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></div>
              </button>
            </div>
          </div>

          <div className="scroll-indicator absolute bottom-10 left-1/2 transform -translate-x-1/2">
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-2 bg-white rounded-full mt-2 animate-bounce" />
            </div>
          </div>
        </section>

        {/* 2. The Architecture & Space Section */}
        <section id="architecture" className="py-32 px-6 md:px-12 bg-black">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-light mb-20 text-center">
              Architectural Harmony
            </h2>

            {/* Staggered image reveals with connected lines */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              {[
                { image: "/accommodation/1670073747-3W1A5836.jpg", title: "Sweeping Staircase", desc: "A symphony of curves and light" },
                { image: "/hotels/1670070953-3W1A6479.jpg", title: "Sunlit Corridor", desc: "Natural illumination guides your path" },
                { image: "/accommodation/1670073975-3W1A5959.jpg", title: "Grand Atrium", desc: "Open spaces that breathe elegance" }
              ].map((space, index) => (
                <div key={index} className="space-reveal relative group">
                  <div className="relative h-96 overflow-hidden">
                    <img
                      src={space.image}
                      alt={space.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      style={{ filter: "grayscale(0.8) contrast(1.1)" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    {/* Animated connecting line */}
                    <div className="connecting-line absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-white to-transparent opacity-30"></div>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl font-light text-white mb-2">{space.title}</h3>
                    <p className="text-gray-300 text-sm">{space.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Horizontal scroll for room types */}
            <div className="room-carousel-section">
              <h3 className="text-3xl md:text-4xl font-light mb-12 text-center">Room Types</h3>
              <div className="room-carousel flex gap-8 overflow-x-auto pb-8 px-4">
                {[
                  { name: "Deluxe Suite", image: "/accommodation/1670073747-3W1A5836.jpg", size: "85 m²" },
                  { name: "Executive Villa", image: "/hotels/1670070953-3W1A6479.jpg", size: "120 m²" },
                  { name: "Presidential Suite", image: "/accommodation/1670073975-3W1A5959.jpg", size: "200 m²" },
                  { name: "Garden Pavilion", image: "/hotels/1670163328-3W1A6953.jpg", size: "150 m²" }
                ].map((room, index) => (
                  <div key={index} className="room-card flex-shrink-0 w-80 h-96 relative overflow-hidden group cursor-pointer">
                    <img
                      src={room.image}
                      alt={room.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      style={{ filter: "grayscale(0.9) brightness(0.9)" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <h4 className="text-xl font-light text-white mb-1">{room.name}</h4>
                      <p className="text-gray-300 text-sm">{room.size}</p>
                    </div>
                    {/* Scale effect on active card */}
                    <div className="absolute inset-0 border-2 border-white/30 scale-95 group-hover:scale-100 transition-transform duration-300"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 3. The Experiential Section – Amenities & Moments */}
        <section id="experiences" className="py-32 px-6 md:px-12 bg-black relative">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-light mb-20 text-center">
              Sensory Indulgence
            </h2>

            {/* Morphing icons that flood with color */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
              {[
                { icon: "🧖", name: "Spa & Wellness", desc: "Rejuvenating therapies" },
                { icon: "🍽️", name: "Fine Dining", desc: "Culinary artistry" },
                { icon: "🏊", name: "Infinity Pool", desc: "Serene aquatic haven" },
                { icon: "🌿", name: "Garden Retreat", desc: "Natural tranquility" }
              ].map((amenity, index) => (
                <div key={index} className="amenity-icon relative group cursor-pointer">
                  <div className="text-center">
                    <div className="icon-container text-6xl mb-4 relative overflow-hidden">
                      <span className="morphing-icon">{amenity.icon}</span>
                      <div className="color-flood absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full"></div>
                    </div>
                    <h4 className="text-xl font-light text-white mb-2">{amenity.name}</h4>
                    <p className="text-gray-400 text-sm">{amenity.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* 3D card flip effects */}
            <div className="experience-cards grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Culinary Journey", image: "/dining/1670163328-3W1A6953.jpg", tagline: "Where flavor meets art" },
                { title: "Wellness Sanctuary", image: "/hotels/1670070953-3W1A6479.jpg", tagline: "Harmony of body and mind" },
                { title: "Adventure Awaits", image: "/activities/kayak.jpg", tagline: "Explore beyond boundaries" }
              ].map((exp, index) => (
                <div key={index} className="experience-card relative h-80 group cursor-pointer perspective-1000">
                  <div className="card-inner relative w-full h-full transition-transform duration-700 group-hover:rotate-y-180">
                    {/* Front */}
                    <div className="card-face absolute inset-0">
                      <img
                        src={exp.image}
                        alt={exp.title}
                        className="w-full h-full object-cover"
                        style={{ filter: "grayscale(0.7) brightness(0.8)" }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-6 left-6 right-6">
                        <h4 className="text-2xl font-light text-white">{exp.title}</h4>
                      </div>
                    </div>
                    {/* Back */}
                    <div className="card-face absolute inset-0 rotate-y-180 bg-black/90 flex items-center justify-center">
                      <p className="text-xl font-light text-white text-center px-6">{exp.tagline}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Parallax food gallery */}
            <div className="culinary-parallax mt-32">
              <h3 className="text-4xl md:text-5xl font-light mb-16 text-center">Epicurean Delights</h3>
              <div className="relative h-96 overflow-hidden">
                <div className="food-gallery flex gap-8">
                  {[
                    { image: "/dining/1670163328-3W1A6953.jpg", depth: 0.5 },
                    { image: "/hotels/1670070953-3W1A6479.jpg", depth: 0.3 },
                    { image: "/accommodation/1670073975-3W1A5959.jpg", depth: 0.7 }
                  ].map((dish, index) => (
                    <div key={index} className="food-item flex-shrink-0 w-80 h-64 relative overflow-hidden rounded-lg">
                      <img
                        src={dish.image}
                        alt={`Dish ${index + 1}`}
                        className="w-full h-full object-cover"
                        style={{ filter: "saturate(1.2) brightness(0.9)" }}
                      />
                      <div className="light-reflection absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. The Room Showcase – Deep Dive */}
        <section id="showcase" className="py-32 px-6 md:px-12 bg-black">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-light mb-20 text-center">
              Suite Discovery
            </h2>

            {/* Fixed full-screen room view */}
            <div className="room-showcase relative h-screen mb-20">
              <div className="room-viewport relative h-full overflow-hidden">
                <img
                  src="/accommodation/1670073747-3W1A5836.jpg"
                  alt="Master Suite"
                  className="w-full h-full object-cover"
                  style={{ filter: "brightness(0.8) contrast(1.1)" }}
                />

                {/* Highlighted features */}
                <div className="feature-highlight absolute top-1/4 left-1/4 w-32 h-32 border-2 border-white/50 rounded-full flex items-center justify-center cursor-pointer group">
                  <div className="highlight-vignette absolute inset-0 bg-white/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                  <span className="text-white font-light text-sm relative z-10">Bedding</span>
                </div>

                <div className="feature-highlight absolute top-1/3 right-1/4 w-32 h-32 border-2 border-white/50 rounded-full flex items-center justify-center cursor-pointer group">
                  <div className="highlight-vignette absolute inset-0 bg-white/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                  <span className="text-white font-light text-sm relative z-10">Minibar</span>
                </div>

                <div className="feature-highlight absolute bottom-1/4 left-1/3 w-32 h-32 border-2 border-white/50 rounded-full flex items-center justify-center cursor-pointer group">
                  <div className="highlight-vignette absolute inset-0 bg-white/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                  <span className="text-white font-light text-sm relative z-10">Balcony</span>
                </div>
              </div>

              {/* 360° view button */}
              <button className="absolute bottom-8 left-1/2 transform -translate-x-1/2 px-6 py-3 bg-black/50 backdrop-blur-sm border border-white/30 text-white font-light tracking-wider hover:bg-white hover:text-black transition-all duration-300">
                EXPLORE 360°
              </button>
            </div>

            {/* Customize Your Stay */}
            <div className="customization-panel">
              <h3 className="text-3xl md:text-4xl font-light mb-12 text-center">Personalize Your Experience</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { option: "Pillow Menu", choices: ["Down", "Memory Foam", "Latex"] },
                  { option: "Ambient Lighting", choices: ["Warm", "Cool", "Dynamic"] },
                  { option: "Room Scent", choices: ["Lavender", "Citrus", "Ocean"] }
                ].map((custom, index) => (
                  <div key={index} className="custom-option p-6 border border-white/20 rounded-lg hover:border-white/40 transition-colors duration-300">
                    <h4 className="text-xl font-light text-white mb-4">{custom.option}</h4>
                    <div className="flex flex-wrap gap-2">
                      {custom.choices.map((choice, cIndex) => (
                        <button key={cIndex} className="px-4 py-2 bg-transparent border border-white/30 text-white font-light text-sm hover:bg-white hover:text-black transition-all duration-300 rounded">
                          {choice}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 5. The Location & Context */}
        <section className="py-32 px-6 md:px-12 bg-black">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-light mb-20 text-center">
              Geographic Grace
            </h2>

            {/* Stylized SVG map */}
            <div className="location-map relative h-96 mb-20 flex items-center justify-center">
              <svg viewBox="0 0 800 400" className="w-full h-full">
                <circle cx="400" cy="200" r="150" fill="none" stroke="white" strokeWidth="2" opacity="0.3" />
                {/* Hotel marker */}
                <circle cx="400" cy="200" r="8" fill="white" className="hotel-marker" />
                {/* Landmark connections */}
                <path d="M400 200 L320 160" stroke="white" strokeWidth="1" opacity="0.5" className="connection-line" />
                <path d="M400 200 L480 160" stroke="white" strokeWidth="1" opacity="0.5" className="connection-line" />
                <path d="M400 200 L360 280" stroke="white" strokeWidth="1" opacity="0.5" className="connection-line" />
                {/* Landmark markers */}
                <circle cx="320" cy="160" r="4" fill="white" opacity="0.7" />
                <circle cx="480" cy="160" r="4" fill="white" opacity="0.7" />
                <circle cx="360" cy="280" r="4" fill="white" opacity="0.7" />
              </svg>

              {/* Landmark images that fade in */}
              <div className="landmark-info absolute top-20 left-20 opacity-0">
                <img src="/hotels/1670070953-3W1A6479.jpg" alt="Nearby Attraction" className="w-32 h-24 object-cover rounded" />
                <p className="text-white font-light text-sm mt-2">Historic District</p>
              </div>
            </div>

            {/* Scroll-triggered video background */}
            <div className="location-video relative h-screen overflow-hidden">
              <video
                src="/hero.mp4"
                className="w-full h-full object-cover"
                muted
                loop
                style={{ filter: "brightness(0.6) contrast(1.2)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center max-w-2xl">
                  <h3 className="text-4xl md:text-5xl font-light text-white mb-6">
                    Cityscape Symphony
                  </h3>
                  <p className="text-xl text-gray-300 font-light">
                    Where urban sophistication meets natural splendor
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Testimonials & Social Proof */}
        <section className="py-32 px-6 md:px-12 bg-black">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-light mb-20 text-center">
              Authentic Whispers
            </h2>

            {/* Cascade testimonial cards */}
            <div className="testimonials-container relative">
              {[
                {
                  quote: "An extraordinary sanctuary where elegance meets perfection in every detail.",
                  author: "Alexandra Sterling",
                  avatar: "A"
                },
                {
                  quote: "The epitome of luxury hospitality. A transformative experience beyond expectation.",
                  author: "Marcus Chen",
                  avatar: "M"
                },
                {
                  quote: "Where sophistication becomes an art form. Truly incomparable.",
                  author: "Isabelle Rousseau",
                  avatar: "I"
                }
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="testimonial-card absolute bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-lg max-w-md"
                  style={{
                    top: `${index * 60}px`,
                    left: index % 2 === 0 ? '10%' : '60%',
                    transform: `rotate(${index * 2 - 2}deg)`
                  }}
                >
                  <p className="text-lg font-light italic text-gray-100 mb-6 typewriter-text">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center">
                    <div className="avatar w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white font-light text-lg mr-4">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="text-white font-light">{testimonial.author}</p>
                      <p className="text-gray-400 text-sm">Guest</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. The Booking Section – The Call to Action */}
        <section id="booking" className="py-32 px-6 md:px-12 bg-black">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-light mb-20 text-center">
              Begin Your Chapter
            </h2>

            {/* Animated form */}
            <form className="booking-form space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Check-in Date"
                    className="w-full px-6 py-4 bg-transparent border border-white/30 text-white font-light tracking-wider focus:border-white focus:outline-none transition-all duration-300 placeholder-gray-500"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Check-out Date"
                    className="w-full px-6 py-4 bg-transparent border border-white/30 text-white font-light tracking-wider focus:border-white focus:outline-none transition-all duration-300 placeholder-gray-500"
                  />
                </div>
                <div className="form-group">
                  <select className="w-full px-6 py-4 bg-transparent border border-white/30 text-white font-light tracking-wider focus:border-white focus:outline-none transition-all duration-300">
                    <option value="" className="bg-black">Room Type</option>
                    <option value="deluxe" className="bg-black">Deluxe Suite</option>
                    <option value="executive" className="bg-black">Executive Villa</option>
                    <option value="presidential" className="bg-black">Presidential Suite</option>
                  </select>
                </div>
                <div className="form-group">
                  <input
                    type="number"
                    placeholder="Guests"
                    className="w-full px-6 py-4 bg-transparent border border-white/30 text-white font-light tracking-wider focus:border-white focus:outline-none transition-all duration-300 placeholder-gray-500"
                  />
                </div>
              </div>

              {/* Magnetic CTA button */}
              <div className="text-center mt-12">
                <button className="check-availability-btn px-12 py-4 bg-white text-black font-light text-lg tracking-wider hover:bg-gray-200 transition-all duration-300 relative overflow-hidden group">
                  <span className="relative z-10">Check Availability</span>
                  <div className="liquid-fill absolute inset-0 bg-black scale-x-0 origin-center group-hover:scale-x-100 transition-transform duration-500"></div>
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* 8. Footer & Departure */}
        <footer className="bg-black border-t border-white/10 py-20 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
              <div>
                <h3 className="text-2xl font-light mb-6 text-white">NOKRAS</h3>
                <p className="text-gray-400 font-light leading-relaxed">
                  Crafting extraordinary moments since 1924
                </p>
              </div>
              <div>
                <h4 className="text-sm uppercase tracking-widest mb-6 text-gray-300">Properties</h4>
                <ul className="space-y-3 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors duration-300">Silver Oak Resort</a></li>
                  <li><a href="#" className="hover:text-white transition-colors duration-300">Mountain Retreat</a></li>
                  <li><a href="#" className="hover:text-white transition-colors duration-300">Urban Sanctuary</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm uppercase tracking-widest mb-6 text-gray-300">Connect</h4>
                <div className="flex space-x-4">
                  <a href="#" className="social-icon w-10 h-10 border border-white/30 flex items-center justify-center hover:border-white hover:bg-white hover:text-black transition-all duration-300 group">
                    <span className="text-sm">IG</span>
                  </a>
                  <a href="#" className="social-icon w-10 h-10 border border-white/30 flex items-center justify-center hover:border-white hover:bg-white hover:text-black transition-all duration-300 group">
                    <span className="text-sm">LI</span>
                  </a>
                  <a href="#" className="social-icon w-10 h-10 border border-white/30 flex items-center justify-center hover:border-white hover:bg-white hover:text-black transition-all duration-300 group">
                    <span className="text-sm">TW</span>
                  </a>
                </div>
              </div>
              <div>
                <h4 className="text-sm uppercase tracking-widest mb-6 text-gray-300">Contact</h4>
                <p className="text-gray-400 text-sm font-light">
                  reservations@nokras.com<br />
                  +1 (555) 123-4567
                </p>
              </div>
            </div>

            <div className="border-t border-white/10 pt-8 text-center">
              <p className="text-gray-500 text-sm font-light">&copy; 2026 NOKRAS Luxury Hotels. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default NokrasHotels;
