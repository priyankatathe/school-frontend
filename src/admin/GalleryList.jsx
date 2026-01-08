import React, { useEffect, useState } from 'react'
import {
    useDeleteGalleryMutation,
    useGetGalleryQuery,
    useUpdateGalleryMutation,
    useAddGalleryMutation
} from '../redux/api/galleryApi'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import * as yup from 'yup'
import clsx from 'clsx'

const GalleryList = () => {
    const { data } = useGetGalleryQuery()
    const [editItem, setEditItem] = useState(null)

    const [deleteGallery, { isError: isGalleryError, isSuccess: isSuccessGallery }] =
        useDeleteGalleryMutation()

    const [updateGallery, { isSuccess: isUpdateSuccess }] =
        useUpdateGalleryMutation()

    const [addGallery, { isLoading, isSuccess: isAddSuccess }] =
        useAddGalleryMutation()

    /* ================= DELETE ================= */
    useEffect(() => {
        if (isSuccessGallery) toast.success("Gallery deleted successfully")
        if (isGalleryError) toast.error("Failed to delete gallery")
    }, [isSuccessGallery, isGalleryError])

    /* ================= UPDATE ================= */
    useEffect(() => {
        if (isUpdateSuccess) {
            toast.success("Gallery updated successfully")
            document.getElementById('gallery_modal')?.close()
        }
    }, [isUpdateSuccess])

    /* ================= ADD ================= */
    useEffect(() => {
        if (isAddSuccess) {
            toast.success("Gallery added successfully")
            addFormik.resetForm()
            document.getElementById('add_gallery_modal')?.close()
        }
    }, [isAddSuccess])

    /* ================= UPDATE FORM ================= */
    const updateFormik = useFormik({
        enableReinitialize: true,
        initialValues: { image: null },
        validationSchema: yup.object({
            image: yup.mixed().required("Please select an image")
        }),
        onSubmit: (values, { resetForm }) => {
            const fd = new FormData()
            fd.append('image', values.image)
            updateGallery({ id: editItem._id, userData: fd })
            resetForm()
        }
    })

    /* ================= ADD FORM (SAME AS AddGalleryForm) ================= */
    const addFormik = useFormik({
        initialValues: { image: null },
        validationSchema: yup.object({
            image: yup.mixed().required('Please select an image')
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                const fd = new FormData()
                fd.append('image', values.image)
                await addGallery(fd).unwrap()
                resetForm()
            } catch (error) {
                toast.error(error?.data?.message || 'Failed to upload image')
            }
        }
    })

    const handleClass = (formik, field) =>
        clsx('input w-full border rounded-xl px-3 py-2', {
            'border-red-500': formik.touched[field] && formik.errors[field],
            'border-green-500': formik.touched[field] && !formik.errors[field]
        })

    return (
        <div className='p-5 mt-5'>

            {/* ADD BUTTON */}
            <div className="flex justify-end mb-6">
                <button
                    onClick={() => document.getElementById('add_gallery_modal')?.showModal()}
                    className="bg-green-600 text-white px-6 py-2 rounded-xl shadow hover:bg-green-700 transition"
                >
                    + Add Image
                </button>
            </div>

            {/* GALLERY GRID */}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {data?.length > 0 ? data.map(item => (
                    <div key={item._id} className='relative group overflow-hidden rounded-xl shadow-lg hover:scale-105 transition'>
                        <img src={item.image} className='w-full h-48 object-cover rounded-xl' />

                        <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center gap-3'>
                            <button
                                className='bg-white text-green-600 px-4 py-2 rounded-lg'
                                onClick={() => {
                                    setEditItem(item)
                                    document.getElementById('gallery_modal')?.showModal()
                                }}
                            >
                                Update
                            </button>
                            <button
                                className='bg-red-600 text-white px-4 py-2 rounded-lg'
                                onClick={() => deleteGallery(item._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                )) : (
                    <div className='col-span-full text-center text-gray-500 p-10'>
                        No gallery images found
                    </div>
                )}
            </div>

            {/* ================= ADD GALLERY MODAL ================= */}
            <dialog id="add_gallery_modal" className="modal modal-middle">
                <div className="modal-box bg-white rounded-3xl shadow-2xl p-8 max-w-lg">

                    <h2 className="text-3xl font-extrabold text-center text-green-600 mb-6">
                        Add Image to Gallery
                    </h2>

                    <form onSubmit={addFormik.handleSubmit} className="space-y-6">
                        <div className="flex flex-col items-center">
                            <label className="mb-2 font-medium text-gray-700 text-lg">
                                Select Image
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                className={handleClass(addFormik, 'image')}
                                onChange={(e) =>
                                    addFormik.setFieldValue('image', e.currentTarget.files[0])
                                }
                            />
                            {addFormik.touched.image && addFormik.errors.image && (
                                <p className="text-red-500 text-sm mt-2">
                                    {addFormik.errors.image}
                                </p>
                            )}
                        </div>

                        <div className="modal-action">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-green-500 text-white py-3 rounded-2xl shadow-lg hover:bg-green-600 transition font-semibold text-lg"
                            >
                                {isLoading ? 'Uploading...' : 'Add Image'}
                            </button>
                            <form method="dialog">
                                <button className="w-full mt-2 bg-gray-300 py-2 rounded-xl">
                                    Close
                                </button>
                            </form>
                        </div>
                    </form>
                </div>
            </dialog>

            {/* ================= UPDATE MODAL ================= */}
            <dialog id='gallery_modal' className='modal modal-middle'>
                <div className='modal-box bg-white rounded-2xl shadow-2xl p-6 max-w-lg'>
                    <h3 className='text-2xl font-bold text-center mb-4'>
                        Update Gallery Image
                    </h3>

                    {editItem?.image && (
                        <img
                            src={editItem.image}
                            className="w-full max-h-60 object-cover rounded-xl mb-4"
                        />
                    )}

                    <form onSubmit={updateFormik.handleSubmit} className='space-y-4'>
                        <input
                            type="file"
                            className={handleClass(updateFormik, 'image')}
                            onChange={(e) =>
                                updateFormik.setFieldValue('image', e.currentTarget.files[0])
                            }
                        />

                        <div className="modal-action">
                            <button className="bg-green-500 text-white px-6 py-2 rounded-xl">
                                Update
                            </button>
                            <form method="dialog">
                                <button className="bg-gray-300 px-6 py-2 rounded-xl">
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

export default GalleryList
