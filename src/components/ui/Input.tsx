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
    startAdornment?: React.ReactNode;
    containerClassName?: string;
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
        startAdornment,
        id,
        className,
        containerClassName,
        disabled,
        onChange,
        value,
        defaultValue,
        ...props
    },
    ref
) {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;

    const [focused, setFocused] = React.useState(false);
    const [hasValue, setHasValue] = React.useState(
        () => (value != null && String(value).length > 0) || (defaultValue != null && String(defaultValue).length > 0)
    );

    React.useEffect(() => {
        if (value !== undefined) {
            setHasValue(value != null && String(value).length > 0);
        }
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (value === undefined) {
            setHasValue(e.target.value.length > 0);
        }
        onChange?.(e);
    };

    const sizeClasses = size === "md"
        ? {
            input: "pt-5 pb-2 text-sm",
            labelBase: "text-sm",
          }
        : {
            input: "pt-6 pb-2 text-base",
            labelBase: "text-base",
          };

    const leftPad = startAdornment ? "pl-10" : "pl-3";
    const rightPad = endAdornment ? "pr-12" : "pr-3";

    const borderColor = disabled
        ? "border-gray-200"
        : error
            ? "border-red-600"
            : "border-gray-300";

    const focusRing = disabled
        ? ""
        : error
            ? "focus-within:ring-2 focus-within:ring-red-600 focus-within:border-red-600"
            : "focus-within:ring-2 focus-within:ring-red-600 focus-within:border-red-600";

    const labelShrink = focused || hasValue;
    return (
        <div className={cx(fullWidth && "w-full", containerClassName)}>
            <div
                className={cx(
                    "relative rounded-md border bg-white",
                    borderColor,
                    focusRing,
                    disabled && "bg-gray-50 cursor-not-allowed"
                )}
            >
                {/* Floating label */}
                <label
                    htmlFor={inputId}
                    className={cx(
                        "absolute left-3 top-1/2 -translate-y-1/2 transition-all pointer-events-none",
                        "text-gray-500",
                        sizeClasses.labelBase,
                        labelShrink && "-top-2 left-2 text-xs px-1 bg-white z-[1]"
                    )}
                >
                    {label}
                </label>

                {/* The input itself */}
                {(() => {
                    // Compose event handlers from external props with internal logic,
                    // and compose refs so react-hook-form and parent refs both work.
                    const {
                        onBlur: onBlurProp,
                        onChange: onChangeProp,
                        onFocus: onFocusProp,
                        onInput: onInputProp,
                        ref: externalRef,
                        ...restProps
                    } = props as any;

                    function assignRef<T>(r: React.Ref<T> | undefined, value: T) {
                        if (!r) return;
                        if (typeof r === "function") r(value);
                        else (r as React.MutableRefObject<T | null>).current = value;
                    }

                    return (
                        <input
                            {...restProps}
                            id={inputId}
                            disabled={disabled}
                            aria-invalid={error ? "true" : "false"}
                            className={cx(
                                "w-full bg-transparent text-gray-900 placeholder:text-transparent outline-none rounded-md",
                                sizeClasses.input,
                                leftPad,
                                rightPad,
                                disabled && "text-gray-500",
                                className
                            )}
                            ref={(node) => {
                                assignRef(ref, node as HTMLInputElement | null);
                                assignRef(externalRef, node as HTMLInputElement | null);
                            }}
                            onFocus={(e) => {
                                setFocused(true);
                                onFocusProp?.(e);
                            }}
                            onBlur={(e) => {
                                setFocused(false);
                                // Ensure label returns if field is empty after blur.
                                setHasValue(e.currentTarget.value.length > 0);
                                onBlurProp?.(e);
                            }}
                            onInput={(e) => {
                                // Keep in sync with browser-driven changes (e.g., autofill)
                                const t = e.currentTarget as HTMLInputElement;
                                setHasValue(t.value.length > 0);
                                onInputProp?.(e as any);
                            }}
                            onChange={(e) => {
                                handleChange(e);
                                onChangeProp?.(e);
                            }}
                            value={value}
                            defaultValue={defaultValue}
                        />
                    );
                })()}

                {/* Adornments */}
                {startAdornment && (
                    <div className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-600">
                        {startAdornment}
                    </div>
                )}
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