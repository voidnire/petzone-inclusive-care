
import { useState } from "react";
import { Dashboard } from "@/components/Dashboard";
import { PetManagement } from "@/components/PetManagement";
import { MedicalRecords } from "@/components/MedicalRecords";
import { Clinics } from "@/components/Clinics";
import { EducationalContent } from "@/components/EducationalContent";
import { Chatbot } from "@/components/Chatbot";
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
      case "chatbot":
        return <Chatbot />;
      case "education":
        return <EducationalContent />;
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
