import { auth } from "@/app/lib/auth";
import MyBookingsCard from "@/components/shared/MyBookingsCard";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const MyBookingsPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const user = session?.user;

    if (!user) {
        redirect("/login");
    }

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/booking/${user?.id}`,
        {
            cache: "no-store",
        }
    );

    const result = await res.json();
    const bookings = result.data;

    // console.log(user, result);

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
                        <div className="flex flex-col items-center justify-center py-12 px-6 bg-sky-50 text-center shadow-sm">
                            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 mb-4">
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
                                No bookings found
                            </h3>

                            <p className="text-sm text-gray-500 mt-1">
                                You don’t have any bookings yet. Once you do, they’ll appear here.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyBookingsPage;