
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  HeartHandshake,
  UserRound,
} from "lucide-react";
import JoinEventButton from "@/components/JoinEventButton";

export const instant = false;

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

async function getEvent(id: string): Promise<Event | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/events/${id}`,
      { cache: "no-store" }
    );

    if (!response.ok) return null;

    const result = await response.json();
    return result.data || null;
  } catch {
    return null;
  }
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await getEvent(id);

  if (!event) notFound();

  return (
    <main className="min-h-screen bg-[#f8f8f3] px-5 py-12 text-[#172b22] dark:bg-[#101c16] dark:text-[#edf5ee] sm:px-8">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/upcoming-events"
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-[#245b43] transition hover:bg-[#e8efe8] dark:text-[#a9d2b3] dark:hover:bg-[#1b2b21]"
        >
          <ArrowLeft size={17} />
          Back to Upcoming Events
        </Link>

        <article className="mt-8 overflow-hidden rounded-3xl border border-[#e5e9e2] bg-white shadow-sm dark:border-[#344b3d] dark:bg-[#17271d]">
          <div className="relative h-64 bg-[#e8efe8] dark:bg-[#263c30] sm:h-[420px]">
            <img
              src={event.thumbnailUrl}
              alt={event.title}
              className="h-full w-full object-cover"
            />

            <span className="absolute bottom-5 left-5 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-[#245b43] shadow-sm">
              {event.eventType}
            </span>
          </div>

          <div className="p-6 sm:p-10">
            <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              {event.title}
            </h1>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-2xl bg-[#f1f5ef] p-4 dark:bg-[#1b2b21]">
                <CalendarDays className="shrink-0 text-[#6d9878]" size={22} />
                <div>
                  <p className="text-xs text-[#718078] dark:text-[#a0b2a5]">
                    Event Date
                  </p>
                  <p className="mt-1 text-sm font-semibold">
                    {formatDate(event.eventDate)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl bg-[#f1f5ef] p-4 dark:bg-[#1b2b21]">
                <MapPin className="shrink-0 text-[#6d9878]" size={22} />
                <div className="min-w-0">
                  <p className="text-xs text-[#718078] dark:text-[#a0b2a5]">
                    Location
                  </p>
                  <p className="mt-1 truncate text-sm font-semibold">
                    {event.location}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl bg-[#f1f5ef] p-4 dark:bg-[#1b2b21] sm:col-span-2">
                <UserRound className="shrink-0 text-[#6d9878]" size={22} />
                <div className="min-w-0">
                  <p className="text-xs text-[#718078] dark:text-[#a0b2a5]">
                    Organized By
                  </p>
                  <p className="mt-1 truncate text-sm font-semibold">
                    {event.creatorEmail}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-9">
              <h2 className="text-xl font-bold">About This Event</h2>
              <p className="mt-4 whitespace-pre-line text-sm leading-8 text-[#66736b] dark:text-[#b7c8bb]">
                {event.description}
              </p>
            </div>

            <div className="mt-9 rounded-2xl bg-[#e8efe8] p-6 dark:bg-[#1b2b21]">
              <div className="flex items-center gap-3">
                <HeartHandshake
                  size={25}
                  className="text-[#245b43] dark:text-[#a9d2b3]"
                />
                <h2 className="text-lg font-bold">
                  Be Part of Something Good
                </h2>
              </div>

              <p className="mt-3 text-sm leading-7 text-[#66736b] dark:text-[#a0b2a5]">
                Join this community initiative and help make a positive
                difference together.
              </p>

              <JoinEventButton eventId={event._id} />
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
