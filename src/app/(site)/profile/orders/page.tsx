import Order from "@/app/api/_models/Order";
import { config } from "@/app/api/auth/[...nextauth]/auth";
import { ORDER_STATUS_COLORS, ORDER_STATUS_ICONS } from "@/shared/constants";
import {
  calculateOrderTotalCost,
  getMostRecentStatus,
  hexToRgba,
  snakeCaseToNormalText,
} from "@/shared/functions";
import { East, ShoppingCart } from "@mui/icons-material";
import { Box, Card, Chip, Grid, IconButton, Stack, Typography } from "@mui/joy";
import dayjs from "dayjs";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";

export default async function OrdersPage() {
  const status = "awaiting_confirmation";
  const session = await getServerSession(config);

  const orders = await Order.find({ customer: session?.user._id });

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
        {orders.map((item) => (
          <Card
            key={item._id.toString()}
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
                <Typography level="title-md">{item.invoice_id}</Typography>
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
                  startDecorator={
                    ORDER_STATUS_ICONS[getMostRecentStatus(item.order_status)]
                  }
                  sx={{
                    backgroundColor: hexToRgba(
                      ORDER_STATUS_COLORS[
                        getMostRecentStatus(item.order_status)
                      ],
                      0.2
                    ),
                    textTransform: "capitalize",
                  }}
                >
                  {snakeCaseToNormalText(
                    getMostRecentStatus(item.order_status)
                  )}
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
                <Typography level="body-md">
                  {dayjs(item.createdAt).format("DD MMMM, YYYY")}
                </Typography>
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
                <Typography level="body-md">
                  {calculateOrderTotalCost(item)}
                </Typography>
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
                  href={`/profile/orders/${item._id}`}
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
