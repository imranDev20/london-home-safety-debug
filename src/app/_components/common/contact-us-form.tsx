"use client";
import React from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  Input,
  InputProps,
  Textarea,
} from "@mui/joy";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import HookFormError from "@/app/_components/common/hook-form-error";
import PhoneInput from "react-phone-number-input/input";
import {
  isValidPhoneNumber,
  formatPhoneNumber,
} from "react-phone-number-input";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "../providers/snackbar-provider";
import { TEXT_COLOR } from "@/shared/constants";
import { submitContactUsForm } from "@/services/contact.servicecs";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/types/response";
import { ContactFormInput } from "@/types/contact";

const PhoneInputAdapter = React.forwardRef<InputProps, any>(
  function PhoneInputAdapter(props, ref) {
    const { onChange, ...other } = props;

    return (
      <PhoneInput
        defaultCountry="GB"
        international={false}
        placeholder="Enter phone number"
        {...other}
        ref={ref}
        onChange={(value) => onChange(value)}
      />
    );
  }
);

export default function ContactUsForm() {
  const { enqueueSnackbar } = useSnackbar();

  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<ContactFormInput>({
    defaultValues: {
      name: "",
      email: "",
      message: "",
      subject: "",
      phone: "",
    },
  });

  const {
    mutateAsync: submitContactUsFormMutate,
    isPending: isSubmitContactUsFormPending,
  } = useMutation({
    mutationFn: async (contactFormData: ContactFormInput) =>
      submitContactUsForm(contactFormData),

    onSuccess: (response) => {
      reset();
      enqueueSnackbar(response.message, "success");
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      enqueueSnackbar(error.response?.data.message || error?.message, "error");
    },
  });

  const onContactFormSubmit: SubmitHandler<ContactFormInput> = async (data) => {
    const payload = {
      ...data,
      phone: formatPhoneNumber(data.phone),
    };

    await submitContactUsFormMutate(payload);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onContactFormSubmit)}>
      <Grid container spacing={3}>
        <Grid xs={12} lg={6}>
          <Controller
            name="name"
            rules={{
              required: "Please enter your name",
            }}
            control={control}
            render={({ field }) => (
              <FormControl error={!!errors.name} size="lg">
                <Input
                  {...field}
                  placeholder="Your Name"
                  type="text"
                  fullWidth
                  color="secondary"
                  sx={{
                    color: TEXT_COLOR.primary,
                  }}
                />
                <HookFormError name="name" errors={errors} />
              </FormControl>
            )}
          />
        </Grid>

        <Grid xs={12} lg={6}>
          <Controller
            name="email"
            rules={{
              required: "Please enter your email",
              pattern: {
                value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                message: "provide a valid email",
              },
            }}
            control={control}
            render={({ field }) => (
              <FormControl error={!!errors.email} size="lg">
                <Input
                  {...field}
                  placeholder="Email Address"
                  type="email"
                  color="secondary"
                  variant="outlined"
                  fullWidth
                  sx={{
                    color: TEXT_COLOR.primary,
                  }}
                />
                <HookFormError name="email" errors={errors} />
              </FormControl>
            )}
          />
        </Grid>

        <Grid xs={12} lg={6}>
          <Controller
            name="phone"
            control={control}
            rules={{
              required: "Please enter your phone number",
              validate: (value: string) => {
                const valid = isValidPhoneNumber(value);

                return valid || `Your provided phone number is not valid`;
              },
            }}
            render={({ field }) => (
              <FormControl error={!!errors.phone} size="lg">
                <Input
                  {...field}
                  placeholder="Phone Number"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  slotProps={{
                    input: {
                      component: PhoneInputAdapter,
                    },
                  }}
                  sx={{
                    color: TEXT_COLOR.primary,
                  }}
                />
                <HookFormError name="phone" errors={errors} />
              </FormControl>
            )}
          />
        </Grid>

        <Grid xs={12} lg={6}>
          <Controller
            name="subject"
            rules={{
              required: "Please provide a subject",
            }}
            control={control}
            render={({ field }) => (
              <FormControl error={!!errors.subject} size="lg">
                <Input
                  {...field}
                  placeholder="Give a subject"
                  type="text"
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  sx={{
                    color: TEXT_COLOR.primary,
                  }}
                />
                <HookFormError name="subject" errors={errors} />
              </FormControl>
            )}
          />
        </Grid>

        <Grid xs={12}>
          <Controller
            name="message"
            rules={{
              required: "Message is required",
            }}
            control={control}
            render={({ field }) => (
              <FormControl error={!!errors.message} size="lg">
                <Textarea
                  {...field}
                  minRows={4}
                  placeholder="Type your Message here..."
                  variant="outlined"
                  color="secondary"
                  sx={{
                    color: TEXT_COLOR.primary,
                  }}
                />
                <HookFormError name="message" errors={errors} />
              </FormControl>
            )}
          />
        </Grid>

        <Grid xs={12}>
          <Button
            type="submit"
            variant="solid"
            color="secondary"
            sx={{ width: "100%" }}
            loading={isSubmitContactUsFormPending}
            loadingPosition="start"
            size="lg"
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
