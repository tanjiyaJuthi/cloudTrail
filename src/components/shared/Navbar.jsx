'use client'

import { Link } from "@heroui/react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { IoPersonOutline } from "react-icons/io5";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const pathname = usePathname();

    const leftNavLinks = [
        { href: "/", label: "Home" },
        { href: "/destinations", label: "Destinations" },
        { href: "/my-bookings", label: "My Bookings" },
        { href: "/admin", label: "Admin" },
    ];

    const rightNavLinks = [
        { href: "/profile", label: (<><IoPersonOutline /> Profile</>) },
        { href: "/login", label: "Login" },
        { href: "/signup", label: "Sign Up"},
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
                    {rightNavLinks.map((link) => {
                        const isActive = pathname === link.href;

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`no-underline flex items-center gap-1 ${
                                    isActive
                                        ? "font-medium text-sky-500"
                                        : "text-gray-700"
                                }`}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </div>
            </header>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="border-t border-separator md:hidden">
                    <ul className="flex flex-col gap-4 p-4">

                        {leftNavLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="no-underline"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}

                        <div className="flex flex-col gap-3">
                            {rightNavLinks.map((link) => {
                                const isActive = pathname === link.href;

                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`no-underline flex items-center gap-1 ${
                                            isActive
                                                ? "font-medium text-sky-500"
                                                : "text-gray-700"
                                        }`}
                                    >
                                        {link.label}
                                    </Link>
                                );
                            })}
                        </div>
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;