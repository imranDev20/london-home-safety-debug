"use state";
import React, { useState } from "react";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import StarIcon from "@mui/icons-material/Star";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import { BACKGROUND_COLOUR } from "@/shared/constants";

const TRUNCATE_LENGTH = 150;

interface TestimonialCardProps {
  slide: any; // Replace with the appropriate type for slide data
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ slide }) => {
  const [showFullContent, setShowFullContent] = useState(false);
  const truncatedContent =
    slide.content.length > TRUNCATE_LENGTH
      ? `${slide.content.slice(0, TRUNCATE_LENGTH)}...`
      : slide.content;

  const toggleShowFullContent = () => {
    setShowFullContent((prevState) => !prevState);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        variant="plain"
        sx={{
          width: "100%",
          borderRadius: "xl",
          backgroundColor: BACKGROUND_COLOUR.level3,
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <FormatQuoteIcon color="primary" sx={{ fontSize: 40 }} />
          <Typography level="title-lg" component="h4" sx={{ my: 2 }}>
            {slide.subject}
          </Typography>

          <Typography color="neutral" sx={{ my: 2, textAlign: "center" }}>
            {showFullContent ? slide.content : truncatedContent}{" "}
            {slide.content.length > TRUNCATE_LENGTH && (
              <Button
                sx={{
                  display: "inline-block",
                }}
                variant="plain"
                color="neutral"
                onClick={toggleShowFullContent}
              >
                {showFullContent ? "Read Less" : "Read More"}
              </Button>
            )}
          </Typography>

          <Box>
            {[...Array(slide.rating)].map((_, index) => (
              <StarIcon key={index} sx={{ color: "#ECBD41" }} />
            ))}
            {[...Array(5 - slide.rating)].map((_, index) => (
              <StarIcon key={index} sx={{ color: "#DBDBDB" }} />
            ))}
          </Box>
          <Typography level="title-md">{slide.name}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TestimonialCard;
