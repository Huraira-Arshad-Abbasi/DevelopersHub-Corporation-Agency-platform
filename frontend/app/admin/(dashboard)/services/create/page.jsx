"use client";

import { useRouter } from "next/navigation";
import { createService } from "@/lib/api";
import ServiceForm from "@/components/admin/forms/ServiceForm";

export default function CreateServicePage() {
  const router = useRouter();

  const handleSubmit = async (data) => {
    try {
      await createService(data);
      router.push("/admin/services");
    } catch (err) {
      console.error(err);
      alert("Failed to create service");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Create Service
      </h1>

      <ServiceForm mode="create" onSubmit={handleSubmit} />
    </div>
  );
}