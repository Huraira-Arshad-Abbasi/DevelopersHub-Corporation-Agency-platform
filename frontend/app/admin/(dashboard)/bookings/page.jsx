"use client";

import { useState, useEffect } from "react";
import {
  getBookings,
  updateBookingStatus,
  deleteBooking,
} from "@/lib/api";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 Fetch bookings
  const fetchBookings = async () => {
    try {
      const res = await getBookings();
      setBookings(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // 🔥 Update status (REAL API)
  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateBookingStatus(id, newStatus);
      console.log("this line executed");
      
      setBookings((prev) =>
        prev.map((b) =>
          b._id === id ? { ...b, status: newStatus } : b
        )
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  // 🔥 Delete booking
  const handleDelete = async (id) => {
    if (!confirm("Delete this booking?")) return;

    try {
      await deleteBooking(id);
      setBookings((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete booking");
    }
  };

  if (loading) return <p>Loading bookings...</p>;

  return (
    <div className="max-w-full">
      <h1 className="text-2xl font-bold mb-6">Bookings</h1>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="max-w-full table-fixed">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3 w-[25%]">Client</th>
              <th className="p-3 w-[20%]">Service</th>
              <th className="p-3 w-[20%]">Schedule</th>
              <th className="p-3 w-[20%]">Note</th>
              <th className="p-3 w-[10%]">Status</th>
              <th className="p-3 w-[5%]">Action</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => {
              const dateObj = new Date(booking.dateTime);

              return (
                <tr key={booking._id} className="border-t align-top">
                  
                  {/* Client */}
                  <td className="p-3">
                    <p className="font-medium">{booking.clientName}</p>
                    <p className="text-sm text-gray-500 wrap-break-words">
                      {booking.email}
                    </p>
                  </td>

                  {/* Service */}
                  <td className="p-3  wrap-break-words">
                    {booking.service || "-"}
                  </td>

                  {/* Date + Time (Improved UI) */}
                  <td className="p-3">
                    <p className="text-sm font-medium">
                      {dateObj.toLocaleDateString()}
                    </p>
                    <p className="text-xs text-gray-500">
                      {dateObj.toLocaleTimeString()}
                    </p>
                  </td>

                  {/* Note (clean + small) */}
                  <td className="p-3 text-xs text-gray-600 wrap-break-words leading-tight">
                    {booking.note || "-"}
                  </td>

                  {/* Status */}
                  <td className="p-3">
                    <select
                      value={booking.status}
                      onChange={(e) =>
                        handleStatusChange(booking._id, e.target.value)
                      }
                      className="border px-2 py-1 rounded-md text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>

                  {/* Delete */}
                  <td className="p-3">
                    <button
                      onClick={() => handleDelete(booking._id)}
                      className="text-red-600 text-sm"
                    >
                      Delete
                    </button>
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}