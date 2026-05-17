import Image from 'next/image';
import Link from 'next/link';
import { FaStar } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { SlCalender } from "react-icons/sl";
import { MdOutlineArrowOutward } from "react-icons/md";
import { Button } from '@heroui/react';

const DestinationCard = ({destination, className = "" }) => {
    return (
        <Link href={`/destinations/${destination.slug}`} className={`card-wrapper ${className}`}>
            <div className="bg-white transition-all duration-300 card-hover group flex flex-col">
                <div className="relative aspect-4/3 overflow-hidden">
                    <div className="relative w-full h-full overflow-hidden">
                        <Image
                            loading="eager"
                            src={
                                destination?.imageUrl?.trim()
                                    ? destination.imageUrl
                                    : "/fallback.jpg"
                            }
                            alt="Bali Paradise"
                            fill
                            sizes="(max-width: 768px) 100vw, 300px"
                            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>
                    
                    <div className="absolute top-4 right-4 bg-white/60 backdrop-blur-md px-3 py-1.5 flex items-center gap-1">
                        <span className="font-bold text-on-surface">{destination.rating}</span>

                        <FaStar />
                    </div>
                </div>

                <div className="p-6 flex flex-col grow">
                    <div className="flex items-center gap-1 text-on-surface-variant mb-2">
                        <GoLocation />

                        <span className="font-label-sm text-label-sm">{destination.country}</span>
                    </div>

                    <div className="flex justify-between items-start mb-4">
                        <h3 className="font-headline-md text-headline-md text-on-background">{destination.destinationName}</h3>
                        
                        <div className="text-right flex items-center">
                            <span className="font-headline-md text-headline-md text-on-background block">${destination.price}</span>

                            <span className="text-sm text-gray-500">/Person</span>
                        </div>
                    </div>
                
                    <div className="flex items-center gap-2 text-on-surface-variant mb-8 text-sm text-gray-500">
                        <SlCalender />
                        <span className="font-body-md text-body-md">{destination.duration}</span>
                    </div>

                    <Button 
                        className="rounded-none flex gap-1 items-center"
                    >
                        BOOK NOW <MdOutlineArrowOutward />
                    </Button>
                </div>
            </div>
        </Link>
    );
};

export default DestinationCard;