import Box from "@mui/joy/Box";
import Container from "@mui/joy/Container";
import Grid from "@mui/joy/Grid";
import Typography from "@mui/joy/Typography";

import { ALL_SERVICES } from "@/shared/data";
import ServiceCard from "./service-card";

export default function ServiceItems() {
  return (
    <Container sx={{ my: 10 }}>
      <Box sx={{ textAlign: "center", mb: 5 }}>
        <Typography
          level="h1"
          component="h2"
          fontSize={42}
          sx={{
            mb: 7,
            textAlign: "center",
          }}
        >
          Comprehensive Safety Services for Your Home
        </Typography>
      </Box>
      <Grid container spacing={3}>
        {ALL_SERVICES.map((service) => (
          <Grid xs={12} sm={6} md={4} key={service.path}>
            <ServiceCard service={service} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
