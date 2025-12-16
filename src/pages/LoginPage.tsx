// src/pages/LoginPage.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useToast } from "../context/ToastContext";
import {useAuth} from "../context/AuthContext";
import {validatePassword} from "../utils/validatePassword";
import { useLocation, useNavigate } from 'react-router-dom';
import { Divider, IconButton, Typography } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
type Provider = "google" | "facebook";

type LoginFormValues = {
    email: string;
    password: string;
};

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const { toast } = useToast();
    const { login } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const from = (location.state as { from?: string })?.from || '/dashboard';

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormValues>({
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onTouched",
    });

    const onSubmit = handleSubmit(async (values) => {
        try {
            await login(values);
            toast({ variant: "success", title: "Success", message: "Logged in successfully." });
            navigate(from, { replace: true });
        } catch (e) {
            const message = e instanceof Error ? e.message : "Login failed";
            toast({ variant: "error", title: "Login failed", message });
        }
    });

    async function onSocialLogin(provider: Provider) {
        // TODO: Hook up to OAuth flow
        console.log("Social login:", provider);
    }

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <Typography variant="h5" className="mb-6">Login</Typography>

                <form onSubmit={onSubmit} className="space-y-4">
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
                        autoComplete="current-password"
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

                    <div className="text-sm">
                        <Link to="/forgot-password" className="text-gray-600 hover:text-gray-900">
                            Forgot Password?
                        </Link>
                    </div>

                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ py: 1.5, fontWeight: 600 }}
                    >
                        {isSubmitting ? "Logging in..." : "Login"}
                    </Button>
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