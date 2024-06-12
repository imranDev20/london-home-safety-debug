import React from "react";
import { Card, CardContent, Container, Grid, Sheet } from "@mui/joy";
import LoginForm from "./_components/login-form";
import backgroundImage from "@/images/about-bg.jpeg";
import PageHeader from "@/app/_components/common/page-header";

export default function LoginPage() {
  return (
    <>
      {/* <PageHeader title="Login" backgroundImage={backgroundImage} /> */}
      <Sheet variant="soft">
        <Container sx={{ py: 4 }}>
          <Grid container>
            <Grid xs={12} sm={8} md={5} sx={{ mx: "auto" }}>
              <Card
                variant="plain"
                sx={{
                  p: 4,
                }}
              >
                <CardContent>
                  <LoginForm />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Sheet>
    </>
  );
}
