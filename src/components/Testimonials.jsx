import TestimonialsClient from "./TestimonialsClient";

const Testimonials = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/testimonial`,
    { cache: "no-store" }
  );

  // console.log(res);

  // if (!res.ok) {
  //   throw new Error("Failed to fetch testimonials");
  // }

  const json = await res.json();
  const testimonials = json.data;

  // console.log(res);

  if (testimonials.length === 0) {
    return <p>No testimonials available</p>;
  }

  return <TestimonialsClient testimonials={testimonials} />;
};

export default Testimonials;