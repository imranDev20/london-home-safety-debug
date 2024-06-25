import ContactUsForm from "@/app/_components/common/contact-us-form";
import { PHONE_NO, WORKING_HOURS } from "@/shared/data";
import { Phone } from "@mui/icons-material";

import Box from "@mui/joy/Box";
import Container from "@mui/joy/Container";
import Divider from "@mui/joy/Divider";
import Grid from "@mui/joy/Grid";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import JoyLink from "@mui/joy/Link";

import Image from "next/image";
import ContactUsImage from "@/images/home/home-contact-image.jpeg";
import {
  BACKGROUND_COLOUR,
  PRIMARY_COLOUR,
  TEXT_COLOR,
} from "@/shared/constants";
import React from "react";

const Contact = () => {
  return (
    <Sheet
      variant="soft"
      id="contact"
      sx={{
        backgroundColor: BACKGROUND_COLOUR.level5,
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          py: 15,
        }}
      >
        <Typography
          level="h1"
          component="h2"
          fontSize={42}
          sx={{
            mb: 10,
            textAlign: "center",
          }}
        >
          Get in Touch with London&apos;s Home Safety Experts
        </Typography>
        <Grid
          container
          sx={{
            borderRadius: "lg",
            overflow: "hidden",
            boxShadow: "lg",
          }}
        >
          <Grid xs={12} lg={3}>
            <Box
              sx={{
                position: "relative",
                height: "100%",
              }}
            >
              <Image
                src={ContactUsImage}
                alt="serviceImage"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>
          </Grid>
          <Grid xs={12} md={6} lg={4}>
            <Sheet
              variant="plain"
              sx={{
                p: 5,
                backgroundColor: "white",
                height: "100%",
              }}
            >
              <Typography level="h4">Working Hours:</Typography>
              <Stack
                spacing={2}
                sx={{
                  mt: 3,
                }}
              >
                {WORKING_HOURS.map((item) => (
                  <React.Fragment key={item.dayOfWeek}>
                    <Stack justifyContent="space-between" direction="row">
                      <Typography
                        sx={{
                          fontWeight: 500,
                        }}
                      >
                        {item.dayOfWeek}:
                      </Typography>
                      <Typography>{`${item.start} - ${item.end}`}</Typography>
                    </Stack>
                    <Divider />
                  </React.Fragment>
                ))}
              </Stack>

              <Box
                sx={{
                  mt: 3,
                  display: "flex",
                }}
              >
                <Typography
                  component="span"
                  fontWeight={600}
                  color="primary"
                  sx={{
                    mr: 2,
                    display: "flex",
                  }}
                >
                  <Phone
                    sx={{
                      mr: 1,
                    }}
                  />
                  Need Help?
                </Typography>
                <JoyLink
                  component="span"
                  fontWeight={600}
                  underline="hover"
                  sx={{
                    color: TEXT_COLOR.primary,
                  }}
                >
                  {PHONE_NO}
                </JoyLink>
              </Box>
            </Sheet>
          </Grid>
          <Grid xs={12} md={6} lg={5}>
            <Box
              sx={{
                p: 5,
                backgroundColor: PRIMARY_COLOUR[500],
                height: "100%",
              }}
              id="contact-us-form"
            >
              <Typography
                level="h1"
                component="h2"
                fontSize={40}
                sx={{
                  mb: 5,
                  textAlign: "center",
                  color: "white",
                }}
              >
                Contact Us
              </Typography>

              <ContactUsForm />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Sheet>
  );
};

export default Contact;
