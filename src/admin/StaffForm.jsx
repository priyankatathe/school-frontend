import clsx from "clsx"
import { useFormik } from "formik"
import React, { useEffect } from "react"
import * as yup from "yup"
import { useAddStaffMutation } from "../redux/api/staffApi"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const StaffForm = () => {
    const navigate = useNavigate()
    const [addstaff, { isError, isLoading, isSuccess, error }] = useAddStaffMutation()

    const formik = useFormik({
        initialValues: {
            name: "",
            image: null,
            sub: "",
            expriance: "",
        },
        validationSchema: yup.object({
            name: yup.string().required("Enter name"),
            image: yup.mixed().required("Select an image"),
            sub: yup.string().required("Enter subject"),
            expriance: yup.string().required("Enter experience"),
        }),
        onSubmit: (values) => {
            const fd = new FormData()
            for (const key in values) {
                fd.append(key, values[key])
            }
            addstaff(fd)
        },
    })

    const handleClass = (arg) =>
        clsx(
            "w-full px-4 py-2 border rounded-lg focus:outline-none transition",
            formik.touched[arg] && formik.errors[arg]
                ? "border-red-500 focus:ring-2 focus:ring-red-400"
                : "border-gray-300 focus:ring-2 focus:ring-emerald-400"
        )

    useEffect(() => {
        if (isSuccess) {
            toast.success("Staff added successfully 🎉")
            formik.resetForm()
            navigate("/admin/staff-list")
        }
        if (isError) {
            toast.error(error?.data?.message || "Failed to add staff ❌")
        }
    }, [isSuccess, isError, error])

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100 px-4">
            <div className="w-full max-w-lg bg-white shadow-2xl rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-center text-emerald-600 mb-6">
                    Add New Staff
                </h2>

                <form onSubmit={formik.handleSubmit} className="space-y-5">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            placeholder="Enter name"
                            className={handleClass("name")}
                            {...formik.getFieldProps("name")}
                        />
                        {formik.touched.name && formik.errors.name && (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
                        )}
                    </div>
                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Profile Image
                        </label>

                        <div className="flex items-center gap-4">
                            {/* Image Preview */}
                            {formik.values.image && (
                                <img
                                    src={URL.createObjectURL(formik.values.image)}
                                    alt="Preview"
                                    className="w-16 h-16 rounded-full object-cover border shadow"
                                />
                            )}

                            {/* Upload Button */}
                            <label
                                htmlFor="image"
                                className="cursor-pointer px-4 py-2 bg-emerald-500 text-white rounded-lg shadow-md hover:bg-emerald-600 transition duration-200 text-sm"
                            >
                                Choose File
                            </label>
                            <input
                                id="image"
                                type="file"
                                accept="image/*"
                                name="image"
                                onChange={(e) => formik.setFieldValue("image", e.currentTarget.files[0])}
                                className="hidden"
                            />
                        </div>

                        {/* Error Message */}
                        {formik.touched.image && formik.errors.image && (
                            <p className="text-red-500 text-sm mt-2">{formik.errors.image}</p>
                        )}
                    </div>


                    {/* Subject */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Subject
                        </label>
                        <input
                            type="text"
                            placeholder="Enter subject"
                            className={handleClass("sub")}
                            {...formik.getFieldProps("sub")}
                        />
                        {formik.touched.sub && formik.errors.sub && (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.sub}</p>
                        )}
                    </div>

                    {/* Experience */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Experience
                        </label>
                        <input
                            type="text"
                            placeholder="Enter experience"
                            className={handleClass("expriance")}
                            {...formik.getFieldProps("expriance")}
                        />
                        {formik.touched.expriance && formik.errors.expriance && (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.expriance}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg shadow-md transition duration-200"
                            disabled={isLoading}
                        >
                            {isLoading ? "Submitting..." : "Add Staff"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default StaffForm
