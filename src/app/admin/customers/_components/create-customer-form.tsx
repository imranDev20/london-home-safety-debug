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
  houseStreet: string;
  postcode: string;
  city: string;
}

const CreateCustomerForm = ({
  setOpenCreateCustomerDrawer,
}: {
  setOpenCreateCustomerDrawer: Dispatch<SetStateAction<boolean>>;
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
      houseStreet: "",
      postcode: "",
      city: "",
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
        orders: [],
        addresses: [],
        preferences: {},
      };
      const response = await createUserMutate(payload);

      if (response?.success) {
        reset();
        setOpenCreateCustomerDrawer(false);
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
        Create a Customer
      </DialogTitle>
      <Stack spacing={2}>
        <FormControl required>
          <FormLabel>Customer Name</FormLabel>
          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Enter customer name"
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

        <FormControl>
          <FormLabel>House/Street</FormLabel>
          <Controller
            name="houseStreet"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Enter house/street" />
            )}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Postcode</FormLabel>
          <Controller
            name="postcode"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Enter postcode" />
            )}
          />
        </FormControl>

        <FormControl>
          <FormLabel>City</FormLabel>
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Enter city" />
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
