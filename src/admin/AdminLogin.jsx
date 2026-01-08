import React, { useEffect } from 'react'
import { useLoginAdminMutation } from '../redux/api/authApi'
import { useFormik } from 'formik'
import * as yup from 'yup'
import clsx from 'clsx'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaEnvelope, FaLock, FaShieldAlt, FaArrowRight } from 'react-icons/fa'

const AdminLogin = () => {
    const navigate = useNavigate()
    const [AdminLogin, { isSuccess, isError, isLoading, error }] = useLoginAdminMutation()

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: yup.object({
            email: yup.string().email("Invalid email").required("Enter email"),
            password: yup.string().required("Enter password"),
        }),
        onSubmit: (values, { resetForm }) => {
            AdminLogin(values)
            resetForm()
        }
    })

    const handleClass = (arg) => clsx(
        "w-full border rounded-2xl px-12 py-4 mt-1 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 shadow-sm text-slate-700 placeholder-slate-400",
        {
            "border-red-400 bg-red-50": formik.touched[arg] && formik.errors[arg],
            "border-slate-200 focus:border-blue-500 hover:border-slate-300": !(formik.touched[arg] && formik.errors[arg])
        }
    )

    useEffect(() => {
        if (isSuccess) {
            toast.success("Admin login successful! ✅")
            navigate("/admin")
        }
        if (isError) {
            toast.error(error?.data?.message || "Login failed! ❌")
        }
    }, [isSuccess, isError, error, navigate])

    return (
        <div className="h-screen w-full flex overflow-hidden bg-white font-sans">
            
            {/* Left Section: Branding & Image (50%) */}
            <div className="hidden lg:flex lg:w-1/2 h-full bg-[#0f172a] relative items-center justify-center p-16">
                {/* Abstract Background Glow */}
                <div className="absolute top-0 right-0 w-full h-full">
                    <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-indigo-600/20 rounded-full blur-[100px]"></div>
                </div>

                <div className="relative z-10 w-full max-w-lg text-center">
                    <div className="mb-8 inline-flex p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
                        <img
                            src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=800&q=80"
                            alt="Admin Visual"
                            className="w-full h-72 object-cover rounded-xl shadow-lg brightness-90 hover:brightness-100 transition-all duration-700"
                        />
                    </div>
                    
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="h-[1px] w-12 bg-blue-500/50"></div>
                        <FaShieldAlt className="text-blue-400 text-xl" />
                        <div className="h-[1px] w-12 bg-blue-500/50"></div>
                    </div>

                    <h1 className="text-5xl font-extrabold text-white mb-6 tracking-tight leading-tight">
                        Super Admin <span className="text-blue-500">Console.</span>
                    </h1>
                    <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-md mx-auto">
                        Secure access to global settings, user management, and system-wide analytics.
                    </p>
                </div>

                {/* Bottom Footer Info */}
                <div className="absolute bottom-10 text-slate-500 text-xs tracking-[0.2em] font-bold uppercase">
                    Secured by Enterprise SSL Encryption
                </div>
            </div>

            {/* Right Section: Login Form (50%) */}
            <div className="w-full lg:w-1/2 h-full flex items-center justify-center p-8 sm:p-20 bg-white relative">
                
                {/* Mobile View Logo */}
                <div className="absolute top-10 left-10 lg:hidden flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <FaShieldAlt className="text-white text-xs" />
                    </div>
                    <span className="font-black text-slate-900 text-xl tracking-tighter uppercase">Admin</span>
                </div>

                <div className="w-full max-w-md">
                    <div className="mb-12">
                        <h2 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">
                            Login <span className="text-blue-600">Access.</span>
                        </h2>
                        <p className="text-slate-500 font-semibold italic">Welcome back, Chief. Please verify your identity.</p>
                    </div>

                    <form onSubmit={formik.handleSubmit} className="space-y-6">
                        {/* Email Input */}
                        <div className="flex flex-col gap-2 group">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Administrator Email</label>
                            <div className="relative">
                                <FaEnvelope className="absolute top-1/2 -translate-y-1/2 left-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="admin@system.com"
                                    {...formik.getFieldProps("email")}
                                    className={handleClass("email")}
                                />
                            </div>
                            {formik.touched.email && formik.errors.email && (
                                <p className="text-red-500 text-[11px] font-bold mt-1 ml-2 uppercase tracking-tight">{formik.errors.email}</p>
                            )}
                        </div>

                        {/* Password Input */}
                        <div className="flex flex-col gap-2 group">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Secret Key</label>
                                <button type="button" className="text-xs font-bold text-blue-600 hover:text-blue-700">Lost Key?</button>
                            </div>
                            <div className="relative">
                                <FaLock className="absolute top-1/2 -translate-y-1/2 left-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                                <input
                                    type="password"
                                    placeholder="••••••••••••"
                                    {...formik.getFieldProps("password")}
                                    className={handleClass("password")}
                                />
                            </div>
                            {formik.touched.password && formik.errors.password && (
                                <p className="text-red-500 text-[11px] font-bold mt-1 ml-2 uppercase tracking-tight">{formik.errors.password}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-slate-900 hover:bg-blue-600 text-white font-bold py-5 rounded-2xl shadow-xl shadow-slate-200 transition-all duration-300 flex items-center justify-center gap-3 group disabled:opacity-70 mt-4"
                        >
                            {isLoading ? (
                                <span className="loading loading-spinner loading-md text-white"></span>
                            ) : (
                                <>
                                    Authorize Login
                                    <FaArrowRight className="group-hover:translate-x-1 transition-transform text-xs" />
                                </>
                            )}
                        </button>
                    </form>

                    
                </div>
            </div>
        </div>
    )
}

export default AdminLogin