import Container from "@mui/joy/Container";
import Grid from "@mui/joy/Grid";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";

import React from "react";

import ServiceCategoryCard from "./service-category-card";

import { BACKGROUND_COLOUR } from "@/shared/constants";
import { NAV_ITEMS } from "@/shared/data";

export default function ServiceCategories() {
  return (
    <Sheet
      component="section"
      variant="soft"
      sx={{
        backgroundColor: BACKGROUND_COLOUR.level5,
      }}
      id="categories"
    >
      <Container
        maxWidth="lg"
        sx={{
          py: 15,
        }}
      >
        <Typography
          level="h1"
          component="h2"
          fontSize={42}
          sx={{
            mb: 5,
            textAlign: "center",
          }}
        >
          Discover Our Wide Range of Safety Solutions
        </Typography>
        <Grid
          container
          spacing={4}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {NAV_ITEMS.find((item) => item.label === "Services")?.children?.map(
            (service) => (
              <Grid xs={12} sm={6} md={6} key={service.path}>
                <ServiceCategoryCard service={service} />
              </Grid>
            )
          )}
        </Grid>
      </Container>
    </Sheet>
  );
}
