
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Plus, Calendar, FileText, Edit } from "lucide-react";

export const PetManagement = () => {
  const [pets, setPets] = useState([
    {
      id: 1,
      name: "Luna",
      type: "Gato",
      breed: "Persa",
      age: "3 anos",
      weight: "4.2 kg",
      color: "Branco",
      gender: "Fêmea",
      microchip: "123456789",
      lastVisit: "15/12/2024",
      nextVaccine: "15/01/2025",
      status: "healthy"
    },
    {
      id: 2,
      name: "Max",
      type: "Cachorro",
      breed: "Golden Retriever",
      age: "5 anos",
      weight: "28.5 kg",
      color: "Dourado",
      gender: "Macho",
      microchip: "987654321",
      lastVisit: "10/12/2024",
      nextVaccine: "10/02/2025",
      status: "attention"
    },
    {
      id: 3,
      name: "Buddy",
      type: "Cachorro",
      breed: "Labrador",
      age: "2 anos",
      weight: "25.0 kg",
      color: "Preto",
      gender: "Macho",
      microchip: "456789123",
      lastVisit: "05/12/2024",
      nextVaccine: "05/03/2025",
      status: "healthy"
    }
  ]);

  const [newPet, setNewPet] = useState({
    name: "",
    type: "",
    breed: "",
    age: "",
    weight: "",
    color: "",
    gender: "",
    microchip: ""
  });

  const handleAddPet = () => {
    if (newPet.name && newPet.type) {
      const pet = {
        ...newPet,
        id: pets.length + 1,
        lastVisit: "Nunca",
        nextVaccine: "A agendar",
        status: "healthy"
      };
      setPets([...pets, pet]);
      setNewPet({
        name: "",
        type: "",
        breed: "",
        age: "",
        weight: "",
        color: "",
        gender: "",
        microchip: ""
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Gerenciamento de Pets</h2>
          <p className="text-slate-600 mt-1">Gerencie as informações dos seus animais de estimação.</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-pet-blue hover:bg-blue-600 text-white">
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Pet
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Pet</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nome *</Label>
                <Input
                  id="name"
                  value={newPet.name}
                  onChange={(e) => setNewPet({...newPet, name: e.target.value})}
                  placeholder="Nome do pet"
                />
              </div>
              
              <div>
                <Label htmlFor="type">Tipo *</Label>
                <Select value={newPet.type} onValueChange={(value) => setNewPet({...newPet, type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cachorro">Cachorro</SelectItem>
                    <SelectItem value="Gato">Gato</SelectItem>
                    <SelectItem value="Pássaro">Pássaro</SelectItem>
                    <SelectItem value="Coelho">Coelho</SelectItem>
                    <SelectItem value="Outros">Outros</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="breed">Raça</Label>
                <Input
                  id="breed"
                  value={newPet.breed}
                  onChange={(e) => setNewPet({...newPet, breed: e.target.value})}
                  placeholder="Raça do pet"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="age">Idade</Label>
                  <Input
                    id="age"
                    value={newPet.age}
                    onChange={(e) => setNewPet({...newPet, age: e.target.value})}
                    placeholder="Ex: 2 anos"
                  />
                </div>
                <div>
                  <Label htmlFor="weight">Peso</Label>
                  <Input
                    id="weight"
                    value={newPet.weight}
                    onChange={(e) => setNewPet({...newPet, weight: e.target.value})}
                    placeholder="Ex: 5.2 kg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="color">Cor</Label>
                  <Input
                    id="color"
                    value={newPet.color}
                    onChange={(e) => setNewPet({...newPet, color: e.target.value})}
                    placeholder="Cor do pet"
                  />
                </div>
                <div>
                  <Label htmlFor="gender">Sexo</Label>
                  <Select value={newPet.gender} onValueChange={(value) => setNewPet({...newPet, gender: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sexo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Macho">Macho</SelectItem>
                      <SelectItem value="Fêmea">Fêmea</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="microchip">Microchip</Label>
                <Input
                  id="microchip"
                  value={newPet.microchip}
                  onChange={(e) => setNewPet({...newPet, microchip: e.target.value})}
                  placeholder="Número do microchip"
                />
              </div>

              <Button onClick={handleAddPet} className="w-full bg-pet-blue hover:bg-blue-600">
                Adicionar Pet
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Pets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pets.map((pet) => (
          <Card key={pet.id} className="card-hover">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-green-400 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                    {pet.name[0]}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{pet.name}</CardTitle>
                    <p className="text-sm text-slate-600">{pet.type} • {pet.breed}</p>
                  </div>
                </div>
                <Badge variant={pet.status === "healthy" ? "default" : "secondary"}>
                  {pet.status === "healthy" ? "Saudável" : "Atenção"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-slate-500">Idade:</span>
                  <p className="font-medium">{pet.age}</p>
                </div>
                <div>
                  <span className="text-slate-500">Peso:</span>
                  <p className="font-medium">{pet.weight}</p>
                </div>
                <div>
                  <span className="text-slate-500">Cor:</span>
                  <p className="font-medium">{pet.color}</p>
                </div>
                <div>
                  <span className="text-slate-500">Sexo:</span>
                  <p className="font-medium">{pet.gender}</p>
                </div>
              </div>
              
              <div className="border-t pt-3 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Última consulta:</span>
                  <span className="font-medium">{pet.lastVisit}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Próxima vacina:</span>
                  <span className="font-medium">{pet.nextVaccine}</span>
                </div>
              </div>

              <div className="flex space-x-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <FileText className="mr-2 h-4 w-4" />
                  Prontuário
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Calendar className="mr-2 h-4 w-4" />
                  Agendar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-pet-blue" />
            <span>Ações Rápidas</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="p-6 h-auto flex-col space-y-2">
              <Calendar className="h-8 w-8 text-pet-blue" />
              <span className="font-semibold">Agendar Consulta</span>
              <span className="text-sm text-slate-500">Para qualquer pet</span>
            </Button>
            
            <Button variant="outline" className="p-6 h-auto flex-col space-y-2">
              <FileText className="h-8 w-8 text-pet-green" />
              <span className="font-semibold">Ver Prontuários</span>
              <span className="text-sm text-slate-500">Histórico médico completo</span>
            </Button>
            
            <Button variant="outline" className="p-6 h-auto flex-col space-y-2">
              <Users className="h-8 w-8 text-purple-500" />
              <span className="font-semibold">Compartilhar Acesso</span>
              <span className="text-sm text-slate-500">Com familiares</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
