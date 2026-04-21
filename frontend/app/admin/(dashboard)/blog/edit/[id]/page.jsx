"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getBlogs, updateBlog } from "@/lib/api";
import BlogForm from "@/components/admin/forms/BlogForm";

export default function EditBlogPage() {
  const { id } = useParams();
  const router = useRouter();
  
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const data = await getBlogs();
        const blog = data.data.find((b) => b._id === id);
        setBlogData(blog);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [id]);

  const handleSubmit = async (updatedData) => {
    try {
      await updateBlog(id, updatedData);
      router.push("/admin/blog");
    } catch (error) {
      console.error("Error updating blog:", error);
      alert("Failed to update blog");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <BlogForm mode="edit" initialData={blogData} onSubmit={handleSubmit} />
    </div>
  );
}