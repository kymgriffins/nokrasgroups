                  "use client";

import * as React from "react";
import { Check, Circle, Filter, Search, X, ChevronDown, ChevronRight, TrendingUp, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "usehooks-ts";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  category: string;
}

export interface TaskCategory {
  name: string;
  tasks: Task[];
}

interface TaskListProps {
  tasks?: TaskCategory[];
  onTaskToggle?: (taskId: string) => void;
}

const defaultTasks: TaskCategory[] = [
  {
    name: "Project Setup",
    tasks: [
      { id: "1", title: "Define project vision: Transform rental explorer into unified hotel management system", completed: true, category: "Project Setup" },
      { id: "2", title: "Identify four hotels: Nokras Muranga, SilverOak, Enkare, Sagana", completed: true, category: "Project Setup" },
      { id: "3", title: "Establish staff-operated concierge model (no self-booking)", completed: true, category: "Project Setup" },
      { id: "4", title: "Create conceptual domain model (Hotel → Room/Suite)", completed: true, category: "Project Setup" },
    ],
  },
  {
    name: "Domain Model Transformation",
    tasks: [
      { id: "5", title: "Create new data models for hotels and rooms", completed: true, category: "Domain Model Transformation" },
      { id: "6", title: "Replace PropertyType enum with hotel-specific room types", completed: true, category: "Domain Model Transformation" },
      { id: "7", title: "Update mock data to represent hotel rooms instead of generic rentals", completed: true, category: "Domain Model Transformation" },
      { id: "8", title: "Implement hotel-room parent-child relationship", completed: true, category: "Domain Model Transformation" },
      { id: "9", title: "Add hotel-level metadata (location, description, amenities, theme accents)", completed: false, category: "Domain Model Transformation" },
    ],
  },
  {
    name: "Data Structure Updates",
    tasks: [
      { id: "10", title: "Update mock-data/listings.ts to hotel-room structure", completed: false, category: "Data Structure Updates" },
      { id: "11", title: "Create hotel definitions with unique identities", completed: false, category: "Data Structure Updates" },
      { id: "12", title: "Generate realistic room data for each hotel (20-30 rooms per hotel)", completed: false, category: "Data Structure Updates" },
      { id: "13", title: "Update TypeScript interfaces in store/rentals-store.ts", completed: false, category: "Data Structure Updates" },
      { id: "14", title: "Implement hotel clustering logic for map markers", completed: false, category: "Data Structure Updates" },
    ],
  },
  {
    name: "Store and State Management",
    tasks: [
      { id: "15", title: "Implement detailed guest filtering with children and ages", completed: true, category: "Store and State Management" },
      { id: "16", title: "Rename and refactor Zustand store to hotel-centric terminology", completed: false, category: "Store and State Management" },
      { id: "17", title: "Update filtering logic for hotel-room hierarchy", completed: false, category: "Store and State Management" },
      { id: "18", title: "Modify sorting options for hotel context", completed: false, category: "Store and State Management" },
      { id: "19", title: "Implement hotel selection and room browsing states", completed: false, category: "Store and State Management" },
      { id: "20", title: "Update favorites system for rooms within hotels", completed: false, category: "Store and State Management" },
    ],
  },
  {
    name: "Map Experience Redesign",
    tasks: [
      { id: "21", title: "Set initial map view to Kenya", completed: true, category: "Map Experience Redesign" },
      { id: "22", title: "Change markers to represent hotels instead of individual rooms", completed: false, category: "Map Experience Redesign" },
      { id: "23", title: "Implement hotel overview popups with \"From KES X/night\"", completed: false, category: "Map Experience Redesign" },
      { id: "24", title: "Add hotel clustering visualization", completed: false, category: "Map Experience Redesign" },
      { id: "25", title: "Update map controls and interactions", completed: false, category: "Map Experience Redesign" },
      { id: "26", title: "Implement drill-down to room selection within hotel view", completed: false, category: "Map Experience Redesign" },
    ],
  },
  {
    name: "Responsive Design Adaptation",
    tasks: [
      { id: "27", title: "Ensure mobile experience works with hotel-first navigation", completed: false, category: "Responsive Design Adaptation" },
      { id: "28", title: "Test map interactions on different screen sizes", completed: false, category: "Responsive Design Adaptation" },
      { id: "29", title: "Verify hotel selection and room browsing on mobile", completed: false, category: "Responsive Design Adaptation" },
      { id: "30", title: "Optimize hotel overview cards for small screens", completed: false, category: "Responsive Design Adaptation" },
    ],
  },
  {
    name: "New Booking System Implementation",
    tasks: [
      { id: "31", title: "Remove sidebar (not needed for hotel booking app)", completed: true, category: "New Booking System Implementation" },
      { id: "32", title: "Create comprehensive booking modal with multi-step flow", completed: true, category: "New Booking System Implementation" },
      { id: "33", title: "Implement booking form with dates, guests, contact info", completed: true, category: "New Booking System Implementation" },
      { id: "34", title: "Add payment integration (M-Pesa & Stripe simulation)", completed: true, category: "New Booking System Implementation" },
      { id: "35", title: "Create booking confirmation with receipt display", completed: true, category: "New Booking System Implementation" },
      { id: "36", title: "Integrate booking modal into listings panel", completed: true, category: "New Booking System Implementation" },
      { id: "37", title: "Add responsive mobile booking experience (sheet vs dialog)", completed: true, category: "New Booking System Implementation" },
      { id: "38", title: "Implement form validation and error handling", completed: true, category: "New Booking System Implementation" },
      { id: "39", title: "Add loading states for payment processing", completed: true, category: "New Booking System Implementation" },
      { id: "40", title: "Create production-ready booking UI/UX", completed: true, category: "New Booking System Implementation" },
    ],
  },
];

export function TaskList({ tasks = defaultTasks, onTaskToggle }: TaskListProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filterStatus, setFilterStatus] = React.useState<"all" | "completed" | "pending">("all");
  const [expandedCategories, setExpandedCategories] = React.useState<Set<string>>(new Set());
  const [localTasks, setLocalTasks] = React.useState<TaskCategory[]>(tasks);

  const isMobile = useMediaQuery("(max-width: 767px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");

  React.useEffect(() => {
    setLocalTasks(tasks);
  }, [tasks]);

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(categoryName)) {
        next.delete(categoryName);
      } else {
        next.add(categoryName);
      }
      return next;
    });
  };

  const handleTaskToggle = (taskId: string) => {
    setLocalTasks((prev) =>
      prev.map((category) => ({
        ...category,
        tasks: category.tasks.map((task) =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        ),
      }))
    );
    onTaskToggle?.(taskId);
  };

  const filteredCategories = React.useMemo(() => {
    return localTasks
      .map((category) => ({
        ...category,
        tasks: category.tasks.filter((task) => {
          const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
          const matchesFilter =
            filterStatus === "all" ||
            (filterStatus === "completed" && task.completed) ||
            (filterStatus === "pending" && !task.completed);
          return matchesSearch && matchesFilter;
        }),
      }))
      .filter((category) => category.tasks.length > 0);
  }, [localTasks, searchQuery, filterStatus]);

  const stats = React.useMemo(() => {
    const allTasks = localTasks.flatMap((cat) => cat.tasks);
    const completed = allTasks.filter((t) => t.completed).length;
    const total = allTasks.length;
    return { completed, total, percentage: total > 0 ? Math.round((completed / total) * 100) : 0 };
  }, [localTasks]);

  // Expand all categories by default on desktop, first one on mobile
  React.useEffect(() => {
    if (isMobile) {
      setExpandedCategories(new Set([filteredCategories[0]?.name].filter(Boolean)));
    } else {
      setExpandedCategories(new Set(localTasks.map((cat) => cat.name)));
    }
  }, [isMobile]);

  return (
    <div className="flex flex-col h-full w-full">
      {/* Header */}
      <div className={cn(
        "border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        "sticky top-0 z-10",
        isMobile ? "p-4" : "p-6"
      )}>
        <div className={cn(
          "flex flex-col gap-4",
          isMobile ? "gap-3" : ""
        )}>
          <div className="flex items-center justify-between gap-2">
            <h1 className={cn(
              "font-bold",
              isMobile ? "text-xl" : "text-2xl"
            )}>
              Project Task List
            </h1>
            <Badge variant="secondary" className={cn(
              "font-semibold",
              isMobile ? "text-xs px-2 py-1" : "text-sm"
            )}>
              {stats.completed}/{stats.total}
            </Badge>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Overall Progress</span>
              <span className="font-semibold">{stats.percentage}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${stats.percentage}%` }}
              />
            </div>
          </div>

          {/* Search and Filters */}
          <div className={cn(
            "flex flex-col gap-2",
            isMobile ? "gap-2" : "sm:flex-row sm:gap-3"
          )}>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={cn(
                  "pl-9",
                  isMobile ? "h-9" : "h-10"
                )}
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 size-7"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="size-3.5" />
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              {(["all", "pending", "completed"] as const).map((status) => (
                <Button
                  key={status}
                  variant={filterStatus === status ? "default" : "outline"}
                  size={isMobile ? "sm" : "default"}
                  onClick={() => setFilterStatus(status)}
                  className={cn(
                    "capitalize",
                    isMobile ? "text-xs px-3" : ""
                  )}
                >
                  {status === "all" && <Filter className={cn("mr-1.5", isMobile ? "size-3" : "size-4")} />}
                  {status}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className={cn(
        "flex-1 overflow-y-auto",
        isMobile ? "p-4" : "p-6"
      )}>
        {filteredCategories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Circle className="size-12 text-muted-foreground mb-4" />
            <p className="text-sm font-medium">No tasks found</p>
            <p className="text-xs text-muted-foreground mt-1">
              Try adjusting your search or filter
            </p>
          </div>
        ) : (
          <div className={cn(
            "space-y-3",
            isMobile ? "space-y-2" : ""
          )}>
            {filteredCategories.map((category) => {
              const categoryStats = {
                completed: category.tasks.filter((t) => t.completed).length,
                total: category.tasks.length,
              };
              const isExpanded = expandedCategories.has(category.name);

              return (
                <Collapsible
                  key={category.name}
                  open={isExpanded}
                  onOpenChange={() => toggleCategory(category.name)}
                >
                  <div className="border rounded-lg bg-card">
                    <CollapsibleTrigger className="w-full">
                      <div className={cn(
                        "flex items-center justify-between p-4 hover:bg-muted/50 transition-colors",
                        isMobile ? "p-3" : ""
                      )}>
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          {isExpanded ? (
                            <ChevronDown className={cn(
                              "shrink-0 text-muted-foreground",
                              isMobile ? "size-4" : "size-5"
                            )} />
                          ) : (
                            <ChevronRight className={cn(
                              "shrink-0 text-muted-foreground",
                              isMobile ? "size-4" : "size-5"
                            )} />
                          )}
                          <div className="flex-1 min-w-0">
                            <h3 className={cn(
                              "font-semibold truncate",
                              isMobile ? "text-sm" : "text-base"
                            )}>
                              {category.name}
                            </h3>
                            <p className={cn(
                              "text-muted-foreground",
                              isMobile ? "text-xs mt-0.5" : "text-sm mt-1"
                            )}>
                              {categoryStats.completed} of {categoryStats.total} completed
                            </p>
                          </div>
                        </div>
                        <div className="h-2 w-16 sm:w-24 bg-muted rounded-full overflow-hidden shrink-0">
                          <div
                            className="h-full bg-primary transition-all"
                            style={{
                              width: `${categoryStats.total > 0 ? (categoryStats.completed / categoryStats.total) * 100 : 0}%`,
                            }}
                          />
                        </div>
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className={cn(
                        "border-t divide-y",
                        isMobile ? "px-3 py-2" : "px-4 py-3"
                      )}>
                        {category.tasks.map((task) => (
                          <div
                            key={task.id}
                            className={cn(
                              "flex items-start gap-3 py-3 group cursor-pointer hover:bg-muted/30 transition-colors",
                              isMobile ? "py-2.5" : ""
                            )}
                            onClick={() => handleTaskToggle(task.id)}
                          >
                            <button
                              className={cn(
                                "shrink-0 mt-0.5 transition-colors",
                                task.completed
                                  ? "text-primary"
                                  : "text-muted-foreground hover:text-foreground"
                              )}
                            >
                              {task.completed ? (
                                <CheckCircle2 className={cn(
                                  "fill-primary text-primary",
                                  isMobile ? "size-5" : "size-6"
                                )} />
                              ) : (
                                <Circle className={cn(
                                  isMobile ? "size-5" : "size-6"
                                )} />
                              )}
                            </button>
                            <div className="flex-1 min-w-0">
                              <p
                                className={cn(
                                  task.completed
                                    ? "line-through text-muted-foreground"
                                    : "text-foreground",
                                  isMobile ? "text-sm" : "text-base"
                                )}
                              >
                                {task.title}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

