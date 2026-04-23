"use client";

import { useState, useEffect } from "react";
import { getLeads, updateLeadStatus, deleteLead } from "@/lib/api";
import { Trash2 } from "lucide-react";

export default function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    try {
      const res = await getLeads();
      setLeads(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch leads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateLeadStatus(id, newStatus);

      setLeads((prev) =>
        prev.map((lead) =>
          lead._id === id ? { ...lead, status: newStatus } : lead
        )
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this lead?")) return;

    try {
      await deleteLead(id);
      setLeads((prev) => prev.filter((lead) => lead._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete lead");
    }
  };

  if (loading) return <p>Loading leads...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Leads</h1>

      {/* 🔥 DESKTOP TABLE */}
      <div className="hidden md:block bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full table-fixed">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Client</th>
              <th className="p-3">Service</th>
              <th className="p-3">Details</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {leads.map((lead) => (
              <tr key={lead._id} className="border-t align-top">
                <td className="p-3">
                  <p className="font-medium">{lead.name}</p>
                  <p className="text-sm text-gray-500">{lead.email}</p>
                </td>

                <td className="p-3">{lead.serviceInterested || "-"}</td>

                <td className="p-3 text-sm text-gray-700">
                  {lead.details}
                </td>

                <td className="p-3">
                  <select
                    value={lead.status}
                    onChange={(e) =>
                      handleStatusChange(lead._id, e.target.value)
                    }
                    className="border px-2 py-1 rounded-md text-sm"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="closed">Closed</option>
                  </select>
                </td>

                <td className="p-3">
                  <button
                    onClick={() => handleDelete(lead._id)}
                    className="text-red-600 hover:underline cursor-pointer"
                  >
                    <Trash2 size={18} className="cursor-pointer" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🔥 MOBILE CARDS */}
      <div className="md:hidden space-y-4">
        {leads.map((lead) => (
          <div
            key={lead._id}
            className="bg-white p-4 rounded-xl shadow-md space-y-3"
          >
            {/* Name + Email */}
            <div>
              <p className="font-semibold">{lead.name}</p>
              <p className="text-sm text-gray-500">{lead.email}</p>
            </div>

            {/* Service */}
            <p className="text-sm">
              <span className="font-medium">Service:</span>{" "}
              {lead.serviceInterested || "-"}
            </p>

            {/* Details */}
            <p className="text-sm text-gray-700 line-clamp-3">
              {lead.details}
            </p>

            {/* Bottom Row */}
            <div className="flex justify-between items-center pt-2">
              <select
                value={lead.status}
                onChange={(e) =>
                  handleStatusChange(lead._id, e.target.value)
                }
                className="border px-2 py-1 rounded-md text-sm"
              >
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="closed">Closed</option>
              </select>

              <button
                onClick={() => handleDelete(lead._id)}
                className="text-red-600 cursor-pointer"
              >
                <Trash2 size={18} className="cursor-pointer" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}