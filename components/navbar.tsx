"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import gsap from "gsap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [designDropdownOpen, setDesignDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Refs
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuItemsRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<HTMLDivElement>(null);
  const designDropdownRef = useRef<HTMLDivElement>(null);
  const designButtonRef = useRef<HTMLButtonElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  // Navigation data
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/branches", label: "Branches" },
    { href: "/restaurants", label: "Restaurants" },
    // { href: "/(dashboard)", label: "Dashboard" },
    { href: "/booking", label: "Booking" },
  ];

  // const designPages = [
  //   { href: "/design/hero-magnetic", label: "Hero Magnetic" },
  //   { href: "/design/pinned-scale", label: "Pinned Scale" },
  //   { href: "/design/liquid-blob", label: "Liquid Blob" },
  //   { href: "/design/card-cascade", label: "Card Cascade" },
  //   { href: "/design/horizontal-gallery", label: "Horizontal Gallery" },
  //   { href: "/design/text-parallax", label: "Text Parallax" },
  //   { href: "/design/bento-grid", label: "Bento Grid" },
  //   { href: "/design/flip-card-3d", label: "Flip Card 3D" },
  //   { href: "/design/masonry-reveal", label: "Masonry Reveal" },
  //   { href: "/design/char-split", label: "Char Split" },
  // ];

  // Determine if we're on a dark page (home page with video background)
  const isDarkPage = pathname === "/";

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Initial navbar entrance animation
  useEffect(() => {
    const tl = gsap.timeline();

    // Animate logo entrance
    tl.fromTo(
      logoRef.current,
      { opacity: 0, y: -30, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power2.out" },
    );

    // Desktop navigation entrance
    if (!isMobile && navItemsRef.current) {
      tl.fromTo(
        navItemsRef.current.children,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power2.out" },
        "-=0.4",
      );
    }
  }, [isMobile]);

  // Mobile menu animation handler
  useEffect(() => {
    if (!isMobile) {
      setMobileMenuOpen(false);
      return;
    }

    if (mobileMenuOpen) {
      // Prevent body scroll
      document.body.style.overflow = "hidden";

      // Animate menu items with stagger
      if (mobileMenuItemsRef.current) {
        gsap.fromTo(
          mobileMenuItemsRef.current.children,
          { opacity: 0, y: -10, x: -20 },
          {
            opacity: 1,
            y: 0,
            x: 0,
            duration: 0.3,
            stagger: 0.05,
            ease: "back.out(1.2)",
          },
        );
      }

      // Hamburger animation
      const hamburgerElement = hamburgerRef.current;
      if (hamburgerElement) {
        gsap.to(hamburgerElement.querySelector(":nth-child(1)") as Element, {
          rotate: 45,
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(hamburgerElement.querySelector(":nth-child(2)") as Element, {
          opacity: 0,
          duration: 0.2,
          ease: "power1.out",
        });
        gsap.to(hamburgerElement.querySelector(":nth-child(3)") as Element, {
          rotate: -45,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    } else {
      // Re-enable body scroll
      document.body.style.overflow = "";

      // Reset hamburger
      const hamburgerElement = hamburgerRef.current;
      if (hamburgerElement) {
        gsap.to(hamburgerElement.querySelector(":nth-child(1)") as Element, {
          rotate: 0,
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(hamburgerElement.querySelector(":nth-child(2)") as Element, {
          opacity: 1,
          duration: 0.2,
          ease: "power1.out",
        });
        gsap.to(hamburgerElement.querySelector(":nth-child(3)") as Element, {
          rotate: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen, isMobile]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setDesignDropdownOpen(false);
  }, [pathname]);

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        setDesignDropdownOpen(false);
      }
    };

    if (mobileMenuOpen || designDropdownOpen) {
      window.addEventListener("keydown", handleEscape);
      return () => window.removeEventListener("keydown", handleEscape);
    }
  }, [mobileMenuOpen, designDropdownOpen]);

  // Desktop dropdown handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      // Check if click is outside both the dropdown container and the button
      const isOutsideDropdown =
        designDropdownRef.current &&
        !designDropdownRef.current.contains(target);
      const isOutsideButton =
        designButtonRef.current && !designButtonRef.current.contains(target);

      // Only close if both conditions are true
      if (isOutsideDropdown && isOutsideButton && designDropdownOpen) {
        setDesignDropdownOpen(false);
      }
    };

    // Add listener when dropdown is open to handle outside clicks
    if (designDropdownOpen && !isMobile) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [designDropdownOpen, isMobile]);

  // Navbar styling
  const navbarBg =
    isDarkPage && !scrolled
      ? "bg-black/20 backdrop-blur-md border-white/10"
      : "bg-white/95 backdrop-blur-md border-black/10";

  const textColor = isDarkPage && !scrolled ? "text-white" : "text-gray-900";
  const textColorMuted =
    isDarkPage && !scrolled ? "text-gray-200" : "text-gray-700";
  const hoverBg =
    isDarkPage && !scrolled ? "hover:bg-white/10" : "hover:bg-gray-100";
  const activeBg =
    isDarkPage && !scrolled ? "bg-white text-black" : "bg-black text-white";
  const menuBarColor = isDarkPage && !scrolled ? "bg-white" : "bg-black";

  return (
    <>
      {/* Mobile Overlay - Prevents interaction with content when menu is open */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-40 border-b transition-all duration-300 ${navbarBg}`}
        data-module-header="m5"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Spacer for desktop layout */}
            <div className="w-12 sm:w-16 md:w-24"></div>

            {/* Center Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 group flex-shrink-0"
            >
              <div ref={logoRef}>
                <span
                  className={`text-lg sm:text-xl md:text-2xl font-black ${textColor} transition-colors duration-300`}
                >
                  Nokras
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div
              className="hidden md:flex items-center gap-1"
              ref={navItemsRef}
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 lg:px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
                    pathname === link.href
                      ? activeBg + " shadow-lg"
                      : `${textColorMuted} ${hoverBg}`
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Desktop Design Dropdown */}
              
            </div>

            {/* Mobile Hamburger Button */}
            <button
              ref={hamburgerRef}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg ${hoverBg} transition-colors`}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span
                  className={`h-0.5 ${menuBarColor} transition-all duration-300 origin-left`}
                  style={{ willChange: "transform" }}
                />
                <span
                  className={`h-0.5 ${menuBarColor} transition-all duration-300`}
                  style={{ willChange: "opacity" }}
                />
                <span
                  className={`h-0.5 ${menuBarColor} transition-all duration-300 origin-left`}
                  style={{ willChange: "transform" }}
                />
              </div>
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            id="mobile-menu"
            ref={mobileMenuRef}
            className={`md:hidden absolute top-16 left-0 right-0 bg-white border-t border-gray-100 shadow-lg ${
              mobileMenuOpen ? "block" : "hidden"
            }`}
            style={{
              willChange: "transform",
            }}
          >
            <div
              className={`px-2 pt-2 pb-4 space-y-1`}
              ref={mobileMenuItemsRef}
            >
              {/* Mobile Navigation Links */}
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-300 ${
                    pathname === link.href
                      ? activeBg
                      : `${textColorMuted} ${hoverBg}`
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile Design Dropdown */}

            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
