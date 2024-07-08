import AboutUsHome from "./_components/about-us-home";
import CallToAction from "./_components/call-to-action";
import Contact from "./_components/contact/contact";
import Faq from "./_components/faq";
import Hero from "./_components/hero";
import Partners from "./_components/partners";
import ServiceCategories from "./_components/service-categories";
import ServicesHome from "./_components/services-home";
import Testimonials from "./_components/testimonials/testimonials";

export const revalidate = 0;

export default function Home() {
  return (
    <>
      <Hero />
      <ServiceCategories />
      <AboutUsHome />
      <ServicesHome />
      <Testimonials />
      <Partners />
      <CallToAction />
      <Faq />
      <Contact />
    </>
  );
}
