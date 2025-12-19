import React, { useEffect } from 'react'
import { useLoginAdminMutation } from '../redux/api/authApi'
import { useFormik } from 'formik'
import * as yup from 'yup'
import clsx from 'clsx'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaEnvelope, FaLock } from 'react-icons/fa'

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

    const handleClass = (arg) => clsx({
        "w-full border rounded-lg px-4 py-3 mt-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition": true,
        "border-red-500": formik.touched[arg] && formik.errors[arg],
        "border-green-500": formik.touched[arg] && !formik.errors[arg]
    })

    useEffect(() => {
        if (isSuccess) {
            toast.success("Admin login successful!")
            navigate("/admin")
        }
        if (isError) {
            toast.error(error?.data?.message || "Login failed!")
        }
    }, [isSuccess, isError])

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">

                {/* Left: Image */}
                <div className="md:w-1/2">
                    <img
                        src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=800&q=80"
                        alt="Admin Login"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Right: Form */}
                <div className="md:w-1/2 p-10 flex flex-col justify-center">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Admin Login</h1>

                    <form onSubmit={formik.handleSubmit} className="space-y-5">
                        {/* Email */}
                        <div className="relative">
                            <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Enter Your Email"
                                {...formik.getFieldProps("email")}
                                className={handleClass("email")}
                                style={{ paddingLeft: "2.5rem" }}
                            />
                            {formik.touched.email && formik.errors.email && (
                                <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <FaLock className="absolute top-3 left-3 text-gray-400" />
                            <input
                                type="password"
                                placeholder="Enter Your Password"
                                {...formik.getFieldProps("password")}
                                className={handleClass("password")}
                                style={{ paddingLeft: "2.5rem" }}
                            />
                            {formik.touched.password && formik.errors.password && (
                                <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold shadow-lg transition-all duration-300 disabled:opacity-50"
                        >
                            {isLoading ? "Logging in..." : "Login"}
                        </button>
                    </form>

                    <p className="text-center text-gray-500 mt-5 text-sm">
                        © 2025 Your School Name. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AdminLogin
