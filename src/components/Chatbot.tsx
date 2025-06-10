
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChatMessage } from "@/components/ChatMessage";
import { Bot, Send, Loader2 } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Olá! Eu sou o Miaubot 🐾, seu assistente virtual para cuidados com pets. Posso ajudar você com informações sobre seus pets, prontuários, lembretes de vacinas e muito mais! Como posso ajudar hoje?",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Respostas baseadas em palavras-chave
    if (lowerMessage.includes("vacina") || lowerMessage.includes("vacinação")) {
      return "📅 Sobre vacinação: Verifiquei o prontuário dos seus pets. Luna está com as vacinas em dia, mas Max precisa da vacina antirrábica em 10/02/2025. Quer que eu agende um lembrete?";
    }
    
    if (lowerMessage.includes("consulta") || lowerMessage.includes("agendar")) {
      return "🏥 Posso ajudar você a agendar uma consulta! Qual pet precisa de atendimento? Temos disponibilidade na Clínica VetCare Centro para esta semana.";
    }
    
    if (lowerMessage.includes("luna")) {
      return "🐱 Sobre Luna: Gata Persa, 3 anos, 4.2kg. Última consulta em 15/12/2024 com Dr. Silva. Status: Saudável. Próxima vacina prevista para 15/01/2025.";
    }
    
    if (lowerMessage.includes("max")) {
      return "🐕 Sobre Max: Golden Retriever, 5 anos, 28.5kg. Última consulta em 10/12/2024. Atenção: Vacina antirrábica vencendo em breve (10/02/2025).";
    }
    
    if (lowerMessage.includes("buddy")) {
      return "🐕 Sobre Buddy: Labrador, 2 anos, 25.0kg. Última consulta em 05/12/2024. Status: Saudável. Próxima vacina em 05/03/2025.";
    }
    
    if (lowerMessage.includes("sintoma") || lowerMessage.includes("doente")) {
      return "⚕️ Se você notar sintomas preocupantes no seu pet, é importante consultar um veterinário. Posso ajudar a agendar uma consulta de emergência ou orientar sobre primeiros socorros básicos. Que sintomas você observou?";
    }
    
    if (lowerMessage.includes("alimentação") || lowerMessage.includes("ração")) {
      return "🍽️ Sobre alimentação: Cada pet tem necessidades específicas. Para pets adultos, recomendo ração de qualidade premium adequada à idade e porte. Luna (gato) precisa de ração específica para felinos, enquanto Max e Buddy precisam de ração para cães de grande porte.";
    }
    
    if (lowerMessage.includes("obrigado") || lowerMessage.includes("obrigada")) {
      return "🐾 De nada! Estou sempre aqui para ajudar você e seus peludos. Se precisar de mais alguma coisa, é só perguntar!";
    }
    
    if (lowerMessage.includes("ajuda") || lowerMessage.includes("help")) {
      return "🤖 Posso ajudar você com:\n• Informações sobre seus pets\n• Agendamento de consultas\n• Lembretes de vacinas e medicamentos\n• Dicas de cuidados\n• Histórico médico\n• Orientações gerais\n\nO que você gostaria de saber?";
    }
    
    // Resposta padrão
    return "🐾 Entendi! Estou aqui para ajudar com qualquer dúvida sobre seus pets. Posso fornecer informações sobre Luna, Max e Buddy, agendar consultas, verificar vacinas ou dar dicas de cuidados. O que você gostaria de saber especificamente?";
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    // Simular delay da IA
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputMessage),
        sender: "bot",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-3">
          <div className="w-12 h-12 pet-gradient rounded-full flex items-center justify-center">
            <Bot className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Miaubot</h2>
            <p className="text-slate-600">Seu assistente virtual para cuidados com pets</p>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <Card className="h-[600px] flex flex-col">
        <CardHeader className="border-b bg-slate-50">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarFallback className="bg-pet-blue text-white">
                <Bot className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">Miaubot</CardTitle>
              <p className="text-sm text-slate-600">Online • Sempre disponível</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages Area */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {isLoading && (
                <div className="flex items-center space-x-2 text-slate-500">
                  <Avatar>
                    <AvatarFallback className="bg-pet-blue text-white">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-slate-100 rounded-lg p-3">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="border-t p-4">
            <div className="flex space-x-2">
              <Input
                placeholder="Digite sua mensagem..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                className="flex-1"
              />
              <Button 
                onClick={handleSendMessage}
                disabled={isLoading || !inputMessage.trim()}
                className="bg-pet-blue hover:bg-blue-600"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button 
              variant="outline" 
              className="h-auto p-4 flex-col space-y-2"
              onClick={() => setInputMessage("Como estão as vacinas dos meus pets?")}
            >
              <span className="text-2xl">💉</span>
              <span className="text-sm">Status das Vacinas</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-auto p-4 flex-col space-y-2"
              onClick={() => setInputMessage("Quero agendar uma consulta")}
            >
              <span className="text-2xl">📅</span>
              <span className="text-sm">Agendar Consulta</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-auto p-4 flex-col space-y-2"
              onClick={() => setInputMessage("Dicas de alimentação para meus pets")}
            >
              <span className="text-2xl">🍽️</span>
              <span className="text-sm">Dicas de Alimentação</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-auto p-4 flex-col space-y-2"
              onClick={() => setInputMessage("Meu pet está apresentando sintomas")}
            >
              <span className="text-2xl">⚕️</span>
              <span className="text-sm">Emergência</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
