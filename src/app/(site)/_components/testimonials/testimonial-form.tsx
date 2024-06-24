"use client";
import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import { Controller, useForm } from "react-hook-form";

import {
  DialogContent,
  FormControl,
  FormLabel,
  Input,
  ModalClose,
  Stack,
  Textarea,
  Typography,
} from "@mui/joy";
import HookFormError from "@/app/_components/common/hook-form-error";
import StarRating from "@/app/_components/common/star-rating";
import { useSnackbar } from "@/app/_components/providers/snackbar-provider";

import { zodResolver } from "@hookform/resolvers/zod";
import testimonialSchema from "../../_schemas/testimonial-schema";
import { useFormState, useFormStatus } from "react-dom";
import { createTestimonialAction } from "../../_actions/testimonial-actions";

function SubmitButton({ isValid }: { isValid: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" loading={pending} disabled={!isValid}>
      Add
    </Button>
  );
}

export default function TestimonialForm({
  openModal,
  setOpenModal,
}: {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}) {
  const [state, formAction] = useFormState(createTestimonialAction, {
    success: false,
    message: "",
  });

  const {
    handleSubmit,
    formState: { errors, isValid },
    control,
    register,
    reset,
  } = useForm({
    mode: "all",
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      name: "",
      subject: "",
      rating: 5,
      content: "",
    },
  });
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (state.message) {
      enqueueSnackbar(state.message, state.success ? "success" : "error");

      if (state.success) {
        reset();
        setOpenModal(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, setOpenModal, reset]);

  // Invoke the form handlesubmit using ref
  const formRef = useRef<HTMLFormElement>(null);

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
              textAlign: "center",
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

          <form
            action={formAction}
            ref={formRef}
            // onSubmit={(e) => {
            //   e.preventDefault();
            //   return handleSubmit(() => {
            //     formAction(new FormData(formRef.current!));
            //   })(e);
            // }}
          >
            <Stack spacing={2}>
              <Controller
                name="name"
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
                control={control}
                render={({ field }) => (
                  <FormControl error={!!errors.rating}>
                    <FormLabel>Rating</FormLabel>
                    <input
                      type="hidden"
                      {...register("rating", { valueAsNumber: true })}
                    />

                    <StarRating {...field} />
                    <HookFormError name="rating" errors={errors} />
                  </FormControl>
                )}
              />

              <Controller
                name="content"
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

              <SubmitButton isValid={isValid} />
            </Stack>
          </form>

          {!isValid && (
            <Typography
              color="danger"
              sx={{
                textAlign: "center",
              }}
            >
              Please fill all the necessary fields
            </Typography>
          )}
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
