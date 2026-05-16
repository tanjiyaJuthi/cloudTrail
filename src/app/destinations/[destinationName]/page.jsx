import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import Image from "next/image";
import { FaCheck } from "react-icons/fa6";
import { GoLocation } from "react-icons/go";
import { SlCalender } from "react-icons/sl";
import { FaStar } from "react-icons/fa";
import EditDestinationModal from "@/components/shared/EditDestinationModal";
import DeleteDestinationModal from "@/components/shared/DeleteDestinationModal";
import DestinationBookingCard from "@/components/shared/DestinationBookingCard";
import { headers } from "next/headers";
import { auth } from "@/app/lib/auth";

const DestinationDetailsPage = async ({params}) => {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    const user = session?.user;
    const {destinationName} = await params;

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/destination/${destinationName}`,
        { cache: "no-store" },
    );
    // console.log(res);

    if (!res.ok) {
        return (
            <div className="max-w-7xl mx-auto my-20 w-full px-5 lg:px-0">
                <div className="w-full py-12 px-6 bg-sky-50 text-center rounded-none shadow-sm">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 mb-4 mx-auto">
                        <svg
                            className="w-10 h-10 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 13h6m2 8H7a2 2 0 01-2-2V7a2 2 0 012-2h5l2 2h5a2 2 0 012 2v10a2 2 0 01-2 2z"
                            />
                        </svg>
                    </div>

                    <h3 className="text-2xl font-semibold text-gray-700">
                        Failed to load destinations
                    </h3>
                </div>
            </div>
        );
    }
    
    const data = await res.json();
    const destination = data?.data;

    if (!destination) {
        return (
            <div className="max-w-7xl mx-auto my-20 w-full px-5 lg:px-0">
                <div className="w-full py-12 px-6 bg-sky-50 text-center rounded-none shadow-sm">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 mb-4 mx-auto">
                        <svg
                            className="w-10 h-10 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 13h6m2 8H7a2 2 0 01-2-2V7a2 2 0 012-2h5l2 2h5a2 2 0 012 2v10a2 2 0 01-2 2z"
                            />
                        </svg>
                    </div>

                    <h3 className="text-2xl font-semibold text-gray-700">
                        Destination not found!
                    </h3>
                </div>
            </div>
        );
    }
    
    return (
        <div className="destination-details my-20">
            <div className="max-w-7xl mx-auto px-5 md:px-0">
                <div className="flex items-center justify-between">
                    <Link
                        href="/destinations"
                        aria-label="Go back to destinations page"
                        className="flex gap-3 items-center text-gray-600 hover:text-black transition-colors group"
                    >
                        <FaArrowLeftLong className="text-gray-400" />
                        Back to Destinations
                    </Link>

                    {user?.wanderLustRole === "admin" && (
                        <div className="flex gap-5 items-center">
                            <EditDestinationModal destination={destination} />

                            <DeleteDestinationModal destination={destination} />
                        </div>
                    )}
                </div>

                <div className="mt-6">
                    <div className="relative w-full h-[50vh] overflow-hidden">
                        <Image
                            loading="eager"
                            src={
                                destination?.imageUrl?.trim()
                                    ? destination.imageUrl
                                    : "/fallback.jpg"
                            }
                            alt={destination.destinationName || "Destination"}
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div className="mt-10 border-t-2 border-gray-100"></div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                        <div className="left-side-wrapper space-y-10 md:col-span-2">
                            <div className="space-y-4">
                                <div className="flex items-center gap-1 text-gray-600 mb-2">
                                    <GoLocation />
                                    <span>{destination.country}</span>
                                </div>

                                <h3 className="text-3xl">{destination.destinationName}</h3>

                                <div className="flex gap-4 items-center w-full text-sm">
                                    <div className="flex items-center gap-1 font-bold">
                                        <FaStar className="text-green-800" aria-hidden="true" />
                                        <span>{destination.rating}</span>
                                    </div>

                                    <span className="text-gray-500">
                                        ({destination.reviewCount}) reviews
                                    </span>

                                    <div className="flex items-center gap-1">
                                        <SlCalender aria-hidden="true" />
                                        <span>{destination.duration}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-5">
                                <h4 className="text-3xl">Overview</h4>
                                <p className="text-gray-500">{destination.description}</p>
                            </div>

                            <div className="space-y-5">
                                <h4 className="text-3xl">Highlights</h4>
                                
                                <p className="text-gray-500">{destination.description}</p>
                                
                                <ul>
                                    <li className="flex gap-2 items-center">
                                        <FaCheck />Luxury beachfront accommodation
                                    </li>
                                    <li className="flex gap-2 items-center">
                                        <FaCheck />Traditional Balinese spa treatment
                                    </li>
                                    <li className="flex gap-2 items-center">
                                        <FaCheck />Sunrise trek to Mount Batur
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <DestinationBookingCard destination={destination} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DestinationDetailsPage;