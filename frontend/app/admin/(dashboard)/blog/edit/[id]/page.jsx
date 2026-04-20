import BlogForm from "@/components/admin/forms/BlogForm";

export default function EditBlogPage() {
  const dummyData = {
    title: "Understanding MERN Stack",
    content: "This is blog content...",
    slug: "understanding-mern-stack",
    author: "Admin",
    tags: ["React", "Node"],
    imageUrl: "/images/blog1.jpg",
    status: "published",
  };

  return (
    <div>
      <BlogForm mode="edit" initialData={dummyData} />
    </div>
  );
}