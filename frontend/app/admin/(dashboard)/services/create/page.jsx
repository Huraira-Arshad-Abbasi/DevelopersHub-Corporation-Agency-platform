import ServiceForm from "@/components/admin/forms/ServiceForm";

export default function CreateServicePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Create Service
      </h1>

      <ServiceForm mode="create" />
    </div>
  );
}