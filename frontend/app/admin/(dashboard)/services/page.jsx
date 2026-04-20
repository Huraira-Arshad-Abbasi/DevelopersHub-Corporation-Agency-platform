"use client";

import Link from "next/link";

export default function ServicesPage() {
  const services = [
    {
      _id: "1",
      title: "Web Development",
      description: "Build modern websites",
      icon: "code",
      isActive: true,
    },
    {
      _id: "2",
      title: "UI/UX Design",
      description: "Design user interfaces",
      icon: "design",
      isActive: false,
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Services</h1>

        <Link
          href="/admin/services/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          + Add Service
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Icon</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {services.map((service) => (
              <tr key={service._id} className="border-t">
                <td className="p-3">{service.title}</td>
                <td className="p-3">{service.icon}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      service.isActive
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {service.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="p-3 flex gap-3">
                  <Link
                    href={`/admin/services/edit/${service._id}`}
                    className="text-blue-600"
                  >
                    Edit
                  </Link>
                  <button className="text-red-600">
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