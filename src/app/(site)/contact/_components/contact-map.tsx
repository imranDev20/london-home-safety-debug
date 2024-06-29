import { Box } from "@mui/joy";
import React from "react";

export default function ContactMap() {
  return (
    <>
      <Box sx={{}}>
        <iframe
          src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=43%20Felton%20Road,%20Barking+(London%20Home%20Safety)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          style={{
            width: "100%",
            height: "500px",
            border: 0,
            overflow: "hidden",
          }}
        ></iframe>
      </Box>
    </>
  );
}
