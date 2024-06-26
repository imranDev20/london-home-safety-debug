import { SECONDARY_COLOUR } from "@/shared/constants";
import { hexToRgba } from "@/shared/functions";
import Box from "@mui/joy/Box";

export default function DotIcon() {
  return (
    <Box
      sx={{
        backgroundColor: hexToRgba(SECONDARY_COLOUR[500], 0.3),
        width: "16px",
        height: "16px",
        p: "2px",
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      component="span"
    >
      <Box
        component="span"
        sx={{
          backgroundColor: SECONDARY_COLOUR[500],
          width: "7px",
          height: "7px",
          p: "2px",
          borderRadius: "50%",
        }}
      />
    </Box>
  );
}
