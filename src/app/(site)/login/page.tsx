import { Card, CardContent, Container, Grid, Sheet } from "@mui/joy";
import LoginForm from "./_components/login-form";

interface SignInPageProps {
  searchParams: {
    callbackUrl: string;
  };
}

export default function LoginPage({
  searchParams: { callbackUrl },
}: SignInPageProps) {
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
                  <LoginForm callbackUrl={callbackUrl || "/"} />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Sheet>
    </>
  );
}
