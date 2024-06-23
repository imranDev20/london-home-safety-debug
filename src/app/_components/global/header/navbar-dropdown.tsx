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
  ListAltRounded,
  LogoutRounded,
  PersonRounded,
} from "@mui/icons-material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutAccount } from "@/services/account.services";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import Link from "next/link";
import { hexToRgba } from "@/shared/functions";
import { useSnackbar } from "../../providers/snackbar-provider";
import useCurrentUser from "@/shared/hooks/use-current-user";
import { ErrorResponse } from "@/types/response";

export default function NavbarDropdown() {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { userData } = useCurrentUser();

  const {
    mutateAsync: logoutAccountMutate,
    isPending: isLogoutAccountPending,
  } = useMutation({
    mutationFn: () => logoutAccount(),

    onSuccess: (response) => {
      enqueueSnackbar(response.message, "success");
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
      queryClient.resetQueries();
      router.replace("/login");
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      enqueueSnackbar(error.response?.data.message || error?.message, "error");
    },
  });

  const handleLogoutAccount = async () => {
    await logoutAccountMutate();
  };

  return (
    <>
      <Dropdown>
        {isLogoutAccountPending ? (
          <CircularProgress thickness={4} size="md" />
        ) : (
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
            />
          </MenuButton>
        )}

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
              href="/profile"
            >
              <Avatar
                sx={{
                  borderRadius: "50%",
                  backgroundColor: hexToRgba(theme.palette.primary[500], 0.3),
                }}
              />
              <Box sx={{ ml: 1.5 }}>
                <Typography level="title-sm" textColor="text.primary">
                  {userData?.name}
                </Typography>
                <Typography level="body-xs" textColor="text.tertiary">
                  {userData?.email}
                </Typography>
              </Box>
            </Box>
          </MenuItem>
          <ListDivider />
          <MenuItem component={Link} href="/profile">
            <PersonRounded />
            Profile
          </MenuItem>
          <MenuItem component={Link} href="/profile/orders">
            <ListAltRounded />
            Orders
          </MenuItem>
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
