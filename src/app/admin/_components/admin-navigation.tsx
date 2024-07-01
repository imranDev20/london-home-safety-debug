"use client";
import {
  Box,
  Drawer,
  IconButton,
  Input,
  List,
  ListItem,
  ListItemButton,
  ListItemDecorator,
  ModalClose,
  Stack,
  Typography,
  Divider,
} from "@mui/joy";
import Sheet from "@mui/joy/Sheet";
import React, { ReactNode, useState } from "react";
import { Search } from "@mui/icons-material";
import { ADMIN_OPTIONS } from "@/shared/data";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Menu from "@mui/icons-material/Menu";

import LogoutAlertDialog from "./logout-alert-dialog";
import UserProfileSection from "./user-profile-section";

function NavigationList() {
  const pathname = usePathname();

  return (
    <List
      size="sm"
      sx={{
        mt: 2,
      }}
    >
      {ADMIN_OPTIONS.map((option) => (
        <ListItem
          key={option.route}
          sx={{
            mb: 1,
            textDecoration: "none",
          }}
          component={Link}
          href={option.route}
        >
          <ListItemButton
            selected={
              pathname === option.route ||
              (option.route !== "/admin" &&
                pathname.startsWith(`${option.route}/`))
            }
            sx={{
              borderRadius: "sm",
            }}
          >
            <ListItemDecorator
              sx={{
                minInlineSize: "2rem",
              }}
            >
              <option.Icon />
            </ListItemDecorator>

            <Typography level="title-sm">{option.label}</Typography>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}

interface AdminNavigationProps {
  children: ReactNode;
}

export default function AdminNavigation(props: AdminNavigationProps) {
  const { children } = props;
  const [open, setOpen] = useState<boolean>(false);
  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);

  return (
    <>
      <Stack component="aside">
        <Sheet
          sx={{
            width: "100%",
            py: 2,
            px: 3,
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            display: { xs: "flex", sm: "flex", md: "none" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <HealthAndSafetyIcon />
            <Typography level="title-lg">Home Safety</Typography>
          </Box>
          <IconButton
            variant="outlined"
            color="neutral"
            onClick={() => setOpen(true)}
          >
            <Menu />
          </IconButton>
        </Sheet>

        {/* Mobile & tablet device screens drawer */}
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          slotProps={{
            content: {
              sx: {
                p: 2,
              },
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 0.5,
              mt: 1,
              mb: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 1,
              }}
            >
              <HealthAndSafetyIcon />
              <Typography level="title-lg">Home Safety</Typography>
            </Box>

            <ModalClose id="close-icon" sx={{ position: "initial" }} />
          </Box>
          <Divider />

          <NavigationList />
          <UserProfileSection setOpenConfirmModal={setOpenConfirmModal} />
        </Drawer>

        <Box
          sx={{
            display: "flex",
            minHeight: "100dvh",
          }}
        >
          {/* dashboard sidebar navigation */}
          <Sheet
            sx={{
              maxWidth: "240px",
              height: "100dvh",
              p: 2,
              display: { xs: "none", sm: "none", md: "flex" },
              flexDirection: "column",
              justifyContent: "space-between",
              borderRight: "1px solid",
              borderRightColor: "var(--joy-palette-divider)",
            }}
          >
            <Box>
              <Box
                sx={{
                  display: "flex",
                  mb: 3,
                  gap: 1,
                }}
              >
                <HealthAndSafetyIcon />
                <Typography level="title-lg">Home Safety</Typography>
              </Box>
              <Divider />

              <NavigationList />
            </Box>

            <UserProfileSection setOpenConfirmModal={setOpenConfirmModal} />
          </Sheet>

          <Box
            sx={{
              flex: 1,
              px: {
                xs: 3,
                md: 5,
              },
              py: 2,
            }}
          >
            {children}
          </Box>
        </Box>
      </Stack>

      <LogoutAlertDialog
        open={openConfirmModal}
        setOpen={setOpenConfirmModal}
      />
    </>
  );
}
