import Box from "@mui/joy/Box";
import Container from "@mui/joy/Container";
import Grid from "@mui/joy/Grid";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";

import Counter from "./counter";
import Image from "next/image";
import ImageOne from "@/images/why-us.jpeg";
import { hexToRgba } from "@/shared/functions";
import { SECONDARY_COLOUR } from "@/shared/constants";

export default function Achievements() {
  return (
    <Sheet
      variant="plain"
      sx={{
        backgroundColor: "white",
      }}
    >
      <Container sx={{ my: 20 }}>
        <Grid container spacing={10}>
          <Grid md={5}>
            <Typography
              sx={{
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: 2,
                mb: 1,
              }}
              color="primary"
            >
              Why choose us
            </Typography>
            <Typography
              component="h2"
              sx={{
                mb: 2,
              }}
              fontSize={36}
            >
              Reliable & Professional Maintenance Work
            </Typography>
            <Typography
              color="neutral"
              sx={{
                lineHeight: 1.8,
                my: 3,
              }}
            >
              Mauris ac risus sed quam semper auctor. Nam tempus volutpat ipsum,
              non viverra odio mollis mollis. Integer lacus ligula, imperdiet
              vel massa in, maximus suscipit turpis. Mauris ac risus sed quam
              semper auctor. Nam tempus volutpat ipsum, non viverra
            </Typography>
            <Stack
              direction="row"
              spacing={10}
              sx={{
                mb: 4,
              }}
            >
              <Counter end={100} duration={2000} />
              <Counter end={100} duration={2000} />
            </Stack>
            <Stack direction="row" spacing={10}>
              <Counter end={100} duration={2000} />
              <Counter end={100} duration={2000} />
            </Stack>
          </Grid>

          <Grid xs={12} md={7}>
            <Box
              sx={{
                position: "sticky",
                top: 120,
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  maxWidth: 350,
                }}
              >
                <Image
                  src={ImageOne}
                  objectFit="cover"
                  alt="serviceImage"
                  style={{ width: "100%", height: "100%", borderRadius: 15 }}
                />
              </Box>

              <Box
                sx={{
                  position: "absolute",
                  maxWidth: 400,
                  top: "60%",
                  left: "60%",
                  transform: "translate(-50%, -50%)",
                  padding: "10px",
                  backgroundColor: "white",
                  borderRadius: 15,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  src={ImageOne}
                  objectFit="cover"
                  alt="serviceImage"
                  style={{ width: "100%", height: "100%", borderRadius: 10 }}
                />
              </Box>

              <Box
                sx={{
                  width: "400px",
                  backgroundColor: "transparent",
                  height: "600px",
                  position: "absolute",
                  top: -40,
                  right: 0,
                  borderRadius: "xl",
                  border: "10px solid",
                  borderColor: hexToRgba(SECONDARY_COLOUR[500], 0.4),
                  zIndex: -1,
                }}
              ></Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Sheet>
  );
}
