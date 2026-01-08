import React, { useEffect, useState } from 'react'
import {
    useDeleteStaffMutation,
    useGetUStaffQuery,
    useUpdateStaffMutation,
    useAddStaffMutation
} from '../redux/api/staffApi'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import * as yup from 'yup'
import clsx from 'clsx'

const StaffList = () => {
    const { data } = useGetUStaffQuery()
    const [editItem, setEditItem] = useState(null)

    const [deletestaff, { isError: isstaffError, isSuccess: isSuccessstaff }] =
        useDeleteStaffMutation()

    const [updateStaff, { isSuccess: isUpdateSuccess, isError: isUpdateError, error }] =
        useUpdateStaffMutation()

    const [addstaff, { isSuccess: isAddSuccess, isError: isAddError, isLoading, error: addError }] =
        useAddStaffMutation()

    /* ================= DELETE ================= */
    useEffect(() => {
        if (isSuccessstaff) toast.success("Staff deleted successfully")
        if (isstaffError) toast.error("Failed to delete staff")
    }, [isSuccessstaff, isstaffError])

    /* ================= UPDATE ================= */
    useEffect(() => {
        if (isUpdateSuccess) {
            toast.success("Staff updated successfully")
            document.getElementById('staff_modal')?.close()
        }
        if (isUpdateError) {
            toast.error(error?.data?.message || "Failed to update staff")
        }
    }, [isUpdateSuccess, isUpdateError, error])

    /* ================= ADD ================= */
    useEffect(() => {
        if (isAddSuccess) {
            toast.success("Staff added successfully 🎉")
            addFormik.resetForm()
            document.getElementById('add_staff_modal')?.close()
        }
        if (isAddError) {
            toast.error(addError?.data?.message || "Failed to add staff ❌")
        }
    }, [isAddSuccess, isAddError, addError])

    /* ================= UPDATE FORM ================= */
    const updateFormik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: editItem?.name || '',
            sub: editItem?.sub || '',
            expriance: editItem?.expriance || '',
            image: null
        },
        validationSchema: yup.object({
            name: yup.string().required('Enter name'),
            sub: yup.string().required('Enter description'),
            expriance: yup.string().required('Enter experience'),
            image: yup.mixed().notRequired()
        }),
        onSubmit: (values, { resetForm }) => {
            const fd = new FormData()
            fd.append("name", values.name)
            fd.append("sub", values.sub)
            fd.append("expriance", values.expriance)
            if (values.image) fd.append("photo", values.image)

            updateStaff({ id: editItem._id, userData: fd })
            resetForm()
        }
    })

    /* ================= ADD FORM ================= */
    const addFormik = useFormik({
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
        }
    })

    const handleClass = (arg, formik) =>
        clsx(
            "w-full px-4 py-2 border rounded-lg focus:outline-none transition",
            formik.touched[arg] && formik.errors[arg]
                ? "border-red-500 focus:ring-2 focus:ring-red-400"
                : "border-gray-300 focus:ring-2 focus:ring-emerald-400"
        )

    return (
        <div className='p-6'>

            {/* ADD BUTTON */}
            <div className="flex justify-end mb-6">
                <button
                    onClick={() => document.getElementById('add_staff_modal')?.showModal()}
                    className="bg-emerald-600 text-white px-5 py-2 rounded-xl shadow hover:bg-emerald-700 transition"
                >
                    + Add Staff
                </button>
            </div>

            {/* STAFF CARDS */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse">
                        <thead className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                            <tr>
                                <th className="px-4 py-3 text-left text-sm font-semibold">Image</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold">Name</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold">Subject</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold">Experience</th>
                                <th className="px-4 py-3 text-center text-sm font-semibold">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {data?.length > 0 ? (
                                data.map((item) => (
                                    <tr
                                        key={item._id}
                                        className="border-b hover:bg-gray-50 transition"
                                    >
                                        <td className="px-4 py-3">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="h-12 w-12 rounded-full object-cover border"
                                            />
                                        </td>

                                        <td className="px-4 py-3 font-medium text-gray-800">
                                            {item.name}
                                        </td>

                                        <td className="px-4 py-3 text-gray-600">
                                            {item.sub}
                                        </td>

                                        <td className="px-4 py-3 text-gray-600">
                                            {item.expriance} years
                                        </td>

                                        <td className="px-4 py-3">
                                            <div className="flex justify-center gap-3">
                                                <button
                                                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-lg text-sm"
                                                    onClick={() => {
                                                        setEditItem(item)
                                                        document
                                                            .getElementById("staff_modal")
                                                            ?.showModal()
                                                    }}
                                                >
                                                    Update
                                                </button>

                                                <button
                                                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-lg text-sm"
                                                    onClick={() => deletestaff(item._id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="text-center py-6 text-gray-500"
                                    >
                                        No staff found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>


            {/* ================= ADD STAFF MODAL ================= */}
            <dialog id="add_staff_modal" className="modal modal-middle">
                <div className="modal-box max-w-lg rounded-2xl shadow-2xl border border-gray-100">

                    {/* Header */}
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Add New Staff
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Fill in the staff details below
                        </p>
                        <div className="mt-4 h-px bg-gray-200" />
                    </div>

                    <form onSubmit={addFormik.handleSubmit} className="space-y-5">

                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Name
                            </label>
                            <input
                                placeholder="Enter full name"
                                {...addFormik.getFieldProps("name")}
                                className={`w-full rounded-xl bg-gray-50 px-4 py-2.5 text-sm border
                    focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20
                    outline-none transition ${handleClass("name", addFormik)}`}
                            />
                        </div>

                        {/* Image */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                Profile Image
                            </label>
                            <div className="rounded-xl border border-dashed border-gray-300 p-3 bg-gray-50">
                                <input
                                    type="file"
                                    onChange={e =>
                                        addFormik.setFieldValue("image", e.target.files[0])
                                    }
                                    className="w-full text-sm
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-lg file:border-0
                        file:bg-emerald-100 file:text-emerald-700
                        hover:file:bg-emerald-200 transition"
                                />
                            </div>
                        </div>

                        {/* Subject */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Subject
                            </label>
                            <input
                                placeholder="Enter subject"
                                {...addFormik.getFieldProps("sub")}
                                className={`w-full rounded-xl bg-gray-50 px-4 py-2.5 text-sm border
                    focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20
                    outline-none transition ${handleClass("sub", addFormik)}`}
                            />
                        </div>

                        {/* Experience */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Experience
                            </label>
                            <input
                                placeholder="e.g. 5 Years"
                                {...addFormik.getFieldProps("expriance")}
                                className={`w-full rounded-xl bg-gray-50 px-4 py-2.5 text-sm border
                    focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20
                    outline-none transition ${handleClass("expriance", addFormik)}`}
                            />
                        </div>

                        {/* Actions */}
                        <div className="modal-action flex justify-end gap-3 pt-4 border-t border-gray-100">
                            <button
                                type="submit"
                                className="bg-emerald-600 hover:bg-emerald-700 text-white
                    px-6 py-2.5 rounded-xl text-sm font-medium shadow-sm transition"
                            >
                                {isLoading ? "Adding..." : "Add Staff"}
                            </button>

                            <form method="dialog">
                                <button
                                    className="px-6 py-2.5 rounded-xl text-sm font-medium
                        bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
                                >
                                    Cancel
                                </button>
                            </form>
                        </div>
                    </form>
                </div>
            </dialog>


            {/* ================= UPDATE MODAL ================= */}
            <dialog id="staff_modal" className="modal modal-middle">
                <div className="modal-box max-w-md rounded-2xl shadow-2xl border border-gray-100">

                    {/* Header */}
                    <div className="mb-6 text-center">
                        <h3 className="text-2xl font-semibold text-gray-800">
                            Edit Staff
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                            Update staff details carefully
                        </p>
                        <div className="mt-4 h-px bg-gray-200" />
                    </div>

                    <form onSubmit={updateFormik.handleSubmit} className="space-y-5">

                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Name
                            </label>
                            <input
                                {...updateFormik.getFieldProps('name')}
                                placeholder="Enter full name"
                                className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm
                    focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition"
                            />
                        </div>

                        {/* Subject */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Subject
                            </label>
                            <input
                                {...updateFormik.getFieldProps('sub')}
                                placeholder="Enter subject"
                                className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm
                    focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition"
                            />
                        </div>

                        {/* Experience */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Experience
                            </label>
                            <input
                                {...updateFormik.getFieldProps('expriance')}
                                placeholder="e.g. 5 Years"
                                className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm
                    focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition"
                            />
                        </div>

                        {/* Image */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                Profile Image
                            </label>

                            <div className="flex items-center gap-3 rounded-xl border border-dashed border-gray-300 p-3 bg-gray-50">
                                <input
                                    type="file"
                                    onChange={(e) =>
                                        updateFormik.setFieldValue('image', e.target.files[0])
                                    }
                                    className="w-full text-sm
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-lg file:border-0
                        file:bg-indigo-100 file:text-indigo-700
                        hover:file:bg-indigo-200 transition"
                                />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="modal-action flex justify-end gap-3 pt-4 border-t border-gray-100">
                            <button
                                type="submit"
                                className="bg-indigo-600 hover:bg-indigo-700 text-white
                    px-6 py-2.5 rounded-xl text-sm font-medium shadow-sm transition"
                            >
                                Update
                            </button>

                            <form method="dialog">
                                <button
                                    type="submit"
                                    className="px-6 py-2.5 rounded-xl text-sm font-medium
                        bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
                                >
                                    Cancel
                                </button>
                            </form>
                        </div>
                    </form>
                </div>
            </dialog>



        </div>
    )
}

export default StaffList
