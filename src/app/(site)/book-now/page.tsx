import Box from "@mui/joy/Box";
import {
  Card,
  CircularProgress,
  Container,
  Stack,
  Typography,
  CardContent,
} from "@mui/joy";
import PageHeader from "../../_components/common/page-header";
import BackgroundImage from "@/images/about-bg.jpeg";
import ServiceDetails from "./_components/service-details";
import PersonalDetails from "./_components/personal-details";
import Confirmation from "./_components/confirmation";
import BookNowStepper from "./_components/book-now-stepper";
import { hexToRgba } from "@/shared/functions";
import { SECONDARY_COLOUR } from "@/shared/constants";

const breadCrumbOptions = [
  {
    label: "Book Now",
    isCurrentPage: true,
  },
];

export default function BookNowPage({
  searchParams,
}: {
  searchParams: {
    active_step: string;
  };
}) {
  const activeStep = parseInt(searchParams?.active_step) || 1;

  return (
    <Box
      sx={{
        backgroundColor: "#F7F7F7",
        display: "flex",
        flexDirection: "column",
        justifyContent: "stretch",
      }}
    >
      <PageHeader
        backgroundImage={BackgroundImage}
        breadCrumbOptions={breadCrumbOptions}
      />

      <Container
        maxWidth="md"
        sx={{
          my: 7,
        }}
      >
        <Stack
          direction="row"
          spacing={3}
          alignItems="center"
          sx={{
            mb: 3,
            display: {
              xs: "flex",
              md: "none",
            },
          }}
        >
          <CircularProgress
            sx={{
              "--CircularProgress-trackColor": hexToRgba(
                SECONDARY_COLOUR[500],
                0.3
              ),
              "--CircularProgress-size": "60px",
            }}
            determinate
            value={100 / (4 - activeStep)}
          >
            {activeStep} / 3
          </CircularProgress>

          <Stack justifyContent="center">
            <Typography fontWeight={600} fontSize={24}>
              {activeStep === 1 && "Property Details"}
              {activeStep === 2 && "Confirmation & Payment"}
              {activeStep === 3 && "Confirmation & Payment"}
            </Typography>

            <Typography fontWeight={500} fontSize={16} color="neutral">
              {activeStep === 1 && "Next: Personal Details"}
              {activeStep === 2 && "Next: Confirmation & Payment"}
              {activeStep === 3 && "Next: Complete Order"}
            </Typography>
          </Stack>
        </Stack>

        <Box
          sx={{
            mb: 2,
          }}
        >
          <BookNowStepper />
        </Box>

        <Box>
          <Card
            variant="plain"
            size="lg"
            sx={{
              boxShadow: "md",
            }}
          >
            <CardContent>
              {activeStep === 1 || Number.isNaN(activeStep) ? (
                <ServiceDetails />
              ) : null}

              {activeStep === 2 ? <PersonalDetails /> : null}
              {activeStep === 3 || activeStep === 4 ? <Confirmation /> : null}
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
}
