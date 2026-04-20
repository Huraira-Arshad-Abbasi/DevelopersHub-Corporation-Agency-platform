import PortfolioForm from "@/components/admin/forms/PortfolioForm";

export default function EditPortfolioPage() {
  const dummyData = {
    title: "E-Commerce App",
    description: "Online store",
    imageUrl: "/images/project1.jpg",
    technologies: ["React", "Node"],
    liveUrl: "#",
  };

  return (
    <div>
      <PortfolioForm mode="edit" initialData={dummyData} />
    </div>
  );
}