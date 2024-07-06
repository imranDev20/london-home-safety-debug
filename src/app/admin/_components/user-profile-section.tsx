"use client";
import React, { Dispatch, SetStateAction } from "react";
import { Box, Divider, Typography, Avatar, IconButton } from "@mui/joy";
import { Logout } from "@mui/icons-material";
import Skeleton from "@mui/joy/Skeleton";
import { useSession } from "next-auth/react";

interface UserProfileSectionProps {
  setOpenConfirmModal: Dispatch<SetStateAction<boolean>>;
}

// the component has to be an async function for suspese to work

export default function UserProfileSection({
  setOpenConfirmModal,
}: UserProfileSectionProps) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <Box>
        <Divider
          sx={{
            my: 2,
          }}
        />
        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 1,
            }}
          >
            <Skeleton
              animation="wave"
              variant="circular"
              sx={{ width: 32 }}
              height={32}
            />
            <Box>
              <Skeleton
                animation="wave"
                variant="text"
                sx={{ width: 100 }}
                height={20}
              />
              <Skeleton
                animation="wave"
                variant="text"
                sx={{ width: 130 }}
                height={18}
              />
            </Box>
          </Box>

          <Skeleton
            variant="rectangular"
            sx={{
              width: 32,
              height: 32,
            }}
          />
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      <Divider
        sx={{
          my: 2,
        }}
      />
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 1,
          }}
        >
          <Avatar size="sm" />
          <Box>
            <Typography level="title-sm">{session?.user?.name}</Typography>
            <Typography component="span" level="body-xs" color="neutral">
              {session?.user?.email}
            </Typography>
          </Box>
        </Box>

        <IconButton
          variant="plain"
          size="sm"
          onClick={() => setOpenConfirmModal(true)}
        >
          <Logout />
        </IconButton>
      </Box>
    </Box>
  );
}
