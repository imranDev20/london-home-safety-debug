import { Home, KeyboardArrowRight } from "@mui/icons-material";
import { Breadcrumbs, Link as JoyLink, Typography } from "@mui/joy";
import Link from "next/link";
import { TEXT_COLOR } from "@/shared/constants";
import OrderTableOptions from "./_components/order-table-options";
import OrderListHeader from "./_components/order-list-header";
import { Suspense } from "react";

export default function AdminOrdersPage() {
  return (
    <>
      <Breadcrumbs
        sx={{
          px: 0,
          fontSize: 13,
        }}
        separator={
          <KeyboardArrowRight
            fontSize="inherit"
            sx={{
              fontSize: 20,
            }}
          />
        }
      >
        <JoyLink
          component={Link}
          color="neutral"
          href="/admin/"
          sx={{
            color: TEXT_COLOR.primary,
            textDecoration: "none",
          }}
        >
          <Home />
        </JoyLink>
        <Typography
          color="primary"
          sx={{
            fontWeight: 500,
          }}
        >
          Orders
        </Typography>
      </Breadcrumbs>

      <OrderListHeader />

      <Suspense>
        <OrderTableOptions />
      </Suspense>
    </>
  );
}
