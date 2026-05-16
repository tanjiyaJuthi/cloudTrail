"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import DestinationCard from "./shared/DestinationCard";

const FeaturedDestination = () => {
  const containerRef = useRef(null);

  const [destinations, setDestinations] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(1);

  const totalSlides = destinations.length;

  useEffect(() => {
    const fetchFeaturedDestinations = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/destination/featured-destination`);
        
        const data = await res.json();

        if (data.success) {
          setDestinations(data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchFeaturedDestinations();
  }, []);

  const handleNext = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: 480,
        behavior: "smooth",
      });

      setCurrentIdx((prev) => (prev < totalSlides ? prev + 1 : prev));
    }
  };

  const handlePrev = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -480,
        behavior: "smooth",
      });

      setCurrentIdx((prev) => (prev > 1 ? prev - 1 : prev));
    }
  };

  return (
    <div className="featured-destinations-wrapper px-5 lg:px-0">
      <div className="max-w-7xl mx-auto mt-20">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-4">
            <h2 className="text-4xl">Featured Destinations</h2>

            <p className="text-gray-500">
              Handpicked travel experiences for adventure seekers
            </p>
          </div>

          <Link
            className="bg-sky-500 rounded-none border border-sky-500 text-white px-3 py-2 flex gap-2 items-center"
            href="/destinations"
          >
            All Destinations <FaArrowRight />
          </Link>
        </div>

        {/* Slider */}
        <div className="relative w-full mt-10">
          <div className="">
            <div
              ref={containerRef}
              className="flex overflow-x-auto no-scrollbar gap-8 scroll-smooth"
            >
              {destinations.map((destination) => (
                    <DestinationCard
                        key={destination._id}
                        destination={destination}
                        className="shrink-0 w-full md:w-1/3"
                    />
              ))}
            </div>

            {/* Controls */}
            <nav className="mt-5 flex items-center">
              <div className="flex items-center">
                <span className="text-2xl font-light text-slate-800">
                  {currentIdx}/{totalSlides}
                </span>
              </div>

              <div className="flex-1 border-t border-slate-200 mx-6" />

              <div className="flex items-center gap-4">
                <button
                  onClick={handlePrev}
                  aria-label="Previous slide"
                  className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-800 hover:border-slate-800 transition-all"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </button>

                <button
                  onClick={handleNext}
                  aria-label="Next slide"
                  className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-800 hover:border-slate-800 transition-all"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </button>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedDestination;
