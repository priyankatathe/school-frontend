import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useAddStudentMutation } from '../redux/api/studentApi'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import clsx from 'clsx'

const AddStud = () => {
    const navigate = useNavigate()
    const [preview, setPreview] = useState(null)
    const [addStud, { isSuccess }] = useAddStudentMutation()

    const formik = useFormik({
        initialValues: {
            firstname: "",
            lastname: "",
            image: "",
            gender: "",
            dob: "",
            email: "",
            phone: "",
            address: "",
            city: "",
            state: "",
            pincode: "",
            status: "",
        },
        validationSchema: yup.object({
            firstname: yup.string().required("Enter firstname"),
            lastname: yup.string().required("Enter lastname"),
            image: yup.mixed().required("Upload an image"),
            gender: yup.string().required("Select gender"),
            dob: yup.string().required("Select DOB"),
            email: yup.string().email("Invalid email").required("Enter email"),
            phone: yup.string().required("Enter phone"),
            address: yup.string().required("Enter address"),
            city: yup.string().required("Enter city"),
            state: yup.string().required("Enter state"),
            pincode: yup.string().required("Enter pincode"),
            status: yup.string().required("Select status"),
        }),
        onSubmit: (values, { resetForm }) => {
            const fd = new FormData()
            Object.entries(values).forEach(([key, value]) => fd.append(key, value))
            addStud(fd)
            resetForm()
            setPreview(null)
        }
    })

    useEffect(() => {
        if (isSuccess) {
            toast.success("Student added successfully")
            navigate("/cleark/student-list")
        }
    }, [isSuccess])

    const handleClass = (field) =>
        clsx(
            "w-full px-4 pt-5 pb-2 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200",
            {
                "border-red-400 focus:ring-red-400": formik.touched[field] && formik.errors[field],
                "border-green-400 focus:ring-green-400": formik.touched[field] && !formik.errors[field],
                "border-gray-300 focus:ring-blue-400": !formik.touched[field],
            }
        )

    const handleImagePreview = (e) => {
        const file = e.currentTarget.files[0]
        formik.setFieldValue("image", file)
        if (file) setPreview(URL.createObjectURL(file))
    }

    return (
        <div className="p-4 sm:p-6 md:p-10 bg-gradient-to-r from-purple-100 via-pink-100 to-yellow-100 min-h-screen">
            <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl p-8 sm:p-12">
                <h2 className="text-4xl font-extrabold text-center text-purple-700 mb-10 animate-pulse">
                    Student Registration
                </h2>

                <form onSubmit={formik.handleSubmit} className="space-y-6">
                    {/* Name Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="relative">
                            <input
                                type="text"
                                {...formik.getFieldProps("firstname")}
                                className={handleClass("firstname")}
                                placeholder=" "
                            />
                            <label className="absolute top-1 left-4 text-gray-400 text-sm transition-all duration-200 pointer-events-none">
                                First Name
                            </label>
                        </div>

                        <div className="relative">
                            <input
                                type="text"
                                {...formik.getFieldProps("lastname")}
                                className={handleClass("lastname")}
                                placeholder=" "
                            />
                            <label className="absolute top-1 left-4 text-gray-400 text-sm transition-all duration-200 pointer-events-none">
                                Last Name
                            </label>
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                        <div className="relative">
                            <input
                                type="file"
                                name="image"
                                onChange={handleImagePreview}
                                className={handleClass("image")}
                            />
                            <label className="absolute top-1 left-4 text-gray-400 text-sm">Upload Image</label>
                        </div>
                        {preview && (
                            <div className="flex justify-center sm:justify-start">
                                <img
                                    src={preview}
                                    alt="preview"
                                    className="w-32 h-32 object-cover rounded-full border-2 border-purple-400 shadow-xl"
                                />
                            </div>
                        )}
                    </div>

                    {/* Gender & DOB */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label className="block mb-2 font-medium text-purple-700">Gender</label>
                            <div className="flex gap-6">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="female"
                                        checked={formik.values.gender === "female"}
                                        onChange={formik.handleChange}
                                        className="accent-pink-500"
                                    />
                                    Female
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="male"
                                        checked={formik.values.gender === "male"}
                                        onChange={formik.handleChange}
                                        className="accent-blue-500"
                                    />
                                    Male
                                </label>
                            </div>
                            {formik.touched.gender && formik.errors.gender && (
                                <p className="text-red-500 text-sm mt-1">{formik.errors.gender}</p>
                            )}
                        </div>

                        <div className="relative">
                            <input
                                type="date"
                                {...formik.getFieldProps("dob")}
                                className={handleClass("dob")}
                                placeholder=" "
                            />
                            <label className="absolute top-1 left-4 text-gray-400 text-sm">Date of Birth</label>
                        </div>
                    </div>

                    {/* Email & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="relative">
                            <input
                                type="email"
                                {...formik.getFieldProps("email")}
                                className={handleClass("email")}
                                placeholder=" "
                            />
                            <label className="absolute top-1 left-4 text-gray-400 text-sm">Email</label>
                        </div>

                        <div className="relative">
                            <input
                                type="text"
                                {...formik.getFieldProps("phone")}
                                className={handleClass("phone")}
                                placeholder=" "
                            />
                            <label className="absolute top-1 left-4 text-gray-400 text-sm">Phone</label>
                        </div>
                    </div>

                    {/* Address */}
                    <div className="relative">
                        <input
                            type="text"
                            {...formik.getFieldProps("address")}
                            className={handleClass("address")}
                            placeholder=" "
                        />
                        <label className="absolute top-1 left-4 text-gray-400 text-sm">Address</label>
                    </div>

                    {/* City, State, Pincode */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="relative">
                            <input
                                type="text"
                                {...formik.getFieldProps("city")}
                                className={handleClass("city")}
                                placeholder=" "
                            />
                            <label className="absolute top-1 left-4 text-gray-400 text-sm">City</label>
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                {...formik.getFieldProps("state")}
                                className={handleClass("state")}
                                placeholder=" "
                            />
                            <label className="absolute top-1 left-4 text-gray-400 text-sm">State</label>
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                {...formik.getFieldProps("pincode")}
                                className={handleClass("pincode")}
                                placeholder=" "
                            />
                            <label className="absolute top-1 left-4 text-gray-400 text-sm">Pincode</label>
                        </div>
                    </div>

                    {/* Status */}
                    <div className="relative">
                        <select
                            {...formik.getFieldProps("status")}
                            className={handleClass("status")}
                        >
                            <option value="">Select Status</option>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="reject">Rejected</option>
                        </select>
                        <label className="absolute top-1 left-4 text-gray-400 text-sm">Status</label>
                    </div>

                    {/* Submit Button */}
                    <div className="text-center mt-6">
                        <button
                            type="submit"
                            className="px-10 py-3 w-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 
                                       hover:from-purple-600 hover:via-pink-600 hover:to-yellow-600 
                                       text-white font-bold rounded-3xl shadow-xl hover:shadow-2xl transition duration-300"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddStud
