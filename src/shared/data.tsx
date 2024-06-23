import { HomeRounded } from "@mui/icons-material";

export const NAV_ITEMS = [
  { label: "Home", path: "/", icon: <HomeRounded /> },
  { label: "About", path: "/about" },
  {
    label: "Services",
    path: "/services",
    children: [
      {
        label: "Electrical Services",
        path: "/electrical-services",
        children: [
          {
            label: "Energy Certificate",
            path: "/epc",
          },
          {
            label: "EICR",
            path: "/eicr",
          },
          {
            label: "PAT Testing",
            path: "/pat",
          },
          {
            label: "Fuse Box Installation",
            path: "/fuse-box-installation",
          },
          {
            label: "Electrical Repairs",
            path: "/electrical-repairs",
          },
          {
            label: "EV Charger Installation",
            path: "/ev-charger-installation",
          },
        ],
      },
      {
        label: "Gas Services",
        path: "/gas-services",
        children: [
          {
            label: "Gas Certificate & Repairs",
            path: "/gas-certificate-repair",
          },
          {
            label: "Boiler Service & Repair",
            path: "/boiler-service-repair",
          },
        ],
      },
      {
        label: "Fire Services",
        path: "/fire-services",
        children: [
          {
            label: "Fire Risk Assessment",
            path: "/fire-risk-assessment",
          },
          {
            label: "Boiler Service & Repair",
            path: "/fire-alarm-certificate",
          },
          {
            label: "Fire Alarm Installation",
            path: "/fire-alarm-installation",
          },
        ],
      },
      {
        label: "Health Services",
        path: "/health-services",
      },
    ],
  },
  { label: "Contact", path: "/contact" },
];
export const CONGESTION_ZONE_OPTIONS = [
  {
    value: "congestion",
    name: "Yes",
    nameAlt: "In Congestion Zone",
    cost: 18,
  },
  {
    value: "non_congestion",
    name: "No",
    nameAlt: "Outside Congestion Zone",
    cost: 0,
  },
];

export const PARKING_OPTIONS = [
  {
    value: "free",
    name: "Free Parking Available",
    cost: 0,
  },
  {
    value: "paid",
    name: "Paid Parking Available",
    cost: 5,
  },
  {
    value: "unavailable",
    name: "No Parking Available",
    cost: 5,
  },
];
