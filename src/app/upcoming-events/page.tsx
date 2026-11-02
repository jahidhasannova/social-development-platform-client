
import Link from "next/link";
import { CalendarDays, MapPin, ArrowRight, HeartHandshake } from "lucide-react";

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

async function getUpcomingEvents(): Promise<Event[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/events`,
      { cache: "no-store" }
    );

    if (!response.ok) return [];

    const result = await response.json();
    return result.data || [];
  } catch {
    return [];
  }
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export default async function UpcomingEventsPage() {
  const events = await getUpcomingEvents();

  return (
    <main className="min-h-screen bg-[#f8f8f3] px-5 py-16 text-[#172b22] dark:bg-[#101c16] dark:text-[#edf5ee] sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#e8efe8] px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#245b43] dark:bg-[#1b2b21] dark:text-[#a9d2b3]">
            <HeartHandshake size={15} />
            Make a Difference Together
          </span>

          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
            Upcoming <span className="text-[#6d9878]">Events</span>
          </h1>

          <p className="mt-5 text-base leading-8 text-[#718078] dark:text-[#a0b2a5]">
            Discover meaningful community initiatives and find opportunities
            to create a positive impact together.
          </p>
        </div>

        {events.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-[#cbd8cc] bg-white px-6 py-20 text-center dark:border-[#344b3d] dark:bg-[#17271d]">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e8efe8] text-[#245b43] dark:bg-[#263c30] dark:text-[#a9d2b3]">
              <CalendarDays size={30} />
            </div>
            <h2 className="mt-6 text-xl font-bold">
              No upcoming events yet
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#718078] dark:text-[#a0b2a5]">
              New community initiatives will appear here. Check back soon and
              be ready to make a difference.
            </p>
          </div>
        ) : (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
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

        <div className="mt-16 rounded-3xl bg-[#e8efe8] px-6 py-10 text-center dark:bg-[#1b2b21] sm:px-12">
          <h2 className="text-2xl font-bold">
            Every small action matters.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#66736b] dark:text-[#a0b2a5]">
            Join a community of people who believe in kindness, compassion,
            and creating a better tomorrow.
          </p>
        </div>
      </div>
    </main>
  );
}
