import React from "react";
import Email from "@mui/icons-material/Email";
import Facebook from "@mui/icons-material/Facebook";
import Instagram from "@mui/icons-material/Instagram";
import Phone from "@mui/icons-material/Phone";
import WhatsApp from "@mui/icons-material/WhatsApp";
import X from "@mui/icons-material/X";
import Box from "@mui/joy/Box";
import Container from "@mui/joy/Container";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import { PRIMARY_COLOUR, SECONDARY_COLOUR } from "@/shared/constants";

const Topbar = () => {
  return (
    <Box
      sx={{
        display: {
          xs: "none",
          md: "block",
        },

        backgroundColor: PRIMARY_COLOUR[500],
      }}
    >
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Stack
          sx={{
            gap: 4,
          }}
          direction="row"
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              py: 1.5,
            }}
          >
            <WhatsApp
              sx={{
                mr: 1,
                fontWeight: 30,
                color: SECONDARY_COLOUR[500],
              }}
            />
            <Typography
              level="body-md"
              sx={{
                fontWeight: 600,
                color: "white",
              }}
            >
              07480 062995
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Phone
              sx={{
                mr: 1,
                fontWeight: 30,
                color: SECONDARY_COLOUR[500],
              }}
            />
            <Typography
              level="body-md"
              sx={{
                fontWeight: 600,
                color: "white",
              }}
            >
              0191 743 1448
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Email
              sx={{
                mr: 1,
                fontWeight: 30,
                color: SECONDARY_COLOUR[500],
              }}
            />
            <Typography
              level="body-md"
              sx={{
                fontWeight: 600,
                color: "white",
              }}
            >
              info@homesafetylondon.co.uk
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" alignItems="center" gap={5}>
          <Stack direction="row" alignItems="center" gap={1}>
            <Facebook
              sx={{
                color: SECONDARY_COLOUR[500],
              }}
            />
            <Instagram
              sx={{
                color: SECONDARY_COLOUR[500],
              }}
            />
            <X
              fontSize="inherit"
              sx={{
                color: SECONDARY_COLOUR[500],
                fontSize: 20,
              }}
            />
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Topbar;
