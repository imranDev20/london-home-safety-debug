import { Dashboard } from "@mui/icons-material";
import { Avatar, Box, Button, Card, Grid, Stack, Typography } from "@mui/joy";
import InfoBlocks from "./_components/info-blocks";
import User from "@/app/api/_models/User";
import { getServerSession } from "next-auth";
import { config } from "@/app/api/auth/[...nextauth]/auth";
import Order from "@/app/api/_models/Order";
import Image from "next/image";

export const revalidate = 0;

export default async function ProfilePage() {
  const session = await getServerSession(config);
  const user = await User.findOne({ _id: session?.user._id });

  if (!user) {
    throw new Error("No user found");
  }

  const orders = await Order.find({ customer: user._id });
  if (!orders) {
    throw new Error("No orders found");
  }

  const PROFILE_CARD_OPTIONS = [
    {
      number: orders?.length,
      text: "All Orders",
    },
    {
      number:
        orders?.filter((order) =>
          order.order_status
            .map((status) => status.status)
            .includes("completed")
        )?.length ?? 0,
      text: "Completed Orders",
    },

    {
      number:
        orders?.filter(
          (order) =>
            !order.order_status
              .map((status) => status.status)
              .includes("completed") &&
            !order.order_status
              .map((status) => status.status)
              .includes("cancelled")
        )?.length ?? 0,
      text: "Pending Orders",
    },
    {
      number:
        orders?.filter((order) =>
          order.order_status
            .map((status) => status.status)
            .includes("cancelled")
        )?.length ?? 0,
      text: "Cancelled Orders",
    },
  ];

  const USER_DETAILS = [
    {
      title: "Name",
      value: user?.name,
    },
    {
      title: "Email",
      value: user?.email,
    },
    {
      title: "Phone No",
      value: user?.phone ?? "N/A",
    },
  ];

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
          >
            {session?.user.image && (
              <Image
                src={session?.user.image}
                alt={session?.user?.name || "User Avatar"}
                width={70}
                height={70}
              />
            )}
          </Avatar>
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
