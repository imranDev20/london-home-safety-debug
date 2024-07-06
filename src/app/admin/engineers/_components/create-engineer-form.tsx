import React, { Dispatch, SetStateAction } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import DialogTitle from "@mui/joy/DialogTitle";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Stack from "@mui/joy/Stack";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "@/services/user.services";
import { useSnackbar } from "@/app/_components/providers/snackbar-provider";

interface FormValues {
  name: string;
  email: string;
  phone: string;
  specialty: string;
  experience: string;
  skills: string;
}

const CreateCustomerForm = ({
  setOpenCreateEngineerDrawer,
}: {
  setOpenCreateEngineerDrawer: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      specialty: "",
      skills: "",
      experience: "",
    },
  });

  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const {
    mutateAsync: createUserMutate,
    isPending: isCreateUserMutatePending,
  } = useMutation({
    mutationFn: async (userData: any) => {
      const response = await createUser(userData);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const payload = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: "password",
        role: "engineer",
        specialty: data.specialty,
        skills: data.skills,
        experience: data.experience,
        creation_method: "by_admin",
      };
      const response = await createUserMutate(payload);

      if (response?.success) {
        reset();
        setOpenCreateEngineerDrawer(false);
        enqueueSnackbar(response.message, "success");
      } else {
        throw new Error(response.message);
      }
    } catch (error: any) {
      // enqueueSnackbar(error.message, "error");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <DialogTitle
        level="h3"
        sx={{
          mb: 3,
        }}
      >
        Create an Engineer
      </DialogTitle>
      <Stack spacing={2}>
        <FormControl required>
          <FormLabel>Engineer Name</FormLabel>
          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Enter engineer name"
                error={!!errors.name}
              />
            )}
          />
        </FormControl>

        <FormControl required>
          <FormLabel>Email</FormLabel>
          <Controller
            name="email"
            control={control}
            rules={{
              required: true,
              pattern: /^\S+@\S+$/i,
            }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Enter email address"
                error={!!errors.email}
              />
            )}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Phone</FormLabel>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Enter phone number" />
            )}
          />
        </FormControl>

        <FormControl required>
          <FormLabel>Specialty</FormLabel>
          <Controller
            name="specialty"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Enter specialty" />
            )}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Experience (optional)</FormLabel>
          <Controller
            name="experience"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Enter years of experience" />
            )}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Skills (optional)</FormLabel>
          <Controller
            name="skills"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Enter skills separated by commas"
              />
            )}
          />
        </FormControl>

        <Button
          type="submit"
          sx={{ mt: 2 }}
          loading={isCreateUserMutatePending}
        >
          Submit
        </Button>
      </Stack>
    </Box>
  );
};

export default CreateCustomerForm;
