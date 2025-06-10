
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, User } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isBot = message.sender === "bot";
  
  return (
    <div className={`flex items-start space-x-3 ${isBot ? "" : "flex-row-reverse space-x-reverse"}`}>
      <Avatar className="w-8 h-8">
        <AvatarFallback className={isBot ? "bg-pet-blue text-white" : "bg-slate-500 text-white"}>
          {isBot ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
        </AvatarFallback>
      </Avatar>
      
      <div className={`max-w-xs lg:max-w-md ${isBot ? "" : "flex flex-col items-end"}`}>
        <div 
          className={`rounded-lg p-3 ${
            isBot 
              ? "bg-slate-100 text-slate-900" 
              : "bg-pet-blue text-white"
          }`}
        >
          <p className="text-sm whitespace-pre-line">{message.text}</p>
        </div>
        <span className="text-xs text-slate-500 mt-1">
          {format(message.timestamp, "HH:mm", { locale: ptBR })}
        </span>
      </div>
    </div>
  );
};
