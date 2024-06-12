import React from "react";
import { Card, CardContent, Container, Grid, Sheet } from "@mui/joy";
import LoginForm from "./_components/login-form";

export default function LoginPage() {
  return (
    <>
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
