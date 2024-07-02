import Box from "@mui/joy/Box";
import Drawer from "@mui/joy/Drawer";
import ModalClose from "@mui/joy/ModalClose";

import React, { Dispatch, SetStateAction } from "react";

type FormDrawerProps = {
  children: React.ReactNode;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function FormDrawer({
  open,
  setOpen,
  children,
}: FormDrawerProps) {
  return (
    <React.Fragment>
      <Drawer
        open={open}
        anchor="right"
        onClose={() => setOpen(false)}
        size="md"
        sx={{
          "--Drawer-transitionDuration": open ? "0.4s" : "0.2s",
          "--Drawer-transitionFunction": open
            ? "cubic-bezier(0.79,0.14,0.15,0.86)"
            : "cubic-bezier(0.77,0,0.18,1)",
        }}
      >
        <ModalClose />
        <Box role="presentation" sx={{ p: 2 }}>
          {children}
        </Box>
      </Drawer>
    </React.Fragment>
  );
}
