"use client";
import Button from "@mui/joy/Button";
import Box from "@mui/joy/Box";
import Container from "@mui/joy/Container";
import IconButton from "@mui/joy/IconButton";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import { useTheme } from "@mui/joy/styles";
import React from "react";

import { East, ExpandMore, Login } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { usePathname } from "next/navigation";
import NavbarDropdown from "./navbar-dropdown";

import { hexToRgba } from "@/shared/functions";
import useCurrentUser from "@/shared/hooks/use-current-user";
import { NAV_ITEMS } from "@/shared/data";

export default function Navbar({
  setOpenMobileDrawer,
  isInverted,
}: {
  setOpenMobileDrawer: Dispatch<SetStateAction<boolean>>;
  isInverted?: boolean;
}) {
  const theme = useTheme();
  const pathname = usePathname();
  const { userData, isPending: isCurrentUserPending } = useCurrentUser();

  return (
    <Box sx={{ zIndex: 10, position: "relative" }}>
      <Container sx={{ zIndex: 100000, position: "relative" }}>
        <Box
          sx={{
            display: "flex",
            py: {
              xs: 2,
              md: 0,
            },
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            level="h4"
            sx={{
              color: "white",
            }}
          >
            LHS
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{
                mr: 10,
                py: 0,
                display: {
                  xs: "none",
                  md: "flex",
                },
              }}
            >
              {NAV_ITEMS.map((item) => (
                <Box
                  key={item.path}
                  sx={{
                    position: "relative",
                    py: 2,
                    ":hover": {
                      ".subMenu": {
                        display: "block",
                      },
                    },
                  }}
                >
                  <Button
                    key={item.label}
                    component={Link}
                    variant="plain"
                    href={item.path}
                    endDecorator={item.children && <ExpandMore />}
                    sx={{
                      ...(isInverted
                        ? {
                            color:
                              item.path === pathname
                                ? theme.palette.secondary[500]
                                : "white",
                            backgroundColor:
                              item.path === pathname
                                ? hexToRgba(theme.palette.secondary[500], 0.2)
                                : "transparent",
                            ":hover": {
                              color: theme.palette.secondary[500],
                              backgroundColor: hexToRgba(
                                theme.palette.secondary[500],
                                0.2
                              ),
                            },
                          }
                        : {
                            color:
                              item.path === pathname
                                ? theme.palette.primary[500]
                                : theme.palette.text.primary,
                            backgroundColor:
                              item.path === pathname
                                ? hexToRgba(theme.palette.primary[500], 0.1)
                                : "transparent",
                            ":hover": {
                              color: theme.palette.primary[500],
                              backgroundColor: hexToRgba(
                                theme.palette.primary[500],
                                0.1
                              ),
                            },
                          }),

                      cursor: "pointer",
                      fontWeight: 600,
                      fontSize: "md",
                    }}
                  >
                    {item.label}
                  </Button>
                  {item.children && (
                    <Stack
                      spacing={0}
                      className="subMenu"
                      sx={{
                        display: "none",
                        position: "absolute",
                        backgroundColor: "white",
                        boxShadow: "lg",
                        minWidth: 190,
                        py: 1,
                        borderRadius: "lg",
                        left: "50%",
                        top: "100%",
                        transform: "translateX(-50%)",
                      }}
                    >
                      {item.children.map((dropdownItem) => (
                        <Box
                          key={dropdownItem.label}
                          sx={{
                            position: "relative",
                            px: 1,
                            ":hover": {
                              "& .secondSubMenu": {
                                display: "block",
                              },
                            },
                          }}
                        >
                          <Button
                            variant="plain"
                            component={Link}
                            fullWidth
                            href={item.path + dropdownItem.path}
                            sx={{
                              fontWeight: 600,
                              p: 1,
                              px: 2,
                              fontSize: "md",
                              borderRadius: "sm",
                              cursor: "pointer",
                              justifyContent: "flex-start",
                              color: theme.palette.text.primary,
                              ":hover": {
                                backgroundColor: hexToRgba(
                                  theme.palette.primary[500],
                                  0.1
                                ),
                                color: theme.palette.primary[500],
                              },
                            }}
                          >
                            {dropdownItem.label}
                          </Button>

                          {dropdownItem.children && (
                            <Stack
                              spacing={0}
                              className="secondSubMenu"
                              sx={{
                                display: "none",
                                position: "absolute",
                                backgroundColor: "white",
                                boxShadow: "lg",
                                minWidth: 220,
                                p: 1,
                                borderRadius: "lg",
                                right: 0,
                                left: "100%",
                                top: 0,
                                // transform: "translateX(-50%)",
                              }}
                            >
                              {dropdownItem.children.map(
                                (dropdownChildItem) => (
                                  <Box key={dropdownChildItem.label}>
                                    <Button
                                      variant="plain"
                                      component={Link}
                                      fullWidth
                                      href={
                                        item.path +
                                        dropdownItem.path +
                                        dropdownChildItem.path
                                      }
                                      sx={{
                                        fontWeight: 600,
                                        p: 1,
                                        px: 2,
                                        fontSize: "md",
                                        borderRadius: "sm",
                                        cursor: "pointer",
                                        color: theme.palette.text.primary,
                                        justifyContent: "flex-start",
                                        ":hover": {
                                          backgroundColor: hexToRgba(
                                            theme.palette.primary[500],
                                            0.1
                                          ),
                                          color: theme.palette.primary[500],
                                        },
                                      }}
                                    >
                                      {dropdownChildItem.label}
                                    </Button>
                                  </Box>
                                )
                              )}
                            </Stack>
                          )}
                        </Box>
                      ))}
                    </Stack>
                  )}
                </Box>
              ))}
            </Stack>
            <Stack
              spacing={3}
              direction="row"
              justifyContent="flex-end"
              sx={{
                minWidth: 262,
                mr: {
                  xs: 3,
                  md: 0,
                },
              }}
            >
              {isCurrentUserPending ? null : userData ? (
                <NavbarDropdown />
              ) : (
                <Button
                  variant="solid"
                  color="primary"
                  startDecorator={<Login />}
                  component={Link}
                  href="/login"
                  sx={{
                    display: {
                      xs: "none",
                      md: "flex",
                    },
                  }}
                >
                  Login
                </Button>
              )}

              <Button
                component={Link}
                href="/book-now"
                color="secondary"
                size="lg"
                sx={{
                  mr: {
                    xs: 3,
                    md: 0,
                  },
                  ":hover": {
                    backgroundColor: theme.palette.accent1[500],
                    color: "white",
                  },
                }}
                endDecorator={
                  <East
                    fontSize="inherit"
                    sx={{
                      fontSize: 20,
                    }}
                  />
                }
              >
                Book Now
              </Button>
            </Stack>

            <IconButton
              variant="outlined"
              sx={{ display: { xs: "flex", md: "none" } }}
              onClick={() => setOpenMobileDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
