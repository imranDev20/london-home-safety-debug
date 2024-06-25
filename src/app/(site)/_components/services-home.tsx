import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Container from "@mui/joy/Container";
import Grid from "@mui/joy/Grid";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import JoyLink from "@mui/joy/Link";
import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";

import Link from "next/link";
import { hexToRgba } from "@/shared/functions";

import Image from "next/image";
import backgroundImage from "@/images/about-bg.jpeg";

import {
  BACKGROUND_COLOUR,
  PRIMARY_COLOUR,
  SECONDARY_COLOUR,
  TEXT_COLOR,
} from "@/shared/constants";
import { ALL_SERVICES } from "@/shared/data";

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
              <Card
                variant="plain"
                component={Link}
                href={`/categories${item.categoryPath}${item.path}`}
                sx={{
                  textDecoration: "none",
                  transition: ".3s ease-in-out",
                  borderRadius: "lg",
                  backgroundColor: "white",
                  overflow: "hidden",
                  position: "relative",
                  boxShadow: "md",
                  p: 0,

                  ".MuiCardContent-root": {
                    backgroundColor: "white",
                    transition: "500ms all",
                  },
                  ":hover": {
                    ".MuiCardContent-root": {
                      backgroundColor: hexToRgba(PRIMARY_COLOUR[500], 0.7),
                    },
                    ".MuiSvgIcon-root": {
                      color: "white",
                      fontSize: 100,
                    },
                  },
                }}
              >
                <Image
                  src={backgroundImage}
                  alt="Background"
                  sizes="100vw"
                  fill
                  loading="lazy"
                  placeholder="blur"
                  style={{
                    objectFit: "cover",
                    transition: "100ms all ease-in-out",
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      height: 250,
                    }}
                  >
                    {item.Icon && (
                      <item.Icon
                        sx={{
                          fontSize: 65,
                          color: TEXT_COLOR.primary,
                          transition: "150ms ease",
                        }}
                      />
                    )}
                  </Box>
                </CardContent>
              </Card>

              <JoyLink
                underline="none"
                component={Link}
                href={`/categories${item.categoryPath}${item.path}`}
                sx={{
                  color: TEXT_COLOR.primary,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  ":hover": {
                    color: PRIMARY_COLOUR[500],
                    transition: "0.3s ease",
                  },
                }}
              >
                <Typography
                  sx={{
                    textAlign: "center",
                    mt: 2,
                    fontWeight: 600,
                    fontSize: 26,
                  }}
                >
                  {item.label}
                </Typography>
              </JoyLink>
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
