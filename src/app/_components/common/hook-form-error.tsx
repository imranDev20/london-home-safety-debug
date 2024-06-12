import {
  ErrorMessage,
  FieldValuesFromFieldErrors,
} from "@hookform/error-message";
import FormHelperText from "@mui/joy/FormHelperText";
import { FieldErrors, FieldValues, FieldName } from "react-hook-form";

type ErrorProps<T extends FieldValues> = {
  errors: FieldErrors<T>;
  name: FieldName<FieldValuesFromFieldErrors<FieldErrors<T>>>;
};

export default function HookFormError<T extends FieldValues>({
  errors,
  name,
}: ErrorProps<T>) {
  return (
    <ErrorMessage
      errors={errors}
      name={name}
      render={({ message }) => (
        <FormHelperText
          sx={{
            fontSize: 14,
          }}
        >
          {message}
        </FormHelperText>
      )}
    />
  );
}
