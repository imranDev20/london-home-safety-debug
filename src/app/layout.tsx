import * as React from "react";
import QueryProvider from "./_components/providers/query-provider";
import ThemeRegistry from "./_components/providers/theme-registry";
import { SnackbarProvider } from "./_components/providers/snackbar-provider";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <ThemeRegistry>
            <SnackbarProvider>
              <>{props.children}</>
            </SnackbarProvider>
          </ThemeRegistry>
        </QueryProvider>
      </body>
    </html>
  );
}
