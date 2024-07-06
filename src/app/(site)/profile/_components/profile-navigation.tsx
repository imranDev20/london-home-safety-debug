"use client";

import LogoutAlertDialog from "@/app/_components/common/logout-alert-dialog";
import {
  Business,
  Dashboard,
  FormatQuote,
  KeyboardArrowRight,
  Logout,
  Room,
  ShoppingCart,
} from "@mui/icons-material";

import {
  Card,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
} from "@mui/joy";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function ProfileNavigation({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [openLogoutDialog, setOpenLogoutDialog] = useState<boolean>(false);

  const PROFILE_OPTIONS = [
    {
      route: "/profile",
      label: "Dashboard",
      Icon: Dashboard,
    },
    {
      route: "/profile/property",
      label: "Property",
      Icon: Business,
    },
    {
      route: "/profile/orders",
      label: "Orders",
      Icon: ShoppingCart,
    },

    {
      route: "/profile/testimonials",
      label: "Testimonials",
      Icon: FormatQuote,
    },
  ];

  return (
    <Grid container spacing={5}>
      <Grid xs={12} md={4}>
        <Card
          variant="plain"
          sx={{
            backgroundColor: "white",
            boxShadow: "md",
          }}
        >
          <List>
            {PROFILE_OPTIONS.map((item) => (
              <ListItem
                key={item.route}
                sx={{
                  mb: 1,
                }}
              >
                <ListItemButton
                  sx={{
                    borderRadius: "md",
                  }}
                  selected={pathname === item.route}
                  href={item.route}
                  component={Link}
                >
                  <ListItemDecorator>{<item.Icon />}</ListItemDecorator>
                  <ListItemContent>{item.label}</ListItemContent>
                  <KeyboardArrowRight />
                </ListItemButton>
              </ListItem>
            ))}

            <ListItem
              sx={{
                mb: 1,
              }}
            >
              <ListItemButton
                sx={{
                  borderRadius: "md",
                }}
                color="danger"
                onClick={() => setOpenLogoutDialog(true)}
              >
                <ListItemDecorator>
                  <Logout />
                </ListItemDecorator>
                <ListItemContent>Logout</ListItemContent>
                <KeyboardArrowRight />
              </ListItemButton>
            </ListItem>
          </List>
        </Card>
      </Grid>

      <Grid xs={12} md={8}>
        {children}
      </Grid>

      <LogoutAlertDialog
        open={openLogoutDialog}
        setOpen={setOpenLogoutDialog}
      />
    </Grid>
  );
}
