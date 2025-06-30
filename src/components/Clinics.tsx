import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MapPin, Phone, Clock, Star, Search, Filter } from "lucide-react";

export const Clinics = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");

  const clinics = [
    {
      id: 1,
      name: "Clínica Veterinária PetCare",
      address: "Rua das Flores, 123 - Centro",
      phone: "(11) 9999-8888",
      whatsapp: "(11) 99999-8888",
      rating: 4.8,
      reviews: 127,
      distance: "1.2 km",
      specialties: ["Clínica Geral", "Cirurgia", "Dermatologia"],
      openHours: "08:00 - 18:00",
      image: "🏥",
      isOpen: true,
      priceRange: "$$",
      accessibility: {
        visualImpairment: true,
        wheelchairAccess: true,
        brailleSignage: false,
        audioGuidance: true
      }
    },
    {
      id: 2,
      name: "Hospital Veterinário Animal Life",
      address: "Av. Principal, 456 - Jardins",
      phone: "(11) 8888-7777",
      whatsapp: "(11) 98888-7777",
      rating: 4.9,
      reviews: 203,
      distance: "2.1 km",
      specialties: ["Emergência 24h", "Oncologia", "Cardiologia"],
      openHours: "24 horas",
      image: "🏨",
      isOpen: true,
      priceRange: "$$$",
      accessibility: {
        visualImpairment: true,
        wheelchairAccess: true,
        brailleSignage: true,
        audioGuidance: true
      }
    },
    {
      id: 3,
      name: "Clínica Bichos & Cia",
      address: "Rua dos Animais, 789 - Vila Nova",
      phone: "(11) 7777-6666",
      whatsapp: "(11) 97777-6666",
      rating: 4.5,
      reviews: 89,
      distance: "3.5 km",
      specialties: ["Clínica Geral", "Vacinação", "Banho e Tosa"],
      openHours: "07:00 - 19:00",
      image: "🐾",
      isOpen: true,
      priceRange: "$",
      accessibility: {
        visualImpairment: false,
        wheelchairAccess: true,
        brailleSignage: false,
        audioGuidance: false
      }
    },
    {
      id: 4,
      name: "Centro Veterinário Especializado",
      address: "Rua Especialista, 321 - Bela Vista",
      phone: "(11) 6666-5555",
      whatsapp: "(11) 96666-5555",
      rating: 4.7,
      reviews: 156,
      distance: "4.2 km",
      specialties: ["Neurologia", "Oftalmologia", "Fisioterapia"],
      openHours: "08:00 - 17:00",
      image: "🔬",
      isOpen: false,
      priceRange: "$$$",
      accessibility: {
        visualImpairment: true,
        wheelchairAccess: true,
        brailleSignage: true,
        audioGuidance: true
      }
    }
  ];

  const specialties = ["all", "Clínica Geral", "Emergência 24h", "Cirurgia", "Dermatologia", "Oncologia"];

  const filteredClinics = clinics.filter(clinic => {
    const matchesSearch = clinic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         clinic.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === "all" || 
                            clinic.specialties.includes(selectedSpecialty);
    
    return matchesSearch && matchesSpecialty;
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  const getPriceRangeText = (range: string) => {
    switch (range) {
      case "$": return "Econômico";
      case "$$": return "Moderado";
      case "$$$": return "Premium";
      default: return "Consultar";
    }
  };

  const getAccessibilityBadges = (accessibility: any) => {
    const badges = [];
    if (accessibility.visualImpairment) badges.push("Deficiência Visual");
    if (accessibility.wheelchairAccess) badges.push("Cadeira de Rodas");
    if (accessibility.brailleSignage) badges.push("Braille");
    if (accessibility.audioGuidance) badges.push("Áudio Guia");
    return badges;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Clínicas Veterinárias</h2>
          <p className="text-slate-600 mt-1">Encontre a clínica ideal para o seu pet com recursos de acessibilidade.</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
          <Input
            placeholder="Buscar por nome ou localização..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-slate-600" />
          <select
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pet-blue"
          >
            <option value="all">Todas as especialidades</option>
            {specialties.slice(1).map(specialty => (
              <option key={specialty} value={specialty}>{specialty}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Clínicas Encontradas</p>
                <p className="text-2xl font-bold text-slate-900">{filteredClinics.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <MapPin className="h-6 w-6 text-pet-blue" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Abertas Agora</p>
                <p className="text-2xl font-bold text-slate-900">
                  {filteredClinics.filter(c => c.isOpen).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-pet-green" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Avaliação Média</p>
                <p className="text-2xl font-bold text-slate-900">
                  {(filteredClinics.reduce((acc, c) => acc + c.rating, 0) / filteredClinics.length).toFixed(1)}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Star className="h-6 w-6 text-yellow-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Clinics List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredClinics.map((clinic) => (
          <Card key={clinic.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{clinic.image}</div>
                  <div>
                    <CardTitle className="text-lg">{clinic.name}</CardTitle>
                    <div className="flex items-center space-x-1 mt-1">
                      {renderStars(clinic.rating)}
                      <span className="text-sm text-slate-600 ml-2">
                        {clinic.rating} ({clinic.reviews} avaliações)
                      </span>
                    </div>
                  </div>
                </div>
                <Badge variant={clinic.isOpen ? "default" : "secondary"}>
                  {clinic.isOpen ? "Aberto" : "Fechado"}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2 text-slate-600">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{clinic.address}</span>
                <Badge variant="outline" className="ml-auto">
                  {clinic.distance}
                </Badge>
              </div>

              <div className="flex items-center space-x-2 text-slate-600">
                <Phone className="h-4 w-4" />
                <span className="text-sm">{clinic.phone}</span>
              </div>

              <div className="flex items-center space-x-2 text-slate-600">
                <Clock className="h-4 w-4" />
                <span className="text-sm">{clinic.openHours}</span>
                <Badge variant="outline" className="ml-auto">
                  {getPriceRangeText(clinic.priceRange)}
                </Badge>
              </div>

              {/* Accessibility Section */}
              <div>
                <p className="text-sm font-medium text-slate-700 mb-2">Acessibilidade:</p>
                <div className="flex flex-wrap gap-2">
                  {getAccessibilityBadges(clinic.accessibility).map((badge, index) => (
                    <Badge key={index} variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                      {badge}
                    </Badge>
                  ))}
                  {getAccessibilityBadges(clinic.accessibility).length === 0 && (
                    <span className="text-xs text-slate-500">Informações não disponíveis</span>
                  )}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-slate-700 mb-2">Especialidades:</p>
                <div className="flex flex-wrap gap-2">
                  {clinic.specialties.map((specialty, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2 pt-2">
                <Button variant="outline" className="flex-1">
                  Ver Detalhes
                </Button>
                <Button 
                  className="flex-1 bg-pet-blue hover:bg-blue-600"
                  onClick={() => window.open(`https://wa.me/${clinic.whatsapp.replace(/\D/g, '')}`, '_blank')}
                >
                  WhatsApp
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredClinics.length === 0 && (
        <div className="text-center py-12">
          <MapPin className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-600 mb-2">
            Nenhuma clínica encontrada
          </h3>
          <p className="text-slate-500">
            Tente ajustar os filtros de busca ou especialidade.
          </p>
        </div>
      )}
    </div>
  );
};
