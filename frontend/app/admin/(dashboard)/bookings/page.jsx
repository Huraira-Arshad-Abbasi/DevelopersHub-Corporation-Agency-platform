"use client";

import { useState, useEffect } from "react";
import {
  getBookings,
  updateBookingStatus,
  deleteBooking,
} from "@/lib/api";
import { Trash2 } from "lucide-react";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateBookingStatus(id, newStatus);

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
    <div>
      <h1 className="text-2xl font-bold mb-6">Bookings</h1>

      {/* 🔥 DESKTOP TABLE */}
      <div className="hidden md:block bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full table-fixed">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Client</th>
              <th className="p-3">Service</th>
              <th className="p-3">Schedule</th>
              <th className="p-3">Note</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => {
              const dateObj = new Date(booking.dateTime);

              return (
                <tr key={booking._id} className="border-t align-top">
                  
                  <td className="p-3">
                    <p className="font-medium">{booking.clientName}</p>
                    <p className="text-sm text-gray-500">
                      {booking.email}
                    </p>
                  </td>

                  <td className="p-3">{booking.service || "-"}</td>

                  <td className="p-3">
                    <p className="text-sm font-medium">
                      {dateObj.toLocaleDateString()}
                    </p>
                    <p className="text-xs text-gray-500">
                      {dateObj.toLocaleTimeString()}
                    </p>
                  </td>

                  <td className="p-3 text-xs text-gray-600">
                    {booking.note || "-"}
                  </td>

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

                  <td className="p-3">
                    <button
                      onClick={() => handleDelete(booking._id)}
                      className="text-red-600 cursor-pointer"
                    >
                      <Trash2 size={18} className="cursor-pointer" />
                    </button>
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 🔥 MOBILE CARDS */}
      <div className="md:hidden space-y-4">
        {bookings.map((booking) => {
          const dateObj = new Date(booking.dateTime);

          return (
            <div
              key={booking._id}
              className="bg-white p-4 rounded-xl shadow-md space-y-3"
            >
              {/* Client */}
              <div>
                <p className="font-semibold">{booking.clientName}</p>
                <p className="text-sm text-gray-500">{booking.email}</p>
              </div>

              {/* Service */}
              <p className="text-sm">
                <span className="font-medium">Service:</span>{" "}
                {booking.service || "-"}
              </p>

              {/* Date + Time */}
              <p className="text-sm">
                <span className="font-medium">Date:</span>{" "}
                {dateObj.toLocaleDateString()}
                <br />
                <span className="text-xs text-gray-500">
                  {dateObj.toLocaleTimeString()}
                </span>
              </p>

              {/* Note */}
              <p className="text-xs text-gray-600 line-clamp-3">
                {booking.note || "-"}
              </p>

              {/* Actions */}
              <div className="flex justify-between items-center pt-2">
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

                <button
                  onClick={() => handleDelete(booking._id)}
                  className="text-red-600 cursor-pointer"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}