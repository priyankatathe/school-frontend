import React, { useEffect, useState } from 'react';
import { useDeleteStaffMutation, useGetUStaffQuery, useUpdateStaffMutation } from '../redux/api/staffApi';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as yup from 'yup';
import clsx from 'clsx';

const StaffList = () => {
    const { data } = useGetUStaffQuery();
    const [editItem, setEditItem] = useState(null);
    const [deletestaff, { isError: isstaffError, isSuccess: isSuccessstaff }] = useDeleteStaffMutation();
    const [updateStaff, { isSuccess: isUpdateSuccess, isError: isUpdateError, error }] = useUpdateStaffMutation();

    useEffect(() => {
        if (isSuccessstaff) toast.success("Staff deleted successfully");
        if (isstaffError) toast.error("Failed to delete staff");
    }, [isSuccessstaff, isstaffError]);

    useEffect(() => {
        if (isUpdateSuccess) {
            toast.success("Staff updated successfully");
            document.getElementById('staff_modal')?.close();
        }
        if (isUpdateError) {
            toast.error(error?.data?.message || "Failed to update staff");
        }
    }, [isUpdateSuccess, isUpdateError, error]);

    const formik = useFormik({
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
            const fd = new FormData();
            fd.append("name", values.name);
            fd.append("sub", values.sub);
            fd.append("expriance", values.expriance);

            // 👇 image optional है (backend में req.file check है)
            if (values.image) {
                fd.append("photo", values.image);
            }

            updateStaff({ id: editItem._id, userData: fd });
            resetForm();
        }

    });

    const handleClass = (arg) =>
        clsx("input input-bordered w-full", {
            "input-error": formik.touched[arg] && formik.errors[arg],
            "input-success": formik.touched[arg] && !formik.errors[arg]
        });

    return (
        <div className='p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {data && data.length > 0 ? data.map(item => (
                <div key={item._id} className='bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-400 rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300'>
                    <div className='h-48 w-full overflow-hidden'>
                        <img src={item.image} alt={item.name} className='w-full h-full object-cover hover:scale-105 transform transition duration-300' />
                    </div>
                    <div className='p-5 text-white space-y-1'>
                        <h3 className='text-xl font-bold'>{item.name}</h3>
                        <p className='text-sm opacity-90'>{item.sub}</p>
                        <p className='text-sm opacity-80'>Experience: {item.expriance} years</p>
                    </div>
                    <div className='flex justify-between p-5 border-t border-white/30'>
                        <button
                            className='bg-white text-indigo-600 font-semibold px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition'
                            onClick={() => { setEditItem(item); document.getElementById('staff_modal')?.showModal() }}
                        >
                            Update
                        </button>
                        <button
                            className='bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition'
                            onClick={() => deletestaff(item._id)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            )) : <div className='text-center p-10 text-gray-500 text-lg'>No staff found</div>}
            {/* Edit Modal */}
            <dialog id='staff_modal' className='modal modal-bottom sm:modal-middle'>
                <div className='modal-box w-full max-w-md p-6 rounded-3xl bg-white/90 backdrop-blur-md shadow-2xl'>
                    <h3 className='text-2xl font-extrabold text-center text-indigo-600 mb-6'>Edit Staff</h3>

                    {editItem?.image && (
                        <div className='flex justify-center mb-4'>
                            <img
                                src={editItem.image}
                                alt="current"
                                className="w-28 h-28 rounded-full border-4 border-indigo-300 shadow-lg object-cover"
                            />
                        </div>
                    )}

                    <form onSubmit={formik.handleSubmit} className='space-y-4'>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Name</label>
                            <input
                                type='text'
                                placeholder='Name'
                                className={handleClass('name') + ' w-full px-4 py-2 rounded-xl border focus:ring-2 focus:ring-indigo-400 transition'}
                                {...formik.getFieldProps('name')}
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Description</label>
                            <input
                                type='text'
                                placeholder='Description'
                                className={handleClass('sub') + ' w-full px-4 py-2 rounded-xl border focus:ring-2 focus:ring-indigo-400 transition'}
                                {...formik.getFieldProps('sub')}
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Experience</label>
                            <input
                                type='text'
                                placeholder='Experience'
                                className={handleClass('expriance') + ' w-full px-4 py-2 rounded-xl border focus:ring-2 focus:ring-indigo-400 transition'}
                                {...formik.getFieldProps('expriance')}
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
                                className='bg-indigo-600 text-white px-5 py-2 rounded-xl shadow-lg hover:bg-indigo-700 transition font-semibold'
                            >
                                Update
                            </button>
                            <form method='dialog'>
                                <button
                                    className='bg-gray-200 text-gray-800 px-5 py-2 rounded-xl shadow-lg hover:bg-gray-300 transition font-semibold'
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

export default StaffList;
