"use client";

import { useState } from "react";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([
    {
      _id: "1",
      clientName: "Ali Khan",
      email: "ali@example.com",
      phone: "03001234567",
      service: "Web Development",
      dateTime: "2026-04-20T10:00",
      status: "pending",
      note: "Urgent project",
    },
    {
      _id: "2",
      clientName: "Sara Ahmed",
      email: "sara@example.com",
      phone: "03111234567",
      service: "UI Design",
      dateTime: "2026-04-22T14:00",
      status: "confirmed",
      note: "",
    },
  ]);

  const handleStatusChange = (id, newStatus) => {
    const updated = bookings.map((item) =>
      item._id === id ? { ...item, status: newStatus } : item
    );
    setBookings(updated);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Bookings</h1>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Client</th>
              <th className="p-3">Service</th>
              <th className="p-3">Date & Time</th>
              <th className="p-3">Note</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id} className="border-t">
                <td className="p-3">
                  <p className="font-medium">{booking.clientName}</p>
                  <p className="text-sm text-gray-500">
                    {booking.email}
                  </p>
                </td>

                <td className="p-3">{booking.service}</td>

                <td className="p-3">
                  {new Date(booking.dateTime).toLocaleString()}
                </td>

                <td className="p-3">{booking.note}</td>

                <td className="p-3">
                  <select
                    value={booking.status}
                    onChange={(e) =>
                      handleStatusChange(booking._id, e.target.value)
                    }
                    className="border px-2 py-1 rounded-md"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}