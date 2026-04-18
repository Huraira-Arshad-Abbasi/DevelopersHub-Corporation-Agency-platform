"use client";

import { useState } from "react";

export default function Booking() {
  const [form, setForm] = useState({
    clientName: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    note: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Combine date + time
    const dateTime = new Date(`${form.date}T${form.time}`);

    const finalData = {
      clientName: form.clientName,
      email: form.email,
      phone: form.phone,
      service: form.service,
      dateTime,
      note: form.note,
    };

    console.log(finalData); // later send to backend
  };

  return (
    <div className="px-4 md:px-10 lg:px-20 py-16">

      {/* Heading */}
      <h1 className="heading text-3xl md:text-5xl font-bold text-center mb-12">
        Book an Appointment
      </h1>

      {/* Form */}
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Name */}
          <input
            type="text"
            name="clientName"
            placeholder="Your Name"
            required
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md"
          />

          {/* Phone */}
          <input
            type="text"
            name="phone"
            placeholder="Phone (optional)"
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md"
          />

          {/* Service */}
          <select
            name="service"
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md"
          >
            <option value="">Select Service</option>
            <option>Web Development</option>
            <option>Mobile App</option>
            <option>UI/UX Design</option>
          </select>

          {/* Date & Time */}
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="date"
              name="date"
              required
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-md"
            />

            <input
              type="time"
              name="time"
              required
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-md"
            />
          </div>

          {/* Note */}
          <textarea
            name="note"
            placeholder="Additional Notes"
            rows="4"
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md"
          ></textarea>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700"
          >
            Book Appointment
          </button>

        </form>
      </div>
    </div>
  );
}