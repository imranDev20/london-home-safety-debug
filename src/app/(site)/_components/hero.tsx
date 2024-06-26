import React from "react";
import Image from "next/image";

import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Container from "@mui/joy/Container";
import Grid from "@mui/joy/Grid";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import PhoneIcon from "@mui/icons-material/Phone";

import BackgroundImage from "@/images/hero-image-new.jpeg";
import { hexToRgba } from "@/shared/functions";
import { SECONDARY_COLOUR, TEXT_COLOR } from "@/shared/constants";
import BookNow from "./book-now";
import { PHONE_NO } from "@/shared/data";

export default function Hero() {
  return (
    <Box
      id="hero"
      component="section"
      sx={{
        position: "relative",
        mt: {
          xs: -9.5,
          md: -8.5,
        },
      }}
    >
      <Image
        src={BackgroundImage}
        alt="London Home Safety Hero Background"
        fill
        priority
        style={{ objectFit: "cover" }}
        placeholder="blur"
        quality={30}
        rel="preload"
        sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw" //
      />

      <Box
        sx={{
          height: "100%",
          position: "relative",
          pt: 25,
          pb: 20,
          "&::before": {
            content: '""',
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            backgroundColor: hexToRgba("#062C64", 0.9),
            mixBlendMode: "multiply",
          },
        }}
      >
        <Container>
          <Grid container spacing={5}>
            <Grid xs={12} sm={12} md={8}>
              <Box sx={{ position: "relative" }}>
                <Grid
                  container
                  spacing={3}
                  sx={{ textAlign: { xs: "center", md: "left" } }}
                >
                  <Box>
                    <Typography
                      component="h1"
                      sx={{
                        fontWeight: 800,
                        fontSize: { xs: 30, sm: 35, md: 50 },
                        color: "white",
                        mb: 3,
                      }}
                    >
                      Safeguarding London&apos;s{" "}
                      <Typography
                        sx={{
                          color: SECONDARY_COLOUR[600],
                        }}
                        component="span"
                      >
                        Homes
                      </Typography>{" "}
                      with Premier{" "}
                      <Typography
                        sx={{
                          color: SECONDARY_COLOUR[600],
                        }}
                        component="span"
                      >
                        Safety
                      </Typography>{" "}
                      Solutions
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: { xs: 15, sm: 16, md: 20 },
                        color: "white",
                      }}
                    >
                      Welcome to London Home Safety Limited, your trusted
                      partner for comprehensive safety solutions in the heart of
                      London. With years of experience and a team of certified
                      professionals, we provide top-notch services to ensure the
                      safety and well-being of your home.
                    </Typography>

                    <Stack
                      spacing={2}
                      direction="row"
                      sx={{
                        mt: 5,
                        display: { xs: "flex", md: "block" },
                        justifyContent: { xs: "center", md: "start" },
                      }}
                    >
                      <Button
                        size="lg"
                        startDecorator={<PhoneIcon />}
                        variant="solid"
                        component="a"
                        href={`tel:${PHONE_NO}`}
                        aria-label={`Call us at ${PHONE_NO}`}
                        sx={{
                          backgroundColor: SECONDARY_COLOUR[500],
                          color: TEXT_COLOR.primary,

                          ":hover": {
                            backgroundColor: "white",
                          },
                        }}
                      >
                        {PHONE_NO}
                      </Button>
                    </Stack>
                  </Box>
                </Grid>
              </Box>
            </Grid>
            <Grid xs={12} sm={12} md={4} sx={{ mt: { xs: 3, md: 0 } }}>
              <BookNow />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
