import {
  AspectRatio,
  Button,
  Card,
  CardContent,
  CardOverflow,
  Container,
  Grid,
  Typography,
  Link as JoyLink,
  Box,
  Sheet,
} from "@mui/joy";
import Image from "next/image";
import Link from "next/link";
import {
  BACKGROUND_COLOUR,
  PRIMARY_COLOUR,
  SECONDARY_COLOUR,
  TEXT_COLOR,
} from "@/shared/constants";
import { ALL_SERVICES } from "@/shared/data";

function convertToNormalText(str: string): string {
  return str
    .split("-") // Split the string by hyphens
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
    .join(" "); // Join the words back together with spaces
}

export default function CategoryServices({ category }: { category: string }) {
  const services = ALL_SERVICES.filter((item) =>
    item.categoryPath?.includes(category)
  );

  return (
    <Sheet
      sx={{
        py: 10,
        pb: 15,
        backgroundColor: BACKGROUND_COLOUR.level5,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          component="h2"
          sx={{
            mb: 5,
            textAlign: "center",
          }}
          fontSize={36}
        >
          Expert {convertToNormalText(category)} for Peace of Mind
        </Typography>

        <Grid container spacing={3}>
          {services.map((item) => (
            <Grid md={4} key={item.path}>
              <Card
                variant="plain"
                sx={{
                  transition: "0.3s ease all",
                  borderRadius: "lg",
                  backgroundColor: "white",
                  boxShadow: "md",
                }}
              >
                <CardOverflow>
                  <AspectRatio ratio="2">
                    {item.image && (
                      <Image
                        src={item.image}
                        objectFit="cover"
                        alt="serviceImage"
                        style={{ width: "100%", height: "100%" }}
                      />
                    )}
                  </AspectRatio>
                </CardOverflow>

                <CardContent
                  sx={{
                    p: 2,
                  }}
                >
                  <Typography
                    level="h3"
                    component="h3"
                    sx={{
                      mb: 1,
                      ":hover": {
                        color: PRIMARY_COLOUR[500],
                      },
                    }}
                  >
                    {item.label}
                  </Typography>

                  <Typography
                    level="body-md"
                    sx={{
                      my: 1,
                      // textAlign: "justify",
                    }}
                    color="neutral"
                  >
                    {item.description}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mt: 2,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 13,
                          textAlign: "center",
                          mr: 2,
                          fontWeight: 500,
                          lineHeight: 1,
                        }}
                      >
                        Starts
                        <br />
                        From
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 30,
                          textAlign: "center",
                          fontWeight: 600,
                          position: "relative",
                        }}
                        color="primary"
                      >
                        £180
                      </Typography>
                    </Box>
                    <Button
                      variant="solid"
                      component={Link}
                      href={`/services${item.categoryPath}${item.path}`}
                      sx={{
                        backgroundColor: SECONDARY_COLOUR[500],
                        color: TEXT_COLOR.primary,

                        ":hover": {
                          backgroundColor: TEXT_COLOR.primary,
                          color: "white",
                        },
                      }}
                    >
                      Find Out More
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Sheet>
  );
}
