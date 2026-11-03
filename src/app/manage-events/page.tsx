"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  MapPin,
  Pencil,
  Trash2,
  X,
  LoaderCircle,
  ArrowRight,
  Eye,
} from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

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

type EventForm = Omit<Event, "_id" | "creatorEmail">;

const eventTypes = [
  "Food Distribution",
  "Clothes Distribution",
  "Education",
  "Healthcare",
  "Environmental",
  "Community Support",
  "Other",
];

const emptyForm: EventForm = {
  title: "",
  description: "",
  eventType: "",
  thumbnailUrl: "",
  location: "",
  eventDate: "",
};

const toLocalDateTime = (date: string) => {
  const value = new Date(date);
  const localDate = new Date(
    value.getTime() - value.getTimezoneOffset() * 60000,
  );

  return localDate.toISOString().slice(0, 16);
};

const getCurrentLocalDateTime = () => {
  return toLocalDateTime(new Date().toISOString());
};

export default function ManageEventsPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<EventForm>(emptyForm);

  const getToken = async () => {
    const tokenResult = await authClient.token();
    const token = tokenResult.data?.token;

    if (tokenResult.error || !token) {
      throw new Error("Authentication failed. Please login again.");
    }

    return token;
  };

  const fetchEvents = async () => {
    try {
      setLoading(true);

      const token = await getToken();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/manage-events`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to load your events");
      }

      setEvents(result.data || []);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isPending) return;

    if (!session) {
      router.replace("/login?redirect=/manage-events");
      return;
    }

    fetchEvents();
  }, [session, isPending, router]);

  const startEditing = (event: Event) => {
    setEditingId(event._id);

    setForm({
      title: event.title,
      description: event.description,
      eventType: event.eventType,
      thumbnailUrl: event.thumbnailUrl,
      location: event.location,
      eventDate: toLocalDateTime(event.eventDate),
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!editingId) return;

    const title = form.title.trim();
    const description = form.description.trim();
    const thumbnailUrl = form.thumbnailUrl.trim();
    const location = form.location.trim();

    if (title.length < 5 || title.length > 100) {
      toast.error("Event title must be between 5 and 100 characters");
      return;
    }

    if (description.length < 20 || description.length > 2000) {
      toast.error("Description must be between 20 and 2000 characters");
      return;
    }

    if (!eventTypes.includes(form.eventType)) {
      toast.error("Please select a valid event category");
      return;
    }

    try {
      const imageURL = new URL(thumbnailUrl);

      if (!["http:", "https:"].includes(imageURL.protocol)) {
        throw new Error("Invalid image URL");
      }
    } catch {
      toast.error("Please enter a valid image URL");
      return;
    }

    if (location.length < 3 || location.length > 150) {
      toast.error("Location must be between 3 and 150 characters");
      return;
    }

    const selectedDate = new Date(form.eventDate);

    if (
      !form.eventDate ||
      Number.isNaN(selectedDate.getTime()) ||
      selectedDate <= new Date()
    ) {
      toast.error("Please select a valid future event date");
      return;
    }

    try {
      setSaving(true);

      const token = await getToken();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/manage-events/${editingId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title,
            description,
            eventType: form.eventType,
            thumbnailUrl,
            location,
            eventDate: selectedDate.toISOString(),
          }),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to update event");
      }

      toast.success("Event updated successfully!");
      setEditingId(null);
      setForm(emptyForm);
      await fetchEvents();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (eventId: string) => {
    try {
      setDeletingId(eventId);

      const token = await getToken();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/manage-events/${eventId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to delete event");
      }

      setEvents((current) => current.filter((event) => event._id !== eventId));

      if (editingId === eventId) {
        setEditingId(null);
        setForm(emptyForm);
      }

      toast.success("Event deleted successfully!");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (date: string) =>
    new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(date));

  if (isPending || loading) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#f8f8f3] dark:bg-[#101c16]">
        <div className="flex items-center gap-3 text-[#245b43] dark:text-[#a9d2b3]">
          <LoaderCircle className="animate-spin" size={24} />
          <span className="text-sm font-medium">Loading your events...</span>
        </div>
      </main>
    );
  }

  if (!session) return null;

  return (
    <main className="min-h-screen bg-[#f8f8f3] px-5 py-16 text-[#172b22] dark:bg-[#101c16] dark:text-[#edf5ee] sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="inline-flex rounded-full bg-[#e8efe8] px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#245b43] dark:bg-[#1b2b21] dark:text-[#a9d2b3]">
            Your Dashboard
          </span>

          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
            Manage <span className="text-[#6d9878]">Events</span>
          </h1>

          <p className="mt-5 text-base leading-8 text-[#718078] dark:text-[#a0b2a5]">
            Keep your community initiatives organized. Update event information
            or remove events you no longer need.
          </p>
        </div>

        {editingId && (
          <section className="mb-12 rounded-3xl border border-[#dce7dc] bg-white p-6 dark:border-[#344b3d] dark:bg-[#17271d] sm:p-8">
            <div className="mb-7 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold">Update Event</h2>
                <p className="mt-2 text-sm text-[#718078] dark:text-[#a0b2a5]">
                  Edit your event information below.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setForm(emptyForm);
                }}
                className="rounded-xl p-2 transition hover:bg-[#e8efe8] dark:hover:bg-[#263c30]"
                aria-label="Cancel editing"
              >
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="grid gap-5 sm:grid-cols-2">
              <label className="text-sm font-semibold">
                Event Title
                <input
                  required
                  minLength={5}
                  maxLength={100}
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="mt-2 w-full rounded-xl border border-[#dce5dc] bg-[#f8faf7] px-4 py-3 font-normal outline-none focus:border-[#6d9878] dark:border-[#344b3d] dark:bg-[#101c16]"
                />
              </label>

              <label className="text-sm font-semibold">
                Event Type
                <select
                  required
                  value={form.eventType}
                  onChange={(e) =>
                    setForm({ ...form, eventType: e.target.value })
                  }
                  className="mt-2 w-full rounded-xl border border-[#dce5dc] bg-[#f8faf7] px-4 py-3 font-normal outline-none focus:border-[#6d9878] dark:border-[#344b3d] dark:bg-[#101c16]"
                >
                  <option value="">Select an event category</option>
                  {eventTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </label>

              <label className="text-sm font-semibold sm:col-span-2">
                Description
                <textarea
                  required
                  minLength={20}
                  maxLength={2000}
                  rows={5}
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  className="mt-2 w-full resize-y rounded-xl border border-[#dce5dc] bg-[#f8faf7] px-4 py-3 font-normal outline-none focus:border-[#6d9878] dark:border-[#344b3d] dark:bg-[#101c16]"
                />
              </label>

              <label className="text-sm font-semibold">
                Thumbnail URL
                <input
                  required
                  type="url"
                  value={form.thumbnailUrl}
                  onChange={(e) =>
                    setForm({ ...form, thumbnailUrl: e.target.value })
                  }
                  className="mt-2 w-full rounded-xl border border-[#dce5dc] bg-[#f8faf7] px-4 py-3 font-normal outline-none focus:border-[#6d9878] dark:border-[#344b3d] dark:bg-[#101c16]"
                />
              </label>

              <label className="text-sm font-semibold">
                Location
                <input
                  required
                  minLength={3}
                  maxLength={150}
                  value={form.location}
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
                  className="mt-2 w-full rounded-xl border border-[#dce5dc] bg-[#f8faf7] px-4 py-3 font-normal outline-none focus:border-[#6d9878] dark:border-[#344b3d] dark:bg-[#101c16]"
                />
              </label>

              <label className="text-sm font-semibold sm:col-span-2">
                Event Date
                <input
                  required
                  type="datetime-local"
                  min={getCurrentLocalDateTime()}
                  value={form.eventDate}
                  onChange={(e) =>
                    setForm({ ...form, eventDate: e.target.value })
                  }
                  className="mt-2 w-full rounded-xl border border-[#dce5dc] bg-[#f8faf7] px-4 py-3 font-normal outline-none focus:border-[#6d9878] dark:border-[#344b3d] dark:bg-[#101c16]"
                />
              </label>

              <div className="flex flex-wrap gap-3 sm:col-span-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-[#245b43] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#194832] disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setForm(emptyForm);
                  }}
                  className="rounded-xl border border-[#dce5dc] px-7 py-3 text-sm font-semibold transition hover:bg-[#f1f5ef] dark:border-[#344b3d] dark:hover:bg-[#263c30]"
                >
                  Cancel
                </button>
              </div>
            </form>
          </section>
        )}

        {events.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-[#cbd8cc] bg-white px-6 py-20 text-center dark:border-[#344b3d] dark:bg-[#17271d]">
            <CalendarDays size={34} className="mx-auto text-[#6d9878]" />
            <h2 className="mt-6 text-xl font-bold">
              You haven't created any events yet
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#718078] dark:text-[#a0b2a5]">
              Start a community initiative and invite others to make a positive
              difference together.
            </p>
            <Link
              href="/create-event"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#245b43] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#194832]"
            >
              Create an Event
              <ArrowRight size={17} />
            </Link>
          </div>
        ) : (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <article
                key={event._id}
                className="overflow-hidden rounded-3xl border border-[#e5e9e2] bg-white dark:border-[#344b3d] dark:bg-[#17271d]"
              >
                <div className="h-52 overflow-hidden bg-[#e8efe8] dark:bg-[#263c30]">
                  <img
                    src={event.thumbnailUrl}
                    alt={event.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="p-6">
                  <span className="rounded-full bg-[#e8efe8] px-3 py-1.5 text-xs font-semibold text-[#245b43] dark:bg-[#263c30] dark:text-[#a9d2b3]">
                    {event.eventType}
                  </span>

                  <h2 className="mt-4 line-clamp-2 text-xl font-bold">
                    {event.title}
                  </h2>

                  <p className="mt-3 line-clamp-3 min-h-[72px] text-sm leading-6 text-[#718078] dark:text-[#a0b2a5]">
                    {event.description}
                  </p>

                  <div className="mt-5 space-y-3 border-t border-[#edf0eb] pt-4 text-sm text-[#718078] dark:border-[#344b3d] dark:text-[#a0b2a5]">
                    <div className="flex items-center gap-2">
                      <CalendarDays
                        size={16}
                        className="shrink-0 text-[#6d9878]"
                      />
                      {formatDate(event.eventDate)}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="shrink-0 text-[#6d9878]" />
                      <span className="truncate">{event.location}</span>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-3 gap-2">
                    <Link
                      href={`/upcoming-events/${event._id}`}
                      className="flex items-center justify-center gap-1.5 rounded-xl bg-[#e8efe8] px-2 py-3 text-sm font-semibold text-[#245b43] transition hover:bg-[#dce9dd] dark:bg-[#263c30] dark:text-[#a9d2b3] dark:hover:bg-[#314c3a]"
                    >
                      <Eye size={15} />
                      View
                    </Link>

                    <button
                      onClick={() => startEditing(event)}
                      className="flex items-center justify-center gap-1.5 rounded-xl bg-[#e8efe8] px-2 py-3 text-sm font-semibold text-[#245b43] transition hover:bg-[#dce9dd] dark:bg-[#263c30] dark:text-[#a9d2b3] dark:hover:bg-[#314c3a]"
                    >
                      <Pencil size={15} />
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(event._id)}
                      disabled={deletingId === event._id}
                      className="flex items-center justify-center gap-1.5 rounded-xl bg-red-50 px-2 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:opacity-60 dark:bg-red-950/30 dark:text-red-400 dark:hover:bg-red-950/50"
                    >
                      {deletingId === event._id ? (
                        <LoaderCircle size={15} className="animate-spin" />
                      ) : (
                        <Trash2 size={15} />
                      )}
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
