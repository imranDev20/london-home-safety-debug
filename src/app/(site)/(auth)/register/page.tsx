import { Card, CardContent, Container, Grid, Sheet } from "@mui/joy";
import RegisterForm from "./_components/register-form";

type RegisterPageProps = {
  searchParams: {
    callbackUrl: string;
  };
};

export default function RegisterPage({
  searchParams: { callbackUrl },
}: RegisterPageProps) {
  return (
    <>
      <Sheet variant="soft">
        <Container sx={{ py: 4 }}>
          <Grid container>
            <Grid xs={5} sx={{ mx: "auto" }}>
              <Card
                variant="plain"
                sx={{
                  p: 4,
                }}
              >
                <CardContent>
                  <RegisterForm callbackUrl={callbackUrl} />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Sheet>
    </>
  );
}
