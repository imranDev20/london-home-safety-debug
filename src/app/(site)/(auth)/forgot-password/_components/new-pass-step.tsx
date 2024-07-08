"use client";

import { changePassword, verifyToken } from "@/services/account.services";
import { Visibility, VisibilityOff, Warning } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Stack,
  Typography,
} from "@mui/joy";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import newPasswordSchema from "../_schemas/new-password-schema";
import { NewPasswordInput, NewPasswordPayload } from "@/types/account";
import HookFormError from "@/app/_components/common/hook-form-error";
import { BUSINESS_NAME } from "@/shared/data";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/types/response";
import { useSnackbar } from "@/app/_components/providers/snackbar-provider";
import EmailStep from "./email-step";
import { useRouter } from "next/navigation";

export default function NewPassStep({ token }: { token: string }) {
  const [visibilityToggle, setVisibilityToggle] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const {
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm<NewPasswordInput>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const {
    mutateAsync: changePasswordMutate,
    isPending: isChangePasswordPending,
  } = useMutation({
    mutationFn: (changePassData: NewPasswordPayload) =>
      changePassword(changePassData),

    onSuccess: async (response) => {
      enqueueSnackbar(response?.message, "success");
      router.replace(`/login`);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      enqueueSnackbar(error.response?.data.message || error.message, "error");
    },
  });

  const {
    data,
    isPending: isVerifyTokenPending,
    error,
    isError,
  } = useQuery({
    queryKey: ["token"],
    queryFn: () => verifyToken(token),
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const onChangePasswordFormSubmit: SubmitHandler<NewPasswordInput> = async (
    data
  ) => {
    const payload = {
      password: data.password,
      token: token,
    };

    await changePasswordMutate(payload);
  };

  if (isVerifyTokenPending) {
    return (
      <Box
        sx={{
          display: "flex",
          height: "50vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress
          thickness={4}
          sx={{ "--CircularProgress-size": "100px" }}
        >
          Loading
        </CircularProgress>
      </Box>
    );
  }

  if (isError) {
    const axiosError = error as AxiosError<ErrorResponse>;

    return (
      <Box>
        <Alert
          startDecorator={<Warning />}
          variant="soft"
          color="danger"
          sx={{
            mb: 2,
          }}
        >
          {axiosError.response?.data.message || axiosError.message}
        </Alert>

        <EmailStep callbackUrl="" />
      </Box>
    );
  }

  return (
    <>
      <Stack gap={4} sx={{ mb: 2 }}>
        <Stack gap={1}>
          <Typography component="h1" level="h2">
            Create New Password
          </Typography>
        </Stack>
      </Stack>

      <form onSubmit={handleSubmit(onChangePasswordFormSubmit)}>
        <Box sx={{ pt: 2 }}>
          <Stack gap={2}>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <FormControl error={!!errors.password} size="lg">
                  <FormLabel>Password</FormLabel>

                  <Input
                    {...field}
                    placeholder="Type your password"
                    fullWidth
                    variant="outlined"
                    type={visibilityToggle ? "text" : "password"}
                    endDecorator={
                      <IconButton
                        onClick={() => setVisibilityToggle((prev) => !prev)}
                      >
                        {visibilityToggle ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    }
                  />
                  <HookFormError errors={errors} name="password" />
                </FormControl>
              )}
            />

            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <FormControl error={!!errors.confirmPassword} size="lg">
                  <FormLabel>Confirm Password</FormLabel>
                  <Input
                    {...field}
                    placeholder="Confirm your password"
                    fullWidth
                    variant="outlined"
                    type={visibilityToggle ? "text" : "password"}
                    endDecorator={
                      <IconButton
                        onClick={() => setVisibilityToggle((prev) => !prev)}
                      >
                        {visibilityToggle ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    }
                  />
                  <HookFormError errors={errors} name="confirmPassword" />
                </FormControl>
              )}
            />

            <Stack gap={4} sx={{ mt: 2 }}>
              <Button
                type="submit"
                fullWidth
                size="lg"
                loading={isChangePasswordPending}
              >
                Submit
              </Button>
            </Stack>
          </Stack>

          <Box component="footer" sx={{ mt: 5 }}>
            <Typography level="body-xs" textAlign="center">
              © {BUSINESS_NAME} {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>
      </form>
    </>
  );
}
