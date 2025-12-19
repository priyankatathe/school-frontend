import React, { useState } from 'react';
import { useGetStudentQuery, useUpdateStudentMutation, useDeleteStudentMutation } from '../redux/api/studentApi';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import clsx from 'clsx';

const StudentList = () => {
    const { data } = useGetStudentQuery();
    const [updateStudent] = useUpdateStudentMutation();
    const [deleteStudent] = useDeleteStudentMutation();
    const [editItem, setEditItem] = useState(null);

    // Formik setup
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            firstname: editItem?.firstname || '',
            lastname: editItem?.lastname || '',
            gender: editItem?.gender || '',
            dob: editItem?.dob || '',
            email: editItem?.email || '',
            phone: editItem?.phone || '',
            address: editItem?.address || '',
            city: editItem?.city || '',
            state: editItem?.state || '',
            pincode: editItem?.pincode || '',
            status: editItem?.status || '',
            image: null, // Always null initially
        },
        validationSchema: yup.object({
            firstname: yup.string().required('First name is required'),
            lastname: yup.string().required('Last name is required'),
            gender: yup.string().required('Gender is required'),
            dob: yup.string().required('DOB is required'),
            email: yup.string().email().required('Email is required'),
            phone: yup.string().required('Phone is required'),
            address: yup.string().required('Address is required'),
            city: yup.string().required('City is required'),
            state: yup.string().required('State is required'),
            pincode: yup.string().required('Pincode is required'),
            status: yup.string().required('Status is required'),
            image: yup.mixed().nullable(), // Image optional
        }),
        onSubmit: (values, { resetForm }) => {
            const fd = new FormData();
            fd.append('firstname', values.firstname);
            fd.append('lastname', values.lastname);
            fd.append('gender', values.gender);
            fd.append('dob', values.dob);
            fd.append('email', values.email);
            fd.append('phone', values.phone);
            fd.append('address', values.address);
            fd.append('city', values.city);
            fd.append('state', values.state);
            fd.append('pincode', values.pincode);
            fd.append('status', values.status);

            // Append image only if new file is selected
            if (values.image) fd.append('photo', values.image);

            updateStudent({ id: editItem._id, userData: fd })
                .unwrap()
                .then(() => {
                    toast.success('Student updated successfully');
                    resetForm();
                    setEditItem(null);
                    document.getElementById('student_modal')?.close();
                })
                .catch((err) => {
                    toast.error('Update failed');
                    console.error(err);
                });
        },
    });

    const handleClass = (field) =>
        clsx('input', {
            'input-error': formik.touched[field] && formik.errors[field],
            'input-success': formik.touched[field] && !formik.errors[field],
        });

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            deleteStudent(id)
                .unwrap()
                .then(() => toast.success('Student deleted successfully'))
                .catch((err) => {
                    toast.error('Delete failed');
                    console.error(err);
                });
        }
    };

    return (
        <div className="md:ml-[80px] mt-5 p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.map((item) => (
                <div
                    key={item._id}
                    className="bg-gradient-to-br from-white via-green-50 to-green-100 rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:scale-105 transform transition duration-300"
                >
                    {/* Image */}
                    <div className="w-full mb-4 overflow-hidden rounded-t-2xl">
                        <img
                            src={item.image}
                            alt={item.firstname}
                            className="w-full h-48 object-cover hover:scale-105 transform transition duration-300"
                        />
                    </div>

                    {/* Info */}
                    <div className="space-y-2 text-gray-700">
                        <p><span className="font-semibold">Name:</span> {item.firstname} {item.lastname}</p>
                        <p><span className="font-semibold">Gender:</span> {item.gender}</p>
                        <p><span className="font-semibold">DOB:</span> {item.dob}</p>
                        <p><span className="font-semibold">Email:</span> {item.email}</p>
                        <p><span className="font-semibold">Phone:</span> {item.phone}</p>
                        <p><span className="font-semibold">Address:</span> {item.address}, {item.city}, {item.state} - {item.pincode}</p>
                        <p>
                            <span className="font-semibold">Status:</span>
                            <span className={clsx(
                                'ml-2 px-3 py-1 rounded-full text-black text-sm font-medium',
                                {
                                    'bg-green-500': item.status === 'Active',
                                    'bg-red-500': item.status === 'Inactive',
                                    'bg-yellow-500': item.status === 'Pending',
                                }
                            )}>{item.status || 'N/A'}</span>
                        </p>

                    </div>

                    {/* Buttons */}
                    <div className="flex justify-between mt-4">
                        <button
                            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-xl shadow-md hover:shadow-lg transition duration-300 font-medium"
                            onClick={() => setEditItem(item) || document.getElementById('student_modal')?.showModal()}
                        >
                            Edit
                        </button>
                        <button
                            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl shadow-md hover:shadow-lg transition duration-300 font-medium"
                            onClick={() => handleDelete(item._id)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}

            {/* Edit Modal */}
            <dialog id="student_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box max-h-[90vh] overflow-y-auto p-6 sm:p-8 rounded-2xl shadow-2xl bg-white">
                    <h3 className="font-bold text-2xl text-center text-green-600 mb-6">Edit Student</h3>
                    <form onSubmit={formik.handleSubmit} className="space-y-5">
                        {/* First & Last Name */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">First Name</label>
                                <input
                                    type="text"
                                    name="firstname"
                                    className={clsx(handleClass('firstname'), 'w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-green-400 transition')}
                                    {...formik.getFieldProps('firstname')}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Last Name</label>
                                <input
                                    type="text"
                                    name="lastname"
                                    className={clsx(handleClass('lastname'), 'w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-green-400 transition')}
                                    {...formik.getFieldProps('lastname')}
                                />
                            </div>
                        </div>

                        {/* Gender & Status */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Gender</label>
                                <select
                                    name="gender"
                                    className={clsx(handleClass('gender'), 'w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-green-400 transition')}
                                    {...formik.getFieldProps('gender')}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Status</label>
                                <select
                                    name="status"
                                    className={clsx(handleClass('status'), 'w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-green-400 transition')}
                                    {...formik.getFieldProps('status')}
                                >
                                    <option value="">Select Status</option>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                    <option value="Pending">Pending</option>
                                </select>
                            </div>
                        </div>

                        {/* DOB, Email, Phone */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Date of Birth</label>
                                <input
                                    type="date"
                                    name="dob"
                                    className={clsx(handleClass('dob'), 'w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-green-400 transition')}
                                    {...formik.getFieldProps('dob')}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className={clsx(handleClass('email'), 'w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-green-400 transition')}
                                    {...formik.getFieldProps('email')}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Phone</label>
                                <input
                                    type="text"
                                    name="phone"
                                    className={clsx(handleClass('phone'), 'w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-green-400 transition')}
                                    {...formik.getFieldProps('phone')}
                                />
                            </div>
                        </div>

                        {/* Address */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Address</label>
                            <input
                                type="text"
                                name="address"
                                className={clsx(handleClass('address'), 'w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-green-400 transition')}
                                {...formik.getFieldProps('address')}
                            />
                        </div>

                        {/* City, State, Pincode */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    className={clsx(handleClass('city'), 'w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-green-400 transition')}
                                    {...formik.getFieldProps('city')}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">State</label>
                                <input
                                    type="text"
                                    name="state"
                                    className={clsx(handleClass('state'), 'w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-green-400 transition')}
                                    {...formik.getFieldProps('state')}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Pincode</label>
                                <input
                                    type="text"
                                    name="pincode"
                                    className={clsx(handleClass('pincode'), 'w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-green-400 transition')}
                                    {...formik.getFieldProps('pincode')}
                                />
                            </div>
                        </div>

                        {/* Image */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Upload Image</label>
                            {editItem?.image && !formik.values.image && (
                                <img src={editItem.image} alt="Existing" className="mb-2 w-32 h-32 object-cover rounded-lg" />
                            )}
                            <input
                                type="file"
                                name="photo"
                                onChange={(e) => formik.setFieldValue('image', e.currentTarget.files[0])}
                            />
                        </div>

                        {/* Actions */}
                        <div className="modal-action flex justify-between mt-4">
                            <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg shadow-md transition">
                                Update
                            </button>
                            <form method="dialog">
                                <button className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg shadow-md transition">
                                    Close
                                </button>
                            </form>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default StudentList;
