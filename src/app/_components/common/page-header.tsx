import Box from "@mui/joy/Box";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import JoyLink from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import Container from "@mui/joy/Container";

import Image from "next/image";
import { PageHeaderProps } from "@/types/props";
import { hexToRgba } from "@/shared/functions";
import Link from "next/link";

export default function PageHeader({
  backgroundImage,
  breadCrumbOptions,
}: PageHeaderProps) {
  const title = breadCrumbOptions.find((item) => item.isCurrentPage)?.label;

  return (
    <Box component="section" sx={{ position: "relative", mt: -8.5 }}>
      <Image
        src={backgroundImage}
        alt="Background"
        sizes="100vw"
        fill
        rel="preload"
        priority
        placeholder="blur"
        style={{ objectFit: "cover" }}
      />
      <Box
        sx={{
          height: "100%",
          position: "relative",
          pt: 19.5,
          pb: 10,
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
        <Container maxWidth="lg">
          <Typography
            sx={{
              position: "relative",
              zIndex: 1,
              textAlign: "center",
              color: "white",
            }}
            component="h1"
            level="h1"
          >
            {title}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Breadcrumbs
              slotProps={{
                ol: {
                  sx: {
                    display: "flex",
                    justifyContent: "center",
                  },
                },
              }}
              sx={{ position: "relative", zIndex: 1, color: "white" }}
            >
              <JoyLink
                href="/"
                component={JoyLink}
                underline="hover"
                sx={{
                  color: "white",
                }}
              >
                Home
              </JoyLink>

              {breadCrumbOptions
                .filter((item) => !item.isCurrentPage)
                .map((val) => (
                  <JoyLink
                    key={val.path}
                    href={val.path}
                    component={JoyLink}
                    underline="hover"
                    sx={{
                      color: "white",
                    }}
                  >
                    {val.label}
                  </JoyLink>
                ))}

              <Typography color="secondary">{title}</Typography>
            </Breadcrumbs>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
