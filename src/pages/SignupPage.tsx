// src/pages/SignupPage.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "../components/ui/Input";
import {useAuth} from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import {validatePassword} from "../utils/validatePassword";
import { Button, Divider, IconButton, Typography } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

type Provider = "google" | "facebook";

type SignupFormValues = {
    name: string;
    email: string;
    password: string;
    retypePassword: string;
};

export default function SignupPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showRetypePassword, setShowRetypePassword] = useState(false);
    const { signup } = useAuth();
    const { toast } = useToast();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<SignupFormValues>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            retypePassword: "",
        },
        mode: "onTouched",
    });

    const passwordValue = watch("password");


    const onSubmit = handleSubmit(async (values) => {
        try {
            const { retypePassword, ...payload } = values;

            await signup(payload);

            console.log("Signup:", payload);

            toast({ variant: "success", title: "Success", message: "Account created successfully." });
        } catch (e) {
            const message = e instanceof Error ? e.message : "Signup failed";
            toast({ variant: "error", title: "Signup failed", message });
        }
    });


    async function onSocialLogin(provider: Provider) {
        // TODO: Hook up to OAuth flow
        console.log("Social signup:", provider);
    }

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <Typography variant="h5" className="mb-6">Signup</Typography>

                <form onSubmit={onSubmit} className="space-y-4">
                    <Input
                        label="Name"
                        type="text"
                        autoComplete="name"
                        placeholder="Your name"
                        error={!!errors.name}
                        helperText={errors.name?.message || " "}
                        {...register("name", { required: "Name is required" })}
                    />

                    <Input
                        label="Email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        error={!!errors.email}
                        helperText={errors.email?.message || " "}
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Enter a valid email",
                            },
                        })}
                    />

                    <Input
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        placeholder="••••••••"
                        error={!!errors.password}
                        helperText={errors.password?.message || " "}
                        endAdornment={
                            <IconButton
                                onClick={() => setShowPassword((s) => !s)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                                edge="end"
                                size="small"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        }
                        {...register("password", {
                            required: "Password is required",
                            minLength: { value: 8, message: "Minimum 8 characters" },
                            validate: (value) => validatePassword(value),
                        })}
                    />

                    <Input
                        label="Retype Password"
                        type={showRetypePassword ? "text" : "password"}
                        autoComplete="new-password"
                        placeholder="••••••••"
                        error={!!errors.retypePassword}
                        helperText={errors.retypePassword?.message || " "}
                        endAdornment={
                            <IconButton
                                onClick={() => setShowRetypePassword((s) => !s)}
                                aria-label={showRetypePassword ? "Hide password" : "Show password"}
                                edge="end"
                                size="small"
                            >
                                {showRetypePassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        }
                        {...register("retypePassword", {
                            required: "Please retype your password",
                            validate: (v) => v === passwordValue || "Passwords do not match.",
                        })}
                    />

                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ py: 1.5, fontWeight: 600 }}
                    >
                        {isSubmitting ? "Signing up..." : "Signup"}
                    </Button>

                    <div className="text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link to="/login" className="text-gray-900 underline underline-offset-2">
                            Login
                        </Link>
                    </div>
                </form>

                <Divider sx={{ my: 3 }}>OR</Divider>

                <div className="space-y-3">
                    <Button
                        type="button"
                        onClick={() => onSocialLogin("google")}
                        variant="outlined"
                        fullWidth
                        sx={{ py: 1.5, fontWeight: 500 }}
                    >
                        Login via Google
                    </Button>

                    <Button
                        type="button"
                        onClick={() => onSocialLogin("facebook")}
                        variant="contained"
                        fullWidth
                        sx={{ py: 1.5, fontWeight: 500, backgroundColor: '#1877F2', '&:hover': { backgroundColor: '#1864d6' } }}
                    >
                        Login via Facebook
                    </Button>
                </div>
            </div>
        </div>
    );
}