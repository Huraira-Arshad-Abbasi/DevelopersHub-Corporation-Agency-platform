
"use client";

import { useState } from "react";
import { createLead } from "@/lib/api";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    serviceInterested: "",
    details: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createLead(form);

      alert("Message sent successfully!");

      setForm({
        name: "",
        email: "",
        phone: "",
        serviceInterested: "",
        details: "",
      });
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 md:px-10 lg:px-20 py-16">

      {/* Heading */}
      <h1 className="heading text-3xl md:text-5xl font-bold text-center mb-12">
        Contact Us
      </h1>

      {/* Form Container */}
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Name */}
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-1 font-medium">Phone</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Optional"
            />
          </div>

          {/* Service Interested */}
          <div>
            <label className="block mb-1 font-medium">
              Service Interested In
            </label>
            <input
              type="text"
              name="serviceInterested"
              value={form.serviceInterested}
              onChange={handleChange}
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Web Development"
            />
          </div>

          {/* Details */}
          <div>
            <label className="block mb-1 font-medium">Project Details</label>
            <textarea
              name="details"
              required
              rows="4"
              value={form.details}
              onChange={handleChange}
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe your project..."
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}

            className="w-full bg-blue-600 disabled:bg-blue-200 cursor-pointer text-white py-3 rounded-md font-medium hover:bg-blue-700 transition"
          >
            Submit Inquiry{loading ? "..." : ""}
          </button>

        </form>
      </div>
    </div>
  );
}
