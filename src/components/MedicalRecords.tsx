
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Plus, Calendar, Image, Users, MapPin } from "lucide-react";

export const MedicalRecords = () => {
  const pets = ["Luna", "Max", "Buddy"];
  const [selectedPet, setSelectedPet] = useState("Luna");

  const medicalHistory = [
    {
      id: 1,
      date: "15/12/2024",
      type: "Consulta de rotina",
      vet: "Dr. Silva",
      clinic: "VetCare Centro",
      diagnosis: "Animal saudável",
      treatment: "Vermífugo administrado",
      notes: "Pet apresenta ótimo estado geral. Recomendado retorno em 6 meses.",
      files: ["exame_sangue.pdf", "raio_x.jpg"]
    },
    {
      id: 2,
      date: "20/10/2024",
      type: "Vacinação",
      vet: "Dra. Costa",
      clinic: "Pet Hospital",
      diagnosis: "Imunização",
      treatment: "Vacina V10 + Antirrábica",
      notes: "Próxima dose em 1 ano. Observar reações nas próximas 24h.",
      files: ["carteira_vacinacao.pdf"]
    },
    {
      id: 3,
      date: "05/08/2024",
      type: "Cirurgia",
      vet: "Dr. Oliveira",
      clinic: "Clínica Animal",
      diagnosis: "Castração eletiva",
      treatment: "Ovariohisterectomia",
      notes: "Cirurgia realizada com sucesso. Repouso de 10 dias.",
      files: ["relatorio_cirurgico.pdf", "pos_operatorio.jpg"]
    }
  ];

  const vaccinations = [
    { vaccine: "V10", date: "20/10/2024", next: "20/10/2025", status: "em_dia" },
    { vaccine: "Antirrábica", date: "20/10/2024", next: "20/10/2025", status: "em_dia" },
    { vaccine: "Giardíase", date: "15/06/2024", next: "15/06/2025", status: "vencendo" },
  ];

  const documents = [
    { name: "Carteira de Vacinação", type: "PDF", size: "1.2 MB", date: "20/10/2024" },
    { name: "Exame de Sangue", type: "PDF", size: "856 KB", date: "15/12/2024" },
    { name: "Raio-X Tórax", type: "JPG", size: "2.4 MB", date: "15/12/2024" },
    { name: "Receita Médica", type: "PDF", size: "345 KB", date: "15/12/2024" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Prontuário Eletrônico</h2>
          <p className="text-slate-600 mt-1">Histórico médico completo dos seus pets.</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-pet-blue hover:bg-blue-600 text-white">
              <Plus className="mr-2 h-4 w-4" />
              Nova Consulta
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Registrar Nova Consulta</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Data da Consulta</Label>
                <Input type="date" id="date" />
              </div>
              <div>
                <Label htmlFor="type">Tipo de Consulta</Label>
                <Input id="type" placeholder="Ex: Consulta de rotina" />
              </div>
              <div>
                <Label htmlFor="vet">Veterinário</Label>
                <Input id="vet" placeholder="Nome do veterinário" />
              </div>
              <div>
                <Label htmlFor="clinic">Clínica</Label>
                <Input id="clinic" placeholder="Nome da clínica" />
              </div>
              <div className="col-span-2">
                <Label htmlFor="diagnosis">Diagnóstico</Label>
                <Textarea id="diagnosis" placeholder="Diagnóstico da consulta" />
              </div>
              <div className="col-span-2">
                <Label htmlFor="treatment">Tratamento</Label>
                <Textarea id="treatment" placeholder="Tratamento prescrito" />
              </div>
              <div className="col-span-2">
                <Label htmlFor="notes">Observações</Label>
                <Textarea id="notes" placeholder="Observações adicionais" />
              </div>
              <div className="col-span-2">
                <Button className="w-full bg-pet-blue hover:bg-blue-600">
                  Salvar Consulta
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Pet Selector */}
      <div className="flex flex-wrap gap-2">
        {pets.map((pet) => (
          <Button
            key={pet}
            variant={selectedPet === pet ? "default" : "outline"}
            onClick={() => setSelectedPet(pet)}
            className={selectedPet === pet ? "bg-pet-blue" : ""}
          >
            <Users className="mr-2 h-4 w-4" />
            {pet}
          </Button>
        ))}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="history" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="history">Histórico Médico</TabsTrigger>
          <TabsTrigger value="vaccinations">Vacinação</TabsTrigger>
          <TabsTrigger value="documents">Documentos</TabsTrigger>
        </TabsList>

        <TabsContent value="history" className="space-y-4">
          <div className="space-y-4">
            {medicalHistory.map((record) => (
              <Card key={record.id} className="card-hover">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{record.type}</CardTitle>
                      <div className="flex items-center space-x-4 text-sm text-slate-600 mt-1">
                        <span className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{record.date}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{record.vet}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{record.clinic}</span>
                        </span>
                      </div>
                    </div>
                    <Badge variant="outline">{selectedPet}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Diagnóstico</h4>
                      <p className="text-sm text-slate-600">{record.diagnosis}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Tratamento</h4>
                      <p className="text-sm text-slate-600">{record.treatment}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Observações</h4>
                    <p className="text-sm text-slate-600">{record.notes}</p>
                  </div>

                  {record.files.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Arquivos Anexos</h4>
                      <div className="flex flex-wrap gap-2">
                        {record.files.map((file, index) => (
                          <Badge key={index} variant="secondary" className="cursor-pointer hover:bg-slate-200">
                            <FileText className="mr-1 h-3 w-3" />
                            {file}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="vaccinations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Carteira de Vacinação - {selectedPet}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vaccinations.map((vaccination, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-slate-900">{vaccination.vaccine}</h4>
                      <p className="text-sm text-slate-600">Última dose: {vaccination.date}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={vaccination.status === "em_dia" ? "default" : "destructive"}>
                        {vaccination.status === "em_dia" ? "Em dia" : "Vencendo"}
                      </Badge>
                      <p className="text-sm text-slate-600 mt-1">Próxima: {vaccination.next}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Documentos - {selectedPet}</CardTitle>
                <Button variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Upload
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {documents.map((doc, index) => (
                  <div key={index} className="flex items-center space-x-3 p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      {doc.type === "PDF" ? (
                        <FileText className="h-5 w-5 text-red-500" />
                      ) : (
                        <Image className="h-5 w-5 text-green-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-900">{doc.name}</h4>
                      <p className="text-sm text-slate-600">{doc.size} • {doc.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
