"use client";

import { useEffect, useState } from "react";
import {
  getServices,
  getPortfolios,
  getBlogs,
  getLeads,
  getBookings,
} from "@/lib/api";

import { Users, Briefcase, FileText, Calendar } from "lucide-react";

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [recentLeads, setRecentLeads] = useState([]);
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [
          servicesRes,
          portfolioRes,
          blogsRes,
          leadsRes,
          bookingsRes,
        ] = await Promise.all([
          getServices(),
          getPortfolios(),
          getBlogs(),
          getLeads(),
          getBookings(),
        ]);

        const services = servicesRes.data;
        const portfolio = portfolioRes.data;
        const blogs = blogsRes.data;
        const leads = leadsRes.data;
        const bookings = bookingsRes.data;

        // 🔥 Set stats
        setStats([
          {
            title: "Services",
            value: services.length,
            icon: <Briefcase />,
            color: "bg-blue-100 text-blue-600",
          },
          {
            title: "Portfolio",
            value: portfolio.length,
            icon: <Briefcase />,
            color: "bg-purple-100 text-purple-600",
          },
          {
            title: "Blogs",
            value: blogs.length,
            icon: <FileText />,
            color: "bg-yellow-100 text-yellow-600",
          },
          {
            title: "Leads",
            value: leads.length,
            icon: <Users />,
            color: "bg-green-100 text-green-600",
          },
          {
            title: "Bookings",
            value: bookings.length,
            icon: <Calendar />,
            color: "bg-red-100 text-red-600",
          },
        ]);

        // 🔥 Latest 5
        setRecentLeads(leads.slice(0, 5));
        setRecentBookings(bookings.slice(0, 5));

      } catch (err) {
        console.error(err);
        alert("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div className="space-y-8">

      <h1 className="text-2xl font-bold">Dashboard Overview</h1>

      {/* Stats */}
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

      {/* Bottom */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* Leads */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">Recent Leads</h2>

          <ul className="space-y-3">
            {recentLeads.map((lead) => (
              <li key={lead._id} className="flex justify-between border-b pb-2">
                <div>
                  <p className="font-medium">{lead.name}</p>
                  <p className="text-sm text-gray-500">
                    {lead.serviceInterested}
                  </p>
                </div>

                <span className="text-xs px-2 py-1 rounded bg-gray-200">
                  {lead.status}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bookings */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">Recent Bookings</h2>

          <ul className="space-y-3">
            {recentBookings.map((booking) => (
              <li key={booking._id} className="flex justify-between border-b pb-2">
                <div>
                  <p className="font-medium">{booking.clientName}</p>
                  <p className="text-sm text-gray-500">
                    {booking.service}
                  </p>
                </div>

                <span className="text-sm text-gray-600">
                  {new Date(booking.dateTime).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}