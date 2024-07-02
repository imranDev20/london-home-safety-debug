import { TEXT_COLOR } from "@/shared/constants";
import HomeIcon from "@mui/icons-material/Home";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import JoyLink from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";

import Link from "next/link";
import EngineerListHeader from "./_components/engineer-list-header";
import EngineerListOptions from "./_components/engineer-list-options";
import EngineerCards from "./_components/engineer-cards";

export default function AdminEngineersPage() {
  return (
    <>
      <Breadcrumbs
        sx={{
          px: 0,
          fontSize: 13,
        }}
        separator={
          <KeyboardArrowRightIcon
            fontSize="inherit"
            sx={{
              fontSize: 20,
            }}
          />
        }
      >
        <JoyLink
          component={Link}
          color="neutral"
          href="/admin/"
          sx={{
            color: TEXT_COLOR.primary,
            textDecoration: "none",
          }}
        >
          <HomeIcon />
        </JoyLink>
        <Typography
          color="primary"
          sx={{
            textDecoration: "none",
          }}
        >
          Engineers
        </Typography>
      </Breadcrumbs>

      <EngineerListHeader />
      <EngineerListOptions />

      <EngineerCards />
    </>
  );
}
