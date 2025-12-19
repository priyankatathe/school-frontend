import React from 'react'
import Footer from './Footer'

const ContactPage = () => {
    return <>
        <div className="min-h-screen bg-gray-100 px-4 py-10 md:px-20">
            <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-10">

                {/* Left: Contact Info */}
                <div className="flex flex-col justify-center">
                    <h2 className="text-3xl font-bold text-blue-800 mb-4">Contact Us</h2>
                    <p className="text-gray-600 mb-6">
                        We'd love to hear from you! Whether you have a question about admissions, activities, or anything else.
                    </p>

                    <div className="space-y-4 text-gray-700">
                        <p><strong>📍 Address:</strong>  digital alchemy acadmy School, Main Road, Pune</p>
                        <p><strong>📞 Phone:</strong> +91 98765 43210</p>
                        <p><strong>✉️ Email:</strong> info@abcschool.com</p>
                    </div>
                </div>

                {/* Right: Form */}
                <div>
                    <form className="space-y-5">
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Name</label>
                            <input type="text" className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your full name" />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Email</label>
                            <input type="email" className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="you@example.com" />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Message</label>
                            <textarea rows="4" className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Write your message here..." />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition duration-300"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>

    </>
}

export default ContactPage
