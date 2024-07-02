import { Home, KeyboardArrowRight } from "@mui/icons-material";

import JoyLink from "@mui/joy/Link";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import Link from "next/link";
import { PRIMARY_COLOUR, TEXT_COLOR } from "@/shared/constants";
import CustomerListHeader from "./_components/customer-list-header";

export default function AdminCustomersPage() {
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
        <JoyLink
          component={Link}
          color="primary"
          href="/admin/customers"
          sx={{
            textDecoration: "none",
          }}
        >
          Customers
        </JoyLink>
      </Breadcrumbs>

      <CustomerListHeader />
    </>
  );
}
