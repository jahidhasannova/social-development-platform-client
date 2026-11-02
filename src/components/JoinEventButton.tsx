
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { HeartHandshake } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function JoinEventButton({
  eventId,
}: {
  eventId: string;
}) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [loading, setLoading] = useState(false);

  const handleJoin = async () => {
    if (!session) {
      router.push(`/login?redirect=${encodeURIComponent(`/upcoming-events/${eventId}`)}`);
      return;
    }

    try {
      setLoading(true);

      const tokenResult = await authClient.token();
      const token = tokenResult.data?.token;

      if (tokenResult.error || !token) {
        throw new Error("Authentication failed. Please login again.");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/participants/${eventId}/join`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to join event");
      }

      toast.success("Successfully joined the event!");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleJoin}
      disabled={isPending || loading}
      className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-[#245b43] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#194832] disabled:cursor-not-allowed disabled:opacity-60"
    >
      <HeartHandshake size={18} />
      {loading
        ? "Joining..."
        : isPending
          ? "Please wait..."
          : session
            ? "Join Event"
            : "Login to Join Event"}
    </button>
  );
}
