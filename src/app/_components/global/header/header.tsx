"use client";
import Box from "@mui/joy/Box";
import { Button, Divider, Drawer, ModalClose, Typography } from "@mui/joy";
import { Login } from "@mui/icons-material";
import Link from "next/link";
import { useEffect, useState } from "react";
import Topbar from "./topbar";
import MobileNavList from "./mobile-nav-list";
import Navbar from "./navbar";
import { usePathname } from "next/navigation";
import { SECONDARY_COLOUR, TEXT_COLOR } from "@/shared/constants";

export default function Header() {
  const [openMobileDrawer, setOpenMobileDrawer] = useState<boolean>(false);
  const [prevScrollPos, setPrevScrollPos] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(prevScrollPos > currentScrollPos && currentScrollPos > 400);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  const nonInvertedRoutes = [
    "/login",
    "/register",
    "/profile",
    "/profile/property",
    "/profile/orders",
    "/profile/testimonials",
    "/profile/orders",
  ];

  return (
    <Box component="header">
      <Topbar />

      <Drawer
        open={openMobileDrawer}
        onClose={() => setOpenMobileDrawer(false)}
        size="md"
      >
        <Box
          sx={{
            display: "flex",
            p: 2,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography level="h4">Home Safety London</Typography>
          <ModalClose id="close-icon" sx={{ position: "initial" }} />
        </Box>
        <Divider />

        <Box
          sx={{
            px: 2,
            pb: 4,
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <MobileNavList />

          <Button
            variant="solid"
            startDecorator={<Login />}
            component={Link}
            href="/login"
            fullWidth
            sx={{
              ":hover": {
                backgroundColor: SECONDARY_COLOUR[500],
                color: TEXT_COLOR.primary,
              },
            }}
          >
            Login
          </Button>
        </Box>
      </Drawer>

      <Box component="nav">
        <Navbar
          setOpenMobileDrawer={setOpenMobileDrawer}
          isInverted={
            !nonInvertedRoutes.some((route) => pathname.startsWith(route))
          }
        />
      </Box>

      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          backgroundColor: "#fff",
          transition: "top 0.3s ease-in-out",
          zIndex: 100,
          boxShadow: "md",
          ...(visible ? {} : { top: "-100%" }),
        }}
      >
        <Navbar setOpenMobileDrawer={setOpenMobileDrawer} />
      </Box>
    </Box>
  );
}
