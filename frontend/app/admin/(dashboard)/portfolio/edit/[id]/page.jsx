"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getPortfolios, updatePortfolio } from "@/lib/api";
import PortfolioForm from "@/components/admin/forms/PortfolioForm";

export default function EditPortfolioPage() {

  const { id } = useParams();
  const router = useRouter();

  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      setLoading(true);
      try {
        const data = await getPortfolios();
        const portfolio = data.data.find((p) => p._id === id);
        setPortfolioData(portfolio);
      } catch (error) {
        console.error("Error fetching portfolio:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [id]);


  const handleSubmit = async (updatedData) => {
    try {
      await updatePortfolio(id, updatedData);
      router.push("/admin/portfolio");
    } catch (error) {
      console.error("Error updating portfolio:", error);
      alert("Failed to update portfolio item");
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <PortfolioForm mode="edit" initialData={portfolioData} onSubmit={handleSubmit} />
    </div>
  );
}