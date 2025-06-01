
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, Users, Calendar } from "lucide-react";

export const EducationalContent = () => {
  const articles = [
    {
      id: 1,
      title: "Como identificar sinais de dor em gatos",
      category: "Saúde",
      readTime: "5 min",
      difficulty: "Básico",
      summary: "Aprenda a reconhecer os principais sinais que indicam que seu gato pode estar sentindo dor.",
      tags: ["gatos", "saúde", "sinais"],
      featured: true
    },
    {
      id: 2,
      title: "Alimentação adequada para filhotes de cachorro",
      category: "Nutrição",
      readTime: "8 min",
      difficulty: "Intermediário",
      summary: "Guia completo sobre a alimentação ideal para filhotes em diferentes fases de crescimento.",
      tags: ["cachorros", "filhotes", "alimentação"],
      featured: true
    },
    {
      id: 3,
      title: "Vacinação: cronograma completo para pets",
      category: "Prevenção",
      readTime: "6 min",
      difficulty: "Básico",
      summary: "Entenda quando e quais vacinas seu pet deve tomar para uma vida saudável.",
      tags: ["vacinação", "prevenção", "cronograma"],
      featured: false
    },
    {
      id: 4,
      title: "Exercícios para cães idosos",
      category: "Bem-estar",
      readTime: "4 min",
      difficulty: "Básico",
      summary: "Atividades físicas adequadas para manter cães idosos ativos e saudáveis.",
      tags: ["exercícios", "idosos", "cachorros"],
      featured: false
    },
    {
      id: 5,
      title: "Primeiros socorros para pets",
      category: "Emergência",
      readTime: "12 min",
      difficulty: "Avançado",
      summary: "Procedimentos básicos de primeiros socorros que todo tutor deve conhecer.",
      tags: ["emergência", "primeiros socorros", "segurança"],
      featured: true
    },
    {
      id: 6,
      title: "Higiene dental em pets: por que é importante",
      category: "Higiene",
      readTime: "5 min",
      difficulty: "Básico",
      summary: "A importância da higiene bucal e como manter os dentes do seu pet limpos.",
      tags: ["higiene", "dental", "saúde bucal"],
      featured: false
    }
  ];

  const tips = [
    {
      title: "Dica do Dia",
      content: "Escove os dentes do seu pet pelo menos 3 vezes por semana para prevenir problemas dentários.",
      category: "Higiene"
    },
    {
      title: "Cuidado Semanal",
      content: "Verifique as orelhas do seu pet semanalmente para identificar sinais de infecção ou ácaros.",
      category: "Saúde"
    },
    {
      title: "Lembrete Mensal",
      content: "Administre vermífugo conforme orientação veterinária, geralmente a cada 3-6 meses.",
      category: "Prevenção"
    }
  ];

  const categories = ["Todos", "Saúde", "Nutrição", "Prevenção", "Bem-estar", "Emergência", "Higiene"];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Saúde": return "bg-red-100 text-red-700";
      case "Nutrição": return "bg-green-100 text-green-700";
      case "Prevenção": return "bg-blue-100 text-blue-700";
      case "Bem-estar": return "bg-purple-100 text-purple-700";
      case "Emergência": return "bg-orange-100 text-orange-700";
      case "Higiene": return "bg-pink-100 text-pink-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Básico": return "secondary";
      case "Intermediário": return "default";
      case "Avançado": return "destructive";
      default: return "secondary";
    }
  };

  const featuredArticles = articles.filter(article => article.featured);
  const regularArticles = articles.filter(article => !article.featured);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Conteúdo Educativo</h2>
          <p className="text-slate-600 mt-1">Aprenda mais sobre cuidados preventivos e bem-estar animal.</p>
        </div>
        
        <Button className="bg-pet-blue hover:bg-blue-600 text-white">
          <BookOpen className="mr-2 h-4 w-4" />
          Sugerir Tópico
        </Button>
      </div>

      {/* Quick Tips */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tips.map((tip, index) => (
          <Card key={index} className="card-hover border-l-4 border-l-pet-blue">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-slate-900">{tip.title}</h3>
                <Badge className={getCategoryColor(tip.category)}>
                  {tip.category}
                </Badge>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">{tip.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button key={category} variant="outline" size="sm">
            {category}
          </Button>
        ))}
      </div>

      {/* Featured Articles */}
      <div>
        <h3 className="text-xl font-bold text-slate-900 mb-4">Artigos em Destaque</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredArticles.map((article) => (
            <Card key={article.id} className="card-hover">
              <div className="h-48 bg-gradient-to-br from-blue-400 to-green-400 rounded-t-lg"></div>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge className={getCategoryColor(article.category)}>
                    {article.category}
                  </Badge>
                  <Badge variant={getDifficultyColor(article.difficulty)}>
                    {article.difficulty}
                  </Badge>
                </div>
                <CardTitle className="text-lg leading-tight">{article.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 mb-4">{article.summary}</p>
                
                <div className="flex items-center justify-between text-sm text-slate-500 mb-3">
                  <span className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{article.readTime}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>Para todos</span>
                  </span>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {article.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>

                <Button className="w-full" variant="outline">
                  Ler Artigo
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Regular Articles */}
      <div>
        <h3 className="text-xl font-bold text-slate-900 mb-4">Todos os Artigos</h3>
        <div className="space-y-4">
          {regularArticles.map((article) => (
            <Card key={article.id} className="card-hover">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <Badge className={getCategoryColor(article.category)}>
                        {article.category}
                      </Badge>
                      <Badge variant={getDifficultyColor(article.difficulty)}>
                        {article.difficulty}
                      </Badge>
                      <span className="flex items-center space-x-1 text-sm text-slate-500">
                        <Clock className="h-4 w-4" />
                        <span>{article.readTime}</span>
                      </span>
                    </div>
                    
                    <h4 className="text-lg font-semibold text-slate-900 mb-2">{article.title}</h4>
                    <p className="text-sm text-slate-600 mb-3">{article.summary}</p>
                    
                    <div className="flex flex-wrap gap-1">
                      {article.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="md:ml-6">
                    <Button variant="outline">
                      Ler Artigo
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Newsletter Signup */}
      <Card className="pet-gradient text-white">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-2">Receba Dicas Semanais</h3>
          <p className="mb-6 opacity-90">Cadastre-se para receber conteúdos educativos sobre cuidados com pets diretamente no seu email.</p>
          <div className="max-w-md mx-auto">
            <Button variant="secondary" className="w-full">
              Inscrever-se na Newsletter
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
