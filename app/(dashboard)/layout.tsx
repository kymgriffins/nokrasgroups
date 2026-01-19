"use client";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { HotelsSidebar } from "@/components/dashboard/hotels-sidebar";
import { useHotelsStore } from "@/store/hotels-store";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isBookingMode } = useHotelsStore();

  return (
    <SidebarProvider>
      {isBookingMode && <HotelsSidebar />}
      <SidebarInset className="overflow-hidden">
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
