"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  MapPin,
  ArrowRight,
  SearchX,
  Search,
} from "lucide-react";

interface Event {
  _id: string;
  title: string;
  description: string;
  eventType: string;
  thumbnailUrl: string;
  location: string;
  eventDate: string;
  creatorEmail: string;
}

function normalizeCategory(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export default function EventFilters({ events }: { events: Event[] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(events.map((event) => event.eventType).filter(Boolean)),
    ];

    return ["All", ...uniqueCategories];
  }, [events]);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesCategory =
        activeCategory === "All" ||
        normalizeCategory(event.eventType) ===
          normalizeCategory(activeCategory);

      const query = searchQuery.toLowerCase().trim();

      const matchesSearch =
        event.title.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query) ||
        event.eventType.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [events, activeCategory, searchQuery]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);

    if (category === "All") {
      setSearchQuery("");
    }
  };

  const handleReset = () => {
    setActiveCategory("All");
    setSearchQuery("");
  };

  return (
    <>
      <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
          {categories.map((category) => {
            const isActive = activeCategory === category;

            return (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                  isActive
                    ? "bg-[#245b43] text-white shadow-md shadow-[#245b43]/20"
                    : "border border-[#dce5dc] bg-white text-[#52645a] hover:border-[#8eae96] hover:bg-[#e8efe8] dark:border-[#344b3d] dark:bg-[#17271d] dark:text-[#b7c8bb] dark:hover:bg-[#263c30]"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="relative w-full lg:max-w-sm">
          <Search
            size={19}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#718078]"
          />

          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search events..."
            className="w-full rounded-full border border-[#dce5dc] bg-white py-3 pl-11 pr-5 text-sm text-[#172b22] outline-none transition placeholder:text-[#9aa89e] focus:border-[#6d9878] focus:ring-2 focus:ring-[#6d9878]/15 dark:border-[#344b3d] dark:bg-[#17271d] dark:text-white"
          />
        </div>
      </div>

      <p className="mb-6 text-sm text-[#718078] dark:text-[#a0b2a5]">
        Showing{" "}
        <span className="font-bold text-[#245b43] dark:text-[#a9d2b3]">
          {filteredEvents.length}
        </span>{" "}
        {filteredEvents.length === 1 ? "event" : "events"}
      </p>

      {filteredEvents.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-[#cbd8cc] bg-white px-6 py-20 text-center dark:border-[#344b3d] dark:bg-[#17271d]">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e8efe8] text-[#245b43] dark:bg-[#263c30] dark:text-[#a9d2b3]">
            <SearchX size={30} />
          </div>

          <h2 className="mt-6 text-xl font-bold">
            No events found
          </h2>

          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#718078] dark:text-[#a0b2a5]">
            No events match your search or selected category.
            Try another search or category.
          </p>

          <button
            onClick={handleReset}
            className="mt-6 rounded-xl bg-[#245b43] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#194832]"
          >
            View All Events
          </button>
        </div>
      ) : (
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => (
            <article
              key={event._id}
              className="group overflow-hidden rounded-3xl border border-[#e5e9e2] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#172b22]/10 dark:border-[#344b3d] dark:bg-[#17271d]"
            >
              <div className="relative h-56 overflow-hidden bg-[#e8efe8] dark:bg-[#263c30]">
                <img
                  src={event.thumbnailUrl}
                  alt={event.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#245b43] shadow-sm">
                  {event.eventType}
                </span>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 text-xs font-medium text-[#6d9878]">
                  <CalendarDays size={15} />
                  {formatDate(event.eventDate)}
                </div>

                <h2 className="mt-3 line-clamp-2 text-xl font-bold leading-8">
                  {event.title}
                </h2>

                <p className="mt-3 line-clamp-3 min-h-[72px] text-sm leading-6 text-[#718078] dark:text-[#a0b2a5]">
                  {event.description}
                </p>

                <div className="mt-5 flex items-center gap-2 border-t border-[#edf0eb] pt-4 text-sm text-[#718078] dark:border-[#344b3d] dark:text-[#a0b2a5]">
                  <MapPin size={16} className="shrink-0 text-[#6d9878]" />
                  <span className="truncate">{event.location}</span>
                </div>

                <Link
                  href={`/upcoming-events/${event._id}`}
                  className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-[#245b43] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#194832]"
                >
                  View Details
                  <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}