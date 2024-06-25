import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import HomeIcon from "@mui/icons-material/Home";
import TextsmsIcon from "@mui/icons-material/Textsms";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import JoyLink from "@mui/joy/Link";
import Link from "next/link";
import React from "react";
import { TEXT_COLOR } from "@/shared/constants";

export default function BookNow() {
  return (
    <Card
      variant="solid"
      color="primary"
      sx={{
        borderRadius: "lg",
      }}
    >
      <CardContent>
        <Typography
          level="h2"
          sx={{
            color: "white",
            textAlign: "center",
          }}
        >
          Book Now
        </Typography>

        <Typography
          sx={{
            color: "white",
            textAlign: "center",
          }}
        >
          Secure your home&apos;s safety with our expert services. Book now!
        </Typography>

        <Stack
          spacing={2}
          sx={{
            mt: 3,
          }}
        >
          <Button
            startDecorator={<HomeIcon />}
            size="lg"
            component={Link}
            sx={{
              border: "1px solid white",

              ":hover": {
                backgroundColor: "white",
                color: TEXT_COLOR.primary,
              },
            }}
            href="/book-now?property_type=residential"
          >
            Residential Property
          </Button>
          <Button
            startDecorator={<CorporateFareIcon />}
            size="lg"
            component={Link}
            sx={{
              border: "1px solid white",

              ":hover": {
                backgroundColor: "white",
                color: TEXT_COLOR.primary,
              },
            }}
            href="/book-now?property_type=commercial"
          >
            Commercial Property
          </Button>

          <Button
            startDecorator={<TextsmsIcon />}
            size="lg"
            color="secondary"
            component={JoyLink}
            href="#contact-us-form"
            underline="none"
            sx={{
              ":hover": {
                backgroundColor: TEXT_COLOR.primary,
                color: "white",
              },
            }}
          >
            Request a Quote
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
