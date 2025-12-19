import React from 'react'
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";
import Footer from './Footer';


const AddForm = () => {
    return <div className=''>
        <div className='bg-gray-50'>
            <div className='px-6'>
                <h1 className='text-4xl p-5 text-center font-bold text-blue-900 '>Admission Criteria & Eligibility</h1>
                <p className='text-center text-gray-600 mt-6 mb-10'>Documents required at the time of application/admission</p>

                {/* Document List */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto'>
                    <ul className='space-y-3 text-lg'>
                        <li>📌 Transfer Certificate</li>
                        <li>📌 Birth Certificate</li>
                        <li>📌 Residence Proof</li>
                        <li>📌 Photograph - Child</li>
                        <li>📌 Photograph - Parents/Guardian</li>
                    </ul>
                    <ul className='space-y-3 text-lg'>
                        <li>📌 Marksheet / Report card (if applicable)</li>
                        <li>📌 Category Verification Certificate</li>
                        <li>📌 Aadhar Card - Child</li>
                        <li>📌 Aadhar Card - Parents</li>
                    </ul>
                </div>

                <div className="divider mt-12">OR</div>

                {/* Admission Modal Button */}
                <div className='text-center mt-8'>
                    <button className="btn btn-primary text-xl px-10" onClick={() => document.getElementById('my_modal_4').showModal()}>
                        Fill Admission Form
                    </button>
                </div>
                {/* Modal Form */}
                <dialog id="my_modal_4" className="modal">
                    <div className="modal-box w-11/12 max-w-3xl bg-white rounded-2xl shadow-2xl p-8 relative">
                        {/* Close Button */}
                        <form method="dialog">
                            <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl font-bold">
                                ✕
                            </button>
                        </form>

                        {/* Form Title */}
                        <h2 className="text-3xl font-bold text-center text-blue-900 mb-6">
                            Student Admission Form
                        </h2>

                        {/* Form */}
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <input
                                    type="text"
                                    placeholder="Student Name"
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                />
                                <input
                                    type="text"
                                    placeholder="Standard"
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                />
                                <input
                                    type="number"
                                    placeholder="Age"
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                />
                                <input
                                    type="text"
                                    placeholder="Parent's Phone No."
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                />
                                <input
                                    type="email"
                                    placeholder="Parent's Email"
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                />
                                <textarea
                                    placeholder="Address"
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-none h-24"
                                ></textarea>
                            </div>

                            {/* Submit Button */}
                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="px-10 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-700 transition-all duration-300"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </dialog>

                <div className="divider mt-12">OR</div>

                {/* Additional Info */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-10 p-5 max-w-6xl mx-auto'>
                    <div className='flex items-center gap-4'>
                        <img src="https://cdn.uniapply.com/assets/v1/d/images/main/icon-eligibility.ff4a59acb01f.png" alt="Eligibility" className='w-20 h-20 rounded-xl' />
                        <div>
                            <h2 className='text-xl font-bold'>Check Age Eligibility for Your Child</h2>
                            <p className='text-gray-600 text-sm'>Enter your child’s details and we’ll let you know about eligibility.</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-4'>
                        <img src="https://t4.ftcdn.net/jpg/06/71/85/57/360_F_671855771_K6O69meeagizQcuwXSWn7Xkgb3ndbPQ5.jpg" alt="Visit School" className='w-24 h-24 rounded-xl object-cover' />
                        <div>
                            <h2 className='text-xl font-bold'>For More Details</h2>
                            <p className='text-gray-600 text-sm'>Please visit our school in person. We would love to assist you!</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </div>
}

export default AddForm