"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { slideInFromTop, slideInFromRight } from "@/lib/motion";

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Enter a valid email address";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      console.log("Form Data:", formData);
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitting(false);
      alert("Form submitted successfully!");
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-10" >
        <motion.div
          variants={slideInFromTop}
          className="text-[40px] pb-4 font-medium text-center text-gray-200"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-cyan-500">
          Contact{" "} </span>
          
          Us
        </motion.div>
        <motion.div
                variants={slideInFromRight(0.8)}
                className="cursive text-[30px] text-gray-200 mb-10 mt-[10px] text-center"
              >
                We would love to hear back from you!
              </motion.div>
      {/* Grid Layout */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left 6 Columns - Map Card */}
        <div className="col-span-12 md:col-span-6">
          <div className="bg-black opacity-65 border border-cyan-500 shadow-md rounded-lg p-6 h-full">
            <h2 className="text-2xl font-bold text-white mb-4">Visit Us for a Drink 🍻</h2>
            <div className="relative w-full h-[300px] rounded-lg overflow-hidden">
              <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29451.529384433667!2d88.2698051258432!3d22.674615032799043!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f8830efd94c899%3A0x4304d214888b1699!2sDankuni%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1737205288309!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                aria-hidden="false"
                // tabIndex="0"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Right 6 Columns - Contact Form */}
        <div className="col-span-12 md:col-span-6">
          <div className="bg-black opacity-65 border border-cyan-500 shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Send Us a Letter 😉</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Input Fields */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-transparent text-green-500"
                  placeholder="Your Name"
                  required
                />
                {errors.name && (
                  <p className="text-sm text-red-500 mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-transparent text-green-500"
                  placeholder="you@example.com"
                  required
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-white">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-transparent text-green-500"
                  placeholder="Your message"
                  required
                ></textarea>
                {errors.message && (
                  <p className="text-sm text-red-500 mt-1">{errors.message}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
