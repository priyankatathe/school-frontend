import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import clsx from 'clsx';
import { toast } from 'react-toastify';
import { useAddGalleryMutation } from '../redux/api/galleryApi';
import { useNavigate } from 'react-router-dom';

const AddGalleryForm = () => {
    const [addGallery, { isLoading, isSuccess }] = useAddGalleryMutation();
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            image: null
        },
        validationSchema: yup.object({
            image: yup.mixed().required('Please select an image')
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                const fd = new FormData();
                fd.append('image', values.image);
                await addGallery(fd).unwrap();
                // toast.success('Image added successfully!');
                resetForm();
            } catch (error) {
                toast.error(error?.data?.message || 'Failed to upload image');
            }
        }
    })
    useEffect(() => {
        if (isSuccess) {
            toast.success("gallery add successfully")
            navigate("/admin/gallery-list")
        }
    }, [isLoading])

    const handleClass = (field) =>
        clsx('input w-full border rounded-xl px-3 py-2', {
            'border-red-500': formik.touched[field] && formik.errors[field],
            'border-green-500': formik.touched[field] && !formik.errors[field]
        });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-green-100 p-4">
            <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8">
                <h2 className="text-3xl font-extrabold text-center text-green-600 mb-6">Add Image to Gallery</h2>

                <form onSubmit={formik.handleSubmit} className="space-y-6">
                    <div className="flex flex-col items-center">
                        <label className="mb-2 font-medium text-gray-700 text-lg">Select Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            className={handleClass('image') + ' cursor-pointer'}
                            onChange={(e) => formik.setFieldValue('image', e.currentTarget.files[0])}
                        />
                        {formik.touched.image && formik.errors.image && (
                            <p className="text-red-500 text-sm mt-2">{formik.errors.image}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-green-500 text-white py-3 rounded-2xl shadow-lg hover:bg-green-600 transition font-semibold text-lg"
                    >
                        {isLoading ? 'Uploading...' : 'Add Image'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddGalleryForm;
