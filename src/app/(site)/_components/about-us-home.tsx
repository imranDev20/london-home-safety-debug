import React from "react";

import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Container from "@mui/joy/Container";
import Grid from "@mui/joy/Grid";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import JoyLink from "@mui/joy/Link";
import Divider from "@mui/joy/Divider";

import { hexToRgba } from "@/shared/functions";
import Link from "next/link";
import { SECONDARY_COLOUR, TEXT_COLOR } from "@/shared/constants";
import { PhoneOutlined } from "@mui/icons-material";
import Image from "next/image";
import BackgroundImage from "@/images/hero-image-new.jpeg";
import { PHONE_NO } from "@/shared/data";
import DotIcon from "@/app/_components/icons/dot-icon";

const ABOUT_FEATURE_POINTS = [
  { text: "Highly skilled and certified experts." },
  { text: "Wide range of electrical, gas, fire, and health safety services." },
  { text: "Top-quality service prioritizing safety and satisfaction." },
  { text: "Deep understanding of London's local needs and regulations." },
  { text: "Trusted by homeowners for reliability and professionalism." },
];

export default function AboutUsHome() {
  return (
    <Container sx={{ my: 15 }} id="about">
      <Grid
        container
        spacing={{
          xs: 0,
          md: 5,
          lg: 10,
        }}
      >
        <Grid
          xs={12}
          md={7}
          sx={{
            position: "relative",
          }}
        >
          <Stack
            spacing={3}
            direction="row"
            sx={{
              position: "sticky",
              top: 70,
            }}
          >
            <Box
              sx={{
                position: "relative",
                py: 3,
              }}
            >
              <Image
                src={BackgroundImage}
                alt="serviceImage"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 15,
                  objectFit: "cover",
                }}
              />
            </Box>

            <Stack spacing={3}>
              <Box
                sx={{
                  position: "relative",
                }}
              >
                <Image
                  src={BackgroundImage}
                  alt="serviceImage"
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 15,
                    objectFit: "cover",
                  }}
                />
              </Box>

              <Box
                sx={{
                  position: "relative",
                }}
              >
                <Image
                  src={BackgroundImage}
                  alt="serviceImage"
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 15,
                    objectFit: "cover",
                  }}
                />
              </Box>
            </Stack>

            <Box
              sx={{
                backgroundColor: "white",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                p: 5,
              }}
            >
              TrustPilot
            </Box>
          </Stack>
        </Grid>
        <Grid xs={12} md={5}>
          <Box>
            <Typography
              component="h2"
              sx={{
                mb: 2,
              }}
              fontSize={36}
            >
              About London Home Safety Limited
            </Typography>
            <Typography
              color="neutral"
              sx={{
                lineHeight: 1.9,
                my: 3,
              }}
            >
              At London Home Safety Limited, we are dedicated to safeguarding
              homes across London with our premier safety solutions. With years
              of experience and a team of certified professionals, we provide
              reliable and comprehensive services to ensure the safety and
              well-being of your home. Our commitment to excellence and customer
              satisfaction sets us apart as the trusted choice for home safety
              in London.
            </Typography>

            <Stack
              spacing={3}
              sx={{
                my: 4,
              }}
            >
              {ABOUT_FEATURE_POINTS.map((cat) => (
                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                  key={cat.text}
                  level="body-lg"
                >
                  <DotIcon />
                  <Typography
                    sx={{
                      ml: 1,
                    }}
                  >
                    {cat.text}
                  </Typography>
                </Typography>
              ))}
            </Stack>

            <Divider
              sx={{
                my: 4,
              }}
            />

            <Stack
              direction="row"
              spacing={4}
              sx={{
                mt: 3,
              }}
            >
              <Button
                variant="solid"
                size="lg"
                component={Link}
                href="/about"
                sx={{
                  ":hover": {
                    backgroundColor: SECONDARY_COLOUR[500],
                    color: TEXT_COLOR.primary,
                  },
                }}
              >
                More About Us
              </Button>

              <Stack direction="row" alignItems="center">
                <PhoneOutlined
                  sx={{
                    mr: 1,
                    fontSize: 40,
                  }}
                />
                <Box>
                  <Typography
                    sx={{
                      fontSize: 14,
                    }}
                  >
                    Call Us Anytime
                  </Typography>
                  <JoyLink
                    fontWeight={600}
                    sx={{
                      fontSize: 20,
                      color: TEXT_COLOR.primary,
                    }}
                    href={`tel:${PHONE_NO}`}
                  >
                    {PHONE_NO}
                  </JoyLink>
                </Box>
              </Stack>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
