import clsx from 'clsx'
import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import * as yup from 'yup'
import { useAddFunctionMutation } from '../redux/api/functionApi'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const FunctionForm = () => {
    const navigate = useNavigate()
    const [addfunction, { isError, isLoading, isSuccess, error }] = useAddFunctionMutation()

    const formik = useFormik({
        initialValues: {
            name: "",
            image: "",
            desc: "",
        },
        validationSchema: yup.object({
            name: yup.string().required("Enter name"),
            image: yup.mixed().required("Select an image"),
            desc: yup.string().required("Enter description"),
        }),
        onSubmit: (values, { resetForm }) => {
            const fd = new FormData()
            for (const key in values) {
                fd.append(key, values[key])
            }
            addfunction(fd)
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
            toast.success("Function added successfully")
            navigate("/admin/function-list")
        }
    }, [isSuccess])

    return (
        <div className='flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-100 via-pink-100 to-yellow-100 px-4'>
            <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 w-full max-w-md md:max-w-lg">
                <h1 className='text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-6'>Add Function</h1>

                <form onSubmit={formik.handleSubmit} className='space-y-4'>
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

                    <button
                        type='submit'
                        className='w-full py-3 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-xl shadow-md transition-all duration-300'
                    >
                        {isLoading ? 'Adding...' : 'Add Function'}
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

export default FunctionForm
