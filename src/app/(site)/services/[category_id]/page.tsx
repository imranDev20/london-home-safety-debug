import PageHeader from "@/app/_components/common/page-header";
import backgroundImage from "@/images/about-bg.jpeg";
import CategoryServices from "./_components/category-services";

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
        title="Electrical Services"
        secondary="Services"
      />

      <CategoryServices category={category_id} />
    </>
  );
}
