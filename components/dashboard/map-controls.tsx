"use client";

import * as React from "react";
import {
  ZoomIn,
  ZoomOut,
  Navigation,
  Github,
  Layers,
  Map,
  Mountain,
  Satellite,
  Circle,
  Settings,
} from "lucide-react";
import { useHotelsStore } from "@/store/hotels-store";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const mapStyles = [
  {
    id: "default",
    name: "Default",
    icon: Circle,
    description: "Follows theme",
  },
  { id: "streets", name: "Streets", icon: Map, description: "Detailed roads" },
  {
    id: "outdoors",
    name: "Outdoors",
    icon: Mountain,
    description: "Terrain & trails",
  },
  {
    id: "satellite",
    name: "Satellite",
    icon: Satellite,
    description: "Aerial view",
  },
] as const;

export function MapControls() {
  const { mapZoom, setMapZoom, setMapCenter, setUserLocation, mapStyle, setMapStyle } =
    useHotelsStore();
  const isMobile = useIsMobile();

  const handleZoomIn = () => {
    setMapZoom(Math.min(mapZoom + 1, 18));
  };

  const handleZoomOut = () => {
    setMapZoom(Math.max(mapZoom - 1, 3));
  };

  const handleLocate = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(location);
          setMapCenter(location);
          setMapZoom(15);
        },
        () => {
          alert("Unable to get your location. Please try again later.");
        },
        { enableHighAccuracy: false, timeout: 5000, maximumAge: 300000 }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  if (isMobile) {
    return (
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-20">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="lg"
              className="rounded-full shadow-lg h-14 w-14 p-0"
            >
              <Settings className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-auto max-h-[85vh] px-4 sm:px-6">
            <SheetHeader className="pb-2 sm:pb-4">
              <SheetTitle className="text-lg sm:text-xl">Map Controls</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 sm:gap-6 pb-4 sm:pb-6">
              <div className="flex flex-col gap-3 sm:gap-4">
                <h3 className="text-sm font-medium px-1">Map Style</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  {mapStyles.map((style) => {
                    const Icon = style.icon;
                    return (
                      <Button
                        key={style.id}
                        variant={mapStyle === style.id ? "default" : "outline"}
                        onClick={() => setMapStyle(style.id as "default" | "streets" | "outdoors" | "satellite")}
                        className="justify-start gap-2 sm:gap-3 h-auto p-2 sm:p-3 text-left"
                        size="sm"
                      >
                        <Icon className="size-3 sm:size-4 shrink-0" />
                        <div className="flex flex-col items-start min-w-0 flex-1">
                          <span className="font-medium text-xs sm:text-sm truncate">{style.name}</span>
                          <span className="text-xs text-muted-foreground truncate">
                            {style.description}
                          </span>
                        </div>
                      </Button>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:gap-4">
                <h3 className="text-sm font-medium px-1">Map Controls</h3>
                <div className="flex gap-1 sm:gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleZoomIn}
                    className="flex-1 h-10 sm:h-12"
                  >
                    <ZoomIn className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleZoomOut}
                    className="flex-1 h-10 sm:h-12"
                  >
                    <ZoomOut className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleLocate}
                    className="flex-1 h-10 sm:h-12"
                  >
                    <Navigation className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:gap-4">
                <h3 className="text-sm font-medium px-1">Theme</h3>
                <div className="flex justify-center py-2">
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    );
  }

  return (
    <div className="absolute right-4 top-4 z-20 flex flex-col gap-2">
      <div className="flex flex-col gap-2 rounded-lg border bg-background p-1 shadow-lg">
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9"
                >
                  <Layers className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {mapStyles.map((style) => {
                  const Icon = style.icon;
                  return (
                    <DropdownMenuItem
                      key={style.id}
                      onClick={() => setMapStyle(style.id as "default" | "streets" | "outdoors" | "satellite")}
                      className={cn("gap-3", mapStyle === style.id && "bg-accent")}
                    >
                      <Icon className="size-4 shrink-0" />
                      <div className="flex flex-col">
                        <span className="font-medium">{style.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {style.description}
                        </span>
                      </div>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </TooltipTrigger>
          <TooltipContent>Map style</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleZoomIn}
              className="h-9 w-9"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Zoom in</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleZoomOut}
              className="h-9 w-9"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Zoom out</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLocate}
              className="h-9 w-9"
            >
              <Navigation className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Locate me</TooltipContent>
        </Tooltip>
      </div>

      <div className="flex flex-col gap-2 rounded-lg border bg-background p-1 shadow-lg">
        <ThemeToggle />
        {/* <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" asChild className="h-9 w-9">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center"
              >
                <Github className="h-4 w-4" />
              </a>
            </Button>
          </TooltipTrigger>
           {/* <TooltipContent>View on GitHub</TooltipContent> 
        </Tooltip> */}
      </div>
    </div>
  );
}
