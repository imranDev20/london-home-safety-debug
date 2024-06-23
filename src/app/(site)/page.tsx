import { Box } from "@mui/joy";
import Hero from "./_components/hero";
import ServiceCategories from "./_components/service-categories";
import Testimonials from "./_components/testimonials/testimonials";
import { Suspense } from "react";

export default function Home() {
  return (
    <Box
      sx={{
        height: 10000,
      }}
    >
      <Hero />
      <ServiceCategories />

      <Testimonials />
    </Box>
  );
}
