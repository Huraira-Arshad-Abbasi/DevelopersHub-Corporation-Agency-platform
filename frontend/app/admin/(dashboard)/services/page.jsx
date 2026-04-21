"use client";

import { useEffect, useState } from "react";
import { getServices, deleteService } from "@/lib/api";
import Link from "next/link";

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = async () => {
    try {
      const res = await getServices();
      setServices(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this service?")) return;

    try {
      await deleteService(id);
      setServices((prev) =>
        prev.filter((service) => service._id !== id)
      );
    } catch (err) {
      console.error(err);
      alert("Failed to delete service");
    }
  };

  if (loading) return <p>Loading services...</p>;

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Services</h1>

        <Link
          href="/admin/services/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          + Add Service
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full table-fixed">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3 w-[30%]">Title</th>
              <th className="p-3 w-[40%]">Description</th>
              <th className="p-3 w-[10%]">Status</th>
              <th className="p-3 w-[20%]">Actions</th>
            </tr>
          </thead>

          <tbody>
            {services.map((service) => (
              <tr key={service._id} className="border-t">

                <td className="p-3 font-medium wrap-break-word">
                  {service.title}
                </td>

                <td className="p-3 text-sm text-gray-600 wrap-break-word">
                  {service.description}
                </td>

                <td className="p-3">
                  <span
                    className={`text-sm px-2 py-1 rounded ${
                      service.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {service.isActive ? "Active" : "Inactive"}
                  </span>
                </td>

                <td className="p-3 flex gap-3 text-sm">
                  <Link
                    href={`/admin/services/edit/${service._id}`}
                    className="text-blue-600"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(service._id)}
                    className="text-red-600 cursor-pointer"
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}