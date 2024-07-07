"use client";
import React, { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

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
import { BUSINESS_NAME } from "@/shared/data";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { useSnackbar } from "@/app/_components/providers/snackbar-provider";

import { LoginPayload } from "@/types/account";
import { getSession, signIn } from "next-auth/react";
import GoogleColoredIcon from "@/app/_components/icons/google-colored-icon";

export default function LoginForm({ callbackUrl }: { callbackUrl: string }) {
  const [visibilityToggle, setVisibilityToggle] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

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

  const onLoginFormSubmit: SubmitHandler<LoginPayload> = async (data) => {
    setLoading(true);
    const response = await signIn("credentials", {
      email: data.email,
      password: data.password,
      callbackUrl,
      redirect: false,
    });

    if (response?.ok) {
      enqueueSnackbar("User login successfull", "success");
    } else {
      enqueueSnackbar(response?.error || "Something went", "error");
    }

    const session = await getSession();

    if (session?.user.role === "admin") {
      router.replace("/admin");
    } else if (session?.user.role === "customer") {
      router.replace("/");
    }

    setLoading(false);
  };

  const loginWithGoogle = async () => {
    await signIn("google", { callbackUrl });
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
              <JoyLink
                level="title-md"
                component={Link}
                href="/forgot-password"
              >
                Forgot your password?
              </JoyLink>
            </Box>

            <Stack gap={4} sx={{ mt: 2 }}>
              <Button type="submit" fullWidth size="lg" loading={loading}>
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
