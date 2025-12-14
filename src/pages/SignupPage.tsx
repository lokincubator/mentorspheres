// src/pages/SignupPage.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "../components/ui/Input";
import {useAuth} from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import {validatePassword} from "../utils/validatePassword";

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
                <h1 className="text-2xl font-semibold text-gray-900 mb-6">Signup</h1>

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

                    <Input
                        label="Retype Password"
                        type={showRetypePassword ? "text" : "password"}
                        autoComplete="new-password"
                        placeholder="••••••••"
                        error={!!errors.retypePassword}
                        helperText={errors.retypePassword?.message || " "}
                        endAdornment={
                            <button
                                type="button"
                                onClick={() => setShowRetypePassword((s) => !s)}
                                className="px-2 py-1 text-sm text-gray-600 hover:text-gray-900"
                                aria-label={showRetypePassword ? "Hide password" : "Show password"}
                            >
                                {showRetypePassword ? "Hide" : "Show"}
                            </button>
                        }
                        {...register("retypePassword", {
                            required: "Please retype your password",
                            validate: (v) => v === passwordValue || "Passwords do not match.",
                        })}
                    />

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-md bg-red-700 py-3 text-white font-semibold hover:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? "Signing up..." : "Signup"}
                    </button>

                    <div className="text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link to="/login" className="text-gray-900 underline underline-offset-2">
                            Login
                        </Link>
                    </div>
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