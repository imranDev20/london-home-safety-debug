import { Card, CardContent, Container, Grid, Sheet } from "@mui/joy";
import EmailStep from "./_components/email-step";
import Token from "@/app/api/_models/Token";
import NewPassStep from "./_components/new-pass-step";

interface SignInPageProps {
  searchParams: {
    callbackUrl: string;
    active_step: string;
    token: string;
  };
}

export const revalidate = 0;

export default async function ForgotPasswordPage({
  searchParams: { callbackUrl, active_step, token },
}: SignInPageProps) {
  const activeStep = parseInt(active_step) || 1;

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
                  borderRadius: "lg",
                  boxShadow: "sm",
                }}
              >
                <CardContent>
                  {activeStep === 1 && !token && (
                    <EmailStep callbackUrl={callbackUrl} />
                  )}
                  {activeStep === 1 && token && <NewPassStep token={token} />}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Sheet>
    </>
  );
}
