import clsx from 'clsx'
import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import * as yup from 'yup'
import { useAddDepartmentMutation } from '../redux/api/departmentApi'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const DepartmentForm = () => {
    const navigate = useNavigate()
    const [addDep, { isError, isLoading, isSuccess, error }] = useAddDepartmentMutation()

    const formik = useFormik({
        initialValues: {
            name: "",
            image: "",
            head: "",
            desc: "",
            category: "",
        },
        validationSchema: yup.object({
            name: yup.string().required("Enter name"),
            image: yup.mixed().required("Select an image"),
            head: yup.string().required("Enter head"),
            desc: yup.string().required("Enter description"),
            category: yup.string().required("Select category"),
        }),
        onSubmit: (values, { resetForm }) => {
            const fd = new FormData()
            for (const key in values) {
                fd.append(key, values[key])
            }
            addDep(fd)
            resetForm()
        }
    })

    const handleClass = (arg) => clsx({
        "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors": true,
        "border-red-500": formik.touched[arg] && formik.errors[arg],
        "border-green-500": formik.touched[arg] && !formik.errors[arg]
    })

    useEffect(() => {
        if (isSuccess) {
            toast.success("Department added successfully")
            navigate("/admin/department-list")
        }
    }, [isSuccess])

    return (
        <div className='flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 via-cyan-50 to-green-50 px-4'>
            <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 w-full max-w-md md:max-w-lg">
                <h1 className='text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-6'>Add Department</h1>

                <form onSubmit={formik.handleSubmit} className='space-y-4'>
                    {/* Name */}
                    <div>
                        <input
                            className={handleClass("name")}
                            {...formik.getFieldProps("name")}
                            type="text"
                            placeholder="Enter name"
                        />
                        {formik.touched.name && formik.errors.name && (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
                        )}
                    </div>

                    {/* Image */}
                    <div>
                        <input
                            name='image'
                            onChange={e => formik.setFieldValue("image", e.currentTarget.files[0])}
                            className={handleClass("image")}
                            type="file"
                        />
                        {formik.touched.image && formik.errors.image && (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.image}</p>
                        )}
                    </div>

                    {/* Head */}
                    <div>
                        <input
                            className={handleClass("head")}
                            {...formik.getFieldProps("head")}
                            type="text"
                            placeholder="Enter head"
                        />
                        {formik.touched.head && formik.errors.head && (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.head}</p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <input
                            className={handleClass("desc")}
                            {...formik.getFieldProps("desc")}
                            type="text"
                            placeholder="Enter description"
                        />
                        {formik.touched.desc && formik.errors.desc && (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.desc}</p>
                        )}
                    </div>

                    {/* Category */}
                    <div>
                        <select
                            className={handleClass("category")}
                            {...formik.getFieldProps("category")}
                            defaultValue=""
                        >
                            <option value="" disabled selected>Pick a category</option>
                            <option value="hocky">Hocky</option>
                            <option value="cricket">Cricket</option>
                            <option value="handball">Handball</option>
                            <option value="bascketbal">Bascketbal</option>
                            <option value="classical">Classical</option>
                            <option value="western">Western</option>
                            <option value="ncc">NCC</option>
                            <option value="clasess">Clasess</option>
                        </select>
                        {formik.touched.category && formik.errors.category && (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.category}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type='submit'
                        className='w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl shadow-md transition-all duration-300'
                    >
                        {isLoading ? 'Adding...' : 'Add Department'}
                    </button>
                </form>

                {isError && (
                    <p className="text-red-500 mt-4 text-center text-sm sm:text-base">
                        {error?.data?.message || "Something went wrong!"}
                    </p>
                )}
            </div>
        </div>
    )
}

export default DepartmentForm
