"use client";

import * as React from "react";
import {
  Search,
  X,
  Heart,
  Star,
  MapPin,
  ArrowUpDown,
  ArrowLeft,
  Check,
  Grid3x3,
  List,
  DollarSign,
  TrendingUp,
  Sparkles,
  MessageSquare,
  Calendar,
} from "lucide-react";
import { useHotelsStore } from "@/store/nokras-store";
import { type Listing, roomTypeLabels } from "@/mock-data/listings";
import { type HotelLocation } from "@/mock-data/locations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useMediaQuery } from "usehooks-ts";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

type PanelMode = "all" | "favorites";

interface ListingsPanelProps {
  mode?: PanelMode;
}

export function ListingsPanel({ mode = "all" }: ListingsPanelProps) {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const router = useRouter();
  const {
    selectedListingId,
    selectedHotelId,
    searchQuery,
    sortBy,
    selectListing,
    selectHotel,
    toggleFavorite,
    setSearchQuery,
    setSortBy,
    getFilteredListings,
    getFavoriteListings,
    getFilteredHotels,
    getRoomTypesForHotel,
    setMapCenter,
    setMapZoom,
    setUserLocation,
    isBookingMode,
    setIsBookingMode,
  } = useHotelsStore();

  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [isPanelVisible, setIsPanelVisible] = React.useState(true);
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");

  React.useEffect(() => {
    if ((isDesktop || isTablet) && !isPanelVisible) {
      setIsPanelVisible(true);
    }
  }, [isDesktop, isTablet, isPanelVisible]);

  const getItems = () => {
    if (selectedHotelId) {
      // Show rooms for selected hotel
      const selectedHotel = getFilteredHotels().find(h => h.id === selectedHotelId);
      return selectedHotel ? getRoomTypesForHotel(selectedHotel.name) : [];
    } else {
      // Show hotels
      switch (mode) {
        case "favorites":
          return getFavoriteListings().reduce((hotels: HotelLocation[], listing) => {
            const hotel = hotels.find(h => h.name === listing.hotel.name);
            if (!hotel) {
              const hotelData = getFilteredHotels().find(h => h.name === listing.hotel.name);
              if (hotelData) hotels.push(hotelData);
            }
            return hotels;
          }, []);
        default:
          return getFilteredHotels();
      }
    }
  };

  const items = getItems();
  const isShowingRooms = selectedHotelId !== null;

  React.useEffect(() => {
    if (selectedListingId && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selectedListingId]);

  const handleListingClick = (listing: Listing) => {
    if (selectedListingId === listing.id) {
      selectListing(null);
    } else {
      selectListing(listing.id);
      setMapCenter(listing.coordinates);
      setMapZoom(14);
    }
  };

  const handleBookNow = (listing: Listing) => {
    router.push(`/payment?listingId=${listing.id}`);
  };

  if (!isPanelVisible) {
    return (
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-4 z-20 sm:hidden size-10 bg-background shadow-xl"
        onClick={() => setIsPanelVisible(true)}
      >
        <Search className="size-5" />
      </Button>
    );
  }

  return (
    <div className={cn(
      "absolute left-4 top-4 bottom-4 z-20 flex flex-col bg-background rounded-xl shadow-xl border overflow-hidden",
      // Luxury responsive sizing - reduction not compression
      isMobile ? "w-[calc(100vw-2rem)]" : // Full width minus margins on mobile
      isTablet ? "w-80" : // Medium on tablet
      "w-[420px]" // Full on desktop
    )}>
      <div className={cn(
        "border-b flex items-center justify-between",
        // Luxury typography - airier on mobile
        isMobile ? "p-4" : "p-3"
      )}>
        <div>
          <h2 className={cn(
            "font-semibold",
            // Luxury typography - larger on mobile, shorter content
            isMobile ? "text-lg" : "text-base"
          )}>
            {isShowingRooms ? getFilteredHotels().find(h => h.id === selectedHotelId)?.name : (mode === "favorites" ? "Favorites" : "Nokras Hotels")}
          </h2>
          {/* Hide count on mobile for cleaner look */}
          {!isMobile && (
            <p className="text-xs text-muted-foreground">
              {items.length}{" "}
              {isShowingRooms ? (items.length === 1 ? "room" : "rooms") : (items.length === 1 ? "hotel" : "hotels")}
            </p>
          )}
        </div>
        <div className="flex items-center gap-1">
          {/* Back button when viewing rooms */}
          {isShowingRooms && (
            <Button
              variant="ghost"
              size="icon"
              className="size-8"
              onClick={() => selectHotel(null)}
            >
              <ArrowLeft className="size-5" />
            </Button>
          )}
          {/* Mobile close button only on mobile */}
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              className="size-8"
              onClick={() => setIsPanelVisible(false)}
            >
              <X className="size-5" />
            </Button>
          )}
        </div>
      </div>

      {isBookingMode && (
        <div className={cn(
          "border-b",
          isMobile ? "p-3" : "p-2"
        )}>
          <div className={cn(
            "flex items-center gap-2",
            isMobile ? "flex-col gap-2" : ""
          )}>
            <div className="relative flex-1 w-full">
              <Search className={cn(
                "absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground",
                isMobile ? "size-3.5" : "size-4"
              )} />
              <Input
                placeholder="Search hotels..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={cn(
                  isMobile ? "pl-8 h-9 text-sm" : "pl-8 h-9",
                  searchQuery && "pr-8"
                )}
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "absolute right-1 top-1/2 -translate-y-1/2",
                    isMobile ? "size-6" : "size-7"
                  )}
                  onClick={() => setSearchQuery("")}
                >
                  <X className={cn(
                    isMobile ? "size-3" : "size-3.5"
                  )} />
                </Button>
              )}
            </div>
            <div className={cn(
              "flex items-center gap-1 rounded-lg border p-0.5",
              isMobile ? "w-full justify-center" : ""
            )}>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="icon"
                className={cn(
                  isMobile ? "h-8 w-8 flex-1" : "h-7 w-7"
                )}
                onClick={() => setViewMode("list")}
              >
                <List className={cn(
                  isMobile ? "h-3.5 w-3.5" : "h-3.5 w-3.5"
                )} />
              </Button>
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon"
                className={cn(
                  isMobile ? "h-8 w-8 flex-1" : "h-7 w-7"
                )}
                onClick={() => setViewMode("grid")}
              >
                <Grid3x3 className={cn(
                  isMobile ? "h-3.5 w-3.5" : "h-3.5 w-3.5"
                )} />
              </Button>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className={cn(
                  "shrink-0",
                  isMobile ? "size-9 w-full" : "size-9"
                )}>
                  <ArrowUpDown className={cn(
                    isMobile ? "size-3.5" : "size-4"
                  )} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align={isMobile ? "start" : "end"} className={cn(
                isMobile ? "w-[calc(100vw-3rem)]" : "w-48"
              )}>
                <DropdownMenuItem
                  onClick={() => setSortBy("price-low")}
                  className="gap-2"
                >
                  <DollarSign className="size-4" />
                  <span className="flex-1">Price: Low to High</span>
                  {sortBy === "price-low" && <Check className="size-4" />}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSortBy("price-high")}
                  className="gap-2"
                >
                  <TrendingUp className="size-4" />
                  <span className="flex-1">Price: High to Low</span>
                  {sortBy === "price-high" && <Check className="size-4" />}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSortBy("rating")}
                  className="gap-2"
                >
                  <Star className="size-4" />
                  <span className="flex-1">Best rated</span>
                  {sortBy === "rating" && <Check className="size-4" />}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSortBy("newest")}
                  className="gap-2"
                >
                  <Sparkles className="size-4" />
                  <span className="flex-1">Newest first</span>
                  {sortBy === "newest" && <Check className="size-4" />}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSortBy("reviews")}
                  className="gap-2"
                >
                  <MessageSquare className="size-4" />
                  <span className="flex-1">Most reviews</span>
                  {sortBy === "reviews" && <Check className="size-4" />}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    if (!navigator.geolocation) {
                      alert("Geolocation is not supported by your browser.");
                      return;
                    }
                    navigator.geolocation.getCurrentPosition(
                      (position) => {
                        const location = {
                          lat: position.coords.latitude,
                          lng: position.coords.longitude,
                        };
                        setUserLocation(location);
                        setSortBy("nearest");
                      },
                      () => {
                        alert(
                          "Unable to get your location. Please try again later."
                        );
                      },
                      {
                        enableHighAccuracy: false,
                        timeout: 5000,
                        maximumAge: 300000,
                      }
                    );
                  }}
                  className="gap-2"
                >
                  <MapPin className="size-4" />
                  <span className="flex-1">Nearest to me</span>
                  {sortBy === "nearest" && <Check className="size-4" />}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      )}

      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Search className="size-8 text-muted-foreground mb-2" />
            <p className="text-sm font-medium">No {isShowingRooms ? "rooms" : "hotels"} found</p>
            <p className="text-xs text-muted-foreground mt-1">
              Try adjusting your search or filters
            </p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="p-2 grid grid-cols-1 gap-3">
            {items.map((item) => {
              if (isShowingRooms) {
                // Render room listing
                const listing = item as Listing;
                const isSelected = selectedListingId === listing.id;

                return (
                  <div
                    key={listing.id}
                    onClick={() => handleListingClick(listing)}
                    className={cn(
                      "group cursor-pointer rounded-xl border bg-card transition-all hover:shadow-lg overflow-hidden",
                      isSelected &&
                        "border-primary shadow-lg ring-2 ring-primary/20"
                    )}
                  >
                    <div className={cn(
                      "relative overflow-hidden",
                      // Luxury principle: Images become primary on mobile
                      isMobile ? "aspect-[4/5]" : "aspect-4/3" // Taller images on mobile
                    )}>
                      <Carousel className="h-full w-full">
                        <CarouselContent className="h-full">
                          {listing.images.map((image: string, imageIndex: number) => (
                            <CarouselItem key={imageIndex} className="h-full">
                              <img
                                src={image}
                                alt={`${listing.title} - Image ${imageIndex + 1}`}
                                className="h-full w-full object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src =
                                    "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop";
                                }}
                              />
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        {/* Hide carousel controls on mobile for cleaner look */}
                        {!isMobile && (
                          <>
                            <CarouselPrevious className="left-2 h-8 w-8 opacity-0! group-hover:opacity-100! transition-opacity bg-white/90 hover:bg-white" />
                            <CarouselNext className="right-2 h-8 w-8 opacity-0! group-hover:opacity-100! transition-opacity bg-white/90 hover:bg-white" />
                          </>
                        )}
                      </Carousel>
                      <div className="absolute top-2 right-2 z-10">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(listing.id);
                          }}
                        >
                          <Heart
                            className={cn(
                              "h-4 w-4 transition-colors",
                              listing.isFavorite
                                ? "fill-destructive text-destructive"
                                : "text-foreground"
                            )}
                          />
                        </Button>
                      </div>
                      {listing.isNew && (
                        <div className="absolute top-2 left-2 z-10">
                          <Badge
                            variant="default"
                            className="bg-primary text-primary-foreground text-xs"
                          >
                            New
                          </Badge>
                        </div>
                      )}
                    </div>
                    <div className={cn(
                      // Luxury typography - airier on mobile
                      isMobile ? "p-4" : "p-3"
                    )}>
                      <div className="mb-1 flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h3 className={cn(
                            "font-semibold mb-1 truncate",
                            // Luxury typography - larger on mobile
                            isMobile ? "text-base" : "text-sm"
                          )}>
                            {listing.title}
                          </h3>
                          <div className={cn(
                            "flex items-center gap-1 text-muted-foreground mb-1",
                            // Luxury typography - larger on mobile
                            isMobile ? "text-sm" : "text-xs"
                          )}>
                            <MapPin className={cn(
                              // Luxury touch - larger tap targets on mobile
                              isMobile ? "h-4 w-4" : "h-3 w-3"
                            )} />
                            <span className="truncate">
                              {listing.city}, {listing.country}
                            </span>
                          </div>
                        </div>
                      </div>
                      {/* Progressive disclosure - hide secondary info on mobile */}
                      {!isMobile && (
                        <div className="flex items-center gap-3 mb-2 text-xs">
                          <div className="flex items-center gap-1">
                            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">
                              {listing.rating.toFixed(1)}
                            </span>
                            <span className="text-muted-foreground">
                              ({listing.reviewCount})
                            </span>
                          </div>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-muted-foreground">
                            {roomTypeLabels[listing.roomType]}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <div>
                          <span className={cn(
                            "font-semibold",
                            // Luxury typography - larger on mobile
                            isMobile ? "text-lg" : "text-base"
                          )}>
                            KES {listing.pricePerNight.toLocaleString()}
                          </span>
                          <span className={cn(
                            "text-muted-foreground",
                            // Luxury typography - larger on mobile
                            isMobile ? "text-sm" : "text-xs"
                          )}>
                            {" "}
                            / night
                          </span>
                        </div>
                        {/* Progressive disclosure - hide capacity info on mobile */}
                        {!isMobile && (
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            {listing.beds > 0 && (
                              <span>
                                {listing.beds} bed
                                {listing.beds > 1 ? "s" : ""}
                              </span>
                            )}
                            {listing.guests > 0 && (
                              <span>
                                • {listing.guests} guest
                                {listing.guests > 1 ? "s" : ""}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                      {isSelected && (
                        <div className="mt-3 pt-3 border-t">
                          <Button
                            className="w-full"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleBookNow(listing);
                            }}
                          >
                            <Calendar className="size-4 mr-2" />
                            Book Now
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              } else {
                // Render hotel
                const hotel = item as HotelLocation;

                return (
                  <div
                    key={hotel.id}
                    onClick={() => selectHotel(hotel.id)}
                    className={cn(
                      "group cursor-pointer rounded-xl border bg-card transition-all hover:shadow-lg overflow-hidden"
                    )}
                  >
                    <div className={cn(
                      "relative overflow-hidden",
                      // Luxury principle: Images become primary on mobile
                      isMobile ? "aspect-[4/5]" : "aspect-4/3" // Taller images on mobile
                    )}>
                      <Carousel className="h-full w-full">
                        <CarouselContent className="h-full">
                          {hotel.images.slice(0, 3).map((image: string, imageIndex: number) => (
                            <CarouselItem key={imageIndex} className="h-full">
                              <img
                                src={image}
                                alt={`${hotel.name} - Image ${imageIndex + 1}`}
                                className="h-full w-full object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src =
                                    "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop";
                                }}
                              />
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        {/* Hide carousel controls on mobile for cleaner look */}
                        {!isMobile && (
                          <>
                            <CarouselPrevious className="left-2 h-8 w-8 opacity-0! group-hover:opacity-100! transition-opacity bg-white/90 hover:bg-white" />
                            <CarouselNext className="right-2 h-8 w-8 opacity-0! group-hover:opacity-100! transition-opacity bg-white/90 hover:bg-white" />
                          </>
                        )}
                      </Carousel>
                      <div className="absolute top-2 right-2 z-10">
                        <Badge variant="secondary" className="text-xs">
                          {hotel.stars} ★
                        </Badge>
                      </div>
                    </div>
                    <div className={cn(
                      // Luxury typography - airier on mobile
                      isMobile ? "p-4" : "p-3"
                    )}>
                      <div className="mb-1 flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h3 className={cn(
                            "font-semibold mb-1 truncate",
                            // Luxury typography - larger on mobile
                            isMobile ? "text-base" : "text-sm"
                          )}>
                            {hotel.name}
                          </h3>
                          <div className={cn(
                            "flex items-center gap-1 text-muted-foreground mb-1",
                            // Luxury typography - larger on mobile
                            isMobile ? "text-sm" : "text-xs"
                          )}>
                            <MapPin className={cn(
                              // Luxury touch - larger tap targets on mobile
                              isMobile ? "h-4 w-4" : "h-3 w-3"
                            )} />
                            <span className="truncate">
                              {hotel.city}, {hotel.country}
                            </span>
                          </div>
                        </div>
                      </div>
                      {hotel.description && (
                        <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                          {hotel.description}
                        </p>
                      )}
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {hotel.amenities.slice(0, 3).map((amenity: string) => (
                            <Badge key={amenity} variant="outline" className="text-xs">
                              {amenity}
                            </Badge>
                          ))}
                          {hotel.amenities.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{hotel.amenities.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        ) : (
          <div className="p-2 space-y-3">
            {items.map((item) => {
              if (isShowingRooms) {
                // Render room listing in list view
                const listing = item as Listing;
                const isSelected = selectedListingId === listing.id;

                return (
                  <div
                    key={listing.id}
                    onClick={() => handleListingClick(listing)}
                    className={cn(
                      "group cursor-pointer rounded-xl border bg-card transition-all hover:shadow-lg overflow-hidden",
                      isSelected &&
                        "border-primary shadow-lg ring-2 ring-primary/20",
                      "flex flex-col sm:flex-row"
                    )}
                  >
                    <div className="relative w-full h-48 sm:w-32 sm:h-32 md:w-40 md:h-40 flex-shrink-0 overflow-hidden">
                      <img
                        src={listing.images[0]}
                        alt={listing.title}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src =
                            "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop";
                        }}
                      />
                      <div className="absolute top-2 right-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 sm:h-6 sm:w-6 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(listing.id);
                          }}
                        >
                          <Heart
                            className={cn(
                              "h-3.5 w-3.5 sm:h-3 sm:w-3 transition-colors",
                              listing.isFavorite
                                ? "fill-destructive text-destructive"
                                : "text-foreground"
                            )}
                          />
                        </Button>
                      </div>
                      {listing.isNew && (
                        <div className="absolute top-2 left-2">
                          <Badge
                            variant="default"
                            className="bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5"
                          >
                            New
                          </Badge>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 p-3 sm:p-2.5 flex flex-col justify-between min-w-0">
                      <div className="flex-1">
                        <div className="mb-1.5 sm:mb-1">
                          <h3 className="font-semibold text-sm sm:text-xs mb-1 line-clamp-2 sm:line-clamp-1">
                            {listing.title}
                          </h3>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3 flex-shrink-0" />
                            <span className="truncate">
                              {listing.city}, {listing.country}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs mb-2">
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">
                              {listing.rating.toFixed(1)}
                            </span>
                            <span className="text-muted-foreground">
                              ({listing.reviewCount})
                            </span>
                          </div>
                          <span className="text-muted-foreground hidden sm:inline">
                            •
                          </span>
                          <span className="text-muted-foreground">
                            {roomTypeLabels[listing.roomType]}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-2 pt-2 border-t sm:border-t-0 sm:pt-0">
                        <div className="flex-shrink-0">
                          <span className="text-base sm:text-sm font-semibold">
                            KES {listing.pricePerNight.toLocaleString()}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {" "}
                            / night
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 sm:gap-2 text-xs text-muted-foreground flex-shrink-0">
                          {listing.beds > 0 && (
                            <span className="whitespace-nowrap">
                              {listing.beds} bed
                              {listing.beds > 1 ? "s" : ""}
                            </span>
                          )}
                          {listing.guests > 0 && (
                            <>
                              <span className="hidden sm:inline">•</span>
                              <span className="whitespace-nowrap">
                                {listing.guests} guest
                                {listing.guests > 1 ? "s" : ""}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      {isSelected && (
                        <div className="mt-3 pt-3 border-t">
                          <Button
                            className="w-full"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleBookNow(listing);
                            }}
                          >
                            <Calendar className="size-4 mr-2" />
                            Book Now
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              } else {
                // Render hotel in list view
                const hotel = item as HotelLocation;

                return (
                  <div
                    key={hotel.id}
                    onClick={() => selectHotel(hotel.id)}
                    className={cn(
                      "group cursor-pointer rounded-xl border bg-card transition-all hover:shadow-lg overflow-hidden",
                      "flex flex-col sm:flex-row"
                    )}
                  >
                    <div className="relative w-full h-48 sm:w-32 sm:h-32 md:w-40 md:h-40 flex-shrink-0 overflow-hidden">
                      <img
                        src={hotel.images[0]}
                        alt={hotel.name}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src =
                            "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop";
                        }}
                      />
                      <div className="absolute top-2 right-2">
                        <Badge variant="secondary" className="text-xs">
                          {hotel.stars} ★
                        </Badge>
                      </div>
                    </div>
                    <div className="flex-1 p-3 sm:p-2.5 flex flex-col justify-between min-w-0">
                      <div className="flex-1">
                        <div className="mb-1.5 sm:mb-1">
                          <h3 className="font-semibold text-sm sm:text-xs mb-1 line-clamp-2 sm:line-clamp-1">
                            {hotel.name}
                          </h3>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3 flex-shrink-0" />
                            <span className="truncate">
                              {hotel.city}, {hotel.country}
                            </span>
                          </div>
                        </div>
                        {hotel.description && (
                          <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                            {hotel.description}
                          </p>
                        )}
                        <div className="flex flex-wrap gap-1">
                          {hotel.amenities.slice(0, 3).map((amenity: string) => (
                            <Badge key={amenity} variant="outline" className="text-xs">
                              {amenity}
                            </Badge>
                          ))}
                          {hotel.amenities.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{hotel.amenities.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        )}
      </div>

      {/* Booking now routes to /payment; keep modal component for potential reuse elsewhere */}
    </div>
  );
}
