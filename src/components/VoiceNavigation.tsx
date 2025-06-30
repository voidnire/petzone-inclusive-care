
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mic, MicOff, Volume2, VolumeX, Play, Pause } from "lucide-react";

interface VoiceNavigationProps {
  onVoiceCommand?: (command: string) => void;
}

export const VoiceNavigation = ({ onVoiceCommand }: VoiceNavigationProps) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastCommand, setLastCommand] = useState("");
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  // Simulação de reconhecimento de voz
  const toggleListening = () => {
    if (!isListening) {
      setIsListening(true);
      speak("Estou ouvindo. Diga um comando como 'ir para clínicas' ou 'buscar veterinário acessível'.");
      
      // Simular reconhecimento após 3 segundos
      setTimeout(() => {
        const mockCommands = [
          "ir para clínicas",
          "buscar veterinário acessível",
          "mostrar iniciativas públicas",
          "ver histórico do Babbaloo",
          "configurar alerta de vacina"
        ];
        const randomCommand = mockCommands[Math.floor(Math.random() * mockCommands.length)];
        setLastCommand(randomCommand);
        processVoiceCommand(randomCommand);
        setIsListening(false);
      }, 3000);
    } else {
      setIsListening(false);
      speak("Reconhecimento de voz parado.");
    }
  };

  const speak = (text: string) => {
    if (!voiceEnabled) return;
    
    setIsSpeaking(true);
    // Simular síntese de voz
    setTimeout(() => {
      setIsSpeaking(false);
    }, 2000);
    
    console.log(`🔊 Falando: ${text}`);
  };

  const processVoiceCommand = (command: string) => {
    speak(`Comando reconhecido: ${command}`);
    
    if (onVoiceCommand) {
      onVoiceCommand(command);
    }

    // Processar comandos específicos
    if (command.includes("clínicas") || command.includes("veterinário")) {
      speak("Navegando para a seção de clínicas veterinárias. Buscando opções com acessibilidade para pessoas com deficiência visual.");
    } else if (command.includes("iniciativas") || command.includes("públicas")) {
      speak("Mostrando iniciativas públicas de saúde animal disponíveis em sua região.");
    } else if (command.includes("histórico") || command.includes("Babbaloo")) {
      speak("Acessando histórico médico do Babbaloo. Última consulta foi há 2 semanas.");
    } else if (command.includes("alerta") || command.includes("vacina")) {
      speak("Configurando alerta de cuidados preventivos. Próxima vacina do Babbaloo é em 15 dias.");
    }
  };

  const voiceCommands = [
    "Ir para clínicas",
    "Buscar veterinário acessível", 
    "Ver iniciativas públicas",
    "Mostrar histórico do pet",
    "Configurar alertas",
    "Agendar consulta domiciliar",
    "Buscar medicamentos gratuitos"
  ];

  return (
    <Card className="border-2 border-pet-secondary">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-pet-secondary">
          <Mic className="h-5 w-5" />
          <span>Navegação por Voz</span>
          <Badge variant="outline" className="text-xs border-pet-accent text-pet-accent">Acessibilidade</Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="text-sm text-pet-primary">
          Use comandos de voz para navegar pelo PetZone de forma acessível.
        </div>

        <div className="flex space-x-2">
          <Button
            onClick={toggleListening}
            className={`flex-1 ${isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-pet-secondary hover:bg-pet-primary'} text-white`}
          >
            {isListening ? <MicOff className="mr-2 h-4 w-4" /> : <Mic className="mr-2 h-4 w-4" />}
            {isListening ? "Parar" : "Falar"}
          </Button>
          
          <Button
            variant="outline"
            onClick={() => setVoiceEnabled(!voiceEnabled)}
            className="flex items-center space-x-2 border-pet-secondary text-pet-secondary hover:bg-pet-secondary hover:text-white"
          >
            {voiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </Button>
        </div>

        {isListening && (
          <div className="bg-pet-tertiary/10 border border-pet-tertiary/30 rounded-lg p-3">
            <div className="flex items-center space-x-2 text-pet-secondary">
              <div className="animate-pulse w-2 h-2 bg-pet-tertiary rounded-full"></div>
              <span className="text-sm font-medium">Escutando...</span>
            </div>
          </div>
        )}

        {isSpeaking && (
          <div className="bg-pet-accent/10 border border-pet-accent/30 rounded-lg p-3">
            <div className="flex items-center space-x-2 text-pet-accent">
              <Volume2 className="h-4 w-4 animate-pulse" />
              <span className="text-sm font-medium">Falando...</span>
            </div>
          </div>
        )}

        {lastCommand && (
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
            <div className="text-sm">
              <span className="font-medium text-pet-primary">Último comando:</span>
              <div className="text-pet-secondary mt-1">"{lastCommand}"</div>
            </div>
          </div>
        )}

        <div>
          <h4 className="text-sm font-medium text-pet-primary mb-2">Comandos disponíveis:</h4>
          <div className="grid grid-cols-1 gap-2">
            {voiceCommands.map((command, index) => (
              <div key={index} className="text-xs text-pet-secondary bg-slate-50 rounded px-2 py-1">
                "{command}"
              </div>
            ))}
          </div>
        </div>

        <div className="text-xs text-pet-primary border-t pt-3">
          💡 Tip: Fale claramente e aguarde o sinal sonoro antes de dar o comando.
        </div>
      </CardContent>
    </Card>
  );
};
