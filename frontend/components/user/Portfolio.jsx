"use client";

import { useEffect, useState } from "react";
import { getPortfolios } from "@/lib/api";
import Image from "next/image";

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await getPortfolios();
        setProjects(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      } 
    };

    fetchPortfolio();
  }, []);

  if (loading) {
    return <p className="text-center py-20">Loading portfolio...</p>;
  }

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <h2 className="heading text-3xl md:text-5xl font-bold text-center mb-16">
          Our Portfolio
        </h2>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-10">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
            >

              {/* Image */}
              {project.imageUrl && <Image
                src={project.imageUrl}
                alt="picture" 
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />}

              {/* Content */}
              <div className="p-6">

                {/* Title */}
                <h3 className="font-heading text-xl font-bold mb-2">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Button */}
                <a
                  href={project.liveUrl}
                  target="_blank"
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
                >
                  View Project
                </a>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
