"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  HeartHandshake,
  ChevronDown,
  UserRound,
  CalendarDays,
  PlusCircle,
  LogOut,
  LayoutDashboard,
  Sun,
  Moon,
} from "lucide-react";
import { toast } from "sonner";
import { useTheme } from "next-themes";
import { authClient } from "@/lib/auth-client";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Upcoming Events", href: "/upcoming-events" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const user = session?.user;
  const isDark = mounted && theme === "dark";

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const toggleTheme = () => {
    if (!mounted) return;
    setTheme(isDark ? "light" : "dark");
  };

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      setProfileOpen(false);
      setMobileOpen(false);
      toast.success("Logged out successfully");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("Unable to log out. Please try again.");
    }
  };

  const closeMenus = () => {
    setMobileOpen(false);
    setProfileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#e5e9e2] bg-[#f8f8f3]/95 backdrop-blur-xl dark:border-[#263c30] dark:bg-[#101c16]/95">
      <nav className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link
          href="/"
          onClick={closeMenus}
          className="flex items-center gap-2.5"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#245b43] text-white">
            <HeartHandshake size={23} strokeWidth={2.2} />
          </span>
          <span className="text-[25px] font-bold tracking-tight text-[#172b22] dark:text-[#edf5ee]">
            kindora<span className="text-[#6d9878]">.</span>
          </span>
        </Link>

        <div className="hidden items-center gap-9 md:flex">
          {navigation.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-[#245b43] text-white"
                    : "text-[#66736b] hover:bg-[#e8efe8] hover:text-[#245b43] dark:text-[#a0b2a5] dark:hover:bg-[#263c30] dark:hover:text-[#9ac8a6]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Light mode" : "Dark mode"}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e5e9e2] bg-white text-[#245b43] transition hover:bg-[#e8efe8] dark:border-[#344b3d] dark:bg-[#1b2b21] dark:text-[#f4c96b] dark:hover:bg-[#263c30]"
          >
            {mounted && isDark ? <Sun size={19} /> : <Moon size={19} />}
          </button>

          {isPending ? (
            <div className="h-10 w-24 animate-pulse rounded-full bg-[#e8efe8] dark:bg-[#263c30]" />
          ) : user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 rounded-full border border-[#e5e9e2] bg-white py-1.5 pl-1.5 pr-3 transition hover:border-[#b8cdbd] dark:border-[#344b3d] dark:bg-[#1b2b21]"
              >
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name || "Profile"}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e8efe8] text-[#245b43] dark:bg-[#344b3d] dark:text-[#b6d6bd]">
                    <UserRound size={17} />
                  </span>
                )}

                <span className="max-w-28 truncate text-sm font-semibold text-[#243b2e] dark:text-[#e5efe7]">
                  {user.name || "My Account"}
                </span>

                <ChevronDown
                  size={15}
                  className={`text-[#718078] transition-transform dark:text-[#a0b2a5] ${
                    profileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-14 w-60 overflow-hidden rounded-2xl border border-[#e5e9e2] bg-white p-2 shadow-xl shadow-[#172b22]/10 dark:border-[#344b3d] dark:bg-[#1b2b21]">
                  <div className="border-b border-[#edf0eb] px-3 py-3 dark:border-[#344b3d]">
                    <p className="truncate text-sm font-semibold text-[#172b22] dark:text-[#edf5ee]">
                      {user.name}
                    </p>
                    <p className="truncate text-xs text-[#718078] dark:text-[#a0b2a5]">
                      {user.email}
                    </p>
                  </div>

                  <div className="py-2">
                    {[
                      { label: "My Profile", href: "/profile", icon: UserRound },
                      { label: "Create Event", href: "/create-event", icon: PlusCircle },
                      { label: "Manage Events", href: "/manage-events", icon: LayoutDashboard },
                      { label: "Joined Events", href: "/joined-events", icon: CalendarDays },
                    ].map((item) => {
                      const Icon = item.icon;
                      const active = isActive(item.href);

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={closeMenus}
                          aria-current={active ? "page" : undefined}
                          className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                            active
                              ? "bg-[#e8efe8] text-[#245b43] dark:bg-[#263c30] dark:text-[#a9d2b3]"
                              : "text-[#53645a] hover:bg-[#f1f5ef] hover:text-[#245b43] dark:text-[#b7c8bb] dark:hover:bg-[#263c30] dark:hover:text-[#a9d2b3]"
                          }`}
                        >
                          <Icon size={17} />
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>

                  <div className="border-t border-[#edf0eb] pt-2 dark:border-[#344b3d]">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                    >
                      <LogOut size={17} />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                  isActive("/login")
                    ? "bg-[#245b43] text-white"
                    : "text-[#245b43] hover:bg-[#e8efe8] dark:text-[#a9d2b3] dark:hover:bg-[#263c30]"
                }`}
              >
                Login
              </Link>

              <Link
                href="/register"
                className={`rounded-full px-6 py-2.5 text-sm font-semibold transition ${
                  isActive("/register")
                    ? "bg-[#194832] text-white"
                    : "bg-[#245b43] text-white hover:bg-[#194832]"
                }`}
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-[#245b43] hover:bg-[#e8efe8] dark:text-[#f4c96b] dark:hover:bg-[#263c30]"
          >
            {mounted && isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-[#245b43] hover:bg-[#e8efe8] dark:text-[#edf5ee] dark:hover:bg-[#263c30]"
          >
            {mobileOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="border-t border-[#e5e9e2] bg-[#f8f8f3] px-5 py-5 dark:border-[#263c30] dark:bg-[#101c16] md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            {navigation.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenus}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                    active
                      ? "bg-[#245b43] text-white"
                      : "text-[#66736b] hover:bg-[#e8efe8] hover:text-[#245b43] dark:text-[#b7c8bb] dark:hover:bg-[#263c30] dark:hover:text-[#a9d2b3]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            {isPending ? (
              <div className="mt-2 h-10 animate-pulse rounded-xl bg-[#e8efe8] dark:bg-[#263c30]" />
            ) : user ? (
              <>
                <div className="mt-3 flex items-center gap-3 border-t border-[#e5e9e2] px-3 py-4 dark:border-[#263c30]">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name || "Profile"}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e8efe8] text-[#245b43] dark:bg-[#344b3d] dark:text-[#b6d6bd]">
                      <UserRound size={19} />
                    </span>
                  )}

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-[#172b22] dark:text-[#edf5ee]">
                      {user.name}
                    </p>
                    <p className="truncate text-xs text-[#718078] dark:text-[#a0b2a5]">
                      {user.email}
                    </p>
                  </div>
                </div>

                {[
                  { label: "My Profile", href: "/profile" },
                  { label: "Create Event", href: "/create-event" },
                  { label: "Manage Events", href: "/manage-events" },
                  { label: "Joined Events", href: "/joined-events" },
                ].map((item) => {
                  const active = isActive(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMenus}
                      aria-current={active ? "page" : undefined}
                      className={`rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                        active
                          ? "bg-[#245b43] text-white"
                          : "text-[#53645a] hover:bg-[#e8efe8] hover:text-[#245b43] dark:text-[#b7c8bb] dark:hover:bg-[#263c30] dark:hover:text-[#a9d2b3]"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}

                <button
                  type="button"
                  onClick={handleLogout}
                  className="mt-2 rounded-xl border border-red-200 px-4 py-3 text-left text-sm font-semibold text-red-600 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950/30"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="mt-3 flex gap-3 border-t border-[#e5e9e2] pt-4 dark:border-[#263c30]">
                <Link
                  href="/login"
                  onClick={closeMenus}
                  className={`flex-1 rounded-full border py-3 text-center text-sm font-semibold transition ${
                    isActive("/login")
                      ? "border-[#245b43] bg-[#245b43] text-white"
                      : "border-[#245b43] text-[#245b43] hover:bg-[#e8efe8] dark:border-[#9ac8a6] dark:text-[#a9d2b3] dark:hover:bg-[#263c30]"
                  }`}
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  onClick={closeMenus}
                  className={`flex-1 rounded-full py-3 text-center text-sm font-semibold transition ${
                    isActive("/register")
                      ? "bg-[#194832] text-white"
                      : "bg-[#245b43] text-white hover:bg-[#194832]"
                  }`}
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}