import Image from "next/image";
import Link from "next/link";

import Grid from "@mui/joy/Grid";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import Button from "@mui/joy/Button";

import backgroundImage from "@/images/about-bg.jpeg";
import DotIcon from "@/app/_components/icons/dot-icon";
import EastIcon from "@mui/icons-material/East";

import { SECONDARY_COLOUR, TEXT_COLOR } from "@/shared/constants";

import { NavLeafItem } from "@/types/misc";

export default function CategoryServiceDetails({
  service,
  index,
}: {
  service: NavLeafItem;
  index: number;
}) {
  return (
    <Grid
      container
      spacing={5}
      direction={index % 2 === 0 ? "row" : "row-reverse"}
      sx={{
        my: 5,
      }}
    >
      <Grid xs={12} md={6}>
        <Box
          sx={{
            position: "relative",
          }}
        >
          <Image
            src={backgroundImage}
            alt="serviceImage"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 15,
              objectFit: "cover",
            }}
          />
        </Box>
      </Grid>
      <Grid xs={12} md={6}>
        <Typography
          component="h2"
          fontSize={28}
          sx={{
            mb: 3,
          }}
        >
          {service.label}
        </Typography>

        <Typography
          color="neutral"
          sx={{
            lineHeight: 1.9,
            mx: "auto",
            mt: 1,
            mb: 3,
          }}
        >
          {service.detailedDesc?.details}
        </Typography>

        <Stack spacing={1}>
          {service.detailedDesc?.points.map((point) => (
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
              }}
              key={point}
              level="body-lg"
            >
              <DotIcon />
              <Typography
                sx={{
                  ml: 1,
                }}
              >
                {point}
              </Typography>
            </Typography>
          ))}
        </Stack>

        <Button
          variant="plain"
          component={Link}
          href={`/services${service.categoryPath}${service.path}`}
          sx={{
            mt: 3,
            // backgroundColor: SECONDARY_COLOUR[500],
            // color: TEXT_COLOR.primary,

            // ":hover": {
            //   backgroundColor: TEXT_COLOR.primary,
            //   color: "white",
            // },
          }}
          endDecorator={
            <EastIcon
              fontSize="inherit"
              sx={{
                fontSize: 20,
              }}
            />
          }
        >
          Learn More
        </Button>
      </Grid>
    </Grid>
  );
}
