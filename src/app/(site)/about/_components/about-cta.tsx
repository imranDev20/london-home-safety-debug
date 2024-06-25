import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";

import Link from "next/link";
import { hexToRgba, toTitleCase } from "@/shared/functions";
import Image from "next/image";
import backgroundImage from "@/images/about-bg.jpeg";
import { PRIMARY_COLOUR } from "@/shared/constants";

export default function AboutCallToAction() {
  return (
    <Box component="section" sx={{ position: "relative" }}>
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
          pt: 10,
          pb: 10,
          "&::before": {
            content: '""',
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            backgroundColor: hexToRgba(PRIMARY_COLOUR[600], 0.9),
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
            fontWeight={800}
            sx={{ fontSize: 56, color: "white", mb: 3 }}
          >
            {toTitleCase("How can we help you?")}
          </Typography>
          <Typography
            level="body-lg"
            sx={{
              color: "white",
            }}
          >
            London Home Safety collaborates with vetted professionals who are
            registered with official UK bodies. Our tradespeople are highly
            skilled and experienced in their respective fields. We value
            customer feedback to ensure the best hassle-free experience for you.
          </Typography>
          <Button
            variant="solid"
            color="secondary"
            href="/book-now/"
            component={Link}
            size="lg"
            sx={{
              mt: 3,
            }}
          >
            Book Now
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
