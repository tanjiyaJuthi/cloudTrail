import DestinationCard from '@/components/shared/DestinationCard';
import Link from 'next/link';
import { IoMdAdd } from "react-icons/io";

const DestinationsPage = async () => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/destination`,
        { cache: "no-store" }
    );

    const destinations = await res.json();

    return (
        <div className="destinations-wrapper px-5 lg:px-0 my-20" >
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between">
                    <div className="space-y-4">
                        <h2 className="text-4xl">Explore All Destinations</h2>
                        <p className="text-gray-500">Find your perfect travel experience from our curated collection</p>
                    </div>

                    <Link 
                        className="bg-sky-500 rounded-none border border-sky-500 text-white px-3 py-2 flex gap-2 items-center"
                        href="/add-destination"
                    >
                        <IoMdAdd /> Add Destination
                    </Link>
                </div>

                <div className="mt-10 space-y-4">
                    <div className="filter-container flex flex-row items-center bg-white overflow-hidden border border-gray-200">
                        <div className="filter-section flex-1 px-6 py-5 flex items-center justify-between transition-colors border-r boder-gray-200">
                            <span className="filterLabel font-small uppercase">Category</span>
                            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                            </svg>
                        </div>

                        <div className="filter-section flex-1 px-6 py-5 flex items-center justify-between transition-colors border-r boder-gray-200">
                            <span className="filterLabel font-small uppercase">Price Range</span>
                            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                            </svg>
                        </div>
                        
                        <div className="filter-section flex-1 px-6 py-5 flex items-center justify-between transition-colors border-r boder-gray-200">
                            <span className="filterLabel font-small uppercase">Sort By</span>
                            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                            </svg>
                        </div>
                    </div>

                    <p className="text-gray-500">Showing {destinations.data.length} destination</p>
                </div>

                <div className="destinaion-card-container mt-10">
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
                        {
                            destinations.data.map((destination) => (
                                <DestinationCard
                                    key={destination._id}
                                    destination={destination}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DestinationsPage;