import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import clsx from 'clsx'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import {
    useAddFunctionMutation,
    useDeleteFunctionMutation,
    useGetFunctionQuery,
    useUpdateFunctionMutation
} from '../redux/api/functionApi'

// --- Skeleton Component ---
const TableSkeleton = () => (
    <div className="animate-pulse">
        {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center space-x-4 border-b p-4">
                <div className="h-12 w-12 bg-gray-200 rounded-xl"></div>
                <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div className="h-8 w-20 bg-gray-200 rounded-lg"></div>
            </div>
        ))}
    </div>
)

const AllFunction = () => {
    const navigate = useNavigate()
    const { data, isLoading } = useGetFunctionQuery()

    const [editItem, setEditItem] = useState(null)

    const [addFunction, addState] = useAddFunctionMutation()
    const [updateFunction, updateState] = useUpdateFunctionMutation()
    const [deleteFunction, deleteState] = useDeleteFunctionMutation()

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: editItem?.name || "",
            desc: editItem?.desc || "",
            image: ""
        },
        validationSchema: yup.object({
            name: yup.string().required("Enter name"),
            desc: yup.string().required("Enter description"),
            image: editItem
                ? yup.mixed().notRequired()
                : yup.mixed().required("Select an image"),
        }),
        onSubmit: (values, { resetForm }) => {
            const fd = new FormData()
            Object.entries(values).forEach(([key, value]) => {
                if (key === "image") {
                    if (value instanceof File) fd.append("image", value)
                } else {
                    fd.append(key, value)
                }
            })

            if (editItem) {
                updateFunction({ id: editItem._id, userData: fd })
            } else {
                addFunction(fd)
            }

            resetForm()
            setEditItem(null)
            document.getElementById('function_modal')?.close()
        }
    })

    useEffect(() => {
        if (addState.isSuccess) {
            toast.success("Function added successfully")
            navigate("/admin/function-list")
        }
    }, [addState.isSuccess])

    useEffect(() => {
        if (updateState.isSuccess) {
            toast.success("Function updated successfully")
            navigate("/admin/function-list")
        }
    }, [updateState.isSuccess])

    useEffect(() => {
        if (deleteState.isSuccess) toast.success("Function deleted successfully")
        if (deleteState.isError) toast.error("Failed to delete function")
    }, [deleteState.isSuccess, deleteState.isError])

    const handleClass = (arg) => clsx({
        "w-full px-4 py-3 rounded-xl border transition-all duration-200 outline-none focus:ring-2 focus:ring-emerald-500/20": true,
        "border-gray-200 focus:border-emerald-500": !formik.touched[arg] || !formik.errors[arg],
        "border-red-500 bg-red-50": formik.touched[arg] && formik.errors[arg],
    })

    return (
        <div className=" bg-gray-50/50 p-4 md:p-8">
            {/* HEADER SECTION */}
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Functions Management</h1>
                    <p className="text-gray-500 mt-1">Create, update and manage your platform functions.</p>
                </div>
                <button
                    className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-2xl shadow-lg shadow-emerald-200 transition-all active:scale-95 font-semibold"
                    onClick={() => {
                        setEditItem(null)
                        formik.resetForm()
                        document.getElementById('function_modal')?.showModal()
                    }}
                >
                    <span className="text-xl">+</span> Add New Function
                </button>
            </div>

            {/* TABLE CONTAINER */}
            <div className="max-w-7xl mx-auto bg-white rounded-[2rem] border border-gray-100 shadow-xl overflow-hidden flex flex-col h-[500px]">

                {/* FIXED HEADER */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse table-fixed">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="w-24 px-6 py-5 text-xs font-bold uppercase tracking-wider text-gray-500">Preview</th>
                                <th className="w-1/4 px-6 py-5 text-xs font-bold uppercase tracking-wider text-gray-500">Name & Info</th>
                                <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider text-gray-500">Description</th>
                                <th className="w-32 px-6 py-5 text-center text-xs font-bold uppercase tracking-wider text-gray-500">Actions</th>
                            </tr>
                        </thead>
                    </table>
                </div>

                {/* SCROLLABLE BODY (Scrollbar Hidden) */}
                <div className="overflow-y-auto flex-1 overflow-x-auto scrollbar-hide [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    <table className="w-full text-left border-collapse table-fixed">
                        <tbody className="divide-y divide-gray-50">
                            {isLoading ? (
                                <tr>
                                    <td colSpan="4" className="p-0"><TableSkeleton /></td>
                                </tr>
                            ) : data?.length > 0 ? (
                                data.map((item) => (
                                    <tr key={item._id} className="hover:bg-gray-50/80 transition-colors group">
                                        <td className="w-24 px-6 py-4">
                                            <div className="relative h-14 w-14 overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                            </div>
                                        </td>

                                        <td className="w-1/4 px-6 py-4">
                                            <div className="font-bold text-gray-900 truncate">{item.name}</div>
                                            <div className="text-xs text-gray-400">ID: {item._id.slice(-6)}</div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <p className="text-sm text-gray-600 line-clamp-2">
                                                {item.desc}
                                            </p>
                                        </td>

                                        <td className="w-32 px-6 py-4">
                                            <div className="flex justify-center items-center gap-2">
                                                <button
                                                    className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors"
                                                    onClick={() => {
                                                        setEditItem(item)
                                                        document.getElementById("function_modal")?.showModal()
                                                    }}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                </button>

                                                <button
                                                    className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                                                    onClick={() => deleteFunction(item._id)}
                                                    disabled={deleteState.isLoading}
                                                >
                                                    {deleteState.isLoading ? (
                                                        <span className="loading loading-spinner loading-xs"></span>
                                                    ) : (
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    )}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-20">
                                        <p className="text-gray-500">No functions found.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* MODAL */}
            <dialog id='function_modal' className='modal modal-bottom sm:modal-middle backdrop-blur-sm'>
                <div className='modal-box max-w-md p-8 rounded-[2.5rem] scrollbar-hide bg-white shadow-2xl border-none'>
                    <div className="flex justify-between items-center mb-6">
                        <h3 className='text-2xl font-bold text-gray-900'>
                            {editItem ? "Update Function" : "New Function"}
                        </h3>
                        <button
                            onClick={() => document.getElementById('function_modal')?.close()}
                            className="text-gray-400 hover:text-gray-600"
                        >✕</button>
                    </div>

                    {editItem?.image && !formik.values.image && (
                        <div className='flex justify-center mb-6'>
                            <div className="p-1 border-2 border-dashed border-emerald-200 rounded-2xl">
                                <img
                                    src={editItem.image}
                                    alt="preview"
                                    className="w-32 h-32 object-cover rounded-xl shadow-inner"
                                />
                            </div>
                        </div>
                    )}

                    <form onSubmit={formik.handleSubmit} className='space-y-5'>
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase ml-1 mb-1 block">Name</label>
                            <input
                                className={handleClass("name")}
                                {...formik.getFieldProps("name")}
                                type="text"
                                placeholder="e.g. Birthday Party"
                            />
                            {formik.touched.name && formik.errors.name && (
                                <p className="text-red-500 text-xs mt-1 ml-1">{formik.errors.name}</p>
                            )}
                        </div>

                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase ml-1 mb-1 block">Description</label>
                            <textarea
                                rows="3"
                                className={handleClass("desc")}
                                {...formik.getFieldProps("desc")}
                                placeholder="Describe the function..."
                            />
                        </div>

                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase ml-1 mb-1 block">Upload Image</label>
                            <input
                                type="file"
                                className="file-input file-input-bordered w-full rounded-xl"
                                onChange={(e) =>
                                    formik.setFieldValue("image", e.currentTarget.files[0])
                                }
                            />
                        </div>

                        <div className='flex gap-3 pt-4'>
                            <button
                                type='submit'
                                disabled={addState.isLoading || updateState.isLoading}
                                className='flex-1 bg-emerald-600 text-white px-6 py-3 rounded-2xl shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition font-bold disabled:opacity-50'
                            >
                                {addState.isLoading || updateState.isLoading ? (
                                    <span className="loading loading-spinner"></span>
                                ) : (
                                    editItem ? "Save Changes" : "Create Function"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    )
}

export default AllFunction