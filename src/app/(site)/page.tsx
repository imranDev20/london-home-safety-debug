import Box from "@mui/joy/Box";
import Hero from "./_components/hero";
// import ServiceCategories from "./_components/service-categories";
// import Testimonials from "./_components/testimonials/testimonials";
import dynamic from "next/dynamic";

const ServiceCategories = dynamic(
  () => import("./_components/service-categories"),
  {
    loading: () => <p>Loading...</p>,
    ssr: false, // Set to true if you want server-side rendering
  }
);

const Testimonials = dynamic(
  () => import("./_components/testimonials/testimonials"),
  {
    loading: () => <p>Loading...</p>,
    ssr: true, // Set to true if you want server-side rendering
  }
);

export default function Home() {
  return (
    <>
      <Hero />
      <ServiceCategories />
      <Testimonials />
    </>
  );
}
