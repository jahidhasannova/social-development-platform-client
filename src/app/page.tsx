
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
import ImpactStats from "@/components/ImpactStats";

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

      <ImpactStats />

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
  className="mt-8 group inline-flex items-center gap-3 rounded-full border border-[#8fc6a5]/50 bg-gradient-to-r from-[#245b43] to-[#347b58] px-7 py-3.5 text-sm font-bold text-white shadow-[0_5px_18px_rgba(36,91,67,0.35)] transition-all duration-300 hover:-translate-y-1 hover:from-[#194832] hover:to-[#245b43] hover:shadow-[0_8px_25px_rgba(36,91,67,0.45)]"
>
  Find an event
  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-1">
    <ArrowRight size={16} />
  </span>
</Link>

        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f8fafc] px-4 py-20 sm:px-6 lg:py-28">

        {/* Background Decorations */}
        <div className="absolute left-0 top-10 h-72 w-72 rounded-full bg-emerald-200/30 blur-[100px]" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-teal-200/30 blur-[100px]" />

        <div className="relative mx-auto max-w-5xl">

          {/* Main Card */}
          <div className="relative overflow-hidden rounded-[32px] border border-white bg-gradient-to-br from-[#e9f8f5] via-white to-[#eaf8f3] px-6 py-14 shadow-[0_20px_70px_rgba(15,118,110,0.08)] sm:px-12 sm:py-20 lg:px-20">

            {/* Decorative Circle */}
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border-[35px] border-emerald-100/40" />
            <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full border-[35px] border-teal-100/40" />

            <div className="relative z-10 mx-auto max-w-2xl text-center">

              {/* Badge */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                </span>

                <span className="text-xs font-bold uppercase tracking-[2px] text-emerald-700">
                  Stay Connected
                </span>
              </div>

              {/* Heading */}
              <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Subscribe to{" "}
                <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                  Local Cause
                </span>
                <br className="hidden sm:block" /> Alerts
              </h2>

              {/* Description */}
              <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
                Get notified when new winter drives, blanket distributions,
                or emergency cleanups are organized in your neighborhood.
                Stay informed and be part of something meaningful.
              </p>

              {/* Subscribe Form UI */}
              <div className="mx-auto mt-9 flex max-w-xl flex-col gap-3 sm:flex-row">

                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="h-14 min-w-0 flex-1 rounded-2xl border border-slate-200 bg-white/90 px-5 text-sm text-slate-700 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
                />

                <button
                  type="button"
                  className="group flex h-14 items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 px-8 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-600/30 active:scale-95"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform group-hover:translate-x-1"
                  >
                    <path d="m22 2-7 20-4-9-9-4Z" />
                    <path d="M22 2 11 13" />
                  </svg>

                  Subscribe
                </button>
              </div>

              {/* Privacy Text */}
              <div className="mt-7 flex items-center justify-center gap-2 text-xs text-slate-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>

                <span>
                  No spam guaranteed. Unsubscribe at any time.
                </span>
              </div>

            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
