import { Typography } from "@mui/joy";
import React from "react";

export default function InfoBlocks({
  item,
}: {
  item: {
    title: string;
    value: string;
  };
}) {
  return (
    <>
      <Typography color="neutral" level="body-sm">
        {item.title}
      </Typography>
      <Typography level="title-md">{item.value}</Typography>
    </>
  );
}
