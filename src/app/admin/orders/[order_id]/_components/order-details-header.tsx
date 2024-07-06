"use client";

import CustomBreadcrumb from "@/app/_components/common/custom-breadcrumb";
import {
  ORDER_STATUS,
  ORDER_STATUS_COLORS,
  ORDER_STATUS_ICONS,
} from "@/shared/constants";
import { getMostRecentStatus, snakeCaseToNormalText } from "@/shared/functions";
import useUpdateOrderDetails from "@/shared/hooks/use-update-order-details";
import { OrderStatusValues, OrderTypeForResponse } from "@/types/orders";
import { UserType } from "@/types/users";
import {
  DeleteForever,
  Download,
  Email,
  MoreVertRounded,
  West,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Dropdown,
  FormControl,
  IconButton,
  Link as JoyLink,
  ListItemDecorator,
  Menu,
  MenuButton,
  MenuItem,
  Option,
  Select,
  Stack,
  Typography,
  useTheme,
} from "@mui/joy";

import dayjs from "dayjs";
import Link from "next/link";
import { useEffect, useState } from "react";
import InvoiceDownloadButton from "../../_components/invoice-download-button";

export default function OrderDetailsHeader({
  orderDetails,
}: {
  orderDetails: OrderTypeForResponse<UserType>;
}) {
  const { updateOrderMutate } = useUpdateOrderDetails();
  const theme = useTheme();
  const [orderStatus, setOrderStatus] = useState<OrderStatusValues>(
    "awaiting_confirmation"
  );

  const breadcrumbItems = [
    {
      label: "Orders",
      href: "/admin/orders",
    },
    {
      label: orderDetails?.invoice_id ?? "",
      isActive: true,
    },
  ];

  useEffect(() => {
    if (orderDetails) {
      setOrderStatus(getMostRecentStatus(orderDetails.order_status));
    }
  }, [orderDetails]);

  const handleStatusChange = async (value: OrderStatusValues) => {
    setOrderStatus(value);
    if (!orderDetails) {
      return;
    }

    if (!orderDetails.customer._id) {
      console.log("Customer ID undefined");
      return;
    }

    const payload = {
      ...orderDetails,
      customer: orderDetails.customer._id,
      order_status: [
        ...(orderDetails?.order_status ?? []),
        {
          status: value,
          timestamp: new Date(),
        },
      ],
    };

    const response = await updateOrderMutate(payload);

    if (!response.success) {
      setOrderStatus(getMostRecentStatus(response.data.order_status));
    }
  };

  if (!orderDetails) {
    return "Failed to load the header...";
  }

  return (
    <>
      <CustomBreadcrumb items={breadcrumbItems} />

      <Stack
        justifyContent="space-between"
        direction={{ xs: "column", md: "row" }}
        alignItems={{
          xs: "flex-start",
          md: "center",
        }}
        spacing={{
          xs: 4,
          md: 2,
        }}
        mt={2}
      >
        <Stack>
          <Stack direction="row" spacing={2}>
            <IconButton
              variant="plain"
              size="sm"
              component={Link}
              href={`/admin/orders`}
            >
              <West />
            </IconButton>
            <Typography component="h1" level="h2">
              {orderDetails?.invoice_id}
            </Typography>
          </Stack>

          <Typography level="body-sm" ml={6} mt={0.5}>
            {dayjs(orderDetails.createdAt).format("DD MMMM YYYY, hh:MM")}
          </Typography>
        </Stack>

        <Stack
          spacing={{
            xs: 3,
            md: 1,
          }}
          direction={{
            xs: "column",
            md: "row",
          }}
          alignItems={{
            xs: "flex-start",
            md: "center",
          }}
          sx={{
            width: {
              xs: "100%",
              md: "unset",
            },
          }}
        >
          <FormControl
            size="sm"
            sx={{
              width: "100%",
            }}
          >
            <Select
              placeholder="Change order status"
              slotProps={{
                button: {
                  id: "select-field-demo-button",
                  sx: {
                    textTransform: "capitalize",
                    fontWeight: 600,
                    color: theme.palette.neutral[700],
                    display: "flex",
                    justifyContent: "center",
                    textAlign: "center",
                  },
                },
              }}
              startDecorator={ORDER_STATUS_ICONS[orderStatus]}
              value={orderStatus}
              sx={{
                ".MuiSelect-startDecorator": {
                  ".MuiSvgIcon-root": {
                    color: ORDER_STATUS_COLORS[orderStatus],
                  },
                },
              }}
              color="neutral"
              onChange={(_, value) => value && handleStatusChange(value)}
            >
              {ORDER_STATUS.map((order) => (
                <Option
                  key={order}
                  value={order}
                  sx={{
                    textTransform: "capitalize",
                  }}
                >
                  {snakeCaseToNormalText(order)}
                </Option>
              ))}
            </Select>
          </FormControl>

          {/* <Button
            size="sm"
            fullWidth
            startDecorator={<Download />}
            color="neutral"
            variant="outlined"
          >
            Download Invoice
          </Button> */}

          <InvoiceDownloadButton
            order={orderDetails}
            buttonProps={{
              size: "sm",
              variant: "outlined",
              color: "neutral",
              sx: {
                boxShadow: "xs",
                fontWeight: 600,
              },
              fullWidth: true,
              startDecorator: <Download />,
            }}
            text="Download Invoice"
          />

          <Dropdown>
            <MenuButton
              slots={{ root: IconButton }}
              slotProps={{
                root: { variant: "plain", color: "neutral", size: "sm" },
              }}
              sx={{
                display: {
                  xs: "none",
                  md: "block",
                },
              }}
            >
              <MoreVertRounded />
            </MenuButton>
            <Menu size="sm" sx={{ minWidth: 140 }} placement="bottom-end">
              <MenuItem color="neutral">
                <ListItemDecorator>
                  <Email />
                </ListItemDecorator>{" "}
                Send Email
              </MenuItem>

              <MenuItem color="danger">
                <ListItemDecorator>
                  <DeleteForever />
                </ListItemDecorator>{" "}
                Delete
              </MenuItem>
            </Menu>
          </Dropdown>
        </Stack>
      </Stack>
    </>
  );
}
