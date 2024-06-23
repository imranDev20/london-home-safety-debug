import {
  AttachMoneyOutlined,
  BuildOutlined,
  CancelOutlined,
  CheckCircleOutlined,
  CheckOutlined,
  DirectionsCarOutlined,
  DoneAllOutlined,
  HourglassBottomOutlined,
  HourglassEmptyOutlined,
} from "@mui/icons-material";

export const FIXED_HEIGHT: number = 285;
export const BUSINESS_NAME: string = "London Home Safety Limited";
export const ADDRESS: string = "43 Felton Road, Barking, London IG11 7YA";
export const PHONE_NO: string = "020 8146 6698";
export const WEBSITE_URL: string = "www.londonhomesafety.co.uk";
export const EMAIL_ADDRESS: string = "info@londonhomesafety.co.uk";

export const ORDER_STATUS_COLORS = {
  pending_payment: "#FFC107",
  payment_completed: "#4CAF50",
  awaiting_confirmation: "#FF9800",
  order_confirmed: "#2196F3",
  engineer_en_route: "#9C27B0",
  work_in_progress: "#673AB7",
  work_completed: "#009688",
  completed: "#4CAF50",
  cancelled: "#F44336",
};

export const ORDER_STATUS_ICONS = {
  pending_payment: <HourglassEmptyOutlined />,
  payment_completed: <AttachMoneyOutlined />,
  awaiting_confirmation: <HourglassBottomOutlined />,
  order_confirmed: <CheckCircleOutlined />,
  engineer_en_route: <DirectionsCarOutlined />,
  work_in_progress: <BuildOutlined />,
  work_completed: <CheckOutlined />,
  completed: <DoneAllOutlined />,
  cancelled: <CancelOutlined />,
};

export const ORDER_STATUS = [
  "pending_payment",
  "payment_completed",
  "awaiting_confirmation",
  "order_confirmed",
  "engineer_en_route",
  "work_in_progress",
  "work_completed",
  "completed",
  "cancelled",
];
