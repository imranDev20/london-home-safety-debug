import React, { Suspense } from "react";
import { Star } from "@mui/icons-material";
import { Box, Container, Grid, Sheet, Typography } from "@mui/joy";
import TestimonialModal from "./testimonial-modal";
import TestimonialDataWrapper from "./testimonial-data-wrapper";
import TestimonialSkeleton from "./testimonial-skeleton";

export default function Testimonials() {
  return (
    <Sheet
      component="section"
      sx={{
        mt: 5,
        py: 10,
        backgroundColor: "white",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid xs={12} md={4}>
            <Box
              sx={{
                py: 2,
              }}
            >
              <Typography
                level="h1"
                component="h2"
                fontSize={40}
                sx={{
                  mb: 4,
                }}
              >
                Hear from Our Satisfied Customers
              </Typography>

              <Box
                sx={{
                  my: 2,
                }}
              >
                {[...Array(5)].map((_, index) => (
                  <Star
                    sx={{
                      fontSize: 30,
                      color: "#ECBD41",
                    }}
                    key={index}
                  />
                ))}
              </Box>

              <Typography level="body-lg" color="neutral">
                Our commitment to excellence and customer satisfaction shines
                through in their words.
              </Typography>
            </Box>
          </Grid>
          <Grid xs={12} md={8}>
            <Suspense fallback={<TestimonialSkeleton />}>
              <TestimonialDataWrapper />
            </Suspense>
          </Grid>
        </Grid>

        <TestimonialModal />
      </Container>
    </Sheet>
  );
}
