import React from "react";
// import { Link } from "react-router-dom";
// import { useToast } from "../context/ToastContext";
// import {useAuth} from "../context/AuthContext";
// import { useLocation, useNavigate } from 'react-router-dom';
import { Typography } from "@mui/material";


export default function PrivacyPage() {

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-12">
            <div className="mx-auto w-full max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
                <Typography variant="h4" className="mb-3 font-semibold tracking-tight text-slate-900">
                    Privacy Policy of MentorSpheres
                </Typography>
                <div className="mb-8 flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-700">
                        Last updated: January 28th, 2026
                    </span>
                    <span className="text-sm text-slate-500">
                        This policy explains how we handle your information.
                    </span>
                </div>

                <div className="space-y-10">
                    <div>
                        <Typography variant="body1" className="text-slate-800">
                            MentorSpheres collects some Personal Data from its Users. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
                        </Typography>
                    </div>

                    <div className="pt-10 border-t border-slate-200">
                        <Typography variant="h6" className="mb-3 font-semibold tracking-tight text-slate-900">
                            Owner and Data Controller
                        </Typography>
                        <div className="space-y-1 text-slate-800">
                            <Typography variant="body1">Social Lab Ventures LLC</Typography>
                            <Typography variant="body1">2108 N St, Suite N</Typography>
                            <Typography variant="body1">Sacramento, CA 95816</Typography>
                            <Typography variant="body1">United States of America</Typography>
                            <Typography variant="body1">
                                Owner contact email:{" "}
                                <a
                                    href="mailto:Hello@SocialLab.Ventures"
                                    className="font-medium text-slate-900 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-900"
                                >
                                    Hello@SocialLab.Ventures
                                </a>
                            </Typography>
                        </div>
                    </div>

                    <div className="pt-10 border-t border-slate-200">
                        <Typography variant="h6" className="mb-3 font-semibold tracking-tight text-slate-900">
                            Types of Data Collected
                        </Typography>
                        <Typography variant="body1" className="mb-3 text-slate-800">
                            Among the types of Personal Data that MentorSpheres collects, by itself or through third parties, there are:
                        </Typography>
                        <ul className="list-disc space-y-2 pl-6 text-slate-800 marker:text-slate-400">
                            <li>Trackers and Cookies</li>
                            <li>Usage Data</li>
                            <li>User ID</li>
                            <li>Email address</li>
                            <li>First name and last name</li>
                            <li>Device information</li>
                            <li>Universally Unique Identifier (UUID)</li>
                            <li>Profession and company name</li>
                            <li>City, ZIP/Postal code, state, province, country, county</li>
                            <li>Latitude and longitude (city level)</li>
                            <li>IP address</li>
                            <li>App information and device logs</li>
                            <li>Operating systems and browser information</li>
                            <li>Language</li>
                            <li>Number of sessions and session duration</li>
                            <li>Page views and interaction events</li>
                            <li>Mouse movements, scroll position, keypress events, touch events</li>
                            <li>Video views, clicks, browsing and search history</li>
                            <li>Contact details and communications</li>
                        </ul>
                        <div className="mt-4 space-y-2">
                            <Typography variant="body2" className="text-slate-600">
                                Personal Data may be freely provided by the User or collected automatically when using MentorSpheres.
                            </Typography>
                            <Typography variant="body2" className="text-slate-600">
                                Unless specified otherwise, all Data requested by MentorSpheres is mandatory and failure to provide this Data may make it impossible for MentorSpheres to provide its services.
                            </Typography>
                            <Typography variant="body2" className="text-slate-600">
                                Any use of Cookies or other tracking tools serves the purpose of providing the Service required by the User, in addition to any other purposes described in this Privacy Policy and the Cookie Policy.
                            </Typography>
                            <Typography variant="body2" className="text-slate-600">
                                Users are responsible for any third-party Personal Data obtained, published, or shared through MentorSpheres.
                            </Typography>
                        </div>
                    </div>

                    <div className="pt-10 border-t border-slate-200">
                        <Typography variant="h6" className="mb-3 font-semibold tracking-tight text-slate-900">
                            Mode and Place of Processing the Data
                        </Typography>
                        <Typography variant="subtitle1" className="mb-2 font-semibold text-slate-900">
                            Methods of Processing
                        </Typography>
                        <div className="space-y-2">
                            <Typography variant="body2" className="text-slate-600">
                                The Owner takes appropriate security measures to prevent unauthorized access, disclosure, modification, or unauthorized destruction of the Data.
                            </Typography>
                            <Typography variant="body2" className="text-slate-600">
                                Data processing is carried out using computers and IT tools following organizational procedures strictly related to the purposes indicated. Data may be accessible to authorized personnel or external service providers acting as Data Processors.
                            </Typography>
                        </div>

                        <Typography variant="subtitle1" className="mt-6 mb-2 font-semibold text-slate-900">
                            Place
                        </Typography>
                        <div className="space-y-2">
                            <Typography variant="body2" className="text-slate-600">
                                The Data is processed at the Owner’s operating offices and in any other locations where processing parties are located. Data transfers may involve countries other than the User’s own.
                            </Typography>
                        </div>
                    </div>

                    <div className="pt-10 border-t border-slate-200">
                        <Typography variant="h6" className="mb-3 font-semibold tracking-tight text-slate-900">
                            Retention Time
                        </Typography>
                        <Typography variant="body2" className="text-slate-600">
                            Personal Data shall be processed and stored as long as required for the purposes for which it has been collected or as required by law or User consent.
                        </Typography>
                    </div>

                    <div className="pt-10 border-t border-slate-200">
                        <Typography variant="h6" className="mb-3 font-semibold tracking-tight text-slate-900">
                            The Purposes of Processing
                        </Typography>
                        <Typography variant="body1" className="mb-3 text-slate-800">
                            Data is collected to:
                        </Typography>
                        <ul className="list-disc space-y-2 pl-6 text-slate-800 marker:text-slate-400">
                            <li>Provide the Service</li>
                            <li>Comply with legal obligations</li>
                            <li>Respond to enforcement requests</li>
                            <li>Protect rights and interests</li>
                            <li>Detect fraudulent or malicious activity</li>
                        </ul>

                        <Typography variant="body1" className="mt-4 mb-3 text-slate-800">
                            Processing purposes include:
                        </Typography>
                        <ul className="list-disc space-y-2 pl-6 text-slate-800 marker:text-slate-400">
                            <li>Analytics</li>
                            <li>Hosting and backend infrastructure</li>
                            <li>Managing support and contact requests</li>
                            <li>Managing contacts and communications</li>
                            <li>User database management</li>
                            <li>Traffic optimization and distribution</li>
                            <li>Content performance and feature testing (A/B testing)</li>
                            <li>Infrastructure monitoring</li>
                            <li>Displaying external content</li>
                            <li>Platform services and hosting</li>
                            <li>Advertising</li>
                            <li>Tag management</li>
                            <li>Spam and bot protection</li>
                        </ul>
                    </div>

                    <div className="pt-10 border-t border-slate-200">
                        <Typography variant="h6" className="mb-3 font-semibold tracking-tight text-slate-900">
                            Legal Basis of Processing
                        </Typography>
                        <Typography variant="body1" className="mb-3 text-slate-800">
                            Personal Data may be processed if:
                        </Typography>
                        <ul className="list-disc space-y-2 pl-6 text-slate-800 marker:text-slate-400">
                            <li>The User has given consent</li>
                            <li>It is necessary for a contract</li>
                            <li>Required by law</li>
                            <li>In the public interest</li>
                            <li>For legitimate interests of the Owner</li>
                        </ul>
                    </div>

                    <div className="pt-10 border-t border-slate-200">
                        <Typography variant="h6" className="mb-3 font-semibold tracking-tight text-slate-900">
                            User Rights (GDPR &amp; CCPA)
                        </Typography>
                        <Typography variant="body1" className="mb-3 text-slate-800">
                            Users have the right to:
                        </Typography>
                        <ul className="list-disc space-y-2 pl-6 text-slate-800 marker:text-slate-400">
                            <li>Withdraw consent</li>
                            <li>Object to processing</li>
                            <li>Access their Data</li>
                            <li>Request correction</li>
                            <li>Restrict processing</li>
                            <li>Request deletion</li>
                            <li>Receive their Data in portable format</li>
                            <li>Lodge a complaint with a data protection authority</li>
                        </ul>
                        <div className="mt-4 space-y-2">
                            <Typography variant="body2" className="text-slate-600">
                                Requests can be sent to:{" "}
                                <a
                                    href="mailto:info@MentorSpheres.org"
                                    className="font-medium text-slate-900 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-900"
                                >
                                    info@MentorSpheres.org
                                </a>
                            </Typography>
                            <Typography variant="body2" className="text-slate-600">
                                Responses will be provided within one month.
                            </Typography>
                        </div>
                    </div>

                    <div className="pt-10 border-t border-slate-200">
                        <Typography variant="h6" className="mb-3 font-semibold tracking-tight text-slate-900">
                            Changes to This Privacy Policy
                        </Typography>
                        <Typography variant="body2" className="text-slate-600">
                            The Owner reserves the right to make changes at any time by posting updates on this page. Users are encouraged to review this policy regularly.
                        </Typography>
                    </div>

                    <div className="pt-10 border-t border-slate-200">
                        <Typography variant="h6" className="mb-3 font-semibold tracking-tight text-slate-900">
                            Definitions
                        </Typography>
                        <div className="space-y-2">
                            <Typography variant="body2" className="text-slate-600">
                                <span className="font-semibold text-slate-800">Personal Data:</span> Information that identifies a person.
                            </Typography>
                            <Typography variant="body2" className="text-slate-600">
                                <span className="font-semibold text-slate-800">Usage Data:</span> Data collected automatically (IP address, browser type, pages visited, etc.).
                            </Typography>
                            <Typography variant="body2" className="text-slate-600">
                                <span className="font-semibold text-slate-800">User:</span> Individual using MentorSpheres.
                            </Typography>
                            <Typography variant="body2" className="text-slate-600">
                                <span className="font-semibold text-slate-800">Data Controller (Owner):</span> Social Lab Ventures LLC.
                            </Typography>
                        </div>
                    </div>
                </div>

                <div className="mt-12 rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <Typography variant="body2" className="text-slate-600">
                        If you have questions about this Privacy Policy, contact us using the email addresses above.
                    </Typography>
                </div>
            </div>
        </div>
    );
}