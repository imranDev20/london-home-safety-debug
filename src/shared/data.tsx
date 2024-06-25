import BoilerOutlinedIcon from "@/app/_components/icons/boiler-outlined-icon";
import EicrOutlinedTwoIcon from "@/app/_components/icons/eicr-outlined-two-icon";
import EpcOutlinedIcon from "@/app/_components/icons/epc-outlined-icon";
import EvChargerOutlinedIcon from "@/app/_components/icons/ev-charger-outlined-icon";
import FireAlarmOutlinedIcon from "@/app/_components/icons/fire-alarm-outlined-icon";
import FireAlarmOutlinedTwoIcon from "@/app/_components/icons/fire-alarm-outlined-two-icon";
import FireRiskOutlinedIcon from "@/app/_components/icons/fire-risk-outlined-icon";
import FuseBoxOutlinedIcon from "@/app/_components/icons/fuse-box-outlined-icon";
import GasOutlinedIcon from "@/app/_components/icons/gas-outlined-icon";
import PatOutlinedIcon from "@/app/_components/icons/pat-outlined-icon";
import ScrewDriverOutlinedIcon from "@/app/_components/icons/screw-driver-outlined-icon";

import { NavItem, NavLeafItem } from "@/types/misc";

import SvgIcon from "@mui/joy/SvgIcon";

import backgroundImage from "@/images/about-bg.jpeg";

export const OTHER_PAGES = [
  {
    label: "Privacy Policy",
    path: "/privacy-policy",
  },
  {
    label: "Terms & Conditions",
    path: "/terms-and-conditions",
  },
  {
    label: "Cookie Policy",
    path: "/cookie-policy",
  },
  {
    label: "Health & Safety Policy",
    path: "/health-and-safety-policy",
  },
];

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", path: "/" },
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
            label: "Energy Performance Certificate",
            path: "/epc",
            abbr: "EPC",
            Icon: EpcOutlinedIcon,
            description:
              "Assess the energy efficiency of your home and get certified with our EPC service.",
            image: backgroundImage,
          },
          {
            label: "Electrical Installation Condition Report",
            path: "/eicr",
            abbr: "EICR",
            Icon: EicrOutlinedTwoIcon,
            image: backgroundImage,
            description:
              "Ensure the safety and compliance of your electrical installations with our thorough EICR.",
          },
          {
            label: "Portable Appliance Testing",
            path: "/pat",
            abbr: "PAT",
            Icon: PatOutlinedIcon,
            image: backgroundImage,
            description:
              "Test the safety of your portable appliances to prevent electrical hazards with our PAT service.",
          },
          {
            label: "Fuse Box Installation",
            path: "/fuse-box-installation",
            Icon: FuseBoxOutlinedIcon,
            image: backgroundImage,
            description:
              "Upgrade or install a new fuse box to enhance your home's electrical safety and performance.",
          },
          {
            label: "Electrical Repairs",
            path: "/electrical-repairs",
            Icon: ScrewDriverOutlinedIcon,
            image: backgroundImage,
            description:
              "Get reliable and efficient electrical repairs from our certified professionals.",
          },
          {
            label: "EV Charger Installation",
            path: "/ev-charger-installation",
            Icon: EvChargerOutlinedIcon,
            image: backgroundImage,
            description:
              "Install a convenient and efficient EV charger at your home for your electric vehicle.",
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
            Icon: GasOutlinedIcon,
            image: backgroundImage,
            description:
              "Ensure the safety of your gas appliances with our certification and repair services.",
          },
          {
            label: "Boiler Service & Repair",
            path: "/boiler-service-repair",
            Icon: BoilerOutlinedIcon,
            image: backgroundImage,
            description:
              "Maintain and repair your boiler to ensure efficient and safe operation.",
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
            Icon: FireRiskOutlinedIcon,
            image: backgroundImage,
            description:
              "Identify and mitigate fire hazards in your home with our comprehensive fire risk assessments.",
          },
          {
            label: "Fire Alarm Certificate",
            path: "/fire-alarm-certificate",
            Icon: FireAlarmOutlinedIcon,
            image: backgroundImage,
            description:
              "Certify your fire alarm system to ensure it meets all safety regulations.",
          },
          {
            label: "Fire Alarm Installation",
            path: "/fire-alarm-installation",
            Icon: FireAlarmOutlinedTwoIcon,
            image: backgroundImage,
            description:
              "Install a reliable fire alarm system to protect your home and loved ones.",
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

export const ALL_SERVICES: NavLeafItem[] =
  NAV_ITEMS.find((item) => item.label === "Services")?.children?.flatMap(
    (category) =>
      (category.children || []).map((service) => ({
        ...service,
        categoryPath: category.path,
      }))
  ) ?? [];

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

export const FIXED_HEIGHT: number = 285;
export const BUSINESS_NAME: string = "London Home Safety Limited";
export const ADDRESS: string = "43 Felton Road, Barking, London IG11 7YA";
export const PHONE_NO: string = "020 8146 6698";
export const WEBSITE_URL: string = "www.londonhomesafety.co.uk";
export const EMAIL_ADDRESS: string = "info@londonhomesafety.co.uk";

export const FAQ_HOME = [
  {
    title: "What is an EPC and why do I need one?",
    content:
      "An Energy Performance Certificate (EPC) provides information about the energy efficiency of a property. It's required for properties being sold or rented and helps improve energy use and reduce costs.",
  },
  {
    title:
      "How often should I have an Electrical Installation Condition Report (EICR) conducted?",
    content:
      "It's recommended to have an EICR conducted every 5 years for rented properties and every 10 years for owner-occupied homes. Regular inspections ensure your electrical systems are safe and compliant with regulations.",
  },
  {
    title: "What does a Gas Safety Certificate entail?",
    content:
      "A Gas Safety Certificate confirms that all gas appliances, fittings, and flues in a property are safe to use. It's a legal requirement for landlords to have an annual gas safety check conducted by a registered engineer.",
  },
  {
    title: "Why is PAT Testing important for my home?",
    content:
      "Portable Appliance Testing (PAT) is important to ensure that electrical appliances are safe to use. Regular PAT testing helps prevent electrical hazards and ensures compliance with safety standards.",
  },
  {
    title: "How can I benefit from installing an EV charging station at home?",
    content:
      "Installing an EV charging station at home offers convenience and cost savings for electric vehicle owners. It ensures your vehicle is always ready to go and can increase the value of your property.",
  },
];

export const WORKING_HOURS = [
  { dayOfWeek: "Monday", start: "08:00", end: "18:00" },
  { dayOfWeek: "Tuesday", start: "08:00", end: "18:00" },
  { dayOfWeek: "Wednesday", start: "08:00", end: "18:00" },
  { dayOfWeek: "Thursday", start: "08:00", end: "18:00" },
  { dayOfWeek: "Friday", start: "08:00", end: "18:00" },
  { dayOfWeek: "Saturday", start: "09:00", end: "14:00" },
  { dayOfWeek: "Sunday", start: "Closed", end: "Closed" },
];
