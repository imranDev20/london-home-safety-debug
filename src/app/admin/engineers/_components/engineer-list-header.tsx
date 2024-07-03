"use client";

import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";

import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import FormDrawer from "@/app/_components/common/form-drawer";
import CreateEngineerForm from "./create-engineer-form";

export default function EngineerListHeader() {
  const [openCreateEngineerDrawer, setOpenCreateEngineerDrawer] =
    useState<boolean>(false);

  return (
    <>
      <Stack
        spacing={2}
        mt={2}
        justifyContent="space-between"
        alignItems={{
          xs: "flex-start",
          md: "center",
        }}
        direction={{
          xs: "column",
          sm: "row",
        }}
      >
        <Typography component="h1" level="h2">
          Engineer List
        </Typography>

        <Stack
          spacing={2}
          direction={{
            xs: "column",
            sm: "row",
          }}
        >
          <Button
            size="sm"
            startDecorator={<AddIcon />}
            onClick={() => setOpenCreateEngineerDrawer(true)}
          >
            Add New Engineer
          </Button>
        </Stack>
      </Stack>

      <FormDrawer
        open={openCreateEngineerDrawer}
        setOpen={setOpenCreateEngineerDrawer}
      >
        <CreateEngineerForm
          setOpenCreateEngineerDrawer={setOpenCreateEngineerDrawer}
        />
      </FormDrawer>
    </>
  );
}
