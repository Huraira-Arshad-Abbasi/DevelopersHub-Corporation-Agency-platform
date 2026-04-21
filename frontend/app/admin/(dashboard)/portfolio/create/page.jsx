"use client";

import { useRouter } from "next/navigation";
import { createPortfolio } from "@/lib/api";
import PortfolioForm from "@/components/admin/forms/PortfolioForm";

export default function CreatePortfolioPage() {
  const router = useRouter();

  const handleSubmit = async (data) => {
    try {
      await createPortfolio(data);
      router.push("/admin/portfolio");
    } catch (err) {
      console.error(err);
      alert("Failed to create portfolio item");
    }
  };
  return (
    <div>
      <PortfolioForm mode="create" onSubmit={handleSubmit} />
    </div>
  );
}