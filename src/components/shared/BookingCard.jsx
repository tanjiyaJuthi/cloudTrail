'use client'

import { Button, Card, Label, DateField } from "@heroui/react";
import { FaArrowRight } from "react-icons/fa6";
import { Check } from "@gravity-ui/icons";
import { authClient } from "@/app/lib/auth-client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const BookingCard = ({ destination }) => {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const [departureDate, setDepartureDate] = useState(null);
    const [personCount, setPersonCount] = useState(1);
    
    const [booked, setBooked] = useState(false);
    const [loading, setLoading] = useState(true);

    const {
        _id,
        slug,
        destinationName,
        price,
        imageUrl,
        country
    } = destination;

    useEffect(() => {
        const checkBooking = async () => {
            if (!user) return;

            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/booking/check?userId=${user.id}&destinationId=${_id}`
                );

                const data = await res.json();

                if (data?.booked) {
                    setBooked(true);
                }

            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        checkBooking();
    }, [user, _id]);

    const handleBooking = async () => {
        if (booked) return;

        if (!user) {
            alert("Please login first");
            return;
        }

        if (!departureDate) {
            alert("Please select a departure date");
            return;
        }

        const bookingData = {
            userId: user?.id,
            destinationId: _id,
            userName: user?.name,
            userImage: user?.image,
            destinationSlug: slug,
            destinationName,
            destinationImageUrl: imageUrl,
            destinationCountry: country,
            departureDate: new Date(departureDate).toISOString(),
            memberNumber: personCount || 1,
            totalPrice: price * personCount,
        };

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/booking`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(bookingData),
                }
            );

            const data = await res.json();

            if (!res.ok || !data.success) {
                toast.error(data.message || "Booking failed");
                return;
            }

            toast.success("Destination has been added to your booking!");

            setDepartureDate(null);
            setPersonCount(1);

            setBooked(true);

        } catch (error) {
            toast.error("Network error. Please try again.");
        }
    };

    return (
        <Card className="rounded-none md:col-span-1">
            <Card.Content>
                <div>
                    <p className="text-gray-400">Starting from</p>
                    <p className="text-3xl font-bold text-sky-500">
                        ${price}
                    </p>
                    <p className="text-gray-400">per person</p>
                </div>

                <div className="mt-12">
                    <Label>Member:</Label>

                    <div className="w-full bg-gray-50 border border-gray-200 px-5 rounded-none min-h-11 flex items-center justify-between mt-3">
                        <button
                            type="button"
                            onClick={() =>
                                setPersonCount((p) => Math.max(1, p - 1))
                            }
                            className="text-gray-700 px-2 py-1 hover:bg-gray-200"
                        >
                            –
                        </button>

                        <div className="flex items-center gap-1 text-gray-800">
                            <span className="font-medium">{personCount}</span>
                            <span className="text-gray-500 text-sm">
                                {personCount === 1 ? "person" : "persons"}
                            </span>
                        </div>

                        <button
                            type="button"
                            onClick={() => setPersonCount((p) => p + 1)}
                            className="text-gray-700 px-2 py-1 hover:bg-gray-200"
                        >
                            +
                        </button>
                    </div>
                </div>

                <DateField onChange={setDepartureDate} className="mt-3">
                    <Label>Departure Date:</Label>

                    <DateField.Group className="rounded-none mt-3 w-full bg-gray-50 border border-gray-200 px-5 min-h-11">
                        <DateField.Input>
                            {(segment) => (
                                <DateField.Segment
                                    segment={segment}
                                    className="text-gray-800"
                                />
                            )}
                        </DateField.Input>
                    </DateField.Group>
                </DateField>

                <div className="mt-3 border-t-2 border-gray-100"></div>

                <Button
                    onClick={handleBooking}
                    disabled={booked || loading}
                    className={`mt-3 flex items-center justify-center gap-2 p-6 text-white transition w-full rounded-none ${
                        booked || loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-sky-500 hover:bg-sky-600 cursor-pointer"
                    }`}
                >
                    {loading ? "Checking..." : booked ? "Booked" : "Book Now"}
                    <FaArrowRight />
                </Button>
                
                <ul className="mt-4 text-gray-600">
                    <li className="flex gap-2 items-center">
                        <Check /> Free cancellation up to 7 days
                    </li>
                    <li className="flex gap-2 items-center">
                        <Check /> Travel insurance included
                    </li>
                    <li className="flex gap-2 items-center">
                        <Check /> 24/7 customer support
                    </li>
                </ul>
            </Card.Content>
        </Card>
    );
};

export default BookingCard;