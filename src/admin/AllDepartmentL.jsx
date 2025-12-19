import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { useDeleteDepartmentMutation, useGetDepartmentQuery, useUpdateDepartmentMutation } from '../redux/api/departmentApi'
import clsx from 'clsx'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const AllDepartmentL = () => {
    const navigate = useNavigate()
    const { data } = useGetDepartmentQuery()
    const [deleteDepartment, { isError: isDepError, isSuccess: isSuccessDep }] = useDeleteDepartmentMutation()
    const [updateDepartment, { isError, isSuccess }] = useUpdateDepartmentMutation()

    const [editItem, setEditItem] = useState(null)

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: editItem?.name || "",
            image: "",
            head: editItem?.head || "",
            desc: editItem?.desc || "",
            category: editItem?.category || "",
        },
        validationSchema: yup.object({
            name: yup.string().required("Enter name"),
            image: yup.mixed().notRequired(),
            head: yup.string().required("Enter head"),
            desc: yup.string().required("Enter desc"),
            category: yup.string().required("Enter category"),
        }),
        onSubmit: (values, { resetForm }) => {
            const fd = new FormData();
            Object.entries(values).forEach(([key, value]) => {
                fd.append(key, value);
            });

            updateDepartment({
                id: editItem._id,
                userData: fd
            })

            resetForm()
            document.getElementById('my_modal_5').close();
        }
    })

    useEffect(() => {
        if (isSuccess) {
            toast.success("Department updated successfully")
            navigate("/admin/department-list")
        }
    }, [isSuccess])

    useEffect(() => {
        if (isSuccessDep) toast.success("Department deleted successfully")
        if (isDepError) toast.error("Failed to delete department")
    }, [isSuccessDep, isDepError])

    const handleClass = (arg) => clsx({
        "input w-full border rounded-lg px-3 py-2": true,
        "border-red-500": formik.touched[arg] && formik.errors[arg],
        "border-green-500": formik.touched[arg] && !formik.errors[arg]
    })

    return (
        <div className='p-5 mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {data && data.map((item) => (
                <div key={item._id} className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition">
                    <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-40 object-cover"
                    />
                    <div className="p-4 flex flex-col gap-2">
                        <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                        <p className="text-gray-600 text-sm"><span className="font-medium">Head:</span> {item.head}</p>
                        <p className="text-gray-600 text-sm"><span className="font-medium">Category:</span> {item.category}</p>
                        <p className="text-gray-600 text-sm truncate">{item.desc}</p>

                        <div className="flex gap-2 mt-4">
                            <button
                                className="flex-1 bg-green-500 text-white py-2 rounded-lg shadow hover:bg-green-600 transition"
                                onClick={() => {
                                    setEditItem(item)
                                    document.getElementById('my_modal_5').showModal()
                                }}
                            >
                                Edit
                            </button>
                            <button
                                className="flex-1 bg-red-500 text-white py-2 rounded-lg shadow hover:bg-red-600 transition"
                                onClick={() => deleteDepartment(item._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            ))}

            {/* Modal */}
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
                    <h3 className="font-bold text-lg mb-4 text-gray-800">Edit Department</h3>
                    <form onSubmit={formik.handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700">Name</label>
                            <input type="text" name="name" className={handleClass("name")} {...formik.getFieldProps("name")} />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700">Head</label>
                            <input type="text" name="head" className={handleClass("head")} {...formik.getFieldProps("head")} />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700">Description</label>
                            <textarea name="desc" className={handleClass("desc")} {...formik.getFieldProps("desc")} />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700">Category</label>
                            <input type="text" name="category" className={handleClass("category")} {...formik.getFieldProps("category")} />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700">Image</label>
                            <input type="file" name="image" className={handleClass("image")} onChange={(e) => formik.setFieldValue("image", e.currentTarget.files[0])} />
                        </div>

                        <div className="modal-action flex flex-col md:flex-row gap-3 mt-4">
                            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition">Update</button>
                            <form method="dialog">
                                <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg shadow hover:bg-gray-400 transition">Close</button>
                            </form>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    )
}

export default AllDepartmentL
