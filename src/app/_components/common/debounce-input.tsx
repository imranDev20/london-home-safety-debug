import * as React from "react";
import Input, { InputProps } from "@mui/joy/Input";
import { IconButton } from "@mui/joy";
import { Clear } from "@mui/icons-material";

type DebounceProps = {
  handleDebounce: (value: string) => void;
  debounceTimeout: number;
};

export default function DebounceInput(props: InputProps & DebounceProps) {
  const { handleDebounce, debounceTimeout, ...rest } = props;

  const timerRef = React.useRef<ReturnType<typeof setTimeout>>();
  const [value, setValue] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timerRef.current);
    setValue(event.target.value);
    timerRef.current = setTimeout(() => {
      handleDebounce(event.target.value);
    }, debounceTimeout);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleDebounce(event.currentTarget.value);
    }
  };

  const handleClear = () => {
    setValue("");
    handleDebounce("");
  };

  return (
    <Input
      {...rest}
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      endDecorator={
        value && (
          <IconButton onClick={handleClear}>
            <Clear
              sx={{
                fontSize: 15,
              }}
            />
          </IconButton>
        )
      }
    />
  );
}
