"use client";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import CircularProgress from "@mui/joy/CircularProgress";
import Dropdown from "@mui/joy/Dropdown";
import ListDivider from "@mui/joy/ListDivider";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Typography from "@mui/joy/Typography";
import { useTheme } from "@mui/joy/styles";
import React from "react";

import {
  Dashboard,
  ListAltRounded,
  LogoutRounded,
  PersonRounded,
  ShoppingCart,
  SvgIconComponent,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { hexToRgba } from "@/shared/functions";
import { useSnackbar } from "../../providers/snackbar-provider";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

function RenderMenuItem({
  label,
  href,
  Icon,
}: {
  label: string;
  href: string;
  Icon: SvgIconComponent;
}) {
  return (
    <MenuItem component={Link} href={href}>
      <Icon />
      {label}
    </MenuItem>
  );
}

export default function NavbarDropdown() {
  const theme = useTheme();

  const { data: session } = useSession();

  const handleLogoutAccount = () => {
    signOut({
      redirect: true,
      callbackUrl: `${window.location.origin}/login`,
    });
  };

  return (
    <>
      <Dropdown>
        <MenuButton
          variant="plain"
          sx={{
            maxWidth: "40px",
            maxHeight: "40px",
            borderRadius: "9999999px",
          }}
        >
          <Avatar
            sx={{
              borderRadius: "50%",
            }}
          >
            {session?.user.image && (
              <Image
                src={session?.user.image}
                alt={session.user.name}
                width={40}
                height={40}
              />
            )}
          </Avatar>
        </MenuButton>

        <Menu
          placement="bottom-end"
          size="sm"
          sx={{
            zIndex: "99999",
            p: 1,
            gap: 1,
            "--ListItem-radius": "var(--joy-radius-sm)",
          }}
        >
          <MenuItem>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
              }}
              component={Link}
              href={session?.user.role === "admin" ? "/admin" : "/profile"}
            >
              <Avatar
                sx={{
                  borderRadius: "50%",
                  backgroundColor: hexToRgba(theme.palette.primary[500], 0.3),
                }}
              />
              <Box sx={{ ml: 1.5 }}>
                <Typography level="title-sm" textColor="text.primary">
                  {session?.user?.name}
                </Typography>
                <Typography level="body-xs" textColor="text.tertiary">
                  {session?.user?.email}
                </Typography>
              </Box>
            </Box>
          </MenuItem>
          <ListDivider />

          {session?.user.role === "admin" ? (
            <>
              <RenderMenuItem
                Icon={Dashboard}
                href="/admin"
                label="Dashboard"
              />
              <RenderMenuItem
                Icon={ShoppingCart}
                href="/admin/orders"
                label="Orders"
              />
              <RenderMenuItem
                Icon={PersonRounded}
                href="/admin/customers"
                label="Customers"
              />
            </>
          ) : (
            <>
              <RenderMenuItem
                Icon={PersonRounded}
                href="/profile"
                label="Profile"
              />
              <RenderMenuItem
                Icon={ListAltRounded}
                href="/profile/orders"
                label="Orders"
              />
            </>
          )}

          <ListDivider />

          <MenuItem onClick={handleLogoutAccount}>
            <LogoutRounded />
            Log out
          </MenuItem>
        </Menu>
      </Dropdown>
    </>
  );
}
