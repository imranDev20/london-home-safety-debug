"use client";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { isObjectEmpty } from "@/shared/functions";
import { ServiceFormInput } from "@/types/form";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  Radio,
  RadioGroup,
  Sheet,
  Typography,
  useTheme,
  Grid,
  CircularProgress,
  Stack,
} from "@mui/joy";
import { CorporateFare, East, Home, West } from "@mui/icons-material";
import HookFormError from "@/app/_components/common/hook-form-error";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createPreOrder, getPreOrder } from "@/services/pre-order.services";
import { useEffect } from "react";
import { PreOrderType, PropertyType } from "@/types/orders";
import { COMMERCIAL_SERVICES, RESIDENTIAL_SERVICES } from "@/shared/data";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/types/response";
import { useSnackbar } from "@/app/_components/providers/snackbar-provider";
import { useQueryString } from "@/shared/hooks/use-query-string";

export default function ServiceDetails() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const { createQueryString } = useQueryString();

  // Service step form
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<ServiceFormInput>({
    defaultValues: {
      propertyType:
        (searchParams.get("property_type") as PropertyType) || "residential",
      residentType: null,
      bedrooms: null,
      orderItems: [],
    },
  });
  const propertyType = watch("propertyType");

  // Get PreOrder Data
  const { data, isPending: isPreOrderDataPending } = useQuery({
    queryKey: ["pre-order"],
    queryFn: () => getPreOrder(),
    retry: 1,
  });

  const preOrderData = data?.data;

  // Create a new pre order
  const { mutateAsync: preOrderMutate, isPending: isPreOrderMutatePending } =
    useMutation({
      mutationFn: async (preOrder: Partial<PreOrderType>) =>
        createPreOrder(preOrder),
      onSuccess: (response) => {
        router.push(pathname + "?" + createQueryString("active_step", "2"));
        window.scrollTo(0, 300);
        enqueueSnackbar(response.message, "success");
      },
      onError: (error: AxiosError<ErrorResponse>) => {
        console.log(error);
        enqueueSnackbar(error.response?.data.message || error.message, "error");
      },
    });

  useEffect(() => {
    if (preOrderData?.service_info) {
      reset({
        propertyType: preOrderData.service_info.property_type,
        residentType: preOrderData.service_info.resident_type,
        bedrooms: preOrderData.service_info.bedrooms,
        orderItems: preOrderData.service_info.order_items.map(
          (item) => item.name
        ),
      });
    }
  }, [preOrderData, reset]);

  const servicesBySelectedType =
    propertyType === "residential" ? RESIDENTIAL_SERVICES : COMMERCIAL_SERVICES;

  const handleServiceDetailsSubmit: SubmitHandler<ServiceFormInput> = (
    data
  ) => {
    if (data.orderItems.length === 0) {
      setError("orderItems", {
        type: "required",
        message: "Please select at least one service",
      });
      return;
    }

    const payload: PreOrderType = {
      service_info: {
        property_type: data.propertyType,
        resident_type: data.residentType,
        bedrooms: data.bedrooms,
        order_items: servicesBySelectedType
          .filter((el) => data.orderItems.includes(el.name))
          .map((item) => ({
            title: item.title,
            name: item.name,
            price: item.priceData.find((val) => val.bedrooms === data.bedrooms)
              ?.price as number,
            quantity: item.quantity,
            unit: item.unit,
          })),
      },
      status: "service",
    };

    preOrderMutate(payload);
  };

  if (isPreOrderDataPending) {
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

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleServiceDetailsSubmit)}
      noValidate
    >
      <Typography
        component="h3"
        level="h4"
        sx={{
          mb: 3,
        }}
      >
        Select Type
      </Typography>

      <Controller
        rules={{
          required: {
            value: true,
            message: "Property type is required",
          },
        }}
        control={control}
        name="propertyType"
        render={({ field }) => (
          <FormControl error={!!errors.propertyType}>
            <RadioGroup
              {...field}
              size="lg"
              sx={{ gap: 1.5, mb: 5, display: "flex", flexDirection: "row" }}
            >
              {[
                {
                  value: "residential",
                  Icon: Home,
                },
                {
                  value: "commercial",
                  Icon: CorporateFare,
                },
              ].map((option) => (
                <Sheet
                  key={option.value}
                  sx={{
                    p: 2,
                    borderRadius: "md",
                    boxShadow: "sm",
                    flex: 1,
                  }}
                >
                  <Radio
                    label={
                      <Box
                        sx={{
                          display: "flex",
                        }}
                      >
                        <option.Icon
                          sx={{
                            mr: 1,
                            color:
                              theme.colorSchemes.light.palette.primary[600],
                          }}
                        />
                        <Typography
                          sx={{
                            textTransform: "capitalize",
                          }}
                        >
                          {option.value}
                        </Typography>
                      </Box>
                    }
                    overlay
                    disableIcon
                    value={option.value}
                    slotProps={{
                      label: ({ checked }) => ({
                        sx: {
                          fontWeight: "lg",
                          fontSize: "md",
                          color: checked ? "text.primary" : "text.secondary",
                        },
                      }),
                      action: ({ checked }) => ({
                        sx: (theme) => ({
                          ...(checked && {
                            "--variant-borderWidth": "2px",
                            "&&": {
                              // && to increase the specificity to win the base :hover styles
                              borderColor: theme.vars.palette.primary[500],
                            },
                          }),
                        }),
                      }),
                    }}
                  />
                </Sheet>
              ))}
            </RadioGroup>
            <HookFormError name="propertyType" errors={errors} />
          </FormControl>
        )}
      />

      {propertyType === "residential" && (
        <>
          <Typography
            component="h3"
            level="h4"
            sx={{
              mb: 3,
            }}
          >
            Select Resident Type
          </Typography>
          <Controller
            control={control}
            name="residentType"
            rules={{
              required: {
                value: true,
                message: "Resident type is required",
              },
            }}
            render={({ field }) => (
              <FormControl error={!!errors.residentType}>
                <RadioGroup
                  size="lg"
                  sx={{
                    gap: 1.5,
                    display: "flex",
                    flexDirection: "row",
                  }}
                  {...field}
                >
                  {[
                    {
                      value: "flat",
                      name: "Flat",
                    },
                    {
                      value: "house",
                      name: "House",
                    },
                    {
                      value: "hmo",
                      name: "HMO",
                    },
                  ].map((option) => (
                    <Sheet
                      key={option.value}
                      sx={{
                        p: 2,
                        borderRadius: "md",
                        boxShadow: "sm",
                        flex: 1,
                      }}
                    >
                      <Radio
                        label={
                          <Box>
                            <Typography>{option.name}</Typography>
                          </Box>
                        }
                        overlay
                        disableIcon
                        value={option.value}
                        slotProps={{
                          label: ({ checked }) => ({
                            sx: {
                              fontWeight: "lg",
                              fontSize: "md",
                              color: checked
                                ? "text.primary"
                                : "text.secondary",
                            },
                          }),
                          action: ({ checked }) => ({
                            sx: (theme) => ({
                              ...(checked && {
                                "--variant-borderWidth": "2px",
                                "&&": {
                                  // && to increase the specificity to win the base :hover styles
                                  borderColor: theme.vars.palette.primary[500],
                                },
                              }),
                            }),
                          }),
                        }}
                      />
                    </Sheet>
                  ))}
                </RadioGroup>
                <HookFormError name="residentType" errors={errors} />
              </FormControl>
            )}
          />
          <Typography
            component="h3"
            level="h4"
            sx={{
              mt: 6,
              mb: 3,
            }}
          >
            Number of Bedrooms
          </Typography>

          <Controller
            control={control}
            name="bedrooms"
            rules={{
              required: {
                value: propertyType === "residential",
                message: "You must select number of bedrooms",
              },
            }}
            render={({ field: { value, onChange } }) => (
              <FormControl error={!!errors.bedrooms}>
                <RadioGroup
                  size="lg"
                  sx={{
                    gap: 1.5,
                  }}
                  value={value}
                  onChange={(e) => onChange(parseInt(e.target.value))}
                >
                  <Grid container spacing={2}>
                    {[0, 1, 2, 3, 4, 5].map((option, index) => (
                      <Grid xs={6} key={option}>
                        <Sheet
                          key={option}
                          sx={{
                            p: 2,
                            borderRadius: "md",
                            boxShadow: "sm",
                          }}
                        >
                          <Radio
                            label={
                              <Box>
                                <Typography>
                                  {option === 0
                                    ? "Studio Flat"
                                    : option === 1
                                    ? `${option} Bedroom`
                                    : `${option} Bedrooms`}
                                </Typography>
                              </Box>
                            }
                            overlay
                            disableIcon
                            value={option}
                            slotProps={{
                              label: ({ checked }) => ({
                                sx: {
                                  fontWeight: "lg",
                                  fontSize: "md",
                                  color: checked
                                    ? "text.primary"
                                    : "text.secondary",
                                },
                              }),
                              action: ({ checked }) => ({
                                sx: (theme) => ({
                                  ...(checked && {
                                    "--variant-borderWidth": "2px",
                                    "&&": {
                                      // && to increase the specificity to win the base :hover styles
                                      borderColor:
                                        theme.vars.palette.primary[500],
                                    },
                                  }),
                                }),
                              }),
                            }}
                          />
                        </Sheet>
                      </Grid>
                    ))}
                  </Grid>
                </RadioGroup>
                <HookFormError name="bedrooms" errors={errors} />
              </FormControl>
            )}
          />
        </>
      )}

      <Typography
        component="h3"
        level="h4"
        sx={{
          mt: 6,
          mb: 3,
        }}
      >
        Choose Your Services
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",

          "& > div": { borderRadius: "md", display: "flex" },
        }}
      >
        <Grid container spacing={2}>
          {servicesBySelectedType.map((option) => (
            <Grid xs={12} md={6} key={option.id}>
              <Sheet
                sx={{
                  p: 2,
                  borderRadius: "md",
                  boxShadow: "sm",
                }}
              >
                <Controller
                  control={control}
                  name="orderItems"
                  render={({ field: { onChange, value } }) => (
                    <Checkbox
                      checked={value?.includes(option.name)}
                      onChange={(e) => {
                        const items = watch("orderItems");
                        const tempItems = [...items];
                        if (e.target.checked) {
                          tempItems.push(option.name);
                          onChange(tempItems);
                        } else {
                          const newItems = tempItems.filter(
                            (item) => item !== option.name
                          );
                          onChange(newItems);
                        }
                      }}
                      label={
                        <Box>
                          <Typography>{option.title}</Typography>
                        </Box>
                      }
                      overlay
                      disableIcon
                      slotProps={{
                        label: ({ checked }) => ({
                          sx: {
                            fontWeight: "lg",
                            fontSize: "md",
                            color: checked ? "text.primary" : "text.secondary",
                          },
                        }),
                        action: ({ checked }) => ({
                          sx: (theme) => ({
                            ...(checked && {
                              "--variant-borderWidth": "2px",

                              "&&": {
                                backgroundColor: "transparent",
                                border: "2px solid",
                                borderColor: theme.vars.palette.primary[500],
                                ":hover": {
                                  backgroundColor:
                                    theme.vars.palette.primary[100],
                                },
                              },
                            }),
                          }),
                        }),
                      }}
                    />
                  )}
                />
              </Sheet>
            </Grid>
          ))}
        </Grid>
        <FormControl error={!!errors.orderItems}>
          <FormHelperText
            sx={{
              fontSize: 16,
            }}
          >
            <HookFormError name="orderItems" errors={errors} />
          </FormHelperText>
        </FormControl>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <FormControl error={!isObjectEmpty(errors)}>
          <FormHelperText
            sx={{
              fontSize: 16,
            }}
          >
            {!isObjectEmpty(errors) && "Please select all the necessary fields"}
          </FormHelperText>
        </FormControl>

        <Stack
          sx={{
            mt: 5,
            width: "100%",
          }}
          direction="row"
          justifyContent="space-between"
        >
          <Button
            disabled
            variant="solid"
            loadingPosition="end"
            size="lg"
            startDecorator={<West />}
          >
            Back
          </Button>
          <Button
            type="submit"
            variant="solid"
            loading={isPreOrderMutatePending}
            loadingPosition="end"
            size="lg"
            endDecorator={<East />}
          >
            Next
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

/* 
amra request pathabo-> to get the current preOrder. 
jodi kono session cookie na thake tahole amader null dibe. 
sei kkhetre amra notun ekta preorder post korbo. 

ar thakole amra seitar data show krbo.
ar sei id ta niye shoja personal step e dhukbo. 

pre-order er 1st case e _id ace kina ekta check marte hobe. 


post pre order er 1st case e amra ekta session cookie set kore debo. bookingSession


7 diner beshi purono pre-order delete kore debo
*/
