
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  UserRound,
  Mail,
  Camera,
  Save,
  LoaderCircle,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setImage(session.user.image || "");
    }
  }, [session]);

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/login?redirect=/profile");
    }
  }, [isPending, session, router]);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name.trim().length < 2) {
      toast.error("Name must be at least 2 characters long");
      return;
    }

    if (image.trim()) {
      try {
        new URL(image);
      } catch {
        toast.error("Please enter a valid profile image URL");
        return;
      }
    }

    try {
      setSaving(true);

      const { error } = await authClient.updateUser({
        name: name.trim(),
        image: image.trim() || null,
      });

      if (error) {
        throw new Error(error.message || "Failed to update profile");
      }

      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setSaving(false);
    }
  };

  if (isPending || !session) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#f8f8f3] dark:bg-[#101c16]">
        <div className="flex items-center gap-3 text-[#245b43] dark:text-[#a9d2b3]">
          <LoaderCircle className="animate-spin" size={24} />
          <span className="text-sm font-medium">Loading your profile...</span>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f8f3] px-5 py-16 text-[#172b22] dark:bg-[#101c16] dark:text-[#edf5ee] sm:px-8">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-[#245b43] transition hover:bg-[#e8efe8] dark:text-[#a9d2b3] dark:hover:bg-[#1b2b21]"
        >
          <ArrowLeft size={17} />
          Back to Home
        </Link>

        <div className="mt-8 overflow-hidden rounded-3xl border border-[#e5e9e2] bg-white shadow-sm dark:border-[#344b3d] dark:bg-[#17271d]">
          <div className="bg-[#e8efe8] px-6 py-10 text-center dark:bg-[#1b2b21] sm:px-10">
            <div className="mx-auto flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-white text-[#245b43] shadow-md dark:border-[#344b3d] dark:bg-[#263c30] dark:text-[#a9d2b3]">
              {image.trim() ? (
                <img
                  src={image}
                  alt="Profile preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <UserRound size={42} />
              )}
            </div>

            <h1 className="mt-5 text-3xl font-bold">My Profile</h1>
            <p className="mt-2 text-sm text-[#718078] dark:text-[#a0b2a5]">
              Manage your personal information and profile picture.
            </p>
          </div>

          <form onSubmit={handleUpdate} className="space-y-6 p-6 sm:p-10">
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold">
                <UserRound size={17} className="text-[#6d9878]" />
                Full Name
              </label>

              <input
                type="text"
                required
                minLength={2}
                maxLength={100}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full rounded-xl border border-[#dce5dc] bg-[#f8faf7] px-4 py-3 text-sm outline-none transition focus:border-[#6d9878] dark:border-[#344b3d] dark:bg-[#101c16]"
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold">
                <Mail size={17} className="text-[#6d9878]" />
                Email Address
              </label>

              <input
                type="email"
                value={session.user.email}
                readOnly
                className="w-full cursor-not-allowed rounded-xl border border-[#dce5dc] bg-[#edf1eb] px-4 py-3 text-sm text-[#718078] outline-none dark:border-[#344b3d] dark:bg-[#1b2b21] dark:text-[#a0b2a5]"
              />

              <p className="mt-2 text-xs text-[#718078] dark:text-[#a0b2a5]">
                Your registered email address cannot be changed here.
              </p>
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold">
                <Camera size={17} className="text-[#6d9878]" />
                Profile Picture URL
              </label>

              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://example.com/profile.jpg"
                className="w-full rounded-xl border border-[#dce5dc] bg-[#f8faf7] px-4 py-3 text-sm outline-none transition focus:border-[#6d9878] dark:border-[#344b3d] dark:bg-[#101c16]"
              />

              <p className="mt-2 text-xs text-[#718078] dark:text-[#a0b2a5]">
                Paste a direct image URL to update your profile picture.
              </p>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#245b43] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#194832] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <LoaderCircle size={18} className="animate-spin" />
              ) : (
                <Save size={18} />
              )}
              {saving ? "Saving Changes..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
