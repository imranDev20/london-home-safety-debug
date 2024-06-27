import { BACKGROUND_COLOUR } from "@/shared/constants";
import Sheet from "@mui/joy/Sheet";
import Container from "@mui/joy/Container";
import Typography from "@mui/joy/Typography";
import Grid from "@mui/joy/Grid";
import { ALL_SERVICES } from "@/shared/data";
import ServiceCardHome from "@/app/(site)/_components/service-card-home";
import { NavLeafItem } from "@/types/misc";

export default function RelatedServices({
  currentService,
}: {
  currentService: NavLeafItem;
}) {
  return (
    <Sheet
      sx={{
        backgroundColor: BACKGROUND_COLOUR.level5,
        py: 10,
        my: 10,
      }}
    >
      <Container>
        <Typography
          component="h2"
          sx={{
            mb: 5,
            textAlign: "center",
            maxWidth: 700,
            mx: "auto",
          }}
          fontSize={36}
        >
          Related Services
        </Typography>

        <Grid container spacing={3}>
          {ALL_SERVICES.filter((val) => val.path !== currentService?.path).map(
            (service) => (
              <Grid xs={12} sm={6} md={4} key={service.path}>
                <ServiceCardHome item={service} />
              </Grid>
            )
          )}
        </Grid>
      </Container>
    </Sheet>
  );
}
