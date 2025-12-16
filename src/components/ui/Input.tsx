// src/components/ui/Input.tsx
import React from "react";
import TextField from "@mui/material/TextField";

type InputSize = "md" | "lg";

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> & {
  label: string;
  helperText?: string;
  error?: boolean;
  fullWidth?: boolean;
  size?: InputSize;
  endAdornment?: React.ReactNode;
  startAdornment?: React.ReactNode;
  containerClassName?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    helperText,
    error,
    fullWidth = true,
    size = "lg",
    endAdornment,
    startAdornment,
    id,
    containerClassName,
    className,
    ...props
  },
  ref
) {
  const muiSize: "small" | "medium" = size === "md" ? "small" : "medium";

  return (
    <div className={containerClassName}>
      <TextField
        id={id}
        variant="outlined"
        label={label}
        error={!!error}
        helperText={helperText}
        fullWidth={fullWidth}
        size={muiSize}
        className={className as any}
        inputRef={ref}
        {...(props as any)}
      />
    </div>
  );
});

export default Input;