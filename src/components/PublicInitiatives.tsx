
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MapPin, Calendar, Heart, Search, Filter, Bell, Phone } from "lucide-react";

export const PublicInitiatives = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  const initiatives = [
    {
      id: 1,
      title: "Campanha de Vacinação Antirrábica",
      type: "Vacinação",
      location: "Centro de Manaus",
      address: "Av. Eduardo Ribeiro, 123",
      date: "2024-01-15",
      time: "08:00 - 17:00",
      description: "Vacinação gratuita contra raiva para cães e gatos",
      requirements: ["RG do proprietário", "Comprovante de residência"],
      contact: "(92) 3232-1234",
      status: "Ativo",
      remainingDays: 5
    },
    {
      id: 2,
      title: "Castração Gratuita",
      type: "Castração",
      location: "Zona Norte",
      address: "Rua dos Veterinários, 456",
      date: "2024-01-20",
      time: "07:00 - 16:00",
      description: "Programa de castração gratuita para controle populacional",
      requirements: ["RG do proprietário", "Comprovante de renda", "Animal em jejum"],
      contact: "(92) 3232-5678",
      status: "Inscrições Abertas",
      remainingDays: 10
    },
    {
      id: 3,
      title: "Doação de Ração e Medicamentos",
      type: "Doação",
      location: "Centro Administrativo",
      address: "Av. Brasil, 789",
      date: "2024-01-18",
      time: "09:00 - 15:00",
      description: "Distribuição de ração e medicamentos básicos",
      requirements: ["RG do proprietário", "Comprovante de baixa renda"],
      contact: "(92) 3232-9012",
      status: "Ativo",
      remainingDays: 8
    },
    {
      id: 4,
      title: "Vermifugação Comunitária",
      type: "Medicamentos",
      location: "Zona Sul",
      address: "Rua da Saúde, 321",
      date: "2024-01-25",
      time: "08:00 - 16:00",
      description: "Aplicação gratuita de vermífugo em cães e gatos",
      requirements: ["RG do proprietário", "Cartão de vacinação do animal"],
      contact: "(92) 3232-3456",
      status: "Em Breve",
      remainingDays: 15
    }
  ];

  const types = ["all", "Vacinação", "Castração", "Doação", "Medicamentos"];

  const filteredInitiatives = initiatives.filter(initiative => {
    const matchesSearch = initiative.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         initiative.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || initiative.type === selectedType;
    
    return matchesSearch && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ativo": return "bg-green-100 text-green-800";
      case "Inscrições Abertas": return "bg-blue-100 text-blue-800";
      case "Em Breve": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Vacinação": return "bg-blue-100 text-blue-800";
      case "Castração": return "bg-purple-100 text-purple-800";
      case "Doação": return "bg-green-100 text-green-800";
      case "Medicamentos": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Iniciativas Públicas</h2>
          <p className="text-slate-600 mt-1">Campanhas e programas gratuitos para o seu pet.</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
          <Input
            placeholder="Buscar por campanha ou localização..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-slate-600" />
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pet-blue"
          >
            <option value="all">Todos os tipos</option>
            {types.slice(1).map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Campanhas Ativas</p>
                <p className="text-2xl font-bold text-slate-900">
                  {filteredInitiatives.filter(i => i.status === "Ativo").length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Heart className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Inscrições Abertas</p>
                <p className="text-2xl font-bold text-slate-900">
                  {filteredInitiatives.filter(i => i.status === "Inscrições Abertas").length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Próximas</p>
                <p className="text-2xl font-bold text-slate-900">
                  {filteredInitiatives.filter(i => i.status === "Em Breve").length}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Bell className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Locais Disponíveis</p>
                <p className="text-2xl font-bold text-slate-900">
                  {new Set(filteredInitiatives.map(i => i.location)).size}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <MapPin className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Initiatives List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredInitiatives.map((initiative) => (
          <Card key={initiative.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2">{initiative.title}</CardTitle>
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge className={getTypeColor(initiative.type)}>
                      {initiative.type}
                    </Badge>
                    <Badge className={getStatusColor(initiative.status)}>
                      {initiative.status}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-slate-600">
                    {initiative.remainingDays} dias
                  </div>
                  <div className="text-xs text-slate-500">restantes</div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-slate-600 text-sm">{initiative.description}</p>

              <div className="flex items-center space-x-2 text-slate-600">
                <MapPin className="h-4 w-4" />
                <div>
                  <div className="text-sm font-medium">{initiative.location}</div>
                  <div className="text-xs">{initiative.address}</div>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-slate-600">
                <Calendar className="h-4 w-4" />
                <div>
                  <div className="text-sm font-medium">
                    {new Date(initiative.date).toLocaleDateString('pt-BR')}
                  </div>
                  <div className="text-xs">{initiative.time}</div>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-slate-600">
                <Phone className="h-4 w-4" />
                <span className="text-sm">{initiative.contact}</span>
              </div>

              <div>
                <p className="text-sm font-medium text-slate-700 mb-2">Documentos necessários:</p>
                <div className="space-y-1">
                  {initiative.requirements.map((req, index) => (
                    <div key={index} className="text-xs text-slate-600 flex items-center">
                      <div className="w-1 h-1 bg-slate-400 rounded-full mr-2"></div>
                      {req}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2 pt-2">
                <Button variant="outline" className="flex-1">
                  <MapPin className="mr-2 h-4 w-4" />
                  Ver no Mapa
                </Button>
                <Button className="flex-1 bg-pet-blue hover:bg-blue-600">
                  <Bell className="mr-2 h-4 w-4" />
                  Adicionar Lembrete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredInitiatives.length === 0 && (
        <div className="text-center py-12">
          <Heart className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-600 mb-2">
            Nenhuma iniciativa encontrada
          </h3>
          <p className="text-slate-500">
            Tente ajustar os filtros de busca ou tipo de campanha.
          </p>
        </div>
      )}
    </div>
  );
};
