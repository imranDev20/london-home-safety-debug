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

export const PRIMARY_COLOUR = {
  500: "#267ECE",
  600: "#206AB2",
};
export const SECONDARY_COLOUR = {
  500: "#FFC527",
  600: "#E6B322",
};

export const BACKGROUND_COLOUR = {
  level3: "#FAFAFA",
  level5: "#EAF3FB",
};

export const ACCENT_COLOR = {
  accent1: "#434343",
};

export const TEXT_COLOR = {
  primary: "#222222",
};

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

export const FIXED_HEIGHT: number = 285;
