import React from "react";
import { Star } from "@mui/icons-material";
import { Box, Container, Grid, Sheet, Typography } from "@mui/joy";
import TestimonialModal from "./testimonial-modal";
import TestimonialSlider from "./testimonial-slider";
import Testimonial from "@/app/api/_models/Testimonial";
import { ITestimonial } from "@/types/testimonial";
import dbConnect from "@/app/api/_lib/dbConnect";
import "@/styles/embla.css";

async function fetchTestimonials(page: number): Promise<ITestimonial[]> {
  await dbConnect();
  const limit = 10;
  const skip = (page - 1) * limit;

  const testimonials: ITestimonial[] = await Testimonial.find({})
    .sort({ createdAt: -1 }) // Sort by createdAt in descending order
    .skip(skip)
    .limit(limit);

  return testimonials;
}

export default async function Testimonials() {
  const testimonialData = await fetchTestimonials(1);

  return (
    <Sheet
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
            <TestimonialSlider slides={testimonialData} />
          </Grid>
        </Grid>

        <TestimonialModal />
      </Container>
    </Sheet>
  );
}
