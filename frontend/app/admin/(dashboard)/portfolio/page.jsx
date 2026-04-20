"use client";

import Link from "next/link";

export default function PortfolioPage() {
  const projects = [
    {
      _id: "1",
      title: "E-Commerce App",
      technologies: ["React", "Node"],
      liveUrl: "#",
    },
    {
      _id: "2",
      title: "Booking System",
      technologies: ["MERN"],
      liveUrl: "#",
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Portfolio</h1>

        <Link
          href="/admin/portfolio/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          + Add Project
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Technologies</th>
              <th className="p-3">Live</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {projects.map((project) => (
              <tr key={project._id} className="border-t">
                <td className="p-3">{project.title}</td>

                <td className="p-3">
                  {project.technologies.join(", ")}
                </td>

                <td className="p-3">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    className="text-blue-600"
                  >
                    Visit
                  </a>
                </td>

                <td className="p-3 flex gap-3">
                  <Link
                    href={`/admin/portfolio/edit/${project._id}`}
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