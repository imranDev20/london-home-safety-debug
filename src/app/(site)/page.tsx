import { Box } from "@mui/joy";
import Hero from "./_components/hero";
import ServiceCategories from "./_components/service-categories";

export default function Home() {
  return (
    <Box
      sx={{
        height: 10000,
      }}
    >
      <Hero />
      <ServiceCategories />
    </Box>
  );
}
