import { Card, CardContent, Container, Grid, Sheet } from "@mui/joy";
import RegisterForm from "./_components/register-form";

export default function RegisterPage() {
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
                  <RegisterForm />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Sheet>
    </>
  );
}
