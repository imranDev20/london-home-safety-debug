import { Business, Edit } from "@mui/icons-material";
import { Box, Button, Card, Grid, IconButton, Typography } from "@mui/joy";
import InfoBlocks from "../_components/info-blocks";

export default function PropertyPage() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Business
            sx={{
              mr: 1,
            }}
            color="primary"
          />
          <Typography component="h1" level="h3">
            Properties
          </Typography>
        </Box>

        <Button>Add Property</Button>
      </Box>

      <Grid container spacing={3} mt={3}>
        <Grid xs={12} md={4}>
          <Card
            variant="plain"
            sx={{
              boxShadow: "md",
            }}
          >
            <Typography level="title-md">My Apartment Home</Typography>
            <Typography level="body-md" color="neutral">
              Residential
            </Typography>

            <IconButton
              aria-label="bookmark Bahamas Islands"
              variant="plain"
              color="neutral"
              size="sm"
              sx={{ position: "absolute", top: "0.875rem", right: "0.5rem" }}
            >
              <Edit />
            </IconButton>
          </Card>
        </Grid>
      </Grid>

      <Card
        variant="plain"
        sx={{
          mt: 3,
          boxShadow: "md",
        }}
      >
        <Typography level="title-lg">My Apartment Home</Typography>

        <Grid container spacing={3} mt={1}>
          <Grid xs={12} md={4}>
            <InfoBlocks
              item={{
                title: "Property Type",
                value: "Residential",
              }}
            />
          </Grid>

          <Grid xs={12} md={4}>
            <InfoBlocks
              item={{
                title: "Resident Type",
                value: "HMO",
              }}
            />
          </Grid>

          <Grid xs={12} md={4}>
            <InfoBlocks
              item={{
                title: "Number of Bedrooms",
                value: "12",
              }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3} mt={1}>
          <Grid xs={12} md={4}>
            <InfoBlocks
              item={{
                title: "Parking Options",
                value: "Paid Parking Available",
              }}
            />
          </Grid>

          <Grid xs={12} md={4}>
            <InfoBlocks
              item={{
                title: "Congestion Zone",
                value: "Yes",
              }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3} mt={1}>
          <Grid xs={12} md={4}>
            <InfoBlocks
              item={{
                title: "House/Street",
                value: "43 Felton Road",
              }}
            />
          </Grid>

          <Grid xs={12} md={4}>
            <InfoBlocks
              item={{
                title: "Post Code",
                value: "IG11 7YA",
              }}
            />
          </Grid>

          <Grid xs={12} md={4}>
            <InfoBlocks
              item={{
                title: "City",
                value: "London",
              }}
            />
          </Grid>
        </Grid>
      </Card>
    </>
  );
}
