# Nokras Hotels - Hotel Booking Explorer

A beautiful, modern hotel booking exploration application built with Next.js by Gr8Builds, featuring interactive maps, comprehensive filtering, and a sleek user interface for discovering and booking hotel rooms worldwide.

![Nokras Hotels App Preview](https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&h=800&fit=crop)

## 🚀 Features

### Interactive Map Experience
- **MapLibre GL Integration**: High-performance, open-source mapping with multiple style options
- **Hotel Markers**: Price-displaying markers on the map with hover effects and selection states
- **Detailed Popups**: Rich hotel information popups with images, ratings, and amenities
- **Map Styles**: Choose from Default, Streets, Outdoors, and Satellite views
- **Location Services**: "Locate me" functionality and geolocation-based sorting

### Advanced Filtering & Search
- **Global Search**: Search by hotel name, description, city, or address
- **Room Type Filters**: Standard, Deluxe, Suite, Executive, Presidential
- **Price Range Slider**: Adjustable price filtering from $0-$500/night
- **Room Specifications**: Filter by beds and occupancy
- **Amenities**: WiFi, Breakfast, Gym, Pool, Spa, and more

### Smart Sorting Options
- Price: Low to High / High to Low
- Best Rated hotels
- Newest listings first
- Most reviews
- Nearest to your location (with geolocation)

### Favorites Management
- **Save Hotels**: Heart hotels to create a personal favorites list
- **Favorites Page**: Dedicated view for saved hotels
- **Persistent State**: Favorites maintained across sessions

### Responsive Design
- **Mobile Optimized**: Collapsible panels and touch-friendly controls
- **Grid & List Views**: Switch between grid and list layouts for hotel listings
- **Adaptive UI**: Sidebar collapses on mobile, map controls reposition

### Theme Support
- **Dark/Light Modes**: Automatic system detection with manual override
- **Consistent Theming**: All components respect the selected theme
- **Smooth Transitions**: Theme changes with elegant animations

## 🛠️ Tech Stack

- **Framework**: Next.js 16 with App Router
- **Runtime**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand
- **Mapping**: MapLibre GL
- **UI Components**: Radix UI (shadcn/ui)
- **Icons**: Lucide React
- **Fonts**: Geist Sans & Geist Mono
- **Package Manager**: pnpm

## 📁 Project Structure

```
nokrasgroups/
├── app/                          # Next.js app directory
│   ├── (dashboard)/             # Dashboard route group
│   │   ├── favorites/           # Favorites page
│   │   ├── layout.tsx           # Dashboard layout with sidebar
│   │   ├── page.tsx             # Main hotels page
│   │   └── sidebar.tsx          # Navigation sidebar
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page (redirects to dashboard)
├── components/                  # React components
│   ├── dashboard/               # Dashboard-specific components
│   │   ├── listings-panel.tsx   # Property listings panel
│   │   ├── map-controls.tsx     # Map control buttons
│   │   ├── map-view.tsx         # Interactive map component
│   │   └── sidebar.tsx          # Navigation sidebar
│   ├── theme-provider.tsx       # Theme context provider
│   ├── theme-toggle.tsx         # Theme switcher
│   └── ui/                      # Reusable UI components (shadcn/ui)
├── hooks/                       # Custom React hooks
├── lib/                         # Utility functions
├── mock-data/                   # Sample data
│   └── listings.ts              # Property listings data
└── store/                       # State management
    └── hotels-store.ts          # Zustand store
```

## 🗃️ Data Model

### Property Listing
```typescript
interface Listing {
  id: string;
  title: string;
  description: string;
  address: string;
  city: string;
  country: string;
  coordinates: { lat: number; lng: number };
  pricePerNight: number;
  propertyType: PropertyType;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  guests: number;
  rating: number;
  reviewCount: number;
  images: string[];
  amenities: string[];
  host: {
    name: string;
    avatar: string;
    isSuperhost: boolean;
  };
  isFavorite: boolean;
  isNew: boolean;
  instantBook: boolean;
}
```

### Property Types
- Apartment
- House
- Villa
- Studio
- Loft
- Cottage

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/nokrasgroups.git
   cd nokrasgroups
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
pnpm build
pnpm start
```

## 🎨 Design System

### Colors
- **Primary**: Adaptive based on theme
- **Background**: Card-based design with subtle shadows
- **Text**: High contrast for accessibility

### Typography
- **Headings**: Geist Sans (variable font)
- **Body**: Geist Mono for code elements
- **Sizes**: Responsive scaling from mobile to desktop

### Components
- **shadcn/ui**: Consistent, accessible UI primitives
- **Radix UI**: Unstyled, accessible component primitives
- **Tailwind CSS**: Utility-first styling with custom design tokens

## 🌍 Mock Data

The application includes 150+ mock property listings across major cities worldwide:

- **Coverage**: 60+ cities across 6 continents
- **Property Types**: Diverse mix of apartments, houses, villas, etc.
- **Pricing**: $50-$500 per night range
- **Features**: Realistic ratings, reviews, amenities, and host information

## 🔧 Development

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

### Code Quality

- **TypeScript**: Full type safety
- **ESLint**: Code linting and formatting
- **Prettier**: Consistent code formatting

### State Management

The app uses Zustand for predictable state management:

- **Centralized Store**: Single source of truth for app state
- **Computed Selectors**: Efficient filtering and sorting
- **Actions**: Pure functions for state updates

## 📱 Responsive Behavior

### Desktop (> 640px)
- Full sidebar navigation
- Side-by-side map and listings panel
- Complete map controls

### Mobile (< 640px)
- Collapsible sidebar
- Overlay listings panel
- Simplified map controls
- Touch-optimized interactions

## 🌟 Key Features Deep Dive

### Map Integration
- **MapLibre GL**: Open-source alternative to Mapbox GL
- **Dynamic Markers**: Price markers with selection states
- **Popup System**: Rich property cards on marker click
- **Geolocation**: Browser geolocation API integration

### Filtering System
- **Real-time Updates**: Instant filtering as you type/select
- **Multi-criteria**: Combine multiple filters simultaneously
- **Visual Feedback**: Active filter indicators and counts

### User Experience
- **Smooth Animations**: Map transitions and UI state changes
- **Loading States**: Skeleton screens and progressive enhancement
- **Error Handling**: Graceful fallbacks for failed operations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Square UI**: Design system and layout inspiration
- **shadcn/ui**: Beautiful UI components
- **MapLibre**: Open-source mapping
- **Unsplash**: High-quality stock images
- **Radix UI**: Accessible component primitives

---

**Designed and built by Gr8Builds**
