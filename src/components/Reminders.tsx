
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bell, Plus, Calendar, Clock, Check, AlertTriangle } from "lucide-react";

export const Reminders = () => {
  const [reminders, setReminders] = useState([
    {
      id: 1,
      pet: "Luna",
      task: "Vermífugo",
      type: "medicamento",
      dueDate: "2025-01-20",
      dueTime: "09:00",
      priority: "high",
      completed: false,
      recurring: "monthly"
    },
    {
      id: 2,
      pet: "Max",
      task: "Banho e tosa",
      type: "higiene",
      dueDate: "2025-01-21",
      dueTime: "14:00",
      priority: "medium",
      completed: false,
      recurring: "monthly"
    },
    {
      id: 3,
      pet: "Buddy",
      task: "Check-up anual",
      type: "consulta",
      dueDate: "2025-01-23",
      dueTime: "10:30",
      priority: "low",
      completed: false,
      recurring: "yearly"
    },
    {
      id: 4,
      pet: "Luna",
      task: "Escovação dos dentes",
      type: "higiene",
      dueDate: "2025-01-19",
      dueTime: "20:00",
      priority: "medium",
      completed: true,
      recurring: "weekly"
    }
  ]);

  const [newReminder, setNewReminder] = useState({
    pet: "",
    task: "",
    type: "",
    dueDate: "",
    dueTime: "",
    priority: "medium",
    recurring: "none"
  });

  const toggleReminder = (id: number) => {
    setReminders(reminders.map(reminder => 
      reminder.id === id ? { ...reminder, completed: !reminder.completed } : reminder
    ));
  };

  const addReminder = () => {
    if (newReminder.pet && newReminder.task && newReminder.dueDate) {
      const reminder = {
        ...newReminder,
        id: reminders.length + 1,
        completed: false
      };
      setReminders([...reminders, reminder]);
      setNewReminder({
        pet: "",
        task: "",
        type: "",
        dueDate: "",
        dueTime: "",
        priority: "medium",
        recurring: "none"
      });
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "default";
      case "low": return "secondary";
      default: return "default";
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "high": return "Urgente";
      case "medium": return "Médio";
      case "low": return "Baixo";
      default: return "Médio";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "medicamento": return "💊";
      case "consulta": return "🏥";
      case "higiene": return "🛁";
      case "exercicio": return "🏃";
      default: return "📋";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return "Hoje";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Amanhã";
    } else {
      return date.toLocaleDateString('pt-BR');
    }
  };

  const upcomingReminders = reminders.filter(r => !r.completed);
  const completedReminders = reminders.filter(r => r.completed);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Lembretes</h2>
          <p className="text-slate-600 mt-1">Gerencie os cuidados e compromissos dos seus pets.</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-pet-blue hover:bg-blue-600 text-white">
              <Plus className="mr-2 h-4 w-4" />
              Novo Lembrete
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Criar Novo Lembrete</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="pet">Pet *</Label>
                <Select value={newReminder.pet} onValueChange={(value) => setNewReminder({...newReminder, pet: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o pet" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Luna">Luna</SelectItem>
                    <SelectItem value="Max">Max</SelectItem>
                    <SelectItem value="Buddy">Buddy</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="task">Tarefa *</Label>
                <Input
                  id="task"
                  value={newReminder.task}
                  onChange={(e) => setNewReminder({...newReminder, task: e.target.value})}
                  placeholder="Descrição da tarefa"
                />
              </div>

              <div>
                <Label htmlFor="type">Tipo</Label>
                <Select value={newReminder.type} onValueChange={(value) => setNewReminder({...newReminder, type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tipo de lembrete" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="medicamento">Medicamento</SelectItem>
                    <SelectItem value="consulta">Consulta</SelectItem>
                    <SelectItem value="higiene">Higiene</SelectItem>
                    <SelectItem value="exercicio">Exercício</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dueDate">Data *</Label>
                  <Input
                    type="date"
                    id="dueDate"
                    value={newReminder.dueDate}
                    onChange={(e) => setNewReminder({...newReminder, dueDate: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="dueTime">Horário</Label>
                  <Input
                    type="time"
                    id="dueTime"
                    value={newReminder.dueTime}
                    onChange={(e) => setNewReminder({...newReminder, dueTime: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="priority">Prioridade</Label>
                <Select value={newReminder.priority} onValueChange={(value) => setNewReminder({...newReminder, priority: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">Urgente</SelectItem>
                    <SelectItem value="medium">Médio</SelectItem>
                    <SelectItem value="low">Baixo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="recurring">Recorrência</Label>
                <Select value={newReminder.recurring} onValueChange={(value) => setNewReminder({...newReminder, recurring: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Não repete</SelectItem>
                    <SelectItem value="daily">Diário</SelectItem>
                    <SelectItem value="weekly">Semanal</SelectItem>
                    <SelectItem value="monthly">Mensal</SelectItem>
                    <SelectItem value="yearly">Anual</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={addReminder} className="w-full bg-pet-blue hover:bg-blue-600">
                Criar Lembrete
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Pendentes</p>
                <p className="text-2xl font-bold text-slate-900">{upcomingReminders.length}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Bell className="h-6 w-6 text-orange-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Concluídos Hoje</p>
                <p className="text-2xl font-bold text-slate-900">{completedReminders.length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Check className="h-6 w-6 text-pet-green" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Urgentes</p>
                <p className="text-2xl font-bold text-slate-900">
                  {upcomingReminders.filter(r => r.priority === "high").length}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Reminders */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-orange-500" />
            <span>Próximos Lembretes</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingReminders.map((reminder) => (
              <div key={reminder.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleReminder(reminder.id)}
                    className="w-8 h-8 p-0 rounded-full"
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                  
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{getTypeIcon(reminder.type)}</span>
                    <div>
                      <h4 className="font-semibold text-slate-900">{reminder.task}</h4>
                      <p className="text-sm text-slate-600">{reminder.pet}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="flex items-center space-x-2 text-sm text-slate-600">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(reminder.dueDate)}</span>
                      {reminder.dueTime && (
                        <>
                          <Clock className="h-4 w-4" />
                          <span>{reminder.dueTime}</span>
                        </>
                      )}
                    </div>
                    {reminder.recurring !== "none" && (
                      <p className="text-xs text-slate-500 mt-1">Repete: {reminder.recurring}</p>
                    )}
                  </div>
                  <Badge variant={getPriorityColor(reminder.priority)}>
                    {getPriorityText(reminder.priority)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Completed Reminders */}
      {completedReminders.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Check className="h-5 w-5 text-pet-green" />
              <span>Concluídos</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {completedReminders.map((reminder) => (
                <div key={reminder.id} className="flex items-center justify-between p-4 bg-green-50 rounded-lg opacity-75">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleReminder(reminder.id)}
                      className="w-8 h-8 p-0 rounded-full bg-pet-green text-white border-pet-green"
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{getTypeIcon(reminder.type)}</span>
                      <div>
                        <h4 className="font-semibold text-slate-900 line-through">{reminder.task}</h4>
                        <p className="text-sm text-slate-600">{reminder.pet}</p>
                      </div>
                    </div>
                  </div>
                  
                  <Badge variant="outline" className="border-pet-green text-pet-green">
                    Concluído
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
