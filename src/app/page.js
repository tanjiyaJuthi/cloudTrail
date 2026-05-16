import Banner from "@/components/Banner";
import FeaturedDestination from '@/components/FeaturedDestination';
import StartJourney from "@/components/StartJourney";
import Testimonials from "@/components/Testimonials";
import WhyChoose from "@/components/WhyChoose";

export default function Home() {
  return (
    <div>
      <Banner />
      <FeaturedDestination />
      <WhyChoose />
      <Testimonials />
      <StartJourney />
    </div>
  );
}
