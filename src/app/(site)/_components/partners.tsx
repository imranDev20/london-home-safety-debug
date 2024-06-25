import Image from "next/image";

import Box from "@mui/joy/Box";
import Container from "@mui/joy/Container";
import Typography from "@mui/joy/Typography";
import Divider from "@mui/joy/Divider";

import NapitImage from "../../../images/partner-logos/napit.png";
import GasSafeRegister from "../../../images/partner-logos/gas-safe-register.svg";
import Nebosh from "../../../images/partner-logos/nebosh.svg";
import TrustMark from "@/images/partner-logos/trustmark.jpeg";
import IFSM from "@/images/partner-logos/ifsm.png";
import NICEIC from "@/images/partner-logos/niceic.svg";
import CityGuilds from "@/images/partner-logos/city-guilds.svg";
import ElmhurstEnergy from "@/images/partner-logos/elmhurst-energy.jpeg";
import EalRecognised from "@/images/partner-logos/eal.png";
import PartP from "@/images/partner-logos/part-p.png";

import styles from "@/styles/Partners.module.css";

const SPONSER_PARTNER = [
  {
    id: 1,
    image: NapitImage,
  },
  {
    id: 2,
    image: GasSafeRegister,
  },
  {
    id: 3,
    image: Nebosh,
  },
  {
    id: 4,
    image: TrustMark,
  },
  {
    id: 5,
    image: IFSM,
  },
  {
    id: 6,
    image: NICEIC,
  },
  {
    id: 7,
    image: CityGuilds,
  },
  {
    id: 8,
    image: ElmhurstEnergy,
  },
  {
    id: 9,
    image: EalRecognised,
  },
  {
    id: 10,
    image: PartP,
  },
];

export default function Partners({ isHome }: { isHome?: boolean }) {
  return (
    <Container sx={{ my: isHome ? 3 : 15 }} id="partners">
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        {isHome && (
          <Divider sx={{ mb: 5 }}>
            <Typography
              component="h2"
              level="h2"
              sx={{
                whiteSpace: "wrap",
              }}
            >
              Proudly{" "}
              <Typography component="span" color="primary">
                Certified
              </Typography>{" "}
              &{" "}
              <Typography component="span" color="primary">
                Accredited
              </Typography>{" "}
              by Leading Authorities
            </Typography>
          </Divider>
        )}

        {!isHome && (
          <Typography
            level="h2"
            sx={{
              my: 3,
            }}
          >
            Certified and Trusted Professional Engineers
          </Typography>
        )}
      </Box>

      <div className={styles.carouselContainer}>
        <div className={styles.carouselTrack}>
          {SPONSER_PARTNER.map((item, index) => (
            <div className={styles.logo} key={index}>
              <Image
                width={
                  item.id === 4 ||
                  item.id === 6 ||
                  item.id === 7 ||
                  item.id === 8 ||
                  item.id === 9 ||
                  item.id === 10
                    ? 120
                    : item.id === 5
                    ? 140
                    : 80
                }
                src={item.image}
                alt={`Logo ${index + 1}`}
              />
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
