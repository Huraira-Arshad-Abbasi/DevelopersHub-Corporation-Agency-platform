"use client";

import { useState } from "react";

export default function LeadsPage() {
  const [leads, setLeads] = useState([
    {
      _id: "1",
      name: "Ali Khan",
      email: "ali@example.com",
      phone: "03001234567",
      serviceInterested: "Web Development",
      details: "Need a website",
      status: "new",
    },
    {
      _id: "2",
      name: "Sara Ahmed",
      email: "sara@example.com",
      phone: "03111234567",
      serviceInterested: "UI/UX",
      details: "Design required",
      status: "contacted",
    },
  ]);

  const handleStatusChange = (id, newStatus) => {
    const updated = leads.map((lead) =>
      lead._id === id ? { ...lead, status: newStatus } : lead
    );
    setLeads(updated);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Leads</h1>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Service</th>
              <th className="p-3">Details</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {leads.map((lead) => (
              <tr key={lead._id} className="border-t">
                <td className="p-3">{lead.name}</td>
                <td className="p-3">{lead.email}</td>
                <td className="p-3">{lead.serviceInterested}</td>
                <td className="p-3">{lead.details}</td>

                <td className="p-3">
                  <select
                    value={lead.status}
                    onChange={(e) =>
                      handleStatusChange(lead._id, e.target.value)
                    }
                    className="border px-2 py-1 rounded-md"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="closed">Closed</option>
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