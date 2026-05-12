import MyBookingsCard from "@/components/shared/MyBookingsCard";

const MyBookingsPage = async () => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/featured-destinations`,
        { cache: "no-store" }
    );

    const destinations = await res.json();

    return (
        <div className="my-bookings-wrapper px-5 lg:px-0 my-20">
            <div className="max-w-7xl mx-auto">
                <div className="space-y-4">
                    <h2 className="text-4xl">My Bookings</h2>
                    <p className="text-gray-500">Manage and view your upcoming travel plans</p>
                </div>

                <div className="my-bookings-card-container mt-10">
                    {
                        destinations.data.map((destination) => (
                            <MyBookingsCard 
                                key={destination._id}
                                destination={destination}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default MyBookingsPage;