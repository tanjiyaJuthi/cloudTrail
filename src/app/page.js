import Banner from "@/components/Banner";
import FeaturedDestinations from '@/components/FeaturedDestinations';
import StartJourney from "@/components/StartJourney";
import Testimonials from "@/components/Testimonials";
import WhyChoose from "@/components/WhyChoose";

export default function Home() {
  return (
    <div>
      <Banner />
      <FeaturedDestinations />
      <WhyChoose />
      <Testimonials />
      <StartJourney />
    </div>
  );
}
