import * as React from "react";
import QueryProvider from "./_components/providers/query-provider";
import ThemeRegistry from "./_components/providers/theme-registry";
import { SnackbarProvider } from "./_components/providers/snackbar-provider";
import TopLoader from "./_components/global/top-loader";
import AuthProvider from "./_components/providers/auth-provider";

export const metadata = {
  title: "London Home Safety Limited",
  description: "Generated by create next app",
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <QueryProvider>
            <ThemeRegistry>
              <SnackbarProvider>
                <TopLoader />
                <>{props.children}</>
              </SnackbarProvider>
            </ThemeRegistry>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
