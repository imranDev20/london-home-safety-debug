import ContactMap from "./_components/contact-map";
import ContactAddress from "./_components/contact-address";
import PageHeader from "../../_components/common/page-header";
import BackgroundImage from "@/images/about-bg.jpeg";
import ContactUs from "./_components/contact-us";

const breadCrumbOptions = [
  {
    label: "Contact Us",
    isCurrentPage: true,
  },
];

export default function Contact() {
  return (
    <>
      <PageHeader
        backgroundImage={BackgroundImage}
        breadCrumbOptions={breadCrumbOptions}
      />
      <ContactAddress />
      <ContactUs />
      <ContactMap />
    </>
  );
}
