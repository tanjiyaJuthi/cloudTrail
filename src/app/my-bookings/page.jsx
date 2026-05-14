import MyBookingsCard from "@/components/shared/MyBookingsCard";
import { headers } from "next/headers";
import { auth } from "@/app/lib/auth";

const MyBookingsPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const user = session?.user;

    if (!user) {
        return (
            <div className="py-20 text-center">
                Please login first
            </div>
        );
    }

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/booking/${user.id}`,
        {
            cache: "no-store",
        }
    );

    const result = await res.json();
    const bookings = result.data;

    console.log(user, result);

    return (
        <div className="my-bookings-wrapper px-5 lg:px-0 my-20">
            <div className="max-w-7xl mx-auto">
                <div className="space-y-4">
                    <h2 className="text-4xl">My Bookings</h2>

                    <p className="text-gray-500">
                        Manage and view your upcoming travel plans
                    </p>
                </div>

                <div className="my-bookings-card-container mt-10">
                    {bookings?.length > 0 ? (
                        bookings.map((booking) => (
                            <MyBookingsCard
                                key={booking._id}
                                booking={booking}
                            />
                        ))
                    ) : (
                        <p className="text-gray-500 mt-6">
                            No bookings found
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyBookingsPage;