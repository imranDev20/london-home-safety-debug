import PageHeader from "@/app/_components/common/page-header";
import backgroundImage from "@/images/about-bg.jpeg";
import CategoryServices from "./_components/category-services";
import { kebabCaseToNormalText } from "@/shared/functions";
import Testimonials from "../../_components/testimonials/testimonials";
import Partners from "../../_components/partners";
import AboutCategory from "./_components/about-category";
import CallToAction from "../../_components/call-to-action";

export default function CategoryDetailsPage({
  params,
}: {
  params: {
    category_id: string;
  };
}) {
  const { category_id } = params;

  return (
    <>
      <PageHeader
        backgroundImage={backgroundImage}
        title={kebabCaseToNormalText(category_id)}
        secondary="Services"
      />

      <CategoryServices category={category_id} />
      <AboutCategory category={category_id} />

      <CallToAction />

      <Testimonials />
      <Partners />
    </>
  );
}
