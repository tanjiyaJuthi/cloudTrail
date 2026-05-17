'use client';

import Link from "next/link";

const ErrorPage = () => {
    return (
        <div className="min-h-[70vh] flex items-center justify-center px-6">
            <div className="max-w-xl text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-sky-500/10 border border-sky-500/20 mb-6">
                    <span className="text-5xl">⚠️</span>
                </div>

                <h1 className="text-4xl md:text-6xl font-extrabold bg-linear-to-r from-sky-200 to-sky-600 bg-clip-text text-transparent">
                    Something Went Wrong
                </h1>

                <p className="mt-5 text-gray-400 text-lg leading-relaxed">
                    An unexpected error occurred while loading this page. Please try again.
                </p>

                <Link
                    href="/"
                    className="rounded-none inline-block mt-5 px-4 py-2 border border-sky-600 hover:bg-sky-600 transition duration-300 text-sky-600 hover:text-white"
                >
                    Back Home
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;