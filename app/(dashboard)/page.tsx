"use client";

import { MapView } from "@/components/dashboard/map-view";
import { ListingsPanel } from "@/components/dashboard/listings-panel";
import { MapControls } from "@/components/dashboard/map-controls";

export default function HotelsPage() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Map takes full screen on mobile/tablet, right half on large screens */}
      <div className="absolute inset-0 lg:left-1/2 w-full lg:w-1/2 h-full">
        <MapView />
      </div>
      <ListingsPanel />
      <MapControls />
    </div>
  );
}
