import Image from "next/image";

import PageHeader from "@/app/_components/common/page-header";

import backgroundImage from "@/images/about-bg.jpeg";
import { kebabCaseToNormalText } from "@/shared/functions";
import ServicePropertyType from "./_components/service-property-type";

import Typography from "@mui/joy/Typography";
import Container from "@mui/joy/Container";
import Box from "@mui/joy/Box";
import accordionSummaryClasses from "@mui/joy/AccordionSummary/accordionSummaryClasses";
import AccordionGroup from "@mui/joy/AccordionGroup";
import Accordion from "@mui/joy/Accordion";
import AccordionDetails from "@mui/joy/AccordionDetails";
import AccordionSummary from "@mui/joy/AccordionSummary";
import Grid from "@mui/joy/Grid";
import Sheet from "@mui/joy/Sheet";

import { ALL_SERVICES } from "@/shared/data";
import { BACKGROUND_COLOUR, TEXT_COLOR } from "@/shared/constants";
import ServiceDetailsCta from "./_components/service-details-cta";
import ServiceCardHome from "@/app/(site)/_components/service-card-home";
import RelatedServices from "./_components/related-services";
import Testimonials from "@/app/(site)/_components/testimonials/testimonials";

export default function ServiceDetailsPage({
  params,
}: {
  params: {
    service_id: string;
    category_id: string;
  };
}) {
  const { service_id, category_id } = params;

  const currentService = ALL_SERVICES.find((service) =>
    service.path.includes(service_id)
  );

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

      <Container
        maxWidth="md"
        sx={{
          my: 10,
        }}
      >
        <Typography
          component="h1"
          sx={{
            mb: 5,
            textAlign: "center",
            maxWidth: 700,
            mx: "auto",
          }}
          fontSize={36}
        >
          {currentService?.pageContent?.title}
        </Typography>

        <Box
          sx={{
            height: 300,
          }}
        >
          {currentService?.image && (
            <Image
              src={currentService?.image}
              alt="serviceImage"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 15,
                objectFit: "cover",
              }}
            />
          )}
        </Box>

        {currentService?.pageContent?.html ? (
          <Box
            dangerouslySetInnerHTML={{
              __html: currentService?.pageContent?.html,
            }}
            sx={{
              lineHeight: 1.8,
              mt: 5,
            }}
          />
        ) : null}

        <ServiceDetailsCta />

        <Typography
          component="h2"
          sx={{
            mt: 10,
            mb: 5,
            textAlign: "center",
            maxWidth: 700,
            mx: "auto",
          }}
          fontSize={36}
        >
          Frequently Asked Questions
        </Typography>

        {currentService?.faqs && currentService.faqs.length > 0 && (
          <AccordionGroup
            variant="outlined"
            transition="0.2s"
            size="lg"
            sx={{
              border: "none",
              [`& .${accordionSummaryClasses.button}`]: {
                bgcolor: "transparent",
                py: 1.2,
              },
              [`& .${accordionSummaryClasses.button}:active`]: {
                bgcolor: "transparent!important",
              },

              [`& .${accordionSummaryClasses.button}:hover`]: {
                bgcolor: "transparent!important",
              },
            }}
          >
            {currentService?.faqs.map((item, index) => (
              <Accordion
                defaultExpanded={index === 0}
                key={item.ques}
                sx={{
                  mb: 1,
                  color: TEXT_COLOR.primary,
                  py: 1,
                }}
              >
                <AccordionSummary
                  sx={{
                    fontWeight: 600,
                    fontSize: "lg",
                    px: 0,
                  }}
                >
                  {item.ques}
                </AccordionSummary>
                <AccordionDetails
                  color="neutral"
                  slotProps={{
                    content: {
                      sx: {
                        px: 0,
                      },
                    },
                  }}
                >
                  <Typography color="neutral" level="body-lg">
                    {item.ans}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </AccordionGroup>
        )}
      </Container>
    </>
  );
}
