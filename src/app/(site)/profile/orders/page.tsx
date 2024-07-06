import { ORDER_STATUS_COLORS, ORDER_STATUS_ICONS } from "@/shared/constants";
import { hexToRgba, snakeCaseToNormalText } from "@/shared/functions";
import { East, ShoppingCart } from "@mui/icons-material";
import { Box, Card, Chip, Grid, IconButton, Stack, Typography } from "@mui/joy";
import Link from "next/link";
import React from "react";

export default function OrdersPage() {
  // getMostRecentStatus(row.order_status)
  const status = "awaiting_confirmation";
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <ShoppingCart
            sx={{
              mr: 1,
            }}
            color="primary"
          />
          <Typography component="h1" level="h3">
            Orders
          </Typography>
        </Box>
      </Box>

      <Stack mt={3} spacing={3}>
        {[0, 1, 2].map((item) => (
          <Card
            key={item}
            variant="plain"
            sx={{
              boxShadow: "md",
              py: 3,
            }}
          >
            <Grid container>
              <Grid
                xs={6}
                md={2}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography level="title-md">INV200A</Typography>
              </Grid>

              <Grid
                xs={6}
                md={4}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Chip
                  variant="soft"
                  size="sm"
                  startDecorator={ORDER_STATUS_ICONS[status]}
                  sx={{
                    backgroundColor: hexToRgba(
                      ORDER_STATUS_COLORS[status],
                      0.2
                    ),
                    textTransform: "capitalize",
                  }}
                >
                  {snakeCaseToNormalText(status as string)}
                </Chip>
              </Grid>

              <Grid
                xs={6}
                md={2}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography level="body-md">Nov 11, 2024</Typography>
              </Grid>

              <Grid
                xs={6}
                md={2}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Typography level="body-md">$350</Typography>
              </Grid>

              <Grid
                xs={6}
                md={2}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <IconButton
                  size="sm"
                  component={Link}
                  href={`/profile/orders/11`}
                >
                  <East />
                </IconButton>
              </Grid>
            </Grid>
          </Card>
        ))}
      </Stack>
    </>
  );
}
