/**
 * NOKRAS DESIGN SYSTEM - Comprehensive Animation & Styling Guide
 * 20+ Page Designs with GSAP, Lenis, Locomotive Scroll Integration
 * Last Updated: 2026-01-24
 */

export const DESIGN_SYSTEM = {
  // ========== ANIMATION LIBRARIES ==========
  libraries: {
    gsap: {
      version: "^3.14.2",
      plugins: ["ScrollTrigger", "Flip", "Observer", "Draggable"],
      usage: "Advanced timeline animations, scroll-triggered effects, morphing",
    },
    lenis: {
      version: "^1.3.17",
      description: "Smooth scroll with inertia and momentum",
      usage: "Page-wide smooth scrolling",
    },
    "locomotive-scroll": {
      version: "^5.0.1",
      description: "Smooth scrolling with parallax and trigger animations",
      usage: "Legacy support and advanced scroll effects",
    },
  },

  // ========== 20+ PAGE DESIGN PATTERNS ==========
  pages: [
    // ===== TIER 1: HERO & SHOWCASE PAGES =====
    {
      id: 1,
      name: "Hero with Magnetic Cursor",
      route: "/design/hero-magnetic",
      description:
        "Full-screen hero with cursor-following magnetic elements and staggered text",
      animations: [
        "Magnetic hover on buttons",
        "Text stagger reveal (word by word)",
        "Parallax background layers",
        "Cursor position tracking",
      ],
      tech: ["GSAP ScrollTrigger", "Custom cursor", "Floating elements"],
      colors: "Dark mode with white accents",
      complexity: "Medium",
    },
    {
      id: 2,
      name: "Pinned Scale Hero",
      route: "/design/pinned-scale",
      description:
        "Apple-style hero that scales and pins while user scrolls, then transitions",
      animations: [
        "Pinned viewport during scroll",
        "Exponential scale-up (1x → 3x)",
        "Text opacity fade during pin",
        "Smooth transition to next section",
      ],
      tech: ["GSAP ScrollTrigger with pin", "Timeline sequencing"],
      colors: "Minimalist white/black",
      complexity: "High",
    },
    {
      id: 3,
      name: "Liquid Blob Hero",
      route: "/design/liquid-blob",
      description:
        "Animated SVG blob morphing behind hero text, responds to scroll velocity",
      animations: [
        "SVG morphing shapes",
        "Scroll velocity detection",
        "Blob breathing animation",
        "Color gradient shifts",
      ],
      tech: ["GSAP Flip plugin", "SVG morph", "Momentum calculation"],
      colors: "Gradient background (purple to blue)",
      complexity: "High",
    },

    // ===== TIER 2: SCROLL-BASED SEQUENTIAL REVEALS =====
    {
      id: 4,
      name: "Staggered Card Cascade",
      route: "/design/card-cascade",
      description:
        "Cards slide in from different directions with staggered timing on scroll",
      animations: [
        "Cascade from top/bottom/left",
        "Rotation during entrance",
        "Shadow grow on arrival",
        "Hover lift effect",
      ],
      tech: ["GSAP stagger", "Multiple timelines"],
      colors: "Light neutral with card shadows",
      complexity: "Medium",
    },
    {
      id: 5,
      name: "Horizontal Scroll Gallery",
      route: "/design/horizontal-gallery",
      description:
        "Vertical scroll triggers horizontal movement of image carousel",
      animations: [
        "Scroll→horizontal translation",
        "Image parallax within gallery",
        "Indicator dots sync",
        "Smooth easing curves",
      ],
      tech: ["GSAP ScrollTrigger scrub", "Locomotive Scroll"],
      colors: "Black with white text overlays",
      complexity: "High",
    },
    {
      id: 6,
      name: "Text Parallax Trail",
      route: "/design/text-parallax",
      description:
        "Large text elements move at different speeds creating depth parallax",
      animations: [
        "Variable Y-axis parallax",
        "Color shift on scroll",
        "Opacity gradients",
        "Letter spacing expansion",
      ],
      tech: ["GSAP parallax", "Text manipulation"],
      colors: "Dark background with bright typography",
      complexity: "Medium",
    },

    // ===== TIER 3: INTERACTIVE GRIDS & LAYOUTS =====
    {
      id: 7,
      name: "Bento Grid Stagger",
      route: "/design/bento-grid",
      description:
        "Varied-size grid items with staggered entrance and magnetic hover",
      animations: [
        "Staggered scale+fade entrance",
        "Magnetic pull on hover",
        "Content reveal overlay",
        "Shadow elevation",
      ],
      tech: ["CSS Grid", "GSAP stagger", "Magnetic hover"],
      colors: "Minimal white with subtle shadows",
      complexity: "Medium",
    },
    {
      id: 8,
      name: "Flip Card 3D",
      route: "/design/flip-card-3d",
      description:
        "Cards flip on hover with 3D perspective, back shows additional info",
      animations: [
        "3D flip rotation",
        "Perspective transform",
        "Back content fade-in",
        "Click locking",
      ],
      tech: ["CSS 3D transforms", "GSAP Flip plugin"],
      colors: "Gradient cards on dark background",
      complexity: "Medium",
    },
    {
      id: 9,
      name: "Masonry with Cover Reveal",
      route: "/design/masonry-reveal",
      description:
        "Masonry grid where items expand and cover text on scroll trigger",
      animations: [
        "Image expand and pan",
        "Text slide behind image",
        "Overlay fade in/out",
        "Dynamic sizing",
      ],
      tech: ["GSAP ScrollTrigger", "Clip-path masking"],
      colors: "Dark with colorful image accents",
      complexity: "High",
    },

    // ===== TIER 4: TEXT & TYPOGRAPHY ANIMATIONS =====
    {
      id: 10,
      name: "Character Split Reveal",
      route: "/design/char-split",
      description:
        "Text split into characters that animate in from random directions",
      animations: [
        "Per-character animation",
        "Random rotation/position start",
        "Ease to final position",
        "Staggered timing",
      ],
      tech: ["GSAP", "Text splitting library"],
      colors: "High contrast (light/dark)",
      complexity: "Medium",
    },
    {
      id: 11,
      name: "Type Morph Animation",
      route: "/design/type-morph",
      description:
        "Text morphs between different words/sizes on scroll progression",
      animations: [
        "Variable font weight interpolation",
        "Font size transitions",
        "Color shift during morph",
        "Smooth easing",
      ],
      tech: ["Variable fonts", "GSAP"],
      colors: "Single color with opacity shifts",
      complexity: "Medium",
    },
    {
      id: 12,
      name: "SVG Text Path",
      route: "/design/svg-text-path",
      description:
        "Text flows along curved SVG paths, animates with scroll offset",
      animations: [
        "Text offset along path",
        "Path morphing",
        "Character rotation alignment",
        "Smooth path following",
      ],
      tech: ["SVG text-path", "GSAP"],
      colors: "Monochromatic with accent highlights",
      complexity: "High",
    },

    // ===== TIER 5: SECTION TRANSITIONS & PAGE FLOW =====
    {
      id: 13,
      name: "Curtain Slide Transition",
      route: "/design/curtain-slide",
      description:
        "Sections slide up vertically like curtains opening between content",
      animations: [
        "Bottom-up slide reveal",
        "Content fade behind",
        "Smooth easing curve",
        "Fixed bottom content appears",
      ],
      tech: ["GSAP ScrollTrigger pin", "ClipPath animation"],
      colors: "Dark sections with light overlays",
      complexity: "Medium",
    },
    {
      id: 14,
      name: "Liquid Wipe Transition",
      route: "/design/liquid-wipe",
      description:
        "SVG-based wave wipe effect between sections like liquid pouring",
      animations: [
        "SVG morphing wave",
        "Color fill behind wave",
        "Smooth transitions",
        "Scroll-triggered timing",
      ],
      tech: ["SVG morphing", "GSAP Flip", "Path animation"],
      colors: "Contrasting section colors",
      complexity: "High",
    },
    {
      id: 15,
      name: "Circular Reveal",
      route: "/design/circular-reveal",
      description:
        "Content reveals from circle that expands from center point",
      animations: [
        "Circle radius growth",
        "Content opacity sync",
        "Center point positioning",
        "Easing precision",
      ],
      tech: ["SVG circle", "Clip-path", "GSAP"],
      colors: "Dark background with bright circle",
      complexity: "Medium",
    },

    // ===== TIER 6: SCROLL INTERACTIONS =====
    {
      id: 16,
      name: "Progress Bar Organic",
      route: "/design/progress-organic",
      description:
        "Progress indicator that grows with bounce and organic easing",
      animations: [
        "Non-linear growth curve",
        "Bounce easing at completion",
        "Color shift stages",
        "Smooth acceleration",
      ],
      tech: ["GSAP custom easing", "Progress tracking"],
      colors: "Accent color on light background",
      complexity: "Low",
    },
    {
      id: 17,
      name: "Scroll Velocity Particle",
      route: "/design/velocity-particle",
      description:
        "Particles spawn and move based on scroll velocity and direction",
      animations: [
        "Velocity detection",
        "Particle trail generation",
        "Momentum physics",
        "Fade-out lifecycle",
      ],
      tech: ["GSAP Observer", "Custom physics"],
      colors: "Dark with particle accents",
      complexity: "High",
    },
    {
      id: 18,
      name: "Background Parallax Depth",
      route: "/design/bg-parallax",
      description:
        "Multiple background layers move at different speeds creating infinite depth",
      animations: [
        "Multi-layer parallax",
        "Different speed ratios",
        "Seamless looping",
        "Color overlay shifts",
      ],
      tech: ["GSAP ScrollTrigger", "Layered divs"],
      colors: "Gradient layers (dark to light)",
      complexity: "Medium",
    },

    // ===== TIER 7: INTERACTIVE MICRO-INTERACTIONS =====
    {
      id: 19,
      name: "Hover Ripple Effect",
      route: "/design/ripple",
      description:
        "Ripple animation expands from cursor hover point across elements",
      animations: [
        "Circle radius expansion",
        "Opacity fade-out",
        "Color bloom",
        "Smooth physics curve",
      ],
      tech: ["GSAP", "Canvas/SVG"],
      colors: "Light surface with contrast ripple",
      complexity: "Medium",
    },
    {
      id: 20,
      name: "Elastic Hover Bounce",
      route: "/design/elastic-bounce",
      description:
        "Elements bounce and elastic snap back on hover with overshoot",
      animations: [
        "Elastic.out easing",
        "Scale overshoot",
        "Multiple property sync",
        "Natural physics feel",
      ],
      tech: ["GSAP elastic easing"],
      colors: "Any color scheme",
      complexity: "Low",
    },

    // ===== TIER 8: ADVANCED EFFECTS =====
    {
      id: 21,
      name: "RGB Shift Chromatic Aberration",
      route: "/design/rgb-shift",
      description:
        "Red/green/blue channels separate on scroll creating color fringing",
      animations: [
        "Channel separation",
        "Scroll-linked offset",
        "Smooth convergence",
        "Intensity control",
      ],
      tech: ["CSS filters", "GSAP", "Canvas"],
      colors: "High contrast for visibility",
      complexity: "High",
    },
    {
      id: 22,
      name: "Gradient Flow Animation",
      route: "/design/gradient-flow",
      description:
        "Background gradient animates flowing across page like liquid",
      animations: [
        "Gradient position animation",
        "Multiple color stops",
        "Smooth infinite loop",
        "Scroll modulation",
      ],
      tech: ["CSS gradients", "GSAP"],
      colors: "Multi-color gradient palette",
      complexity: "Low",
    },
    {
      id: 23,
      name: "Glassmorphism Blur Reveal",
      route: "/design/glassmorphism",
      description:
        "Blurred glass containers gradually focus and reveal content on scroll",
      animations: [
        "Backdrop blur reduction",
        "Opacity increase",
        "Content scale-in",
        "Smooth transitions",
      ],
      tech: ["CSS backdrop-filter", "GSAP"],
      colors: "Dark background with glass overlays",
      complexity: "Medium",
    },

    // ===== TIER 9: LENIS & SCROLL LIBRARY SPECIFIC =====
    {
      id: 24,
      name: "Smooth Scroll with Inertia",
      route: "/design/lenis-smooth",
      description:
        "Page uses Lenis for smooth scroll with momentum and easing",
      animations: [
        "Inertia momentum",
        "Natural scroll feel",
        "Scroll synced parallax",
        "Friction curve",
      ],
      tech: ["Lenis scroll", "GSAP sync"],
      colors: "Any scheme (scroll behavior independent)",
      complexity: "Low",
    },
    {
      id: 25,
      name: "Locomotive Scroll Triggers",
      route: "/design/locomotive",
      description:
        "Locomotive Scroll handles scroll events with built-in trigger system",
      animations: [
        "Scroll event callbacks",
        "Built-in parallax",
        "Data attribute triggers",
        "Smooth momentum",
      ],
      tech: ["Locomotive Scroll", "Data attributes"],
      colors: "Any scheme",
      complexity: "Medium",
    },
  ],

  // ========== COLOR PALETTES ==========
  colorPalettes: {
    nokrasLux: {
      primary: "#000000",
      secondary: "#FFFFFF",
      accent: "#D4AF37", // Gold
      background: "#F5F5F5",
      text: "#1a1a1a",
    },
    darkModern: {
      primary: "#0A0E27",
      secondary: "#FFFFFF",
      accent: "#00D9FF", // Cyan
      background: "#16213E",
      text: "#E0E0E0",
    },
    naturalEarth: {
      primary: "#2D5016",
      secondary: "#F4E4D7",
      accent: "#D4A574",
      background: "#F9F6F2",
      text: "#3D3D3D",
    },
  },

  // ========== ANIMATION TIMING ==========
  timing: {
    micro: {
      hover: "0.2s",
      fadeIn: "0.3s",
      slideIn: "0.4s",
    },
    standard: {
      transition: "0.6s",
      reveal: "0.8s",
      stagger: "0.1s between items",
    },
    cinematic: {
      sceneOpen: "1.2s",
      scroll: "varied with scrub",
      sequenced: "0.1-0.3s stagger",
    },
  },

  // ========== EASING FUNCTIONS ==========
  easing: {
    bounce: "elastic.out(1, 0.5)",
    smooth: "power2.inOut",
    snappy: "power3.out",
    natural: "sine.inOut",
  },
};

/**
 * Component Animation Preset Map
 * Quick reference for applying animations to common components
 */
export const ANIMATION_PRESETS = {
  button: {
    hover: "scale:1.05, duration:0.3, ease:power2.out",
    click: "scale:0.95, duration:0.1",
  },
  card: {
    entrance: "y:60, opacity:0 → y:0, opacity:1, duration:0.6, stagger:0.1",
    hover: "y:-10, shadow-grow, duration:0.3",
  },
  text: {
    reveal: "chars split, entrance from random direction, stagger:0.05",
    scroll: "parallax with variable y offset based on scroll position",
  },
  section: {
    transition: "clip-path or transform wipe, duration:1",
    entrance: "fade in with stagger across children",
  },
};

/**
 * Page Implementation Checklist
 */
export const IMPLEMENTATION_CHECKLIST = {
  everyPage: [
    "✓ Import GSAP and ScrollTrigger",
    "✓ Import Lenis or Locomotive for smooth scroll",
    "✓ Create entrance animations",
    "✓ Implement scroll triggers for interactive elements",
    "✓ Add cleanup in useEffect return",
    "✓ Test on mobile (responsive animations)",
    "✓ Verify accessibility (prefers-reduced-motion)",
  ],
  optimizations: [
    "✓ Use willChange CSS for GPU acceleration",
    "✓ Throttle scroll events",
    "✓ Cache DOM queries in refs",
    "✓ Kill animations on unmount",
    "✓ Use passive event listeners",
  ],
};
