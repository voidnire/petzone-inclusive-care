
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, Bell, FileText, Clock, MapPin } from "lucide-react";

export const Dashboard = () => {
  const pets = [
    { id: 1, name: "Luna", type: "Gato", age: "3 anos", lastVisit: "15/12/2024", nextVaccine: "15/01/2025", status: "healthy" },
    { id: 2, name: "Max", type: "Cachorro", age: "5 anos", lastVisit: "10/12/2024", nextVaccine: "10/02/2025", status: "attention" },
  ];

  const upcomingAppointments = [
    { pet: "Luna", clinic: "VetCare Centro", date: "20/01/2025", time: "14:30", type: "Consulta de rotina" },
    { pet: "Max", clinic: "Pet Hospital", date: "25/01/2025", time: "09:00", type: "Vacinação" },
  ];

  const pendingReminders = [
    { pet: "Luna", task: "Vermífugo", due: "Hoje", priority: "high" },
    { pet: "Max", task: "Banho e tosa", due: "Amanhã", priority: "medium" },
    { pet: "Buddy", task: "Check-up anual", due: "Em 3 dias", priority: "low" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Dashboard</h2>
          <p className="text-slate-600 mt-1">Bem-vindo de volta! Aqui está um resumo dos seus pets.</p>
        </div>
        <Button className="bg-pet-blue hover:bg-blue-600 text-white">
          <Calendar className="mr-2 h-4 w-4" />
          Agendar Consulta
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total de Pets</p>
                <p className="text-2xl font-bold text-slate-900">3</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-pet-blue" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Consultas Este Mês</p>
                <p className="text-2xl font-bold text-slate-900">5</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-pet-green" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Lembretes Pendentes</p>
                <p className="text-2xl font-bold text-slate-900">3</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Bell className="h-6 w-6 text-orange-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Documentos</p>
                <p className="text-2xl font-bold text-slate-900">12</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pets Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-pet-blue" />
              <span>Meus Pets</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pets.map((pet) => (
                <div key={pet.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-green-400 rounded-full flex items-center justify-center text-white font-semibold">
                      {pet.name[0]}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">{pet.name}</h4>
                      <p className="text-sm text-slate-600">{pet.type} • {pet.age}</p>
                      <p className="text-xs text-slate-500">Última consulta: {pet.lastVisit}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={pet.status === "healthy" ? "default" : "secondary"} className="mb-2">
                      {pet.status === "healthy" ? "Saudável" : "Atenção"}
                    </Badge>
                    <p className="text-xs text-slate-500">Próxima vacina: {pet.nextVaccine}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              Ver todos os pets
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Appointments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-pet-green" />
              <span>Próximas Consultas</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-slate-50 rounded-lg">
                  <div className="w-10 h-10 bg-pet-green rounded-lg flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-900">{appointment.pet}</h4>
                    <p className="text-sm text-slate-600">{appointment.type}</p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-slate-500">
                      <span className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{appointment.date} às {appointment.time}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>{appointment.clinic}</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              Ver todas as consultas
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Pending Reminders */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-orange-500" />
            <span>Lembretes Pendentes</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {pendingReminders.map((reminder, index) => (
              <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-slate-900">{reminder.pet}</h4>
                  <Badge variant={reminder.priority === "high" ? "destructive" : reminder.priority === "medium" ? "default" : "secondary"}>
                    {reminder.priority === "high" ? "Urgente" : reminder.priority === "medium" ? "Médio" : "Baixo"}
                  </Badge>
                </div>
                <p className="text-sm text-slate-600 mb-2">{reminder.task}</p>
                <p className="text-xs text-slate-500">Vencimento: {reminder.due}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
