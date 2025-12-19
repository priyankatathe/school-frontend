import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import clsx from "clsx";
import { toast } from "react-toastify";
import { useLoginClearkMutation } from "../redux/api/authApi";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaFacebookF, FaGoogle } from "react-icons/fa";

const ClearkLogin = () => {
    const navigate = useNavigate();
    const [ClearkLogin, { isSuccess, isError, isLoading, error }] =
        useLoginClearkMutation();

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
            const msg =
                error?.data?.message || error?.error || error?.status || "Login failed!";
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
            "w-full bg-slate-100 placeholder-slate-400 rounded-full py-3 px-5 focus:outline-none focus:ring-2 focus:ring-green-300 transition",
            formik.touched[key] && formik.errors[key] && "border border-red-500",
            formik.touched[key] && !formik.errors[key] && "border border-green-500"
        );

    return (
        <div className="min-h-screen bg-[#fef7f2] flex items-center justify-center px-4">
            <div className="bg-white shadow-xl rounded-3xl overflow-hidden flex flex-col md:flex-row w-full max-w-5xl">

                {/* Left side - image */}
                <div className="w-full md:w-1/2 flex justify-center items-center bg-white p-10">
                    <img
                        src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=800&q=80"
                        alt="Admin Login"
                        className="w-[240px] md:w-[280px] h-auto object-contain rounded-lg"
                    />
                </div>

                {/* Right side - form */}
                <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold text-slate-800 mb-2 text-center">
                        Cleark Login
                    </h2>
                    <p className="text-slate-500 text-sm mb-6 text-center">
                        Enter your credentials to access the dashboard.
                    </p>

                    <form onSubmit={formik.handleSubmit} className="space-y-4">
                        {/* Email */}
                        <div className="relative">
                            <FaEnvelope className="absolute top-3 left-4 text-gray-400" />
                            <input
                                type="email"
                                placeholder="Email"
                                {...formik.getFieldProps("email")}
                                className={handleClass("email")}
                                style={{ paddingLeft: "2.5rem" }}
                            />
                            {formik.touched.email && formik.errors.email && (
                                <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <FaLock className="absolute top-3 left-4 text-gray-400" />
                            <input
                                type="password"
                                placeholder="Password"
                                {...formik.getFieldProps("password")}
                                className={handleClass("password")}
                                style={{ paddingLeft: "2.5rem" }}
                            />
                            {formik.touched.password && formik.errors.password && (
                                <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>
                            )}
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-3 rounded-full text-white font-semibold transition ${isLoading
                                ? "bg-green-400 cursor-not-allowed"
                                : "bg-green-600 hover:bg-green-700"
                                }`}
                        >
                            {isLoading ? "Logging in..." : "Login"}
                        </button>
                    </form>

                    {/* Social login */}
                    <div className="flex items-center justify-center gap-4 mt-6">
                        <button className="p-2 rounded-full border border-slate-200 hover:bg-slate-100 transition">
                            <FaFacebookF />
                        </button>
                        <button className="p-2 rounded-full border border-slate-200 hover:bg-slate-100 transition">
                            <FaGoogle />
                        </button>
                    </div>

                    {/* Footer */}
                    <p className="text-center text-sm text-slate-500 mt-6">
                        Don’t have an account?{" "}
                        <Link
                            to="/admin-register"
                            className="text-emerald-700 font-medium hover:underline"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ClearkLogin;
