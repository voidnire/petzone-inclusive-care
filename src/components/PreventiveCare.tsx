
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Bell, Calendar, Syringe, Pill, Stethoscope, Plus, Volume2 } from "lucide-react";

export const PreventiveCare = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      petName: "Babbaloo",
      type: "Vacina",
      name: "V10 (Déctupla)",
      dueDate: "2024-01-20",
      status: "Próximo",
      daysRemaining: 10,
      description: "Vacina anual obrigatória",
      icon: Syringe,
      color: "blue"
    },
    {
      id: 2,
      petName: "Babbaloo", 
      type: "Medicamento",
      name: "Vermifugação",
      dueDate: "2024-01-15",
      status: "Atrasado",
      daysRemaining: -5,
      description: "Aplicação trimestral",
      icon: Pill,
      color: "red"
    },
    {
      id: 3,
      petName: "Babbaloo",
      type: "Exame",
      name: "Check-up Anual",
      dueDate: "2024-02-01",
      status: "Agendado",
      daysRemaining: 22,
      description: "Exame completo de rotina",
      icon: Stethoscope,
      color: "green"
    }
  ]);

  const [showNewAlert, setShowNewAlert] = useState(false);
  const [newAlert, setNewAlert] = useState({
    petName: "Babbaloo",
    type: "Vacina",
    name: "",
    dueDate: "",
    description: ""
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Próximo": return "bg-yellow-100 text-yellow-800";
      case "Atrasado": return "bg-red-100 text-red-800";
      case "Agendado": return "bg-green-100 text-green-800";
      case "Concluído": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Vacina": return Syringe;
      case "Medicamento": return Pill;
      case "Exame": return Stethoscope;
      default: return Bell;
    }
  };

  const speakAlert = (alert: any) => {
    const message = `Alerta para ${alert.petName}: ${alert.name} ${alert.type} está ${alert.status.toLowerCase()}. ${Math.abs(alert.daysRemaining)} dias ${alert.daysRemaining < 0 ? 'em atraso' : 'restantes'}.`;
    console.log(`🔊 ${message}`);
    // Aqui seria implementada a síntese de voz real
  };

  const addNewAlert = () => {
    if (newAlert.name && newAlert.dueDate) {
      const dueDate = new Date(newAlert.dueDate);
      const today = new Date();
      const daysRemaining = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      
      const alert = {
        id: alerts.length + 1,
        ...newAlert,
        daysRemaining,
        status: daysRemaining < 0 ? "Atrasado" : daysRemaining <= 7 ? "Próximo" : "Agendado",
        icon: getTypeIcon(newAlert.type),
        color: daysRemaining < 0 ? "red" : daysRemaining <= 7 ? "yellow" : "green"
      };
      
      setAlerts([...alerts, alert]);
      setNewAlert({
        petName: "Babbaloo",
        type: "Vacina",
        name: "",
        dueDate: "",
        description: ""
      });
      setShowNewAlert(false);
      
      speakAlert(alert);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Cuidados Preventivos</h2>
          <p className="text-slate-600 mt-1">Alertas e lembretes para manter a saúde do seu pet em dia.</p>
        </div>
        <Button
          onClick={() => setShowNewAlert(true)}
          className="bg-pet-green hover:bg-green-600"
        >
          <Plus className="mr-2 h-4 w-4" />
          Novo Alerta
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Próximos</p>
                <p className="text-2xl font-bold text-slate-900">
                  {alerts.filter(a => a.status === "Próximo").length}
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
                <p className="text-sm font-medium text-slate-600">Atrasados</p>
                <p className="text-2xl font-bold text-slate-900">
                  {alerts.filter(a => a.status === "Atrasado").length}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Bell className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Agendados</p>
                <p className="text-2xl font-bold text-slate-900">
                  {alerts.filter(a => a.status === "Agendado").length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total</p>
                <p className="text-2xl font-bold text-slate-900">{alerts.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Stethoscope className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* New Alert Form */}
      {showNewAlert && (
        <Card className="border-2 border-pet-green">
          <CardHeader>
            <CardTitle className="text-pet-green">Novo Alerta de Cuidado Preventivo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Tipo de Cuidado
                </label>
                <select
                  value={newAlert.type}
                  onChange={(e) => setNewAlert({...newAlert, type: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pet-green"
                >
                  <option value="Vacina">Vacina</option>
                  <option value="Medicamento">Medicamento</option>
                  <option value="Exame">Exame</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Nome do Cuidado
                </label>
                <Input
                  value={newAlert.name}
                  onChange={(e) => setNewAlert({...newAlert, name: e.target.value})}
                  placeholder="Ex: Vacina V10, Vermífugo..."
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Data Prevista
                </label>
                <Input
                  type="date"
                  value={newAlert.dueDate}
                  onChange={(e) => setNewAlert({...newAlert, dueDate: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Descrição (opcional)
                </label>
                <Input
                  value={newAlert.description}
                  onChange={(e) => setNewAlert({...newAlert, description: e.target.value})}
                  placeholder="Observações adicionais..."
                />
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button onClick={addNewAlert} className="bg-pet-green hover:bg-green-600">
                Criar Alerta
              </Button>
              <Button variant="outline" onClick={() => setShowNewAlert(false)}>
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Alerts List */}
      <div className="space-y-4">
        {alerts.map((alert) => {
          const Icon = alert.icon;
          return (
            <Card key={alert.id} className={`hover:shadow-lg transition-shadow ${alert.status === 'Atrasado' ? 'border-l-4 border-l-red-500' : alert.status === 'Próximo' ? 'border-l-4 border-l-yellow-500' : ''}`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      alert.color === 'red' ? 'bg-red-100' :
                      alert.color === 'yellow' ? 'bg-yellow-100' :
                      alert.color === 'green' ? 'bg-green-100' :
                      'bg-blue-100'
                    }`}>
                      <Icon className={`h-6 w-6 ${
                        alert.color === 'red' ? 'text-red-600' :
                        alert.color === 'yellow' ? 'text-yellow-600' :
                        alert.color === 'green' ? 'text-green-600' :
                        'text-blue-600'
                      }`} />
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">{alert.name}</h3>
                      <p className="text-sm text-slate-600">{alert.petName} • {alert.type}</p>
                      {alert.description && (
                        <p className="text-xs text-slate-500 mt-1">{alert.description}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <Badge className={getStatusColor(alert.status)}>
                      {alert.status}
                    </Badge>
                    <div className="mt-2 text-sm text-slate-600">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(alert.dueDate).toLocaleDateString('pt-BR')}</span>
                      </div>
                      <div className={`text-xs mt-1 ${alert.daysRemaining < 0 ? 'text-red-600' : 'text-slate-500'}`}>
                        {Math.abs(alert.daysRemaining)} dias {alert.daysRemaining < 0 ? 'em atraso' : 'restantes'}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2 mt-4">
                  <Button variant="outline" size="sm">
                    <Calendar className="mr-2 h-4 w-4" />
                    Reagendar
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => speakAlert(alert)}>
                    <Volume2 className="mr-2 h-4 w-4" />
                    Ouvir Alerta
                  </Button>
                  <Button size="sm" className="bg-pet-blue hover:bg-blue-600">
                    Marcar como Concluído
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
