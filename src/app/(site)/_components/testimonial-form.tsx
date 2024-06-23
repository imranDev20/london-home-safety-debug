import React, { Dispatch, SetStateAction } from "react";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import {
  Box,
  DialogContent,
  FormControl,
  FormLabel,
  Input,
  ModalClose,
  Stack,
  Textarea,
} from "@mui/joy";
import HookFormError from "@/app/_components/common/hook-form-error";
import StarRating from "@/app/_components/common/star-rating";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTestimonial } from "@/services/testimonial.services";
import { useSnackbar } from "@/app/_components/providers/snackbar-provider";
import { ITestimonial, TestimonialInput } from "@/types/testimonial";

export default function TestimonialForm({
  openModal,
  setOpenModal,
}: {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}) {
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<TestimonialInput>({
    defaultValues: {
      name: "",
      subject: "",
      rating: 5,
      content: "",
    },
  });
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const {
    mutateAsync: createTestimonialMutate,
    isPending: isCreateTestimonialPending,
  } = useMutation({
    mutationFn: (testimonialData: TestimonialInput) =>
      createTestimonial(testimonialData),

    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      console.log(response);
      reset();
      setOpenModal(false);
      console.log(response);
      enqueueSnackbar(response.message, "success");
    },
    onError: (error) => enqueueSnackbar(error.message, "error"),
  });

  const onSubmit: SubmitHandler<TestimonialInput> = async (data) => {
    createTestimonialMutate(data);
  };

  return (
    <React.Fragment>
      <Modal
        open={openModal}
        onClose={(_, reason) => {
          if (reason !== "backdropClick") setOpenModal(false);
        }}
      >
        <ModalDialog
          sx={{
            width: 500,
          }}
        >
          <ModalClose />
          <DialogTitle
            level="h2"
            sx={{
              mb: 2,
              justifyContent: "center",
            }}
          >
            Share Your Experience
          </DialogTitle>
          <DialogContent
            sx={{
              textAlign: "center",
              mb: 2,
            }}
          >
            We&lsquo;d love to hear about your experience with our service. Your
            feedback helps us improve and serve you better.
          </DialogContent>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <Controller
                name="name"
                rules={{
                  required: "Name is required",
                }}
                control={control}
                render={({ field }) => (
                  <FormControl error={!!errors.name}>
                    <FormLabel>Name</FormLabel>
                    <Input
                      {...field}
                      variant="outlined"
                      placeholder="ie. John Doe"
                    />
                    <HookFormError name="name" errors={errors} />
                  </FormControl>
                )}
              />

              <Controller
                name="subject"
                rules={{
                  required: "Subject is required",
                }}
                control={control}
                render={({ field }) => (
                  <FormControl error={!!errors.subject}>
                    <FormLabel>Subject</FormLabel>
                    <Input
                      {...field}
                      variant="outlined"
                      placeholder="ie. Had an EICR check"
                    />
                    <HookFormError name="subject" errors={errors} />
                  </FormControl>
                )}
              />

              <Controller
                name="rating"
                rules={{
                  required: "Rating is required",
                }}
                control={control}
                render={({ field: { value, onChange } }) => (
                  <FormControl error={!!errors.rating}>
                    <FormLabel>Rating</FormLabel>
                    <StarRating value={value} onChange={onChange} />
                    <HookFormError name="rating" errors={errors} />
                  </FormControl>
                )}
              />

              <Controller
                name="content"
                rules={{
                  required: "Description is required",
                }}
                control={control}
                render={({ field }) => (
                  <FormControl error={!!errors.content}>
                    <FormLabel>Description</FormLabel>
                    <Textarea
                      {...field}
                      minRows={4}
                      variant="outlined"
                      placeholder="Your experience in details..."
                    />
                    <HookFormError name="content" errors={errors} />
                  </FormControl>
                )}
              />

              <Button loading={isCreateTestimonialPending} type="submit">
                Submit
              </Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
