"use client";
import React, { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import JoyLink from "@mui/joy/Link";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";

import HookFormError from "@/app/_components/common/hook-form-error";
import Link from "next/link";
import { BUSINESS_NAME } from "@/shared/data";

import { useSnackbar } from "@/app/_components/providers/snackbar-provider";

import { ForgotPasswordInput } from "@/types/account";
import { signIn } from "next-auth/react";
import GoogleColoredIcon from "@/app/_components/icons/google-colored-icon";
import { zodResolver } from "@hookform/resolvers/zod";
import forgotPasswordSchema from "../_schemas/forgot-password-schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { resetPassword } from "@/services/account.services";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/types/response";

export default function EmailStep({ callbackUrl }: { callbackUrl: string }) {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const {
    mutateAsync: resetPasswordMutate,
    isPending: isResetUserMutatePending,
  } = useMutation({
    mutationFn: (userData: ForgotPasswordInput) => resetPassword(userData),
    onSuccess: async (response) => {
      console.log(response);
      // enqueueSnackbar(response?.message, "success");
      // router.replace(`/forgot-password?active_step=${2}`);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      enqueueSnackbar(error.response?.data.message || error.message, "error");
    },
  });

  const onForgotPasswordSubmit: SubmitHandler<ForgotPasswordInput> = async (
    data
  ) => {
    const payload = {
      email: data.email,
    };
    await resetPasswordMutate(payload);
  };

  const loginWithGoogle = async () => {
    await signIn("google", { callbackUrl });
  };

  return (
    <>
      <Stack gap={4} sx={{ mb: 2 }}>
        <Stack gap={1}>
          <Typography component="h1" level="h2">
            Forgot Password!
          </Typography>
          <Typography level="body-md">
            New to the site?{" "}
            <JoyLink component={Link} href="/register" level="title-md">
              Register!
            </JoyLink>
          </Typography>
        </Stack>
        <Button
          variant="soft"
          color="neutral"
          fullWidth
          size="lg"
          onClick={loginWithGoogle}
          startDecorator={<GoogleColoredIcon />}
        >
          Continue with Google
        </Button>
      </Stack>
      <Divider
        sx={(theme) => ({
          [theme.getColorSchemeSelector("light")]: {
            color: { xs: "#FFF", md: "text.tertiary" },
          },
        })}
      >
        or
      </Divider>

      <form onSubmit={handleSubmit(onForgotPasswordSubmit)}>
        <Box sx={{ pt: 2 }}>
          <Stack gap={2}>
            <Controller
              name="email"
              rules={{
                required: "Email is required",
                pattern: {
                  value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                  message: "Provide a valid email",
                },
              }}
              control={control}
              render={({ field }) => (
                <FormControl error={!!errors.email} size="lg">
                  <FormLabel>Email</FormLabel>

                  <Input
                    {...field}
                    placeholder="Type your email..."
                    type="email"
                    fullWidth
                    variant="outlined"
                  />
                  <HookFormError name="email" errors={errors} />
                </FormControl>
              )}
            />

            <Stack gap={4} sx={{ mt: 2 }}>
              <Button
                type="submit"
                fullWidth
                size="lg"
                loading={isResetUserMutatePending}
              >
                Reset Password
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
