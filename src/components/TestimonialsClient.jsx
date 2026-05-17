"use client";

import { useRef, useState } from "react";
import SafeImage from "./shared/SafeImage";
import Image from "next/image";

const TestimonialsClient = ({ testimonials }) => {
  const totalSlides = testimonials.length;
  
  const containerRef = useRef(null);
  const [currentIdx, setCurrentIdx] = useState(1);

  const handleNext = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: 500,
        behavior: "smooth",
      });

      setCurrentIdx((prev) => Math.min(prev + 1, totalSlides));
    }
  };

  const handlePrev = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -500,
        behavior: "smooth",
      });

      setCurrentIdx((prev) => Math.max(prev - 1, 1));
    }
  };

  return (
    <div className="testimonial-client-wrapper px-5 lg:px-0">
      <div className="max-w-7xl mx-auto mt-20">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <h2 className="text-4xl">What Travelers Say</h2>
            <p className="text-gray-500">
              Real experiences from our happy travelers
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={handlePrev} className="w-12 h-12 rounded-full border flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </button>

            <button onClick={handleNext} className="w-12 h-12 rounded-full border flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Slider */}
        <div
          ref={containerRef}
          className="flex overflow-x-auto no-scrollbar gap-8 scroll-smooth"
        >
          {testimonials.map((testimonial) => (
            <article
              key={testimonial._id || testimonial.id}
              className="min-w-full lg:min-w-[50%] bg-white border p-8 flex gap-6"
            >
              <div className="flex-1">
                <blockquote className="text-xl text-gray-800 mb-8 font-light">
                  "{testimonial.quote}"
                </blockquote>

                <h4 className="font-semibold">{testimonial.name}</h4>
                <p className="text-gray-400 text-sm">{testimonial.location}</p>
              </div>

              <div className="w-56 h-64">
                <Image
                  width={100}
                  height={100}
                  src={testimonial?.imageUrl || 'fallback.jpg'}
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsClient;