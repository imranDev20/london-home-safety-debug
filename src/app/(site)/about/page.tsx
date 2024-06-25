import PageHeader from "@/app/_components/common/page-header";
import AboutUsHome from "../_components/about-us-home";
import backgroundImage from "@/images/about-bg.jpeg";
import Advantages from "./_components/advantages";
import Achievements from "./_components/achievements";
import AboutCallToAction from "./_components/about-cta";
import Partners from "../_components/partners";

export default function AboutPage() {
  return (
    <>
      <PageHeader backgroundImage={backgroundImage} title="About Us" />
      <AboutUsHome />
      <Advantages />
      <Achievements />
      <AboutCallToAction />
      <Partners />
    </>
  );
}
