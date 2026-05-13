import { formatMonthYear } from '@/app/lib/helper/helper';
import { Card } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { BsCurrencyDollar } from 'react-icons/bs';
import { CiEdit } from 'react-icons/ci';
import { FaEarthAsia } from 'react-icons/fa6';
import { IoLocationOutline } from 'react-icons/io5';
import { MdOutlineArrowOutward } from 'react-icons/md';

const ProfileDetailsPage = async ({params}) => {
    const {profileId} = await params;
    // console.log(profileId);

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/profile/${profileId}`,
        { cache: "no-store" }
    );
    // console.log(res);
    if (!res.ok) {
        return (
            <div className="text-center mt-10 text-red-500">
                Failed to load profile
            </div>
        );
    }
    
    const data = await res.json();
    const profile = data?.data;

    if (!profile) {
        return (
            <div className="text-center mt-10 text-red-500">
                Profile not found
            </div>
        );
    }

    const {name, imageUrl, createdAt} = profile;

    return (
        <div className="my-bookings-wrapper px-5 lg:px-0 my-20">
            <div className="max-w-7xl mx-auto">
                <div className="space-y-4">
                    <h2 className="text-4xl">My Profile</h2>
                    <p className="text-gray-500">Manage and view your upcoming travel plans</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10">
                    <Card className="col-span-1 rounded-none">
                        <Card.Header className="flex flex-col items-center justify-center">
                            <div className="w-25 h-25 rounded-full overflow-hidden">
                                <Image
                                    src={imageUrl || "/fallback.jpg"}
                                    alt={name ? `${name}'s profile picture` : "User profile picture"}
                                    width={100}
                                    height={100}
                                    className="w-full h-full object-cover"
                                    loading="eager"
                                    priority
                                />
                            </div>

                            <div className="text-xl text-black mt-2">{name || "Anonymous User"}</div>

                            <div className="flex gap-1 items-center justify-center mt-1 mb-2">
                                <IoLocationOutline />
                                <span>San Francisco, CA</span>
                            </div>
                        </Card.Header>

                        <div className="border-t border-gray-200"></div>

                        <Card.Content>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-400">Member since</span>
                                <span className="font-semibold text-slate-700">{formatMonthYear(createdAt)}</span>
                            </div>

                            <div className="flex justify-between text-sm mt-2">
                                <span className="text-slate-400">Nationality</span>
                                <span className="font-semibold text-slate-700">United States</span>
                            </div>
                        </Card.Content>

                        <Card.Footer>
                            <Link href="#" className="w-full mt-8 bg-sky-500 hover:bg-[#138496] text-white font-medium py-3 px-4 rounded-none flex items-center justify-center gap-2">
                                <CiEdit />
                                Edit Profile
                            </Link>
                        </Card.Footer>
                    </Card>

                    <div className="col-span-2">
                        <p className="text-xl text-black mt-2">Travel Statistics</p>

                        <div className="grid grid-cols-2 gap-5 mt-5">
                            <Card className="rounded-none w-full">
                                <Card.Header>
                                    <div className="flex items-center justify-between w-full">
                                        <div>
                                            <p className="text-md text-gray-500">Total Bookings</p>
                                            <p className="text-xl text-black mt-2">12</p>
                                        </div>

                                        <div className="p-2 rounded-full bg-sky-100 text-sky-600">
                                            <IoLocationOutline />
                                        </div>
                                    </div>
                                </Card.Header>
                            </Card>

                            <Card className="rounded-none w-full">
                                <Card.Header>
                                    <div className="flex items-center justify-between w-full">
                                        <div>
                                            <p className="text-md text-gray-500">Countries visited</p>
                                            <p className="text-xl text-black mt-2">1</p>
                                        </div>

                                        <div className="p-2 rounded-full bg-green-100 text-green-600">
                                            <FaEarthAsia />
                                        </div>
                                    </div>
                                </Card.Header>
                            </Card>

                            <Card className="rounded-none w-full">
                                <Card.Header>
                                    <div className="flex items-center justify-between w-full">
                                        <div>
                                            <p className="text-md text-gray-500">Upcoming Trips</p>
                                            <p className="text-xl text-black mt-2">2</p>
                                        </div>

                                        <div className="p-2 rounded-full bg-orange-100 text-orange-600">
                                            <MdOutlineArrowOutward />
                                        </div>
                                    </div>
                                </Card.Header>
                            </Card>

                            <Card className="rounded-none w-full">
                                <Card.Header>
                                    <div className="flex items-center justify-between w-full">
                                        <div>
                                            <p className="text-md text-gray-500">Countries visited</p>
                                            <p className="text-xl text-black mt-2">1</p>
                                        </div>

                                        <div className="p-2 rounded-full bg-purple-100 text-purple-600">
                                            <BsCurrencyDollar />
                                        </div>
                                    </div>
                                </Card.Header>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileDetailsPage;