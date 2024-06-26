import PageHeader from "@/app/_components/common/page-header";
import AboutUsHome from "../_components/about-us-home";
import backgroundImage from "@/images/about-bg.jpeg";
import Advantages from "./_components/advantages";
import Achievements from "./_components/achievements";
import AboutCallToAction from "./_components/about-cta";
import Partners from "../_components/partners";

const breadCrumbOptions = [
  {
    label: "About Us",
    isCurrentPage: true,
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        backgroundImage={backgroundImage}
        breadCrumbOptions={breadCrumbOptions}
      />
      <AboutUsHome />
      <Advantages />
      <Achievements />
      <AboutCallToAction />
      <Partners />
    </>
  );
}
