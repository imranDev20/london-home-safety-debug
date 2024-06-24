import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import JoyLink from "@mui/joy/Link";

import Link from "next/link";
import { hexToRgba, toTitleCase } from "@/shared/functions";
import Image from "next/image";
import backgroundImage from "@/images/about-bg.jpeg";

import {
  PRIMARY_COLOUR,
  SECONDARY_COLOUR,
  TEXT_COLOR,
} from "@/shared/constants";
import { PHONE_NO } from "@/shared/data";

export default function CallToAction() {
  return (
    <Box component="section" sx={{ position: "relative", mt: 15 }}>
      <Image
        src={backgroundImage}
        alt="Background"
        sizes="100vw"
        fill
        loading="lazy"
        placeholder="blur"
        style={{ objectFit: "cover" }}
      />
      <Box
        sx={{
          height: "100%",
          position: "relative",
          py: 15,
          "&::before": {
            content: '""',
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            backgroundColor: hexToRgba(PRIMARY_COLOUR[600], 0.8),
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            zIndex: 10,
            textAlign: "center",
            maxWidth: 900,
            px: 5,
            mx: "auto",
          }}
        >
          <Typography
            level="h2"
            component="h2"
            fontWeight={700}
            sx={{ fontSize: 58, color: "white", mb: 3 }}
          >
            {toTitleCase("Take the First Step Towards Safety")}
          </Typography>
          <Typography
            level="body-lg"
            sx={{
              color: "white",
            }}
          >
            Book your desired service today and experience the peace of mind
            that comes with a safe and secure home. Visit our services page to
            find out more and schedule an appointment.
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
                backgroundColor: TEXT_COLOR.primary,
                ":hover": {
                  backgroundColor: SECONDARY_COLOUR[500],
                  color: TEXT_COLOR.primary,
                },
              }}
            >
              Book Now
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
              Call Now
            </Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
