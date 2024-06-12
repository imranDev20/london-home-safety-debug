import * as React from "react";
import ThemeRegistry from "../_components/providers/theme-registry";
import QueryProvider from "../_components/providers/query-provider";
import ReCaptchaProvider from "../_components/providers/recaptcha-provider";
import { SnackbarProvider } from "../_components/providers/snackbar-provider";
import Header from "../_components/global/header/header";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReCaptchaProvider>
          <QueryProvider>
            <ThemeRegistry>
              <SnackbarProvider>
                <Header />
                {props.children}
              </SnackbarProvider>
            </ThemeRegistry>
          </QueryProvider>
        </ReCaptchaProvider>
      </body>
    </html>
  );
}
