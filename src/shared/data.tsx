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
import BookingIcon from "@/app/_components/icons/booking-icon";
import FastResponseIcon from "@/app/_components/icons/fast-response-icon";
import EngineersIcon from "@/app/_components/icons/engineers-icon";
import LowPriceIcon from "@/app/_components/icons/low-price-icon";

import { NavItem, NavLeafItem } from "@/types/misc";

import backgroundImage from "@/images/about-bg.jpeg";
import EicrOutlinedIcon from "@/app/_components/icons/eicr-outlined-icon";
import FireAlarmBellIcon from "@/app/_components/icons/fire-alarm-bell-icon";
import HealthHeartIcon from "@/app/_components/icons/health-heart-icon";
import HomeUndrawIcon from "@/app/_components/icons/home-undraw-icon";
import BuildingUndrawIcon from "@/app/_components/icons/building-undraw-icon";
import { BACKGROUND_COLOUR } from "./constants";

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
        description:
          "Ensure your home's electrical systems are safe and efficient with our expert services.",
        Icon: EicrOutlinedIcon,
        children: [
          {
            label: "Electrical Installation Condition Report",
            path: "/electrical-installation-condition-report",
            abbr: "EICR",
            Icon: EicrOutlinedTwoIcon,
            image: backgroundImage,
            description:
              "Ensure the safety and compliance of your electrical installations with our thorough EICR.",
            detailedDesc: {
              details:
                "Regular EICR inspections help identify and rectify any issues in your electrical installations. This service is crucial for ensuring the safety and compliance of your electrical systems with legal standards. Our comprehensive reports will detail any defects or necessary repairs for both homes and businesses.",
              points: [
                "Identifies potential electrical hazards",
                "Ensures compliance with safety regulations",
                "Provides a detailed report with recommendations",
              ],
            },

            pricingDetails: [
              {
                type: "Residential",
                unit: "bedroom",
                Icon: HomeUndrawIcon,
                description:
                  "Ensure your home's electrical installations are safe and compliant.",
                prices: [
                  {
                    unitCount: "Studio Flat",
                    price: 79,
                  },
                  {
                    unitCount: 1,
                    price: 99,
                  },
                  {
                    unitCount: 2,
                    price: 99,
                  },

                  {
                    unitCount: 3,
                    price: 119,
                  },
                  {
                    unitCount: 4,
                    price: 119,
                  },

                  {
                    unitCount: 5,
                    price: 149,
                  },
                  {
                    unitCount: 6,
                    price: 149,
                  },
                ],
              },

              {
                type: "Commercial",
                unit: "circuit",
                Icon: BuildingUndrawIcon,
                description:
                  "Comprehensive electrical safety reports for commercial properties.",
                prices: [
                  {
                    unitCount: 1,
                    price: 149,
                  },
                  {
                    unitCount: 2,
                    price: 149,
                  },
                  {
                    unitCount: 3,
                    price: 149,
                  },

                  {
                    unitCount: 4,
                    price: 149,
                  },
                  {
                    unitCount: 5,
                    price: 149,
                  },

                  {
                    unitCount: 6,
                    price: 199,
                  },
                  {
                    unitCount: 7,
                    price: 199,
                  },
                  {
                    unitCount: 8,
                    price: 199,
                  },
                  {
                    unitCount: 9,
                    price: 199,
                  },
                  {
                    unitCount: 10,
                    price: 199,
                  },
                  {
                    unitCount: 11,
                    price: 249,
                  },
                  {
                    unitCount: 12,
                    price: 249,
                  },
                  {
                    unitCount: 13,
                    price: 249,
                  },
                  {
                    unitCount: 14,
                    price: 249,
                  },
                  {
                    unitCount: 15,
                    price: 249,
                  },
                  {
                    unitCount: 16,
                    price: 249,
                  },
                  {
                    unitCount: 17,
                    price: 249,
                  },
                  {
                    unitCount: 18,
                    price: 249,
                  },
                  {
                    unitCount: 19,
                    price: 249,
                  },
                  {
                    unitCount: 20,
                    price: 249,
                  },
                ],
              },
            ],

            pageContent: {
              title: "Ensuring Electrical Safety with Expert EICR Services",
              html: `
    <p>An Electrical Installation Condition Report (EICR) is a detailed assessment of the electrical installations in your property. It identifies any potential hazards, deficiencies, or non-compliance with current safety standards. Our certified experts at London Home Safety Limited conduct thorough EICR inspections to ensure your electrical systems are safe and up to code. Whether for residential or commercial properties, our professional EICR services provide peace of mind, knowing that your environment is secure and compliant. Trust us to deliver reliable and comprehensive EICR solutions tailored to your needs.</p>

    <div>
      <div>
        <h2>Why Do You Need an EICR?</h2>
        <p>An EICR is essential for ensuring the safety of your property’s electrical systems. Over time, electrical installations can deteriorate due to wear and tear, environmental conditions, or previous poor workmanship. Regular EICR inspections help identify these issues before they become serious hazards.</p>
        <p><strong>Benefits of EICR:</strong></p>
        <ul>
          <li><strong>Safety:</strong> Identifies potential electrical hazards and prevents accidents such as fires or electric shocks.</li>
          <li><strong>Compliance:</strong> Ensures your property complies with current electrical safety standards.</li>
          <li><strong>Peace of Mind:</strong> Provides assurance that your electrical installations are safe and reliable.</li>
          <li><strong>Insurance:</strong> Many insurance policies require an up-to-date EICR to maintain coverage.</li>
        </ul>
      </div>
      <blockquote style="background: ${BACKGROUND_COLOUR.level5}; font-size: 18px; padding: 20px; border-radius: 10px; margin: 0; margin-top: 20px">
        <p style="margin:0">Did you know that outdated or faulty electrical installations can pose serious safety risks? Regular EICR inspections are essential to identify potential hazards and ensure compliance with safety standards.</p>
      </blockquote>
    </div>

    <h2>Why Is It Required?</h2>
    <p>EICR inspections are required to ensure compliance with safety regulations and standards, particularly in rented and commercial properties. Landlords are legally obligated to ensure their properties are electrically safe, and regular EICR checks are a key part of this responsibility.</p>
    <p><strong>Legal Requirements:</strong></p>
    <ul>
      <li><strong>Landlords:</strong> Must have an EICR conducted at least every 5 years or at the change of tenancy.</li>
      <li><strong>Businesses:</strong> Should conduct EICR inspections regularly to comply with health and safety regulations and insurance requirements.</li>
      <li><strong>Homeowners:</strong> While not legally required, it is recommended to have an EICR conducted every 10 years for safety and peace of mind.</li>
    </ul>

    <h2>What Will It Do?</h2>
    <p>An EICR assesses the safety and condition of your electrical installations. It identifies any faults or defects that could pose a risk to the occupants.</p>
    <p><strong>EICR Outcomes:</strong></p>
    <ul>
      <li><strong>Identification of Defects:</strong> Lists any issues with the electrical installations, such as outdated wiring or faulty components.</li>
      <li><strong>Risk Assessment:</strong> Evaluates the level of risk associated with each defect.</li>
      <li><strong>Recommendations:</strong> Provides guidance on necessary repairs or upgrades to ensure safety and compliance.</li>
    </ul>

    <h2>Who Should Take It?</h2>
    <p>EICR inspections are recommended for various types of property owners and occupants:</p>
    <p><strong>Who Needs an EICR:</strong></p>
    <ul>
      <li><strong>Landlords:</strong> To ensure rental properties are safe and compliant with legal standards.</li>
      <li><strong>Homeowners:</strong> For peace of mind and to address any potential electrical issues in their homes.</li>
      <li><strong>Business Owners:</strong> To comply with health and safety regulations and protect employees and customers.</li>
      <li><strong>Property Buyers/Sellers:</strong> To assess the condition of the electrical installations before completing a transaction.</li>
    </ul>

    <h2>What Happens During an EICR?</h2>
    <p>During an EICR inspection, a qualified electrician will perform a thorough examination of your property’s electrical systems.</p>
    <p><strong>Inspection Process:</strong></p>
    <ul>
      <li><strong>Visual Inspection:</strong> Checks for visible signs of damage or wear.</li>
      <li><strong>Testing:</strong> Conducts tests on the electrical installations to ensure they are functioning correctly and safely.</li>
      <li><strong>Documentation:</strong> Records the findings and provides a detailed report, including any defects and recommendations.</li>
    </ul>

    <h2>What Happens Afterwards?</h2>
    <p>After the EICR inspection, you will receive a comprehensive report detailing the condition of your electrical installations and any required actions.</p>
    <p><strong>Post-Inspection Steps:</strong></p>
    <ul>
      <li><strong>Review Report:</strong> Go through the findings with the electrician to understand the condition of your electrical systems.</li>
      <li><strong>Address Defects:</strong> Schedule necessary repairs or upgrades as recommended in the report.</li>
      <li><strong>Certification:</strong> Once any required work is completed, you will receive a certificate confirming that your property meets the required safety standards.</li>
    </ul>
    <p>By following these steps, you can ensure that your property’s electrical systems are safe, compliant, and functioning properly. Regular EICR inspections are a proactive measure to protect your property and its occupants from electrical hazards.</p>
  `,
            },

            faqs: [
              {
                ques: "What is an Electrical Installation Condition Report (EICR)?",
                ans: "An EICR is a detailed assessment of the electrical installations in a property. It identifies any potential hazards, deficiencies, or non-compliance with current safety standards to ensure the safety and functionality of electrical systems.",
              },
              {
                ques: "Why do I need an EICR?",
                ans: "An EICR is essential for identifying and addressing potential electrical hazards, ensuring compliance with safety standards, providing peace of mind, and meeting legal and insurance requirements.",
              },
              {
                ques: "How often should an EICR be conducted?",
                ans: "For rented properties, an EICR should be conducted at least every 5 years or at the change of tenancy. For owner-occupied homes, it is recommended to have an EICR every 10 years.",
              },
              {
                ques: "What happens during an EICR inspection?",
                ans: "During an EICR inspection, a qualified electrician will perform a visual inspection, conduct tests on the electrical installations, and document the findings in a detailed report, including any defects and recommendations.",
              },
              {
                ques: "What should I do if my EICR identifies issues?",
                ans: "If your EICR identifies issues, you should schedule the necessary repairs or upgrades as recommended in the report. Once the work is completed, you will receive a certificate confirming that your property meets the required safety standards.",
              },
              {
                ques: "Is an EICR mandatory for landlords?",
                ans: "Yes, landlords are legally required to have an EICR conducted at least every 5 years or at the change of tenancy to ensure rental properties are safe and compliant with electrical safety standards.",
              },
              {
                ques: "How long does an EICR inspection take?",
                ans: "The duration of an EICR inspection can vary depending on the size and complexity of the property, but it typically takes a few hours to complete.",
              },
              {
                ques: "Can I perform an EICR myself?",
                ans: "No, an EICR must be conducted by a qualified and certified electrician who has the necessary skills and knowledge to perform the inspection safely and accurately.",
              },
            ],
          },
          {
            label: "Portable Appliance Testing",
            path: "/portable-appliance-testing",
            abbr: "PAT",
            Icon: PatOutlinedIcon,
            image: backgroundImage,
            description:
              "Test the safety of your portable appliances to prevent electrical hazards with our PAT service.",
            detailedDesc: {
              details:
                "PAT testing is essential for ensuring that all portable electrical appliances are safe to use. Our qualified technicians will inspect and test each appliance, providing you with documentation that confirms compliance with safety standards. This service helps prevent electrical hazards in both residential and commercial properties.",
              points: [
                "Tests the safety of portable appliances",
                "Prevents electrical hazards",
                "Provides certification of compliance",
              ],
            },
          },
          {
            label: "Fuse Box Installation",
            path: "/fuse-box-installation",
            Icon: FuseBoxOutlinedIcon,
            image: backgroundImage,
            description:
              "Upgrade or install a new fuse box to enhance your home's electrical safety and performance.",
            detailedDesc: {
              details:
                "Upgrading or installing a new fuse box (consumer unit) can significantly enhance the safety and reliability of your electrical system. Our skilled electricians will ensure your fuse box meets current regulations and is capable of handling your property's electrical load, whether it's a home or a business.",
              points: [
                "Enhances electrical safety",
                "Meets current regulations",
                "Capable of handling increased electrical load",
              ],
            },
          },
          {
            label: "Electrical Repairs",
            path: "/electrical-repairs",
            Icon: ScrewDriverOutlinedIcon,
            image: backgroundImage,
            description:
              "Get reliable and efficient electrical repairs from our certified professionals.",
            detailedDesc: {
              details:
                "Our team is available to handle any electrical repairs, from minor fixes to major overhauls. Whether you're dealing with faulty wiring, broken outlets, or any other electrical issue, our certified electricians will provide efficient and reliable repair services to ensure your systems are functioning correctly and safely.",
              points: [
                "Efficient and reliable repairs",
                "Handles a wide range of electrical issues",
                "Ensures systems function safely",
              ],
            },
          },
          {
            label: "EV Charger Installation",
            path: "/ev-charger-installation",
            Icon: EvChargerOutlinedIcon,
            image: backgroundImage,
            description:
              "Install a convenient and efficient EV charger at your home for your electric vehicle.",
            detailedDesc: {
              details:
                "We provide professional installation of electric vehicle (EV) chargers, offering you the convenience of charging your EV at home or at your business premises. Our service includes assessing your electrical system, recommending the best charger, and ensuring a safe and efficient installation.",
              points: [
                "Professional installation of EV chargers",
                "Assessment of electrical system",
                "Safe and efficient installation",
              ],
            },
          },
        ],
      },
      {
        label: "Gas Services",
        path: "/gas-services",
        description:
          "Keep your home warm and secure with our reliable gas safety solutions.",
        Icon: GasOutlinedIcon,
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
        description:
          "Protect your property and loved ones with our advanced fire safety measures.",
        Icon: FireAlarmBellIcon,
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
        label: "Health & Safety Services",
        path: "/health-and-safety-services",
        description:
          "Maintain a safe and healthy living environment with our comprehensive safety solutions.",
        Icon: HealthHeartIcon,
        children: [
          {
            label: "Energy Performance Certificate",
            path: "/energy-performance-certificate",
            abbr: "EPC",
            Icon: EpcOutlinedIcon,
            description:
              "Assess the energy efficiency of your home and get certified with our EPC service.",
            image: backgroundImage,
            detailedDesc: {
              details:
                "An EPC provides an assessment of your property's energy efficiency and recommendations for improvement. It is essential for buying, selling, or renting both residential and commercial properties. Our experts will conduct a thorough inspection and provide you with an official certificate.",
              points: [
                "Detailed energy efficiency rating",
                "Recommendations for improving energy efficiency",
                "Mandatory for selling or renting properties",
              ],
            },
          },
        ],
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

export const ADVANTAGES = [
  {
    id: 1,
    advantageName: "Certified Experts",
    advantageDetail: "Highly trained and accredited professionals.",
    Icon: EngineersIcon,
  },
  {
    id: 2,
    advantageName: "Price Match Guarantee",
    advantageDetail: "We promise unbeatable pricing.",
    Icon: LowPriceIcon,
  },
  {
    id: 3,
    advantageName: "Rapid Response",
    advantageDetail: "Appointments available as early as tomorrow.",
    Icon: FastResponseIcon,
  },
  {
    id: 4,
    advantageName: "Flexible Scheduling",
    advantageDetail: "Book appointments at your convenience.",
    Icon: BookingIcon,
  },
];
