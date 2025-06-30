
import { useState } from "react";
import { Dashboard } from "@/components/Dashboard";
import { PetManagement } from "@/components/PetManagement";
import { MedicalRecords } from "@/components/MedicalRecords";
import { Clinics } from "@/components/Clinics";
import { Navigation } from "@/components/Navigation";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "pets":
        return <PetManagement />;
      case "records":
        return <MedicalRecords />;
      case "clinics":
        return <Clinics />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
