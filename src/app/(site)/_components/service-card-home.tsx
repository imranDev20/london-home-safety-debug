import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import JoyLink from "@mui/joy/Link";
import Link from "next/link";
import { NavLeafItem } from "@/types/misc";
import Image from "next/image";
import { PRIMARY_COLOUR, TEXT_COLOR } from "@/shared/constants";
import { hexToRgba } from "@/shared/functions";
import backgroundImage from "@/images/about-bg.jpeg";

export default function ServiceCardHome({ item }: { item: NavLeafItem }) {
  return (
    <>
      <Card
        variant="plain"
        component={Link}
        href={`/services${item.categoryPath}${item.path}`}
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
        href={`/services${item.categoryPath}${item.path}`}
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
    </>
  );
}
