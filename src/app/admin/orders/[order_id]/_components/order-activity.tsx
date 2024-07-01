"use client";
import { snakeCaseToNormalText } from "@/shared/functions";
import useOrderDetails from "@/shared/hooks/use-order-details";
import { OrderTypeForResponse } from "@/types/orders";
import { UserType } from "@/types/users";
import { Circle, KeyboardArrowRightRounded } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemContent,
  ListItemDecorator,
  Typography,
  useTheme,
} from "@mui/joy";
import dayjs from "dayjs";

export default function OrderActivity({
  orderDetails,
}: {
  orderDetails: OrderTypeForResponse<UserType>;
}) {
  const theme = useTheme();

  return (
    <Box>
      <Typography
        level="title-lg"
        sx={{
          mb: 2,
        }}
      >
        Order Activity
      </Typography>

      <Card>
        <CardContent
          sx={{
            alignItems: "flex-start",
          }}
        >
          <List sx={{ "--ListItemDecorator-size": "40px", gap: 2 }}>
            {orderDetails?.order_status.slice(0, 3).map((status, index) => (
              <ListItem key={status._id} sx={{ alignItems: "flex-start" }}>
                <ListItemDecorator
                  sx={{
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      height: "100%",
                      width: "1px",
                      bgcolor: "divider",
                      left: "calc(var(--ListItem-paddingLeft) + 12px)",
                      top: "50%",
                    },
                  }}
                >
                  <Avatar sx={{ "--Avatar-size": "24px" }}>
                    <Circle
                      sx={{
                        color:
                          index === 0
                            ? theme.palette.success[500]
                            : theme.palette.neutral[500],
                      }}
                    />
                  </Avatar>
                </ListItemDecorator>
                <ListItemContent>
                  <Typography level="body-xs">
                    {dayjs(status.timestamp).format("DD MMMM YYYY, hh:mm A")}
                  </Typography>
                  <Typography
                    level="title-sm"
                    sx={{
                      textTransform: "capitalize",
                    }}
                  >
                    {snakeCaseToNormalText(status.status)}
                  </Typography>
                </ListItemContent>
              </ListItem>
            ))}
          </List>
          <Button
            size="sm"
            variant="plain"
            endDecorator={
              <KeyboardArrowRightRounded
                sx={{
                  fontSize: 16,
                }}
              />
            }
            sx={{ px: 1, mt: 1 }}
          >
            Expand
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
