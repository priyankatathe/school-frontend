import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import clsx from "clsx";
import { toast } from "react-toastify";
import { useLoginClearkMutation } from "../redux/api/authApi";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaFacebookF, FaGoogle, FaArrowRight } from "react-icons/fa";

const ClearkLogin = () => {
    const navigate = useNavigate();
    const [ClearkLogin, { isSuccess, isError, isLoading, error }] = useLoginClearkMutation();

    const formik = useFormik({
        initialValues: { email: "", password: "" },
        validationSchema: yup.object({
            email: yup.string().email("Invalid email").required("Enter email"),
            password: yup.string().required("Enter password"),
        }),
        onSubmit: async (values, { resetForm }) => {
            await ClearkLogin(values);
            resetForm();
        },
    });

    useEffect(() => {
        if (isSuccess) {
            toast.success("Admin Login Successfully ✅");
            navigate("/cleark");
        }
        if (isError && error) {
            const msg = error?.data?.message || error?.error || error?.status || "Login failed!";
            const lower = msg.toString().toLowerCase();
            if (lower.includes("not registered")) {
                toast.error("Please register first ❌");
            } else if (lower.includes("password")) {
                toast.error("Wrong password ❌");
            } else if (lower.includes("email")) {
                toast.error("Invalid email ❌");
            } else {
                toast.error(msg);
            }
        }
    }, [isSuccess, isError, error, navigate]);

    const handleClass = (key) =>
        clsx(
            "w-full bg-white border border-slate-200 placeholder-slate-400 rounded-2xl py-4 px-12 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all duration-300 shadow-sm",
            formik.touched[key] && formik.errors[key] ? "border-red-400 bg-red-50" : "hover:border-slate-300"
        );

    return (
        <div className="h-screen w-full flex overflow-hidden bg-white">
            
            {/* Left Section: Visual Branding (Full Height) */}
            <div className="hidden lg:flex lg:w-1/2 h-full bg-slate-900 relative items-center justify-center p-12 overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-full opacity-40">
                    <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-emerald-500 rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-blue-600 rounded-full blur-[120px]"></div>
                </div>

                <div className="relative z-10 w-full max-w-lg text-center">
                    <div className="mb-10 inline-flex p-4 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
                        <img
                            src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=800&q=80"
                            alt="Admin"
                            className="w-full h-80 object-cover rounded-2xl shadow-lg transform -rotate-3 hover:rotate-0 transition-transform duration-500"
                        />
                    </div>
                    <h1 className="text-5xl font-black text-white mb-6 tracking-tight leading-[1.1]">
                        The Smartest Way to <span className="text-emerald-400">Manage.</span>
                    </h1>
                    <p className="text-slate-400 text-lg font-medium leading-relaxed">
                        Access your clerk dashboard and manage students, departments, and records with absolute ease.
                    </p>
                </div>
                
                {/* Bottom Badge */}
                <div className="absolute bottom-10 left-10 flex items-center gap-3 text-white/50 text-sm font-semibold tracking-widest uppercase">
                    <span className="w-8 h-[2px] bg-emerald-500"></span>
                    Clerk Administration System v2.0
                </div>
            </div>

            {/* Right Section: Form (Full Height) */}
            <div className="w-full lg:w-1/2 h-full flex items-center justify-center p-8 sm:p-16 md:p-24 bg-white relative">
                
                {/* Top Corner Branding for Mobile */}
                <div className="absolute top-8 left-8 lg:hidden">
                    <span className="text-2xl font-black text-slate-800">Admin<span className="text-emerald-600">.</span></span>
                </div>

                <div className="w-full max-w-md">
                    <div className="mb-12">
                        <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">
                            Sign In<span className="text-emerald-500">.</span>
                        </h2>
                        <p className="text-slate-500 text-lg font-medium italic">Welcome back! Please enter your details.</p>
                    </div>

                    <form onSubmit={formik.handleSubmit} className="space-y-6">
                        {/* Email Field */}
                        <div className="space-y-2 group">
                            <label className="text-sm font-bold text-slate-700 ml-1">Work Email</label>
                            <div className="relative">
                                <FaEnvelope className="absolute top-1/2 -translate-y-1/2 left-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                                <input
                                    type="email"
                                    placeholder="name@company.com"
                                    {...formik.getFieldProps("email")}
                                    className={handleClass("email")}
                                />
                            </div>
                            {formik.touched.email && formik.errors.email && (
                                <p className="text-red-500 text-xs font-bold mt-1 ml-1">{formik.errors.email}</p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2 group">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-sm font-bold text-slate-700">Password</label>
                                <Link to="#" className="text-sm font-bold text-emerald-600 hover:text-emerald-700">Forgot Password?</Link>
                            </div>
                            <div className="relative">
                                <FaLock className="absolute top-1/2 -translate-y-1/2 left-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                                <input
                                    type="password"
                                    placeholder="••••••••••••"
                                    {...formik.getFieldProps("password")}
                                    className={handleClass("password")}
                                />
                            </div>
                            {formik.touched.password && formik.errors.password && (
                                <p className="text-red-500 text-xs font-bold mt-1 ml-1">{formik.errors.password}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-slate-900 hover:bg-emerald-600 text-white font-bold py-5 rounded-2xl shadow-xl shadow-slate-200 transition-all duration-300 flex items-center justify-center gap-3 group disabled:opacity-70 mt-4"
                        >
                            {isLoading ? (
                                <span className="loading loading-spinner"></span>
                            ) : (
                                <>
                                    Log In to Dashboard
                                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer Links */}
                   
                </div>
            </div>
        </div>
    );
};

export default ClearkLogin;