import { FormatQuote, ShoppingCart } from "@mui/icons-material";
import { Box, Typography } from "@mui/joy";

export default function TestimonialsPage() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <FormatQuote
            sx={{
              mr: 1,
            }}
            color="primary"
          />
          <Typography component="h1" level="h3">
            Testimonials
          </Typography>
        </Box>
      </Box>
    </>
  );
}
