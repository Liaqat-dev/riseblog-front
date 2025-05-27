import React, { useState } from "react";
import { FaWhatsapp, FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";

function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", formData);

    };

    return (
        <div className="flex flex-col items-center  min-h-[calc(100vh-4rem)] overflow-y-auto bg-white-1 p-6 pb-10">
            <h1 className="text-5xl font-bold text-center text-secondary mb-4 gradient-text ">Hello, I'm Liaqat!</h1>
            <p className="text-lg text-gray-700 text-center max-w-2xl mb-6">
                A passionate developer specializing in web development. Feel free to reach out to me
                for collaborations, projects, or any inquiries!
            </p>
            <h2 className="text-4xl font-bold text-secondary mb-6">Contact Me</h2>
            <form onSubmit={handleSubmit} className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Message</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-secondary text-white font-bold py-2 px-4 rounded-md hover:bg-opacity-80 transition"
                >
                    Send Message
                </button>
            </form>
            <div className="flex gap-4 mt-6 mb-8 ">
                <a href="https://wa.me/+923044016143" target="_blank" rel="noopener noreferrer"
                   className="text-secondary text-2xl hover:opacity-80 hover:scale-125">
                    <FaWhatsapp className={'text-green-500'}/>
                </a>
                <a href="https://instagram.com/liaqat_ali6143" target="_blank" rel="noopener noreferrer"
                   className="text-secondary text-2xl hover:opacity-80 hover:scale-125">
                    <FaInstagram className={'text-pink-500'}/>
                </a>
                <a href="https://github.com/liaqat-dev" target="_blank" rel="noopener noreferrer"
                   className="text-secondary text-2xl hover:opacity-80 hover:scale-125">
                    <FaGithub className={'text-black'}/>
                </a>
                <a href="https://linkedin.com/in/dev-liaqat-ali" target="_blank" rel="noopener noreferrer"
                   className="text-secondary text-2xl hover:opacity-80 hover:scale-125">
                    <FaLinkedin/>
                </a>
            </div>
        </div>
    );
}

export default Contact;
