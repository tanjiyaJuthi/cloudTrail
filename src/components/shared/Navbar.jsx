'use client'

import { Button, Link } from "@heroui/react";
import { Avatar } from '@heroui/react';

import { useState } from "react";
import { usePathname } from "next/navigation";

import { authClient } from "@/app/lib/auth-client";

const Navbar = () => {
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;
    // console.log(user);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    if (isPending) return null;

    const handleLogout = async () => {
        await authClient.signOut();
    };

    const leftNavLinks = [
        { href: "/", label: "Home" },
        { href: "/destinations", label: "Destinations" },

        ...(user
            ? [
                {
                    href: "/my-bookings",
                    label: "My Bookings",
                },
              ]
            : []),

        ...(user?.role === "admin"
            ? [
                  {
                      href: "/admin",
                      label: "Admin",
                  },
                  {
                      href: "/add-destinations",
                      label: "Add Destination",
                  },
              ]
            : []),
        ];

    const rightNavLinks = user
        ? [
            {
                href: `/profile/${user.slug}`,
                label: (
                    <Avatar>
                        <Avatar.Image
                            referrerPolicy="no-referrer"
                            alt={user?.name}
                            src={user?.image || "fallback.jpg"}
                        />
                        <Avatar.Fallback>
                            {user?.name?.charAt(0)?.toUpperCase() || "?"}
                        </Avatar.Fallback>
                    </Avatar>
                ),
            },
        ]
        : [
            { href: "/login", label: "Login" },
            { href: "/signup", label: "Sign Up" },
        ];

    return (
        <nav className="sticky top-0 z-40 w-full border-b border-separator bg-white backdrop-blur-lg">
            <header className="relative flex h-16 items-center px-6">

                {/* Left Section */}
                <div className="flex flex-1 items-center gap-4">

                    <button
                        className="md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                        aria-expanded={isMenuOpen}
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>

                    <ul className="hidden items-center gap-4 md:flex">
                        {leftNavLinks.map((link) => {
                            const isActive =
                                link.href === "/"
                                    ? pathname === "/"
                                    : pathname.startsWith(link.href);

                            return (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className={`no-underline ${
                                            isActive
                                                ? "font-medium text-sky-500"
                                                : "text-gray-700"
                                        }`}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {/* Logo */}
                <Link
                    href="/"
                    className="text-2xl ml-auto md:absolute md:left-1/2 md:ml-0 md:-translate-x-1/2 no-underline text-sky-500 font-extrabold"
                >
                    CloudTrail
                </Link>

                {/* Right Section */}
                <div className="hidden flex-1 items-center justify-end gap-4 md:flex">
                    {
                        rightNavLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="no-underline flex items-center gap-1 text-gray-700"
                            >
                                {link.label}
                            </Link>
                        ))
                    }

                    { 
                        user && (
                            <Button
                                onClick={handleLogout}
                                className="rounded-none text-white hover:text-white transition"
                            >
                                Logout
                            </Button>
                        )
                    }
                </div>
            </header>

            {/* Mobile Menu */}
            { isMenuOpen && (
                <div className="border-t border-separator md:hidden">
                    <ul className="flex flex-col gap-4 p-4">

                        {
                            leftNavLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="no-underline"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))
                        }

                        <div className="flex flex-col gap-3">
                            {
                                rightNavLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className="no-underline flex items-center gap-1 text-gray-700"
                                    >
                                        {link.label}
                                    </Link>
                                ))
                            }

                            { 
                                user && (
                                    <button
                                        onClick={handleLogout}
                                        className="no-underline gap-1 bg-sky-500 text-white transition p-2 inline w-1/5"
                                    >
                                        Logout
                                    </button>
                                )
                            }
                        </div>
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;