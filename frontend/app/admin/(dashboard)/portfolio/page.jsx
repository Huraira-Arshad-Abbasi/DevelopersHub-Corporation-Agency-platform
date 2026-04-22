"use client";

import { useEffect, useState } from "react";
import { getPortfolios, deletePortfolio } from "@/lib/api";
import Link from "next/link";
import { Trash2, SquarePen, CirclePlusIcon } from "lucide-react";

export default function PortfolioPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const res = await getPortfolios();
      setProjects(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch portfolio");
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this project?")) return;

    try {
      await deletePortfolio(id);
      setProjects((prev) =>
        prev.filter((project) => project._id !== id)
      );
    } catch (err) {
      console.error(err);
      alert("Failed to delete project");
    }
  };

  if (loading) return <p>Loading portfolio...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Portfolio</h1>

        <Link
          href="/admin/portfolio/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          <CirclePlusIcon size={20} className="inline" /> Add Project
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
                    className="text-blue-600 cursor-pointer hover:underline"
                  >
                    Visit
                  </a>
                </td>

                <td className="p-3 flex gap-3">
                  <Link
                    href={`/admin/portfolio/edit/${project._id}`}
                    className="text-blue-600 cursor-pointer hover:underline"
                  >
                    <SquarePen size={20} />
                    {/* Edit */}
                  </Link>

                  <button
                    onClick={() => handleDelete(project._id)}
                   className="text-red-600 cursor-pointer hover:underline">
                   <Trash2 size={20} />
                    {/* Delete */}
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