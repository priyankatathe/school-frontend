import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import clsx from 'clsx'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import {
    useDeleteFunctionMutation,
    useGetFunctionQuery,
    useUpdateFunctionMutation
} from '../redux/api/functionApi'

const AllFunction = () => {
    const navigate = useNavigate()
    const { data } = useGetFunctionQuery()
    const [deleteFunction, { isError: isDelErr, isSuccess: isDelSuccess }] = useDeleteFunctionMutation()
    const [updateFunction, { isSuccess }] = useUpdateFunctionMutation()
    const [editItem, setEditItem] = useState(null)

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: editItem?.name || '',
            desc: editItem?.desc || '',
            image: ''
        },
        validationSchema: yup.object({
            name: yup.string().required('Enter name'),
            desc: yup.string().required('Enter description'),
            image: yup.mixed().notRequired()
        }),
        onSubmit: (values, { resetForm }) => {
            const fd = new FormData()
            Object.entries(values).forEach(([key, value]) => fd.append(key, value))
            updateFunction({ id: editItem._id, userData: fd })
            resetForm()
            document.getElementById('function_modal')?.close()
        }
    })

    useEffect(() => {
        if (isSuccess) {
            toast.success('Function updated successfully')
            navigate('/admin/function-list')
        }
    }, [isSuccess])

    useEffect(() => {
        if (isDelSuccess) toast.success("Function deleted successfully")
        if (isDelErr) toast.error("Failed to delete function")
    }, [isDelSuccess, isDelErr])

    const handleClass = (arg) => clsx({
        "input w-full border rounded-xl px-3 py-2": true,
        "border-red-500": formik.touched[arg] && formik.errors[arg],
        "border-green-500": formik.touched[arg] && !formik.errors[arg]
    })

    return (
        <div className='p-5 mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {data?.length > 0 ? data.map(item => (
                <div
                    key={item._id}
                    className='bg-white/80 backdrop-blur-md shadow-xl rounded-3xl overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl flex flex-col'
                >
                    {/* Image */}
                    <div className='w-full h-52 overflow-hidden rounded-t-3xl'>
                        <img
                            src={item.image}
                            alt={item.name}
                            className='w-full h-full object-cover hover:scale-110 transition-transform duration-300'
                        />
                    </div>

                    {/* Content */}
                    <div className='p-5 flex-1 flex flex-col justify-between'>
                        <div>
                            <h3 className='text-2xl font-bold text-gray-800'>{item.name}</h3>
                            <p className='text-gray-600 mt-2 text-sm md:text-base'>{item.desc}</p>
                        </div>

                        {/* Actions */}
                        <div className='flex gap-3 mt-5'>
                            <button
                                className='flex-1 bg-green-500 text-white px-4 py-2 rounded-2xl shadow hover:bg-green-600 transition font-medium'
                                onClick={() => { setEditItem(item); document.getElementById('function_modal')?.showModal() }}
                            >
                                Edit
                            </button>
                            <button
                                className='flex-1 bg-red-500 text-white px-4 py-2 rounded-2xl shadow hover:bg-red-600 transition font-medium'
                                onClick={() => deleteFunction(item._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )) : (
                <div className='col-span-full text-center text-gray-500 text-lg p-10'>No functions found</div>
            )
            }

            {/* Edit Modal */}
            <dialog id='function_modal' className='modal modal-bottom sm:modal-middle'>
                <div className='modal-box w-full max-w-md p-6 rounded-3xl bg-white/90 backdrop-blur-md shadow-2xl'>
                    <h3 className='text-2xl font-extrabold text-center text-green-600 mb-6'>Edit Function</h3>

                    {editItem?.image && (
                        <div className='flex justify-center mb-4'>
                            <img
                                src={editItem.image}
                                alt="current"
                                className="w-28 h-28 object-cover rounded-xl shadow-md"
                            />
                        </div>
                    )}

                    <form onSubmit={formik.handleSubmit} className='space-y-4'>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Name</label>
                            <input
                                type='text'
                                placeholder='Function Name'
                                className={handleClass('name') + ' w-full px-4 py-2 rounded-xl border focus:ring-2 focus:ring-green-400 transition'}
                                {...formik.getFieldProps('name')}
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Description</label>
                            <textarea
                                placeholder='Function Description'
                                className={handleClass('desc') + ' w-full px-4 py-2 rounded-xl border focus:ring-2 focus:ring-green-400 transition'}
                                {...formik.getFieldProps('desc')}
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Upload Image (optional)</label>
                            <input
                                type='file'
                                className={handleClass('image') + ' w-full'}
                                onChange={(e) => formik.setFieldValue('image', e.currentTarget.files[0])}
                            />
                        </div>

                        <div className='modal-action flex flex-col md:flex-row gap-3 mt-4'>
                            <button
                                type='submit'
                                className='bg-green-500 text-white px-5 py-2 rounded-2xl shadow-lg hover:bg-green-600 transition font-semibold'
                            >
                                Update
                            </button>
                            <form method='dialog'>
                                <button
                                    className='bg-gray-200 text-gray-800 px-5 py-2 rounded-2xl shadow-lg hover:bg-gray-300 transition font-semibold'
                                >
                                    Close
                                </button>
                            </form>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    )
}

export default AllFunction
