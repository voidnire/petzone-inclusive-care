
import { Users, Calendar, FileText, MapPin, BookOpen, Home, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navigation = ({ activeTab, setActiveTab }: NavigationProps) => {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "pets", label: "Meus Pets", icon: Users },
    { id: "records", label: "Prontuário", icon: FileText },
    { id: "clinics", label: "Clínicas", icon: MapPin },
    { id: "chatbot", label: "Miaubot", icon: Bot },
    { id: "education", label: "Educação", icon: BookOpen },
  ];

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 pet-gradient rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">🐾</span>
            </div>
            <h1 className="text-xl font-bold text-pet-blue">PetZone</h1>
          </div>
          
          <div className="hidden md:flex space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "default" : "ghost"}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 ${
                    activeTab === item.id ? "bg-pet-blue text-white" : ""
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Button>
              );
            })}
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="sm">
              Menu
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
