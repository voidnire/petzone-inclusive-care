
import { useState } from "react";
import { Dashboard } from "@/components/Dashboard";
import { PetManagement } from "@/components/PetManagement";
import { MedicalRecords } from "@/components/MedicalRecords";
import { Clinics } from "@/components/Clinics";
import { PublicInitiatives } from "@/components/PublicInitiatives";
import { Navigation } from "@/components/Navigation";
import { VoiceNavigation } from "@/components/VoiceNavigation";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleVoiceCommand = (command: string) => {
    if (command.includes("clínicas") || command.includes("veterinário")) {
      setActiveTab("clinics");
    } else if (command.includes("iniciativas") || command.includes("públicas")) {
      setActiveTab("initiatives");
    } else if (command.includes("histórico") || command.includes("pet")) {
      setActiveTab("records");
    } else if (command.includes("dashboard") || command.includes("início")) {
      setActiveTab("dashboard");
    } else if (command.includes("pets") || command.includes("animais")) {
      setActiveTab("pets");
    }
  };

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
      case "initiatives":
        return <PublicInitiatives />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            {renderContent()}
          </div>
          <div className="lg:col-span-1">
            <VoiceNavigation onVoiceCommand={handleVoiceCommand} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
