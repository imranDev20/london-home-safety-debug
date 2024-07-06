import { Dashboard } from "@mui/icons-material";
import { Avatar, Box, Button, Card, Grid, Stack, Typography } from "@mui/joy";
import InfoBlocks from "./_components/info-blocks";

export default function ProfilePage() {
  const PROFILE_CARD_OPTIONS = [
    {
      number: 16,
      text: "All Orders",
    },
    {
      number: 16,
      text: "Completed Orders",
    },

    {
      number: 16,
      text: "Pending Orders",
    },
    {
      number: 16,
      text: "Cancelled Orders",
    },
  ];

  const USER_DETAILS = [
    {
      title: "Name",
      value: "Imran Kabir",
    },
    {
      title: "Email",
      value: "imrandev20@gmail.com",
    },
    {
      title: "Phone No",
      value: "+880 1756 68 1894",
    },
  ];

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Dashboard
            sx={{
              mr: 1,
            }}
            color="primary"
          />
          <Typography component="h1" level="h3">
            Dashboard
          </Typography>
        </Box>

        <Button>Edit Profile</Button>
      </Box>

      <Card
        variant="plain"
        sx={{
          mt: 3,
          boxShadow: "md",
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              width: 70,
              height: 70,
            }}
          />
          <Box>
            <Typography level="h4">Imran Kabir</Typography>
            <Typography color="neutral" level="body-md">
              imrandev20@gmail.com
            </Typography>
          </Box>
        </Stack>
      </Card>

      <Grid container spacing={3} mt={3}>
        {PROFILE_CARD_OPTIONS.map((item) => (
          <Grid xs={12} md={3} key={item.text}>
            <Card
              variant="plain"
              sx={{
                boxShadow: "md",
                textAlign: "center",
              }}
            >
              <Typography color="primary" level="title-lg">
                {item.number}
              </Typography>
              <Typography level="body-md" color="neutral">
                {item.text}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Card
        variant="plain"
        sx={{
          mt: 4.5,
          boxShadow: "md",
        }}
      >
        <Grid container spacing={3}>
          {USER_DETAILS.map((user) => (
            <Grid xs={12} md={4} key={user.title}>
              <InfoBlocks item={user} />
            </Grid>
          ))}
        </Grid>
      </Card>
    </>
  );
}
