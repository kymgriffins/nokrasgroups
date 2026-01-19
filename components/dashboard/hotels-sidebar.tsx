"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Slider } from "@/components/ui/slider";
import {
  Home,
  Heart,
  Search,
  Settings,
  ChevronsUpDown,
  LogOut,
  Filter,
  Minus,
  Plus,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useHotelsStore } from "@/store/hotels-store";
import { roomTypeLabels, type RoomType } from "@/mock-data/listings";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type GuestInfo = {
  adults: number;
  children: { age: number }[];
};

const navItems = [
  { id: "all", title: "All Hotels", icon: Home, href: "/" },
  { id: "favorites", title: "Favorites", icon: Heart, href: "/favorites" },
];

const roomTypes: RoomType[] = [
  "standard",
  "deluxe",
  "suite",
  "executive",
  "presidential",
];

export function HotelsSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const {
    listings,
    searchQuery,
    setSearchQuery,
    selectedRoomTypes,
    toggleRoomType,
    priceRange,
    setPriceRange,
    beds,
    setBeds,
    guests,
    setGuests,
    getFilteredListings,
    getFavoriteListings,
    resetFilters,
  } = useHotelsStore();

  const favoriteCount = listings.filter((l) => l.isFavorite).length;
  const allCount = listings.length;
  const filteredCount = getFilteredListings().length;

  const activeFiltersCount =
    selectedRoomTypes.length +
    (priceRange[0] !== 0 || priceRange[1] !== 100000 ? 1 : 0) +
    (beds !== null ? 1 : 0) +
    (guests !== null ? 1 : 0);

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="px-2.5 py-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2.5 w-full hover:bg-sidebar-accent rounded-md p-1 -m-1 transition-colors shrink-0">
              <div className="flex size-7 items-center justify-center shrink-0">
                <Image
                  src="/logo.png"
                  alt="Nokras Hotels Logo"
                  width={28}
                  height={28}
                  className="rounded"
                />
              </div>
              <div className="flex items-center gap-1 group-data-[collapsible=icon]:hidden">
                <span className="text-sm font-medium">Nokras Hotels</span>
                <ChevronsUpDown className="size-3 text-muted-foreground" />
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuItem>
              <Settings className="size-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:text-destructive">
              <LogOut className="size-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarHeader>

      <SidebarContent className="px-2.5">
        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                let badge: number | undefined;
                if (item.id === "favorites") badge = favoriteCount;
                if (item.id === "all") badge = allCount;

                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className="h-8"
                    >
                      <Link href={item.href}>
                        <item.icon className="size-4" />
                        <span className="text-sm">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                    {badge !== undefined && badge > 0 && (
                      <SidebarMenuBadge>{badge}</SidebarMenuBadge>
                    )}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="p-0 mt-4">
          <SidebarGroupLabel className="px-0 h-6">
            <span className="text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
              Search
            </span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="px-2 pb-2">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search destinations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-8 pl-7 text-sm"
                />
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="p-0 mt-4">
          <SidebarGroupLabel className="px-0 h-6 flex items-center justify-between">
            <span className="text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
              Filters
            </span>
            {activeFiltersCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="h-5 px-1.5 text-[10px]"
                onClick={resetFilters}
              >
                Clear
              </Button>
            )}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="px-2 space-y-4">
              <div>
                <p className="text-xs font-medium mb-2 text-sidebar-foreground">
                  Room type
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {roomTypes.map((type) => (
                    <Button
                      key={type}
                      variant={
                        selectedRoomTypes.includes(type)
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      onClick={() => toggleRoomType(type)}
                      className={cn(
                        "h-7 text-xs px-2",
                        selectedRoomTypes.includes(type) &&
                          "bg-primary text-primary-foreground"
                      )}
                    >
                      {roomTypeLabels[type]}
                    </Button>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <p className="text-xs font-medium mb-2 text-sidebar-foreground">
                  Price range
                </p>
                <div className="space-y-2">
                  <div className="px-2">
                    <Slider
                      value={[priceRange[0], priceRange[1]]}
                      onValueChange={(value) =>
                        setPriceRange([value[0], value[1]])
                      }
                      min={0}
                      max={100000}
                      step={5000}
                      className="w-full"
                    />
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-muted-foreground">
                        KES {priceRange[0].toLocaleString()}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        KES {priceRange[1].toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <p className="text-xs font-medium mb-2 text-sidebar-foreground">
                  Capacity
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-sidebar-foreground">
                      Beds
                    </span>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() =>
                          setBeds(
                            beds !== null && beds > 0
                              ? beds - 1
                              : null
                          )
                        }
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-6 text-center text-xs">
                        {beds ?? "Any"}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => setBeds((beds ?? 0) + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-sidebar-foreground">
                        Adults
                      </span>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => {
                            const currentAdults = guests?.adults ?? 0;
                            if (currentAdults > 0) {
                              setGuests(
                                currentAdults === 1 && (!guests?.children || guests.children.length === 0)
                                  ? null
                                  : {
                                      adults: currentAdults - 1,
                                      children: guests?.children ?? [],
                                    }
                              );
                            }
                          }}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-6 text-center text-xs">
                          {guests?.adults ?? 0}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => {
                            const currentAdults = guests?.adults ?? 0;
                            setGuests({
                              adults: currentAdults + 1,
                              children: guests?.children ?? [],
                            });
                          }}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-sidebar-foreground">
                          Children
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => {
                            const age = 5; // Default age for new children
                            const currentGuests = guests || { adults: 2, children: [] };
                            setGuests({
                              ...currentGuests,
                              children: [...currentGuests.children, { age }],
                            });
                          }}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      {guests?.children && guests.children.length > 0 && (
                        <div className="space-y-1 ml-2">
                          {guests.children.map((child, index) => (
                            <div key={index} className="flex items-center justify-between text-xs">
                              <span className="text-muted-foreground">
                                Child {index + 1}: {child.age} years
                              </span>
                              <div className="flex items-center gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-5 w-5"
                                  onClick={() => {
                                    const newAge = Math.max(0, child.age - 1);
                                    const currentGuests = guests;
                                    const newChildren = [...currentGuests.children];
                                    newChildren[index] = { age: newAge };
                                    setGuests({
                                      ...currentGuests,
                                      children: newChildren,
                                    });
                                  }}
                                >
                                  <Minus className="h-2 w-2" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-5 w-5"
                                  onClick={() => {
                                    const newAge = child.age + 1;
                                    const currentGuests = guests;
                                    const newChildren = [...currentGuests.children];
                                    newChildren[index] = { age: newAge };
                                    setGuests({
                                      ...currentGuests,
                                      children: newChildren,
                                    });
                                  }}
                                >
                                  <Plus className="h-2 w-2" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-5 w-5 text-destructive"
                                  onClick={() => {
                                    const currentGuests = guests;
                                    const newChildren = currentGuests.children.filter((_, i) => i !== index);
                                    setGuests(
                                      newChildren.length === 0 && currentGuests.adults === 0
                                        ? null
                                        : {
                                            ...currentGuests,
                                            children: newChildren,
                                          }
                                    );
                                  }}
                                >
                                  <X className="h-2 w-2" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
