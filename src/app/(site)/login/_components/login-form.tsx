"use client";
import React, { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Checkbox from "@mui/joy/Checkbox";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import JoyLink from "@mui/joy/Link";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";

import HookFormError from "@/app/_components/common/hook-form-error";
import Link from "next/link";
import { BUSINESS_NAME } from "@/shared/constants";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@/app/_components/icons/google-icon";
import { useSnackbar } from "@/app/_components/providers/snackbar-provider";

import { loginAccount } from "@/services/account.services";
import { LoginPayload } from "@/types/account";
import { ErrorResponse } from "@/types/response";

export default function LoginForm() {
  const [visibilityToggle, setVisibilityToggle] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const {
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm<LoginPayload>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const { mutateAsync: loginUserMutate, isPending: isLoginUserMutatePending } =
    useMutation({
      mutationFn: (userData: LoginPayload) => loginAccount(userData),
      onSuccess: (response) => {
        queryClient.invalidateQueries({ queryKey: ["users", "current-user"] });
        ``;
        queryClient.resetQueries();

        if (response.data.role === "admin") {
          router.replace("/admin");
        } else {
          router.replace("/");
        }
        reset();
        enqueueSnackbar(response?.message, "success");
      },
      onError: (error: AxiosError<ErrorResponse>) => {
        enqueueSnackbar(
          error.response?.data.message || error?.message,
          "error"
        );
      },
    });

  const onLoginFormSubmit: SubmitHandler<LoginPayload> = async (data) => {
    const payload: LoginPayload = {
      password: data.password,
      email: data.email,
      rememberMe: data.rememberMe,
    };

    await loginUserMutate(payload);
  };

  return (
    <>
      <Stack gap={4} sx={{ mb: 2 }}>
        <Stack gap={1}>
          <Typography component="h1" level="h2">
            Login
          </Typography>
          <Typography level="body-md">
            New to the site?{" "}
            <JoyLink component={Link} href="/register" level="title-sm">
              Register!
            </JoyLink>
          </Typography>
        </Stack>
        <Button
          variant="soft"
          color="neutral"
          fullWidth
          size="lg"
          startDecorator={<GoogleIcon />}
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

      <form onSubmit={handleSubmit(onLoginFormSubmit)}>
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

            <Controller
              name="password"
              rules={{
                required: "Password is required",
              }}
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
                        {visibilityToggle ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    }
                  />
                  <HookFormError errors={errors} name="password" />
                </FormControl>
              )}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                my: 2,
              }}
            >
              <Controller
                control={control}
                name="rememberMe"
                render={({ field: { value, onChange } }) => (
                  <Checkbox
                    checked={value}
                    onChange={(e) => onChange(e.target.checked)}
                    size="md"
                    label="Remember me"
                    name="persistent"
                  />
                )}
              />
              <JoyLink level="title-md">Forgot your password?</JoyLink>
            </Box>

            <Stack gap={4} sx={{ mt: 2 }}>
              <Button
                type="submit"
                fullWidth
                size="lg"
                loading={isLoginUserMutatePending}
              >
                Login
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
