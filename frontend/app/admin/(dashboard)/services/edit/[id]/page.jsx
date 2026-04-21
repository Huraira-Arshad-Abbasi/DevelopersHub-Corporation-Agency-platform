"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getServices, updateService } from "@/lib/api";
import ServiceForm from "@/components/admin/forms/ServiceForm";

export default function EditServicePage() {
  const { id } = useParams();
  const router = useRouter();

  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const res = await getServices();
      const service = res.data.find((s) => s._id === id);
      setInitialData(service);
    };
    fetch();
  }, [id]);

  const handleSubmit = async (data) => {
    try {
      await updateService(id, data);
      alert("Service updated!");
      router.push("/admin/services");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  if (!initialData) return <p>Loading...</p>;

  return (
    <div>
      <ServiceForm mode="edit" initialData={initialData} onSubmit={handleSubmit} />
    </div>
  );
}