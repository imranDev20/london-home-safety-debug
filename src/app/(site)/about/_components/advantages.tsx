import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import Container from "@mui/joy/Container";
import Grid from "@mui/joy/Grid";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";

import { BACKGROUND_COLOUR } from "@/shared/constants";
import { ADVANTAGES } from "@/shared/data";

export default function Advantages() {
  return (
    <Sheet
      variant="plain"
      sx={{
        py: 10,
        backgroundColor: BACKGROUND_COLOUR.level5,
      }}
    >
      <Container component="section">
        <Box
          sx={{
            textAlign: "center",
            mb: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h2" level="h2" sx={{ mb: 2 }}>
            Why Choose London Home Safety Limited
          </Typography>
          <Typography
            color="neutral"
            sx={{
              mb: 5,
              maxWidth: 900,
              textAlign: "center",
            }}
          >
            We pride ourselves on delivering exceptional service and
            unparalleled expertise. Our certified professionals, competitive
            pricing, rapid response times, and flexible scheduling make us the
            trusted choice for all your home safety needs.
          </Typography>
        </Box>
        <Grid container spacing={4}>
          {ADVANTAGES.map((advan) => (
            <Grid xs={12} sm={6} md={3} key={advan.id}>
              <Card
                variant="plain"
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  background: "white",
                  borderRadius: "xl",
                  boxShadow: "md",
                }}
              >
                <advan.Icon
                  color="primary"
                  sx={{
                    fontSize: 50,
                  }}
                />
                <Typography
                  component="h3"
                  level="h4"
                  sx={{
                    textAlign: "center",
                  }}
                >
                  {advan.advantageName}
                </Typography>
                <Typography
                  color="neutral"
                  sx={{
                    textAlign: "center",
                  }}
                >
                  {advan.advantageDetail}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Sheet>
  );
}
