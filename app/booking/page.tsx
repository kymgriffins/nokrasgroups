"use client";

import { MapView } from "@/components/dashboard/map-view";
import { ListingsPanel } from "@/components/dashboard/listings-panel";
import { MapControls } from "@/components/dashboard/map-controls";

export default function BookingPage() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <MapView />
      <ListingsPanel />
      <MapControls />
    </div>
  );
}
