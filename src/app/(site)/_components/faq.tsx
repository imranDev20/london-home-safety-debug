import Box from "@mui/joy/Box";
import Container from "@mui/joy/Container";
import Grid from "@mui/joy/Grid";
import Typography from "@mui/joy/Typography";
import accordionSummaryClasses from "@mui/joy/AccordionSummary/accordionSummaryClasses";
import AccordionGroup from "@mui/joy/AccordionGroup";
import Accordion from "@mui/joy/Accordion";
import AccordionDetails from "@mui/joy/AccordionDetails";
import AccordionSummary from "@mui/joy/AccordionSummary";

import engineerNote from "../../../images/engineer-note.jpg";
import Image from "next/image";
import { TEXT_COLOR } from "@/shared/constants";
import { FAQ_HOME } from "@/shared/data";

export default function Faq() {
  return (
    <Box sx={{ mt: 20, mb: 15 }}>
      <Container>
        <Grid
          container
          spacing={{
            xs: 0,
            md: 5,
            lg: 10,
          }}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Grid xs={12} md={6} sx={{ height: "100%" }}>
            <Image
              src={engineerNote}
              alt="faqNote"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 5,
                overflow: "hidden",
                objectFit: "cover",
              }}
            />
          </Grid>
          <Grid xs={12} md={6}>
            <Typography
              component="h2"
              sx={{
                mb: 2,
              }}
              fontSize={36}
            >
              Frequently Asked Questions
            </Typography>

            <Typography
              color="neutral"
              sx={{
                mb: 3,
                lineHeight: 1.8,
              }}
            >
              Got questions? We&apos;ve got answers! Here are some of the most
              common questions we receive from our customers, along with clear
              and helpful answers to guide you through our services and
              processes.
            </Typography>

            <AccordionGroup
              variant="outlined"
              transition="0.2s"
              size="lg"
              sx={{
                border: "none",
                [`& .${accordionSummaryClasses.button}`]: {
                  bgcolor: "transparent",
                  py: 1.2,
                },
                [`& .${accordionSummaryClasses.button}:active`]: {
                  bgcolor: "transparent!important",
                },

                [`& .${accordionSummaryClasses.button}:hover`]: {
                  bgcolor: "transparent!important",
                },
              }}
            >
              {FAQ_HOME.map((item, index) => (
                <Accordion
                  defaultExpanded={index === 0}
                  key={item.title}
                  sx={{
                    mb: 1,
                    color: TEXT_COLOR.primary,
                    py: 1,
                  }}
                >
                  <AccordionSummary
                    sx={{
                      fontWeight: 600,
                      fontSize: "lg",
                      px: 0,
                    }}
                  >
                    {item.title}
                  </AccordionSummary>
                  <AccordionDetails
                    color="neutral"
                    slotProps={{
                      content: {
                        sx: {
                          px: 0,
                        },
                      },
                    }}
                  >
                    <Typography color="neutral" level="body-lg">
                      {item.content}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </AccordionGroup>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
