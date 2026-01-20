"use client";

import * as React from "react";
import { type Listing } from "@/mock-data/listings";
import { BookingFlow } from "@/components/dashboard/booking-flow";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

interface BookingModalProps {
  hotelName: string;
  city: string;
  country: string;
  image: string;
  availableRooms: Listing[];
  isOpen: boolean;
  onClose: () => void;
}

export function BookingModal({ hotelName, city, country, image, availableRooms, isOpen, onClose }: BookingModalProps) {
  // Don't render if no rooms available
  if (!availableRooms || availableRooms.length === 0) return null;

  const isMobile = useIsMobile();
  const Content = (
    <div className="flex flex-col h-full max-h-[90vh]">
      <BookingFlow
        hotelName={hotelName}
        city={city}
        country={country}
        image={image}
        availableRooms={availableRooms}
        onCancel={onClose}
      />
    </div>
  );

  const handleClose = () => {
    onClose();
  };

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={handleClose}>
        <SheetContent side="bottom" className="h-[95vh] p-0">
          <SheetHeader className="px-4 py-3 border-b">
            <SheetTitle>Book Your Stay</SheetTitle>
          </SheetHeader>
          {Content}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] p-0 overflow-hidden">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle>Book Your Stay</DialogTitle>
        </DialogHeader>
        {Content}
      </DialogContent>
    </Dialog>
  );
}
