
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Users, FileText, Clock, MapPin, Home, Bell, Heart, Plus } from "lucide-react";

export const Dashboard = () => {
  const [appointmentType, setAppointmentType] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");

  const stats = [
    { title: "Pets Cadastrados", value: "3", icon: Users, color: "bg-blue-500" },
    { title: "Consultas Agendadas", value: "2", icon: Calendar, color: "bg-green-500" },
    { title: "Vacinas em Dia", value: "2/3", icon: Heart, color: "bg-red-500" },
    { title: "Lembretes Pendentes", value: "4", icon: Bell, color: "bg-yellow-500" },
  ];

  const recentActivities = [
    { type: "consulta", pet: "Luna", action: "Consulta de rotina realizada", date: "15/12/2024", status: "concluído" },
    { type: "vacina", pet: "Max", action: "Vacina V10 aplicada", date: "10/12/2024", status: "concluído" },
    { type: "agendamento", pet: "Buddy", action: "Consulta agendada para 20/12", date: "18/12/2024", status: "pendente" },
  ];

  const upcomingReminders = [
    { pet: "Luna", task: "Vermífugo", date: "25/12/2024", priority: "alta" },
    { pet: "Max", task: "Check-up", date: "28/12/2024", priority: "média" },
    { pet: "Buddy", task: "Banho e Tosa", date: "30/12/2024", priority: "baixa" },
  ];

  const availableVets = [
    { 
      id: 1, 
      name: "Dr. Silva", 
      specialty: "Clínica Geral", 
      homeService: true, 
      rating: 4.8,
      nextAvailable: "Hoje 14:00",
      price: "R$ 150,00"
    },
    { 
      id: 2, 
      name: "Dra. Costa", 
      specialty: "Cardiologia", 
      homeService: true, 
      rating: 4.9,
      nextAvailable: "Amanhã 09:00",
      price: "R$ 200,00"
    },
    { 
      id: 3, 
      name: "Dr. Oliveira", 
      specialty: "Dermatologia", 
      homeService: true, 
      rating: 4.7,
      nextAvailable: "Amanhã 16:00",
      price: "R$ 180,00"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Dashboard</h2>
          <p className="text-slate-600 mt-1">Bem-vindo ao PetZone! Gerencie a saúde dos seus pets.</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-pet-blue hover:bg-blue-600 text-white">
              <Plus className="mr-2 h-4 w-4" />
              Agendar Consulta
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Agendar Nova Consulta</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="pet">Pet *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o pet" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="luna">Luna</SelectItem>
                      <SelectItem value="max">Max</SelectItem>
                      <SelectItem value="buddy">Buddy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="type">Tipo de Atendimento *</Label>
                  <Select value={appointmentType} onValueChange={setAppointmentType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="clinica">Na Clínica</SelectItem>
                      <SelectItem value="domiciliar">Atendimento Domiciliar</SelectItem>
                      <SelectItem value="emergencia">Emergência</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {appointmentType === "domiciliar" && (
                <div>
                  <Label htmlFor="address">Endereço para Atendimento *</Label>
                  <Textarea 
                    id="address"
                    value={selectedAddress}
                    onChange={(e) => setSelectedAddress(e.target.value)}
                    placeholder="Digite seu endereço completo..."
                    className="min-h-[80px]"
                  />
                </div>
              )}

              <div>
                <Label htmlFor="specialty">Especialidade</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a especialidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="geral">Clínica Geral</SelectItem>
                    <SelectItem value="cardiologia">Cardiologia</SelectItem>
                    <SelectItem value="dermatologia">Dermatologia</SelectItem>
                    <SelectItem value="cirurgia">Cirurgia</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {appointmentType === "domiciliar" && (
                <div className="space-y-3">
                  <Label>Veterinários Disponíveis para Atendimento Domiciliar</Label>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {availableVets.map((vet) => (
                      <div key={vet.id} className="p-3 border rounded-lg hover:bg-slate-50 cursor-pointer">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-slate-900">{vet.name}</h4>
                            <p className="text-sm text-slate-600">{vet.specialty}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Home className="h-4 w-4 text-pet-blue" />
                              <span className="text-sm text-pet-blue">Atende em casa</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant="outline">{vet.rating} ⭐</Badge>
                            <p className="text-sm text-slate-600 mt-1">{vet.nextAvailable}</p>
                            <p className="text-sm font-semibold text-pet-blue">{vet.price}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Data Preferida</Label>
                  <Input type="date" id="date" />
                </div>
                <div>
                  <Label htmlFor="time">Horário Preferido</Label>
                  <Input type="time" id="time" />
                </div>
              </div>

              <div>
                <Label htmlFor="notes">Observações</Label>
                <Textarea 
                  id="notes" 
                  placeholder="Descreva sintomas, comportamento ou informações importantes..."
                />
              </div>

              <Button className="w-full bg-pet-blue hover:bg-blue-600">
                Confirmar Agendamento
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-pet-blue" />
              <span>Atividades Recentes</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 bg-slate-50 rounded-lg">
                  <div className="w-10 h-10 pet-gradient rounded-full flex items-center justify-center">
                    {activity.type === "consulta" && <FileText className="h-5 w-5 text-white" />}
                    {activity.type === "vacina" && <Heart className="h-5 w-5 text-white" />}
                    {activity.type === "agendamento" && <Calendar className="h-5 w-5 text-white" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900">{activity.pet}</p>
                    <p className="text-sm text-slate-600">{activity.action}</p>
                    <p className="text-xs text-slate-500">{activity.date}</p>
                  </div>
                  <Badge variant={activity.status === "concluído" ? "default" : "secondary"}>
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Reminders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-pet-green" />
              <span>Próximos Lembretes</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingReminders.map((reminder, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-slate-900">{reminder.pet}</p>
                    <p className="text-sm text-slate-600">{reminder.task}</p>
                    <p className="text-xs text-slate-500">{reminder.date}</p>
                  </div>
                  <Badge 
                    variant={
                      reminder.priority === "alta" ? "destructive" : 
                      reminder.priority === "média" ? "default" : "secondary"
                    }
                  >
                    {reminder.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button variant="outline" className="p-6 h-auto flex-col space-y-2">
              <Users className="h-8 w-8 text-pet-blue" />
              <span className="font-semibold">Gerenciar Pets</span>
            </Button>
            
            <Button variant="outline" className="p-6 h-auto flex-col space-y-2">
              <FileText className="h-8 w-8 text-pet-green" />
              <span className="font-semibold">Ver Prontuários</span>
            </Button>
            
            <Button variant="outline" className="p-6 h-auto flex-col space-y-2">
              <MapPin className="h-8 w-8 text-purple-500" />
              <span className="font-semibold">Encontrar Clínicas</span>
            </Button>
            
            <Button variant="outline" className="p-6 h-auto flex-col space-y-2">
              <Home className="h-8 w-8 text-orange-500" />
              <span className="font-semibold">Atendimento Domiciliar</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
