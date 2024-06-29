import ContactUsForm from "@/app/_components/common/contact-us-form";
import { SOCIALS } from "@/shared/data";
import { Container, Grid } from "@mui/joy";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import Tooltip from "@mui/joy/Tooltip";
import { PRIMARY_COLOUR } from "@/shared/constants";

export default function ContactUs() {
  return (
    <Container
      sx={{
        my: 10,
      }}
    >
      <Grid container spacing={3}>
        <Grid xs={12} md={5}>
          <Typography
            level="h1"
            component="h2"
            fontSize={40}
            sx={{
              mb: 4,
            }}
          >
            Have Questions? We&apos;re Here to Help!
          </Typography>

          <Typography color="neutral" level="body-lg">
            If you have any questions about our services or need assistance,
            don&apos;t hesitate to reach out. Our team is here to help you.
          </Typography>

          <Grid container spacing={3} sx={{ my: 3 }}>
            {SOCIALS.map((social) => (
              <Grid key={social.href}>
                <Tooltip title={social.label} variant="solid" color="secondary">
                  <IconButton variant="plain">
                    {
                      <social.Icon
                        sx={{
                          color: PRIMARY_COLOUR[500],
                        }}
                      />
                    }
                  </IconButton>
                </Tooltip>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid xs={12} md={7}>
          <ContactUsForm />
        </Grid>
      </Grid>
    </Container>
  );
}
