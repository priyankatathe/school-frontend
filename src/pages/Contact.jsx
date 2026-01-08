import React from 'react'
import { useForm } from 'react-hook-form'
import { useAddContactMutation } from '../redux/api/contactApi'
import { motion, AnimatePresence } from 'framer-motion'
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaTimes } from 'react-icons/fa'
import { toast } from 'react-toastify' // Optional but recommended

const Contact = ({ open, onClose }) => {
    const [addContact] = useAddContactMutation()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm()

    const onSubmit = async (data) => {
        try {
            await addContact(data).unwrap()
            toast.success("Message sent successfully!") 
            reset()
            onClose()
        } catch (error) {
            toast.error(error?.data?.message || "Failed to send message")
        }
    }

    return (
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    
                    {/* Overlay with Blur */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
                    ></motion.div>

                    {/* Modal Container */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-5"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 z-10 p-2 bg-slate-100 hover:bg-red-100 hover:text-red-600 rounded-full transition-colors text-slate-500"
                        >
                            <FaTimes size={18} />
                        </button>

                        {/* LEFT SIDE: INFO (Blue Area) */}
                        <div className="md:col-span-2 bg-blue-700 p-8 md:p-12 text-white flex flex-col justify-between">
                            <div>
                                <h2 className="text-3xl font-black tracking-tighter mb-4">Get In Touch</h2>
                                <p className="text-blue-100 text-sm leading-relaxed mb-10">
                                    Have questions about admissions or our curriculum? Our team is here to help you.
                                </p>

                                <div className="space-y-8">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-white/10 rounded-xl">
                                            <FaMapMarkerAlt className="text-blue-200" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm">Location</p>
                                            <p className="text-xs text-blue-100 opacity-80">Digital Alchemy Academy, Main Road, Pune</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-white/10 rounded-xl">
                                            <FaPhoneAlt className="text-blue-200" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm">Call Us</p>
                                            <p className="text-xs text-blue-100 opacity-80">+91 98765 43210</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-white/10 rounded-xl">
                                            <FaEnvelope className="text-blue-200" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm">Email</p>
                                            <p className="text-xs text-blue-100 opacity-80 lowercase">info@digitalschool.edu</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative element */}
                            <div className="mt-12 pt-8 border-t border-white/10">
                                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-blue-300">
                                    Response time: Within 24 Hours
                                </p>
                            </div>
                        </div>

                        {/* RIGHT SIDE: FORM */}
                        <div className="md:col-span-3 p-8 md:p-12 bg-white">
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-bold uppercase text-slate-500 tracking-wider ml-1">Full Name</label>
                                        <input
                                            {...register("name", { required: "Name is required" })}
                                            className={`w-full mt-2 bg-slate-50 border ${errors.name ? 'border-red-400' : 'border-slate-200'} rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all`}
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold uppercase text-slate-500 tracking-wider ml-1">Email Address</label>
                                        <input
                                            {...register("email", { 
                                                required: "Email is required",
                                                pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
                                            })}
                                            className={`w-full mt-2 bg-slate-50 border ${errors.email ? 'border-red-400' : 'border-slate-200'} rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all`}
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-bold uppercase text-slate-500 tracking-wider ml-1">Your Message</label>
                                    <textarea
                                        rows="4"
                                        {...register("message", { required: "Message is required" })}
                                        className={`w-full mt-2 bg-slate-50 border ${errors.message ? 'border-red-400' : 'border-slate-200'} rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none`}
                                        placeholder="How can we help you?"
                                    />
                                    {errors.message && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.message.message}</p>}
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transform hover:-translate-y-1 transition-all shadow-xl shadow-blue-900/10 disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center gap-2">
                                            <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Processing...
                                        </span>
                                    ) : "Send Message"}
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}

export default Contact