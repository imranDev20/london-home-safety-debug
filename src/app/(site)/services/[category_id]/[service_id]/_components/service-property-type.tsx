import Grid from "@mui/joy/Grid";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import Divider from "@mui/joy/Divider";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Button from "@mui/joy/Button";
import Container from "@mui/joy/Container";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {
  BACKGROUND_COLOUR,
  PRIMARY_COLOUR,
  SECONDARY_COLOUR,
  TEXT_COLOR,
} from "@/shared/constants";
import HomeUndrawIcon from "@/app/_components/icons/home-undraw-icon";
import { ALL_SERVICES } from "@/shared/data";
import Link from "next/link";

export default function ServicePropertyType({
  categoryId,
  serviceId,
}: {
  categoryId: string;
  serviceId: string;
}) {
  const currentService = ALL_SERVICES.find((service) =>
    service.path.includes(serviceId)
  );

  const propertyTypePriceDetails = currentService?.pricingDetails;

  return (
    <Sheet
      sx={{
        backgroundColor: BACKGROUND_COLOUR.level5,
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          py: 10,
        }}
      >
        <Typography
          component="h2"
          sx={{
            mb: 5,
            textAlign: "center",
          }}
          fontSize={36}
        ></Typography>
        <Grid
          container
          spacing={0}
          sx={{ borderRadius: "lg", overflow: "hidden", boxShadow: "lg" }}
        >
          {propertyTypePriceDetails &&
            propertyTypePriceDetails.map((item) => {
              const simplifiedPricesArray = simplifyPrices(
                item.unit,
                item.prices
              );

              return (
                <Grid xs={12} sm={12} md={6} key={item.type}>
                  <Sheet
                    sx={{
                      borderRight: "1px solid",
                      borderRightColor: "var(--joy-palette-divider)",
                      height: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        px: 3,
                        pt: 2,
                        pb: 1,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {
                          <item.Icon
                            style={{
                              width: "300px",
                              height: "200px",
                            }}
                          />
                        }

                        <Typography
                          component="h3"
                          level="h2"
                          sx={{
                            mb: 0.5,
                            mt: 4,
                          }}
                        >
                          {item.type}{" "}
                          {currentService.abbr || currentService.label}
                        </Typography>
                        <Typography level="body-md" color="neutral">
                          Ensure your home&apos;s electrical installations are
                          safe and compliant.
                        </Typography>

                        <Button
                          href="/book-now"
                          component={Link}
                          sx={{
                            my: 2,
                            backgroundColor: SECONDARY_COLOUR[500],
                            color: TEXT_COLOR.primary,

                            ":hover": {
                              backgroundColor: TEXT_COLOR.primary,
                              color: "white",
                            },
                          }}
                          variant="solid"
                        >
                          Book Now
                        </Button>
                      </Box>
                    </Box>

                    <Divider />

                    <Box
                      sx={{
                        px: 3,
                        pt: 3,
                        pb: 3,
                        textAlign: "center",
                      }}
                    >
                      <Typography
                        component="h3"
                        level="h4"
                        sx={{
                          mb: 0.5,
                        }}
                      >
                        Pricing Based on Number of{" "}
                        <Box
                          component="span"
                          sx={{
                            textTransform: "capitalize",
                          }}
                        >
                          {item.unit}s
                        </Box>
                      </Typography>
                      <Typography level="body-sm" color="neutral">
                        <Box color="red" component="span">
                          *
                        </Box>{" "}
                        Prices are all tax inclusive
                      </Typography>

                      <List
                        size="md"
                        sx={{
                          mx: "calc(-1 * var(--ListItem-paddingX))",
                          mt: 2,
                          alignItems: "center",
                        }}
                      >
                        {simplifiedPricesArray.map((priceDetail) => (
                          <ListItem
                            key={priceDetail.unitRange}
                            sx={{
                              fontSize: "xl",
                              my: 1,
                            }}
                          >
                            <ListItemDecorator>
                              <CheckCircleOutlineIcon
                                color="primary"
                                sx={{
                                  fontSize: 22,
                                }}
                              />
                            </ListItemDecorator>
                            {priceDetail.unitRange}{" "}
                            <Box
                              component="span"
                              sx={{
                                color: PRIMARY_COLOUR[500],
                                fontWeight: 600,
                              }}
                            >
                              £{priceDetail.price}
                            </Box>
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  </Sheet>
                </Grid>
              );
            })}
        </Grid>
      </Container>
    </Sheet>
  );
}

function simplifyPrices(
  unit: string,
  prices: { unitCount: string | number; price: number }[]
) {
  const priceMap = new Map();

  prices.forEach((price) => {
    const priceKey = price.price;

    if (!priceMap.has(priceKey)) {
      priceMap.set(priceKey, []);
    }

    priceMap.get(priceKey).push(price.unitCount);
  });

  const simplifiedPrices = Array.from(priceMap).map(([price, units]) => {
    if (units.length === 1 && units[0] === "Studio Flat") {
      return { unitRange: "Studio Flat", price };
    }

    const minUnit = Math.min(
      ...units.filter((unit: string | number) => typeof unit === "number")
    );
    const maxUnit = Math.max(
      ...units.filter((unit: string | number) => typeof unit === "number")
    );
    const unitRange = `${minUnit}-${maxUnit} ${unit}s`;
    return { unitRange, price };
  });

  return simplifiedPrices;
}
