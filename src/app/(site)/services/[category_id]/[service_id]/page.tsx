import PageHeader from "@/app/_components/common/page-header";

import backgroundImage from "@/images/about-bg.jpeg";
import { kebabCaseToNormalText } from "@/shared/functions";
import ServicePropertyType from "./_components/service-property-type";

export default function ServiceDetailsPage({
  params,
}: {
  params: {
    service_id: string;
    category_id: string;
  };
}) {
  const { service_id, category_id } = params;

  const breadCrumbOptions = [
    {
      label: "Services",
      path: "/services",
    },
    {
      label: kebabCaseToNormalText(category_id),
      path: `/services/${category_id}`,
    },
    {
      label: kebabCaseToNormalText(service_id),
      isCurrentPage: true,
    },
  ];

  return (
    <>
      <PageHeader
        backgroundImage={backgroundImage}
        breadCrumbOptions={breadCrumbOptions}
      />

      <ServicePropertyType categoryId={category_id} serviceId={service_id} />
    </>
  );
}
