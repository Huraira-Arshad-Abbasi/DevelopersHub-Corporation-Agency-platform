import ServiceForm from "@/components/admin/forms/ServiceForm";

export default function EditServicePage() {
  // later fetch data using id

  const dummyData = {
    title: "Web Development",
    description: "Build modern apps",
    icon: "code",
    isActive: true,
  };

  return (
    <div>
      <ServiceForm mode="edit" initialData={dummyData} />
    </div>
  );
}