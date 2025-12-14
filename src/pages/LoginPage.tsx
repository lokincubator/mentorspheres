// src/pages/LoginPage.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "../components/ui/Input";
import { useToast } from "../context/ToastContext";
import {useAuth} from "../context/AuthContext";
import {validatePassword} from "../utils/validatePassword";
import { useLocation, useNavigate } from 'react-router-dom';
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
                <h1 className="text-2xl font-semibold text-gray-900 mb-6">Login</h1>

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
                            <button
                                type="button"
                                onClick={() => setShowPassword((s) => !s)}
                                className="px-2 py-1 text-sm text-gray-600 hover:text-gray-900"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
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

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-md bg-red-700 py-3 text-white font-semibold hover:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? "Logging in..." : "Login"}
                    </button>
                </form>

                <div className="my-6 flex items-center gap-3">
                    <div className="h-px flex-1 bg-gray-200" />
                    <div className="text-xs text-gray-500">OR</div>
                    <div className="h-px flex-1 bg-gray-200" />
                </div>

                <div className="space-y-3">
                    <button
                        type="button"
                        onClick={() => onSocialLogin("google")}
                        className="w-full rounded-md border border-gray-300 bg-white py-3 font-medium text-gray-900 hover:bg-gray-50"
                    >
                        Login via Google
                    </button>

                    <button
                        type="button"
                        onClick={() => onSocialLogin("facebook")}
                        className="w-full rounded-md bg-[#1877F2] py-3 font-medium text-white hover:brightness-95"
                    >
                        Login via Facebook
                    </button>
                </div>
            </div>
        </div>
    );
}