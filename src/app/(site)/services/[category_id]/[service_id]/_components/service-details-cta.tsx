import Container from "@mui/joy/Container";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import JoyLink from "@mui/joy/Link";
import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";

import backgroundImage from "@/images/about-bg.jpeg";

import Image from "next/image";
import { hexToRgba, toTitleCase } from "@/shared/functions";
import {
  PRIMARY_COLOUR,
  SECONDARY_COLOUR,
  TEXT_COLOR,
} from "@/shared/constants";
import Link from "next/link";
import { PHONE_NO } from "@/shared/data";

export default function ServiceDetailsCta() {
  return (
    <Container
      maxWidth="md"
      disableGutters
      sx={{
        overflow: "none",
        position: "relative",
        my: 10,
      }}
    >
      <Box
        sx={{
          height: "100%",
          position: "relative",
          py: 10,
          backgroundColor: TEXT_COLOR.primary,
          borderRadius: "lg",
          textAlign: "center",
          p: 5,
        }}
      >
        <Typography
          level="h2"
          component="h2"
          fontWeight={700}
          sx={{ fontSize: 40, color: "white", mb: 3 }}
        >
          {toTitleCase("Take the First Step Towards Safety")}
        </Typography>
        <Typography
          level="body-lg"
          sx={{
            color: "white",
          }}
        >
          Book your desired service today and experience the peace of mind that
          comes with a safe and secure home. Visit our services page to find out
          more and schedule an appointment.
        </Typography>

        <Stack
          direction="row"
          justifyContent="center"
          spacing={3}
          sx={{
            mt: 5,
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
                backgroundColor: "white",
                color: TEXT_COLOR.primary,
              },
            }}
          >
            Book an Appointment
          </Button>

          <Button
            variant="solid"
            href={`tel:${PHONE_NO}`}
            component={JoyLink}
            underline="none"
            size="lg"
            sx={{
              backgroundColor: "white",
              color: TEXT_COLOR.primary,
              ":hover": {
                backgroundColor: SECONDARY_COLOUR[500],
                color: TEXT_COLOR.primary,
              },
            }}
          >
            Call: 020 8146 6698
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
