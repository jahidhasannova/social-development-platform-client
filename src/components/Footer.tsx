import Link from "next/link";
import { HeartHandshake } from "lucide-react";

const NAV_LINKS = [
    { href: "/", label: "Home" },
    { href: "/upcoming-events", label: "Upcoming Events" },
];

const RESOURCE_LINKS = [
    { href: "/upcoming-events", label: "Explore Events" },
];

export default function Footer() {
    return (
        <footer className="border-t border-[#e5e9e2] bg-white dark:border-[#263c30] dark:bg-[#15231b]">
            <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:px-10">
                <div className="space-y-3 sm:col-span-2 lg:col-span-1">
                    <Link href="/" className="inline-flex items-center gap-2">
                        <HeartHandshake
                            size={25}
                            className="text-[#245b43] dark:text-[#9ac8a6]"
                        />
                        <span className="text-xl font-bold text-[#172b22] dark:text-[#edf5ee]">
                            kindora<span className="text-[#6d9878] dark:text-[#9ac8a6]">.</span>
                        </span>
                    </Link>

                    <p className="max-w-xs text-sm leading-relaxed text-[#718078] dark:text-[#a0b2a5]">
                        Kindora connects people through social development events.
                        Together, we can make a positive impact in our communities.
                    </p>
                </div>

                <div>
                    <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#718078] dark:text-[#a0b2a5]">
                        Navigate
                    </h2>

                    <ul className="space-y-3">
                        {NAV_LINKS.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="text-sm text-[#718078] transition-colors hover:text-[#245b43] dark:text-[#a0b2a5] dark:hover:text-[#9ac8a6]"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#718078] dark:text-[#a0b2a5]">
                        Resources
                    </h2>

                    <ul className="space-y-3">
                        {RESOURCE_LINKS.map((link) => (
                            <li key={`${link.href}-${link.label}`}>
                                <Link
                                    href={link.href}
                                    className="text-sm text-[#718078] transition-colors hover:text-[#245b43] dark:text-[#a0b2a5] dark:hover:text-[#9ac8a6]"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#718078] dark:text-[#a0b2a5]">
                        Community
                    </h2>

                    <p className="text-sm leading-relaxed text-[#718078] dark:text-[#a0b2a5]">
                        Making kindness a part of everyday life. Together, every small
                        action can create a meaningful change.
                    </p>
                </div>
            </div>

            <div className="border-t border-[#e5e9e2] dark:border-[#263c30]">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-5 text-xs text-[#9aa89d] sm:flex-row sm:px-8 lg:px-10 dark:text-[#7f9b88]">
                    <p>
                        © 2026 Kindora. All rights reserved.
                    </p>

                    <p>Designed & Developed by Jahid Hasan</p>
                </div>
            </div>
        </footer>
    );
}