// import React, { useState, useEffect } from 'react'

// import { useFormik } from 'formik'
// import clsx from 'clsx'
// import * as yup from 'yup'
// import { toast } from 'react-toastify'
// import { useFetchClearkQuery, useRegisterClearkMutation } from '../redux/api/authApi'

// const ClearkList = () => {
//     const { data } = useFetchClearkQuery()
//     const [registerCleark, { isSuccess: isRegSuccess, isError: isRegError, isLoading: isRegLoading, error: regError }] = useRegisterClearkMutation()
//     // const [deleteCleark, { isSuccess: isDelSuccess, isError: isDelError }] = useDeleteClearkMutation()
//     // const [updateCleark, { isSuccess: isUpdSuccess, isError: isUpdError, error: updError }] = useUpdateClearkMutation()

//     const [editItem, setEditItem] = useState(null)

//     // ---------------- HANDLE REGISTER FORM ----------------
//     const regFormik = useFormik({
//         initialValues: { name: '', email: '', mobile: '' },
//         validationSchema: yup.object({
//             name: yup.string().required('Enter name'),
//             email: yup.string().required('Enter email'),
//             mobile: yup.string().required('Enter mobile')
//         }),
//         onSubmit: (values, { resetForm }) => {
//             registerCleark(values)
//             resetForm()
//         }
//     })

//     // ---------------- HANDLE UPDATE FORM ----------------
//     const updFormik = useFormik({
//         enableReinitialize: true,
//         initialValues: {
//             name: editItem?.name || '',
//             email: editItem?.email || '',
//             mobile: editItem?.mobile || ''
//         },
//         validationSchema: yup.object({
//             name: yup.string().required('Enter name'),
//             email: yup.string().required('Enter email'),
//             mobile: yup.string().required('Enter mobile')
//         }),
//         onSubmit: (values) => {
//             updateCleark({ id: editItem._id, userData: values })
//         }
//     })

//     // ---------------- TOASTS ----------------
//     useEffect(() => {
//         if (isRegSuccess) toast.success("Cleark registered successfully")
//         if (isRegError) toast.error(regError?.data?.message || "Failed to register")
//         if (isDelSuccess) toast.success("Cleark deleted successfully")
//         if (isDelError) toast.error("Failed to delete")
//         if (isUpdSuccess) {
//             toast.success("Cleark updated successfully")
//             document.getElementById('cleark_update_modal')?.close()
//         }
//         if (isUpdError) toast.error(updError?.data?.message || "Failed to update")
//     }, [isRegSuccess, isRegError, isDelSuccess, isDelError, isUpdSuccess, isUpdError])

//     const handleClass = (formikObj, field) =>
//         clsx("w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors", {
//             "border-red-500": formikObj.touched[field] && formikObj.errors[field],
//             "border-green-500": formikObj.touched[field] && !formikObj.errors[field]
//         })

//     return (
//         <div className="p-6">

//             {/* REGISTER BUTTON */}
//             <div className="flex justify-end mb-6">
//                 <button
//                     onClick={() => document.getElementById("cleark_modal")?.showModal()}
//                     className="bg-blue-600 text-white px-6 py-2 rounded-xl shadow hover:bg-blue-700 transition"
//                 >
//                     + Register Cleark
//                 </button>
//             </div>

//             {/* ---------------- CLEARK LIST ---------------- */}
//             <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
//                 {data?.length > 0 ? data.map(item => (
//                     <div key={item._id} className='bg-white shadow-lg rounded-xl p-5 flex flex-col justify-between'>
//                         <div className='space-y-2'>
//                             <h3 className='text-lg font-bold'>{item.name}</h3>
//                             <p>{item.email}</p>
//                             <p>{item.mobile}</p>
//                         </div>
//                         <div className='flex justify-between mt-4'>
//                             <button
//                                 className='bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600'
//                                 onClick={() => {
//                                     setEditItem(item)
//                                     document.getElementById('cleark_update_modal')?.showModal()
//                                 }}
//                             >
//                                 Update
//                             </button>
//                             <button
//                                 className='bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600'
//                                 onClick={() => deleteCleark(item._id)}
//                             >
//                                 Delete
//                             </button>
//                         </div>
//                     </div>
//                 )) : <p className='col-span-full text-center text-gray-500'>No clearks found</p>}
//             </div>

//             {/* ---------------- REGISTER MODAL ---------------- */}
//             <dialog id="cleark_modal" className="modal modal-middle">
//                 <div className="modal-box bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
//                     <h2 className='text-2xl font-bold text-center mb-6'>Register Cleark</h2>
//                     <form onSubmit={regFormik.handleSubmit} className='space-y-4'>
//                         <input className={handleClass(regFormik,'name')} {...regFormik.getFieldProps('name')} placeholder="Name"/>
//                         <input className={handleClass(regFormik,'email')} {...regFormik.getFieldProps('email')} placeholder="Email"/>
//                         <input className={handleClass(regFormik,'mobile')} {...regFormik.getFieldProps('mobile')} placeholder="Mobile"/>
//                         <div className="modal-action flex flex-col gap-2">
//                             <button type='submit' className='bg-blue-500 text-white px-6 py-2 rounded-xl'>{isRegLoading ? "Registering..." : "Register"}</button>
//                             <form method="dialog"><button className='bg-gray-300 px-6 py-2 rounded-xl'>Close</button></form>
//                         </div>
//                     </form>
//                 </div>
//             </dialog>

//             {/* ---------------- UPDATE MODAL ---------------- */}
//             <dialog id="cleark_update_modal" className="modal modal-middle">
//                 <div className="modal-box bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
//                     <h2 className='text-2xl font-bold text-center mb-6'>Update Cleark</h2>
//                     <form onSubmit={updFormik.handleSubmit} className='space-y-4'>
//                         <input className={handleClass(updFormik,'name')} {...updFormik.getFieldProps('name')} placeholder="Name"/>
//                         <input className={handleClass(updFormik,'email')} {...updFormik.getFieldProps('email')} placeholder="Email"/>
//                         <input className={handleClass(updFormik,'mobile')} {...updFormik.getFieldProps('mobile')} placeholder="Mobile"/>
//                         <div className="modal-action flex flex-col gap-2">
//                             <button type='submit' className='bg-green-500 text-white px-6 py-2 rounded-xl'>Update</button>
//                             <form method="dialog"><button className='bg-gray-300 px-6 py-2 rounded-xl'>Close</button></form>
//                         </div>
//                     </form>
//                 </div>
//             </dialog>
//         </div>
//     )
// }

// export default ClearkList




















import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import clsx from 'clsx'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import { useFetchClearkQuery, useRegisterClearkMutation } from '../redux/api/authApi'

// ... (imports same rahenge)

const ClearkList = () => {
    const { data } = useFetchClearkQuery()
    const [registerCleark, { isLoading: isRegLoading }] = useRegisterClearkMutation()

    const regFormik = useFormik({
        initialValues: { name: '', email: '', mobile: '' },
        validationSchema: yup.object({
            name: yup.string().required('Enter name'),
            email: yup.string().email('Invalid email').required('Enter email'),
            mobile: yup.string().required('Enter mobile')
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                // Mutation call karein
                await registerCleark(values).unwrap();

                toast.success("Cleark registered successfully");
                resetForm();

                // Modal close karne ka sahi tarika
                const modal = document.getElementById("cleark_modal");
                if (modal) modal.close();
            } catch (err) {
                console.error("Registration Error:", err);
                toast.error(err?.data?.message || "Failed to register");
            }
        }
    });

    const handleClass = (formikObj, field) =>
        clsx("w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors", {
            "border-red-500": formikObj.touched[field] && formikObj.errors[field],
            "border-green-500": formikObj.touched[field] && !formikObj.errors[field]
        })

    return (
        <div className="p-6">
            <div className="flex justify-end mb-6">
                <button
                    type="button" // Type button rakhein
                    onClick={() => document.getElementById("cleark_modal")?.showModal()}
                    className="bg-blue-600 text-white px-6 py-2 rounded-xl shadow hover:bg-blue-700 transition"
                >
                    + Register Cleark
                </button>
            </div>

            {/* List View (Grid) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {data?.length > 0 ? data.map(item => (
                    <div key={item._id} className="bg-white rounded-2xl shadow-md p-6 flex gap-4 border border-gray-50">
                        <div className="h-12 w-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-bold shrink-0">
                            {item.name?.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold text-gray-800 truncate">{item.name}</h3>
                            <p className="text-sm text-gray-500 truncate">{item.email}</p>
                            <p className="text-sm text-gray-500">{item.mobile}</p>
                        </div>
                    </div>
                )) : <p className="col-span-full text-center text-gray-400">No clerks found</p>}
            </div>

            {/* REGISTER MODAL */}
            <dialog id="cleark_modal" className="modal">
                <div className="modal-box bg-white rounded-3xl p-8">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Register Clerk</h2>

                    <form onSubmit={regFormik.handleSubmit} className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-gray-600">Name</label>
                            <input
                                type="text"
                                className={handleClass(regFormik, 'name')}
                                {...regFormik.getFieldProps('name')}
                                placeholder="Enter full name"
                            />
                            {regFormik.touched.name && regFormik.errors.name && (
                                <span className="text-xs text-red-500">{regFormik.errors.name}</span>
                            )}
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-600">Email</label>
                            <input
                                type="email"
                                className={handleClass(regFormik, 'email')}
                                {...regFormik.getFieldProps('email')}
                                placeholder="Enter email"
                            />
                            {regFormik.touched.email && regFormik.errors.email && (
                                <span className="text-xs text-red-500">{regFormik.errors.email}</span>
                            )}
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-600">Mobile</label>
                            <input
                                type="text"
                                className={handleClass(regFormik, 'mobile')}
                                {...regFormik.getFieldProps('mobile')}
                                placeholder="Enter mobile"
                            />
                            {regFormik.touched.mobile && regFormik.errors.mobile && (
                                <span className="text-xs text-red-500">{regFormik.errors.mobile}</span>
                            )}
                        </div>

                        <div className="flex gap-3 pt-4">
                            <button
                                type="submit" // Main Submit Button
                                disabled={isRegLoading}
                                className="flex-1 bg-blue-600 text-white py-2 rounded-xl font-semibold disabled:bg-blue-300"
                            >
                                {isRegLoading ? "Registering..." : "Register"}
                            </button>

                            <button
                                type="button" // Isko simple button rakhein modal close ke liye
                                onClick={() => document.getElementById("cleark_modal")?.close()}
                                className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-xl font-semibold"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    )
}

export default ClearkList
