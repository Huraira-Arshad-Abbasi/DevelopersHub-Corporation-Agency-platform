"use client";

import { Users, Briefcase, FileText, Calendar } from "lucide-react";


export default function DashboardPage() {
  const stats = [
    { title: "Services", value: 12, icon: <Briefcase />, color: "bg-blue-100 text-blue-600" },
    { title: "Portfolio", value: 8, icon: <Briefcase />, color: "bg-purple-100 text-purple-600" },
    { title: "Blogs", value: 15, icon: <FileText />, color: "bg-yellow-100 text-yellow-600" },
    { title: "Leads", value: 24, icon: <Users />, color: "bg-green-100 text-green-600" },
    { title: "Bookings", value: 10, icon: <Calendar />, color: "bg-red-100 text-red-600" },
  ];

  const recentLeads = [
    { name: "Ali Khan", service: "Web Dev", status: "new" },
    { name: "Sara", service: "UI Design", status: "contacted" },
  ];

  const recentBookings = [
    { name: "Ahmed", service: "SEO", date: "20 Apr" },
    { name: "Usman", service: "App Dev", date: "22 Apr" },
  ];

  return (
    <div className="space-y-8">

      {/* Heading */}
      <h1 className="text-2xl font-bold">Dashboard Overview</h1>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-xl shadow-md flex items-center justify-between"
          >
            <div>
              <h3 className="text-gray-500 text-sm">{item.title}</h3>
              <p className="text-2xl font-bold">{item.value}</p>
            </div>

            <div className={`p-3 rounded-full ${item.color}`}>
              {item.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Sections */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* Recent Leads */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">Recent Leads</h2>

          <ul className="space-y-3">
            {recentLeads.map((lead, i) => (
              <li key={i} className="flex justify-between border-b pb-2">
                <div>
                  <p className="font-medium">{lead.name}</p>
                  <p className="text-sm text-gray-500">{lead.service}</p>
                </div>

                <span className="text-xs px-2 py-1 rounded bg-gray-200">
                  {lead.status}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">Recent Bookings</h2>

          <ul className="space-y-3">
            {recentBookings.map((booking, i) => (
              <li key={i} className="flex justify-between border-b pb-2">
                <div>
                  <p className="font-medium">{booking.name}</p>
                  <p className="text-sm text-gray-500">{booking.service}</p>
                </div>

                <span className="text-sm text-gray-600">
                  {booking.date}
                </span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}