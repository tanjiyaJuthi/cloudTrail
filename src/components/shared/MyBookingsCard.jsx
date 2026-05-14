import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { SlCalender, SlEye } from "react-icons/sl";
import { TbBrandBooking } from "react-icons/tb";

const MyBookingsCard = ({ booking }) => {
    const {
        _id,
        destinationName,
        destinationImageUrl,
        destinationSlug,
        departureDate,
        totalPrice
    } = booking;

    return (
        <div className="card-wrapper">
            <div className="border border-gray-200 p-5 mb-10 bg-white transition-all duration-300 card-hover group flex gap-4">
                <div className="relative w-[30vw] h-[30vh] shrink-0 overflow-hidden">
                    <Image
                        src={destinationImageUrl || "/fallback.jpg"}
                        alt={destinationName || "Booking image"}
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="space-y-4.5 w-full">
                    <div className="inline-flex items-center gap-2 py-2 px-3 bg-green-50 text-green-600 w-fit">
                        <FaCheckCircle /> Confirmed
                    </div>

                    <h3 className="text-2xl font-semibold">
                        {destinationName}
                    </h3>

                    <div>
                        <div className="flex items-center gap-2 text-gray-600 text-sm mt-2">
                            <SlCalender className="text-base shrink-0" />
                            <span>Departure: {(departureDate)}</span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-600 text-sm mt-2">
                            <TbBrandBooking className="text-base shrink-0" />
                            <span>Booking Id: {_id}</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <h5 className="text-3xl font-bold text-sky-500">
                            ${totalPrice}
                        </h5>

                        <div className="flex items-center gap-3">
                            <Button className="bg-transparent rounded-none border border-red-500 text-red-500 px-3 py-2 inline-flex items-center gap-2">
                                <RiDeleteBin6Line />
                                Cancel
                            </Button>

                            <Link
                            className="bg-sky-500 rounded-none text-white px-3 py-2 inline-flex items-center gap-2"
                            href={`/destinations/${destinationSlug}`}
                            >
                                <SlEye />
                                View
                            </Link>
                        </div>
                        </div>
                </div>
            </div>
        </div>
    );
};

export default MyBookingsCard;