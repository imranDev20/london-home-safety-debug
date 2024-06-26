import { Grid, Skeleton } from "@mui/joy";
import React from "react";

export default function TestimonialSkeleton() {
  return (
    <>
      <Grid
        container
        spacing={4}
        sx={{
          px: 2,
        }}
      >
        {[0, 1].map((item) => (
          <Grid xs={6} key={item}>
            <Skeleton
              variant="rectangular"
              sx={{
                width: "100%",
                height: "298px",
                borderRadius: "xl",
              }}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
