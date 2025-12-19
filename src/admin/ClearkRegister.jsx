import React from 'react'
import { useRegisterClearkMutation } from '../redux/api/authApi'
import { useFormik } from 'formik'
import clsx from 'clsx'
import * as yup from 'yup'

const ClearkRegister = () => {
    const [registerCleark, { isSuccess, isError, isLoading, error }] = useRegisterClearkMutation()

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            mobile: "",
        },
        validationSchema: yup.object({
            name: yup.string().required("Enter name"),
            email: yup.string().required("Enter email"),
            mobile: yup.string().required("Enter mobile"),
        }),
        onSubmit: (values, { resetForm }) => {
            registerCleark(values)
            resetForm()
        }
    })

    const handleClass = (arg) => clsx({
        "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors": true,
        "border-red-500": formik.touched[arg] && formik.errors[arg],
        "border-green-500": formik.touched[arg] && !formik.errors[arg]
    })

    return (
        <div className='flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 via-cyan-100 to-green-100'>
            <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
                <h1 className='text-3xl font-bold text-gray-800 text-center mb-6'>Cleark Register</h1>

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
                            className={handleClass("email")}
                            {...formik.getFieldProps("email")}
                            type="text"
                            placeholder="Enter email"
                        />
                        {formik.touched.email && formik.errors.email && (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
                        )}
                    </div>

                    <div>
                        <input
                            className={handleClass("mobile")}
                            {...formik.getFieldProps("mobile")}
                            type="text"
                            placeholder="Enter mobile"
                        />
                        {formik.touched.mobile && formik.errors.mobile && (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.mobile}</p>
                        )}
                    </div>

                    <button
                        type='submit'
                        className='w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl shadow-md transition-all duration-300'>
                        {isLoading ? 'Registering...' : 'Register Cleark'}
                    </button>
                </form>

                {isSuccess && <p className="text-green-500 mt-4 text-center">Cleark registered successfully!</p>}
                {isError && <p className="text-red-500 mt-4 text-center">{error?.data?.message || "Something went wrong!"}</p>}
            </div>
        </div>
    )
}

export default ClearkRegister
