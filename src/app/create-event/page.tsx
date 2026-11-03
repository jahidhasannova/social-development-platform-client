
"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CalendarDays, MapPin, ImagePlus, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";

const eventTypes = [
  "Food Distribution",
  "Clothes Distribution",
  "Education",
  "Healthcare",
  "Environmental",
  "Community Support",
  "Other",
];

export default function CreateEventPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    eventType: "",
    thumbnailUrl: "",
    location: "",
    eventDate: "",
  });

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/login?redirect=/create-event");
    }
  }, [isPending, session, router]);

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!session) {
      toast.error("Please log in to create an event");
      router.push("/login");
      return;
    }

    const title = form.title.trim();
    const description = form.description.trim();
    const location = form.location.trim();
    const thumbnailUrl = form.thumbnailUrl.trim();

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
      setLoading(true);

      const { data: tokenData, error: tokenError } =
        await authClient.token();

      if (tokenError || !tokenData?.token) {
        throw new Error(
          "Authentication token unavailable. Please log in again."
        );
      }

      await apiFetch("/api/events", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${tokenData.token}`,
        },
        body: JSON.stringify({
          title,
          description,
          eventType: form.eventType,
          thumbnailUrl,
          location,
          eventDate: selectedDate.toISOString(),
        }),
      });

      toast.success("Your event has been created successfully!");
      router.push("/upcoming-events");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to create event. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (isPending || !session) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#f8f8f3] dark:bg-[#101c16]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#dce8dd] border-t-[#245b43]" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f8f3] px-5 py-12 text-[#172b22] dark:bg-[#101c16] dark:text-[#edf5ee] sm:px-8">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/upcoming-events"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#245b43] hover:underline dark:text-[#a9d2b3]"
        >
          <ArrowLeft size={17} />
          Back to Events
        </Link>

        <div className="mb-9 mt-8">
          <span className="text-sm font-semibold uppercase tracking-[0.15em] text-[#6d9878]">
            Create an Initiative
          </span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Bring Your Community Together
          </h1>
          <p className="mt-4 text-sm leading-7 text-[#718078] dark:text-[#a0b2a5]">
            Share your idea, organize a meaningful event, and invite people
            to make a positive difference.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-3xl border border-[#e5e9e2] bg-white p-6 shadow-sm dark:border-[#344b3d] dark:bg-[#17271d] sm:p-9"
        >
          <div>
            <label htmlFor="title" className="mb-2 block text-sm font-semibold">
              Event Title
            </label>
            <input
              id="title"
              required
              minLength={5}
              maxLength={100}
              value={form.title}
              onChange={(event) => updateField("title", event.target.value)}
              placeholder="e.g. Winter Clothes Distribution"
              className="w-full rounded-xl border border-[#dfe6df] bg-[#fbfcfa] px-4 py-3 text-sm outline-none transition focus:border-[#6d9878] focus:ring-2 focus:ring-[#6d9878]/15 dark:border-[#344b3d] dark:bg-[#101c16]"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-semibold"
            >
              Event Description
            </label>
            <textarea
              id="description"
              required
              minLength={20}
              maxLength={2000}
              rows={5}
              value={form.description}
              onChange={(event) =>
                updateField("description", event.target.value)
              }
              placeholder="Explain the purpose of your event and how people can participate..."
              className="w-full resize-y rounded-xl border border-[#dfe6df] bg-[#fbfcfa] px-4 py-3 text-sm leading-7 outline-none transition focus:border-[#6d9878] focus:ring-2 focus:ring-[#6d9878]/15 dark:border-[#344b3d] dark:bg-[#101c16]"
            />
            <p className="mt-1 text-right text-xs text-[#718078]">
              {form.description.length}/2000
            </p>
          </div>

          <div>
            <label
              htmlFor="eventType"
              className="mb-2 block text-sm font-semibold"
            >
              Event Category
            </label>
            <select
              id="eventType"
              required
              value={form.eventType}
              onChange={(event) =>
                updateField("eventType", event.target.value)
              }
              className="w-full rounded-xl border border-[#dfe6df] bg-[#fbfcfa] px-4 py-3 text-sm outline-none focus:border-[#6d9878] dark:border-[#344b3d] dark:bg-[#101c16]"
            >
              <option value="">Select an event category</option>
              {eventTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="thumbnailUrl"
              className="mb-2 flex items-center gap-2 text-sm font-semibold"
            >
              <ImagePlus size={17} className="text-[#6d9878]" />
              Thumbnail Image URL
            </label>
            <input
              id="thumbnailUrl"
              type="url"
              required
              value={form.thumbnailUrl}
              onChange={(event) =>
                updateField("thumbnailUrl", event.target.value)
              }
              placeholder="https://example.com/event-image.jpg"
              className="w-full rounded-xl border border-[#dfe6df] bg-[#fbfcfa] px-4 py-3 text-sm outline-none focus:border-[#6d9878] dark:border-[#344b3d] dark:bg-[#101c16]"
            />
          </div>

          <div>
            <label
              htmlFor="location"
              className="mb-2 flex items-center gap-2 text-sm font-semibold"
            >
              <MapPin size={17} className="text-[#6d9878]" />
              Event Location
            </label>
            <input
              id="location"
              required
              minLength={3}
              maxLength={150}
              value={form.location}
              onChange={(event) => updateField("location", event.target.value)}
              placeholder="e.g. Mirpur 10, Dhaka"
              className="w-full rounded-xl border border-[#dfe6df] bg-[#fbfcfa] px-4 py-3 text-sm outline-none focus:border-[#6d9878] dark:border-[#344b3d] dark:bg-[#101c16]"
            />
          </div>

          <div>
            <label
              htmlFor="eventDate"
              className="mb-2 flex items-center gap-2 text-sm font-semibold"
            >
              <CalendarDays size={17} className="text-[#6d9878]" />
              Event Date
            </label>
            <input
              id="eventDate"
              type="datetime-local"
              required
              min={new Date(
                Date.now() - new Date().getTimezoneOffset() * 60000
              )
                .toISOString()
                .slice(0, 16)}
              value={form.eventDate}
              onChange={(event) =>
                updateField("eventDate", event.target.value)
              }
              className="w-full rounded-xl border border-[#dfe6df] bg-[#fbfcfa] px-4 py-3 text-sm outline-none focus:border-[#6d9878] dark:border-[#344b3d] dark:bg-[#101c16]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#245b43] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#194832] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating Event..." : "Create Event"}
          </button>
        </form>
      </div>
    </main>
  );
}
