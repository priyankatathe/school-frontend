
import React, { useState, useEffect } from 'react';
import { useGetStudentQuery, useUpdateStudentMutation, useDeleteStudentMutation, useAddStudentMutation } from '../redux/api/studentApi';
import { User, Mail, Phone, MapPin, Calendar, Trash2, Edit3 } from 'lucide-react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

const StudentList = () => {
    const navigate = useNavigate();

    // Fetch Students
    const { data: students } = useGetStudentQuery();
    const [updateStudent] = useUpdateStudentMutation();
    const [deleteStudent] = useDeleteStudentMutation();
    const [addStudent, { isSuccess: addSuccess }] = useAddStudentMutation();

    // Local state
    const [editItem, setEditItem] = useState(null);
    const [preview, setPreview] = useState(null);

    // Navigate after adding
    useEffect(() => {
        if (addSuccess) {
            toast.success('Student added successfully');
            document.getElementById('add_student_modal')?.close();
            navigate('/cleark/student-list');
        }
    }, [addSuccess]);

    // Utility: Input classes
    const handleClass = (field, formik) =>
        clsx(
            'w-full px-4 pt-5 pb-2 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200',
            {
                'border-red-400 focus:ring-red-400': formik.touched[field] && formik.errors[field],
                'border-green-400 focus:ring-green-400': formik.touched[field] && !formik.errors[field],
                'border-gray-300 focus:ring-blue-400': !formik.touched[field],
            }
        );

    // Preview image
    const handleImagePreview = (e, formik) => {
        const file = e.currentTarget.files[0];
        formik.setFieldValue('image', file);
        if (file) setPreview(URL.createObjectURL(file));
    };

    // Delete student
    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            deleteStudent(id)
                .unwrap()
                .then(() => toast.success('Student deleted successfully'))
                .catch(() => toast.error('Delete failed'));
        }
    };

    // --- Formik for Add Student ---
    const addFormik = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            gender: '',
            dob: '',
            email: '',
            phone: '',
            address: '',
            city: '',
            state: '',
            pincode: '',
            status: '',
            image: null,
        },
        validationSchema: yup.object({
            firstname: yup.string().required('First name required'),
            lastname: yup.string().required('Last name required'),
            gender: yup.string().required('Gender required'),
            dob: yup.string().required('DOB required'),
            email: yup.string().email().required('Email required'),
            phone: yup.string().required('Phone required'),
            address: yup.string().required('Address required'),
            city: yup.string().required('City required'),
            state: yup.string().required('State required'),
            pincode: yup.string().required('Pincode required'),
            status: yup.string().required('Status required'),
            image: yup.mixed().required('Upload an image'),
        }),
        onSubmit: (values, { resetForm }) => {
            const fd = new FormData();
            Object.entries(values).forEach(([key, value]) => fd.append(key, value));
            addStudent(fd);
            resetForm();
            setPreview(null);
        },
    });

    // --- Formik for Edit Student ---
    const editFormik = useFormik({
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
            image: null,
        },
        validationSchema: yup.object({
            firstname: yup.string().required('First name required'),
            lastname: yup.string().required('Last name required'),
            gender: yup.string().required('Gender required'),
            dob: yup.string().required('DOB required'),
            email: yup.string().email().required('Email required'),
            phone: yup.string().required('Phone required'),
            address: yup.string().required('Address required'),
            city: yup.string().required('City required'),
            state: yup.string().required('State required'),
            pincode: yup.string().required('Pincode required'),
            status: yup.string().required('Status required'),
            image: yup.mixed().nullable(),
        }),
        onSubmit: (values, { resetForm }) => {
            const fd = new FormData();
            Object.entries(values).forEach(([key, value]) => {
                if (key === 'image' && !value) return; // skip image if not updated
                fd.append(key, value);
            });
            updateStudent({ id: editItem._id, userData: fd })
                .unwrap()
                .then(() => {
                    toast.success('Student updated successfully');
                    resetForm();
                    setEditItem(null);
                    document.getElementById('student_modal')?.close();
                })
                .catch(() => toast.error('Update failed'));
        },
    });

    return (
        <div className="p-4 md:ml-[80px]">
            {/* Add Student Button */}
            <div className="flex justify-end">
                <button
                    onClick={() => document.getElementById('add_student_modal')?.showModal()}
                    className="mb-6 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:from-green-600 hover:to-emerald-700 transform  transition-all duration-300"
                >
                    Add Student
                </button>

            </div>

            {/* Students Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {students?.map((item) => (
                    <div key={item._id} className="group bg-white border rounded-3xl shadow-sm flex flex-col overflow-hidden hover:shadow-xl transition">
                        <div className="relative h-44 overflow-hidden">
                            <img src={item.image} alt={item.firstname} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                            <span
                                className={clsx(
                                    'absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-sm',
                                    {
                                        'bg-green-100 text-green-700 border border-green-200': item.status === 'Active',
                                        'bg-red-100 text-red-700 border border-red-200': item.status === 'Inactive',
                                        'bg-amber-100 text-amber-700 border border-amber-200': item.status === 'Pending',
                                    }
                                )}
                            >
                                {item.status}
                            </span>
                        </div>

                        <div className="p-5 flex-grow">
                            <h3 className="text-xl font-bold mb-4">{item.firstname} {item.lastname}</h3>
                            <div className="space-y-2 text-sm text-gray-600">
                                <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-green-600" /> {item.email}</div>
                                <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-green-600" /> {item.phone}</div>
                                <div className="flex items-start gap-2"><MapPin className="w-4 h-4 text-green-600 mt-0.5" /> {item.address}, {item.city}, {item.state} - {item.pincode}</div>
                                <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-green-600" /> {item.dob} • {item.gender}</div>
                            </div>
                        </div>

                        <div className="p-4 bg-gray-50 border-t flex gap-3">
                            <button
                                className="flex-1 btn btn-outline text-green-600 hover:text-white hover:bg-green-500"
                                onClick={() => { setEditItem(item); document.getElementById('student_modal')?.showModal(); }}
                            >
                                <Edit3 className="w-4 h-4" /> Edit
                            </button>
                            <button
                                className="flex-1 btn btn-outline btn-error text-red-600 hover:text-white hover:bg-red-500"
                                onClick={() => handleDelete(item._id)}
                            >
                                <Trash2 className="w-4 h-4" /> Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Edit Student Modal */}
            <dialog id="student_modal" className="modal modal-bottom sm:modal-middle backdrop-blur-sm">
                <div className="modal-box max-w-2xl p-0 rounded-3xl overflow-y-auto scrollbar-hide overflow-hidden bg-white shadow-2xl">
                    {/* Modal Header */}
                    <div className="bg-green-600 p-6 text-white flex justify-between items-center">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                            <Edit3 className="w-5 h-5" /> Edit Student Profile
                        </h3>
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost hover:bg-white/20 transition-colors">✕</button>
                        </form>
                    </div>

                    {/* Form Body */}
                    <form onSubmit={editFormik.handleSubmit} className="p-6 sm:p-8 space-y-6">

                        {/* Row 1: Names */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="form-control">
                                <label className="label-text font-semibold mb-1.5 ml-1">First Name</label>
                                <input
                                    type="text"
                                    {...editFormik.getFieldProps('firstname')}
                                    className={clsx(handleClass('firstname', editFormik), 'focus:ring-2 focus:ring-green-400')}
                                    placeholder="John"
                                />
                                {editFormik.touched.firstname && editFormik.errors.firstname && (
                                    <p className="text-red-500 text-sm mt-1">{editFormik.errors.firstname}</p>
                                )}
                            </div>
                            <div className="form-control">
                                <label className="label-text font-semibold mb-1.5 ml-1">Last Name</label>
                                <input
                                    type="text"
                                    {...editFormik.getFieldProps('lastname')}
                                    className={clsx(handleClass('lastname', editFormik), 'focus:ring-2 focus:ring-green-400')}
                                    placeholder="Doe"
                                />
                                {editFormik.touched.lastname && editFormik.errors.lastname && (
                                    <p className="text-red-500 text-sm mt-1">{editFormik.errors.lastname}</p>
                                )}
                            </div>
                        </div>

                        {/* Row 2: Gender, Status, DOB */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                            <div className="form-control">
                                <label className="label-text font-semibold mb-1.5 ml-1">Gender</label>
                                <select {...editFormik.getFieldProps('gender')} className={clsx(handleClass('gender', editFormik), 'focus:ring-2 focus:ring-green-400')}>
                                    <option value="">Select</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                                {editFormik.touched.gender && editFormik.errors.gender && (
                                    <p className="text-red-500 text-sm mt-1">{editFormik.errors.gender}</p>
                                )}
                            </div>
                            <div className="form-control">
                                <label className="label-text font-semibold mb-1.5 ml-1">Status</label>
                                <select {...editFormik.getFieldProps('status')} className={clsx(handleClass('status', editFormik), 'focus:ring-2 focus:ring-green-400')}>
                                    <option value="">Select</option>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                    <option value="Pending">Pending</option>
                                </select>
                                {editFormik.touched.status && editFormik.errors.status && (
                                    <p className="text-red-500 text-sm mt-1">{editFormik.errors.status}</p>
                                )}
                            </div>
                            <div className="form-control">
                                <label className="label-text font-semibold mb-1.5 ml-1">DOB</label>
                                <input type="date" {...editFormik.getFieldProps('dob')} className={clsx(handleClass('dob', editFormik), 'focus:ring-2 focus:ring-green-400')} />
                                {editFormik.touched.dob && editFormik.errors.dob && (
                                    <p className="text-red-500 text-sm mt-1">{editFormik.errors.dob}</p>
                                )}
                            </div>
                        </div>

                        {/* Row 3: Contact */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="form-control">
                                <label className="label-text font-semibold mb-1.5 ml-1">Email Address</label>
                                <input type="email" {...editFormik.getFieldProps('email')} className={clsx(handleClass('email', editFormik), 'focus:ring-2 focus:ring-green-400')} placeholder="email@example.com" />
                                {editFormik.touched.email && editFormik.errors.email && (
                                    <p className="text-red-500 text-sm mt-1">{editFormik.errors.email}</p>
                                )}
                            </div>
                            <div className="form-control">
                                <label className="label-text font-semibold mb-1.5 ml-1">Phone Number</label>
                                <input type="text" {...editFormik.getFieldProps('phone')} className={clsx(handleClass('phone', editFormik), 'focus:ring-2 focus:ring-green-400')} placeholder="+91..." />
                                {editFormik.touched.phone && editFormik.errors.phone && (
                                    <p className="text-red-500 text-sm mt-1">{editFormik.errors.phone}</p>
                                )}
                            </div>
                        </div>

                        {/* Row 4: Address */}
                        <div className="form-control">
                            <label className="label-text font-semibold mb-1.5 ml-1">Street Address</label>
                            <input type="text" {...editFormik.getFieldProps('address')} className={clsx(handleClass('address', editFormik), 'focus:ring-2 focus:ring-green-400')} placeholder="123 Street Name" />
                            {editFormik.touched.address && editFormik.errors.address && (
                                <p className="text-red-500 text-sm mt-1">{editFormik.errors.address}</p>
                            )}
                        </div>

                        {/* Row 5: Location Details */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                            <div className="form-control">
                                <label className="label-text font-semibold mb-1.5 ml-1">City</label>
                                <input type="text" {...editFormik.getFieldProps('city')} className={clsx(handleClass('city', editFormik), 'focus:ring-2 focus:ring-green-400')} />
                                {editFormik.touched.city && editFormik.errors.city && (
                                    <p className="text-red-500 text-sm mt-1">{editFormik.errors.city}</p>
                                )}
                            </div>
                            <div className="form-control">
                                <label className="label-text font-semibold mb-1.5 ml-1">State</label>
                                <input type="text" {...editFormik.getFieldProps('state')} className={clsx(handleClass('state', editFormik), 'focus:ring-2 focus:ring-green-400')} />
                                {editFormik.touched.state && editFormik.errors.state && (
                                    <p className="text-red-500 text-sm mt-1">{editFormik.errors.state}</p>
                                )}
                            </div>
                            <div className="form-control">
                                <label className="label-text font-semibold mb-1.5 ml-1">Pincode</label>
                                <input type="text" {...editFormik.getFieldProps('pincode')} className={clsx(handleClass('pincode', editFormik), 'focus:ring-2 focus:ring-green-400')} />
                                {editFormik.touched.pincode && editFormik.errors.pincode && (
                                    <p className="text-red-500 text-sm mt-1">{editFormik.errors.pincode}</p>
                                )}
                            </div>
                        </div>

                        {/* Row 6: Profile Image */}
                        <div className="bg-gray-50 p-4 rounded-2xl border border-dashed border-gray-300">
                            <label className="label-text font-bold text-gray-500 uppercase text-[10px] tracking-widest block mb-3">Update Profile Picture</label>
                            <div className="flex items-center gap-4">
                                {editItem?.image && !editFormik.values.image && (
                                    <div className="avatar">
                                        <div className="w-16 h-16 rounded-xl ring ring-green-500 ring-offset-base-100 ring-offset-2">
                                            <img src={editItem.image} alt="Preview" />
                                        </div>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    className="file-input file-input-bordered file-input-success w-full bg-white"
                                    onChange={(e) => editFormik.setFieldValue('image', e.currentTarget.files[0])}
                                />
                            </div>
                            {editFormik.touched.image && editFormik.errors.image && (
                                <p className="text-red-500 text-sm mt-1">{editFormik.errors.image}</p>
                            )}
                        </div>

                        {/* Modal Footer Actions */}
                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                            <form method="dialog">
                                <button className="btn btn-ghost px-8 rounded-xl font-bold">Cancel</button>
                            </form>
                            <button
                                type="submit"
                                className="btn bg-green-600 hover:bg-green-700 text-white px-10 rounded-xl font-bold shadow-lg shadow-green-200"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>

            {/* Add Student Modal */}
            <dialog id="add_student_modal" className="modal modal-bottom sm:modal-middle backdrop-blur-sm">
                <div className="modal-box max-w-2xl p-0 rounded-3xl overflow-y-auto scrollbar-hide overflow-hidden">
                    <div className="bg-purple-700 p-6 text-white flex justify-between items-center">
                        <h3 className="text-xl font-bold">Add New Student</h3>
                        <form method="dialog"><button className="btn btn-sm btn-circle btn-ghost">✕</button></form>
                    </div>
                    <form onSubmit={addFormik.handleSubmit} className="p-6 sm:p-8 space-y-6">
                        {/* Name Fields */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="relative">
                                <input
                                    type="text"
                                    {...addFormik.getFieldProps("firstname")}
                                    className={handleClass("firstname", addFormik)}
                                    placeholder=" "
                                />
                                <label className="absolute top-1 left-4 text-gray-400 text-sm transition-all duration-200 pointer-events-none">
                                    First Name
                                </label>
                                {addFormik.touched.firstname && addFormik.errors.firstname && (
                                    <p className="text-red-500 text-sm mt-1">{addFormik.errors.firstname}</p>
                                )}
                            </div>

                            <div className="relative">
                                <input
                                    type="text"
                                    {...addFormik.getFieldProps("lastname")}
                                    className={handleClass("lastname", addFormik)}
                                    placeholder=" "
                                />
                                <label className="absolute top-1 left-4 text-gray-400 text-sm transition-all duration-200 pointer-events-none">
                                    Last Name
                                </label>
                                {addFormik.touched.lastname && addFormik.errors.lastname && (
                                    <p className="text-red-500 text-sm mt-1">{addFormik.errors.lastname}</p>
                                )}
                            </div>
                        </div>

                        {/* Image Upload */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                            <div className="relative">
                                <input
                                    type="file"
                                    name="image"
                                    onChange={(e) => handleImagePreview(e, addFormik)}
                                    className={handleClass("image", addFormik)}
                                />
                                <label className="absolute top-1 left-4 text-gray-400 text-sm">Upload Image</label>
                                {addFormik.touched.image && addFormik.errors.image && (
                                    <p className="text-red-500 text-sm mt-1">{addFormik.errors.image}</p>
                                )}
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
                                            checked={addFormik.values.gender === "female"}
                                            onChange={addFormik.handleChange}
                                            className="accent-pink-500"
                                        />
                                        Female
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="male"
                                            checked={addFormik.values.gender === "male"}
                                            onChange={addFormik.handleChange}
                                            className="accent-blue-500"
                                        />
                                        Male
                                    </label>
                                </div>
                                {addFormik.touched.gender && addFormik.errors.gender && (
                                    <p className="text-red-500 text-sm mt-1">{addFormik.errors.gender}</p>
                                )}
                            </div>

                            <div className="relative">
                                <input
                                    type="date"
                                    {...addFormik.getFieldProps("dob")}
                                    className={handleClass("dob", addFormik)}
                                    placeholder=" "
                                />
                                <label className="absolute top-1 left-4 text-gray-400 text-sm">Date of Birth</label>
                                {addFormik.touched.dob && addFormik.errors.dob && (
                                    <p className="text-red-500 text-sm mt-1">{addFormik.errors.dob}</p>
                                )}
                            </div>
                        </div>

                        {/* Email & Phone */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="relative">
                                <input
                                    type="email"
                                    {...addFormik.getFieldProps("email")}
                                    className={handleClass("email", addFormik)}
                                    placeholder=" "
                                />
                                <label className="absolute top-1 left-4 text-gray-400 text-sm">Email</label>
                                {addFormik.touched.email && addFormik.errors.email && (
                                    <p className="text-red-500 text-sm mt-1">{addFormik.errors.email}</p>
                                )}
                            </div>

                            <div className="relative">
                                <input
                                    type="text"
                                    {...addFormik.getFieldProps("phone")}
                                    className={handleClass("phone", addFormik)}
                                    placeholder=" "
                                />
                                <label className="absolute top-1 left-4 text-gray-400 text-sm">Phone</label>
                                {addFormik.touched.phone && addFormik.errors.phone && (
                                    <p className="text-red-500 text-sm mt-1">{addFormik.errors.phone}</p>
                                )}
                            </div>
                        </div>

                        {/* Address */}
                        <div className="relative">
                            <input
                                type="text"
                                {...addFormik.getFieldProps("address")}
                                className={handleClass("address", addFormik)}
                                placeholder=" "
                            />
                            <label className="absolute top-1 left-4 text-gray-400 text-sm">Address</label>
                            {addFormik.touched.address && addFormik.errors.address && (
                                <p className="text-red-500 text-sm mt-1">{addFormik.errors.address}</p>
                            )}
                        </div>

                        {/* City, State, Pincode */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div className="relative">
                                <input
                                    type="text"
                                    {...addFormik.getFieldProps("city")}
                                    className={handleClass("city", addFormik)}
                                    placeholder=" "
                                />
                                <label className="absolute top-1 left-4 text-gray-400 text-sm">City</label>
                                {addFormik.touched.city && addFormik.errors.city && (
                                    <p className="text-red-500 text-sm mt-1">{addFormik.errors.city}</p>
                                )}
                            </div>
                            <div className="relative">
                                <input
                                    type="text"
                                    {...addFormik.getFieldProps("state")}
                                    className={handleClass("state", addFormik)}
                                    placeholder=" "
                                />
                                <label className="absolute top-1 left-4 text-gray-400 text-sm">State</label>
                                {addFormik.touched.state && addFormik.errors.state && (
                                    <p className="text-red-500 text-sm mt-1">{addFormik.errors.state}</p>
                                )}
                            </div>
                            <div className="relative">
                                <input
                                    type="text"
                                    {...addFormik.getFieldProps("pincode")}
                                    className={handleClass("pincode", addFormik)}
                                    placeholder=" "
                                />
                                <label className="absolute top-1 left-4 text-gray-400 text-sm">Pincode</label>
                                {addFormik.touched.pincode && addFormik.errors.pincode && (
                                    <p className="text-red-500 text-sm mt-1">{addFormik.errors.pincode}</p>
                                )}
                            </div>
                        </div>

                        {/* Status */}
                        <div className="relative">
                            <select
                                {...addFormik.getFieldProps("status")}
                                className={handleClass("status", addFormik)}
                            >
                                <option value="">Select Status</option>
                                <option value="reject">reject</option>
                                <option value="approved">approved</option>
                                <option value="pending">pending</option>
                            </select>
                            <label className="absolute top-1 left-4 text-gray-400 text-sm">Status</label>
                            {addFormik.touched.status && addFormik.errors.status && (
                                <p className="text-red-500 text-sm mt-1">{addFormik.errors.status}</p>
                            )}
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
            </dialog>
        </div>
    );
};

export default StudentList;