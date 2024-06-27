import Container from "@mui/joy/Container";
import Grid from "@mui/joy/Grid";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";

import Link from "next/link";

import {
  BACKGROUND_COLOUR,
  PRIMARY_COLOUR,
  SECONDARY_COLOUR,
  TEXT_COLOR,
} from "@/shared/constants";
import { ALL_SERVICES } from "@/shared/data";
import ServiceCardHome from "./service-card-home";

export default function ServicesHome() {
  return (
    <Sheet
      variant="solid"
      sx={{
        py: 15,
        backgroundColor: BACKGROUND_COLOUR.level5,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          level="h1"
          component="h2"
          fontSize={40}
          sx={{
            mb: 10,
            textAlign: "center",
          }}
        >
          Comprehensive Home Safety Services
        </Typography>
        <Grid container spacing={5}>
          {ALL_SERVICES.map((item) => (
            <Grid xs={12} md={4} key={item.path}>
              <ServiceCardHome item={item} />
            </Grid>
          ))}
        </Grid>

        <Stack
          direction="row"
          justifyContent="center"
          spacing={3}
          sx={{
            mt: 10,
          }}
        >
          <Button
            variant="solid"
            href="/book-now/"
            component={Link}
            size="lg"
            sx={{
              backgroundColor: SECONDARY_COLOUR[500],
              color: TEXT_COLOR.primary,
              ":hover": {
                backgroundColor: TEXT_COLOR.primary,
                color: "white",
              },
            }}
          >
            Book Now
          </Button>

          <Button
            variant="solid"
            href="/services/"
            component={Link}
            size="lg"
            sx={{
              backgroundColor: PRIMARY_COLOUR[500],
              color: "white",
              ":hover": {
                backgroundColor: SECONDARY_COLOUR[500],
                color: TEXT_COLOR.primary,
              },
            }}
          >
            Browse all Services
          </Button>
        </Stack>
      </Container>
    </Sheet>
  );
}
