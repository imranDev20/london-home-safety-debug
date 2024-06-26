import { ALL_SERVICES } from "@/shared/data";
import { kebabCaseToNormalText } from "@/shared/functions";

import Typography from "@mui/joy/Typography";
import Container from "@mui/joy/Container";
import Box from "@mui/joy/Box";

import CategoryServiceDetails from "./category-service-details";
import { PRIMARY_COLOUR } from "@/shared/constants";

export default function AboutCategory({ category }: { category: string }) {
  const services = ALL_SERVICES.filter((item) =>
    item.categoryPath?.includes(category)
  );

  return (
    <Container
      maxWidth="lg"
      component="section"
      sx={{
        my: 10,
      }}
    >
      <Typography
        component="h2"
        sx={{
          textAlign: "center",
        }}
        fontSize={36}
      >
        About {kebabCaseToNormalText(category)}
      </Typography>

      <Typography
        color="neutral"
        sx={{
          lineHeight: 1.9,
          maxWidth: 900,
          textAlign: "center",
          mx: "auto",
          mt: 1,
          mb: 7,
        }}
      >
        <Box
          component="span"
          sx={{
            textTransform: "capitalize",
            color: PRIMARY_COLOUR[500],
            fontWeight: 600,
          }}
        >
          {category.split("-")[0]} safety
        </Box>{" "}
        is a critical aspect of maintaining a secure and efficient environment,
        whether at home or in a commercial setting. At London Home Safety
        Limited, we offer a comprehensive range of{" "}
        <Box
          component="span"
          sx={{
            fontWeight: 600,
            color: PRIMARY_COLOUR[500],
          }}
        >
          {kebabCaseToNormalText(category)}
        </Box>{" "}
        designed to meet all your needs and ensure your property is safe and
        compliant with current regulations.
      </Typography>

      {services.map((service, index) => (
        <CategoryServiceDetails
          key={service.path}
          service={service}
          index={index}
        />
      ))}
    </Container>
  );
}
