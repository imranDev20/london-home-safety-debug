"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import Snackbar from "@mui/joy/Snackbar";
import Button from "@mui/joy/Button";
import PlaylistAddCheckCircleRoundedIcon from "@mui/icons-material/PlaylistAddCheckCircleRounded";

type Variant = "success" | "error" | "warning" | "info";

type SnackbarContextType = {
  enqueueSnackbar: (message: string, variant?: Variant) => void;
};

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};

export const SnackbarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [snackbarQueue, setSnackbarQueue] = useState<
    Array<{ message: string; variant?: Variant }>
  >([]);
  const [currentSnackbar, setCurrentSnackbar] = useState<{
    message: string;
    variant?: Variant;
  } | null>(null);

  const enqueueSnackbar = (message: string, variant?: Variant) => {
    setSnackbarQueue((prevQueue) => [...prevQueue, { message, variant }]);
  };

  const handleClose = () => {
    setCurrentSnackbar(null);
    setSnackbarQueue((prevQueue) => prevQueue.slice(1));
  };

  useEffect(() => {
    if (snackbarQueue.length > 0) {
      setCurrentSnackbar(snackbarQueue[0]);
    }
  }, [snackbarQueue]);

  return (
    <SnackbarContext.Provider value={{ enqueueSnackbar }}>
      {children}
      {currentSnackbar && (
        <Snackbar
          variant="soft"
          autoHideDuration={3000}
          color={
            currentSnackbar.variant === "error"
              ? "danger"
              : currentSnackbar.variant === "info"
              ? "neutral"
              : currentSnackbar.variant || "success"
          }
          open={true}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          startDecorator={<PlaylistAddCheckCircleRoundedIcon />}
          endDecorator={
            <Button
              onClick={handleClose}
              size="sm"
              variant="soft"
              color={
                currentSnackbar.variant === "error"
                  ? "danger"
                  : currentSnackbar.variant === "info"
                  ? "neutral"
                  : currentSnackbar.variant || "success"
              }
            >
              Dismiss
            </Button>
          }
        >
          {currentSnackbar.message}
        </Snackbar>
      )}
    </SnackbarContext.Provider>
  );
};
