import Image from "next/image";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

const StartJourney = () => {
  return (
    <div className="relative flex items-center justify-center overflow-hidden mt-20 h-[50vh]">
        <div className="absolute inset-0 z-0">
            <Image
            fill
            alt="Tropical island aerial view"
            className="object-cover"
            src="/assets/banner.png"
            />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center px-margin-mobile max-w-2xl mx-auto space-y-5">
            <h1 className="text-white text-5xl">
            Ready To Start Your Journey?
            </h1>

            <p className="text-white opacity-90 font-body-lg text-body-lg">
            Join thousands of travelers who have discovered the world with us
            </p>

            <Link href="/destinations" className="group bg-white text-on-background px-8 py-4 flex items-center gap-2 hover:scale-105 transition">
                <span>BOOK YOUR TRIP TODAY</span>
                <FaArrowRightLong className="group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>
        </div>
  );
};

export default StartJourney;
