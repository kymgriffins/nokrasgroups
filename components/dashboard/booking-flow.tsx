"use client";

import * as React from "react";
import { Calendar, CreditCard, Smartphone, Check, User, Mail } from "lucide-react";
import { DateRange } from "react-day-picker";
import { useHotelsStore } from "@/store/nokras-store";
import { type Listing, roomTypeLabels } from "@/mock-data/listings";
import { isPastDate, normalizeCheckIn, normalizeCheckOut } from "@/store/nokras-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export type BookingStep = "details" | "payment" | "confirmation";

interface BookingForm {
  dateRange: DateRange | undefined;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests: string;
  paymentMethod: "mpesa" | "stripe";
}

const PAYMENT_METHODS = [
  {
    id: "mpesa" as const,
    name: "M-Pesa",
    icon: Smartphone,
    description: "Pay with M-Pesa mobile money",
  },
  {
    id: "stripe" as const,
    name: "Credit Card",
    icon: CreditCard,
    description: "Pay with Visa, Mastercard, or other cards",
  },
] as const;

export interface BookingFlowProps {
  hotelName: string;
  city: string;
  country: string;
  image: string;
  availableRooms: Listing[];
  onCancel?: () => void;
  onComplete?: () => void;
  initialRoomId?: string;
  initialStep?: BookingStep;
}

export function BookingFlow({
  hotelName,
  city,
  country,
  image,
  availableRooms,
  onCancel,
  onComplete,
  initialRoomId,
  initialStep = "details",
}: BookingFlowProps) {
  const isMobile = useIsMobile();
  const [step, setStep] = React.useState<BookingStep>(initialStep);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [selectedRoomId, setSelectedRoomId] = React.useState<string>(
    initialRoomId ?? ""
  );

  const { guests, addChild, removeChild, updateChildAge, setGuests, createBooking } =
    useHotelsStore();

  const [form, setForm] = React.useState<BookingForm>({
    dateRange: undefined,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
    paymentMethod: "mpesa",
  });

  const selectedRoom =
    availableRooms.find((room) => room.id === selectedRoomId) ??
    availableRooms[0];

  const calculateNights = () => {
    if (!form.dateRange?.from || !form.dateRange?.to) return 0;
    const checkIn = form.dateRange.from;
    const checkOut = form.dateRange.to;
    return Math.max(
      0,
      Math.ceil(
        (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
      )
    );
  };

  const calculateTotal = () => {
    const nights = calculateNights();
    return nights * selectedRoom.pricePerNight;
  };

  const resetFlow = () => {
    setForm({
      dateRange: undefined,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      specialRequests: "",
      paymentMethod: "mpesa",
    });
    setSelectedRoomId(initialRoomId ?? "");
    setStep(initialStep);
  };

  const handleCancel = () => {
    resetFlow();
    onCancel?.();
  };

  const handleSubmit = async () => {
    if (!form.dateRange?.from || !form.dateRange?.to || !guests) return;

    setIsProcessing(true);

    // Create the booking using MVP system
    const result = createBooking({
      listingId: selectedRoomId,
      checkIn: normalizeCheckIn(form.dateRange.from),
      checkOut: normalizeCheckOut(form.dateRange.to),
      guests,
      contactInfo: {
        name: `${form.firstName} ${form.lastName}`,
        email: form.email,
        phone: form.phone,
      },
    });

    setIsProcessing(false);

    if (result.success && result.booking) {
      setStep("confirmation");
      onComplete?.();
    } else {
      // Handle booking failure - in MVP, we show error but don't allow retry
      alert(`Booking failed: ${result.error}`);
      // Reset to details step for user to try again
      setStep("details");
    }
  };

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex-1 overflow-y-auto min-h-0">
        {step === "details" && (
          <div
            className={cn(
              "space-y-6",
              isMobile ? "p-4 space-y-4" : "p-6"
            )}
          >
            <div
              className={cn(
                "flex gap-4 bg-muted/50 rounded-lg",
                isMobile ? "p-4 gap-3" : "p-6"
              )}
            >
              <img
                src={image}
                alt={hotelName}
                className={cn(
                  "rounded-lg object-cover flex-shrink-0",
                  isMobile ? "w-16 h-16" : "w-20 h-20"
                )}
              />
              <div className="flex-1 min-w-0">
                <h3
                  className={cn(
                    "font-semibold truncate",
                    isMobile ? "text-base" : "text-lg"
                  )}
                >
                  {hotelName}
                </h3>
                <p
                  className={cn(
                    "text-muted-foreground",
                    isMobile ? "text-xs mt-0.5" : "text-sm mt-1"
                  )}
                >
                  {city}, {country}
                </p>
              </div>
            </div>

            <div className={cn("space-y-4", isMobile ? "space-y-3" : "")}>
              <h4
                className={cn("font-medium", isMobile ? "text-sm" : "text-base")}
              >
                Select Room Type
              </h4>
              <Carousel className="w-full">
                <CarouselContent>
                  {availableRooms.map((room) => (
                    <CarouselItem
                      key={room.id}
                      className={cn(
                        isMobile ? "basis-full" : "md:basis-1/2 lg:basis-1/3"
                      )}
                    >
                      <div
                        onClick={() => setSelectedRoomId(room.id)}
                        className={cn(
                          "border rounded-lg cursor-pointer transition-colors",
                          isMobile ? "p-3" : "p-4",
                          selectedRoomId === room.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:bg-muted/50"
                        )}
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Badge variant="secondary">
                              {roomTypeLabels[room.roomType]}
                            </Badge>
                            {selectedRoomId === room.id && (
                              <Check className="w-4 h-4 text-primary" />
                            )}
                          </div>
                          <div className="space-y-1">
                            <p className="font-medium">
                              {room.guests} guest{room.guests > 1 ? "s" : ""},{" "}
                              {room.beds} bed{room.beds > 1 ? "s" : ""}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {room.description}
                            </p>
                            <p className="font-semibold text-lg">
                              KES {room.pricePerNight.toLocaleString()}/night
                            </p>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Select Dates
              </h4>
              <div className="space-y-2">
                <Label>Date Range</Label>
                <DateRangePicker
                  value={form.dateRange}
                  onChange={(range) =>
                    setForm((prev) => ({ ...prev, dateRange: range }))
                  }
                  placeholder="Select check-in and check-out dates"
                />
                {calculateNights() > 0 && (
                  <p className="text-sm text-muted-foreground text-center">
                    {calculateNights()} night{calculateNights() > 1 ? "s" : ""}{" "}
                    selected
                  </p>
                )}
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h4 className="font-medium flex items-center gap-2">
                <User className="w-4 h-4" />
                Guest Information
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="adults">Adults</Label>
                  <Input
                    id="adults"
                    type="number"
                    min="1"
                    max="10"
                    value={guests?.adults || ""}
                    onChange={(e) =>
                      setGuests({
                        adults: parseInt(e.target.value) || 0,
                        children: guests?.children || [],
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="children">Children</Label>
                  <Input
                    id="children"
                    type="number"
                    min="0"
                    max="10"
                    value={guests?.children.length || 0}
                    onChange={(e) => {
                      const newCount = parseInt(e.target.value) || 0;
                      const currentChildren = guests?.children || [];
                      if (newCount > currentChildren.length) {
                        for (
                          let i = currentChildren.length;
                          i < newCount;
                          i++
                        ) {
                          addChild(5);
                        }
                      } else if (newCount < currentChildren.length) {
                        for (
                          let i = currentChildren.length - 1;
                          i >= newCount;
                          i--
                        ) {
                          removeChild(i);
                        }
                      }
                    }}
                  />
                </div>
              </div>

              {guests && guests.children.length > 0 && (
                <div className="space-y-2">
                  <Label>Children Ages</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {guests.children.map((child, index) => (
                      <div key={index} className="space-y-1">
                        <Label htmlFor={`child-${index}`} className="text-xs">
                          Child {index + 1}
                        </Label>
                        <Input
                          id={`child-${index}`}
                          type="number"
                          min="0"
                          max="17"
                          value={child.age}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) =>
                            updateChildAge(index, parseInt(e.target.value) || 0)
                          }
                          placeholder="Age"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Separator />

            <div className="space-y-4">
              <h4 className="font-medium flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Contact Information
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstname">First Name</Label>
                  <Input
                    id="firstname"
                    value={form.firstName}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, firstName: e.target.value }))
                    }
                    placeholder="John"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastname">Last Name</Label>
                  <Input
                    id="lastname"
                    value={form.lastName}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, lastName: e.target.value }))
                    }
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, email: e.target.value }))
                  }
                  placeholder="john@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  placeholder="+254 XXX XXX XXX"
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="requests">Special Requests (Optional)</Label>
              <Textarea
                id="requests"
                value={form.specialRequests}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    specialRequests: e.target.value,
                  }))
                }
                placeholder="Any special requests or notes..."
                rows={3}
              />
            </div>
          </div>
        )}

        {step === "payment" && (
          <div
            className={cn(
              "space-y-6",
              isMobile ? "p-4 space-y-4" : "p-6"
            )}
          >
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Booking Summary</h3>
              <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="truncate pr-2">{selectedRoom.title}</span>
                  <span className="whitespace-nowrap">
                    KES {selectedRoom.pricePerNight.toLocaleString()}/night
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>
                    {calculateNights()} night{calculateNights() > 1 ? "s" : ""}
                  </span>
                  <span>KES {calculateTotal().toLocaleString()}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>KES {calculateTotal().toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Payment Method</h4>
              <div className="space-y-3">
                {PAYMENT_METHODS.map((method) => {
                  const Icon = method.icon;
                  return (
                    <div
                      key={method.id}
                      onClick={() =>
                        setForm((prev) => ({
                          ...prev,
                          paymentMethod: method.id,
                        }))
                      }
                      className={cn(
                        "border rounded-lg p-4 cursor-pointer transition-colors",
                        form.paymentMethod === method.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:bg-muted/50"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5" />
                        <div className="flex-1">
                          <div className="font-medium">{method.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {method.description}
                          </div>
                        </div>
                        {form.paymentMethod === method.id && (
                          <Check className="w-5 h-5 text-primary" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {form.paymentMethod === "mpesa" && (
              <div className="space-y-2">
                <Label htmlFor="mpesa-number">M-Pesa Phone Number</Label>
                <Input
                  id="mpesa-number"
                  placeholder="+254 XXX XXX XXX"
                  value={form.phone}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, phone: e.target.value }))
                  }
                />
                <p className="text-xs text-muted-foreground">
                  You&apos;ll receive an STK push to complete the payment
                </p>
              </div>
            )}
          </div>
        )}

        {step === "confirmation" && (
          <div className="flex flex-col items-center justify-center text-center p-6 space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold">Booking Confirmed!</h3>
            <p className="text-muted-foreground">
              Your reservation at {selectedRoom.title} has been confirmed.
            </p>
            <div className="bg-muted/50 p-4 rounded-lg w-full max-w-sm">
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>Check-in:</span>
                  <span>{form.dateRange?.from?.toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Check-out:</span>
                  <span>{form.dateRange?.to?.toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Guests:</span>
                  <span>
                    {guests?.adults
                      ? `${guests.adults} adult${guests.adults > 1 ? "s" : ""}`
                      : ""}
                    {guests && guests.children.length > 0
                      ? `${guests?.adults ? ", " : ""}${guests.children.length} child${
                          guests.children.length > 1 ? "ren" : ""
                        }`
                      : ""}
                  </span>
                </div>
                <div className="flex justify-between font-medium pt-2 border-t">
                  <span>Total Paid:</span>
                  <span>KES {calculateTotal().toLocaleString()}</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              A confirmation email has been sent to {form.email}
            </p>
          </div>
        )}
      </div>

      <div className={cn(
        "border-t bg-background shrink-0",
        isMobile ? "p-4" : "p-6"
      )}>
        {step === "details" && (
          <div className={cn("flex gap-3", isMobile ? "flex-col" : "")}>
            <Button variant="outline" onClick={handleCancel} className="flex-1">
              Cancel
            </Button>
            <Button
              onClick={() => {
                // Check availability before proceeding to payment
                const isAvailable = useHotelsStore.getState().checkAvailability(
                  selectedRoomId,
                  normalizeCheckIn(form.dateRange!.from!),
                  normalizeCheckOut(form.dateRange!.to!)
                );

                if (!isAvailable) {
                  alert("This room is not available for the selected dates. Please choose different dates.");
                  return;
                }

                setStep("payment");
              }}
              disabled={
                !form.dateRange?.from ||
                !form.dateRange?.to ||
                !form.firstName ||
                !form.lastName ||
                !form.email ||
                !selectedRoomId
              }
              className="flex-1"
            >
              Proceed to Payment
            </Button>
          </div>
        )}

        {step === "payment" && (
          <div className={cn("flex gap-3", isMobile ? "flex-col" : "")}>
            <Button
              variant="outline"
              onClick={() => setStep("details")}
              className="flex-1"
            >
              Back
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isProcessing}
              className="flex-1"
            >
              {isProcessing
                ? "Processing..."
                : `Pay KES ${calculateTotal().toLocaleString()}`}
            </Button>
          </div>
        )}

        {step === "confirmation" && (
          <Button onClick={handleCancel} className="w-full">
            Close
          </Button>
        )}
      </div>
    </div>
  );
}
