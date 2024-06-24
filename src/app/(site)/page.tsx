import AboutUsHome from "./_components/about-us-home";
import Hero from "./_components/hero";
import Partners from "./_components/partners";
import ServiceCategories from "./_components/service-categories";
import ServicesHome from "./_components/services-home";
import Testimonials from "./_components/testimonials/testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <ServiceCategories />
      <AboutUsHome />
      <ServicesHome />
      <Testimonials />
      <Partners isHome />
    </>
  );
}
