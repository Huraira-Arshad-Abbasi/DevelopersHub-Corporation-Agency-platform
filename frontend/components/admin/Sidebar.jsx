"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Services", path: "/admin/services" },
    { name: "Portfolio", path: "/admin/portfolio" },
    { name: "Blog", path: "/admin/blog" },
    { name: "Leads", path: "/admin/leads" },
    { name: "Bookings", path: "/admin/bookings" },
  ];

  return (
    <div className="w-64 bg-gray-900 text-blue-500 p-6 min-h-screen">
      <h2 className="text-3xl font-extrabold mb-4 heading text-center">Admin Panel</h2>
      <hr className=" border-gray-700"/>

      <ul className="space-y-3 w-full text-white border-gray-700 pt-2 pb-2">
        {links.map((link) => {
          const isActive = pathname === link.path;

          return (
            <li key={link.path}>
              <Link
                href={link.path}
                className={`block px-4 py-2 rounded-md transition ${
                  isActive
                    ? "bg-blue-600"
                    : "hover:bg-gray-700"
                }`}
              >
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}