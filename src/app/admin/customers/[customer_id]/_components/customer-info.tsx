"use client";
import { UserType } from "@/types/users";
import { MapOutlined, PhoneOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Sheet,
  Stack,
  Typography,
} from "@mui/joy";

const CustomerInfo = ({ userDetails }: { userDetails: UserType }) => {
  return (
    <>
      <Typography
        level="title-lg"
        sx={{
          mb: 2,
        }}
      >
        Customer Details
      </Typography>

      <Card>
        <CardContent orientation="vertical">
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar>{userDetails?.name?.charAt(0)}</Avatar>

            <Stack>
              <Typography level="title-md">{userDetails?.name}</Typography>
              <Typography level="body-sm">{userDetails?.email}</Typography>
            </Stack>
          </Stack>

          <Stack spacing={2} mt={3}>
            <Stack direction="row" spacing={1} alignItems="center">
              <PhoneOutlined
                sx={{
                  fontSize: 20,
                }}
              />
              <Typography level="title-sm">{userDetails?.phone}</Typography>
            </Stack>

            <Stack direction="row" spacing={1}>
              <MapOutlined
                sx={{
                  fontSize: 20,
                }}
              />
              <Typography level="title-sm">
                {userDetails?.address?.street}, {userDetails?.address?.city}{" "}
                {userDetails?.address?.postcode}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
};

export default CustomerInfo;
