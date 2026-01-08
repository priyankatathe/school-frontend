import React from 'react'
import { useForm } from "react-hook-form"
import { useAddaddmissionFormMutation } from '../redux/api/addFormApi'
import { FaFileAlt, FaUserGraduate, FaIdCard, FaPhoneAlt, FaMapMarkedAlt, FaCheckCircle } from 'react-icons/fa'

const AddForm = () => {
    const [addForm, { isLoading }] = useAddaddmissionFormMutation()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm()

    const onSubmit = async (data) => {
        try {
            await addForm(data).unwrap()
            alert("✅ Admission form submitted successfully")
            reset()
            document.getElementById('admission_modal').close()
        } catch (error) {
            alert(error?.data?.message || "❌ Something went wrong")
        }
    }

    const documentList = [
        "Transfer Certificate", "Birth Certificate", "Residence Proof",
        "Child's Photograph", "Guardian's Photograph", "Marksheet/Report Card",
        "Category Certificate", "Aadhar Card (Child & Parent)"
    ]

    return (
        <div className='bg-white min-h-screen'>
            {/* HERO SECTION */}
            <div className="bg-gradient-to-r from-blue-900 to-indigo-800 py-20 px-6 text-center text-white">
                <h1 className='text-4xl md:text-6xl font-black tracking-tighter mb-4'>Admission Open 2026-27</h1>
                <p className='text-blue-100 max-w-2xl mx-auto text-lg opacity-90'>
                    Join our community of learners. Follow the criteria below to begin your child's journey with us.
                </p>
            </div>

            <div className='max-w-6xl mx-auto px-6 -mt-10'>
                {/* ELIGIBILITY CARD */}
                <div className='bg-white rounded-[2.5rem] shadow-xl p-8 md:p-12 border border-slate-100'>
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="md:w-1/2">
                            <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                                <FaFileAlt className="text-blue-600" /> Required Documents
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {documentList.map((doc, i) => (
                                    <div key={i} className="flex items-center gap-3 text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                                        <FaCheckCircle className="text-emerald-500 shrink-0" />
                                        <span className="text-sm font-medium">{doc}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="md:w-1/3 text-center bg-blue-50 p-10 rounded-[2rem] border-2 border-dashed border-blue-200">
                            <img 
                                src="https://cdn.uniapply.com/assets/v1/d/images/main/icon-eligibility.ff4a59acb01f.png" 
                                className='w-24 h-24 mx-auto mb-4 drop-shadow-lg' 
                                alt="eligibility"
                            />
                            <h3 className="font-bold text-xl text-blue-900 mb-2">Ready to Apply?</h3>
                            <p className="text-sm text-blue-700/70 mb-6">Process takes less than 5 minutes.</p>
                            <button
                                className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all hover:-translate-y-1"
                                onClick={() => document.getElementById('admission_modal').showModal()}
                            >
                                Open Admission Form
                            </button>
                        </div>
                    </div>
                </div>

                {/* MODAL DESIGN */}
                <dialog id="admission_modal" className="modal backdrop-blur-sm">
                    <div className="modal-box w-11/12 max-w-4xl bg-white rounded-[3rem] p-0 overflow-hidden shadow-2xl">
                        <div className="grid grid-cols-1 md:grid-cols-12">
                            {/* Modal Sidebar */}
                            <div className="md:col-span-4 bg-blue-900 p-10 text-white flex flex-col justify-between">
                                <div>
                                    <FaUserGraduate size={40} className="mb-6 text-blue-400" />
                                    <h2 className="text-3xl font-bold leading-tight">Student Enrollment</h2>
                                    <p className="text-blue-200 mt-4 text-sm leading-relaxed">
                                        Please provide accurate details. Our admission cell will contact you within 48 hours.
                                    </p>
                                </div>
                                <div className="hidden md:block text-[10px] uppercase tracking-widest font-bold text-blue-400">
                                    Academic Year 2026-2027
                                </div>
                            </div>

                            {/* Modal Content */}
                            <div className="md:col-span-8 p-10 relative">
                                <form method="dialog">
                                    <button className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 transition-colors">✕</button>
                                </form>

                                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-slate-500 ml-1 uppercase">Full Name</label>
                                            <input {...register("studentName", { required: true })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Enter student name" />
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-slate-500 ml-1 uppercase">Applying for Class</label>
                                            <select {...register("standard", { required: true })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none">
                                                <option value="">Select Class</option>
                                                <option value="Nursery">Nursery</option>
                                                <option value="1">Class 1</option>
                                                <option value="2">Class 2</option>
                                            </select>
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-slate-500 ml-1 uppercase">Age</label>
                                            <input {...register("age", { required: true })} type="number" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Age" />
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-slate-500 ml-1 uppercase">Parent's Phone</label>
                                            <input {...register("parentPhone", { required: true })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="+91 XXX XXX XXXX" />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-500 ml-1 uppercase">Permanent Address</label>
                                        <textarea {...register("address", { required: true })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 h-28 resize-none focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Enter full address..."></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-blue-600 transition-all flex items-center justify-center gap-2"
                                    >
                                        {isLoading ? <span className="loading loading-spinner loading-sm"></span> : "Submit Application"}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </dialog>

                {/* FOOTER INFO CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-20">
                    <div className="flex items-center gap-6 p-8 bg-slate-50 rounded-[2rem] border border-slate-100 group hover:bg-white hover:shadow-xl transition-all duration-500">
                        <div className="bg-white p-4 rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
                             <FaIdCard className="text-blue-600 text-3xl" />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 text-xl">In-Person Visit</h4>
                            <p className="text-slate-500 text-sm">Mon - Sat: 9:00 AM to 3:00 PM</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-6 p-8 bg-slate-50 rounded-[2rem] border border-slate-100 group hover:bg-white hover:shadow-xl transition-all duration-500">
                        <div className="bg-white p-4 rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
                             <FaPhoneAlt className="text-blue-600 text-3xl" />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 text-xl">Admission Helpline</h4>
                            <p className="text-slate-500 text-sm">+91 98765 43210 (24/7 Support)</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddForm