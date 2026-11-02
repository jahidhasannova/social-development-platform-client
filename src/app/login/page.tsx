
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HeartHandshake, Eye, EyeOff, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setLoading(true);

      const params = new URLSearchParams(window.location.search);
      const requestedPath = params.get("redirect");
      const redirectTo =
        requestedPath?.startsWith("/") && !requestedPath.startsWith("//")
          ? requestedPath
          : "/";

      const { error } = await authClient.signIn.email({
        email: email.trim(),
        password,
        callbackURL: redirectTo,
      });

      if (error) {
        throw new Error(error.message || "Unable to log in");
      }

      toast.success("Welcome back to Kindora!");
      router.push(redirectTo);
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Login failed. Please try again."
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
              Welcome Back
            </span>
            <h1 className="mt-3 text-3xl font-bold">Sign in to Kindora</h1>
            <p className="mt-3 text-sm leading-6 text-[#718078] dark:text-[#a0b2a5]">
              Continue making a positive difference in your community.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-semibold">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-[#dfe6df] bg-[#fbfcfa] px-4 py-3.5 text-sm outline-none transition focus:border-[#6d9878] focus:ring-2 focus:ring-[#6d9878]/15 dark:border-[#344b3d] dark:bg-[#101c16]"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-semibold">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-[#dfe6df] bg-[#fbfcfa] px-4 py-3.5 pr-12 text-sm outline-none transition focus:border-[#6d9878] focus:ring-2 focus:ring-[#6d9878]/15 dark:border-[#344b3d] dark:bg-[#101c16]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#718078]"
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#245b43] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#194832] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing In..." : "Sign In"}
              {!loading && <ArrowRight size={17} />}
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-[#718078] dark:text-[#a0b2a5]">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-bold text-[#245b43] hover:underline dark:text-[#a9d2b3]"
            >
              Create Account
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
