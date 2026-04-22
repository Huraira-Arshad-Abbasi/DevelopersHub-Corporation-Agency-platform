"use client";

import { useState, useEffect } from "react";
import { getLeads, updateLeadStatus, deleteLead } from "@/lib/api";
import { Trash2} from "lucide-react";

export default function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 Fetch Leads
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

  // 🔥 Update Status (REAL API)
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

  // 🔥 Delete Lead
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this lead?")) return;

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

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full table-fixed">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3 w-[25%]">Client</th>
              <th className="p-3 w-[20%]">Service</th>
              <th className="p-3 w-[30%]">Details</th>
              <th className="p-3 w-[15%]">Status</th>
              <th className="p-3 w-[10%]">Action</th>
            </tr>
          </thead>

          <tbody>
            {leads.map((lead) => (
              <tr key={lead._id} className="border-t align-top">

                {/* 🔥 Name + Email Combined */}
                <td className="p-3">
                  <p className="font-medium">{lead.name}</p>
                  <p className="text-sm text-gray-500 ">
                    {lead.email}
                  </p>
                </td>

                {/* Service */}
                <td className="p-3 ">
                  {lead.serviceInterested || "-"}
                </td>

                {/* Details */}
                <td className="p-3  text-sm text-gray-700">
                  {lead.details}
                </td>

                {/* Status */}
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

                {/* Delete */}
                <td className="p-3">
                  <button
                    onClick={() => handleDelete(lead._id)}
                    className="text-red-600 text-sm cursor-pointer hover:underline"
                  >
                    <Trash2 size={20} />
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