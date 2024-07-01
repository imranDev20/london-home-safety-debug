import { Box, Button, IconButton, iconButtonClasses } from "@mui/joy";
import {
  KeyboardArrowLeft as KeyboardArrowLeftIcon,
  KeyboardArrowRight as KeyboardArrowRightIcon,
} from "@mui/icons-material";

interface TablePaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const TablePagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: TablePaginationProps) => {
  const handlePageChange = (newPage: number) => {
    onPageChange(newPage);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesInMiddle = 5; // Maximum number of page numbers to show in the middle

    // Render the first page number
    pageNumbers.push(
      <IconButton
        key={1}
        size="sm"
        variant={1 === currentPage ? "soft" : "outlined"}
        color={1 === currentPage ? "primary" : "neutral"}
        onClick={() => handlePageChange(1)}
      >
        1
      </IconButton>
    );

    // Render the ellipsis if the current page is not in the middle range
    if (currentPage > maxPagesInMiddle + 1) {
      pageNumbers.push(
        <IconButton
          key="ellipsis-start"
          size="sm"
          variant="plain"
          color="neutral"
        >
          ...
        </IconButton>
      );
    }

    // Render the middle page numbers
    const middleStart = Math.max(
      2,
      currentPage - Math.floor(maxPagesInMiddle / 2)
    );
    const middleEnd = Math.min(
      totalPages - 1,
      middleStart + maxPagesInMiddle - 1
    );

    for (let i = middleStart; i <= middleEnd; i++) {
      pageNumbers.push(
        <IconButton
          key={i}
          size="sm"
          variant={i === currentPage ? "soft" : "outlined"}
          color={i === currentPage ? "primary" : "neutral"}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </IconButton>
      );
    }

    // Render the ellipsis if the current page is not in the middle range
    if (currentPage < totalPages - maxPagesInMiddle) {
      pageNumbers.push(
        <IconButton
          key="ellipsis-end"
          size="sm"
          variant="plain"
          color="neutral"
        >
          ...
        </IconButton>
      );
    }

    // Render the last page number
    if (totalPages > 1) {
      pageNumbers.push(
        <IconButton
          key={totalPages}
          size="sm"
          variant={totalPages === currentPage ? "soft" : "outlined"}
          color={totalPages === currentPage ? "primary" : "neutral"}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </IconButton>
      );
    }

    return pageNumbers;
  };

  return (
    <Box
      sx={{
        pt: 2,
        gap: 1,
        [`& .${iconButtonClasses.root}`]: { borderRadius: "50%" },
        display: {
          xs: "none",
          md: "flex",
        },
      }}
    >
      <Button
        size="sm"
        variant="outlined"
        color="neutral"
        startDecorator={<KeyboardArrowLeftIcon />}
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Previous
      </Button>

      <Box sx={{ flex: 1 }} />
      {renderPageNumbers()}
      <Box sx={{ flex: 1 }} />

      <Button
        size="sm"
        variant="outlined"
        color="neutral"
        endDecorator={<KeyboardArrowRightIcon />}
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next
      </Button>
    </Box>
  );
};

export default TablePagination;
