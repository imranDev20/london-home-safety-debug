import * as React from "react";
import Box from "@mui/joy/Box";
import List from "@mui/joy/List";
import ListSubheader from "@mui/joy/ListSubheader";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Container from "@mui/joy/Container";
import Divider from "@mui/joy/Divider";
import Grid from "@mui/joy/Grid";
import PhoneIcon from "@mui/icons-material/Phone";
import MailIcon from "@mui/icons-material/Mail";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import PlaceIcon from "@mui/icons-material/Place";
import Link from "next/link";
import {
  ADDRESS,
  ALL_SERVICES,
  EMAIL_ADDRESS,
  NAV_ITEMS,
  OTHER_PAGES,
  PHONE_NO,
} from "@/shared/data";
import { PRIMARY_COLOUR } from "@/shared/constants";

export default function Footer() {
  const today = new Date();
  const year = today.getFullYear();

  console.log(ALL_SERVICES);

  return (
    <Box>
      <Sheet
        variant="solid"
        invertedColors
        sx={{
          backgroundColor: PRIMARY_COLOUR[600],
          py: 7,
        }}
      >
        <Container>
          <Grid
            container
            spacing={2}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: { md: "flex-start" },
              justifyContent: "space-between",
            }}
          >
            <Grid xs={12} md={6} lg={4}>
              <Box>
                <Typography component="h3" level="h3" sx={{ mb: 2 }}>
                  London Home Safety
                </Typography>
                <Typography>
                  Protecting your home with expert safety solutions. From
                  electrical and gas safety to fire prevention and health
                  services, we ensure peace of mind for homeowners across
                  London. Your safety is our priority. Contact us today and
                  experience the difference with our professional team.
                </Typography>
              </Box>
            </Grid>
            <Grid xs={12} md={6} lg={2}>
              <List>
                <ListItem nested>
                  <ListSubheader
                    sx={{
                      fontSize: 18,
                      fontWeight: "xl",
                      color: "white",
                      mb: 1,
                    }}
                  >
                    Company
                  </ListSubheader>
                  {NAV_ITEMS.map((option) => (
                    <ListItem key={option.path}>
                      <ListItemButton component={Link} href={option.path}>
                        {option.label}
                      </ListItemButton>
                    </ListItem>
                  ))}

                  {OTHER_PAGES.map((option) => (
                    <ListItem key={option.path}>
                      <ListItemButton component={Link} href={option.path}>
                        {option.label}
                      </ListItemButton>
                    </ListItem>
                  ))}
                </ListItem>
              </List>
            </Grid>
            <Grid xs={12} md={6} lg={3}>
              <List>
                <ListItem nested>
                  <ListSubheader
                    sx={{
                      fontSize: 18,
                      fontWeight: "xl",
                      color: "white",
                      mb: 1,
                    }}
                  >
                    Services
                  </ListSubheader>

                  {ALL_SERVICES.map((item) => (
                    <ListItem key={item.path}>
                      <ListItemButton
                        component={Link}
                        href={`/categories${item.categoryPath}${item.path}`}
                      >
                        {item.label}
                      </ListItemButton>
                    </ListItem>
                  ))}
                </ListItem>
              </List>
            </Grid>
            <Grid xs={12} md={6} lg={3}>
              <List>
                <ListItem nested sx={{}}>
                  <ListSubheader
                    sx={{
                      fontSize: 18,
                      fontWeight: "xl",
                      color: "white",
                      mb: 1,
                      display: "block",
                    }}
                  >
                    Contact us
                  </ListSubheader>
                  <ListItem>
                    <MailIcon /> {EMAIL_ADDRESS}
                  </ListItem>
                  <ListItem>
                    <PhoneIcon /> {PHONE_NO}
                  </ListItem>
                  <ListItem>
                    <PlaceIcon />
                    {ADDRESS}
                  </ListItem>
                  <ListItem
                    sx={{
                      mt: 2,
                    }}
                  >
                    <FacebookIcon />
                    <InstagramIcon />
                    <XIcon />
                    <YouTubeIcon />
                  </ListItem>
                </ListItem>
              </List>
            </Grid>
          </Grid>
          <Divider
            sx={{
              my: 5,
            }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row", md: "row" },
              justifyContent: {
                xs: "center",
                sm: "space-between",
                md: "space-between",
              },
              py: 2,
            }}
          >
            <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
              <Typography>
                ©{year} Home Safety London. All Right Reserved
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "center", sm: "flex-start" },
              }}
            >
              <Typography>Support</Typography>
              <Divider orientation="vertical" sx={{ mx: 1 }} />
              <Typography>Disclaimer</Typography>
              <Divider orientation="vertical" sx={{ mx: 1 }} />
              <Typography>Contact us</Typography>
            </Box>
          </Box>
        </Container>
      </Sheet>
    </Box>
  );
}
