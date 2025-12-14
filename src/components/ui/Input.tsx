// src/components/ui/Input.tsx
import React from "react";

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
};

function cx(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(" ");
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
    {
        label,
        helperText,
        error,
        fullWidth = true,
        size = "lg",
        endAdornment,
        id,
        className,
        disabled,
        ...props
    },
    ref
) {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;

    const padY = size === "md" ? "py-2.5" : "py-3";
    const padX = "px-3";
    const rightPad = endAdornment ? "pr-12" : "";

    return (
        <div className={cx(fullWidth && "w-full")}>
            <label
                htmlFor={inputId}
                className={cx(
                    "block text-sm font-medium mb-1",
                    disabled ? "text-gray-400" : "text-gray-800"
                )}
            >
                {label}
            </label>

            <div className="relative">
                <input
                    ref={ref}
                    id={inputId}
                    disabled={disabled}
                    aria-invalid={error ? "true" : "false"}
                    className={cx(
                        "w-full rounded-md border bg-white text-gray-900 placeholder:text-gray-400",
                        padX,
                        padY,
                        rightPad,
                        "focus:outline-none focus:ring-2",
                        error
                            ? "border-red-600 focus:ring-red-600 focus:border-red-600"
                            : "border-gray-300 focus:ring-red-600 focus:border-red-600",
                        disabled && "bg-gray-50 text-gray-500 cursor-not-allowed",
                        className
                    )}
                    {...props}
                />

                {endAdornment && (
                    <div className="absolute right-2 top-1/2 -translate-y-1/2">
                        {endAdornment}
                    </div>
                )}
            </div>

            {helperText !== undefined && (
                <p className={cx("mt-1 text-xs", error ? "text-red-700" : "text-gray-500")}>
                    {helperText || "\u00A0"}
                </p>
            )}
        </div>
    );
});

export default Input;