"use client";
import { West } from "@mui/icons-material";
import { Box, Button, Card, IconButton, Stack, Typography } from "@mui/joy";
import { useRouter } from "next/navigation";
import React from "react";

export default function OrderDetailsPage() {
  const router = useRouter();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Stack direction="row" spacing={1}>
          <IconButton
            onClick={() => router.push("/profile/orders")}
            variant="soft"
            color="neutral"
            size="sm"
          >
            <West color="primary" />
          </IconButton>

          <Typography component="h1" level="h3">
            INV200A
          </Typography>
        </Stack>
      </Box>

      <Card
        variant="plain"
        sx={{
          mt: 3,
          boxShadow: "md",
        }}
      >
        Hello
      </Card>
    </>
  );
}
