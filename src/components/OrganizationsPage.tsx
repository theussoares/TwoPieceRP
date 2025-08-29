import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { 
  Crown, 
  Anchor, 
  Flag, 
  Skull, 
  Sword,
  Users,
  Star,
  Shield,
  Flame
} from 'lucide-react';

export const OrganizationsPage: React.FC = () => {
  const pirateHierarchy = [
    {
      rank: 'Rei Pirata',
      description: 'Título dado ao Pirata que chegar na ilha final, a ilha que se encontra o One Piece, o maior tesouro do mundo! No momento que existir um Rei Pirata, os Yonkou são dissolvidos, até o momento que o Rei for derrotado.',
      icon: <Crown className="h-5 w-5" />,
      color: 'bg-yellow-500 text-white'
    },
    {
      rank: 'Grande Frota',
      description: 'Grande Frota é o nome dado a uma aliança de tripulações pirata, geralmente são capitães de tripulações mais fracas que servem a usa tripulação poderosa, seguindo suas ordens. É melhor servir um Yonkou em uma Grande Frota ao invés de ser inimigo dele!',
      icon: <Flag className="h-5 w-5" />,
      color: 'bg-purple-600 text-white'
    },
    {
      rank: 'Yonkou',
      description: 'Yonkou é o título dado aos quatro mais temidos capitães piratas, são os imperadores do mar, os Yonkou dominam um grande número de ilhas e devem possuir uma Grande Frota Pirata com no mínimo duas tripulações. Os imperadores são dissolvidos quando um Rei Pirata surge.',
      icon: <Crown className="h-5 w-5" />,
      color: 'bg-red-600 text-white'
    },
    {
      rank: 'Shichibukai',
      description: 'Corsários ou Shichibukai são piratas que trabalham junto com a Marinha, em troca de proteção, os Shichibukai seguem ordens da Marinha.',
      icon: <Star className="h-5 w-5" />,
      color: 'bg-blue-600 text-white'
    },
    {
      rank: 'Capitão',
      description: 'Capitão é o líder de uma tripulação Pirata, geralmente busca fortalecer a sua tripulação para aumentar a sua infâmia',
      icon: <Skull className="h-5 w-5" />,
      color: 'bg-orange-600 text-white'
    },
    {
      rank: 'Comandante',
      description: 'Também interpretado como vice-capitão, são os membros de confiança do capitão. Os Comandantes podem comandar um navio em caso de tripulação ter mais de um e comandam os tripulantes.',
      icon: <Sword className="h-5 w-5" />,
      color: 'bg-amber-600 text-white'
    },
    {
      rank: 'Tripulante',
      description: 'São os membros de nível mais baixo de uma tripulação pirata, seguem a ordem do seu capitão ou comandante. A maioria dos piratas começam aqui, sendo membros de uma tripulação.',
      icon: <Users className="h-5 w-5" />,
      color: 'bg-gray-600 text-white'
    },
    {
      rank: 'Aprendiz Pirata',
      description: 'São aprendizes de um bando pirata, geralmente jovens demais para se tornar um pirata, o aprendiz ainda precisa de um treinamento especializado na área, enquanto acompanha outros piratas. Geralmente quem escolhe ser um pirata, começa sendo um aprendiz.',
      icon: <Users className="h-5 w-5" />,
      color: 'bg-gray-400 text-white'
    }
  ];

  const marineHierarchy = [
    {
      rank: 'Goroussei',
      description: 'Raramente saem para o mar, os Goroussei são 5 anciãos do Governo Mundial, eles possuem autoridade suficiente até para mandar no Almirante da Frota, sendo assim eles que definem o rumo da Marinha.',
      icon: <Crown className="h-5 w-5" />,
      color: 'bg-yellow-500 text-white'
    },
    {
      rank: 'Almirante da Frota',
      description: 'É o Grande líder da Marinha, recebendo ordem apenas dos Goroussei, o Almirante da Frota é respondem por comandar os Almirantes da Marinha junto com toda a Frota da Marinha, sendo o principal responsável por tudo.',
      icon: <Crown className="h-5 w-5" />,
      color: 'bg-blue-600 text-white'
    },
    {
      rank: 'Almirante',
      description: 'Sendo um total de três Almirantes, eles recebem as ordens do Almirante da Frota e repassam para os outros integrantes na Marinha, os Almirantes geralmente são chamados para missões de alto nível, com necessidade de enfrentar algum pirata de muita infâmia',
      icon: <Star className="h-5 w-5" />,
      color: 'bg-indigo-600 text-white'
    },
    {
      rank: 'Vice-Almirante',
      description: 'Os Você-Almirante também são grandes líderes, geralmente acompanham os Almirantes nas missões de alto nível e também pode ser o marinheiro de mais alto nível em alguma missão mais simples.',
      icon: <Shield className="h-5 w-5" />,
      color: 'bg-cyan-600 text-white'
    },
    {
      rank: 'Capitão',
      description: 'Os Capitães ajudam a controlar um grande número de Marinheiros, no geral são Marinheiros que já possuem um certo nível de experiência',
      icon: <Anchor className="h-5 w-5" />,
      color: 'bg-blue-500 text-white'
    },
    {
      rank: 'Marinheiro',
      description: 'Os Marinheiros são os soldados da Marinha, sua função é apenas seguir ordens dos que vêm de cima',
      icon: <Users className="h-5 w-5" />,
      color: 'bg-gray-600 text-white'
    },
    {
      rank: 'Aprendiz de Marinheiro',
      description: 'São marinheiros ainda em treinamento, geralmente jovens que desejam se tornar oficialmente um Marinheiro.',
      icon: <Users className="h-5 w-5" />,
      color: 'bg-gray-400 text-white'
    }
  ];

  const revolutionaryHierarchy = [
    {
      rank: 'Líder',
      description: 'É o grande líder do Exército Revolucionário, que comanda todas as ações do grupo',
      icon: <Flame className="h-5 w-5" />,
      color: 'bg-red-600 text-white'
    },
    {
      rank: 'Comandante',
      description: 'São os membros de mais confiança do Líder do Exército Revolucionário, eles ajudam a comandar os soldados.',
      icon: <Flag className="h-5 w-5" />,
      color: 'bg-orange-600 text-white'
    },
    {
      rank: 'Soldado',
      description: 'São os Soldados do Exército Revolucionário, que acreditam fielmente na ideologia do líder e então segue suas ordens e a ordem dos comandantes',
      icon: <Users className="h-5 w-5" />,
      color: 'bg-gray-600 text-white'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center py-8">
        <h1 className="text-amber-900 mb-4">Sistema de Organizações</h1>
        <p className="text-amber-700 max-w-4xl mx-auto">
          Conheça todas as organizações disponíveis no mundo de Two Piece RP e suas hierarquias detalhadas. 
          Cada organização possui seus próprios objetivos, estrutura de comando e oportunidades únicas para os personagens.
        </p>
      </div>

      <Tabs defaultValue="pirates" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pirates" className="flex items-center gap-2">
            <Skull className="h-4 w-4" />
            Piratas
          </TabsTrigger>
          <TabsTrigger value="marines" className="flex items-center gap-2">
            <Anchor className="h-4 w-4" />
            Marinha
          </TabsTrigger>
          <TabsTrigger value="revolutionaries" className="flex items-center gap-2">
            <Flame className="h-4 w-4" />
            Revolucionários
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pirates" className="space-y-6">
          {/* Informações Gerais dos Piratas */}
          <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
            <CardHeader>
              <CardTitle className="text-red-800 flex items-center gap-3">
                <div className="p-2 bg-red-600 text-white rounded-lg">
                  <Skull className="h-6 w-6" />
                </div>
                Piratas
              </CardTitle>
              <CardDescription className="text-red-700">
                Os Piratas buscam por liberdade, viver livre no mundo por conta própria. Alguns piratas só querem encontrar companheiros para navegar enquanto exploram o mundo, já outros preferem causar destruição por onde passam em busca de aumentar sua infâmia e poder!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-red-100 p-4 rounded-lg">
                <h4 className="text-red-800 mb-2">🎯 Objetivo Principal</h4>
                <p className="text-red-700">
                  Dominar ilhas, expandir seu território, sua tripulação e fazer o mundo temer o seu nome
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Hierarquia dos Piratas */}
          <div className="space-y-4">
            <h3 className="text-amber-900 flex items-center gap-2">
              <Flag className="h-5 w-5" />
              Hierarquia Pirata
            </h3>
            <div className="grid gap-4">
              {pirateHierarchy.map((rank, index) => (
                <Card key={rank.rank} className="relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-red-500 to-orange-500"></div>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-3">
                        <Badge className={`${rank.color} flex items-center gap-2`}>
                          {rank.icon}
                          {rank.rank}
                        </Badge>
                        <span className="text-sm text-gray-500">#{index + 1}</span>
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">{rank.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="marines" className="space-y-6">
          {/* Informações Gerais da Marinha */}
          <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-800 flex items-center gap-3">
                <div className="p-2 bg-blue-600 text-white rounded-lg">
                  <Anchor className="h-6 w-6" />
                </div>
                Marinha
              </CardTitle>
              <CardDescription className="text-blue-700">
                A Marinha é uma organização responsável em estabelecer a paz no mundo e controlar os piratas, caçando eles ou executando na pior das hipóteses.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-blue-100 p-4 rounded-lg">
                <h4 className="text-blue-800 mb-2">🎯 Objetivo Principal</h4>
                <p className="text-blue-700">
                  "Dominar" as ilhas para proteger dos piratas e caçar os piratas
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Hierarquia da Marinha */}
          <div className="space-y-4">
            <h3 className="text-amber-900 flex items-center gap-2">
              <Anchor className="h-5 w-5" />
              Hierarquia da Marinha
            </h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-blue-800">
                <strong>📋 Hierarquia de Comando:</strong> A patente inferior sempre deve seguir as ordens da patente superior, sendo a hierarquia (Goroussei → Almirante da Frota → Almirante → Vice-Almirante → Capitão → Marinheiro → Aprendiz de Marinheiro). Todo membro da Marinha começa sendo um Aprendiz de Marinheiro.
              </p>
            </div>
            <div className="grid gap-4">
              {marineHierarchy.map((rank, index) => (
                <Card key={rank.rank} className="relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-cyan-500"></div>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-3">
                        <Badge className={`${rank.color} flex items-center gap-2`}>
                          {rank.icon}
                          {rank.rank}
                        </Badge>
                        <span className="text-sm text-gray-500">#{index + 1}</span>
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">{rank.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="revolutionaries" className="space-y-6">
          {/* Informações Gerais do Exército Revolucionário */}
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800 flex items-center gap-3">
                <div className="p-2 bg-green-600 text-white rounded-lg">
                  <Flame className="h-6 w-6" />
                </div>
                Exército Revolucionário
              </CardTitle>
              <CardDescription className="text-green-700">
                O Exército Revolucionário acredita que as ilhas são reféns independente se forem dominadas por piratas ou pela marinha, então o objetivo do Exército Revolucionário é libertar as ilhas dessas duas organizações.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-green-100 p-4 rounded-lg">
                <h4 className="text-green-800 mb-2">🎯 Objetivo Principal</h4>
                <p className="text-green-700">
                  Libertar as ilhas dos Piratas e da Marinha, colocando a bandeira do Exército Revolucionário sobre elas.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Hierarquia do Exército Revolucionário */}
          <div className="space-y-4">
            <h3 className="text-amber-900 flex items-center gap-2">
              <Flame className="h-5 w-5" />
              Hierarquia do Exército Revolucionário
            </h3>
            <div className="grid gap-4">
              {revolutionaryHierarchy.map((rank, index) => (
                <Card key={rank.rank} className="relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-green-500 to-emerald-500"></div>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-3">
                        <Badge className={`${rank.color} flex items-center gap-2`}>
                          {rank.icon}
                          {rank.rank}
                        </Badge>
                        <span className="text-sm text-gray-500">#{index + 1}</span>
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">{rank.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Resumo Final */}
      <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200">
        <CardHeader>
          <CardTitle className="text-amber-800">💡 Dicas Importantes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-red-100 p-4 rounded-lg">
              <h5 className="text-red-800 mb-2">🏴‍☠️ Para Piratas</h5>
              <p className="text-red-700 text-sm">
                A progressão pirata é baseada em infâmia e poder. Construa sua tripulação e território para subir na hierarquia.
              </p>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg">
              <h5 className="text-blue-800 mb-2">⚓ Para Marinheiros</h5>
              <p className="text-blue-700 text-sm">
                A hierarquia naval é rígida e baseada em disciplina. Siga ordens e prove seu valor para ser promovido.
              </p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg">
              <h5 className="text-green-800 mb-2">🔥 Para Revolucionários</h5>
              <p className="text-green-700 text-sm">
                O Exército Revolucionário valoriza idealismo e dedicação à causa da liberdade mundial.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};