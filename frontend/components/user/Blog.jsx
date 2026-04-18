import Image from 'next/image'

export default function Blog() {
  const blogs = [
    {
      title: "How to Build Scalable Web Apps",
      content: "Learn how to design scalable systems using modern tools...",
      slug: "scalable-web-apps",
      author: "Admin",
      tags: ["React", "Node.js"],
      imageUrl: "/images/blog1.jpg",
      status: "published",
      createdAt: "2026-04-10",
    },
    {
      title: "Understanding REST APIs",
      content: "A beginner-friendly guide to RESTful APIs...",
      slug: "rest-apis",
      author: "Admin",
      tags: ["API", "Backend"],
      imageUrl: "/images/blog2.jpg",
      status: "published",
      createdAt: "2026-04-12",
    },
    {
      title: "JWT Authentication Explained",
      content: "Secure your apps using JWT authentication...",
      slug: "jwt-auth",
      author: "Admin",
      tags: ["Auth", "Security"],
      imageUrl: "/images/blog3.jpg",
      status: "published",
      createdAt: "2026-04-15",
    },
  ];

  return (
    <div className="px-4 md:px-10 lg:px-20 py-16">

      {/* Heading */}
      <h1 className="heading text-3xl md:text-5xl font-bold text-center mb-12">
        Our Blog
      </h1>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {blogs.map((blog, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
          >

            {/* Image */}
            <img
              src="/image/teamwork.jpeg"
              alt="picture"
              className="w-full h-48 object-cover"
            />

            {/* Content */}
            <div className="p-5">

              {/* Title */}
              <h2 className="font-heading text-lg font-bold mb-2">
                {blog.title}
              </h2>

              {/* Meta */}
              <p className="text-xs text-gray-500 mb-3">
                By {blog.author} • {blog.createdAt}
              </p>

              {/* Content Preview */}
              <p className="text-sm text-gray-600 mb-4">
                {blog.content.substring(0, 80)}...
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {blog.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs bg-gray-200 px-2 py-1 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Read More */}
              <a
                href={`/blog/${blog.slug}`}
                className="text-blue-600 text-sm font-medium hover:underline"
              >
                Read More →
              </a>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
}