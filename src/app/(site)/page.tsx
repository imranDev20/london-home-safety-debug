import { Box } from "@mui/joy";
import Hero from "./_components/hero";
import ServiceCategories from "./_components/service-categories";
import Testimonials from "./_components/testimonials";

export default function Home() {
  console.log("first");
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
