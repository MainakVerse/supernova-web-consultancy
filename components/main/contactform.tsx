"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { slideInFromTop, slideInFromRight } from "@/lib/motion";

// Types
interface FormData {
  name: string;
  email: string;
  message: string;
}

interface AlertProps {
  type: "success" | "error";
  message: string;
  onClose: () => void;
}

// Alert Component
const CustomAlert: React.FC<AlertProps> = ({ type, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      role="alert"
      className={`p-4 rounded-md ${
        type === "success" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
      } flex justify-between items-center`}
    >
      <p>{message}</p>
      <button
        onClick={onClose}
        className="ml-4 text-current hover:opacity-70 transition-opacity"
        aria-label="Close alert"
      >
        ×
      </button>
    </motion.div>
  );
};

// Map Section Component
const MapSection: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className="col-span-12 md:col-span-6"
  >
    <div className="bg-black/65 border border-cyan-500 shadow-md rounded-lg p-6 h-full">
      <h2 className="text-2xl font-bold text-white mb-4" id="location-heading">
        Visit Us
      </h2>
      <div className="relative w-full h-[300px] rounded-lg overflow-hidden">
        <iframe
          title="Our Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29451.529384433667!2d88.2698051258432!3d22.674615032799043!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f8830efd94c899%3A0x4304d214888b1699!2sDankuni%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1737339127809!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          aria-hidden="false"
          tabIndex={0}
          aria-labelledby="location-heading"
        />
      </div>
    </div>
  </motion.div>
);

// Contact Form Component
const ContactForm: React.FC = () => {
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const clearStatus = () => {
    setSubmitStatus({ type: null, message: "" });
  };

  const onSubmit = async (formData: FormData) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbzg4wI44N1r7QFimHsGlhOMhzDymKSO-qCBn9A6MfHh6W5JQlADok6wbmApjbFMg8KURQ/exec",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            yourName: formData.name,
            yourEmail: formData.email,
            yourMessage: formData.message,
          }),
          mode: "no-cors",
        }
      );

      setSubmitStatus({
        type: "success",
        message: "Thank you for your message! We'll get back to you soon.",
      });
      reset();
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus({
        type: "error",
        message: "Failed to submit form. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="col-span-12 md:col-span-6"
    >
      <div className="bg-black/65 border border-cyan-500 shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Send Us a Message</h2>
        {submitStatus.type && (
          <div className="mb-6">
            <CustomAlert
              type={submitStatus.type}
              message={submitStatus.message}
              onClose={clearStatus}
            />
          </div>
        )}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          aria-label="Contact form"
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white">
              Name
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              type="text"
              id="name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm bg-gray-900/50 text-green-500"
              placeholder="Your Name"
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && (
              <p id="name-error" className="text-sm text-red-500 mt-1" role="alert">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white">
              Email
            </label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email address",
                },
              })}
              type="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm bg-gray-900/50 text-green-500"
              placeholder="you@example.com"
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <p id="email-error" className="text-sm text-red-500 mt-1" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-white">
              Message
            </label>
            <textarea
              {...register("message", { required: "Message is required" })}
              id="message"
              rows={4}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm bg-gray-900/50 text-green-500"
              placeholder="Your message"
              aria-describedby={errors.message ? "message-error" : undefined}
            />
            {errors.message && (
              <p id="message-error" className="text-sm text-red-500 mt-1" role="alert">
                {errors.message.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-4 py-2 text-white bg-gradient-to-r from-cyan-500 to-violet-900 rounded-md hover:opacity-90 focus:ring-2 focus:ring-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            aria-busy={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

// Main Contact Section Component
export const ContactSection: React.FC = () => {
  return (
    <section className="container mx-auto px-4 py-10">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={slideInFromTop}
        className="text-[40px] pb-4 font-medium text-center text-gray-200"
      >
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-cyan-500">
          Contact{" "}
        </span>
        Us
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={slideInFromRight(0.8)}
        className="text-[20px] text-gray-200 mb-10 mt-[10px] text-center"
      >
        We would love to hear from you!
      </motion.div>

      <div className="grid grid-cols-12 gap-6">
        <MapSection />
        <ContactForm />
      </div>
    </section>
  );
};