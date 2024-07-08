"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Link as JoyLink,
  Stack,
  Typography,
} from "@mui/joy";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import HookFormError from "@/app/_components/common/hook-form-error";
import Link from "next/link";
import { BUSINESS_NAME } from "@/shared/data";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerAccount } from "@/services/account.services";
import { useRouter } from "next/navigation";
import { RegisterFormInput, RegisterPayload } from "@/types/account";
import { useSnackbar } from "@/app/_components/providers/snackbar-provider";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/types/response";
import GoogleColoredIcon from "@/app/_components/icons/google-colored-icon";
import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import registerSchema from "../_schemas/register-schema";

export default function RegisterForm({ callbackUrl }: { callbackUrl: string }) {
  const [visibilityToggle, setVisibilityToggle] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const {
    formState: { errors },
    handleSubmit,
    control,
    watch,
    reset,
  } = useForm<RegisterFormInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const {
    mutateAsync: registerUserMutate,
    isPending: isRegisterUserMutatePending,
  } = useMutation({
    mutationFn: (userData: RegisterPayload) => registerAccount(userData),
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({
        queryKey: ["users", "current-user"],
      });
      await queryClient.resetQueries();

      reset();
      enqueueSnackbar(response?.message, "success");
      router.replace("/");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      enqueueSnackbar(error.response?.data.message || error.message, "error");
    },
  });

  const onRegisterFormSubmit: SubmitHandler<RegisterFormInput> = async (
    data
  ) => {
    const payload = {
      name: data.name,
      password: data.password,
      email: data.email,
      creation_method: "registration",
    };
    await registerUserMutate(payload);
  };

  const loginWithGoogle = async () => {
    await signIn("google", { callbackUrl });
  };

  return (
    <>
      <Stack gap={4} sx={{ mb: 2 }}>
        <Stack gap={1}>
          <Typography component="h1" level="h2">
            Register
          </Typography>
          <Typography level="body-md">
            Already have an account?{" "}
            <JoyLink component={Link} href="/login" level="title-md">
              Login!
            </JoyLink>
          </Typography>
        </Stack>
        <Button
          variant="soft"
          color="neutral"
          fullWidth
          size="lg"
          startDecorator={<GoogleColoredIcon />}
          onClick={loginWithGoogle}
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

      <form onSubmit={handleSubmit(onRegisterFormSubmit)}>
        <Box sx={{ pt: 2 }}>
          <Stack gap={2}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <FormControl error={!!errors.name} size="lg">
                  <FormLabel>Name</FormLabel>
                  <Input
                    {...field}
                    placeholder="Type your name..."
                    fullWidth
                    variant="outlined"
                  />
                  <HookFormError name="name" errors={errors} />
                </FormControl>
              )}
            />
            <Controller
              name="email"
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
                loading={isRegisterUserMutatePending}
                size="lg"
              >
                Register
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
