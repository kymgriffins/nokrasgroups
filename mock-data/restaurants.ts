/**
 * Nokras Group Restaurants & Dining Venues
 * Comprehensive data structure for restaurant showcases
 */

export interface RestaurantHours {
  day: string;
  open: string;
  close: string;
  closed?: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "appetizer" | "main" | "dessert" | "beverage";
  isVegan?: boolean;
  isGlutenFree?: boolean;
  image?: string;
}

export interface Restaurant {
  id: string;
  name: string;
  hotelId: string;
  hotelName: string;
  cuisine: string;
  description: string;
  briefDescription: string;
  location: string;
  city: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  phone: string;
  email: string;
  website?: string;
  rating: number;
  totalReviews: number;
  seatingCapacity: number;
  ambiance: string;
  priceRange: "$" | "$$" | "$$$" | "$$$$";
  images: string[];
  features: string[];
  hours: RestaurantHours[];
  specialties: string[];
  chefName?: string;
  reservationRequired: boolean;
  parkingAvailable: boolean;
  liveMusic: boolean;
  privateEvents: boolean;
}

// Nokras Company Information
export const nokrasCompanyInfo = {
  name: "Nokras Group of Hotels",
  tagline: "Where Luxury Meets Nature",
  description:
    "A premier collection of luxury hotels and restaurants across Kenya, offering world-class hospitality and culinary experiences.",
  founded: 2015,
  headquarters: {
    address: "Nairobi, Kenya",
    country: "Kenya",
  },
  socialLinks: {
    instagram: "@nokrashotels",
    facebook: "nokrashotels",
    twitter: "@nokrashotels",
    linkedin: "nokras-group",
  },
  contact: {
    phone: "+254 700 000 100",
    email: "reservations@nokrashotels.com",
    support: "support@nokrashotels.com",
  },
  branches: [
    {
      name: "Nokras Riverine",
      city: "Sagana",
      region: "Central Kenya",
      highlights: "River views, Spa, Adventure activities",
    },
    {
      name: "Nokras Enkare",
      city: "Sagana",
      region: "Central Kenya",
      highlights: "Tented Camp, Nature trails, Mount views",
    },
    {
      name: "Hotel Nokras",
      city: "Murang'a",
      region: "Central Kenya",
      highlights: "Business-friendly, Conference halls, Modern amenities",
    },
    {
      name: "Nokras Silver Oak",
      city: "Embu",
      region: "Eastern Kenya",
      highlights: "Contemporary design, Rooftop bar, City views",
    },
  ],
  vision:
    "To be Kenya's most trusted luxury hospitality brand, setting benchmarks in service excellence and culinary innovation.",
  mission:
    "Deliver exceptional experiences through world-class accommodations, innovative dining, and personalized service.",
};

// Operating Hours Template
const operatingHours: RestaurantHours[] = [
  { day: "Monday", open: "06:30", close: "23:00" },
  { day: "Tuesday", open: "06:30", close: "23:00" },
  { day: "Wednesday", open: "06:30", close: "23:00" },
  { day: "Thursday", open: "06:30", close: "23:00" },
  { day: "Friday", open: "06:30", close: "00:00" },
  { day: "Saturday", open: "07:00", close: "00:00" },
  { day: "Sunday", open: "07:00", close: "23:00" },
];

// Restaurant Image Collections
const restaurantImages = {
  riverineMainDining: [
    "/dining/1634659007-restaurant.jpg",
    "/dining/1634659859-Slider11.jpg",
    "/dining/1634659889-Slider1.jpg",
    "/dining/1634659968-Slider6.jpg",
  ],
  riverineLounge: [
    "/dining/1634658969-bar.jpg",
    "/dining/1634659401-_garden2.jpg",
    "/dining/1670066190-thumbnail5_dining.jpg",
  ],
  riverineSpa: [
    "/dining/1670066194-thumbnail1_dining.jpg",
    "/dining/1670066208-thumbnail3_dining.jpg",
  ],
  enkareGrill: [
    "/dining/1670066212-thumbnail6_dining.jpg",
    "/dining/1670066226-thumbnail2_dining.jpg",
    "/dining/1670066231-thumbnail4_dining.jpg",
  ],
  murangaTable: [
    "/dining/1670066305-3W1A2728.jpg",
    "/dining/1670066305-3W1A2734.jpg",
    "/dining/1670066306-3W1A2725.jpg",
  ],
  silverOakRooftop: [
    "/dining/1670066318-P1530440.jpg",
    "/dining/1670066324-P1530453.jpg",
    "/dining/1670066339-P1555288.jpg",
    "/dining/1670066339-P1555294.jpg",
  ],
  silverOakBar: [
    "/dining/1670066339-P1555374.jpg",
    "/dining/1670066339-P1555386.jpg",
  ],
};

/**
 * Nokras Restaurants Collection
 * Showcasing diverse dining experiences across all hotel locations
 */
export const nokrasRestaurants: Restaurant[] = [
  // Nokras Riverine - Sagana
  {
    id: "riverine-main-dining",
    name: "Riverside Cove",
    hotelId: "nokras-riverine",
    hotelName: "Nokras Riverine Hotel & Spa",
    cuisine: "Pan-African Contemporary",
    description:
      "An elegant riverside dining establishment featuring contemporary Pan-African cuisine with emphasis on locally-sourced ingredients and traditional recipes reimagined through a modern culinary lens. Floor-to-ceiling windows overlook the Sagana River, creating an intimate ambiance perfect for celebrations and romantic dinners.",
    briefDescription:
      "Contemporary Pan-African cuisine overlooking the Sagana River",
    location: "Main Floor, Nokras Riverine Hotel",
    city: "Sagana",
    coordinates: {
      lat: -0.6635,
      lng: 37.185,
    },
    phone: "+254 700 111 001",
    email: "dining@nokrasriverine.com",
    website: "https://nokrasriverine.com/riverside-cove",
    rating: 4.8,
    totalReviews: 342,
    seatingCapacity: 120,
    ambiance: "Elegant, Contemporary, Riverside",
    priceRange: "$$$",
    images: restaurantImages.riverineMainDining,
    features: [
      "River views",
      "Open kitchen concept",
      "Wine cellar",
      "Private dining area",
      "Farm-to-table concept",
      "Tasting menu options",
    ],
    hours: operatingHours,
    specialties: [
      "Grilled Nile perch with African herbs",
      "Nyama Choma with traditional greens",
      "Slow-roasted lamb with cassava puree",
      "Sukuma wiki risotto",
    ],
    chefName: "Chef Aisha Omondi",
    reservationRequired: true,
    parkingAvailable: true,
    liveMusic: true,
    privateEvents: true,
  },
  {
    id: "riverine-lounge",
    name: "Sagana Social Lounge",
    hotelId: "nokras-riverine",
    hotelName: "Nokras Riverine Hotel & Spa",
    cuisine: "Casual International",
    description:
      "A sophisticated lounge bar and casual dining venue offering light fare, artisanal cocktails, and craft beverages. The lounge features a curated selection of Kenyan and international wines, premium spirits, and signature cocktails crafted by award-winning mixologists. Perfect for unwinding before or after dinner.",
    briefDescription:
      "Sophisticated lounge with craft cocktails and light cuisine",
    location: "Ground Floor, Nokras Riverine Hotel",
    city: "Sagana",
    coordinates: {
      lat: -0.6635,
      lng: 37.185,
    },
    phone: "+254 700 111 001",
    email: "lounge@nokrasriverine.com",
    rating: 4.6,
    totalReviews: 278,
    seatingCapacity: 80,
    ambiance: "Upscale Casual, Modern, Intimate",
    priceRange: "$$",
    images: restaurantImages.riverineLounge,
    features: [
      "Craft cocktails",
      "Wine selection",
      "Tapas menu",
      "Live DJ on weekends",
      "River view terrace",
      "Outdoor seating",
    ],
    hours: operatingHours,
    specialties: [
      "Signature Sagana Sunset cocktail",
      "Charcuterie and cheese boards",
      "Artisanal pizzas",
      "Small plates",
    ],
    reservationRequired: false,
    parkingAvailable: true,
    liveMusic: true,
    privateEvents: true,
  },
  {
    id: "riverine-spa-cafe",
    name: "Wellness Café at Spa",
    hotelId: "nokras-riverine",
    hotelName: "Nokras Riverine Hotel & Spa",
    cuisine: "Healthy & Organic",
    description:
      "A dedicated wellness dining space integrated with the spa facilities, specializing in nutrient-dense, organic, and plant-based cuisine. Features cold-pressed juices, protein bowls, superfood salads, and post-treatment snacks designed to complement spa and wellness experiences.",
    briefDescription: "Health-focused organic café within the spa facility",
    location: "Spa Level, Nokras Riverine Hotel",
    city: "Sagana",
    coordinates: {
      lat: -0.6635,
      lng: 37.185,
    },
    phone: "+254 700 111 001",
    email: "wellness@nokrasriverine.com",
    rating: 4.7,
    totalReviews: 195,
    seatingCapacity: 45,
    ambiance: "Serene, Wellness-Focused, Natural",
    priceRange: "$$",
    images: restaurantImages.riverineSpa,
    features: [
      "Organic ingredients",
      "Cold-pressed juices",
      "Smoothie bowls",
      "Detox teas",
      "Spa-side seating",
      "Nutritionist consultation",
    ],
    hours: [
      { day: "Monday", open: "06:00", close: "19:00" },
      { day: "Tuesday", open: "06:00", close: "19:00" },
      { day: "Wednesday", open: "06:00", close: "19:00" },
      { day: "Thursday", open: "06:00", close: "19:00" },
      { day: "Friday", open: "06:00", close: "19:00" },
      { day: "Saturday", open: "07:00", close: "19:00" },
      { day: "Sunday", open: "07:00", close: "19:00" },
    ],
    specialties: [
      "Quinoa power bowls",
      "Green detox smoothies",
      "Vegan Buddha bowls",
      "Avocado toast",
    ],
    reservationRequired: false,
    parkingAvailable: true,
    liveMusic: false,
    privateEvents: false,
  },

  // Nokras Enkare - Sagana
  {
    id: "enkare-grill-house",
    name: "Mount Ember Grill",
    hotelId: "nokras-enkare",
    hotelName: "Nokras Enkare Hotel",
    cuisine: "African Grill & BBQ",
    description:
      "An authentic grill house celebrating traditional African barbecuing techniques with a contemporary presentation. Set amidst natural surroundings, this venue offers an immersive dining experience featuring slow-roasted meats, grilled vegetables, and traditional accompaniments prepared over open flames with wood-smoked perfection.",
    briefDescription: "Traditional African grill with modern presentation",
    location: "Main Dining Area, Nokras Enkare Hotel",
    city: "Sagana",
    coordinates: {
      lat: -0.665,
      lng: 37.19,
    },
    phone: "+254 700 111 002",
    email: "grill@nokrasenkare.com",
    rating: 4.7,
    totalReviews: 289,
    seatingCapacity: 100,
    ambiance: "Rustic, Authentic, Outdoor-Focused",
    priceRange: "$$$",
    images: restaurantImages.enkareGrill,
    features: [
      "Open flame grill",
      "Wood-fired oven",
      "Outdoor seating",
      "Traditional ambiance",
      "Communal dining option",
      "Cooking demonstrations",
    ],
    hours: operatingHours,
    specialties: [
      "Whole grilled fish",
      "Beef ribs with African spices",
      "Grilled vegetables medley",
      "Ugali and sukuma wiki",
    ],
    chefName: "Chef Samuel Kipchoge",
    reservationRequired: true,
    parkingAvailable: true,
    liveMusic: true,
    privateEvents: true,
  },

  // Hotel Nokras - Murang'a
  {
    id: "muranga-fine-dining",
    name: "The Murang'a Table",
    hotelId: "nokras-muranga",
    hotelName: "Hotel Nokras Murang'a",
    cuisine: "Contemporary African",
    description:
      "An upscale fine dining establishment celebrating the culinary heritage of the Murang'a region with contemporary techniques. The restaurant features a tasting menu format led by experienced chefs who craft multi-course experiences showcasing local ingredients, historical influences, and innovative flavor combinations.",
    briefDescription: "Fine dining with contemporary African cuisine",
    location: "2nd Floor, Hotel Nokras Murang'a",
    city: "Murang'a",
    coordinates: {
      lat: -0.73,
      lng: 37.15,
    },
    phone: "+254 700 111 003",
    email: "dining@nokrasmurunga.com",
    rating: 4.8,
    totalReviews: 201,
    seatingCapacity: 75,
    ambiance: "Fine Dining, Contemporary, Sophisticated",
    priceRange: "$$$",
    images: restaurantImages.murangaTable,
    features: [
      "Fine dining service",
      "Tasting menu",
      "Wine pairings",
      "Open kitchen",
      "Private dining rooms",
      "Chef's table",
    ],
    hours: operatingHours,
    specialties: [
      "Murang'a tea-smoked duck",
      "Highland beef with forest greens",
      "Coffee-rubbed short ribs",
      "Traditional desserts reimagined",
    ],
    chefName: "Chef Margaret Njoki",
    reservationRequired: true,
    parkingAvailable: true,
    liveMusic: false,
    privateEvents: true,
  },

  // Nokras Silver Oak - Embu
  {
    id: "silverooak-rooftop-dining",
    name: "Silver Skyline Restaurant",
    hotelId: "nokras-silveroak-embu",
    hotelName: "Nokras SilverOak Hotel",
    cuisine: "Modern International",
    description:
      "A contemporary fine dining rooftop restaurant offering panoramic city views of Embu. The restaurant features modern international cuisine with Asian influences, prepared by award-winning chefs. Floor-to-ceiling windows and an open terrace create a sophisticated setting perfect for celebrations and business dining.",
    briefDescription:
      "Rooftop dining with modern international cuisine and city views",
    location: "Rooftop, Nokras SilverOak Hotel",
    city: "Embu",
    coordinates: {
      lat: -0.5386,
      lng: 37.4586,
    },
    phone: "+254 700 111 004",
    email: "dining@nokrassilveroak.com",
    rating: 4.9,
    totalReviews: 425,
    seatingCapacity: 140,
    ambiance: "Modern, Upscale, Rooftop Setting",
    priceRange: "$$$",
    images: restaurantImages.silverOakRooftop,
    features: [
      "Rooftop terrace",
      "Panoramic views",
      "Contemporary design",
      "Private event space",
      "Sushi bar",
      "Sommelier service",
    ],
    hours: operatingHours,
    specialties: [
      "Pan-seared salmon with miso glaze",
      "Wagyu beef with Asian seasoning",
      "Sushi rolls with local ingredients",
      "Fusion desserts",
    ],
    chefName: "Chef David Chen",
    reservationRequired: true,
    parkingAvailable: true,
    liveMusic: true,
    privateEvents: true,
  },
  {
    id: "silverooak-craft-bar",
    name: "The Silver Standard Bar",
    hotelId: "nokras-silveroak-embu",
    hotelName: "Nokras SilverOak Hotel",
    cuisine: "Casual International",
    description:
      "A modern craft bar and casual dining venue featuring contemporary cocktails, craft beers, and light cuisine. The bar showcases local and international spirits with skilled mixologists creating innovative drinks. The space features modern industrial design with comfortable seating ideal for after-work gatherings and casual dining.",
    briefDescription: "Modern craft bar with innovative cocktails",
    location: "Ground Floor, Nokras SilverOak Hotel",
    city: "Embu",
    coordinates: {
      lat: -0.5386,
      lng: 37.4586,
    },
    phone: "+254 700 111 004",
    email: "bar@nokrassilveroak.com",
    rating: 4.5,
    totalReviews: 312,
    seatingCapacity: 95,
    ambiance: "Modern, Casual, Contemporary",
    priceRange: "$$",
    images: restaurantImages.silverOakBar,
    features: [
      "Craft cocktails",
      "Local craft beers",
      "Mixology classes",
      "Live DJ",
      "Pool table games",
      "Bar snacks",
    ],
    hours: operatingHours,
    specialties: [
      "Signature Silver Standard cocktail",
      "Local craft beer selection",
      "Gourmet sliders",
      "Charcuterie boards",
    ],
    reservationRequired: false,
    parkingAvailable: true,
    liveMusic: true,
    privateEvents: true,
  },
];

/**
 * Restaurant showcase sections for scroll-based display
 * Organized by branch for easy navigation
 */
export const restaurantsByBranch = {
  riverine: nokrasRestaurants.filter((r) => r.hotelId === "nokras-riverine"),
  enkare: nokrasRestaurants.filter((r) => r.hotelId === "nokras-enkare"),
  muranga: nokrasRestaurants.filter((r) => r.hotelId === "nokras-muranga"),
  silverooak: nokrasRestaurants.filter(
    (r) => r.hotelId === "nokras-silveroak-embu",
  ),
};

/**
 * Featured restaurants rotation for homepage
 */
export const featuredRestaurants = [
  nokrasRestaurants[0], // Riverside Cove
  nokrasRestaurants[4], // Silver Skyline
  nokrasRestaurants[3], // Mount Ember Grill
];
