import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import Sheet from "@mui/joy/Sheet";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";

export default function EngineerCard({ engineer }: any) {
  console.log(engineer);
  return (
    <>
      <Card
        orientation="horizontal"
        sx={{
          width: "100%",
          flexWrap: "wrap",
          [`& > *`]: {
            "--stack-point": "500px",
            minWidth:
              "clamp(0px, (calc(var(--stack-point) - 2 * var(--Card-padding) - 2 * var(--variant-borderWidth, 0px)) + 1px - 100%) * 999, 100%)",
          },
        }}
      >
        <AspectRatio flex ratio="1" maxHeight={182} sx={{ minWidth: 182 }}>
          {/* <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
            srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
            loading="lazy"
            alt=""
          /> */}
        </AspectRatio>
        <CardContent>
          <Typography fontSize="xl" fontWeight="lg">
            {engineer.name}
          </Typography>
          <Typography level="body-sm" fontWeight="lg" textColor="text.tertiary">
            {engineer.specialty}
          </Typography>
          <Sheet
            sx={{
              bgcolor: "background.level1",
              borderRadius: "sm",
              p: 1.5,
              my: 1.5,
              display: "flex",
              gap: 2,
              "& > div": { flex: 1 },
            }}
          >
            <div>
              <Typography level="body-xs" fontWeight="lg">
                Ongoing
              </Typography>
              <Typography fontWeight="lg">
                {engineer?.ongoing_projects ?? 0}
              </Typography>
            </div>
            <div>
              <Typography level="body-xs" fontWeight="lg">
                Completed
              </Typography>
              <Typography fontWeight="lg">
                {engineer?.completed_projects ?? 0}
              </Typography>
            </div>
          </Sheet>
          <Box sx={{ display: "flex", gap: 1.5, "& > button": { flex: 1 } }}>
            <Button
              variant="outlined"
              color="neutral"
              startDecorator={<PhoneIcon />}
              sx={{
                flex: 1,
              }}
              component="a"
              href={`tel:${engineer.phone}`}
            >
              Call
            </Button>
            <Button
              component="a"
              href={`mailto:${engineer.email}`}
              variant="solid"
              color="primary"
              startDecorator={<EmailIcon />}
              sx={{
                flex: 1,
              }}
            >
              Email
            </Button>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}
