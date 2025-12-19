import React, { useEffect, useState } from 'react'
import { useDeleteGalleryMutation, useGetGalleryQuery, useUpdateGalleryMutation } from '../redux/api/galleryApi'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import * as yup from 'yup'
import clsx from 'clsx'

const GalleryList = () => {
    const { data } = useGetGalleryQuery()
    const [editItem, setEditItem] = useState(null)

    const [deleteGallery, { isError: isGalleryError, isSuccess: isSuccessGallery }] = useDeleteGalleryMutation()
    const [updateGallery, { isSuccess: isUpdateSuccess }] = useUpdateGalleryMutation()

    useEffect(() => {
        if (isSuccessGallery) toast.success("Gallery deleted successfully")
        if (isGalleryError) toast.error("Failed to delete gallery")
    }, [isSuccessGallery, isGalleryError])

    useEffect(() => {
        if (isUpdateSuccess) {
            toast.success("Gallery updated successfully")
            document.getElementById('gallery_modal')?.close()
        }
    }, [isUpdateSuccess])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: { image: '' },
        validationSchema: yup.object({ image: yup.mixed().required("Please select an image") }),
        onSubmit: (values, { resetForm }) => {
            const fd = new FormData()
            fd.append('image', values.image)
            updateGallery({ id: editItem._id, userData: fd })
            resetForm()
        }
    })

    const handleClass = (arg) =>
        clsx("input input-bordered w-full", {
            "input-error": formik.touched[arg] && formik.errors[arg],
            "input-success": formik.touched[arg] && !formik.errors[arg]
        })

    return (
        <div className='p-5  mt-5'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {data?.length > 0 ? data.map(item => (
                    <div key={item._id} className='relative group overflow-hidden rounded-xl shadow-lg cursor-pointer transform transition duration-300 hover:scale-105'>
                        <img src={item.image} alt="gallery" className='w-full h-48 object-cover rounded-xl' />

                        {/* Overlay actions on hover */}
                        <div className='absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center gap-2 transition-opacity'>
                            <button
                                className='bg-white text-green-600 font-semibold px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition'
                                onClick={() => {
                                    setEditItem(item)
                                    document.getElementById('gallery_modal')?.showModal()
                                }}
                            >
                                Update
                            </button>
                            <button
                                className='bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition'
                                onClick={() => deleteGallery(item._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                )) : (
                    <div className='col-span-full text-center text-gray-500 p-10'>No gallery images found</div>
                )}
            </div>

            {/* Modal for Update */}
            <dialog id='gallery_modal' className='modal modal-bottom sm:modal-middle'>
                <div className='modal-box bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg relative'>
                    {/* Header */}
                    <h3 className='font-bold text-2xl mb-5 text-gray-900 text-center'>Update Gallery Image</h3>

                    {/* Current Image Preview */}
                    {editItem?.image && (
                        <div className='w-full max-h-60 mx-auto overflow-hidden rounded-2xl border border-gray-200 shadow-sm mb-5'>
                            <img
                                src={editItem.image}
                                alt="preview"
                                className='w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105'
                            />
                        </div>

                    )}

                    {/* Form */}
                    <form onSubmit={formik.handleSubmit} className='space-y-5'>
                        <div>
                            <label className='block text-sm font-medium mb-2 text-gray-700'>Select New Image</label>
                            <input
                                type="file"
                                name="image"
                                className={handleClass("image")}
                                onChange={(e) => formik.setFieldValue("image", e.currentTarget.files[0])}
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className='flex flex-col md:flex-row gap-3 mt-6 justify-center'>
                            <button
                                type='submit'
                                className='flex-1 bg-green-500 text-white px-6 py-2 rounded-xl shadow-lg hover:bg-green-600 transition duration-300 font-semibold text-center'
                            >
                                Update
                            </button>
                            <form method='dialog' className='flex-1'>
                                <button
                                    className='w-full bg-gray-300 text-gray-800 px-6 py-2 rounded-xl shadow hover:bg-gray-400 transition duration-300 font-semibold'
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

export default GalleryList
