import PageHeader from "@/app/_components/common/page-header";
import backgroundImage from "@/images/about-bg.jpeg";
import ServiceCategories from "../_components/service-categories";
import ServiceItems from "./_components/service-items";

const breadCrumbOptions = [
  {
    label: "Services",
    isCurrentPage: true,
  },
];

export default function CategoriesPage() {
  return (
    <>
      <PageHeader
        backgroundImage={backgroundImage}
        breadCrumbOptions={breadCrumbOptions}
      />
      <ServiceCategories />
      <ServiceItems />
    </>
  );
}
