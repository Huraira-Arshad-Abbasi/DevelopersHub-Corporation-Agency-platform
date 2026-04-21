"use client";

import { useRouter } from "next/navigation";
import {createBlog} from "@/lib/api";
import BlogForm from "@/components/admin/forms/BlogForm";

export default function CreateBlogPage() {
  const router = useRouter();

  const handleSubmit = async (data) => {
    try {
      await createBlog(data);
      router.push("/admin/blog");
    } catch (err) {
      console.error(err);
      alert("Failed to create blog");
    }
  };

  return (
    <div>
      <BlogForm mode="create" onSubmit={handleSubmit} />
    </div>
  );
}
