import React, { useMemo, useState } from "react";
// import { Link } from "react-router-dom";
// import { useToast } from "../context/ToastContext";
// import {useAuth} from "../context/AuthContext";
// import { useLocation, useNavigate } from 'react-router-dom';
import { Button, TextField, Typography } from "@mui/material";


export default function ContactPage() {

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        subject: "",
        message: "",
    });

    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const errors = useMemo(() => {
        const e: Record<string, string> = {};
        if (!form.fullName.trim()) e.fullName = "Full name is required.";
        if (!form.email.trim()) e.email = "Email is required.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = "Enter a valid email address.";
        if (!form.subject.trim()) e.subject = "Subject is required.";
        if (!form.message.trim()) e.message = "Message is required.";
        return e;
    }, [form]);

    const hasErrors = Object.keys(errors).length > 0;

    const setField = (key: keyof typeof form, value: string) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const markTouched = (key: keyof typeof form) => {
        setTouched((prev) => ({ ...prev, [key]: true }));
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setTouched({ fullName: true, email: true, subject: true, message: true });
        if (hasErrors) return;

        try {
            setIsSubmitting(true);

            // TODO: wire this to your backend or email service.
            // For now, this gives you a clean UX and a clear hook for integration.
            console.log("Contact form submitted:", form);

            setForm({ fullName: "", email: "", subject: "", message: "" });
            setTouched({});
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-slate-50 px-4 pt-10 pb-16">
            <div className="mx-auto w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
                <div className="mb-8">
                    <Typography variant="h4" className="mb-2 font-semibold tracking-tight text-slate-900">
                        Contact Us
                    </Typography>
                    <Typography variant="body1" className="text-slate-600">
                        Have a question, partnership idea, or need support? Send us a message and we’ll get back to you.
                    </Typography>
                </div>

                <div className="grid gap-10 lg:grid-cols-5">
                    {/* Left: Form */}
                    <div className="lg:col-span-3">
                        <form onSubmit={onSubmit} className="space-y-5">
                            <TextField
                                label="Full name"
                                value={form.fullName}
                                onChange={(e) => setField("fullName", e.target.value)}
                                onBlur={() => markTouched("fullName")}
                                error={Boolean(touched.fullName && errors.fullName)}
                                helperText={touched.fullName && errors.fullName ? errors.fullName : " "}
                                fullWidth
                                required
                            />

                            <TextField
                                label="Email"
                                type="email"
                                value={form.email}
                                onChange={(e) => setField("email", e.target.value)}
                                onBlur={() => markTouched("email")}
                                error={Boolean(touched.email && errors.email)}
                                helperText={touched.email && errors.email ? errors.email : " "}
                                fullWidth
                                required
                                autoComplete="email"
                                inputProps={{ pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$" }}
                            />

                            <TextField
                                label="Subject"
                                value={form.subject}
                                onChange={(e) => setField("subject", e.target.value)}
                                onBlur={() => markTouched("subject")}
                                error={Boolean(touched.subject && errors.subject)}
                                helperText={touched.subject && errors.subject ? errors.subject : " "}
                                fullWidth
                                required
                            />

                            <TextField
                                label="Message"
                                value={form.message}
                                onChange={(e) => setField("message", e.target.value)}
                                onBlur={() => markTouched("message")}
                                error={Boolean(touched.message && errors.message)}
                                helperText={touched.message && errors.message ? errors.message : " "}
                                fullWidth
                                multiline
                                minRows={5}
                                required
                            />

                            <div className="flex flex-col gap-3">
                                <Typography variant="body2" className="text-slate-500">
                                    By submitting, you agree we may contact you at the email provided.
                                </Typography>

                                <div className="w-full">
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        disabled={isSubmitting}
                                        fullWidth
                                        className="!w-full !rounded-xl !px-5 !py-3"
                                    >
                                        {isSubmitting ? "Sending…" : "Send message"}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Right: Contact info */}
                    <div className="lg:col-span-2">
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                            <Typography variant="h6" className="mb-2 font-semibold tracking-tight text-slate-900">
                                Other ways to reach us
                            </Typography>
                            <Typography variant="body2" className="text-slate-600">
                                Prefer email? Use the address below. We usually respond within 1–2 business days.
                            </Typography>

                            <div className="mt-5 space-y-3">
                                <div>
                                    <Typography variant="subtitle2" className="text-slate-900">
                                        Email
                                    </Typography>
                                    <a
                                        href="mailto:info@MentorSpheres.org"
                                        className="text-sm font-medium text-slate-900 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-900"
                                    >
                                        info@MentorSpheres.org
                                    </a>
                                </div>

                                <div>
                                    <Typography variant="subtitle2" className="text-slate-900">
                                        Office
                                    </Typography>
                                    <Typography variant="body2" className="text-slate-600">
                                        Social Lab Ventures LLC
                                        <br />
                                        2108 N St, Suite N
                                        <br />
                                        Sacramento, CA 95816
                                    </Typography>
                                </div>

                                <div className="pt-4">
                                    <div className="rounded-xl border border-slate-200 bg-white p-4">
                                        <Typography variant="body2" className="text-slate-600">
                                            If this is about privacy or data requests, please email{
                                            " "}
                                            <a
                                                href="mailto:info@MentorSpheres.org"
                                                className="font-medium text-slate-900 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-900"
                                            >
                                                info@MentorSpheres.org
                                            </a>
                                            .
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}