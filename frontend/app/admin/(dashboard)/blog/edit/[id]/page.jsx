"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getBlogById, updateBlog } from "@/lib/api";
import BlogForm from "@/components/admin/forms/BlogForm";

export default function EditBlogPage() {
  const { id } = useParams();
  const router = useRouter();

  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const res = await getBlogById(id);
        setBlogData(res.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBlogData();
    
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      await updateBlog(id, formData);

      alert("Blog updated successfully ✅");

      router.push("/admin/blog");
    } catch (error) {
      console.error("Error updating blog:", error);
      alert("Failed to update blog ❌");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <BlogForm
        mode="edit"
        initialData={blogData}
        onSubmit={handleSubmit}
      />
    </div>
  );
}