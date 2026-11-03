
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  HeartHandshake,
  Eye,
  EyeOff,
  ArrowRight,
  UserRound,
  Mail,
  ImagePlus,
  LockKeyhole,
} from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    image: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = form.name.trim();
    const trimmedEmail = form.email.trim();
    const trimmedImage = form.image.trim();

    if (trimmedName.length < 2 || trimmedName.length > 50) {
      toast.error("Name must be between 2 and 50 characters");
      return;
    }

    if (!/[a-z]/.test(form.password)) {
      toast.error("Password must contain at least one lowercase letter");
      return;
    }

    if (!/[A-Z]/.test(form.password)) {
      toast.error("Password must contain at least one uppercase letter");
      return;
    }

    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    if (trimmedImage) {
      try {
        const imageURL = new URL(trimmedImage);

        if (!["http:", "https:"].includes(imageURL.protocol)) {
          throw new Error("Invalid image URL");
        }
      } catch {
        toast.error("Please enter a valid profile photo URL");
        return;
      }
    }

    try {
      setLoading(true);

      const { error } = await authClient.signUp.email({
        name: trimmedName,
        email: trimmedEmail,
        password: form.password,
        image: trimmedImage || undefined,
        callbackURL: "/",
      });

      if (error) {
        throw new Error(error.message || "Unable to create your account");
      }

      toast.success("Your Kindora account has been created!");
      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f8f8f3] px-5 py-12 text-[#172b22] dark:bg-[#101c16] dark:text-[#edf5ee]">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-9 flex items-center justify-center gap-2.5">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#245b43] text-white">
            <HeartHandshake size={25} />
          </span>
          <span className="text-3xl font-bold tracking-tight">
            kindora<span className="text-[#6d9878]">.</span>
          </span>
        </Link>

        <div className="rounded-3xl border border-[#e5e9e2] bg-white p-7 shadow-sm dark:border-[#344b3d] dark:bg-[#17271d] sm:p-9">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#6d9878]">
              Join Our Community
            </span>
            <h1 className="mt-3 text-3xl font-bold">
              Create your account
            </h1>
            <p className="mt-3 text-sm leading-6 text-[#718078] dark:text-[#a0b2a5]">
              Be part of a community that believes in making a difference.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-semibold">
                Full Name
              </label>
              <div className="relative">
                <UserRound
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#829188]"
                />
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  required
                  minLength={2}
                  maxLength={50}
                  value={form.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border border-[#dfe6df] bg-[#fbfcfa] py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-[#6d9878] focus:ring-2 focus:ring-[#6d9878]/15 dark:border-[#344b3d] dark:bg-[#101c16]"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-semibold">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#829188]"
                />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={form.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-[#dfe6df] bg-[#fbfcfa] py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-[#6d9878] focus:ring-2 focus:ring-[#6d9878]/15 dark:border-[#344b3d] dark:bg-[#101c16]"
                />
              </div>
            </div>

            <div>
              <label htmlFor="image" className="mb-2 block text-sm font-semibold">
                Profile Photo URL <span className="font-normal text-[#829188]">(Optional)</span>
              </label>
              <div className="relative">
                <ImagePlus
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#829188]"
                />
                <input
                  id="image"
                  type="url"
                  value={form.image}
                  onChange={(event) => updateField("image", event.target.value)}
                  placeholder="https://example.com/photo.jpg"
                  className="w-full rounded-xl border border-[#dfe6df] bg-[#fbfcfa] py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-[#6d9878] focus:ring-2 focus:ring-[#6d9878]/15 dark:border-[#344b3d] dark:bg-[#101c16]"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-semibold">
                Password
              </label>
              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#829188]"
                />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  minLength={6}
                  value={form.password}
                  onChange={(event) =>
                    updateField("password", event.target.value)
                  }
                  placeholder="Create a strong password"
                  className="w-full rounded-xl border border-[#dfe6df] bg-[#fbfcfa] py-3.5 pl-11 pr-12 text-sm outline-none transition focus:border-[#6d9878] focus:ring-2 focus:ring-[#6d9878]/15 dark:border-[#344b3d] dark:bg-[#101c16]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#718078]"
                >
                  {showPassword ? <Eye size={19} /> : <EyeOff size={19} />}
                </button>
              </div>
              <p className="mt-2 text-xs leading-5 text-[#829188]">
                At least 6 characters, including uppercase and lowercase letters.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#245b43] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#194832] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating Account..." : "Create Account"}
              {!loading && <ArrowRight size={17} />}
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-[#718078] dark:text-[#a0b2a5]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-bold text-[#245b43] hover:underline dark:text-[#a9d2b3]"
            >
              Sign In
            </Link>
          </p>
        </div>

        <p className="mt-7 text-center text-xs text-[#718078] dark:text-[#82978a]">
          Together, we can make the world a little kinder.
        </p>
      </div>
    </main>
  );
}
