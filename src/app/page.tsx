
export const instant = false;
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  HeartHandshake,
  Users,
  CalendarDays,
  MapPin,
  Sparkles,
  HandHeart,
  Globe2,
  Leaf,
} from "lucide-react";

interface Event {
  _id: string;
  title: string;
  description: string;
  eventType: string;
  thumbnailUrl: string;
  location: string;
  eventDate: string;
}

interface EventsResponse {
  success: boolean;
  data: Event[];
}

async function getRecentEvents(): Promise<Event[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/events/recent`,
      { cache: "no-store" }
    );

    if (!response.ok) return [];

    const result: EventsResponse = await response.json();

    return result.success ? result.data : [];
  } catch {
    return [];
  }
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const features = [
  {
    icon: HandHeart,
    title: "Give with purpose",
    description:
      "Turn your kindness into meaningful action and support people who need it most.",
  },
  {
    icon: Users,
    title: "Find your community",
    description:
      "Connect with people who share your passion for creating positive change.",
  },
  {
    icon: Globe2,
    title: "Make an impact",
    description:
      "Every small contribution brings us closer to a kinder and stronger society.",
  },
];

const gallery = [
  {
    image:
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=800&q=85",
    title: "Stronger together",
  },
  {
    image:
      "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=800&q=85",
    title: "A little help, a big difference",
  },
  {
    image:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=85",
    title: "Kindness in action",
  },
];

export default async function Home() {
  const events = await getRecentEvents();

  return (
    <main className="min-h-screen overflow-hidden bg-[#f8f8f3] text-[#172b22] transition-colors duration-300 dark:bg-[#101c16] dark:text-[#edf5ee]">
      <section className="relative">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-16 sm:px-8 md:grid-cols-2 md:pb-28 md:pt-24 lg:px-10">
          <div className="relative z-10">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#dce8dc] bg-[#edf4ec] px-4 py-2 text-sm font-medium text-[#356447] dark:border-[#344b3d] dark:bg-[#1b2b21] dark:text-[#a9d2b3]">
              <Sparkles size={15} />
              Together, we can make a difference
            </div>

            <h1 className="max-w-xl text-5xl leading-[1.12] font-bold tracking-tight text-[#172b22] sm:text-6xl lg:text-[68px] dark:text-[#edf5ee]">
              Small acts.
              <br />
              <span className="text-[#6d9878] dark:text-[#9ac8a6]">
                Big impact.
              </span>
              <br />
              Better world.
            </h1>

            <p className="mt-7 max-w-lg text-base leading-8 text-[#718078] sm:text-lg dark:text-[#a0b2a5]">
              Discover meaningful community events, meet compassionate
              people, and be part of something bigger. Every act of kindness
              matters.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/upcoming-events"
                className="inline-flex items-center gap-2 rounded-full bg-[#245b43] px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-[#245b43]/15 transition hover:-translate-y-1 hover:bg-[#194832]"
              >
                Explore Events
                <ArrowRight size={17} />
              </Link>

              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-full border border-[#dce4dc] px-7 py-4 text-sm font-semibold text-[#245b43] transition hover:bg-[#edf4ec] dark:border-[#405b49] dark:text-[#a9d2b3] dark:hover:bg-[#1b2b21]"
              >
                Get Involved
                <ArrowUpRight size={17} />
              </Link>
            </div>

            <div className="mt-12 flex items-center gap-4">
              <div className="flex -space-x-3">
                {[
                  "photo-1534528741775-53994a69daeb",
                  "photo-1500648767791-00dcc994a43e",
                  "photo-1531123897727-8f129e1688ce",
                ].map((photo) => (
                  <img
                    key={photo}
                    src={`https://images.unsplash.com/${photo}?auto=format&fit=crop&w=100&h=100&q=80`}
                    alt="Community member"
                    className="h-10 w-10 rounded-full border-[3px] border-[#f8f8f3] object-cover dark:border-[#101c16]"
                  />
                ))}
              </div>
              <p className="text-sm text-[#718078] dark:text-[#a0b2a5]">
                <span className="font-bold text-[#172b22] dark:text-[#edf5ee]">
                  Kindness starts with you.
                </span>
                <br />
                Join the movement.
              </p>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -right-8 -top-8 h-52 w-52 rounded-full bg-[#dce9d9] blur-3xl dark:bg-[#245b43]/40" />
            <div className="absolute -bottom-8 -left-8 h-52 w-52 rounded-full bg-[#e9e4d2] blur-3xl dark:bg-[#344b3d]/50" />

            <div className="relative overflow-hidden rounded-[32px] border-[8px] border-white shadow-2xl shadow-[#172b22]/10 dark:border-[#263c30]">
              <img
                src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=1100&q=90"
                alt="Volunteers working together to support their community"
                className="h-[430px] w-full object-cover sm:h-[530px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#172b22]/70 via-transparent to-transparent" />

              <div className="absolute bottom-7 left-7 right-7 text-white">
                <p className="text-sm font-medium text-white/80">
                  THE POWER OF COMMUNITY
                </p>
                <h2 className="mt-2 max-w-sm text-3xl leading-tight font-bold">
                  Together, we create brighter tomorrows.
                </h2>
              </div>
            </div>

            <div className="absolute -bottom-7 -left-4 flex items-center gap-3 rounded-2xl border border-[#e8eee6] bg-white p-4 shadow-xl sm:-left-10 dark:border-[#344b3d] dark:bg-[#1b2b21]">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e8f1e7] text-[#356447] dark:bg-[#344b3d] dark:text-[#a9d2b3]">
                <HeartHandshake size={25} />
              </div>
              <div>
                <p className="text-sm font-bold text-[#172b22] dark:text-[#edf5ee]">
                  Every act matters
                </p>
                <p className="text-xs text-[#718078] dark:text-[#a0b2a5]">
                  Be someone's reason to smile
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#e8ece5] bg-white py-9 dark:border-[#263c30] dark:bg-[#15231b]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-5 text-center sm:grid-cols-3 sm:px-8 lg:px-10">
          {[
            { title: "One", description: "Community, countless possibilities" },
            { title: "Every", description: "Small act creates a ripple" },
            { title: "Together", description: "We can make a lasting difference" },
          ].map((item) => (
            <div key={item.title}>
              <p className="text-3xl font-bold text-[#245b43] dark:text-[#9ac8a6]">
                {item.title}
              </p>
              <p className="mt-1 text-sm text-[#718078] dark:text-[#a0b2a5]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold tracking-[0.2em] text-[#6d9878] uppercase dark:text-[#9ac8a6]">
            Why Kindora
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#172b22] sm:text-4xl dark:text-[#edf5ee]">
            Kindness is better when shared.
          </h2>
          <p className="mt-4 leading-7 text-[#718078] dark:text-[#a0b2a5]">
            A simple place to bring people together and turn good intentions
            into real-world impact.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-3xl border border-[#e7ece5] bg-white p-8 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#172b22]/5 dark:border-[#344b3d] dark:bg-[#1b2b21] dark:hover:shadow-black/20"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eaf2e9] text-[#356447] dark:bg-[#344b3d] dark:text-[#a9d2b3]">
                  <Icon size={26} />
                </div>
                <p className="mt-7 text-sm font-semibold text-[#9aa89d] dark:text-[#7f9b88]">
                  0{index + 1}
                </p>
                <h3 className="mt-2 text-xl font-bold text-[#172b22] dark:text-[#edf5ee]">
                  {feature.title}
                </h3>
                <p className="mt-3 leading-7 text-[#718078] dark:text-[#a0b2a5]">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-[#eef3eb] py-24 dark:bg-[#15231b]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <span className="text-sm font-bold tracking-[0.2em] text-[#6d9878] uppercase dark:text-[#9ac8a6]">
                Find your purpose
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#172b22] sm:text-4xl dark:text-[#edf5ee]">
                Upcoming events
              </h2>
              <p className="mt-3 max-w-xl leading-7 text-[#718078] dark:text-[#a0b2a5]">
                Discover opportunities to volunteer, connect, and make a
                difference in your community.
              </p>
            </div>

            <Link
              href="/upcoming-events"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#245b43] hover:gap-3 dark:text-[#a9d2b3]"
            >
              View all events
              <ArrowRight size={17} />
            </Link>
          </div>

          {events.length > 0 ? (
            <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <article
                  key={event._id}
                  className="overflow-hidden rounded-3xl border border-[#e5e9e2] bg-white transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#172b22]/5 dark:border-[#344b3d] dark:bg-[#1b2b21] dark:hover:shadow-black/20"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={event.thumbnailUrl}
                      alt={event.title}
                      className="h-full w-full object-cover transition duration-500 hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-white/95 px-4 py-2 text-xs font-semibold text-[#245b43]">
                      {event.eventType}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="line-clamp-1 text-xl font-bold text-[#172b22] dark:text-[#edf5ee]">
                      {event.title}
                    </h3>
                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#718078] dark:text-[#a0b2a5]">
                      {event.description}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-4 text-xs text-[#718078] dark:text-[#a0b2a5]">
                      <span className="flex items-center gap-1.5">
                        <CalendarDays size={15} />
                        {formatDate(event.eventDate)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin size={15} />
                        {event.location}
                      </span>
                    </div>
                    <Link
                      href={`/upcoming-events/${event._id}`}
                      className="mt-6 flex items-center justify-between border-t border-[#edf0eb] pt-5 text-sm font-bold text-[#245b43] dark:border-[#344b3d] dark:text-[#a9d2b3]"
                    >
                      View details
                      <ArrowUpRight size={18} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-12 rounded-3xl border border-dashed border-[#cbd9ca] bg-white/70 px-6 py-16 text-center dark:border-[#405b49] dark:bg-[#1b2b21]">
              <CalendarDays
                size={35}
                className="mx-auto text-[#6d9878] dark:text-[#9ac8a6]"
              />
              <h3 className="mt-5 text-xl font-bold text-[#172b22] dark:text-[#edf5ee]">
                New opportunities are on the way
              </h3>
              <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#718078] dark:text-[#a0b2a5]">
                There are no upcoming events yet. Check back soon or be the
                first to create an opportunity for your community.
              </p>
              <Link
                href="/create-event"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#245b43] px-6 py-3 text-sm font-semibold text-white hover:bg-[#194832]"
              >
                Create an event
                <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold tracking-[0.2em] text-[#6d9878] uppercase dark:text-[#9ac8a6]">
            Moments that matter
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#172b22] sm:text-4xl dark:text-[#edf5ee]">
            A little kindness goes a long way.
          </h2>
          <p className="mt-4 leading-7 text-[#718078] dark:text-[#a0b2a5]">
            Real change begins when people come together with open hearts.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {gallery.map((item) => (
            <div
              key={item.title}
              className="group relative h-72 overflow-hidden rounded-3xl"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#172b22]/70 to-transparent" />
              <h3 className="absolute bottom-6 left-6 text-xl font-bold text-white">
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-[#1e4935] px-7 py-16 text-center text-white sm:px-12 sm:py-20 dark:bg-[#245b43]">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
            <Leaf size={28} />
          </div>
          <h2 className="mx-auto mt-7 max-w-2xl text-3xl leading-tight font-bold sm:text-5xl">
            Your kindness can change someone's world.
          </h2>
          <p className="mx-auto mt-5 max-w-xl leading-7 text-white/70">
            Take the first step today. Find an event, meet your people, and
            make every moment count.
          </p>
          <Link
            href="/upcoming-events"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-bold text-[#245b43] transition hover:bg-[#eaf2e9]"
          >
            Find an event
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      <footer className="border-t border-[#e5e9e2] bg-white dark:border-[#263c30] dark:bg-[#15231b]">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-9 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
          <Link href="/" className="flex items-center gap-2">
            <HeartHandshake size={23} className="text-[#245b43] dark:text-[#9ac8a6]" />
            <span className="text-xl font-bold text-[#172b22] dark:text-[#edf5ee]">
              kindora<span className="text-[#6d9878] dark:text-[#9ac8a6]">.</span>
            </span>
          </Link>
          <p className="text-sm text-[#718078] dark:text-[#a0b2a5]">
            Making kindness a part of everyday life.
          </p>
          <p className="text-xs text-[#9aa89d] dark:text-[#7f9b88]">
            © {new Date().getFullYear()} Kindora. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
