"use client";
import * as React from "react";
import CssBaseline from "@mui/joy/CssBaseline";
import NextAppDirEmotionCacheProvider from "./emotion-cache-provider";
import theme from "@/shared/theme";
import { CssVarsProvider } from "@mui/joy/styles/CssVarsProvider";

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: "joy" }}>
      <CssVarsProvider theme={theme}>
        <CssBaseline />
        {children}
      </CssVarsProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
