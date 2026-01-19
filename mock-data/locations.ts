export interface HotelLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  description?: string;
  website?: string;
  phone?: string;
  email?: string;
  stars: number;
  amenities: string[];
  images: string[];
  googleMapsEmbed?: string;
  isActive: boolean;
}

// Available accommodation images from public folder
const availableHotelImages = [
  "/accommodation/1634658749-tent2.jpg",
  "/accommodation/1634658771-family.jpg",
  "/accommodation/1634658796-standard2.jpg",
  "/accommodation/1634658821-standard.jpg",
  "/accommodation/1634659986-Slider12.jpg",
  "/accommodation/1634660023-Slider3.jpg",
  "/accommodation/1634660029-Slider4.jpg",
  "/accommodation/1634660031-Slider5.jpg",
  "/accommodation/1634660051-Slider14.jpg",
  "/accommodation/1634660134-Slider9.jpg",
  "/accommodation/1634660265-Slider8.jpg",
  "/accommodation/1635417482-tent_thumbnail.jpg",
  "/accommodation/1635417699-honeymoon_thumbnail.jpg",
  "/accommodation/1635418501-DJI_0931_1500px.jpg",
  "/accommodation/1635418507-DJI_0931_1500px.jpg",
  "/accommodation/1656690659-1501728148-3W1A2602.jpg",
  "/accommodation/1656690963-1501727987-3W1A2310.jpg",
  "/accommodation/1656690964-1501727979-3W1A2304.jpg",
  "/accommodation/1656698425-1501733598-3W1A1693.jpg",
  "/accommodation/1656698542-1501733665-3W1A2051.jpg",
  "/accommodation/1656698559-1501733690-3W1A1713.jpg",
  "/accommodation/1669884065-thumbnail1_room.jpg",
  "/accommodation/1669884125-thumbnail2_room.jpg",
  "/accommodation/1669884193-thumbnail3_room.jpg",
  "/accommodation/1669884196-thumbnail4_room.jpg",
  "/accommodation/1670064576-3W1A2325-2.jpg",
  "/accommodation/1670064576-3W1A2333.jpg",
  "/accommodation/1670064576-3W1A2346.jpg",
  "/accommodation/1670064576-3W1A2349.jpg",
  "/accommodation/1670064577-3W1A2253.jpg",
  "/accommodation/1670064577-3W1A2261.jpg",
  "/accommodation/1670064577-3W1A2272.jpg",
  "/accommodation/1670064577-3W1A2309.jpg",
  "/accommodation/1670064577-3W1A2316.jpg",
  "/accommodation/1670064753-3W1A2436.jpg",
  "/accommodation/1670064753-3W1A2448.jpg",
  "/accommodation/1670064754-3W1A2412.jpg",
  "/accommodation/1670064754-3W1A2443.jpg",
  "/accommodation/1670064754-3W1A2455.jpg",
  "/accommodation/1670064929-3W1A2367.jpg",
  "/accommodation/1670064929-3W1A2372.jpg",
  "/accommodation/1670064929-3W1A2376.jpg",
  "/accommodation/1670073747-3W1A5836.jpg",
  "/accommodation/1670073747-3W1A5866.jpg",
  "/accommodation/1670073866-3W1A6088.jpg",
  "/accommodation/1670073867-3W1A6074.jpg",
  "/accommodation/1670073867-3W1A6077.jpg",
  "/accommodation/1670073867-3W1A6094.jpg",
  "/accommodation/1670073867-3W1A6117.jpg",
  "/accommodation/1670073974-3W1A5976.jpg",
  "/accommodation/1670073975-3W1A5959.jpg",
  "/accommodation/1670073975-3W1A5967.jpg",
  "/accommodation/1670074055-3W1A5927.jpg",
  "/accommodation/1670074055-3W1A5935.jpg",
  "/accommodation/1670074055-3W1A5943.jpg",
  "/accommodation/1670075166-thumbnail4_room.jpg",
  "/accommodation/1670075177-thumbnail3_room.jpg",
  "/accommodation/1670075190-thumbnail2_room.jpg",
  "/accommodation/1670075208-thumbnail5_room.jpg",
  "/accommodation/1670075237-thumbnail1_room.jpg",
  "/accommodation/1670075432-thumbnail6_room.jpg",
  "/accommodation/1670164586-thumbnail1_room.jpg",
  "/accommodation/1670164775-thumbnail3_room.jpg",
  "/accommodation/1670164892-thumbnail25_room.jpg",
  "/accommodation/1670164914-thumbnail6_room.jpg",
  "/accommodation/1670164952-thumbnail4_room.jpg",
  "/accommodation/1670164984-thumbnail2_room.jpg",
  "/accommodation/1670503490-3W1A6953.jpg",
  "/accommodation/1670503490-3W1A6963.jpg",
  "/accommodation/1670503490-3W1A6970.jpg",
  "/accommodation/1670503490-3W1A7012.jpg",
  "/accommodation/1670503522-3W1A6927.jpg",
  "/accommodation/1670503522-3W1A6936_edit.jpg",
  "/accommodation/1670503556-3W1A7018.jpg",
  "/accommodation/1670503556-3W1A7023.jpg",
  "/accommodation/1670503557-3W1A7033.jpg",
  "/accommodation/1670503589-3W1A7171.jpg",
  "/accommodation/1670503589-3W1A7178.jpg",
  "/accommodation/1670503590-3W1A7210.jpg",
  "/accommodation/1671363577-P1530424.jpg",
  "/accommodation/1671363593-3W1A2554.jpg",
  "/accommodation/1671363606-3W1A2455.jpg",
  "/accommodation/1671363607-3W1A2448.jpg",
  "/accommodation/1671363609-3W1A2505.jpg",
  "/accommodation/1671363609-3W1A2512.jpg",
  "/accommodation/1671363610-3W1A2524-2.jpg",
  "/accommodation/1671363611-3W1A2537.jpg",
  "/accommodation/1671363612-3W1A2549-2.jpg"
];

// Function to get random images for a hotel (minimum 3, maximum 5)
function getRandomHotelImages(count: number = 5): string[] {
  const shuffled = [...availableHotelImages].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.max(3, count));
}

export const nokrasLocations: HotelLocation[] = [
  {
    id: "nokras-riverine",
    name: "Nokras Riverine Hotel & Spa",
    address: "Along Sagana River, Sagana",
    city: "Sagana",
    country: "Kenya",
    coordinates: {
      lat: -0.6635,
      lng: 37.185,
    },
    description: "A luxurious riverside hotel offering premium accommodations with spa facilities, located along the scenic Sagana River in Sagana, Kenya.",
    stars: 5,
    amenities: [
      "Free WiFi",
      "Swimming Pool",
      "Spa & Wellness Center",
      "Restaurant",
      "Bar",
      "Conference Rooms",
      "Laundry Service",
      "24/7 Security",
      "Parking",
      "Room Service"
    ],
    images: getRandomHotelImages(5),
    googleMapsEmbed: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.546125401857!2d37.19320337496475!3d-0.6692733993241974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1828995354c4b84b%3A0xaf53e354ba102aa3!2sNokras%20Riverine%20Hotel%20%26%20Spa!5e0!3m2!1sen!2ske!4v1768818982742!5m2!1sen!2ske" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`,
    phone: "+254 700 000 000",
    email: "info@nokrasriverine.com",
    website: "https://nokrasriverine.com",
    isActive: true,
  },
  {
    id: "nokras-silveroak-embu",
    name: "Nokras SilverOak Hotel",
    address: "Main Street, Embu Town Center",
    city: "Embu",
    country: "Kenya",
    coordinates: {
      lat: -0.5386,
      lng: 37.4586,
    },
    description: "A modern business hotel located in the heart of Embu town, offering comfortable accommodations and excellent service for both business and leisure travelers.",
    stars: 5,
    amenities: [
      "Free WiFi",
      "Business Center",
      "Restaurant",
      "Bar",
      "Conference Rooms",
      "Laundry Service",
      "24/7 Security",
      "Parking",
      "Room Service",
      "Fitness Center"
    ],
    images: getRandomHotelImages(4),
    phone: "+254 701 000 000",
    email: "info@nokrassilveroak.com",
    website: "https://nokrassilveroak.com",
    isActive: true,
  },
  {
    id: "nokras-enkare",
    name: "Nokras Enkare Hotel",
    address: "76QX+6XC Kirinyaga Mount Kenya, Sagana",
    city: "Sagana",
    country: "Kenya",
    coordinates: {
      lat: -0.665,
      lng: 37.19,
    },
    description: "A scenic hotel located along the Nakuru-Nairobi highway in Enkare, offering breathtaking views and comfortable accommodations for travelers.",
    stars: 5,
    amenities: [
      "Free WiFi",
      "Restaurant",
      "Bar",
      "Conference Facilities",
      "Laundry Service",
      "24/7 Security",
      "Parking",
      "Room Service",
      "Garden",
      "Scenic Views"
    ],
    images: getRandomHotelImages(3),
    phone: "+254 702 000 000",
    email: "info@nokrasenkare.com",
    website: "https://nokrasenkare.com",
    isActive: true,
  },
  {
    id: "nokras-muranga",
    name: "Nokras Murang'a Town Hotel",
    address: "Central Business District, Murang'a",
    city: "Murang'a",
    country: "Kenya",
    coordinates: {
      lat: -0.7214,
      lng: 37.1528,
    },
    description: "Located in the central business district of Murang'a town, this hotel offers convenient access to local attractions and business facilities.",
    stars: 5,
    amenities: [
      "Free WiFi",
      "Restaurant",
      "Bar",
      "Meeting Rooms",
      "Laundry Service",
      "24/7 Security",
      "Parking",
      "Room Service",
      "Shopping Access",
      "Local Transport"
    ],
    images: getRandomHotelImages(3),
    phone: "+254 703 000 000",
    email: "info@nokrasmuranga.com",
    website: "https://nokrasmuranga.com",
    isActive: true,
  },
];

export const getActiveLocations = (): HotelLocation[] => {
  return nokrasLocations.filter(location => location.isActive);
};

export const getLocationById = (id: string): HotelLocation | undefined => {
  return nokrasLocations.find(location => location.id === id);
};

export const getLocationsByCity = (city: string): HotelLocation[] => {
  return nokrasLocations.filter(location =>
    location.city.toLowerCase().includes(city.toLowerCase())
  );
};

export const getLocationsByCountry = (country: string): HotelLocation[] => {
  return nokrasLocations.filter(location =>
    location.country.toLowerCase().includes(country.toLowerCase())
  );
};
